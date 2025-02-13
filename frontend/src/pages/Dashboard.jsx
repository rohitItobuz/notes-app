import { useContext, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { HiArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi";

import { NoteCard } from "../components/notes/NoteCard";
import { NoteModal } from "../components/modal/NoteModal";
import { FileModal } from "../components/modal/FileUpload";
import { PageButton } from "../components/notes/PageButton";
import { DeleteModal } from "../components/modal/DeleteModal";
import { NotesFilter } from "../components/notes/NotesFliter";
import { NotesContext } from "../context/NotesContext";
import { DashboardNavbar } from "../components/nav/DashboardNavbar";
import notebook from "../assets/notebook.png";
import { getAllNote } from "../config/noteCRUD/getAllNote";
import { UserContext } from "../context/UserContext";

const Dashboard = () => {
  const {
    filter,
    noteModal,
    setNoteModal,
    deleteModal,
    fileModal,
    notes,
    setFilter,
    noteCount,
    setNotes,
    setNoteCount,
  } = useContext(NotesContext);

  const { setUserDetails } = useContext(UserContext);

  const calculatePage = () => {
    if (noteCount / filter.limit === 0 && filter.page !== 1)
      setFilter((prev) => {
        return { ...prev, page: prev.page - 1 };
      });
  };

  useEffect(() => {
    const userData = localStorage.getItem("userDetails");
    userData && userData !== "" && setUserDetails(JSON.parse(userData));
  }, []);

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
    <>
      <DashboardNavbar />

      <NotesFilter />

      <div className="m-3 md:mx-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
        {notes.map((note, i) => (
          <NoteCard noteDetails={note} index={i % 6} key={note._id} />
        ))}
      </div>

      {noteModal && <NoteModal />}

      {fileModal && <FileModal />}

      {deleteModal && <DeleteModal />}

      <button
        onClick={() => setNoteModal(true)}
        className="fixed bg-blue-600 rounded-full top-[87vh] p-5 right-4 shadow-md"
      >
        <FaPlus color="white" size={30} />
      </button>

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
                <HiArrowNarrowLeft size={20} /> Prev
              </>
            }
          />
          <span className="font-semibold text-md">
            {filter.page}/
            {Math.ceil(noteCount / (Number(filter.limit) || noteCount))} pages
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
    </>
  );
};

export default Dashboard;
