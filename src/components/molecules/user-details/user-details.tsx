import { useFetchUser, useUpdateUser } from "hooks/service/fetchUser";
import React, { useEffect } from "react";
import { Board } from "types/board";

interface UserDetailsProps {
  userId: number;
  boards: Board[];
  onClose: () => void;
}

const UserDetails: React.FC<UserDetailsProps> = ({ userId, boards }) => {
  const { user, loading, error, refetch } = useFetchUser(userId);
  const { updateUser } = useUpdateUser();

  const [selectedBoard, setSelectedBoard] = React.useState(
    user?.board?.id || boards[0].id
  );
  const [isActive, setIsActive] = React.useState(user?.isActive || false);

  useEffect(() => {
    if (user) {
      setSelectedBoard(user?.board?.id || 0);
      setIsActive(user?.isActive || false);
    }
  }, [user]);

  useEffect(() => {
    if (isActive !== undefined && user) {
      handleUpdate();
    }
  }, [isActive]);

  const handleUpdate = async () => {
    if (selectedBoard !== undefined && isActive !== undefined) {
      await updateUser(userId, {
        ...user,
        board: boards.find((d) => d.id === selectedBoard),
        isActive,
      });
      refetch();
    }
  };

  const handleBoardChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBoard(Number(e.target.value));
    handleUpdate();
  };

  const toggleIsActive = async () => {
    setIsActive(!isActive);
    handleUpdate();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error?.message}</div>;

  return (
    <div className="space-y-4 bg-dark-blue p-6 rounded-lg shadow">
      <div className="flex flex-row md:items-center">
        <div
          className={`w-full md:w-1/3 bg-${
            isActive ? "red" : "green"
          }-100 p-4 flex justify-center items-center relative`}
        >
          {isActive && (
            <span className="absolute bottom-0 bg-red-500 text-white py-1 px-3 rounded">
              Inactive
            </span>
          )}
          <img
            src={
              user?.imageUrl ||
              "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
            }
            alt={`${user?.firstName} ${user?.lastName}`}
            className="w-30 h-30 bg-gray-300 rounded-full mr-4"
            onError={(e) => {
              e.currentTarget.src = "default-placeholder-image-url";
            }}
          />
        </div>
        <h3 className="text-2xl font-bold">
          {user?.firstName} {user?.lastName}
        </h3>
      </div>
      <div className="flex-1 space-y-4 p-4">
        <hr />
        <p>
          <strong>User ID:</strong> {user?.id}
        </p>
        <p>
          <strong>Board:</strong> {user?.board?.name}
        </p>
        <p>
          <strong>Telephone:</strong> {user?.phone}
        </p>
        <p>
          <strong>Address:</strong> {user?.address}
        </p>
        <hr />
        <div>
          <label htmlFor="board" className="block text-l font-bold text-center">
            Update Board
          </label>
          <select
            id="board"
            value={selectedBoard}
            onChange={handleBoardChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none sm:text-sm rounded-md"
          >
            {boards.map((board) => (
              <option key={board.id} value={board.id}>
                {board.name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={toggleIsActive}
          className={`w-full text-white font-bold py-2 px-4 rounded ${
            isActive
              ? "bg-red-500 hover:bg-red-700"
              : "bg-green-500 hover:bg-green-700"
          }`}
        >
          {isActive ? "Deactivate" : "Activate"} User
        </button>
      </div>
    </div>
  );
};

export default UserDetails;
