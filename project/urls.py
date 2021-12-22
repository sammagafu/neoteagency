from django.urls import path
from . import views
app_name = "projects"


urlpatterns = [
    path('',views.ProjectListView.as_view(),name="list"),
    path('<str:slug>/',views.ProjectDetailView.as_view(),name="detail"),
]
