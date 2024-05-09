from rest_framework import serializers
from .models import Post, Reply
from user.serializer import UserSerializer


class ReplySerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Reply
        fields = ('id', 'Post', 'reply', 'user', 'added_on')

    def get_queryset(self):
        return Reply.objects.all().order_by('-added_on')

class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    replies = ReplySerializer(many=True, read_only=True, source='reply_set')

    class Meta:
        model = Post
        fields = ('id','subject', 'description', 'added_on', 'user', 'replies')

    def get_queryset(self):
        return Post.objects.all().order_by('-added_on')

