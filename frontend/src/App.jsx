import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Verify from "./pages/Verify";
import { ErrorPage } from "./pages/ErrorPage";
import Dashboard from "./pages/Dashboard";
import EmailVerify from "./pages/EmailVerify";
import { ProtectedRoute } from "./pages/ProtectedRoute";
import { UserProfile } from "./pages/UserProfile";
import { PasswordChange } from "./pages/PasswordChange";
import { UserProvider } from "./context/UserContext";
import { NotesProvider } from "./context/NotesContext";
import Admin from "./pages/Admin";
import { ChatProvider } from "./context/ChatsContext";

const App = () => {
  return (
    <UserProvider>
      <NotesProvider>
        <ChatProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/admin" element={<Admin />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
              <Route path="*" element={<ErrorPage />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/verify" element={<Verify />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="/password" element={<PasswordChange />} />
              <Route path="/email-verify/:token" element={<EmailVerify />} />
            </Routes>
          </BrowserRouter>
        </ChatProvider>
      </NotesProvider>
    </UserProvider>
  );
};

export default App;
