import React, { useCallback, useContext, useEffect, useState } from "react";
import "./temp.css";
import axios from "axios";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import RecieveMessage from "./RecieveMessage";
import SendMessage from "./SendMessage";
import { useParams } from "react-router-dom";
import { myContext } from "./Container";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
const MessagesArea = () => {
  const navigate=useNavigate();
  const dyParams = useParams();
  const [chat_id, chat_user] = dyParams.id.split("&");
  const userData = JSON.parse(localStorage.getItem('userData'));
  const [messages, setAllMessages] = useState([]);
  const [messageContent, setMessageContent] = useState("");
  const { refresh, setRefresh } = useContext(myContext);
  const [connectionStatus, setConnectionStatus] = useState(false);

  const socket = io("http://localhost:5000");
  useEffect(() => {
    socket.emit("setup", userData);
    socket.on("connected", () => {
      setConnectionStatus(true);
    });

    socket.on("message received", (newMessageStatus) => {
      console.log("Received message:", newMessageStatus);
      if (newMessageStatus.chatId === chat_id) {
        setAllMessages((prevMessages) => [...prevMessages, newMessageStatus]);
      }
    });

    socket.on("error", (error) => {
      console.error('Socket.IO error:', error);
    });

    return () => {
      socket.off("connected");
      socket.off("message received");
      socket.off("error");
    };
  }, [userData,chat_id,socket]);

  useEffect(() => {
    console.log("Users refreshed");
    console.log("Chat ID:", chat_id);
    console.log("User Token:", userData.data.token);
  
    const config = {
      headers: {
        Authorization: `Bearer ${userData.data.token}`,
      },
    };
  
    axios
      .get("https://chatify-backend-1w3m.onrender.com/message/" + chat_id, config)
      .then((response) => {
        console.log("Rendered Response:", response.data);
        setAllMessages(response.data);
        socket.emit("join chat", chat_id);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
  }, [refresh, chat_id, userData.data.token,socket]);
  

  const sendMessage = useCallback( async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${userData.data.token}`,
      },
    };

    try {
      const response = await axios.post(
        "https://chatify-backend-1w3m.onrender.com/message/",
        {
          content: messageContent,
          chatId: chat_id,
        },
        config
      );

      setAllMessages((prevMessages) => [...prevMessages, response.data]);
      setMessageContent("");
      socket.emit("new message", response.data);
      setRefresh(!refresh);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  },[userData, messageContent, chat_id, setRefresh, socket,refresh]);


  //delete the chat 
  const delteChat=()=>{
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userData.data.token}`,
        },
      };
  
  
      axios.delete(`https://chatify-backend-1w3m.onrender.com/message/${chat_id}`,config)
      // navigate("welcome")
    } catch (error) {
      console.log("getting error",error)
    }
  }

  return (
    <div className="messageArea-container">
      <div className="chat-header">
        <p className="msg-icon">{chat_user[0]}</p>
        <div className="header-text ">
          <p className="name-icon">{chat_user}</p>
          {/* <p className="lm-icon">today</p> */}
        </div>
        <IconButton onClick={delteChat}>
          <DeleteOutlineIcon/>
        </IconButton>
      </div>
      <div className="message-area">
        {
          messages.slice(0).reverse().map((message,index)=>{
            const sender=message.sender;
            const selfID=userData.data._id;
            console.log(selfID)
            if(sender._id===selfID){
              return<SendMessage props={message} key={index}/>

            }
            else{
                return<RecieveMessage props={message} key={index}/>

            }
          })
        }
     


      </div>
      <div className="text-input-area">
      <input
  type="text"
  placeholder="Type your message..."
  value={messageContent}
  onChange={(e) => setMessageContent(e.target.value)}
  onKeyUp={(event) => {
    if (event.code === "Enter") {
      event.preventDefault();
      sendMessage();
      setMessageContent("");
    }
  }}
/>

      <IconButton
           onClick={()=>{
            sendMessage()
            setRefresh(!refresh)
           }}
          >
            <SendIcon />
          </IconButton>
      </div>
    </div>
  );
};

export default MessagesArea;
