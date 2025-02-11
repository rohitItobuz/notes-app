import { useContext } from "react";

import { NotesContext } from "../notes/NotesContext";
import { fileUpload } from "../../config/noteCRUD/fileUpload";

export const FileModal = () => {
  const { noteId, setFileModal } = useContext(NotesContext);

  const closeModal = () => {
    setFileModal(false);
  };

  function handleChange(event) {
    fileUpload(noteId, event.target.files[0], closeModal);
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75">
      <div className="bg-white p-4 m-2 rounded-lg shadow-xl max-w-96 flex flex-col items-center">
        <form action="">
          <label className="mb-3 block text-center font-medium text-gray-700">
            Upload file
          </label>
          <input
            type="file"
            className="mt-2 block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-green-500 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-green-700 focus:outline-none file:cursor-pointer"
            onChange={handleChange}
          />
        </form>
      </div>
    </div>
  );
};
