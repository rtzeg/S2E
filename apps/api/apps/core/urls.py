from django.urls import path

from .views import (
    CoachAskView,
    HomeworkResultView,
    HomeworkSubmitView,
    JobPackView,
    JobTakeView,
    JobsListView,
    RoadmapDetailView,
    RoadmapListView,
)

urlpatterns = [
    path("roadmap", RoadmapListView.as_view()),
    path("roadmap/<int:step_id>", RoadmapDetailView.as_view()),
    path("homework/submit", HomeworkSubmitView.as_view()),
    path("homework/result/<int:submission_id>", HomeworkResultView.as_view()),
    path("coach/ask", CoachAskView.as_view()),
    path("jobs", JobsListView.as_view()),
    path("jobs/<int:job_id>/take", JobTakeView.as_view()),
    path("jobs/<int:job_id>/pack", JobPackView.as_view()),
]
