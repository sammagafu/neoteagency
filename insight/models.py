from django.db import models
from django.utils.translation import gettext as _
from django.utils.text import slugify
from django_quill.fields import QuillField

# Create your models here.
class InsightCategory(models.Model):
    category = models.CharField(verbose_name=_("Insight Category"), max_length=160)
    slug = models.SlugField(_("slug"),editable=False)

    def __str__(self):
        return self.category
    
    def save(self):
        self.slug = slugify(self.category)
        super(InsightCategory,self).save()

    class Meta:
        """Meta definition for Insight."""

        verbose_name = 'Insight Category'
        verbose_name_plural = 'Insight Categories'


class Insight(models.Model):
    insight = models.CharField(verbose_name=_("Insight Name"), max_length=160)
    cover  = models.ImageField(verbose_name=_("Insight Image"), upload_to="Insight/",blank=False,null=False,default="cover.png")
    slug = models.SlugField(_("slug"),editable=False,unique=True)
    content = QuillField(null=True,blank=True)
    views=models.IntegerField(default=0)
    published_date = models.DateField(_("Published Date"), auto_now=False, auto_now_add=True)
    category = models.ManyToManyField(InsightCategory)

    """Model definition for Insight."""
    class Meta:
        """Meta definition for Insight."""

        verbose_name = 'Insight'
        verbose_name_plural = 'Insights'

    def __str__(self):
        return self.Insight

    def save(self):
        if self.slug:
            self.slug = slugify(self.Insight)
            super(Insight,self).save()

    def get_absolute_url(self):
        from django.urls import reverse
        return reverse('insights:detail', args=[str(self.slug)])