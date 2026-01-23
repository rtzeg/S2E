import os
import sys

from django.apps import AppConfig
from django.conf import settings
from django.core.management import call_command
from django.db.utils import OperationalError, ProgrammingError

_seeded = False


class CoreConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.core"

    def ready(self):
        global _seeded
        if _seeded or not getattr(settings, "AUTO_SEED_DATA", False):
            return
        if any(
            cmd in sys.argv
            for cmd in ("migrate", "makemigrations", "collectstatic", "shell", "dbshell", "seed_data")
        ):
            return
        if os.environ.get("RUN_MAIN") not in (None, "true"):
            return
        from apps.core.models import Job, RoadmapStep

        try:
            if RoadmapStep.objects.exists() or Job.objects.exists():
                _seeded = True
                return
            call_command("seed_data")
            _seeded = True
        except (OperationalError, ProgrammingError):
            return
