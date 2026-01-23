from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .models import UserProfile
from .serializers import ProfileUpdateSerializer, RegisterSerializer, UserProfileSerializer


class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        try:
            from rest_framework_simplejwt.tokens import RefreshToken
        except ImportError:
            return Response({"detail": "JWT not configured"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        login(request, user)
        try:
            profile = UserProfileSerializer(user.profile).data
        except UserProfile.DoesNotExist:
            UserProfile.objects.create(user=user)
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

        name = request.data.get("name")
        email = request.data.get("email")
        password = request.data.get("password")
        user = authenticate(username=email, password=password)
        if not user:
            return Response(
                {"detail": "Неверный email или пароль"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        if name:
            user.first_name = name
            user.save(update_fields=['first_name'])
        login(request, user)
        refresh = RefreshToken.for_user(user)
        return Response(
            {"access": str(refresh.access_token), "refresh": str(refresh), "profile": UserProfileSerializer(user.profile).data},
            status=status.HTTP_200_OK,
        )


class MeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        profile = request.user.profile
        return Response(UserProfileSerializer(profile).data)


class ProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        print(f"DEBUG: ProfileView called for user {request.user}, authenticated: {request.user.is_authenticated}")
        profile = request.user.profile
        badges = []
        if profile.identity_level in {"verified", "eid_mock"}:
            badges.append("Verified")
        if profile.cert_level != "none":
            badges.append("Certified")
        data = UserProfileSerializer(profile).data
        data["badges"] = badges
        print(f"DEBUG: Returning profile data: {data}")
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


class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        print(f"DEBUG: LogoutView called for user {request.user}")
        try:
            refresh_token = request.data.get("refresh")
            print(f"DEBUG: Refresh token received: {refresh_token}")
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()
                print(f"DEBUG: Refresh token blacklisted successfully")
        except Exception as e:
            print(f"DEBUG: Error blacklisting refresh token: {e}")
        logout(request)
        print(f"DEBUG: Django logout called")
        return Response({"detail": "Successfully logged out."}, status=status.HTTP_200_OK)
