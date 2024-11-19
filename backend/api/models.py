from django.db import models
from django.contrib.auth.models import User

class Perfil(models.Model):
    nombres = models.CharField(max_length=50)
    apellidos = models.CharField(max_length=50)
    fecha_nacimiento = models.DateField()
    sexo = models.CharField(max_length=45)
    direccion = models.CharField(max_length=45)
    telefono = models.CharField(max_length=45)
    user_id = models.OneToOneField(User, on_delete=models.CASCADE, related_name="perfil")

    def __str__(self):
        return f"{self.nombres} {self.apellidos}"


class Caso(models.Model):
    numero_expediente = models.CharField(max_length=45)
    descripcion = models.CharField(max_length=255)
    fecha_inicio = models.DateField() 
    estado = models.BooleanField()
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="casos")

    def __str__(self):
        return self.numero_expediente


class ParteInvolucrada(models.Model):
    nombres = models.CharField(max_length=45)
    apellidos = models.CharField(max_length=45)
    tipo_parte = models.CharField(max_length=45)
    contacto = models.CharField(max_length=45)
    caso_id = models.ForeignKey(Caso, on_delete=models.CASCADE, related_name="partes_involucradas")

    def __str__(self):
        return f"{self.nombres} {self.apellidos} ({self.tipo_parte})"


class Archivo(models.Model):
    titulo = models.CharField(max_length=45)
    descripcion = models.CharField(max_length=255)
    fecha_subida = models.DateTimeField(auto_now_add=True)
    caso_id = models.ForeignKey(Caso, on_delete=models.CASCADE, related_name="archivos")
    ruta = models.CharField(max_length=255)

    def __str__(self):
        return self.titulo