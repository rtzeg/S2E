import asyncio
import os
from dataclasses import dataclass

from aiogram import Bot, Dispatcher, F, Router
from aiogram.filters import CommandStart
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import State, StatesGroup
from aiogram.types import CallbackQuery, InlineKeyboardButton, InlineKeyboardMarkup, Message
from aiohttp import ClientSession


@dataclass
class Config:
    token: str
    api_url: str
    web_url: str


class HomeworkStates(StatesGroup):
    choosing_step = State()
    entering_text = State()


async def get_config() -> Config:
    return Config(
        token=os.environ.get("TELEGRAM_BOT_TOKEN", ""),
        api_url=os.environ.get("API_URL", "http://localhost:8000/api"),
        web_url=os.environ.get("WEB_URL", "http://localhost:5173"),
    )


async def api_auth(session: ClientSession, api_url: str, telegram_id: int) -> str:
    async with session.post(f"{api_url}/bot/auth", json={"telegram_id": telegram_id}) as resp:
        data = await resp.json()
        return data.get("access", "")


async def api_get(session: ClientSession, api_url: str, token: str, path: str):
    async with session.get(
        f"{api_url}/{path}", headers={"Authorization": f"Bearer {token}"}
    ) as resp:
        return await resp.json()


async def api_post(session: ClientSession, api_url: str, token: str, path: str, payload: dict):
    async with session.post(
        f"{api_url}/{path}",
        json=payload,
        headers={"Authorization": f"Bearer {token}"},
    ) as resp:
        return await resp.json()


async def start_handler(message: Message, state: FSMContext):
    await state.clear()
    keyboard = InlineKeyboardMarkup(
        inline_keyboard=[
            [InlineKeyboardButton(text="Выбрать шаг", callback_data="choose_step")],
            [InlineKeyboardButton(text="Сдать домашку", callback_data="submit_homework")],
        ]
    )
    await message.answer(
        "Привет! Я бот Skill2Earn. Помогу выбрать шаг и сдать домашку.",
        reply_markup=keyboard,
    )


async def choose_step_handler(message: Message, state: FSMContext, config: Config):
    async with ClientSession() as session:
        token = await api_auth(session, config.api_url, message.from_user.id)
        roadmap = await api_get(session, config.api_url, token, "roadmap")

    buttons = [
        [InlineKeyboardButton(text=step["title"], callback_data=f"step_{step['id']}")]
        for step in roadmap
    ]
    await state.set_state(HomeworkStates.choosing_step)
    await message.answer("Выбери шаг:", reply_markup=InlineKeyboardMarkup(inline_keyboard=buttons))


async def callback_choose_step(callback: CallbackQuery, state: FSMContext, config: Config):
    await choose_step_handler(callback.message, state, config)
    await callback.answer()


async def callback_submit_homework(callback: CallbackQuery, state: FSMContext, config: Config):
    await choose_step_handler(callback.message, state, config)
    await callback.answer()


async def step_selected(callback: CallbackQuery, state: FSMContext):
    step_id = int(callback.data.split("_")[-1])
    await state.update_data(step_id=step_id)
    await state.set_state(HomeworkStates.entering_text)
    await callback.message.answer("Отправь текст домашнего задания.")
    await callback.answer()


async def homework_text_handler(message: Message, state: FSMContext, config: Config):
    data = await state.get_data()
    step_id = data.get("step_id")
    if not step_id:
        await message.answer("Сначала выбери шаг через /start")
        return

    async with ClientSession() as session:
        token = await api_auth(session, config.api_url, message.from_user.id)
        submission = await api_post(
            session,
            config.api_url,
            token,
            "homework/submit",
            {"step_id": step_id, "input_type": "text", "content": message.text},
        )
        submission_id = submission.get("submission_id")
        result = await api_get(
            session, config.api_url, token, f"homework/result/{submission_id}"
        )

    ai = result.get("ai_result", {})
    tips = ai.get("suggestions", [])[:3]
    response_lines = [
        f"Оценка: {ai.get('score', '-')}",
        "Советы:",
        *[f"- {tip}" for tip in tips],
    ]
    deep_link = (
        f"{config.web_url}/app/homework/result?submissionId={submission_id}&source=telegram"
    )
    keyboard = InlineKeyboardMarkup(
        inline_keyboard=[[InlineKeyboardButton(text="Открыть подробности", url=deep_link)]]
    )
    await message.answer("\n".join(response_lines), reply_markup=keyboard)
    await state.clear()


async def main():
    config = await get_config()
    if not config.token:
        raise RuntimeError("TELEGRAM_BOT_TOKEN is required")

    bot = Bot(token=config.token)
    dp = Dispatcher()
    router = Router()

    router.message.register(start_handler, CommandStart())
    router.callback_query.register(
        lambda callback, state: callback_choose_step(callback, state, config),
        F.data == "choose_step",
    )
    router.callback_query.register(
        lambda callback, state: callback_submit_homework(callback, state, config),
        F.data == "submit_homework",
    )
    router.callback_query.register(step_selected, F.data.startswith("step_"))
    router.message.register(homework_text_handler, HomeworkStates.entering_text)

    dp.include_router(router)
    await dp.start_polling(bot)


if __name__ == "__main__":
    asyncio.run(main())
