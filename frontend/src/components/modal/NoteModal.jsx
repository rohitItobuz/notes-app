import { FaEye } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { MdDelete } from "react-icons/md";
import { FaFileUpload } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";
import { FaCircleCheck } from "react-icons/fa6";
import { NotesContext } from "../../context/NotesContext";
import { useContext, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { getOneNote } from "../../config/noteCRUD/getOneNote";
import { createNote } from "../../config/noteCRUD/createNote";
import { updateNote } from "../../config/noteCRUD/updateNote";
import { notesValidationSchema } from "../../validator/notesValidationSchema";

export const NoteModal = () => {
  const {
    setNoteModal,
    noteId,
    setNoteId,
    setNoteCount,
    setDeleteModal,
    fileModal,
    setFileModal,
  } = useContext(NotesContext);
  const [noteData, setNoteData] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(notesValidationSchema),
  });

  const closeModal = () => {
    setNoteModal(false);
    setNoteId("");
  };

  const onSubmit = async (data) => {
    const success = noteId
      ? await updateNote(noteId, data)
      : await createNote(data);
    success && closeModal();
    success && setNoteCount(1);
  };

  useEffect(() => {
    if (noteId) {
      getOneNote(noteId, reset, setNoteData);
    }
  }, [noteId, reset, fileModal]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
      <div className="bg-white md:rounded-lg shadow-lg w-full max-w-5xl h-screen md:h-5/6 md:m-4 flex flex-col">
        <nav className="bg-blue-600 md:rounded-t-lg py-2 px-4 ">
          <button onClick={closeModal} className="text-white font-bold">
            {<RxCrossCircled size={30} />}
          </button>
        </nav>
        <form
          className="flex flex-col grow p-2 md:p-4 md:pt-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="text"
            className="outline-none w-full border-b-2 text-xl p-2 font-bold text-gray-700"
            placeholder="Your note heading..."
            autoComplete="off"
            {...register("title")}
          />
          {errors.title && (
            <p className="text-red-600 text-xs">{errors.title.message}</p>
          )}
          <textarea
            className="outline-none scrollbar-none w-full grow mt-2 px-2 text-lg text-gray-600 resize-none scroll"
            placeholder="Your note content..."
            autoComplete="off"
            {...register("content")}
            style={{ overflow: "auto", scrollbarWidth: "none" }}
          />
          {errors.content && (
            <p className="text-red-600 text-xs">{errors.content.message}</p>
          )}
          <div className="flex justify-end mt-4 gap-3">
            {noteId && noteData.file !== "" && (
              <a
                target="_blank"
                href={`http://${noteData.file}`}
                className="px-4 py-2 bg-amber-500 text-white rounded flex items-center"
              >
                <FaEye className="mr-2" /> File
              </a>
            )}
            {noteId && (
              <button
                type="button"
                className="px-4 py-2 bg-green-500 text-white rounded flex items-center"
                onClick={() => setFileModal(true)}
              >
                <FaFileUpload className="mr-2" /> Upload
              </button>
            )}
            {noteId && (
              <button
                type="button"
                className=" px-4 py-2 bg-red-500 rounded flex gap-1 text-white"
                onClick={() => setDeleteModal(true)}
              >
                <MdDelete color="white" size={23} /> Delete
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded flex items-center"
            >
              <FaCircleCheck className="mr-2" /> Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
