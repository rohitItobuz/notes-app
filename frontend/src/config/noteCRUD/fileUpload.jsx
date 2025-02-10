import { toast } from "react-toastify";
import axiosInstance from "../axios";
import axios from "axios";

export const fileUpload = async (noteId, data, closeModal) => {
  try {
    const formData = new FormData();
    formData.append("uploadedFile", data.name);
    const response = await axios.post(`notes/upload/${noteId}`, {
      headers: {
        "content-type": "multipart/form-data",
      },
      data: formData,
    });

    const result = response.data;
    console.log(result);
    // if (result.success) {
    //     toast.success(result.message);
    //     closeModal();
    // } else toast.error(result.message);
  } catch (error) {
    console.error();
  }
};
