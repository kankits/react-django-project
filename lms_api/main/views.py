# payment/views.py

from rest_framework import generics
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from .models import Participant
from .serializers import ParticipantSerializer

class ParticipantCreateView(generics.CreateAPIView):
    queryset = Participant.objects.all()
    serializer_class = ParticipantSerializer

    def perform_create(self, serializer):
        try:
            serializer.save()
            return Response({'message': 'Data saved successfully'})
        except ValidationError as e:
            return serializer.ValidationError('Invalid data enter')

class ParticipantDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Participant.objects.all()
    serializer_class = ParticipantSerializer
