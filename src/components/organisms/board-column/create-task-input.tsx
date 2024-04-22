import React, { useState } from "react";

interface CreateTaskFormProps {
  onCreate: (title: string) => void;
}

const CreateTaskInput: React.FC<CreateTaskFormProps> = ({ onCreate }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(title);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        required
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default CreateTaskInput;
