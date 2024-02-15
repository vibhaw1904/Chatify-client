import React, { useContext, useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SearchIcon from "@mui/icons-material/Search";
import "./temp.css";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { myContext } from "./Container";
import axios from "axios";

const ContactsSlide = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const { refresh, setRefresh } = useContext(myContext);
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const user = userData?.data; // Ensure userData is defined before accessing data

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await axios.get('http://localhost:5000/chat/', {
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
          <IconButton>
            <DarkModeIcon />
          </IconButton>
        </div>
      </div>
      <div className="Search">
        <IconButton>
          {" "}
          <SearchIcon />
        </IconButton>
        <input type="text" placeholder="search..." />
      </div>
      <div className="contacts">
        {messages.length > 0 ? (
          messages.map((conversation, index) => {
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
