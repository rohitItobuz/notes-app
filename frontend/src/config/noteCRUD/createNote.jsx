import axios from "axios";
import { toast } from "react-toastify";

export const createNote = async (data) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/notes/create`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    const result = response.data;
    result.success
      ? toast.success(result.message)
      : toast.error(result.message);
    return result.success;
  } catch (error) {
    console.error(error);
  }
};
