# chatroom/views.py

from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Room, Message
from .serializer import MessageSerializer



class MessageView(viewsets.ModelViewSet):
    serializer_class = MessageSerializer
    queryset = Message.objects.prefetch_related()



'''
@api_view(['GET'])
def get_messages(request, room_name):
    messages = room.messages.order_by('-timestamp')[:50]
    serializer = MessageSerializer(messages, many=True)
    return Response({'messages': serializer.data})

@api_view(['POST'])
def send_message(request, room_name):
    room = get_object_or_404(Room, name=room_name)

    # Assuming the content of the message is provided in the request's JSON data
    content = request.data.get('content')

    if content:
        # Create a new message and save it to the room
        message = Message.objects.create(room=room, content=content)
        serializer = MessageSerializer(message)
        return Response(serializer.data, status=201)
    else:
        return Response({'error': 'Content is required'}, status=400)
'''