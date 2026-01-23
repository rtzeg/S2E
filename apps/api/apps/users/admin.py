from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin

from .models import UserProfile


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ("user", "track", "level", "goal", "identity_level", "cert_level")
    list_filter = ("track", "level", "goal", "identity_level", "cert_level")
    search_fields = ("user__username", "user__email")


admin.site.unregister(User)


@admin.register(User)
class UserAdmin(DjangoUserAdmin):
    list_display = ("username", "email", "first_name", "is_staff", "is_active")
    search_fields = ("username", "email", "first_name", "last_name")
