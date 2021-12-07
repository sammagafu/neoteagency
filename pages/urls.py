from django.urls import path
from . import views
app_name = "pages"

urlpatterns = [
    path('',views.HomepageView.as_view(),name="home"),
    path('about-us',views.AboutUsView.as_view(),name="about"),
    path('contact',views.ContactView.as_view(),name="contact"),
]
