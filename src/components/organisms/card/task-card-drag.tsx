import React from "react";
import { useDrag } from "react-dnd";
import { Task } from "../../../types/task";
import TaskCard from "../../molecules/task-details/task-card";
import { XMarkIcon } from "@heroicons/react/24/outline";

const TaskCardDrag: React.FC<{
  task: Task;
  index: number;
  isEndpoint: boolean;
  onDelete: (taskId: string) => Promise<void>;
}> = ({ task, onDelete }) => {
  const [, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleDelete = () => {
    onDelete(task.id);
  };

  return (
    <div
      ref={drag}
      className="bg-white border border-gray-200 rounded-lg p-4 m-2 shadow hover:shadow-lg transition-shadow duration-200 ease-in-out relative"
    >
      <TaskCard task={task} />
      <button
        onClick={handleDelete}
        className="text-white bg-red-500 hover:bg-red-700 transition-colors duration-150 rounded-full p-2 absolute top-2 right-2 flex items-center justify-center"
      >
        <XMarkIcon className="h-4 w-4" />
      </button>
    </div>
  );
};

export default TaskCardDrag;
