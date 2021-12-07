from django.shortcuts import render
from django.views.generic import TemplateView
# Create your views here.

class HomepageView(TemplateView):
    template_name = "pages/index.html"


class ContactView(TemplateView):
    template_name = "pages/contact.html"

class AboutUsView(TemplateView):
    template_name = "pages/about.html"