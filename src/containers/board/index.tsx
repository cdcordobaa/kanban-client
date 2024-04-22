import React, { useState, useEffect, useRef, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useFetchTasks, useUpdateTask } from "../../hooks/service/fetchTasks";
import { Task } from "../../types/task";
import Column from "../../components/organisms/board-column/column";
import { statusMappingService } from "../../types/status";

const Board: React.FC = () => {
  const { tasks, loading, error } = useFetchTasks("defaultBoardId");
  const { updateTask } = useUpdateTask();

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

export default Board;