import React, { useState, useRef, useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { getAllUsers } from "../../utils/getAllUser";

export const UsernameFilter = () => {
  const { userList, setUserList, normalUsername, setNormalUsername } =
    useContext(UserContext);

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredOptions = userList.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    getAllUsers(setUserList);
  }, []);

  return (
    <div className="flex gap-2 sm:gap-8 items-center justify-center">
      <p className="text-lg text-gray-600 font-semibold">Filter Author : </p>
      <div className="relative w-44 sm:w-72">
        <button
          className="w-full px-4 py-2 text-left bg-white border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          {normalUsername || "Select an option"}
        </button>

        {isOpen && (
          <div className="absolute left-0 w-full mt-2 bg-white border rounded-lg shadow-lg z-10">
            <input
              type="text"
              className="w-full px-4 py-2 border-b focus:outline-none"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <ul className="max-h-48 overflow-y-auto">
              {filteredOptions.length > 0 ? (
                <>
                  <li
                    key="all"
                    className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                    onClick={() => {
                      setNormalUsername("");
                      setIsOpen(false);
                    }}
                  >
                    All
                  </li>
                  {filteredOptions.map((user, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                      onClick={() => {
                        setNormalUsername(user.username);
                        setIsOpen(false);
                      }}
                    >
                      {user.username}
                    </li>
                  ))}
                </>
              ) : (
                <li className="px-4 py-2 text-gray-500">No results found</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
