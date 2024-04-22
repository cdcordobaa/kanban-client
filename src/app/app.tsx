import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Board from "../containers/board";
import BoardGallery from "../containers/board-gallery";
import TaskDetails from "../containers/task-details";
import Login from "../containers/login";

const isLoggedIn = () => {
  return false;
};

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn() ? (
                <Navigate to="/board-gallery" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/board-gallery" element={<BoardGallery />} />
          <Route path="/board/:boardId" element={<Board />} />
          <Route path="/task/:taskId" element={<TaskDetails />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
