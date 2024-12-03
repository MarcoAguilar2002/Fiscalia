from django.urls import path
from . import views

urlpatterns = [
    path("perfil/",views.VerPerfilView.as_view(),name = "ver-perfil"),
    path("editar-perfil/",views.EditarPerfilView.as_view(),name = "editar-perfil"),
    path("carpetasFiscales/",views.CarpetaFiscalListCreateView.as_view(),name="carpetas-fiscales"),
    path('carpeta-fiscal/<int:pk>/', views.CarpetaFiscalRetrieveUpdateDestroyView.as_view(), name='carpeta-fiscal-detail'),
    path("carpeta/<int:pk>/", views.VerCarpetaView.as_view(), name="ver-Carpeta"),
    path("carpeta/<int:pk>/imputados/", views.ImputadosListCreateView.as_view(), name="imputados-list-create"),
    path("imputado/<int:imputado>/archivos/",views.ArchivosImputadosListCreateView.as_view(),name="archivos-imputados-list-create"),
    path('carpeta/<int:pk>/archivos-disposiciones/', views.ArchivosDisposicionesListCreateView.as_view(), name='archivos-disposiciones'),
]