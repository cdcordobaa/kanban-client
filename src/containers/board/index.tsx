import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useTasks } from "../../hooks/service/fetchTasks";
import TaskCard from "../../components/molecules/task-details/task-card";

const Board: React.FC = () => {
  const { tasks, loading, error } = useTasks("defaultBoardId");
  const [columns, setColumns] = useState({
    todo: tasks.filter((task) => task.status === "Todo"),
    inProgress: tasks.filter((task) => task.status === "In Progress"),
    done: tasks.filter((task) => task.status === "Done"),
  });

  // Handle drag end
  const onDragEnd = (result) => {
    // Logic to reorder tasks and update their status
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading tasks</div>;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex space-x-4">
        {Object.keys(columns).map((columnId) => (
          <Droppable droppableId={columnId} key={columnId}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="bg-gray-100 p-4 w-1/3 rounded"
              >
                <h2 className="font-bold text-lg capitalize">{columnId}</h2>
                {columns[columnId].map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TaskCard task={task} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default Board;
