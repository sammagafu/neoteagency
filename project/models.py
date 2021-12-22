from django.db import models
from django.utils.translation import gettext as _
from django.utils.text import slugify
from django_quill.fields import QuillField


# Create your models here.
class ProjectCategory(models.Model):
    category = models.CharField(verbose_name=_("Project Category"), max_length=160)
    slug = models.SlugField(_("slug"),editable=False)

    def __str__(self):
        return self.category
    
    def save(self):
        self.slug = slugify(self.category)
        super(ProjectCategory,self).save()

    class Meta:
        """Meta definition for Project."""

        verbose_name = 'Project Category'
        verbose_name_plural = 'Project Categories'


class Project(models.Model):
    project = models.CharField(verbose_name=_("Project Name"), max_length=160)
    client = models.CharField(verbose_name=_("Clients Name"), max_length=100,blank=True,null=True)
    skills = models.CharField(verbose_name=_("skills"), max_length=100,blank=True,null=True)
    cover  = models.ImageField(verbose_name=_("Project Image"), upload_to="project/",blank=False,null=False,default="cover.png")
    slug = models.SlugField(_("slug"),editable=False,unique=True)
    content = QuillField(null=True,blank=True)
    views=models.IntegerField(default=0)
    published_date = models.DateField(_("Published Date"), auto_now=False, auto_now_add=True)
    category = models.ManyToManyField(ProjectCategory)

    """Model definition for Project."""
    class Meta:
        """Meta definition for Project."""

        verbose_name = 'Project'
        verbose_name_plural = 'Projects'

    def __str__(self):
        return self.project

    def save(self):
        if self.slug:
            self.slug = slugify(self.project)
            super(Project,self).save()

    def get_absolute_url(self):
        from django.urls import reverse
        return reverse('projects:detail', args=[str(self.slug)])