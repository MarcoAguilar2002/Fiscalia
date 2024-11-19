from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Caso,Archivo,ParteInvolucrada,Perfil

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id","username","password"]
        extra_kwargs = {"password":{"write_only":True}}

    def create(self,validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class PerfilSerializer(serializers.ModelSerializer):
    class Meta:
        model = Perfil
        fields = ['id', 'nombres', 'apellidos', 'fecha_nacimiento', 'sexo', 'direccion', 'telefono', 'user_id']
        extra_kwargs = {"user_id":{"read_only":True}}

class CasoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Caso
        fields = ['id', 'numero_expediente', 'descripcion', 'fecha_inicio', 'estado', 'user_id']
        extra_kwargs = {"user_id":{"read_only":True}}

class ParteInvolucradaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParteInvolucrada
        fields = ['id', 'nombres', 'apellidos', 'tipo_parte', 'contacto', 'caso_id']
        extra_kwargs = {"caso_id":{"read_only":True}}

class ArchivoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Archivo
        fields = ['id', 'titulo', 'descripcion', 'fecha_subida', 'caso_id', 'ruta']
        extra_kwargs = {"caso_id":{"read_only":True}}