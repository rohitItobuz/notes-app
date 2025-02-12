import { toast } from "react-toastify";
import axiosInstance from "../axios";

export const deleteNote = async (noteId, closeModal) => {
  try {
    const response = await axiosInstance.delete(`notes/delete/${noteId}`);

    const result = response.data;
    if (result.success) {
      toast.success(result.message);
      closeModal();
    } else toast.error(result.message);
  } catch (error) {
    console.error();
  }
};
