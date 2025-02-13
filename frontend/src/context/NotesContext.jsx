import { createContext, useState } from "react";

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
        setNotes,
        noteCount,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
