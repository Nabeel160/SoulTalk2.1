from rest_framework import serializers
from .models import Doctors, DocReview
from user.serializer import UserSerializer


class DoctorStart(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Doctors
        fields = ('first_name', 'last_name', 'user', 'documents')


class DocReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = DocReview
        fields = ('rating', 'comment', 'added_on', 'user', 'doctors')

    def get_queryset(self):
        return DocReview.objects.all().order_by('-added_on')



class DoctorsSerializerFav(serializers.ModelSerializer):
    class Meta:
        model = Doctors
        fields = ('id', 'first_name', 'last_name')


class DoctorsSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    reviews = DocReviewSerializer(many=True, read_only=True, source='docreview_set')

    class Meta:
        model = Doctors
        fields = ('id', 'first_name', 'last_name', 'age', 'qualification', 'user', 'image', 'reviews')
