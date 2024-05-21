from django import forms
from django.core.validators import validate_image_file_extension
from django.utils.translation import gettext as _

from .models import Doctors, DocDocuments

class MultiFileInput(forms.ClearableFileInput):
    template_name = 'multi_file_input.html'
    def get_context(self, name, value, attrs):
        context = super().get_context(name, value, attrs)
        context['widget']['attrs']['multiple'] = True
        return context

class DoctorsAdminForm(forms.ModelForm):
    photos = forms.FileField(
        widget=MultiFileInput(attrs={"multiple": True}),
        label=_("Add photos"),
        required=False,
    )

    class Meta:
        model = Doctors
        fields = '__all__'

    def clean_photos(self):
        """Make sure only images can be uploaded."""
        for upload in self.files.getlist("photos"):
            validate_image_file_extension(upload)
        return self.cleaned_data['photos']

    def save_photos(self, doctors):
        """Process each uploaded image."""
        for upload in self.cleaned_data['photos']:
            photo = DocDocuments(doctor=doctors, photo=upload)
            photo.save()
        return doctors
