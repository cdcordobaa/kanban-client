import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Board from "../containers/board";
import BoardGallery from "../containers/board-gallery";
import TaskDetails from "../containers/task-details";

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<BoardGallery />} />
          <Route path="/board/:boardId" element={<Board />} />
          <Route path="/task/:taskId" element={<TaskDetails />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
