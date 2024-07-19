from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group, Permission

class Command(BaseCommand):
    help = 'Crea los grupos de usuarios: Administrador, Cliente y Publico'

    def handle(self, *args, **kwargs):
        self.create_user_groups()

    def create_user_groups(self):
        # Crear grupos
        admin_group, created_admin = Group.objects.get_or_create(name='Administrador')
        client_group, created_client = Group.objects.get_or_create(name='Cliente')

        # Asignar permisos (ejemplo: añadir todos los permisos a Administrador)
        if created_admin:
            permissions = Permission.objects.all()
            admin_group.permissions.set(permissions)

        # Mensajes de confirmación
        if created_admin:
            self.stdout.write(self.style.SUCCESS('Grupo "Administrador" creado.'))
        else:
            self.stdout.write(self.style.SUCCESS('Grupo "Administrador" ya existe.'))

        if created_client:
            self.stdout.write(self.style.SUCCESS('Grupo "Cliente" creado.'))
        else:
            self.stdout.write(self.style.SUCCESS('Grupo "Cliente" ya existe.'))

