import { useState, useEffect, useCallback } from "react";
import api from "../../config/api";
import { Task } from "../../types/task";
import { User } from "../../types/user";
import { Comment } from "../../types/comment";

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

export const useFetchTaskDetails = (taskId: string) => {
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTaskDetails = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get(`/tasks/${taskId}`);
      setTask(response.data.task);
    } catch (error) {
      console.error("Failed to fetch task details", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [taskId]);

  const updateTask = useCallback(
    async (updatedTask: Partial<Task>) => {
      const { updatedAt, createdAt, ...dataWithoutDates } = updatedTask;
      try {
        const response = await api.put(`/tasks/${taskId}`, dataWithoutDates);
        setTask(response.data.task);
      } catch (error) {
        console.error("Failed to update task", error);
      }
    },
    [taskId]
  );

  useEffect(() => {
    fetchTaskDetails();
  }, [fetchTaskDetails]);

  return { task, loading, error, updateTask };
};

export const useFetchUserDetails = (userId: string) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserDetails = useCallback(async () => {
    setLoading(true);
    try {
      const mockUser: User = {
        id: userId,
        name: "John Doe",
        email: "john.doe@example.com",
        isActive: true,
        imageUrl: "https://example.com/john.jpg",
        firstName: "John",
        lastName: "Doe",
        phone: "123-456-7890",
        address: "1234 Elm St",
      };
      setUser(mockUser);
    } catch (error) {
      console.error("Failed to fetch user details", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  return { user, loading, error };
};

export const useFetchComments = (taskId: string) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchComments = useCallback(async () => {
    setLoading(true);
    try {
      const mockComments: Comment[] = [
        { id: "1", text: "This is a comment", taskId: taskId, userId: "user1" },
        {
          id: "2",
          text: "This is another comment",
          taskId: taskId,
          userId: "user2",
        },
      ];
      setComments(mockComments);
    } catch (error) {
      console.error("Failed to fetch comments", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [taskId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return { comments, loading, error };
};
