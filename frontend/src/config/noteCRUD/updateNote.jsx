import { toast } from "react-toastify";
import axiosInstance from "../axios";

export const updateNote = async (noteId, data) => {
  try {
    const response = await axiosInstance.put(`notes/update/${noteId}`, data);

    const result = response.data;
    result.success
      ? toast.success(result.message)
      : toast.error(result.message);
    return result.success;
  } catch (error) {
    console.error(error);
  }
};
