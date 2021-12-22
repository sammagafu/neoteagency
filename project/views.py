from django.shortcuts import render
from django.views.generic import ListView,DetailView
from . models import Project,ProjectCategory
# Create your views here.

class ProjectListView(ListView):
    template_name = "project/list.html"
    model = Project
    context_object_name = "project"

    def get_context_data(self,**kwargs):
        context = super(ProjectListView,self).get_context_data(**kwargs)
        context['category'] = ProjectCategory.objects.all()
        return context


class ProjectDetailView(DetailView):
    model=Project
    context_object_name = "project"
    template_name = "project/detail.html"