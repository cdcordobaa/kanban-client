import React from "react";
import { Task } from "../../../types/task";

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <div className="bg-white p-4 rounded shadow mb-2">
      <h3 className="text-lg font-semibold">{task.title}</h3>
      <p className="text-sm">{task.description}</p>
    </div>
  );
};

export default TaskCard;
