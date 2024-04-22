import React from "react";
import { Link } from "react-router-dom";

const BoardGallery: React.FC = () => {
  const boards = [
    {
      id: "default-board",
      name: "Default Board",
      members: 4,
      tags: ["Design", "Urgent"],
      completion: 75,
    },
    {
      id: "marketing-board",
      name: "Marketing Campaign",
      members: 6,
      tags: ["Marketing", "High Priority"],
      completion: 60,
    },
    {
      id: "development-board",
      name: "Development Sprint",
      members: 8,
      tags: ["Development", "Feature"],
      completion: 90,
    },
  ];

  return (
    <div className="py-8 px-4">
      <h1 className="text-center text-5xl font-bold text-gray-800 mb-10">
        Board Gallery
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {boards.map((board) => (
          <Link
            to={`/board/${board.id}`}
            key={board.id}
            className="block transform transition duration-500 hover:scale-105"
          >
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h5 className="text-xl font-semibold mb-2">{board.name}</h5>
              <div className="text-gray-600 mb-4">
                <span className="font-bold">{board.members}</span> members
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {board.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${board.completion}%` }}
                ></div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BoardGallery;
