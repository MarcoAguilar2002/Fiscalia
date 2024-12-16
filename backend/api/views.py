from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import UserSerializer, PerfilSerializer,CarpetaFiscalSerializer,ImputadoSerializer,ArchivoInvestigadoSerializer,ArchivoDisposicionSerializer
from .models import  Perfil,CarpetaFiscal,Imputado,ArchivoInvestigado,ArchivoDisposicion
from django.shortcuts import get_object_or_404


# View para crear usuarios
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        user = serializer.save()
        Perfil.objects.create(user=user) 

# ---- Perfil
class VerPerfilView(generics.RetrieveAPIView):
    queryset = Perfil.objects.all()
    serializer_class = PerfilSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return Perfil.objects.get(user=self.request.user)

class EditarPerfilView(generics.UpdateAPIView):
    queryset = Perfil.objects.all()
    serializer_class = PerfilSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return Perfil.objects.get(user=self.request.user)

#---- Carpeta Fiscal
class CarpetaFiscalListCreateView(generics.ListCreateAPIView):
    queryset = CarpetaFiscal.objects.all()
    serializer_class = CarpetaFiscalSerializer
    permission_classes = [IsAuthenticated]

class CarpetaFiscalRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CarpetaFiscal.objects.all()
    serializer_class = CarpetaFiscalSerializer
    permission_classes = [IsAuthenticated]

class VerCarpetaView(generics.RetrieveAPIView):
    queryset = CarpetaFiscal.objects.all()
    serializer_class = CarpetaFiscalSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return CarpetaFiscal.objects.get(id=self.kwargs['pk'])
    
#---- Imputados
class ImputadosListCreateView(generics.ListCreateAPIView):
    serializer_class = ImputadoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        carpeta_id = self.kwargs['pk']
        return Imputado.objects.filter(carpeta_fiscal=carpeta_id)
    
    def perform_create(self, serializer):
        carpeta_id = self.kwargs['pk']
        carpeta_fiscal = CarpetaFiscal.objects.get(pk=carpeta_id)
        serializer.save(carpeta_fiscal=carpeta_fiscal)

class ArchivosImputadosListCreateView(generics.ListCreateAPIView):
    queryset = ArchivoInvestigado.objects.all()
    serializer_class = ArchivoInvestigadoSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        imputado = Imputado.objects.get(pk=self.kwargs['imputado'])
        serializer.save(imputado=imputado, subido_user=self.request.user)

class ArchivosImputadosRetrieveDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = ArchivoInvestigado.objects.all()
    serializer_class = ArchivoInvestigadoSerializer
    permission_classes = [IsAuthenticated]

    

class ArchivosDisposicionesListCreateView(generics.ListCreateAPIView):
    serializer_class = ArchivoDisposicionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        carpeta_id = self.kwargs.get('pk')
        carpeta = get_object_or_404(CarpetaFiscal, id=carpeta_id)
        queryset = ArchivoDisposicion.objects.filter(carpeta_fiscal=carpeta)
        return queryset
    
    def perform_create(self, serializer):
        carpeta_id = self.kwargs.get('pk')
        carpeta = get_object_or_404(CarpetaFiscal, id=carpeta_id)
        serializer.save(
            subido_user=self.request.user,
            carpeta_fiscal=carpeta
        )

class ArchivosDisposicionVerEditarYEliminar(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ArchivoDisposicionSerializer
    permission_classes = [IsAuthenticated]
    queryset = ArchivoDisposicion.objects.all()

    def partial_update(self, request, *args, **kwargs):
        archivo = self.get_object()  # Obtiene la instancia actual del modelo
        data = request.data

        # Actualizar campos específicos desde los datos del request
        archivo.nombre = data.get('nombre', archivo.nombre)
        archivo.tipo = data.get('tipo', archivo.tipo)
        archivo.fecha = data.get('fecha', archivo.fecha)

        # Manejar archivo: si se proporciona uno nuevo, actualízalo
        if 'archivo' in request.FILES:
            archivo.archivo = request.FILES['archivo']
            archivo.subido_user = request.user  # Actualiza el usuario solo si hay nuevo archivo

        # Guardar los cambios en la base de datos
        archivo.save()

        # Serializar la instancia actualizada para devolverla al cliente
        serializer = self.get_serializer(archivo)
        return super().update(request, *args, **kwargs)

