import { FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";

import { NoteCard } from "../components/notes/NoteCard";
import { getAllNote } from "../config/noteCRUD/getAllNote";
import { NoteModal } from "../components/modal/NoteModal";
import { FileModal } from "../components/modal/FileUpload";
import { PageButton } from "../components/notes/PageButton";
import { DeleteModal } from "../components/modal/DeleteModal";
import { NotesFilter } from "../components/notes/NotesFliter";
import { NotesContext } from "../components/notes/NotesContext";
import { DashboardNavbar } from "../components/nav/DashboardNavbar";
import { HiArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi";
import notebook from "../assets/notebook.png";

const Dashboard = () => {
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
  }, [filter, noteCount, noteModal]);

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
        setFileModal
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

      {fileModal && <FileModal />}

      <button
        onClick={() => setNoteModal(true)}
        className="fixed bg-blue-600 rounded-full top-[87vh] p-5 right-4 shadow-md"
      >
        <FaPlus color="white" size={30} />
      </button>

      {deleteModal && <DeleteModal />}

      {noteCount === 0 && (
        <div className="flex flex-col items-center">
          <img className="max-h-96" src={notebook} alt="No note" />
          <p className="text-5xl text-slate-700">No notes yet.</p>
          <p className="text-xl mt-2 text-slate-500">Add your notes here.</p>
        </div>
      )}

      {noteCount > 0 && (
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
      )}
    </NotesContext.Provider>
  );
};

export default Dashboard;
