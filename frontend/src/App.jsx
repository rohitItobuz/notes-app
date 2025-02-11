import { createContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Verify from "./pages/Verify";
import Dashboard from "./pages/Dashboard";
import EmailVerify from "./pages/EmailVerify";
import { ProtectedRoute } from "./config/ProtectedRoute";
import { UserProfile } from "./pages/UserProfile";
import { PasswordChange } from "./pages/PasswordChange";
import { UserProvider } from "./context/UserContext";

const App = () => {
  return (
    <UserProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<UserProfile />} />
        </Route>
        <Route path="/register" element={<SignUp />} />
        <Route path="/password" element={<PasswordChange />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/verify" element={<Verify />} />

        <Route path="/email-verify/:token" element={<EmailVerify />} />
      </Routes>
    </BrowserRouter>
    </UserProvider>
  );
};

export default App;
