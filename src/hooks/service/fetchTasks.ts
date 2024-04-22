import { useState, useEffect, useCallback } from "react";
import api from "../../config/api";
import { Task } from "../../types/task";

export const useFetchTasks = (boardId: string) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/tasks?boardId=${boardId}`);
        setTasks(Array.isArray(response.data.tasks) ? response.data.tasks : []);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [boardId]);

  return { tasks, loading, error };
};

export const useUpdateTask = () => {
  const updateTask = useCallback(
    async (taskId: string, updatedFields: Partial<Task>) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { updatedAt, createdAt, ...dataWithoutDates } = updatedFields;
      console.log("dataWithoutDates", dataWithoutDates);
      try {
        const response = await api.put(`/tasks/${taskId}`, dataWithoutDates);
        return response.data;
      } catch (error) {
        console.error("Failed to update task", error);
      }
    },
    []
  );

  return { updateTask };
};
