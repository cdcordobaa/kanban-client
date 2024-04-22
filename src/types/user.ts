import { Department } from "./department";

export type User = {
  isActive: boolean;
  imageUrl: string;
  id: string;
  name: string;
  email: string;
  firstName: string;
  lastName: string;
  department?: Department;
  phone: string;
  address: string;
};
