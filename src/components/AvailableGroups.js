import React, { useEffect, useState } from "react";
import "./temp.css";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import RefreshIcon from "@mui/icons-material/Refresh";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { refreshSidebarFun } from "../Features/refreshSidebar";
import { useDispatch } from "react-redux";
function AvailableGroups() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [groups, setGroups] = useState([]);
  const user = userData.data;
  const navigate = useNavigate();
  const dispatch=useDispatch()
  if (!userData) {
    console.log("User Not authenticated");
    navigate("/");
  }

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await axios.get("http://localhost:5000/chat/fetchGroup", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setGroups(res.data);
      } catch (error) {
        console.error("Error fetching groups:", error.message);
      }
    };

    fetchGroups(); 
  }, [user.token]);


  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{
          ease: "anticipate",
          duration: "0.3",
        }}
        className="list-container"
      >
        <div className={"ug-header" }>
          {/* <img
            src={logo}
            style={{ height: "2rem", width: "2rem", marginLeft: "10px" }}
          /> */}
          <p className={"ug-title"}>
            Available Groups
          </p>
          <IconButton
            className={"icon" }
            // onClick={() => {
            //   setRefresh(!refresh);
            // }}
          >
            <RefreshIcon />
          </IconButton>
        </div>
        <div className="sb-search" >
          <IconButton className="icon" >
            <SearchIcon />
          </IconButton>
          <input
            placeholder="Search"
            className="search-box"
          />
        </div>
        <div className="ug-list">
          {groups.map((group, index) => {
            return (
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className={"list-tem" }
                key={index}
                onClick={() => {
                  console.log("Creating chat with group", group.name);
                  const config = {
                    headers: {
                      Authorization: `Bearer ${user.token}`,
                    },
                  };
                  axios.put(
                    "http://localhost:8080/chat/addSelfToGroup",
                    {
                      chatId:group._id,
                      userId: user._id,
                    },
                    config
                  );
                  dispatch(refreshSidebarFun());
                }}
              >
                <p className="con-icon" >T</p>
                <p className="con-title" >
                  {group.chatName}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default AvailableGroups;