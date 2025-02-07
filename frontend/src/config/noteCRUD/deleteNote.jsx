import axios from "axios";
import { toast } from "react-toastify";

export const deleteNote = async (noteId, setNoteCount, closeModal) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/notes/delete/${noteId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    const result = response.data;
    if (result.success) {
      toast.success(result.message);
      setNoteCount(-1);
      closeModal();
    } else 
    toast.error(result.message);
  } catch (error) {
    console.error();
  }
};
