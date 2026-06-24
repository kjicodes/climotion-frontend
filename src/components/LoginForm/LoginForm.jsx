import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./LoginForm.css";

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    //client-side validation
    if (!username.trim() || !password.trim()) {
      setMessage("Please fill in all required fields.");
      return;
    }

    const result = await login({ username, password });

    if (result.success) {
      navigate("/");
    } else {
      setMessage(result.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm bg-white/5 border border-white/10 rounded-3xl p-8">
        <Link
          to="/"
          className="text-sm text-gray-400 hover:text-white mb-4 inline-block"
        >
          ← Back to Home
        </Link>

        <h1 className="text-2xl font-bold text-white text-center mb-6">
          Welcome Back
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm text-gray-400 mb-1"
            >
              Username
            </label>
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
            <label
              htmlFor="password"
              className="block text-sm text-gray-400 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-3xl bg-white/5 px-4 py-2.5 text-sm text-white outline-none border border-white/10 placeholder:text-gray-500"
            />
          </div>

          <button
            type="submit"
            className="button-primary rounded-3xl px-6 py-2.5 text-sm font-semibold mt-2"
          >
            Log In
          </button>

          {message && (
            <p className="text-red-400 text-sm text-center">{message}</p>
          )}
        </form>

        <p className="text-sm text-gray-400 text-center mt-4">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-white font-semibold hover:opacity-80"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
