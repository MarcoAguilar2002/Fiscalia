from django.db import models
from django.contrib.auth.models import User

# Modelo Perfil (Información Adicional del Usuario)
class Perfil(models.Model):
    nombres = models.CharField(max_length=45, null=True, blank=True)
    apellidos = models.CharField(max_length=45, null=True, blank=True)
    dni = models.CharField(max_length=45, null=True, blank=True)
    fecha_nacimiento = models.DateField(null=True, blank=True)
    sexo = models.CharField(max_length=45, null=True, blank=True)
    estado_civil = models.CharField(max_length=45, null=True, blank=True)
    direccion = models.CharField(max_length=100, null=True, blank=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='perfil')
    foto = models.ImageField(upload_to='perfiles/', null=True, blank=True)  # Para imágenes de perfil

    def __str__(self):
        return f"Perfil {self.nombres} {self.apellidos}"

class CarpetaFiscal(models.Model):
    numero_carpeta = models.CharField(max_length=45)
    fecha = models.DateField(null=True, blank=True)
    numero_expediente = models.CharField(max_length=45,null=True,blank=True)
    estado = models.CharField(max_length=45,default="Preliminar")

    def __str__(self):
        return f"{self.numero_carpeta} - {self.numero_expediente}"

class ArchivoDisposicion(models.Model):
    nombre = models.CharField(max_length=45)
    fecha = models.DateField(auto_now_add=True)
    tipo = models.CharField(max_length=45)
    archivo = models.FileField(upload_to='archivos_disposicion/')
    carpeta_fiscal = models.ForeignKey(CarpetaFiscal, on_delete=models.CASCADE, related_name="archivos_disposicion")
    subido_user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="archivos_disposicion_subidos")

    def __str__(self):
        return self.nombre

class Imputado(models.Model):
    nombres = models.CharField(max_length=45)
    apellidos = models.CharField(max_length=45)
    dni = models.CharField(max_length=9)
    direccion = models.CharField(max_length=45)
    correo_electronico = models.EmailField(max_length=100)
    telefono = models.CharField(max_length=9)
    carpeta_fiscal = models.ForeignKey(CarpetaFiscal, on_delete=models.CASCADE, related_name="imputados")

    def __str__(self):
        return f"{self.nombres} {self.dni}"

class ArchivoInvestigado(models.Model):
    nombre = models.CharField(max_length=45)
    archivo = models.FileField(upload_to='archivos_investigados/')
    fecha = models.DateField(auto_now_add=True)
    imputado = models.ForeignKey(Imputado, on_delete=models.CASCADE, related_name="archivos_investigado")
    subido_user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="archivos_investigado_subidos")
    tipo = models.CharField(max_length=45)
    def __str__(self):
        return self.nombre