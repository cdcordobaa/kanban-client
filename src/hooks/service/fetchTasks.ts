import { useState, useEffect } from "react";
import api from "../../config/api";
import { Task } from "../../types/task";

export const useTasks = (boardId: string) => {
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
