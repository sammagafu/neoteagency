from django.contrib import admin
from . models import InsightCategory,Insight
# Register your models here.
admin.site.register(Insight)
admin.site.register(InsightCategory)