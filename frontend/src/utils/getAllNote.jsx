import axiosInstance from "../config/axios";

export const getAllNote = async (
  filter,
  setNotes,
  setNoteCount,
  normalUsername
) => {
  try {
    const { title, page, limit, sortby, order } = filter;
    const response = await axiosInstance.post(
      `notes/getAll?page=${page}&limit=${limit}&title=${title}&order=${order}&sortby=${sortby}`,
      {
        normalUsername,
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
