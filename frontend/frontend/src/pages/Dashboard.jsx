import { useState } from "react";
import Sidebar from "../components/SideBar";
import MobileNavbar from "../components/MobileNavbar";
import api from "../services/api";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [title, setTitle] = useState("");
  const [industry, setIndustry] = useState("");
  const [idea, setIdea] = useState("");
  const [report, setReport] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const generateReport = async () => {
    setError("");
    setSuccess("");

    if (!title || !industry || !idea) {
      setError("Please fill all the fields.");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/ai/generate", {
        title,
        industry,
        idea,
        user_id: user.id,
      });

      setReport(res.data);

      setSuccess("🎉 AI Startup Report generated successfully!");

      setTitle("");
      setIndustry("");
      setIdea("");

    } catch (err) {
      setError(
        err.response?.data?.detail ||
        "Failed to generate report."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
<div className="min-h-screen bg-gray-100">
  <MobileNavbar />

    <div className="flex">

  <Sidebar />

  <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10">
        {/* Heading */}

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
          Welcome, {user?.name} 👋
        </h1>

        <p className="text-gray-500 mt-2 text-sm sm:text-base">
          Build your startup with AI-powered analysis.
        </p>

        {/* Form */}

        <div className="bg-white rounded-3xl shadow-lg mt-8 p-5 sm:p-8">

          <h2 className="text-xl sm:text-2xl font-bold text-green-700 mb-6">
            Startup Details
          </h2>

          <input
            type="text"
            placeholder="Startup Name"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setError("");
            }}
            className="w-full border border-gray-300 rounded-xl p-3 sm:p-4 mb-4 focus:ring-2 focus:ring-green-500 outline-none"
          />

          <input
            type="text"
            placeholder="Industry"
            value={industry}
            onChange={(e) => {
              setIndustry(e.target.value);
              setError("");
            }}
            className="w-full border border-gray-300 rounded-xl p-3 sm:p-4 mb-4 focus:ring-2 focus:ring-green-500 outline-none"
          />

          <textarea
            rows="6"
            placeholder="Describe your startup idea..."
            value={idea}
            onChange={(e) => {
              setIdea(e.target.value);
              setError("");
            }}
            className="w-full border border-gray-300 rounded-xl p-3 sm:p-4 mb-5 focus:ring-2 focus:ring-green-500 outline-none resize-none"
          />

          {/* Error */}

          {error && (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Success */}

          {success && (
            <div className="mb-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-green-700 text-sm">
              {success}
            </div>
          )}

          <button
            onClick={generateReport}
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white py-3 sm:py-4 rounded-xl font-semibold transition"
          >
            {loading
              ? "Generating AI Report..."
              : "🚀 Generate AI Report"}
          </button>

        </div>

        {/* Reports */}

        {report && (

          <div className="mt-10">

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
              AI Analysis Report
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              <ReportCard
                title="CEO Report"
                text={report.ceo}
              />

              <ReportCard
                title="Market Report"
                text={report.market}
              />

              <ReportCard
                title="Finance Report"
                text={report.finance}
              />

              <ReportCard
                title="Marketing Report"
                text={report.marketing}
              />

              <ReportCard
                title="Technology Report"
                text={report.technology}
              />

            </div>

          </div>

        )}

      </main>
      </div>

    </div>
  );
}

function ReportCard({ title, text }) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-green-100 p-5 sm:p-6">

      <h2 className="text-lg sm:text-xl font-bold text-green-700 mb-4">
        {title}
      </h2>

      <p className="text-gray-700 whitespace-pre-wrap leading-7 text-sm sm:text-base">
        {text}
      </p>

    </div>
  );
}

export default Dashboard;