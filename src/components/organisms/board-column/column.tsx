import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { Task } from "../../../types/task";
import TaskCardDrag from "../card/task-card-drag";
import CreateTaskInput from "./create-task-input";

interface ColumnProps {
  columnId: string;
  tasks: Task[];
  onDropTask: (taskId: string, newStatus: string) => void;
  onCreateTask: (title: string, columnId: string) => Promise<void>;
  onDeleteTask: (taskId: string) => Promise<void>;
}

const Column: React.FC<ColumnProps> = ({
  columnId,
  tasks,
  onDropTask,
  onCreateTask,
  onDeleteTask,
}) => {
  const [, drop] = useDrop(() => ({
    accept: "task",
    drop: (item: { id: string; type: string }, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }
      onDropTask(item.id, columnId);
    },
  }));
  const [isCreating, setIsCreating] = useState(false);
  const columnColors = {
    todo: "bg-red-400",
    inProgress: "bg-yellow-400",
    done: "bg-green-400",
  } as const;
  const columnColor =
    columnColors[columnId as keyof typeof columnColors] || "bg-gray-400";

  return (
    <div
      ref={drop}
      className={`flex flex-col rounded-lg shadow overflow-hidden w-full  m-2 ${columnColor} p-2`}
    >
      <h2 className="text-white text-lg font-bold p-4 capitalize">
        {columnId}
      </h2>
      {tasks.map((task, index) => (
        <TaskCardDrag
          key={task.id}
          task={task}
          index={index}
          isEndpoint={index === 0 || index === tasks.length - 1}
          onDelete={onDeleteTask}
        />
      ))}
      {isCreating && (
        <CreateTaskInput onCreate={(title) => onCreateTask(title, columnId)} />
      )}
      <button
        onClick={() => setIsCreating(!isCreating)}
        className={`mt-4 py-2 px-4 rounded-lg font-bold text-white transition-colors duration-150 ${
          isCreating
            ? "bg-blue-500 hover:bg-blue-700"
            : "bg-green-500 hover:bg-green-700"
        }`}
      >
        {isCreating ? "Saving..." : "Add Task"}
      </button>
    </div>
  );
};

export default Column;
