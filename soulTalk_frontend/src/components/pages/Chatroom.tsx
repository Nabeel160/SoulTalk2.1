// chatroom-frontend/src/Chatroom.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Message {
  content: string;
  user: string;
}

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const getCSRFToken = () => {
  const csrfCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('csrftoken='));
  return csrfCookie ? csrfCookie.split('=')[1] : '';
};

const client = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  withCredentials: true,
  headers: {
    'X-CSRFToken': getCSRFToken(),
  },
});

const Chatroom: React.FC = () => {
  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  var msg = "";


  useEffect(() => {

    const fetchOldMessages = async () => {
      try {
        const response = await client.get('/api/messages/'); // Adjust the API endpoint accordingly
        const formattedMesasge = response.data.map((msg: any) => ({
          content: msg.content,
          user: msg.user.username
        }))
        setReceivedMessages(formattedMesasge);
      } catch (error) {
        console.error('Error fetching old messages:', error);
      }
    };


    // Fetch old messages when the component mounts
    fetchOldMessages();


    const ws = new WebSocket('ws://127.0.0.1:8000/ws/chat/');
    setSocket(ws);

    ws.onmessage = event => {
      const newMessage: Message = JSON.parse(event.data);
      setReceivedMessages(prevMessages => [...prevMessages, newMessage]);
    };

    return () => {
      ws.close();
    };
  }, []);



  const sendMessage = () => {
    if (socket) {
      const messageData = JSON.stringify({ content: message });
      socket.send(messageData);
      setMessage('')
    }
  };

  return (
    <div>
      <br/>
      <br/>
      <br/>
      <input type="text" value={message} id="msgTxt" onChange={e => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
      <div>{receivedMessages.map((msg, index) => (
          <div key={index}>
            <p><strong>{msg.user}: </strong>{msg.content}</p>
          </div>
        ))}</div>
    </div>
  );
};

export default Chatroom;
