from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import UserSerializer, CasoSerializer, PerfilSerializer, ParteInvolucradaSerializer, ArchivoSerializer
from .models import Caso, Archivo, ParteInvolucrada, Perfil

# View para crear usuarios
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


# Views para Caso: listar, crear, obtener, actualizar y eliminar
class CasoListCreate(generics.ListCreateAPIView):
    serializer_class = CasoSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Caso.objects.filter(user_id=user)
    
    def perform_create(self, serializer):
        serializer.save(user_id=self.request.user)


class CasoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CasoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Caso.objects.filter(user_id=user)


# Views para Archivo: listar, crear, obtener, actualizar y eliminar
class ArchivoListCreate(generics.ListCreateAPIView):
    serializer_class = ArchivoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Filtrar archivos solo para los casos asociados al usuario actual
        return Archivo.objects.filter(caso_id__user_id=self.request.user)

    def perform_create(self, serializer):
        serializer.save()  # Suponiendo que `caso_id` se pasa en el request data


class ArchivoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ArchivoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Archivo.objects.filter(caso_id__user_id=self.request.user)


# Views para ParteInvolucrada: listar, obtener y actualizar
class ParteInvolucradaListCreate(generics.ListAPIView):
    serializer_class = ParteInvolucradaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return ParteInvolucrada.objects.filter(caso_id__user_id=self.request.user)


class ParteInvolucradaRetrieveUpdateDestroy(generics.RetrieveUpdateAPIView):
    serializer_class = ParteInvolucradaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return ParteInvolucrada.objects.filter(caso_id__user_id=self.request.user)
    
# Vista para ver y editar el perfil del usuario autenticado
class PerfilRetrieveUpdate(generics.RetrieveUpdateAPIView):
    serializer_class = PerfilSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        # Retorna el perfil del usuario autenticado
        return Perfil.objects.get(user_id=self.request.user)