import { useState, useEffect, useCallback } from "react";
import { Department } from "src/types/department";
import { Employee } from "src/types/employe";

const API_URL = "http://localhost:3001/api/v1/employees";
type ApiResponse = {
  data: Employee[];
  hasNextPage: boolean;
};
type DepartmentApiResponse = Department[];

const useFetchEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Network response was not ok");
      const res: ApiResponse = await response.json();
      console.log(res.data);
      setEmployees(res.data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return { employees, loading, error, refetch: fetchEmployees };
};

const useFetchEmployee = (id: number) => {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchEmployee = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setEmployee(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"));
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchEmployee();
  }, [fetchEmployee]);

  return { employee, loading, error, refetch: fetchEmployee };
};

const useCreateEmployee = () => {
  const createEmployee = async (employeeData: Partial<Employee>) => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employeeData),
    });
    if (!response.ok) throw new Error("Failed to create employee");
    return await response.json();
  };

  return { createEmployee };
};

const useUpdateEmployee = () => {
  const updateEmployee = async (
    id: number,
    employeeData: Partial<Employee>
  ) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employeeData),
    });
    if (!response.ok) throw new Error("Failed to update employee");
    return await response.json();
  };

  return { updateEmployee };
};

const useDeleteEmployee = () => {
  const deleteEmployee = async (id: number) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete employee");
    return true;
  };

  return { deleteEmployee };
};

const useFetchDepartments = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/departments`);
      if (!response.ok) throw new Error("Network response was not ok");
      const data: DepartmentApiResponse = await response.json();
      setDepartments(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err
          : new Error("An error occurred fetching departments")
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  return { departments, loading, error, refetch: fetchDepartments };
};

export {
  useFetchEmployees,
  useFetchEmployee,
  useCreateEmployee,
  useUpdateEmployee,
  useDeleteEmployee,
  useFetchDepartments,
};
