import { createContext, useEffect, useState } from "react";

import {getAllNote} from '../config/noteCRUD/getAllNote';

export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [noteModal, setNoteModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [fileModal, setFileModal] = useState(false);
  const [noteId, setNoteId] = useState("");
  const [noteCount, setNoteCount] = useState(0);
  const [filter, setFilter] = useState({
    title: "",
    page: 1,
    limit: 6,
    sortby: "",
    order: "",
  });

  const calculatePage = () => {
    if (noteCount / filter.limit === 0 && filter.page !== 1)
      setFilter((prev) => {
        return { ...prev, page: prev.page - 1 };
      });
  };

  useEffect(() => {
    calculatePage();
    getAllNote(filter, setNotes, setNoteCount);
  }, [
    noteModal,
    deleteModal,
    filter.limit,
    filter.order,
    filter.page,
    filter.sortby,
  ]);

  useEffect(() => {
    const getData = setTimeout(() => {
      calculatePage();
      getAllNote(filter, setNotes, setNoteCount);
    }, 1000);
    return () => clearTimeout(getData);
  }, [filter.title]);

  return (
    <NotesContext.Provider
      value={{
        filter,
        setFilter,
        noteModal,
        setNoteModal,
        deleteModal,
        setDeleteModal,
        noteId,
        setNoteId,
        setNoteCount,
        fileModal,
        notes,
        setFileModal,
        noteCount
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
