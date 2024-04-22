import Button from "components/atoms/button";
import React, { useEffect, useState } from "react";
import { Board } from "types/board";
import { User } from "types/user-board";

interface CreateUserFormProps {
  onSubmit: (userData: Partial<User>) => void;
  boards: Board[];
}

const CreateUserForm: React.FC<CreateUserFormProps> = ({
  onSubmit,
  boards,
}) => {
  const [selectedBoard, setSelectedBoard] = useState<string>("");
  const [newBoardName, setNewBoardName] = useState<string>("");
  const [userData, setUserData] = useState<Partial<User>>({
    isActive: true,
  });

  useEffect(() => {
    if (selectedBoard === "new-board") {
      setUserData((prev) => ({
        ...prev,
        board: { name: newBoardName },
      }));
    } else {
      const board = boards.find(
        (dept) => dept?.id?.toString() === selectedBoard
      );
      if (board) {
        setUserData((prev) => ({ ...prev, board }));
      }
    }
  }, [selectedBoard, newBoardName, boards]);

  const handleBoardChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedBoard(value);

    if (value !== "new-board") {
      setNewBoardName("");
    }
  };

  const handleNewBoardNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewBoardName(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(userData);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-dark-blue p-6 rounded-lg shadow"
    >
      <div className="flex flex-col">
        <label
          htmlFor="firstName"
          className="text-sm font-medium text-gray-200"
        >
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          placeholder="First Name"
          value={userData.firstName}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="lastName" className="text-sm font-medium text-gray-200">
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Last Name"
          value={userData.lastName}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="phone" className="text-sm font-medium text-gray-200">
          Phone
        </label>
        <input
          type="text"
          id="phone"
          name="phone"
          placeholder="555-555-5555"
          value={userData.phone}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="address" className="text-sm font-medium text-gray-200">
          Address
        </label>
        <input
          type="text"
          id="address"
          name="address"
          placeholder="123 Main St"
          value={userData.address}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="hireDate" className="text-sm font-medium text-gray-200">
          Hire Date
        </label>
        <input
          type="date"
          id="hireDate"
          name="hireDate"
          value={userData.hireDate}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="board" className="text-sm font-medium text-gray-200">
          Board
        </label>
        <select
          id="board"
          value={selectedBoard}
          onChange={handleBoardChange}
          className="mt-1 p-2 border border-gray-300 rounded-lg"
        >
          {boards.map((dept) => (
            <option key={dept.id} value={dept.id}>
              {dept.name}
            </option>
          ))}
          <option value="new-board">Add New Board</option>
        </select>

        {selectedBoard === "new-board" && (
          <input
            type="text"
            placeholder="New Board Name"
            value={newBoardName}
            onChange={handleNewBoardNameChange}
            className="mt-1 p-2 border border-gray-300 rounded-lg"
          />
        )}
      </div>

      <div className="flex flex-col">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};

export default CreateUserForm;
