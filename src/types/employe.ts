import { Board } from "./board";

export type User = {
  isActive: boolean;
  imageUrl: string;
  id: number;
  firstName: string;
  lastName: string;
  hireDate: string;
  board?: Board;
  phone: string;
  address: string;
};
