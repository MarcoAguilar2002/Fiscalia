from django.urls import path
from . import views

urlpatterns = [
      # URLs para Caso: listar, crear, ver, actualizar y eliminar
    path('casos/', views.CasoListCreate.as_view(), name='caso-list-create'),
    path('casos/delete/<int:pk>/', views.CasoRetrieveUpdateDestroy.as_view(), name='caso-retrieve-update-destroy'),

    # URLs para Archivo: listar, crear, ver, actualizar y eliminar
    path('archivos/', views.ArchivoListCreate.as_view(), name='archivo-list-create'),
    path('archivos/<int:pk>/', views.ArchivoRetrieveUpdateDestroy.as_view(), name='archivo-retrieve-update-destroy'),

    # URLs para ParteInvolucrada: Crear ,listar , actualizar  y eliminar
    path('partes_involucradas/', views.ParteInvolucradaListCreate.as_view(), name='parte-involucrada-list'),
    path('partes_involucradas/<int:pk>/', views.ParteInvolucradaRetrieveUpdateDestroy.as_view(), name='parte-involucrada-retrieve-update'),

    # URLs para Perfil: ver y actualizar el perfil del usuario
    path('perfil/<int:pk>/', views.PerfilRetrieveUpdate.as_view(), name='perfil-retrieve-update'),
]