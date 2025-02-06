import { useForm } from "react-hook-form";
import { IoSearch } from "react-icons/io5";

export const NotesFilter = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    console.log("click");
  };
  return (
    <div className="mx-2 my-5">
      <form
        className="max-w-4xl mx-auto flex"
        onSubmit={handleSubmit(onSubmit)}
      >
        <select
          className="bg-gray-200 px-3  py-2 sm:px-5 outline-0 border border-gray-300 rounded-s-lg"
          {...register("sortBy", {
            onChange: (e) => {
              const [sortBy, order] = e.target.value.split('/');
              console.log(sortBy,order);
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
        />
        <button
          type="submit"
          className="p-2.5 bg-blue-700 rounded-e-lg hover:bg-blue-800 "
        >
            <IoSearch size={25} color="white" />
        </button>
      </form>
    </div>
  );
};
