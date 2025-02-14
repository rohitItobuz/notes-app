import { toast } from "react-toastify";
import axiosInstance from "../config/axios";

export const fileUpload = async (noteId, data, setFileModal) => {
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
    result.success
      ? toast.success(result.message)
      : toast.error(result.message);
    setFileModal(false);
  } catch (error) {
    console.error("Error uploading file:", error);
    toast.error("An error occurred while uploading the file.");
  }
};
