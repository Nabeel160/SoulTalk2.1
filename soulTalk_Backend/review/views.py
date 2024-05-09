from rest_framework import viewsets, permissions
from rest_framework.generics import CreateAPIView
from .serializer import ReviewSerializer
from .models import Reviews


class ReviewCreation(CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ReviewSerializer
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ReviewsView(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    queryset = Reviews.objects.all().order_by("-added_on")