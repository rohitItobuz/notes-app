import { useEffect, useRef, useState, useContext } from "react";
import { IoSend } from "react-icons/io5";
import { UserContext } from "../../context/UserContext";
import axiosInstance from "../../config/axios";
import { ChatContext } from "../../context/ChatsContext";
import { io } from "socket.io-client";
import default_profile_pic from "../../assets/default_profile_pic.webp";
import { RxCross1 } from "react-icons/rx";

export const ChatModal = () => {
  const { userDetails } = useContext(UserContext);
  const { chatUser, setChatModal, setChatUser } = useContext(ChatContext);
  const [allChats, setAllChats] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const chatContainerRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:3000", {
      extraHeaders: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    const handleReceiveMessage = (newMessage) => {
      newMessage.sender.username === chatUser.username &&
        setAllChats((prevChats) => [...prevChats, newMessage]);
    };

    socketRef.current.on("receive_message", handleReceiveMessage);

    return () => {
      socketRef.current.off("receive_message", handleReceiveMessage);
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    getAllChat();
  }, []);

  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [allChats]);

  const getAllChat = async () => {
    try {
      const response = await axiosInstance.get(
        `chat/getChat?receiverUsername=${chatUser.username}`
      );
      const result = response.data;
      setAllChats(result.success ? result.data : []);
    } catch (error) {
      console.error(error);
    }
  };

  const sendMessage = () => {
    if (!messageInput.trim()) return;
    const newMessage = {
      sender: { username: userDetails.username },
      receiver: { username: chatUser.username },
      content: messageInput.trim(),
    };
    setMessageInput("");
    setAllChats((prevChats) => [...prevChats, newMessage]);
    socketRef.current.emit("send_message", newMessage);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-50">
      <div className="w-screen max-w-96 mx-auto rounded-xl overflow-hidden border h-screen flex flex-col max-h-[600px] bg-white shadow-2xl">
        <div className="bg-blue-500 p-3 text-white font-semibold flex gap-3 items-center mb-1">
          <img
            className="w-9 h-9 rounded-full"
            src={
              chatUser.profile === ""
                ? default_profile_pic
                : chatUser.profile.replace("http:/", "http://")
            }
            alt="profile"
          />
          <span className="truncate flex-grow">{chatUser.username}</span>
          <button
            onClick={() => {
              setChatUser("");
              setChatModal(false);
            }}
          >
            <RxCross1 size={22} />
          </button>
        </div>
        <div
          className="flex-grow p-4 overflow-y-auto space-y-3 hide-scrollbar"
          ref={chatContainerRef}
        >
          {allChats.map((chat, index) => (
            <div
              key={index}
              className={`p-2 rounded-lg max-w-[75%] break-words ${chat.sender.username === userDetails.username
                  ? "bg-green-100 self-end ml-auto"
                  : "bg-blue-100 self-start"
                }`}
            >
              {chat.content}
            </div>
          ))}
        </div>

        <div className="p-4 border-t flex items-center space-x-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full p-2 border rounded-lg"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
          />
          <button
            className="p-2 bg-blue-500 text-white rounded-full"
            onClick={sendMessage}
          >
            <IoSend size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};
