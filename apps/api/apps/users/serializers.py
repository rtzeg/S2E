from django.contrib.auth.models import User
from rest_framework import serializers

from .models import UserProfile


class RegisterSerializer(serializers.ModelSerializer):
    name = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ("email", "password", "name")
        extra_kwargs = {"password": {"write_only": True}}

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Такой пользователь уже существует")
        return value

    def create(self, validated_data):
        name = validated_data.pop("name")
        email = validated_data.get("email")
        user = User.objects.create_user(
            username=email,
            email=email,
            first_name=name,
            password=validated_data.get("password"),
        )
        return user


class UserProfileSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source="user.first_name")
    email = serializers.EmailField(source="user.email")

    class Meta:
        model = UserProfile
        fields = (
            "name",
            "email",
            "track",
            "level",
            "goal",
            "identity_level",
            "cert_level",
        )


class ProfileUpdateSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source="user.first_name", required=False)

    class Meta:
        model = UserProfile
        fields = ("track", "level", "goal", "name")

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', {})
        if 'first_name' in user_data:
            instance.user.first_name = user_data['first_name']
            instance.user.save(update_fields=['first_name'])
        return super().update(instance, validated_data)

