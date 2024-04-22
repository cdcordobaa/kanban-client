import React, { useState, useEffect, useRef, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  useCreateTask,
  useDeleteTask,
  useFetchTasks,
  useUpdateTask,
} from "../../hooks/service/fetchTasks";
import { Task } from "../../types/task";
import Column from "../../components/organisms/board-column/column";
import { statusMappingService } from "../../types/status";
import { useParams } from "react-router-dom";

const Board: React.FC = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const { tasks, loading, error, refetch } = useFetchTasks(boardId);
  const { updateTask } = useUpdateTask();
  const { createTask } = useCreateTask();
  const { deleteTask } = useDeleteTask();

  const initialColumns = {
    todo: [] as Task[],
    inProgress: [] as Task[],
    done: [] as Task[],
  };

  const [columns, setColumns] = useState(initialColumns);
  const columnsRef = useRef(columns);

  useEffect(() => {
    setColumns({
      todo: tasks.filter((task) => task.status === statusMappingService.todo),
      inProgress: tasks.filter(
        (task) => task.status === statusMappingService.inProgress
      ),
      done: tasks.filter((task) => task.status === statusMappingService.done),
    });
  }, [tasks]);

  useEffect(() => {
    columnsRef.current = columns;
  }, [columns]);

  const onDropTask = useCallback(
    async (taskId: string, newStatus: string) => {
      let newColumns = { ...columnsRef.current };
      let movedTask: Task | null = null;

      Object.entries(newColumns).forEach(([, tasks]) => {
        const taskIndex = tasks.findIndex((task) => task.id === taskId);
        if (taskIndex !== -1) {
          movedTask = tasks.splice(taskIndex, 1)[0];
        }
      });

      if (movedTask) {
        const backendStatus =
          statusMappingService[newStatus as keyof typeof statusMappingService];
        const updatedTask: Task = { ...movedTask, status: backendStatus };
        const updatedTasks = [
          ...(newColumns[newStatus as keyof typeof newColumns] || []),
          updatedTask,
        ];
        newColumns = { ...newColumns, [newStatus]: updatedTasks };

        await updateTask(taskId, updatedTask);
      }

      setColumns(newColumns);
    },
    [columnsRef, updateTask]
  );

  const handleCreateTask = useCallback(
    async (title: string, columnId: string) => {
      const newTask: Partial<Task> = {
        title,
        status: statusMappingService[columnId],
        description: "",
        userId: "defaultUserId",
      };
      await createTask(newTask);
      await refetch();
      // Optionally refresh tasks list here or add the new task to the state directly
    },
    [createTask, refetch]
  );

  const handleDeleteTask = async (taskId: string) => {
    await deleteTask(taskId);
    await refetch(); // Refetch tasks list after deletion
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading tasks</div>;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex justify-center items-start p-2 ">
        <div className="flex justify-center items-start max-w-6xl mx-auto">
          {Object.keys(columns).map((columnId) => (
            <Column
              key={columnId}
              columnId={columnId}
              tasks={columns[columnId as keyof typeof columns]}
              onDropTask={onDropTask}
              onCreateTask={handleCreateTask}
              onDeleteTask={handleDeleteTask}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default Board;
