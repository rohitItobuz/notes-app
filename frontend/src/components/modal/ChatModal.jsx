import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import axiosInstance from "../../config/axios";

export const ChatModal = () => {
  const [allChats, setAllChats] = [];
  const getAllChat = async () => {
    try {
      const response = await axiosInstance.post(
        `chat/getChat?receiverUsername=${normalUsername}`
      );
        const result = response.data;
        if (result.success) {
          setNotes(result.data);
          setNoteCount(result.totalNotes);
        } else {
          setNotes([]);
          setNoteCount(0);
        }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {}, []);

  const { normalUsername, setNormalUsername } = useContext(UserContext);
  return (
    <div className="max-w-96 mx-auto rounded-xl overflow-hidden border">
      <div className="bg-blue-500 p-3 text-white font-semibold ">
        {normalUsername}
      </div>
      <div className="h-[600px] p-2"></div>
    </div>
  );
};
