import React, { useState } from "react";
import { signIn } from "@aws-amplify/auth";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await signIn({
        username,
        password,
      });
      navigate("/boards-gallery");
    } catch (error) {
      console.error("Error signing in", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg overflow-hidden p-6 space-y-4">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Kanban Board Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-6 mt-8">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
