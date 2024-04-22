import { useState, useEffect, useCallback } from "react";
import api from "../../config/api";
import { Task } from "../../types/task";

export const useFetchTasks = (boardId: string) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
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
  }, [boardId, setLoading]);

  useEffect(() => {
    fetchTasks();
  }, [boardId, fetchTasks]);

  return { tasks, loading, error, refetch: fetchTasks };
};

export const useUpdateTask = () => {
  const updateTask = useCallback(
    async (taskId: string, updatedFields: Partial<Task>) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { updatedAt, createdAt, ...dataWithoutDates } = updatedFields;
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

export const useCreateTask = () => {
  const createTask = useCallback(async (taskFields: Partial<Task>) => {
    try {
      const response = await api.post("/tasks", taskFields);
      return response.data;
    } catch (error) {
      console.error("Failed to create task", error);
    }
  }, []);

  return { createTask };
};

export const useDeleteTask = () => {
  const deleteTask = useCallback(async (taskId: string) => {
    try {
      await api.delete(`/tasks/${taskId}`);
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  }, []);

  return { deleteTask };
};