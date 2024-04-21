import Button from "components/atoms/button";
import React, { useEffect, useState } from "react";
import { Department } from "src/types/department";
import { Employee } from "src/types/employe";

interface CreateEmployeeFormProps {
  onSubmit: (employeeData: Partial<Employee>) => void;
  departments: Department[];
}

const CreateEmployeeForm: React.FC<CreateEmployeeFormProps> = ({
  onSubmit,
  departments,
}) => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [newDepartmentName, setNewDepartmentName] = useState<string>("");
  const [employeeData, setEmployeeData] = useState<Partial<Employee>>({
    isActive: true,
  });

  useEffect(() => {
    if (selectedDepartment === "new-department") {
      setEmployeeData((prev) => ({
        ...prev,
        department: { name: newDepartmentName },
      }));
    } else {
      const department = departments.find(
        (dept) => dept?.id?.toString() === selectedDepartment
      );
      if (department) {
        setEmployeeData((prev) => ({ ...prev, department }));
      }
    }
  }, [selectedDepartment, newDepartmentName, departments]);

  const handleDepartmentChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedDepartment(value);

    if (value !== "new-department") {
      setNewDepartmentName("");
    }
  };

  const handleNewDepartmentNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewDepartmentName(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(employeeData);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployeeData((prev) => ({ ...prev, [name]: value }));
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
          value={employeeData.firstName}
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
          value={employeeData.lastName}
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
          value={employeeData.phone}
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
          value={employeeData.address}
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
          value={employeeData.hireDate}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="department"
          className="text-sm font-medium text-gray-200"
        >
          Department
        </label>
        <select
          id="department"
          value={selectedDepartment}
          onChange={handleDepartmentChange}
          className="mt-1 p-2 border border-gray-300 rounded-lg"
        >
          {departments.map((dept) => (
            <option key={dept.id} value={dept.id}>
              {dept.name}
            </option>
          ))}
          <option value="new-department">Add New Department</option>
        </select>

        {selectedDepartment === "new-department" && (
          <input
            type="text"
            placeholder="New Department Name"
            value={newDepartmentName}
            onChange={handleNewDepartmentNameChange}
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

export default CreateEmployeeForm;
