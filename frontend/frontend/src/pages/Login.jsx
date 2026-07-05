import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) navigate("/dashboard");
  }, [navigate]);

  const handleLogin = async () => {
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Please fill all the fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      setSuccess("Login successful! Redirecting...");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (err) {

  if (err.response) {
    setError(err.response.data.detail);
  } else {
    setError(err.message);
  }
}
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-50 px-4">

      {/* Card */}
      <div className="w-full max-w-sm sm:max-w-md bg-white rounded-3xl shadow-xl p-6 sm:p-8">

        {/* Header */}
        <div className="text-center mb-8">

          <h1 className="text-3xl sm:text-4xl font-extrabold text-green-700">
            🚀 FounderFlow
          </h1>

          <p className="text-sm sm:text-base text-gray-500 mt-2">
            From Idea to Execution
          </p>

        </div>

        {/* Title */}
        <div className="mb-6 text-center sm:text-left">

          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            Welcome Back 👋
          </h2>

          <p className="text-sm sm:text-base text-gray-500">
            Login to continue building your startup.
          </p>

        </div>

        {/* Email */}
        <div className="mb-4">

          <label className="block mb-2 text-sm font-medium text-gray-700">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm sm:text-base focus:border-green-500 focus:ring-2 focus:ring-green-300 outline-none transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

        </div>

        {/* Password */}
        <div className="mb-6">

          <label className="block mb-2 text-sm font-medium text-gray-700">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm sm:text-base focus:border-green-500 focus:ring-2 focus:ring-green-300 outline-none transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

        </div>

        {/* Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-3 rounded-xl transition text-sm sm:text-base"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Messages */}
        {error && (
          <p className="text-red-600 text-center mt-4 font-medium text-sm">
            {error}
          </p>
        )}

        {success && (
          <p className="text-green-600 text-center mt-4 font-medium text-sm">
            {success}
          </p>
        )}

        {/* Register */}
        <p className="text-center text-gray-600 mt-6 text-sm sm:text-base">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-green-700 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;