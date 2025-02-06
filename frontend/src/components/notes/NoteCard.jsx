import { MdDelete } from "react-icons/md";
import { IoOpen } from "react-icons/io5";
export const NoteCard = ({ noteDetails }) => {
  const { _id, content, date, title } = noteDetails;
  return (
    <div
    id={_id}
      className="relative md:p-3 overflow-hidden rounded-lg bg-fuchsia-200 hover:scale-[1.01] transition-all duration-300 
                after:content-[''] after:w-1 after:h-full after:bg-fuchsia-300 after:absolute after:top-0 after:left-0 
                hover:after:w-full after:transition-all after:duration-300 after:z-10"
    >
      <div className="flex items-center justify-between relative z-30">
        <div className="p-3 text-gray-700 text-lg font-bold truncate">
          Tailwind Header Lorem ipsum dolor sit amet consectetur, adipisicing
          elit. Atque autem illo sed fugit esse earum accusamus, vero tempora
          aperiam fugiat Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Optio eligendi nobis obcaecati deserunt. Aperiam deleniti quis
          quo, tenetur dolorum exercitationem!.
        </div>
        <div className="p-3 flex gap-2">
          <button className="cursor-pointer">
            <IoOpen size={25} />
          </button>
          <button className="cursor-pointer">
            <MdDelete size={25} />
          </button>
        </div>
      </div>
      <div className="mx-3 text-lg text-gray-600 h-42 overflow-hidden break-words line-clamp-5 md:line-clamp-7 relative z-30">
        Tailwind Header Lorem Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Sapiente tempora, iure laudantium explicabo porro illo vero, ullam
        maxime nemo officiis libero rem vel impedit officia dolores? Nam
        excepturi unde provident, culpa debitis earum incidunt quaerat at qui
        architecto, animi ex, quis deleniti. Libero delectus sequi magnam qui
        alias quos nobis?
      </div>
      <div className="p-3 font-thin text-gray-600 flex justify-between italic relative z-30">
        <span>5 Feb 2025</span>
        <span>10:10</span>
      </div>
    </div>
  );
};

{
  /* cyan,fuchsia,blue,violet,sky,purple */
}
