#chatroom/consumers.py
import json

from channels.generic.websocket import AsyncWebsocketConsumer
from .models import Message
from channels.db import database_sync_to_async
from asgiref.sync import sync_to_async

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.messages = []
        await self.accept()
        await self.send_all_messages()
        await self.channel_layer.group_add("chatroom", self.channel_name)




    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("chatroom", self.channel_name)

    async def receive(self, text_data):
        await self.save_message(text_data)


    async def chat_message(self, event):
        # Send the received message to the client
        text_data = event['text']
        await self.send(text_data=text_data)

    async def save_message(self, text_data):
        # Parse the received JSON data
        data = json.loads(text_data)
        content = data.get('content')

        # Get the user (you need to implement this part)
        user = self.scope['user']  # Modify this according to your authentication mechanism

        # Save the message to the database
        if content and user:
            # Use database_sync_to_async to save the message asynchronously
            await self.create_message(user, content)
            username = user.username

        await self.channel_layer.group_send(
            "chatroom",
            {
                "type": "chat.message",
                "text": json.dumps({
                    "content": content,
                    "user": username
                }),
            }
        )

    @database_sync_to_async
    def create_message(self, user, content):
            # Create a new Message object with the provided user and content
            return Message.objects.create(user=user, content=content)

    @database_sync_to_async
    def send_all_messages(self):
        # Fetch all messages from the database
        messages = Message.objects.all().values('content', 'user__username', 'timestamp')  # Adjust fields as needed

        for message in messages:
            timestamp_str = message['timestamp'].strftime("%Y-%m-%d %H:%M:%S")
            self.send(text_data=json.dumps({
                'content': message['content'],
                'user': message['user__username'],
                'timestamp': timestamp_str
            }))
