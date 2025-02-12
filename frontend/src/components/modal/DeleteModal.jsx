import { useContext } from "react";
import { RxCross1 } from "react-icons/rx";
import { BsExclamationCircle } from "react-icons/bs";

import { NotesContext } from "../../context/NotesContext";
import { deleteNote } from "../../config/noteCRUD/deleteNote";

export const DeleteModal = () => {
  const { setDeleteModal, setNoteModal, noteId, setNoteId } =
    useContext(NotesContext);

  const closeModal = () => {
    setNoteModal(false);
    setDeleteModal(false);
    setNoteId("");
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75">
      <div className="bg-white p-4 m-2 rounded-lg shadow-xl max-w-96 flex flex-col items-center">
        <div className="w-full text-right">
          <button type="button" onClick={closeModal}>
            <RxCross1 />
          </button>
        </div>
        <BsExclamationCircle size={50} color="#9ca3af" />
        <h3 className="my-5 text-lg text-center font-normal text-gray-500 dark:text-gray-400">
          Are you sure you want to delete this note?
        </h3>
        <div className="flex">
          <button
            type="button"
            className="text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            onClick={() => deleteNote(noteId, closeModal)}
          >
            Yes, I'm sure
          </button>
          <button
            type="button"
            className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 "
            onClick={closeModal}
          >
            No, cancel
          </button>
        </div>
      </div>
    </div>
  );
};
