import { useContext } from "react";
import { IoOpen } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

import { NotesContext } from "../../context/NotesContext";

export const NoteCard = ({ noteDetails, index }) => {
  const { _id, content, date, title } = noteDetails;
  const { setNoteModal, setNoteId, setDeleteModal } = useContext(NotesContext);
  const color = ["cyan", "fuchsia", "blue", "violet", "sky", "purple"];
  
  const toggleNoteModal = () => {
    setNoteModal(true);
    setNoteId(_id);
  };
  
  const toggleDeleteModal = () => {
    setDeleteModal(true);
    setNoteId(_id);
  };

  return (
    <div
      className={`relative md:p-3 overflow-hidden rounded-lg bg-${color[index]}-200 hover:scale-[1.01] transition-all duration-300 after:content-[''] after:w-1 after:h-full after:bg-${color[index]}-300 after:absolute after:top-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 after:-z-10`}
    >
      <div className="flex items-center justify-between relative">
        <p className="p-3 text-gray-700 text-xl font-bold truncate">{title}</p>
        <div className="p-3 flex gap-2">
          <button className="cursor-pointer" onClick={toggleNoteModal}>
            <IoOpen size={25} />
          </button>
          <button className="cursor-pointer" onClick={toggleDeleteModal}>
            <MdDelete size={25} />
          </button>
        </div>
      </div>
      <p className="mx-3 text-lg text-gray-600 h-44 overflow-y-hidden break-words line-clamp-6 relative pt-1">
        {content}
      </p>
      <div className="p-3 font-thin text-gray-600 flex justify-between italic relative">
        <span>{date.slice(0, 10)}</span>
        <span>{date.slice(11, 16)}</span>
      </div>
    </div>
  );
};
