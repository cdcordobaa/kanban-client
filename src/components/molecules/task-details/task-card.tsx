import React from "react";
import { Task } from "types/task";
import { useNavigate } from "react-router-dom";

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/task/${task.id}`);
  };

  return (
    <div
      className="bg-white p-4 rounded shadow mb-2 cursor-pointer"
      onClick={handleClick}
    >
      <h3 className="text-lg font-semibold">{task.title}</h3>
      <p className="text-sm">{task.description}</p>
    </div>
  );
};

export default TaskCard;
