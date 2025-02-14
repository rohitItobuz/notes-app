import axiosInstance from "../config/axios";

export const getOneNote = async (noteId, reset, setNoteData) => {
  try {
    const response = await axiosInstance.get(`notes/getOne/${noteId}`);

    const result = response.data;
    if (result.success) {
      reset({
        title: result.data.title,
        content: result.data.content,
      });
      setNoteData(result.data);
    }
  } catch (error) {
    console.error(error);
  }
};
