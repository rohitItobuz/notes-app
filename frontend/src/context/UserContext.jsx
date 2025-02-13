import React, { createContext, useEffect, useState } from "react";
import axiosInstance from "../config/axios";
import { toast } from "react-toastify";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    profile: "",
    role: "",
  });
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [editUsername, setEditUsername] = useState(false);

  const updateUserDetails = (key, value) => {
    const data = JSON.parse(localStorage.getItem("userDetails"));
    const newData = { ...data, [key]: value };
    setUserDetails(newData);
    localStorage.setItem("userDetails", JSON.stringify(newData));
  };

  const uploadProfilePic = async (event) => {
    const data = event.target.files[0];
    try {
      const formData = new FormData();
      formData.append("uploadedFile", data);
      const response = await axiosInstance.post(`user/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const result = response.data;
      if (result.success) {
        toast.success(result.message);
        updateUserDetails("profile", result.profile);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("An error occurred while uploading the file.");
    }
  };

  const changeUsername = async (data) => {
    try {
      const response = await axiosInstance.put("user/change-username", data);
      const result = response.data;
      if (result.success) {
        toast.success(result.message);
        updateUserDetails("username", data.username);
        setEditUsername(false);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error changing username:", error);
      toast.error("An error occurred while changing the username.");
    }
  };

  return (
    <UserContext.Provider
      value={{
        userDetails,
        setUserDetails,
        uploadProfilePic,
        changeUsername,
        editUsername,
        setEditUsername,
        isLoggedIn,
        setLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
