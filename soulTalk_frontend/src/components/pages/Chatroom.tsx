// chatroom-frontend/src/Chatroom.tsx

import React, { useState, useEffect,useRef } from 'react';
import bg from "../../assets/images/download.jpeg"
import axios from 'axios';
import "../../styles/PublicChatroom.css"
import bg1 from "../../assets/images/bg1.jpg"
import {logout} from "../../reduxStore/slice/Loginslice";
import {useNavigate} from "react-router-dom";
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
  const [User,setUser]=useState<any>("")
    const chatWindowRef = useRef<HTMLUListElement>(null);
  const navigate = useNavigate()
  var msg = "";

 const fetchUser = async () => {

            let response = await client.get('api/userview/')
            const user = await response.data.user
            setUser(user)
            console.log("User: ", response.data.user.username)

            let ur: any = getChatroomNameFromURL()
            let parts = ur.split("-")
        if(getChatroomNameFromURL()!="public"){
            if(parseInt(parts[0])===response.data.user.id || parseInt(parts[1])===response.data.user.id){
            }else {
                navigate("/")
            }
        }
    }
    function getChatroomNameFromURL(): string | null {
    const match = window.location.pathname.match(/^\/chat\/([^\/]+)/);
    return match ? match[1] : null;
}



    useEffect(() => {
        fetchUser()

    }, [])



  useEffect(() => {



    const fetchOldMessages = async () => {
      try {
        const response = await client.get('/api/messages/'); // Adjust the API endpoint accordingly
        const formattedMessage = response.data
          .filter((msg: any) => msg.room == channel_name) // Filter out messages with "hi" content
            .map((msg: any) => ({
           content: msg.content,
            user: msg.user.username,
                time:msg.timestamp
  }));
        setReceivedMessages(formattedMessage);
        if (chatWindowRef.current) {
          chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
      } catch (error) {
        console.error('Error fetching old messages:', error);
      }
    };

    // Fetch old messages when the component mounts
    fetchOldMessages();



  const channel_name = getChatroomNameFromURL();


    const ws = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${channel_name}`);
    setSocket(ws);

    ws.onmessage = event => {
      console.log("MESSAGE SENT")
      const newMessage: Message = JSON.parse(event.data);
      setReceivedMessages(prevMessages => [...prevMessages, newMessage]);
      console.log(receivedMessages)
         if (chatWindowRef.current) {
        chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
      }
    };

    setInterval(() => {
      fetchOldMessages()
    }, 1000)
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
      <>
    <div className=" body d-flex justify-content-center align-items-center  " style={{backgroundImage:`url(${bg1})`}}>

      <div className="scard">
        <div className="chat-header">Chat</div>
        <div className="chat-window">
          <ul className="message-list">
            {receivedMessages.map((msg, index) => (
        <div key={index} className={`message ${msg.user === User.username? 'sent' : 'received'}`} >

                <img src={bg} className="imgs rounded-circle mx-2 mt-1"/>


            <div className='con'>
                <p className="magic "> <strong>{msg.user}</strong></p>
                <p className="text-left"> <strong>{msg.content}</strong></p> </div>
              </div>
        ))}
          </ul>
        </div>
        <div className="chat-input">
          <input type="text" value={message} id="msgTxt" onKeyPress={(e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    }} onChange={e => setMessage(e.target.value)}  className="message-input" placeholder="Type your message here"/>
            <button type="button" onClick={sendMessage} className="send-button">Send</button>
        </div>
      </div>

    </div>
        </>
  );
};

export default Chatroom;