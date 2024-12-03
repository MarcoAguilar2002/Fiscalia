from django.contrib import admin
from .models import Perfil,CarpetaFiscal,Imputado,ArchivoInvestigado,ArchivoDisposicion

# Register your models here.
admin.site.register(Perfil)
admin.site.register(CarpetaFiscal)
admin.site.register(Imputado)
admin.site.register(ArchivoInvestigado)
admin.site.register(ArchivoDisposicion)