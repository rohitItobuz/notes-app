import { MdDelete } from "react-icons/md";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { deleteNote } from "../../config/noteCRUD/deleteNote";

export default function NoteNavbar({ noteId }) {
  const navigate = useNavigate();
  return (
    <nav className="bg-blue-600">
      <div className="flex justify-between items-center max-w-screen-lg mx-auto px-4 py-3">
      <button onClick={() => navigate(-1)}>
        <FaArrowLeftLong color="white" size={20} />
      </button>
      <div className="space-x-3 lg:space-x-6 flex items-center">
        <button onClick={() => noteId && deleteNote(noteId)}>
          <MdDelete color="white" size={25} />
        </button>
      </div>
      </div>
    </nav>
  );
}
