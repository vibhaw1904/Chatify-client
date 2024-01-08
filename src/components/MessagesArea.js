import React from "react";
import "./temp.css";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { IconButton } from "@mui/material";
import RecieveMessage from "./RecieveMessage";
import SendMessage from "./SendMessage";
const MessagesArea = () => {
  return (
    <div className="messageArea-container">
      <div className="chat-header">
        <p className="msg-icon">t</p>
        <div className="header-text ">
          <p className="name-icon">Test#1</p>
          <p className="lm-icon">today</p>
        </div>
        <IconButton>
          <DeleteOutlineIcon/>
        </IconButton>
      </div>
      <div className="message-area">
      <SendMessage/>
      <RecieveMessage/>
      </div>
      <div className="text-input-area">
      <input type="text" placeholder="Type your message..."/>
      </div>
    </div>
  );
};

export default MessagesArea;
