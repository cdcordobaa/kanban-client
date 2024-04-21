import { Department } from "./department";

export type Employee = {
  isActive: boolean;
  imageUrl: string;
  id: number;
  firstName: string;
  lastName: string;
  hireDate: string;
  department?: Department;
  phone: string;
  address: string;
};
