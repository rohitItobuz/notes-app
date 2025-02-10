import axios from "axios";
export const getAllNote = async (filter, setNotes, setNoteCount) => {
  try {
    const { title, page, limit, sortby, order } = filter;
    const response = await axios.get(
      `http://localhost:3000/notes/getAll?page=${page}&limit=${limit}&title=${title}&order=${order}&sortby=${sortby}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    const result = response.data;
    if (result.success) {
      setNotes(result.data);
      setNoteCount(result.totalNotes);
    } else {
      setNotes([]);
      setNoteCount(0);
    }
  } catch (error) {
    console.error(error);
  }
};
