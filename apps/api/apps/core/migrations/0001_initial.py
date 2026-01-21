from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Job",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title", models.CharField(max_length=255)),
                ("budget", models.CharField(max_length=50)),
                ("duration", models.CharField(max_length=50)),
                ("stack", models.JSONField(default=list)),
                (
                    "difficulty",
                    models.CharField(choices=[("easy", "Easy"), ("medium", "Medium")], max_length=20),
                ),
                ("description", models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name="RoadmapStep",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title", models.CharField(max_length=255)),
                ("description", models.TextField()),
                ("est_time_minutes", models.PositiveIntegerField()),
                ("skill_tags", models.JSONField(default=list)),
                ("order", models.PositiveIntegerField()),
            ],
            options={"ordering": ["order"]},
        ),
        migrations.CreateModel(
            name="Submission",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                (
                    "input_type",
                    models.CharField(choices=[("text", "Text"), ("code", "Code")], max_length=20),
                ),
                ("content", models.TextField()),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "step",
                    models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to="core.roadmapstep"),
                ),
                (
                    "user",
                    models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
                ),
            ],
        ),
        migrations.CreateModel(
            name="UserRoadmapProgress",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                (
                    "status",
                    models.CharField(
                        choices=[("todo", "Todo"), ("in_progress", "In progress"), ("done", "Done")],
                        default="todo",
                        max_length=20,
                    ),
                ),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "step",
                    models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to="core.roadmapstep"),
                ),
                (
                    "user",
                    models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
                ),
            ],
            options={"unique_together": {("user", "step")}},
        ),
        migrations.CreateModel(
            name="TakenJob",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                (
                    "status",
                    models.CharField(
                        choices=[("taken", "Taken"), ("done", "Done")],
                        default="taken",
                        max_length=20,
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "job",
                    models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to="core.job"),
                ),
                (
                    "user",
                    models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
                ),
            ],
            options={"unique_together": {("user", "job")}},
        ),
        migrations.CreateModel(
            name="JobPack",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("questions_to_client", models.JSONField(default=list)),
                ("scope_template", models.TextField()),
                ("contract_template", models.TextField()),
                ("invoice_template", models.TextField()),
                (
                    "job",
                    models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to="core.job"),
                ),
            ],
        ),
        migrations.CreateModel(
            name="AIResult",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("score", models.PositiveIntegerField()),
                ("strengths", models.JSONField(default=list)),
                ("issues", models.JSONField(default=list)),
                ("suggestions", models.JSONField(default=list)),
                ("next_action", models.TextField()),
                (
                    "submission",
                    models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to="core.submission"),
                ),
            ],
        ),
    ]
