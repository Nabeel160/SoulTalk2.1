from rest_framework import viewsets, permissions
from rest_framework.generics import CreateAPIView
from .serializer import PostSerializer, ReplySerializer
from .models import Post


class ReplyCreation(CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ReplySerializer
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class PostCreation(CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PostSerializer
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class PostView(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all().order_by('-added_on').prefetch_related('reply_set')






