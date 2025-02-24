import React, { createContext, useState } from "react";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [chatUser, setChatUser] = useState("");
  const [chatModal, setChatModal] = useState(false);
  const [contactModal, setContactModal] = useState(false);

  return (
    <ChatContext.Provider
      value={{
        chatModal,
        setChatModal,
        chatUser,
        setChatUser,
        setContactModal,
        contactModal
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export { ChatProvider, ChatContext };
