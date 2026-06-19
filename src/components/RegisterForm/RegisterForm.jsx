import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./RegisterForm.css";

const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

export default function RegisterForm() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    //client-side validation
    if (!PASSWORD_REGEX.test(password)) {
      setMessage(
        "Password must be at least 8 characters and contain an uppercase letter, lowercase letter, number, and a special character (@$!%*?&).",
      );
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    //call register func from useAuth
    const result = await register({ firstName, lastName, username, password });

    if (result.success) {
      navigate("/");
    } else {
      setMessage(result.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm bg-white/5 border border-white/10 rounded-3xl p-8">
        <Link to="/" className="text-sm text-gray-400 hover:text-white mb-4 inline-block">
          ← Back to Home
        </Link>
        
        <h1 className="text-2xl font-bold text-white text-center mb-6">
          Create your account
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm text-gray-400 mb-1">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full rounded-3xl bg-white/5 px-4 py-2.5 text-sm text-white outline-none border border-white/10 placeholder:text-gray-500"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm text-gray-400 mb-1">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full rounded-3xl bg-white/5 px-4 py-2.5 text-sm text-white outline-none border border-white/10 placeholder:text-gray-500"
            />
          </div>
          <div>
            <label htmlFor="username" className="block text-sm text-gray-400 mb-1">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-3xl bg-white/5 px-4 py-2.5 text-sm text-white outline-none border border-white/10 placeholder:text-gray-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm text-gray-400 mb-1">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-3xl bg-white/5 px-4 py-2.5 text-sm text-white outline-none border border-white/10 placeholder:text-gray-500"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm text-gray-400 mb-1">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-3xl bg-white/5 px-4 py-2.5 text-sm text-white outline-none border border-white/10 placeholder:text-gray-500"
            />
          </div>

          <button
            type="submit"
            className="button-primary rounded-3xl px-6 py-2.5 text-sm font-semibold mt-2"
          >
            Register
          </button>

          {message && <p className="text-red-400 text-sm text-center">{message}</p>}
        </form>

        <p className="text-sm text-gray-400 text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-white font-semibold hover:opacity-80">
              Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
