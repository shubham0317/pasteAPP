import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function ViewPaste() {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.find((p) => p._id === id);

  if (!paste) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
        <p className="text-xl">Paste Not Found!</p>
      </div>
    );
  }

  return (
    <div className="pt-24 px-6 flex flex-col items-center h-screen bg-gray-900 text-white">
      <div className="w-full max-w-2xl">
        {/* Title Input */}
        <input
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-blue-500 outline-none shadow-md mb-4"
          type="text"
          value={paste.title}
          disabled
        />

        {/* Textarea */}
        <textarea
          className="w-full h-[60vh] p-4 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-blue-500 outline-none shadow-md resize-none"
          value={paste.content}//HELOO
          disabled
        />
      </div>
    </div>
  );
}

export default ViewPaste;
