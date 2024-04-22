import React from "react";
import { useDrag } from "react-dnd";
import { Task } from "../../../types/task";
import TaskCard from "../../molecules/task-details/task-card";

const TaskCardDrag: React.FC<{
  task: Task;
  index: number;
  isEndpoint: boolean;
}> = ({ task }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} className={`opacity-${isDragging ? 50 : 100}`}>
      <TaskCard task={task} />
    </div>
  );
};

export default TaskCardDrag;
