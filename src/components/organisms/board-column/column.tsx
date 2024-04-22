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

  return (
    <div ref={drop} className="bg-gray-100 p-4 w-1/3 rounded">
      <h2 className="font-bold text-lg capitalize">{columnId}</h2>
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
      <button onClick={() => setIsCreating(!isCreating)}>Add Task</button>
    </div>
  );
};

export default Column;
