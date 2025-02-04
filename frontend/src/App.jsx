import Dashboard from "./pages/Dashboard";
import EmailVerify from "./pages/EmailVerify";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp"
import Verify from "./pages/Verify"
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/email-verify/:token" element={<EmailVerify/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App
