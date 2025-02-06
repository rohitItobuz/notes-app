import { createContext, useEffect, useState } from "react";

import { NoteCard } from "../components/notes/NoteCard";
import { NotesFilter } from "../components/notes/NotesFliter";
import { DashboardNavbar } from "../components/nav/DashboardNavbar";
import { getAllNote } from "../config/noteCRUD/getAllNote";

const Dashboard = () => {
  const NoteContext = createContext();
  const [notes, setNotes] = useState([]);
  const [filter, setFilter] = useState({
    title: "",
    page: 1,
    limit: 6,
    sortby: "",
    order: "",
  });

  useEffect(() => {
    getAllNote(filter,setNotes);
  }, []);

  return (
    <NoteContext.Provider value={(filter, setFilter)}>
      <DashboardNavbar />
      <NotesFilter />
      <div className="m-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
        {notes.map((note,i) => <NoteCard noteDetails={note} key={i} />)}
      </div>
    </NoteContext.Provider>
  );
};

export default Dashboard;
{
  /* <button className="fixed right-[10vw] top-[85vh] bg-white rounded-full" onClick={() => (noteId)}>
<BsFillCheckCircleFill color="#6EC207" size={60} />
</button> */
}
// import { BsFillCheckCircleFill } from "react-icons/bs";
