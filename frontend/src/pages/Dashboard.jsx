import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";

import { NoteCard } from "../components/notes/NoteCard";
import { NotesFilter } from "../components/notes/NotesFliter";
import { DashboardNavbar } from "../components/nav/DashboardNavbar";
import { getAllNote } from "../config/noteCRUD/getAllNote";
import { NoteModal } from "../components/notes/NoteModal";
import { NotesContext } from "../components/notes/NotesContext";
import { DeleteModal } from "../components/notes/DeleteModal";
import { HiArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi";

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [noteModal, setNoteModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [noteId, setNoteId] = useState("");
  const [noteCount, setNoteCount] = useState(0);
  const [filter, setFilter] = useState({
    title: "",
    page: 1,
    limit: 6,
    sortby: "",
    order: "",
  });

  useEffect(() => {
    getAllNote(filter, setNotes, setNoteCount);
  }, [filter, noteCount]);

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
      }}
    >
      <DashboardNavbar />

      <NotesFilter />

      <div className="m-3 md:mx-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
        {notes.map((note, i) => (
          <NoteCard noteDetails={note} index={i % 6} key={note._id} />
        ))}
      </div>

      {noteModal && <NoteModal />}

      <button
        onClick={() => setNoteModal(true)}
        className="fixed bg-blue-600 rounded-full top-[87vh] p-5 right-8 shadow-md"
      >
        <FaPlus color="white" size={30} />
      </button>

      {deleteModal && <DeleteModal />}

      <div className="flex justify-center gap-1">
        <button
          type="button"
          className="bg-blue-700 text-white rounded-l-md border-r border-gray-100 py-2 hover:bg-blue-900 px-3 flex items-center gap-4"
          disabled = {filter.page === 1}
          onClick={()=> console.log(filter.page,"we")}
        >
          {<HiArrowNarrowLeft size={20} />} Prev
        </button>
        <button
          type="button"
          className="bg-blue-700 text-white rounded-r-md border-r border-gray-100 py-2 hover:bg-blue-900 px-3 flex
          items-center gap-4"
          disabled = {noteCount/filter.limit === filter.page}
          onClick={()=> console.log("s",noteCount)}
        >
          Next {<HiArrowNarrowRight size={20} />}
        </button>
      </div>
    </NotesContext.Provider>
  );
};

export default Dashboard;
