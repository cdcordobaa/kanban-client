import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import {
  useFetchTaskDetails,
  useFetchUserDetails,
  useFetchComments,
} from "../../hooks/service/fetchTasks";

const placeholderImageUrl =
  "https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg";

const getStatusColor = (status: string) => {
  switch (status) {
    case "In Progress":
      return "bg-yellow-500";
    case "Done":
      return "bg-green-500";
    case "Todo":
      return "bg-blue-500";
    default:
      return "bg-gray-500";
  }
};

const TaskDetails: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const {
    task,
    loading: taskLoading,
    updateTask,
  } = useFetchTaskDetails(taskId);
  const { user, loading: userLoading } = useFetchUserDetails(
    task?.userId || ""
  );
  const { comments, loading: commentsLoading } = useFetchComments(taskId);

  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (task) {
      setEditTitle(task.title);
      setEditDescription(task.description);
    }
  }, [task]);

  const handleSave = async () => {
    if (task) {
      try {
        await updateTask({
          ...task,
          title: editTitle,
          description: editDescription,
        });
        setIsEditing(false);
      } catch (error) {
        console.error("Failed to update task", error);
      }
    }
  };

  const handleStatusChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newStatus = e.target.value;
    if (task) {
      try {
        await updateTask({
          ...task,
          status: newStatus as "Todo" | "In Progress" | "Done",
        });
      } catch (error) {
        console.error("Failed to update task status", error);
      }
    }
  };

  if (taskLoading || userLoading || commentsLoading)
    return <div>Loading...</div>;

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-lg overflow-hidden p-6 space-y-4 border border-gray-200">
        <div className="flex justify-between items-center">
          <Link
            to={`/board/${task?.boardId}`}
            className="inline-flex items-center text-blue-500 hover:text-blue-700 transition duration-300"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Board
          </Link>
          <img
            src={placeholderImageUrl}
            alt="User"
            className="w-10 h-10 rounded-full"
          />
        </div>

        {task ? (
          <>
            <div className="flex justify-between items-center">
              {isEditing ? (
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="text-xl font-bold bg-gray-100 rounded p-2 flex-1"
                />
              ) : (
                <h1 className="font-bold text-xl">{task.title}</h1>
              )}
            </div>

            {isEditing ? (
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="mt-4 bg-gray-100 rounded p-2 w-full"
              />
            ) : (
              <p className="mt-4">{task.description}</p>
            )}

            <div className="mt-6">
              <p>Status:</p>
              {isEditing ? (
                <select
                  value={task?.status}
                  onChange={handleStatusChange}
                  className={`px-2 py-1 inline-flex text-white rounded ${getStatusColor(
                    task?.status
                  )}`}
                >
                  <option value="Todo">Todo</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              ) : (
                <span
                  className={`px-2 py-1 inline-flex text-white rounded ${getStatusColor(
                    task?.status
                  )}`}
                >
                  {task?.status}
                </span>
              )}
            </div>

            <div className="mt-4">
              <h2 className="font-bold">Comments</h2>
              {comments.map((comment, index) => (
                <div
                  key={index}
                  className="mt-2 pl-4 border-l-4 border-gray-400"
                >
                  <p>{comment.text}</p>
                </div>
              ))}
            </div>
            {user && (
              <div className="mt-4">
                <p>
                  Email: <span className="font-semibold">{user.email}</span>
                </p>
                <p>
                  Phone: <span className="font-semibold">{user.phone}</span>
                </p>
              </div>
            )}

            <div className="mt-4">
              <h2 className="font-bold">Created At:</h2>
              <p>
                {new Date(task.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </p>
            </div>

            <div className="mt-4">
              <h2 className="font-bold">Board:</h2>
              <p>{task.boardId}</p>
            </div>

            {isEditing ? (
              <button
                onClick={handleSave}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-300"
              >
                Edit
              </button>
            )}
          </>
        ) : (
          <div>Task not found</div>
        )}
      </div>
    </div>
  );
};

export default TaskDetails;
