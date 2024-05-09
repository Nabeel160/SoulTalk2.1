from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
user = get_user_model()


def custom_validations(data):
    email = data['email'].strip()
    username = data['username'].strip()
    password = data['password'].strip()

    if not email:
        raise ValidationError("You need an email.")
    if user.objects.filter(email=email).exists():
        raise ValidationError("This email is already in use.")
    if not password or len(password) < 8:
        raise ValidationError("Password needs to be min 8 characters.")
    if not username:
        raise ValidationError("Choose another username.")
    if user.objects.filter(username=username).exists():
        raise ValidationError("Username already exists.")
    return data

def validate_email(data):
    email = data['email'].strip()
    if not email:
        raise ValidationError("An email is needed")
    return True


def validate_username(data):
    username = data['username'].strip()
    if not username:
        raise ValidationError("Choose a username")
    return True


def validate_password(data):
    password = data['password'].strip()
    if not password:
        raise ValidationError("A password is needed")
    return True