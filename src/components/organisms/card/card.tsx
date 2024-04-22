import { useDeleteUser } from "hooks/fetchUser";
import React from "react";
import { forwardRef, ComponentProps } from "react";
import { User } from "src/types/employe";

function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
}

function calculateDuration(startDate: string): string {
  const start = new Date(startDate);
  const now = new Date();
  const years = now.getFullYear() - start.getFullYear();
  const months = now.getMonth() - start.getMonth();
  const days = now.getDate() - start.getDate();

  return `${years}y – ${months}m – ${days}d`;
}
export interface CardProps
  extends Omit<ComponentProps<"div">, "className" | "children"> {
  user: User;
  onOpenDetails: () => void;
  onUsersChange?: () => void;
}
const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ user, onOpenDetails, onUsersChange, ...rest }, ref) => {
    const hireDateFormatted = formatDate(user.hireDate);
    const timeInCompany = calculateDuration(user.hireDate);

    const { deleteUser } = useDeleteUser();

    const handleDelete = async (id: number) => {
      try {
        await deleteUser(id);
        onUsersChange?.();
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    };
    return (
      <div
        ref={ref}
        className="bg-white bg-opacity-5 rounded-md shadow p-4 relative overflow-hidden h-full flex items-center"
        {...rest}
      >
        <img
          src={
            user.imageUrl ||
            "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
          }
          alt={`${user.firstName} ${user.lastName}`}
          className="w-16 h-16 bg-gray-300 rounded-full mr-4"
          onError={(e) => {
            e.currentTarget.src = "default-placeholder-image-url";
          }}
        />

        <div className="flex-1">
          <h3 className="text-2xl font-bold text-blue-500">{`${user.firstName} ${user.lastName}`}</h3>
          <p className="text-sm text-gray-500">{user.board?.name}</p>
          <p className="text-base text-gray-500">{`Hire Date: ${hireDateFormatted} `}</p>
          <p className="text-base text-gray-500">{`Time in The Company: (${timeInCompany}) `}</p>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onOpenDetails}
            className="px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600"
          >
            View Details
          </button>
          <button
            onClick={() => handleDelete(user.id)}
            className="px-4 py-2 rounded-md text-white bg-red-500 hover:bg-red-600"
          >
            X
          </button>
        </div>
      </div>
    );
  }
);

export default Card;
