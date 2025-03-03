import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { updateToPaste, addToPaste } from "../redux/pasteSlice";

function Home() {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      setTitle(paste?.title || "");
      setValue(paste?.content || "");
    }
  }, [pasteId, allPastes]);

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPaste(paste));
    } else {
      dispatch(addToPaste(paste));
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <div className="pt-24 px-6 flex flex-col h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto w-full">
        {/* Title Input and Button */}
        <div className="flex flex-row gap-4 items-center mb-6">
          <input
            className="p-3 rounded-lg w-2/3 bg-gray-800 border border-gray-600 text-white focus:border-blue-500 outline-none shadow-md"
            type="text"
            placeholder="Enter Title Here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            onClick={createPaste}
            className="p-3 px-6 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition shadow-md"
          >
            {pasteId ? "Update My Paste" : "Create My Paste"}
          </button>
        </div>

        {/* Textarea */}
        <div className="flex-grow">
          <textarea
            className="rounded-lg w-full h-[70vh] p-4 bg-gray-800 border border-gray-600 text-white focus:border-blue-500 outline-none shadow-md resize-none"
            value={value}
            placeholder="Enter Content Here..."
            onChange={(e) => setValue(e.target.value)}
            rows={10}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
