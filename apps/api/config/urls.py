from django.contrib import admin
from django.http import JsonResponse
from django.urls import include, path
<<<<<<< HEAD
=======
from django.views.generic import RedirectView
>>>>>>> fd36de3d22e88d6ccb3ee29bab4ce739d5cb8680
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView


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
<<<<<<< HEAD

    path("admin/", admin.site.urls),

    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="docs"),

    # ✅ Развести по префиксам, чтобы не было конфликтов
    path("api/users/", include("apps.users.urls")),
    path("api/", include("apps.core.urls")),  # core пусть остаётся на /api/... (roadmaps тут логично)
=======
    path("admin/", admin.site.urls),
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="docs"),
    path("api/", include("apps.users.urls")),
    path("api/", include("apps.core.urls")),
>>>>>>> fd36de3d22e88d6ccb3ee29bab4ce739d5cb8680
]
