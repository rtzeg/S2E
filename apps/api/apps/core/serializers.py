from rest_framework import serializers

from .models import (
    AIResult,
    Job,
    JobPack,
    RoadmapStep,
    Submission,
    TakenJob,
    UserRoadmapProgress,
)


class RoadmapStepSerializer(serializers.ModelSerializer):
    status = serializers.SerializerMethodField()

    class Meta:
        model = RoadmapStep
        fields = ("id", "title", "description", "est_time_minutes", "skill_tags", "order", "status")

    def get_status(self, obj):
        progress_map = self.context.get("progress_map", {})
        return progress_map.get(obj.id, "todo")


class RoadmapStepDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoadmapStep
        fields = ("id", "title", "description", "est_time_minutes", "skill_tags", "order")


class SubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submission
        fields = ("id", "step", "input_type", "content", "created_at")
        read_only_fields = ("id", "created_at")


class AIResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = AIResult
        fields = ("score", "strengths", "issues", "suggestions", "next_action")


class SubmissionResultSerializer(serializers.ModelSerializer):
    ai_result = serializers.SerializerMethodField()

    class Meta:
        model = Submission
        fields = ("id", "step", "input_type", "content", "created_at", "ai_result")

    def get_ai_result(self, obj):
        if hasattr(obj, "airesult"):
            return AIResultSerializer(obj.airesult).data
        return None


class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ("id", "title", "budget", "duration", "stack", "difficulty", "description")


class TakenJobSerializer(serializers.ModelSerializer):
    job = JobSerializer()

    class Meta:
        model = TakenJob
        fields = ("id", "job", "status", "created_at")


class JobPackSerializer(serializers.ModelSerializer):
    job = JobSerializer()

    class Meta:
        model = JobPack
        fields = (
            "job",
            "questions_to_client",
            "scope_template",
            "contract_template",
            "invoice_template",
        )
