import Container from "./components/Container";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import LoginSignupContainer from "./components/LoginSignupContainer";
import Welcome from "./components/Welcome";
import MessagesArea from "./components/MessagesArea";
import UserGroups from "./components/UserGroups";
import  Groups  from "./components/Groups";
import AvailableGroups from "./components/AvailableGroups";
import Signup from "./components/Signup";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginSignupContainer />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />


          <Route path="/dashboard" element={<Container />} >
            <Route path="welcome" element={<Welcome/>}></Route>
            <Route path="message/:id" element={<MessagesArea/>}></Route>
            <Route path="users" element={<UserGroups/>}></Route>
            <Route path="create-groups" element={<Groups/>}></Route>
            <Route path="Available-groups" element={<AvailableGroups/>}></Route>

          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
