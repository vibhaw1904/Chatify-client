import React, { useState } from "react";
import './temp.css'
import { AnimatePresence, motion } from "framer-motion";

import DoneOutlineRoundedIcon from "@mui/icons-material/DoneOutlineRounded";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { create } from "@mui/material/styles/createTransitions";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Groups() {
  // const lightTheme = useSelector((state) => state.themeKey);
  const userData = JSON.parse(localStorage.getItem("userData"));
  // console.log("Data from LocalStorage : ", userData);
  const navigate = useNavigate();
  if (!userData) {
    console.log("User not Authenticated");
    navigate("/");
  }
  const user = userData.data;
  const [groupName, setGroupName] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // console.log("User Data from CreateGroups : ", userData);

  const createGroup = () => {
    const res= axios.post("http://localhost:5000/chat/createGroup",{
      name:groupName,
      users:['65880448a683d893a084a9aa','65b8e2b471906e9cdff6d57b']
    },{
      headers:{
        Authorization:`Bearer ${user.token}`
      }
    })
    navigate('/dashboard/Available-groups')
  };

  return (
    <AnimatePresence>
      
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Do you want to create a Group Named " + groupName}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This will create a create group in which you will be the admin and
              other will be able to join this group.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button
              onClick={() => {
                createGroup();
                handleClose();
              }}
              autoFocus
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div className="createGroups-container">
        <input
          placeholder="Enter Group Name"
          className="search-box"
          onChange={(e) => {
            setGroupName(e.target.value);
          }}
        />
        <IconButton
          className="icon"
          onClick={() => {
            handleClickOpen();
            createGroup();
          }}
        >
          <DoneOutlineRoundedIcon />
        </IconButton>
      </div>
    </AnimatePresence>
  );
}

export default Groups;