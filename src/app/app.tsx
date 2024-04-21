import Card from "components/organisms/card";
import Button from "components/atoms/button";
import { Employee } from "src/types/employe";
import Modal from "components/atoms/modal/modal";
import CreateEmployeeForm from "components/molecules/create-employee/create-employee-form";
import { useState } from "react";
import {
  useCreateEmployee,
  useFetchDepartments,
  useFetchEmployees,
} from "hooks/fetchEmployee";
import EmployeeDetails from "components/molecules/employee-details/employee-details";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "containers/home/home";

function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  // const {
  //   employees,
  //   loading: loadingEmployees,
  //   error: errorEmployees,
  //   refetch,
  // } = useFetchEmployees();
  // const {
  //   departments,
  //   loading: loadingDepartments,
  //   error: errorDepartments,
  // } = useFetchDepartments();
  const { createEmployee } = useCreateEmployee();

  // if (loadingEmployees || loadingDepartments) return <div>Loading...</div>;
  // if (errorEmployees) return <div>Error: {errorEmployees.message}</div>;
  // if (errorDepartments) return <div>Error: {errorDepartments.message}</div>;

  const handleOpenDetailsModal = (employee: Employee) => {
    setModalContent(
      <EmployeeDetails
        employeeId={employee.id}
        departments={[]}
        onClose={handleCloseModal}
      />
    );
    setModalOpen(true);
  };

  const handleOpenModal = () => {
    setModalContent(
      <CreateEmployeeForm departments={[]} onSubmit={handleFormSubmit} />
    );
    setModalOpen(true);
  };

  const handleCloseModal = () => setModalOpen(false);

  const onEmployeesChange = () => {
    // refetch();
  };
  const handleFormSubmit = async (employeeData: Partial<Employee>) => {
    await createEmployee(employeeData);
    onEmployeesChange();
    handleCloseModal();
  };
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/board"
            element={
              <>
                <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                  {modalContent}
                </Modal>
                <header className="pt-16 z-10 relative max-w-screen-lg xl:max-w-screen-xl mx-auto">
                  <h1 className="text-6xl lg:text-7xl leading-none font-extrabold tracking-tight mb-8 sm:mb-10 text-purple-400">
                    Employee Management
                  </h1>
                </header>
                <section className="max-w-screen-lg xl:max-w-screen-xl mx-auto">
                  <div className="sm:flex sm:space-x-6 space-y-4 sm:space-y-0 items-center">
                    <Button onClick={handleOpenModal}>Create Employee</Button>
                  </div>
                </section>
                <section className="max-w-screen-lg xl:max-w-screen-xl mx-auto grid grid-cols-10 gap-4">
                  {/* {employees.map((employee, index) => (
                  <div key={index} className="col-span-10 sm:col-span-5">
                    <Card
                      employee={employee}
                      onEmployeesChange={onEmployeesChange}
                      onOpenDetails={() => handleOpenDetailsModal(employee)}
                    />
                  </div>
                ))} */}
                </section>
              </>
            }
          />
          {/* Add more routes as needed */}
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;

