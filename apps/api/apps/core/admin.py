from django.contrib import admin

from .models import AIResult, Job, JobPack, RoadmapStep, Submission, TakenJob, UserRoadmapProgress


@admin.register(RoadmapStep)
class RoadmapStepAdmin(admin.ModelAdmin):
    list_display = ("title", "order", "est_time_minutes")
    list_filter = ("order",)
    search_fields = ("title",)
    ordering = ("order",)


@admin.register(UserRoadmapProgress)
class UserRoadmapProgressAdmin(admin.ModelAdmin):
    list_display = ("user", "step", "status", "updated_at")
    list_filter = ("status", "updated_at")
    search_fields = ("user__username", "step__title")


@admin.register(Submission)
class SubmissionAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "step", "input_type", "created_at")
    list_filter = ("input_type", "created_at")
    search_fields = ("user__username", "step__title")


@admin.register(AIResult)
class AIResultAdmin(admin.ModelAdmin):
    list_display = ("submission", "score")
    search_fields = ("submission__id",)


@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ("title", "difficulty", "budget", "duration")
    list_filter = ("difficulty",)
    search_fields = ("title", "stack")


@admin.register(TakenJob)
class TakenJobAdmin(admin.ModelAdmin):
    list_display = ("user", "job", "status", "created_at")
    list_filter = ("status",)
    search_fields = ("user__username", "job__title")


@admin.register(JobPack)
class JobPackAdmin(admin.ModelAdmin):
    list_display = ("job",)
    search_fields = ("job__title",)
