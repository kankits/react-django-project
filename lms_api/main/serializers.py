# serializers.py
from rest_framework import serializers
from .models import Participant

class ParticipantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Participant
        fields = ['id', 'name', 'email', 'age', 'chosen_batch']

    def validate_age(self, value):
        if value < 18 or value > 65:
            raise serializers.ValidationError("Age must be between 18 and 65.")
        return value
