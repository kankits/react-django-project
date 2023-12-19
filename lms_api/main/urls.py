# payment/urls.py

from django.urls import path
from .views import ParticipantCreateView, ParticipantDetail

urlpatterns = [
    path('enroll/', ParticipantCreateView.as_view(), name='participant-enroll'),
    path('enroll/<str:pk>', ParticipantDetail.as_view(), name='participant-enroll'),
]
