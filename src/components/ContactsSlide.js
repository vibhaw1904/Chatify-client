import React, { useContext, useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchIcon from "@mui/icons-material/Search";
import "./temp.css";
import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { myContext } from "./Container";
import axios from "axios";
const ContactsSlide = () => {
  
  const userData = JSON.parse(localStorage.getItem("userData"));
  const { refresh, setRefresh } = useContext(myContext);
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const user = userData?.data;
  const [query,setQuery]=useState("")

  const filteredMessages = messages.filter((conversation) =>
    conversation.chatName.toLowerCase().includes(query.toLowerCase())
  );
  
  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await axios.get('https://chatify-backend-1w3m.onrender.com/chat/', {
          headers: {
            Authorization: `Bearer ${user?.token}`
          }
        });
        console.log("API Response:", response.data);
  
        if (Array.isArray(response.data)) {
          setMessages(response.data);
        } else {
          console.error("API response does not contain an array of messages.");
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
  
    console.log("Before API Request", messages);
    fetchMessage();
    console.log("After API Request", messages);
  
  }, [refresh, user?.token]); 

  const logout=()=>{
    localStorage.removeItem('User Token');
    localStorage.removeItem('users');
    navigate('/')
  }
  return (
    <div className="contactSlide-container">
      <div className="headers">
        <div>
          <IconButton onClick={()=>navigate('welcome')}>
            <AccountCircleIcon />
          </IconButton>
        </div>
        <div>
          <IconButton onClick={() => navigate("users")}>
            <PersonAddAltIcon />
          </IconButton>{" "}
          <IconButton onClick={() => navigate("create-groups")}>
            <GroupAddIcon />
          </IconButton>{" "}
          <IconButton onClick={() => navigate("Available-groups")}>
            <AddCircleIcon />
          </IconButton>{" "}
          <IconButton onClick={logout}>
            <LogoutIcon />
          </IconButton>
        </div>
      </div>
      <div className="Search">
        <IconButton >
          {" "}
          <SearchIcon />
        </IconButton>
        <input type="text" placeholder="search..." value={query}   onChange={(e) => setQuery(e.target.value)}/>
      </div>
      <div className="contacts">
        {filteredMessages.length > 0 ? (
          filteredMessages.map((conversation, index) => {
            var chatName = "";

            if (conversation.isGroupChat) {
              chatName = conversation.chatName;
            } else {
              // Using find to get the first user that is not the current user
              const otherUser = conversation.users.find(u => u._id !== user?._id);
              chatName = otherUser ? otherUser.username : "Unknown User";
            }

            if (conversation.latestMessage === undefined) {
              return (
                <div
                  key={index}
                  onClick={() => {
                    console.log("Refresh fired from sidebar");
                    setRefresh(!refresh);
                  }}
                >
                  <div
                    key={index}
                    className="conversation-container"
                    onClick={() => navigate("message/" + conversation._id + "&" + chatName)}
                  >
                    <p className={"msg-icon"}>{chatName[0]}</p>
                    <p className={"name-icon"}>{chatName}</p>
                    <p className="lm-icon">
                      No previous Messages, click here to start a new chat
                    </p>
                  </div>
                </div>
              );
            } else {
              return (
                <div
                  key={index}
                  className="conversation-container"
                  onClick={() => navigate("message/" + conversation._id + "&" + chatName)}
                >
                  <p className={"msg-icon"}>{chatName[0]}</p>
                  <p className={"name-icon"}>{chatName}</p>
                  <p className="lm-icon">
  {conversation.latestMessage ? conversation.latestMessage.content : "No messages available"}
</p>
                </div>
              );
            }
          })
        ) : (
          <p>No messages available</p>
        )}
      </div>
    </div>
  );
};

export default ContactsSlide;
