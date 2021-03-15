
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import React, {useEffect, useState} from 'react';
import Pusher from 'pusher-js';
import axios from './axios';

function App() {
  const [messages, setMessages] = useState([]);


useEffect(() => {
axios.get("/messages/sync").then((response) => {
    setMessages(response.data)
  })
}, []);

  useEffect(() => {
    const pusher = new Pusher('7ff2bba66766b30b22ed', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      // alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage]);
    }); 

    return () => {
      channel.unbind_all();
      channel.unsubscribe("messages");
    }

  }, [messages]);

  return (
    <div className="app">
    <div className="app-body">
   <Sidebar/>
   <Chat messages={messages}/>
    </div>
    </div>
  );
};

export default App;
