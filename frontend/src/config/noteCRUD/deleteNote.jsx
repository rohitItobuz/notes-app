import axios from "axios";
import { toast } from "react-toastify";

export const deleteNote = async (noteId) => {
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
    console.log(result);
    result.success
      ? toast.success(result.message)
      : toast.error(result.message);
  } catch (error) {
    console.error();
  }
};
