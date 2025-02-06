import NoteNavbar from "../components/notes/NoteNavbar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { getOneNote } from "../config/noteCRUD/getOneNote";
import { createNote } from "../config/noteCRUD/createNote";
import { useNavigate } from "react-router-dom";
import { updateNote } from "../config/NoteCRUD/updateNote";


export const Note = ({ noteId = "67a33d4c85a22be9f2bb89d4" }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const success = noteId
      ? await updateNote(noteId, data)
      : await createNote(data);
    success && navigate("/dashboard");
  };

  useEffect(() => {
    noteId && getOneNote(noteId, reset);
  }, []);

  return (
    <div className="flex flex-col h-screen pb-7">
      <NoteNavbar noteId={noteId} />
      <form
        className="mt-5 px-2 grow flex flex-col max-w-screen-lg w-screen mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          className="outline-none bg-transparent w-full border-b-2 text-2xl p-2 font-bold text-gray-700"
          placeholder="Your note heading..."
          autoComplete="off"
          {...register("title")}
        />
        <textarea
          className="outline-none bg-transparent w-full mt-2 px-2 text-lg text-gray-600 grow resize-none"
          placeholder="Your note content..."
          autoComplete="off"
          {...register("content")}
        />
        <button
          type="submit"
          className="fixed bg-white rounded-full top-[87vh] right-8 lg:right-20 shadow-md"
        >
          <FaCircleCheck color="#2563eb" size={60} />
        </button>
      </form>
    </div>
  );
};
