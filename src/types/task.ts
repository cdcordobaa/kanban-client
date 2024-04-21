export type TaskDto = {
  id?: string;
  title: string;
  description?: string;
  status: "Todo" | "In Progress" | "Done";
  createdAt?: Date;
  updatedAt?: Date;
  userId: string;
  boardId: string;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  status: "Todo" | "In Progress" | "Done";
  createdAt: Date;
  updatedAt: Date;
  boardId: string;
  userId: string;
};
