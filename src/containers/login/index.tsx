import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  signIn,
  signUp,
  confirmSignUp,
  getCurrentUser,
  fetchAuthSession,
} from "aws-amplify/auth";
import { useAuth } from "../../hooks/business/auth"; 

const Login: React.FC = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showRegistrationPopup, setShowRegistrationPopup] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");
  const [showConfirmationSuccess, setShowConfirmationSuccess] = useState(false);
  const { setUser, setAccessToken } = useAuth();

  const checkAuthAndNavigate = async () => {
    try {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        const session = await fetchAuthSession();
        const accessToken = session.tokens?.accessToken;
        if (accessToken) {
          setAccessToken(accessToken.toString());
        }
        setUser(currentUser);
        navigate("/board-gallery");
      }
    } catch (error) {
      console.error("Error checking auth status", error);
    }
  };

  useEffect(() => {
    checkAuthAndNavigate();
  }, []);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const { isSignedIn, nextStep } = await signIn({ username, password });
    console.log("l", isSignedIn, nextStep);
    await checkAuthAndNavigate();
  };

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const { userId, isSignUpComplete, nextStep } = await signUp({
        username,
        password,
        options: {
          userAttributes: {
            email,
            name: `${firstName} ${lastName}`,
            given_name: firstName,
            family_name: lastName,
          },
        },
      });
      console.log("s", userId, isSignUpComplete, nextStep);
      setShowRegistrationPopup(true);
      setTimeout(() => setShowRegistrationPopup(false), 3000);
      if (!isSignUpComplete) {
        setShowVerificationModal(true);
      }
    } catch (error) {
      console.error("Error signing up", error);
    }
  };

  const handleConfirmSignUp = async () => {
    try {
      await confirmSignUp({ username, confirmationCode });
      setShowVerificationModal(false);
      setShowConfirmationSuccess(true);
      setTimeout(() => {
        setShowConfirmationSuccess(false);
        setIsLoginView(true);
      }, 3000);
    } catch (error) {
      console.error("Error confirming sign up", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg overflow-hidden p-6 space-y-4">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          {isLoginView ? "Kanban Board Login" : "Kanban Board Signup"}
        </h2>
        <form
          onSubmit={isLoginView ? handleLogin : handleSignUp}
          className="space-y-6"
        >
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          {!isLoginView && (
            <>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </>
          )}
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
            {isLoginView ? "Login" : "Sign Up"}
          </button>
        </form>
        <div className="text-center">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setIsLoginView(!isLoginView);
            }}
            className="text-blue-500 hover:text-blue-600"
          >
            {isLoginView
              ? "Sign Up if you don't have an account"
              : "Back to Login"}
          </a>
        </div>
      </div>
      {showVerificationModal && (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg">
            <h3>Verify Your Email</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleConfirmSignUp();
              }}
            >
              <input
                type="text"
                value={confirmationCode}
                onChange={(e) => setConfirmationCode(e.target.value)}
                placeholder="Verification Code"
                className="border p-2"
                required
              />
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded"
              >
                Verify
              </button>
            </form>
          </div>
        </div>
      )}
      {showRegistrationPopup && (
        <div className="absolute top-20 right-20 bg-green-500 text-white p-3 rounded-lg">
          Registration email sent!
        </div>
      )}
      {showConfirmationSuccess && (
        <div className="absolute top-20 right-20 bg-green-500 text-white p-3 rounded-lg">
          Account confirmed! Please log in.
        </div>
      )}
    </div>
  );
};

export default Login;
