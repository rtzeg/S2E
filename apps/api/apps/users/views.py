from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import UserProfile
from .serializers import ProfileUpdateSerializer, RegisterSerializer, UserProfileSerializer


class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        from rest_framework_simplejwt.tokens import RefreshToken

        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        profile = UserProfileSerializer(user.profile).data
        refresh = RefreshToken.for_user(user)
        return Response(
            {"access": str(refresh.access_token), "refresh": str(refresh), "profile": profile},
            status=status.HTTP_201_CREATED,
        )


class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        from rest_framework_simplejwt.tokens import RefreshToken

        email = request.data.get("email")
        password = request.data.get("password")
        user = authenticate(username=email, password=password)
        if not user:
            return Response(
                {"detail": "Неверный email или пароль"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        refresh = RefreshToken.for_user(user)
        return Response({"access": str(refresh.access_token), "refresh": str(refresh)})


class MeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        profile = request.user.profile
        return Response(UserProfileSerializer(profile).data)


class ProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        profile = request.user.profile
        badges = []
        if profile.identity_level in {"verified", "eid_mock"}:
            badges.append("Verified")
        if profile.cert_level != "none":
            badges.append("Certified")
        data = UserProfileSerializer(profile).data
        data["badges"] = badges
        return Response(data)

    def patch(self, request):
        profile = request.user.profile
        serializer = ProfileUpdateSerializer(profile, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(UserProfileSerializer(profile).data)


class VerifyMockView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        profile = request.user.profile
        target = request.data.get("identity_level", "verified")
        if target not in {"verified", "eid_mock"}:
            return Response(
                {"detail": "identity_level должен быть verified или eid_mock"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        profile.identity_level = target
        profile.save(update_fields=["identity_level"])
        return Response(UserProfileSerializer(profile).data)
