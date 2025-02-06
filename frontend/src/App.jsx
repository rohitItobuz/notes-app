import { createContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import { Note } from "./pages/Note";
import SignUp from "./pages/SignUp";
import Verify from "./pages/Verify";
import Dashboard from "./pages/Dashboard";
import EmailVerify from "./pages/EmailVerify";
import { ProtectedRoute } from "./config/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/email-verify/:token" element={<EmailVerify />} />
        <Route path="/note" element={<Note />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
