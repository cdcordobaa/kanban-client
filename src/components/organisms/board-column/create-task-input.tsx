import React, { useState } from "react";
import { CheckIcon } from "@heroicons/react/24/solid";

type CreateTaskFormProps = {
  onCreate: (title: string) => void;
};

const CreateTaskInput: React.FC<CreateTaskFormProps> = ({ onCreate }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(title);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-1">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        required
        className="flex-1 p-1 border border-gray-300 rounded-lg"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full transition-colors duration-150 ease-in-out flex items-center justify-center"
      >
        <CheckIcon className="w-3 h-3" />
      </button>
    </form>
  );
};

export default CreateTaskInput;
