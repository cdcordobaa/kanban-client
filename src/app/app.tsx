import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Board from "../containers/board";
import BoardGallery from "../containers/board-gallery";
import TaskDetails from "../containers/task-details";
import Login from "../containers/login";
import { ProvideAuth, AuthContext } from "../hooks/business/auth";

const App: React.FC = () => {
  return (
    <ProvideAuth>
      <BrowserRouter>
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <AuthCheck>
                  <Navigate to="/board-gallery" />
                </AuthCheck>
              }
            />
            <Route path="/board-gallery" element={<BoardGallery />} />
            <Route path="/board/:boardId" element={<Board />} />
            <Route path="/task/:taskId" element={<TaskDetails />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </BrowserRouter>
    </ProvideAuth>
  );
};

const AuthCheck: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { accessToken } = useContext(AuthContext);
  return !!accessToken ? children : <Navigate to="/login" />;
};

export default App;
