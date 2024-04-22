import { useDeleteEmployee } from "hooks/fetchEmployee";
import React from "react";
import { forwardRef, ComponentProps } from "react";
import { Employee } from "src/types/employe";

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
  employee: Employee;
  onOpenDetails: () => void;
  onEmployeesChange?: () => void;
}
const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ employee, onOpenDetails, onEmployeesChange, ...rest }, ref) => {
    const hireDateFormatted = formatDate(employee.hireDate);
    const timeInCompany = calculateDuration(employee.hireDate);

    const { deleteEmployee } = useDeleteEmployee();

    const handleDelete = async (id: number) => {
      try {
        await deleteEmployee(id);
        onEmployeesChange?.();
      } catch (error) {
        console.error("Failed to delete employee:", error);
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
            employee.imageUrl ||
            "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
          }
          alt={`${employee.firstName} ${employee.lastName}`}
          className="w-16 h-16 bg-gray-300 rounded-full mr-4"
          onError={(e) => {
            e.currentTarget.src = "default-placeholder-image-url";
          }}
        />

        <div className="flex-1">
          <h3 className="text-2xl font-bold text-blue-500">{`${employee.firstName} ${employee.lastName}`}</h3>
          <p className="text-sm text-gray-500">{employee.department?.name}</p>
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
            onClick={() => handleDelete(employee.id)}
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
