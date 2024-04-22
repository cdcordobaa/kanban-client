import { Board } from "./board";

export type User = {
  isActive: boolean;
  imageUrl: string;
  id: string;
  name: string;
  email: string;
  firstName: string;
  lastName: string;
  board?: Board;
  phone: string;
  address: string;
};
