from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Perfil,CarpetaFiscal,ArchivoInvestigado,Imputado,ArchivoDisposicion

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
        fields = [
            'id', 'nombres', 'apellidos', 'dni', 'fecha_nacimiento', 
            'sexo', 'estado_civil', 'direccion', 'foto', 'user',
        ]
        extra_kwargs = {
            "user": {"read_only": True},  # El usuario lo asigna el backend
        }

# Serializer para el modelo CarpetaFiscal
class CarpetaFiscalSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarpetaFiscal
        fields = [
            'id',
            'numero_carpeta',
            'fecha',
            'numero_expediente',
            'estado'
        ]
        extra_kwargs = {
            "id": {"read_only": True},  # El usuario lo asigna el backend
        }
        


# Serializer para el modelo ArchivoDisposicion
class ArchivoDisposicionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArchivoDisposicion
        fields = [
            'id',
            'nombre',
            'fecha',
            'tipo',
            'archivo',
            'carpeta_fiscal',
            'subido_user',
        ]
        extra_kwargs = {
            "subido_user": {"read_only": True}, 
            "carpeta_fiscal" : {"read_only": True}, 
        }

class ImputadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Imputado
        fields = [
            'id',
            'nombres',
            'apellidos',
            'dni',
            'direccion',
            'correo_electronico',
            'telefono',
            'carpeta_fiscal',
        ]
        extra_kwargs = {
            "carpeta_fiscal" : {"read_only": True}, 
        }


class ArchivoInvestigadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArchivoInvestigado
        fields = [
            'id',
            'nombre',
            'archivo',
            'fecha',
            'imputado',
            'subido_user',
        ]
        extra_kwargs = {
            "imputado" : {"read_only": True}, 
            "subido_user" : {"read_only": True}, 
        }

        