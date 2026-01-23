from django.db import migrations, models
import django.db.models.deletion
from django.conf import settings


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="UserProfile",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                (
                    "track",
                    models.CharField(
                        choices=[("web", "Web"), ("telegram", "Telegram"), ("design", "Design")],
                        default="web",
                        max_length=20,
                    ),
                ),
                (
                    "level",
                    models.CharField(
                        choices=[("zero", "Zero"), ("basic", "Basic"), ("confident", "Confident")],
                        default="zero",
                        max_length=20,
                    ),
                ),
                (
                    "goal",
                    models.CharField(
                        choices=[("first_job", "First job"), ("raise_rate", "Raise rate"), ("portfolio", "Portfolio")],
                        default="first_job",
                        max_length=20,
                    ),
                ),
                (
                    "identity_level",
                    models.CharField(
                        choices=[("guest", "Guest"), ("verified", "Verified"), ("eid_mock", "eID mock")],
                        default="guest",
                        max_length=20,
                    ),
                ),
                (
                    "cert_level",
                    models.CharField(
                        choices=[("none", "None"), ("basic", "Basic"), ("pro", "Pro")],
                        default="none",
                        max_length=20,
                    ),
                ),
                (
                    "user",
                    models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name="profile", to=settings.AUTH_USER_MODEL),
                ),
            ],
        ),
    ]
