from django.urls import path
from . import views
app_name = "insight"


urlpatterns = [
    path('',views.InsightListView.as_view(),name="list"),
    path('<str:slug>/',views.InsightDetailView.as_view(),name="detail"),
]
