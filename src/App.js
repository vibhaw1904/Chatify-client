import Container from "./components/Container";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import LoginSignupContainer from "./components/LoginSignupContainer";
import Signup from "./components/Signup";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginSignupContainer />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Container />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
