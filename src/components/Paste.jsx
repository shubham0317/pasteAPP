import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFrompaste } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import { IoIosShareAlt } from "react-icons/io";

function Paste() {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDlt(pasteId) {
    dispatch(removeFrompaste(pasteId));
    toast.success("Deleted successfully!");
  }

  function handleShare(paste) {
    const shareUrl = `${window.location.origin}/paste/${paste._id}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success("Shareable link copied!");
  }

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-5">
      {/* Search Input */}
      <input
        className="p-3 rounded-lg w-full border border-gray-400 focus:border-blue-500 outline-none transition-all"
        type="search"
        placeholder="Search Title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Pastes List */}
      <div className="flex flex-col gap-5 mt-5 bg-gray-900 text-white shadow-lg rounded-lg p-4 border border-gray-700">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
              key={paste?._id}
            >
              <div className="font-semibold text-lg text-gray-800">
                {paste.title}
              </div>
              <div className="text-gray-600 text-sm mt-2">{paste.content}</div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 mt-4 text-gray-500">
                <NavLink
                  to={`/?pasteId=${paste?._id}`}
                  className="hover:text-blue-500 transition-all text-inherit "
                >
                  <CiEdit className="text-2xl text-gray-900 hover:text-gray-900" />
                </NavLink>

                <NavLink
                  to={`/paste/${paste?._id}`}
                  className="hover:text-green-500 transition-all"
                >
                  <FaEye className="text-2xl  text-gray-900" />
                </NavLink>

                <button
                  onClick={() => handleDlt(paste?._id)}
                  className="hover:text-red-500 transition-all"
                >
                  <MdDelete className="text-2xl" />
                </button>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(paste?.content);
                    toast.success("Copied to Clipboard!");
                  }}
                  className="hover:text-purple-500 transition-all "
                >
                  <FaClipboardList className="text-2xl" />
                </button>

                <button
                  onClick={() => handleShare(paste)}
                  className="hover:text-blue-400 transition-all"
                >
                  <IoIosShareAlt className="text-2xl" />
                </button>
              </div>

              {/* Date */}
              <div className="text-xs text-gray-400 mt-3">
                {formatDate(paste.createdAt)}
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-center mt-5">No pastes found.</div>
        )}
      </div>
    </div>
  );
}

export default Paste;
