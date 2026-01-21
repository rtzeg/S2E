from django.contrib.auth.models import User
from django.db import models


class UserProfile(models.Model):
    TRACK_CHOICES = [
        ("web", "Web"),
        ("telegram", "Telegram"),
        ("design", "Design"),
    ]
    LEVEL_CHOICES = [
        ("zero", "Zero"),
        ("basic", "Basic"),
        ("confident", "Confident"),
    ]
    GOAL_CHOICES = [
        ("first_job", "First job"),
        ("raise_rate", "Raise rate"),
        ("portfolio", "Portfolio"),
    ]
    IDENTITY_CHOICES = [
        ("guest", "Guest"),
        ("verified", "Verified"),
        ("eid_mock", "eID mock"),
    ]
    CERT_CHOICES = [
        ("none", "None"),
        ("basic", "Basic"),
        ("pro", "Pro"),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    track = models.CharField(max_length=20, choices=TRACK_CHOICES, default="web")
    level = models.CharField(max_length=20, choices=LEVEL_CHOICES, default="zero")
    goal = models.CharField(max_length=20, choices=GOAL_CHOICES, default="first_job")
    identity_level = models.CharField(
        max_length=20, choices=IDENTITY_CHOICES, default="guest"
    )
    cert_level = models.CharField(max_length=20, choices=CERT_CHOICES, default="none")

    def __str__(self) -> str:
        return f"Profile({self.user.username})"
