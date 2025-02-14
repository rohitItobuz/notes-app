import { toast } from "react-toastify";
import axiosInstance from "../config/axios";

export const deleteNote = async (noteId, closeModal, normalUsername) => {
  try {
    const response = await axiosInstance.delete(`notes/delete/${noteId}`,{
      data:{normalUsername}
    });

    const result = response.data;
    if (result.success) {
      toast.success(result.message);
      closeModal();
    } else toast.error(result.message);
  } catch (error) {
    console.error();
  }
};
