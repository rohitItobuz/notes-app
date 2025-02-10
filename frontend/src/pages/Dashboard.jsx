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
import { PageButton } from "../components/notes/PageButton";

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

  const calculatePage = () => {
    if (noteCount / filter.limit === 0 && filter.page !== 1)
      setFilter((prev) => {
        return { ...prev, page: prev.page - 1 };
      });
  };

  useEffect(() => {
    calculatePage();
    getAllNote(filter, setNotes, setNoteCount);
  }, [filter, noteCount,noteModal]);

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
        className="fixed bg-blue-600 rounded-full top-[87vh] p-5 right-4 shadow-md"
      >
        <FaPlus color="white" size={30} />
      </button>

      {deleteModal && <DeleteModal />}

      <div className="flex justify-center items-center gap-3 mx-3 my-5">
        <PageButton
          condition={filter.page === 1}
          value={-1}
          label={
            <>
              {" "}
              <HiArrowNarrowLeft size={20} /> Prev
            </>
          }
        />
        <span className="font-semibold text-md">
          {filter.page}/{Math.ceil(noteCount / filter.limit)} pages
        </span>
        <PageButton
          condition={Math.ceil(noteCount / filter.limit) === filter.page}
          value={1}
          label={
            <>
              Next <HiArrowNarrowRight size={20} />
            </>
          }
        />
      </div>
    </NotesContext.Provider>
  );
};

export default Dashboard;
