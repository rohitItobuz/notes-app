import React, { useContext, useEffect } from "react";
import { MdDelete, MdAddCircle } from "react-icons/md";
import { toast } from "react-toastify";
import axiosInstance from "../config/axios";
import { UserContext } from "../context/UserContext";
import default_profile_pic from "../assets/default_profile_pic.webp";
import { DashboardNavbar } from "../components/nav/DashboardNavbar";
import { NotesContext } from "../context/NotesContext";
import { NoteModal } from "../components/modal/NoteModal";
import { getAllUsers } from "../utils/getAllUser";
import { ChatModal } from "../components/modal/ChatModal";

export default function Admin() {
  const { noteModal, setNoteModal } = useContext(NotesContext);
  const { userList, setUserList, normalUsername, setNormalUsername, chatModal, setChatModal} =
    useContext(UserContext);

  const tableHeader = [
    "Username",
    "Profile",
    "Email",
    "Add Notes",
    "Start Chat",
    "Delete User",
  ];

  useEffect(() => {
    getAllUsers(setUserList);
  }, [normalUsername]);

  const deleteUser = async (normalUsername) => {
    try {
      setNormalUsername(normalUsername);
      const response = await axiosInstance.delete(`/user/delete-user`, {
        data: { normalUsername },
      });
      const result = response.data;
      result.success
        ? toast.success(result.message)
        : toast.error(result.message);
    } catch (error) {
      console.error(error);
    } finally {
      setNormalUsername("");
    }
  };

  return (
    <>
      <DashboardNavbar />
      <h1 className="text-4xl font-bold text-gray-800 m-4 text-center">
        All Users
      </h1>
      <div className="relative overflow-x-auto max-w-7xl mx-2 lg:mx-auto">
        <table className="w-full text-sm text-center text-gray-600 border border-gray-400 rounded-lg">
          <thead className="text-xs uppercase bg-blue-700 text-white border border-gray-400">
            <tr className="border border-gray-400 divide-x divide-gray-300">
              {tableHeader.map((item, key) => (
                <th key={key} className="px-6 py-3 border border-gray-300">
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300 border border-gray-400">
            {userList.map((user) => (
              <tr
                key={user.username}
                className="border border-gray-400 hover:bg-gray-50 divide-x divide-gray-300"
              >
                <td className="px-6 py-2 font-medium text-gray-900 border border-gray-300">
                  {user.username}
                </td>
                <td className="px-6 py-2 border border-gray-300">
                  <img
                    className="w-12 h-12 rounded-full mx-auto border border-gray-300"
                    src={
                      user.profile === ""
                        ? default_profile_pic
                        : user.profile.replace("http:/", "http://")
                    }
                    alt="profile"
                  />
                </td>
                <td className="px-6 py-2 w-1/4 border border-gray-300">
                  {user.email}
                </td>
                <td className="px-6 py-2 border border-gray-300">
                  <button
                    onClick={() => {
                      setNormalUsername(user.username);
                      setNoteModal(true);
                    }}
                  >
                    <MdAddCircle
                      size={40}
                      className="text-blue-500 hover:text-blue-700"
                    />
                  </button>
                </td>
                <td className="px-6 py-2 text-blue-600 cursor-pointer hover:underline border border-gray-300">
                  <button
                    onClick={() => {
                      setNormalUsername(user.username);
                      setChatModal(true);
                    }}
                  >
                    Chat
                  </button>
                </td>
                <td className="px-6 py-2 border border-gray-300">
                  <button
                    onClick={() => {
                      deleteUser(user.username);
                    }}
                  >
                    <MdDelete
                      size={30}
                      className="text-red-500 hover:text-red-700"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {chatModal && <ChatModal/>}
      {noteModal && <NoteModal />}
    </>
  );
}
