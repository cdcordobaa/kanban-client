import React, { useState, useEffect, useRef, useCallback } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useTasks } from "../../hooks/service/fetchTasks";
import TaskCardComponent from "../../components/molecules/task-details/task-card"; // Renamed import
import { Task } from "../../types/task";

const mockTasks = {
  todo: [
    {
      id: "task-1",
      title: "Task 1",
      description: "Description for Task 1",
      status: "Todo",
      createdAt: new Date(),
      updatedAt: new Date(),
      boardId: "defaultBoardId",
      userId: "user-1",
    },
    {
      id: "task-2",
      title: "Task 2",
      description: "Description for Task 2",
      status: "Todo",
      createdAt: new Date(),
      updatedAt: new Date(),
      boardId: "defaultBoardId",
      userId: "user-2",
    },
  ],
  inProgress: [
    {
      id: "task-3",
      title: "Task 3",
      description: "Description for Task 3",
      status: "In Progress",
      createdAt: new Date(),
      updatedAt: new Date(),
      boardId: "defaultBoardId",
      userId: "user-3",
    },
  ],
  done: [
    {
      id: "task-4",
      title: "Task 4",
      description: "Description for Task 4",
      status: "Done",
      createdAt: new Date(),
      updatedAt: new Date(),
      boardId: "defaultBoardId",
      userId: "user-4",
    },
  ],
};

const Board: React.FC = () => {
  const { tasks, loading, error } = useTasks("defaultBoardId");

  const initialColumns = {
    todo: [] as Task[],
    inProgress: [] as Task[],
    done: [] as Task[],
  };

  const [columns, setColumns] = useState(initialColumns);
  const columnsRef = useRef(columns);

  useEffect(() => {
    console.log("Updating columns based on tasks", tasks);
    setColumns({
      todo: tasks.filter((task) => task.status === "Todo"),
      inProgress: tasks.filter((task) => task.status === "In Progress"),
      done: tasks.filter((task) => task.status === "Done"),
    });
  }, [tasks]);

  useEffect(() => {
    columnsRef.current = columns;
  }, [columns]);

  useEffect(() => {
    console.log("Columns updated", columns);
  }, [columns]);

  const onDropTask = useCallback(
    (taskId: string, newStatus: string) => {
      const newColumns = { ...columnsRef.current };
      console.log("Tacol", newColumns);

      let movedTask: Task | null = null;
      let sourceColumnKey: string | null = null;

      // Find the task and its current column
      Object.entries(newColumns).forEach(([key, tasks]) => {
        const taskIndex = tasks.findIndex((task) => task.id === taskId);
        if (taskIndex !== -1) {
          movedTask = tasks[taskIndex];
          sourceColumnKey = key;
          // If the task is being moved to a different column, remove it from its current column
          if (key !== newStatus) {
            tasks.splice(taskIndex, 1);
          }
        }
      });

      // Ensure the task is not null and add it to the new column if it's not already there
      if (movedTask) {
        // Update the task's status
        movedTask.status = newStatus;
        // If the task was moved to a different column or removed from its original column, add it to the new column
        if (!newColumns[newStatus].includes(movedTask)) {
          newColumns[newStatus].push(movedTask);
        }
      }
      console.log(
        "Task moved",
        movedTask,
        sourceColumnKey,
        newStatus,
        newColumns
      );
      // Update the state with the new columns
      setColumns(newColumns);
    },
    [columnsRef]
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading tasks</div>;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex space-x-4">
        {Object.keys(columns).map((columnId) => (
          <Column
            key={columnId}
            columnId={columnId}
            tasks={columns[columnId]}
            onDropTask={onDropTask}
          />
        ))}
      </div>
    </DndProvider>
  );
};

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

const TaskCardDrag: React.FC<{
  task: Task;
  index: number;
  isEndpoint: boolean;
}> = ({ task, index, isEndpoint }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        border: isEndpoint ? "2px solid blue" : "none",
      }}
    >
      <TaskCardComponent task={task} />
    </div>
  );
};

export default Board;
