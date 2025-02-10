import { useContext } from "react";
import { NotesContext } from "./NotesContext";

export const PageButton = ({ condition, value, label }) => {
  const { setFilter } = useContext(NotesContext);

  return (
    <button
      type="button"
      className={`${
        condition
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-700 hover:bg-blue-900"
      } text-white rounded-md border-gray-100 py-2 px-3 flex items-center gap-4`}
      disabled={condition}
      onClick={() =>
        setFilter((prev) => ({ ...prev, page: prev.page + value }))
      }
    >
      {label}
    </button>
  );
};
