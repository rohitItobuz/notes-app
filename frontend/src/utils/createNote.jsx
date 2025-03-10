import { toast } from "react-toastify";
import axiosInstance from "../config/axios";

export const createNote = async (data, normalUsername) => {
  try {
    data.normalUsername = normalUsername;
    const response = await axiosInstance.post(`notes/create`, data);
    const result = response.data;
    result.success
      ? toast.success(result.message)
      : toast.error(result.message);
    return result.success;
  } catch (error) {
    console.error(error);
  }
};
