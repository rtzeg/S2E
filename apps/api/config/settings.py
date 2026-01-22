from pathlib import Path
<<<<<<< HEAD
=======
from datetime import timedelta
>>>>>>> fd36de3d22e88d6ccb3ee29bab4ce739d5cb8680

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = "dev-secret-key"
DEBUG = True
ALLOWED_HOSTS = ["*"]

<<<<<<< HEAD
# чтобы sqlite не падал, если папки data нет
DATA_DIR = BASE_DIR / "data"
DATA_DIR.mkdir(exist_ok=True)

INSTALLED_APPS = [
    # Django
=======
INSTALLED_APPS = [
>>>>>>> fd36de3d22e88d6ccb3ee29bab4ce739d5cb8680
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
<<<<<<< HEAD

    # Third-party
    "corsheaders",
    "rest_framework",
    "drf_spectacular",

    # Local apps
=======
    "corsheaders",
    "rest_framework",
    "rest_framework_simplejwt",
    "drf_spectacular",
>>>>>>> fd36de3d22e88d6ccb3ee29bab4ce739d5cb8680
    "apps.users.apps.UsersConfig",
    "apps.core.apps.CoreConfig",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ]
        },
    }
]

WSGI_APPLICATION = "config.wsgi.application"
ASGI_APPLICATION = "config.asgi.application"

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
<<<<<<< HEAD
        "NAME": DATA_DIR / "db.sqlite3",
=======
        "NAME": BASE_DIR / "data" / "db.sqlite3",
>>>>>>> fd36de3d22e88d6ccb3ee29bab4ce739d5cb8680
    }
}

AUTH_PASSWORD_VALIDATORS = [
<<<<<<< HEAD
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
=======
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"
    },
>>>>>>> fd36de3d22e88d6ccb3ee29bab4ce739d5cb8680
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

LANGUAGE_CODE = "ru-ru"
<<<<<<< HEAD
TIME_ZONE = "Asia/Tashkent"
USE_I18N = True
USE_TZ = True

STATIC_URL = "/static/"
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

REST_FRAMEWORK = {
    # ✅ MVP: открываем всё, чтобы фронт грузил роадмапы без токенов
    "DEFAULT_PERMISSION_CLASSES": ("rest_framework.permissions.AllowAny",),
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
}

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
CORS_ALLOW_CREDENTIALS = True

CSRF_TRUSTED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

=======
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

STATIC_URL = "static/"

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": (
        "rest_framework.permissions.AllowAny",
    ),
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(hours=6),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
}

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
]
CORS_ALLOW_CREDENTIALS = True

>>>>>>> fd36de3d22e88d6ccb3ee29bab4ce739d5cb8680
SPECTACULAR_SETTINGS = {
    "TITLE": "Skill2Earn API",
    "DESCRIPTION": "MVP API for the Skill2Earn platform",
    "VERSION": "0.1.0",
}
