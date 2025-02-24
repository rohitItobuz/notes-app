import { useContext, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { HiArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi";

import { NoteCard } from "../components/notes/NoteCard";
import { NoteModal } from "../components/modal/NoteModal";
import { FileModal } from "../components/modal/FileModal";
import { PageButton } from "../components/notes/PageButton";
import { DeleteModal } from "../components/modal/DeleteModal";
import { NotesFilter } from "../components/notes/NotesFilter";
import { NotesContext } from "../context/NotesContext";
import { getAllNote } from "../utils/getAllNote";
import { DashboardNavbar } from "../components/nav/DashboardNavbar";
import notebook from "../assets/notebook.png";
import { UserContext } from "../context/UserContext";
import { UsernameFilter } from "../components/notes/UsernameFilter";
import { ContactModal } from "../components/modal/ContactModal";
import { ChatModal } from "../components/modal/ChatModal";
import { ChatContext } from "../context/ChatsContext";
import { BsChatDots } from "react-icons/bs";

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

  const { userDetails, normalUsername } = useContext(UserContext);
  const { chatModal, contactModal, setContactModal } = useContext(ChatContext);

  const calculatePage = () => {
    if (noteCount / filter.limit === 0 && filter.page !== 1)
      setFilter((prev) => {
        return { ...prev, page: prev.page - 1 };
      });
  };

  useEffect(() => {
    calculatePage();
    getAllNote(filter, setNotes, setNoteCount, normalUsername);
  }, [
    noteModal,
    deleteModal,
    normalUsername,
    filter.limit,
    filter.order,
    filter.page,
    filter.sortby,
  ]);

  useEffect(() => {
    const getData = setTimeout(() => {
      calculatePage();
      getAllNote(filter, setNotes, setNoteCount, normalUsername);
    }, 1000);
    return () => clearTimeout(getData);
  }, [filter.title]);

  return (
    <>
      <DashboardNavbar />

      <NotesFilter />

      {userDetails.role === "admin" && <UsernameFilter />}

      <div className="m-5 md:mx-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
        {notes.map((note, i) => (
          <NoteCard noteDetails={note} index={i % 6} key={note._id} />
        ))}
      </div>

      {noteModal && <NoteModal />}

      {fileModal && <FileModal />}

      {deleteModal && <DeleteModal />}

      {contactModal && <ContactModal />}

      {chatModal && <ChatModal />}

      {userDetails.role === "user" && (
        <button
          onClick={() => setNoteModal(true)}
          className="fixed bg-blue-600 rounded-full top-[90vh] p-3 right-4 shadow-md"
        >
          <FaPlus color="white" size={30} />
        </button>
      )}

      {userDetails.role === "user" && (
        <button
          onClick={() => setContactModal(true)}
          className="fixed bg-teal-500 rounded-full top-[80vh] p-3 right-4 shadow-md"
        >
          <BsChatDots color="white" size={30} />
        </button>
      )}

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
