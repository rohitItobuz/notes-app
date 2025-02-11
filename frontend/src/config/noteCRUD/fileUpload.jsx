import axiosInstance from "../axios";
import { toast } from "react-toastify";

export const fileUpload = async (noteId, data, closeModal) => {
  try {
    const formData = new FormData();
    formData.append("uploadedFile", data);

    const response = await axiosInstance.post(
      `notes/upload/${noteId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const result = response.data;
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
    closeModal();
  } catch (error) {
    console.error("Error uploading file:", error);
    toast.error("An error occurred while uploading the file.");
  }
};
