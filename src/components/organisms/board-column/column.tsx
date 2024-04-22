import React from "react";
import { useDrop } from "react-dnd";
import { Task } from "../../../types/task";
import TaskCardDrag from "../card/task-card-drag";

const Column: React.FC<{
  columnId: string;
  tasks: Task[];
  onDropTask: (taskId: string, newStatus: string) => void;
}> = ({ columnId, tasks, onDropTask }) => {
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

  return (
    <div ref={drop} className="bg-gray-100 p-4 w-1/3 rounded">
      <h2 className="font-bold text-lg capitalize">{columnId}</h2>
      {tasks.map((task, index) => (
        <TaskCardDrag
          key={task.id}
          task={task}
          index={index}
          isEndpoint={index === 0 || index === tasks.length - 1}
        />
      ))}
    </div>
  );
};

export default Column;
