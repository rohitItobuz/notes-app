import axios from "axios";
export const getOneNote = async (noteId, reset) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/notes/getOne/${noteId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

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
