from rest_framework.authentication import SessionAuthentication
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import NewUser
from .serializer import UserSerializer, UserRegisterSerializer, UserLoginSerializer, UserUpdateSerializer
from django.contrib.auth import get_user_model, login, logout
from rest_framework import permissions, status
from .validations import custom_validations, validate_email, validate_password, validate_username
from django.http import JsonResponse
from django.shortcuts import redirect

from doctors.models import Doctors


class RemoveFavorite(APIView):
    def post(self, request, *args, **kwargs):
        user = self.request.user
        doctor_id = request.data.get('doctorId')

        # Check if the doctor is in the user's favorites before trying to remove
        if doctor_id in user.favorite.values_list('id', flat=True):
            user.favorite.remove(doctor_id)
            user.save()
            return Response({'message': 'Doctor removed from favorites successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Doctor not found in favorites'}, status=status.HTTP_400_BAD_REQUEST)

class AddFavorite(APIView):
    def post(self, request, *args, **kwargs):
        user = self.request.user
        doctor_id = request.data.get('doctorId')
        user.favorite.add(doctor_id)
        user.save()

        return Response({'message': 'Doctor favorited successfully'}, status=status.HTTP_200_OK)



class UpdateProfile(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request):
        user = request.user
        serializer = UserUpdateSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Profile updated successfully'})
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)


    def post(self,request):
        clean_data = custom_validations(request.data)
        serializer = UserRegisterSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(clean_data)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)



class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request):
        data = request.data
        assert validate_email(data)
        assert validate_password(data)
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data)
            login(request, user)
            return Response(serializer.data, status=status.HTTP_200_OK)

class UserLogout(APIView):
    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)


class UserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)


class UserViewSet(viewsets.ModelViewSet):
    queryset = NewUser.objects.all()
    serializer_class = UserSerializer


