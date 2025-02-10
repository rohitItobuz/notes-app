import axiosInstance from "../axios";

export const getOneNote = async (noteId, reset) => {
  try {
    const response = await axiosInstance.get(`notes/getOne/${noteId}`);

    const result = response.data;
    if (result.success) {
      reset({
        title: result.data.title,
        content: result.data.content,
      });
    }
  } catch (error) {
    console.error(error);
  }
};
