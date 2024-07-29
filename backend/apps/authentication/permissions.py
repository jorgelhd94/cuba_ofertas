from rest_framework.permissions import BasePermission


class ORPermissions(BasePermission):
    def __init__(self, *perms):
        self.perms = perms

    def has_permission(self, request, view):
        return any(perm().has_permission(request, view) for perm in self.perms)

    def has_object_permission(self, request, view, obj):
        return any(perm().has_object_permission(request, view, obj) for perm in self.perms)

    @classmethod
    def with_perms(cls, *perms):
        class CustomORPermissions(cls):
            def __init__(self):
                self.perms = perms
        return CustomORPermissions


class IsClient(BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name='Cliente').exists()
