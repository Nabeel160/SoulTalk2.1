from django.contrib.auth import authenticate, get_user_model
from django.core.exceptions import ValidationError
from rest_framework import serializers
from doctors.models import Doctors
from .models import NewUser



class SubscribedDoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctors
        fields = ['id', 'first_name', 'last_name']


class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewUser
        fields = ['first_name', 'last_name', 'username', 'email']


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewUser
        fields = '__all__'
    def create(self, clean_data):
        user_obj = NewUser.objects.create_user(email=clean_data['email'], username=clean_data['username'], password=clean_data['password'], first_name=clean_data['first_name'], last_name=clean_data['last_name'], gender=clean_data['gender'], date_of_birth=clean_data['date_of_birth'], is_doctor=clean_data['is_doctor'], score=clean_data['score'])
        user_obj.save()
        return user_obj

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def check_user(self, clean_data):
        user = authenticate(username=clean_data['email'], password=clean_data['password'])
        if not user:
            raise ValidationError('User not found')
        return user



class SubscriberSerializer(serializers.ModelSerializer):

    class Meta:
        model = NewUser
        fields = ['id', 'first_name', 'last_name', 'subscribed']



class DoctorsSerializers(serializers.ModelSerializer):

    subscribers = SubscriberSerializer(many=True, read_only=True, source="newuser_set")
    class Meta:
        model = Doctors
        fields = ['id', 'subscribers']



class UserSerializer(serializers.ModelSerializer):

    doctor = DoctorsSerializers(many=True, read_only=True, source="doctors_set")
    favorite = serializers.SerializerMethodField()
    subscribed = SubscribedDoctorSerializer()

    class Meta:
        model = NewUser
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'favorite', 'subscribed', 'doctor', 'date_of_birth', 'gender', 'score', 'is_staff', 'is_doctor']

    def get_favorite(self, instance):
        from doctors.serializer import DoctorsSerializerFav
        return DoctorsSerializerFav(instance.favorite.all(), many=True).data



