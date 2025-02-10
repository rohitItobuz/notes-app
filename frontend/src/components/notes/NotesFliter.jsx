import { useForm } from "react-hook-form";

import { NotesContext } from "./NotesContext";
import { useContext } from "react";

export const NotesFilter = () => {
  const { setFilter } = useContext(NotesContext);

  const updateFilter = (e) => {
    const [sortby, order] = e.target.value.split("/");
    setFilter((prev) => {
      return { ...prev, sortby, order, page: 1 };
    });
  };

  const {
    register,
    formState: { errors },
  } = useForm();

  return (
    <div className="mx-2 my-5">
      <form
        className="max-w-4xl mx-auto flex"
      >
        <select
          className="bg-gray-200 px-2 py-2 sm:px-5 outline-0 border border-gray-300 rounded-s-lg"
          {...register("sortBy", {
            onChange: (e) => {
              updateFilter(e);
            },
          })}
        >
          <option disabled>Sort by</option>
          <option value="date/asc">Date &#8593;</option>
          <option value="title/asc">Title &#8593;</option>
          <option value="date/desc">Date &#8595;</option>
          <option value="title/desc">Title &#8595;</option>
        </select>
        <input
          type="search"
          className=" p-2.5 w-full text-gray-900 bg-gray-50 border border-gray-300 outline-0"
          placeholder="Search notes..."
          {...register("search", {
            onChange: (e) => {
              setFilter((prev) => {
                return { ...prev, title: e.target.value, page: 1 };
              });
            },
          })}
        />
        <select
          className="bg-gray-200 px-2 py-2 outline-0 border border-gray-300 rounded-e-lg"
          {...register("limit", {
            onChange: (e) => {
              setFilter((prev) => {
                return { ...prev, page: 1, limit:e.target.value };
              });
            },
          })}
        >
          <option disabled>limit</option>
          <option value="6">6</option>
          <option value="12">12</option>
          <option value="24">24</option>
          <option value="0">All</option>
        </select>
      </form>
    </div>
  );
};
