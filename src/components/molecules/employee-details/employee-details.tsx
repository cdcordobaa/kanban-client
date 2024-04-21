import { useFetchEmployee, useUpdateEmployee } from "hooks/fetchEmployee";
import React, { useEffect } from "react";
import { Department } from "src/types/department";

interface EmployeeDetailsProps {
  employeeId: number;
  departments: Department[];
  onClose: () => void;
}

const EmployeeDetails: React.FC<EmployeeDetailsProps> = ({
  employeeId,
  departments,
  onClose,
}) => {
  const { employee, loading, error, refetch } = useFetchEmployee(employeeId);
  const { updateEmployee } = useUpdateEmployee();

  const [selectedDepartment, setSelectedDepartment] = React.useState(
    employee?.department?.id || departments[0].id
  );
  const [isActive, setIsActive] = React.useState(employee?.isActive || false);

  useEffect(() => {
    if (employee) {
      setSelectedDepartment(employee?.department?.id || 0);
      setIsActive(employee?.isActive || false);
    }
  }, [employee]);

  useEffect(() => {
    if (isActive !== undefined && employee) {
      handleUpdate();
    }
  }, [isActive]);

  const handleUpdate = async () => {
    if (selectedDepartment !== undefined && isActive !== undefined) {
      await updateEmployee(employeeId, {
        ...employee,
        department: departments.find((d) => d.id === selectedDepartment),
        isActive,
      });
      refetch();
    }
  };

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDepartment(Number(e.target.value));
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
              employee?.imageUrl ||
              "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
            }
            alt={`${employee?.firstName} ${employee?.lastName}`}
            className="w-30 h-30 bg-gray-300 rounded-full mr-4"
            onError={(e) => {
              e.currentTarget.src = "default-placeholder-image-url";
            }}
          />
        </div>
        <h3 className="text-2xl font-bold">
          {employee?.firstName} {employee?.lastName}
        </h3>
      </div>
      <div className="flex-1 space-y-4 p-4">
        <hr />
        <p>
          <strong>Employee ID:</strong> {employee?.id}
        </p>
        <p>
          <strong>Department:</strong> {employee?.department?.name}
        </p>
        <p>
          <strong>Telephone:</strong> {employee?.phone}
        </p>
        <p>
          <strong>Address:</strong> {employee?.address}
        </p>
        <p>
          <strong>Hire Date:</strong> {employee?.hireDate}
        </p>
        <hr />
        <div>
          <label
            htmlFor="department"
            className="block text-l font-bold text-center"
          >
            Update Department
          </label>
          <select
            id="department"
            value={selectedDepartment}
            onChange={handleDepartmentChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none sm:text-sm rounded-md"
          >
            {departments.map((department) => (
              <option key={department.id} value={department.id}>
                {department.name}
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

export default EmployeeDetails;
