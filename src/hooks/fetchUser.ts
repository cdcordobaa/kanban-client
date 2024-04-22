import { useState, useEffect, useCallback } from "react";
import { Board } from "types/board";
import { User } from "types/user";

const API_URL = "http://localhost:3000/dev/users";
type ApiResponse = {
  data: User[];
  hasNextPage: boolean;
};
type BoardApiResponse = Board[];

const useFetchUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Network response was not ok");
      const res: ApiResponse = await response.json();
      console.log(res.data);
      setUsers(res.data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, loading, error, refetch: fetchUsers };
};

const useFetchUser = (id: number) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setUser(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"));
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return { user, loading, error, refetch: fetchUser };
};

const useCreateUser = () => {
  const createUser = async (userData: Partial<User>) => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error("Failed to create user");
    return await response.json();
  };

  return { createUser };
};

const useUpdateUser = () => {
  const updateUser = async (id: number, userData: Partial<User>) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error("Failed to update user");
    return await response.json();
  };

  return { updateUser };
};

const useDeleteUser = () => {
  const deleteUser = async (id: number) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete user");
    return true;
  };

  return { deleteUser };
};

const useFetchBoards = () => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchBoards = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/boards`);
      if (!response.ok) throw new Error("Network response was not ok");
      const data: BoardApiResponse = await response.json();
      setBoards(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err
          : new Error("An error occurred fetching boards")
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  return { boards, loading, error, refetch: fetchBoards };
};

export {
  useFetchUsers,
  useFetchUser,
  useCreateUser,
  useUpdateUser,
  useDeleteUser,
  useFetchBoards,
};
