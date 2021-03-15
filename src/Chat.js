import './Chat.css'
import React, {useState} from "react"
import {Avatar, IconButton} from '@material-ui/core'

import MicSvg from './MicSvg'
import ChatSvg from './ChatSvg'
import ChartSvg from './ChartSvg'
import MoreSvg from './MoreSvg'
import SearchSvg from './SearchSvg'
import AttachSvg from './AttachSvg'
import SmileySvg from './SmileySvg'
import PlaneSvg from './PlaneSvg';

import axios from './axios';

function Chat({messages}) {
    const [input, setInput] = useState("");
    

    const sendMessage = async (e) => {
        e.preventDefault();

       await axios.post("/messages/new", {
            message: input,
            name: "Pablo",
            timestamp: new Date().toUTCString(),
            received: false,
        });

        setInput("");
    };
    return (
        <div className="chat">
       <div className="chat-header">
           <Avatar/>
           <div className="chat-headerInfo">
               <h3>Room name</h3>
               <p>Last seen at...</p>
           </div>
           <div className="chat-headerRight">
           <IconButton>
        <SearchSvg className="SvgIcon" style={{width: 24}}/>
        </IconButton>
        <IconButton >
        <AttachSvg className="SvgIcon" style={{width: 24}}/>
        </IconButton>
        <IconButton>
            <MoreSvg className="SvgIcon" style={{width: 24}}/>
        </IconButton>
           </div>
       </div>

       <div className="chat-body">
       {messages.map((message, i) => {
           return (
           <p 
           className={`chat-message ${message.received && "chat-reciever"}`}>
           <span className="chat-name">{message.name}</span>
           {message.message}
           <span className="chat-timestamp">
              {message.timestamp}
           </span>
           </p>
       );
       })}
       </div>

       <div className="chat-footer">
     
           <SmileySvg className="SvgIcon smile" style={{width: 24}}/>
           <form>
               <input 
               value={input}
               onChange= {(e) => { setInput(e.target.value);
               }}
               placeholder="Type a message"
               type="text"/>
         
               <PlaneSvg className="button-send" style={{width: 24}}onClick={sendMessage} type="submit">
                  send a message
            </PlaneSvg>
           </form>
           <MicSvg className="SvgIcon mic" style={{width: 24}}/>
   
       </div>
        </div>
    )
}

export default Chat
