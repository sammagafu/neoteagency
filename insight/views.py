from django.shortcuts import render
from django.views.generic import ListView,DetailView
from . models import Insight,InsightCategory
# Create your views here.
class InsightListView(ListView):
    template_name = "insight/list.html"
    model = Insight
    context_object_name = "insight"

    def get_context_data(self,**kwargs):
        context = super(InsightListView,self).get_context_data(**kwargs)
        context['category'] = InsightCategory.objects.all()
        return context


class InsightDetailView(DetailView):
    model=Insight
    context_object_name = "insight"
    template_name = "insight/detail.html"