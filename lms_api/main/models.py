# payment/models.py

from django.db import models
from django.core.exceptions import ValidationError

class Participant(models.Model):
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    age = models.IntegerField()
    enrolled_date = models.DateField(auto_now_add=True)
    chosen_batch = models.CharField(max_length=10, choices=[('6-7AM', '6-7AM'), ('7-8AM', '7-8AM'), ('8-9AM', '8-9AM'), ('5-6PM', '5-6PM')])

    def clean(self):
        errors = {}

        # Check if a user with the same name, age already exists
        existing_participant = Participant.objects.filter(
            name=self.name,
            age=self.age,
        ).exclude(pk=self.pk).first()

        # check if email is already used
        same_email =  Participant.objects.filter(
            email = self.email
        ).exclude(pk=self.pk).first()

        if existing_participant:
            errors['non_field_errors'] = 'You are already enrolled'

        if same_email:
            errors['invalid_email'] = 'Email already in use'

        if errors:
            raise ValidationError(errors)
        

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name
