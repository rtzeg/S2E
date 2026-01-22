from django.contrib import admin
from django.http import JsonResponse
from django.urls import include, path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView


admin.site.site_header = "Администрирование Skill2Earn"
admin.site.site_title = "Skill2Earn Admin"
admin.site.index_title = "Администрирование проектов и контента"


def root_view(_request):
    return JsonResponse(
        {
            "message": "Skill2Earn API",
            "docs": "/api/docs/",
            "schema": "/api/schema/",
            "api_base": "/api/",
        }
    )


urlpatterns = [
    path("", root_view, name="root"),
    path("admin/", admin.site.urls),
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="docs"),
    path("api/", include("apps.users.urls")),
    path("api/", include("apps.core.urls")),
]
