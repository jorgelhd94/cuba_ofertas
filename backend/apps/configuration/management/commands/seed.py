import email
from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group, Permission, User
from django.core.exceptions import ObjectDoesNotExist


class Command(BaseCommand):
    help = 'Crea datos importantes para el funcionamiento del sistema'

    def handle(self, *args, **kwargs):
        self.create_user_groups()
        self.create_superuser()

    def create_user_groups(self):
        # Crear grupos
        admin_group, created_admin = Group.objects.get_or_create(
            name='Administrador')
        client_group, created_client = Group.objects.get_or_create(
            name='Cliente')

        # Asignar permisos (ejemplo: añadir todos los permisos a Administrador)
        if created_admin:
            permissions = Permission.objects.all()
            admin_group.permissions.set(permissions)

        # Mensajes de confirmación
        if created_admin:
            self.stdout.write(self.style.SUCCESS(
                'Grupo "Administrador" creado.'))
        else:
            self.stdout.write(self.style.SUCCESS(
                'Grupo "Administrador" ya existe.'))

        if created_client:
            self.stdout.write(self.style.SUCCESS('Grupo "Cliente" creado.'))
        else:
            self.stdout.write(self.style.SUCCESS('Grupo "Cliente" ya existe.'))

    def create_superuser(self):
        email = 'jorgelhd94@gmail.com'
        username = 'admin'
        password = 'Admin*123*'

        try:
            user = User.objects.get(username=username)
            self.stdout.write(self.style.SUCCESS(
                f'El superusuario "{username}" ya existe.'))
        except ObjectDoesNotExist:
            user = User.objects.create_superuser(
                username=username, password=password, email=email)
            self.stdout.write(self.style.SUCCESS(
                f'Superusuario "{username}" creado con la contraseña "{password}".'))

        # Añadir el superusuario al grupo Administrador
        admin_group = Group.objects.get(name='Administrador')
        user.groups.add(admin_group)
        self.stdout.write(self.style.SUCCESS(
            f'El superusuario "{username}" ha sido añadido al grupo "Administrador".'))
