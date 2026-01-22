from django.urls import path

from .views import LoginView, MeView, ProfileView, RegisterView, VerifyMockView

urlpatterns = [
    path("auth/register", RegisterView.as_view()),
    path("auth/login", LoginView.as_view()),
    path("auth/me", MeView.as_view()),
    path("profile", ProfileView.as_view()),
    path("profile/verify-mock", VerifyMockView.as_view()),
]
