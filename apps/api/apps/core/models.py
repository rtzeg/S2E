from django.conf import settings
from django.db import models


class RoadmapStep(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    est_time_minutes = models.PositiveIntegerField()
    skill_tags = models.JSONField(default=list)
    order = models.PositiveIntegerField()

    class Meta:
        ordering = ["order"]

    def __str__(self) -> str:
        return self.title


class UserRoadmapProgress(models.Model):
    STATUS_CHOICES = [
        ("todo", "Todo"),
        ("in_progress", "In progress"),
        ("done", "Done"),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    step = models.ForeignKey(RoadmapStep, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="todo")
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ("user", "step")

    def __str__(self) -> str:
        return f"{self.user_id}:{self.step_id}:{self.status}"


class Submission(models.Model):
    INPUT_CHOICES = [("text", "Text"), ("code", "Code")]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    step = models.ForeignKey(RoadmapStep, on_delete=models.CASCADE)
    input_type = models.CharField(max_length=20, choices=INPUT_CHOICES)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"Submission {self.id}"


class AIResult(models.Model):
    submission = models.OneToOneField(Submission, on_delete=models.CASCADE)
    score = models.PositiveIntegerField()
    strengths = models.JSONField(default=list)
    issues = models.JSONField(default=list)
    suggestions = models.JSONField(default=list)
    next_action = models.TextField()

    def __str__(self) -> str:
        return f"AIResult {self.submission_id}"


class Job(models.Model):
    DIFFICULTY_CHOICES = [("easy", "Easy"), ("medium", "Medium")]

    title = models.CharField(max_length=255)
    budget = models.CharField(max_length=50)
    duration = models.CharField(max_length=50)
    stack = models.JSONField(default=list)
    difficulty = models.CharField(max_length=20, choices=DIFFICULTY_CHOICES)
    description = models.TextField()

    def __str__(self) -> str:
        return self.title


class TakenJob(models.Model):
    STATUS_CHOICES = [("taken", "Taken"), ("done", "Done")]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="taken")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "job")

    def __str__(self) -> str:
        return f"{self.user_id}:{self.job_id}:{self.status}"


class JobPack(models.Model):
    job = models.OneToOneField(Job, on_delete=models.CASCADE)
    questions_to_client = models.JSONField(default=list)
    scope_template = models.TextField()
    contract_template = models.TextField()
    invoice_template = models.TextField()

    def __str__(self) -> str:
        return f"JobPack {self.job_id}"
