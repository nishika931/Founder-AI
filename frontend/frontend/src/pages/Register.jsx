import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) navigate("/dashboard");
  }, [navigate]);

  const handleRegister = async () => {
    setError("");
    setSuccess("");

    if (!name || !email || !password) {
      setError("Please fill all the fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      setSuccess("Account created successfully! Redirecting...");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (err) {
      setError(
        err.response?.data?.detail ||
        "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
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
            Create Account
          </h2>

          <p className="text-sm sm:text-base text-gray-500">
            Join FounderFlow and start building your startup.
          </p>

        </div>

        {/* Name */}
        <div className="mb-4">

          <label className="block mb-2 text-sm font-medium text-gray-700">
            Full Name
          </label>

          <input
            type="text"
            placeholder="Enter your name"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm sm:text-base focus:border-green-500 focus:ring-2 focus:ring-green-300 outline-none transition"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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
            placeholder="Create a password"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm sm:text-base focus:border-green-500 focus:ring-2 focus:ring-green-300 outline-none transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

        </div>

        {/* Button */}
        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-3 rounded-xl transition text-sm sm:text-base"
        >
          {loading ? "Creating Account..." : "Create Account"}
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

        {/* Login link */}
        <p className="text-center text-gray-600 mt-6 text-sm sm:text-base">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-green-700 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;