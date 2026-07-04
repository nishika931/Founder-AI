import { useEffect, useState } from "react";
import Sidebar from "../components/SideBar";
import MobileNavbar from "../components/MobileNavbar";
import api from "../services/api";
import { Eye, Trash2 } from "lucide-react";

function History() {

  const user = JSON.parse(localStorage.getItem("user"));

  const [history, setHistory] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {

    try {

      const res = await api.get(
        `/startup/history/${user.id}`
      );

      setHistory(res.data);

    } catch (err) {

      setError("Unable to load history.");

    }

  };

  const deleteReport = async () => {

    setError("");
    setSuccess("");

    try {

      await api.delete(
        `/startup/delete/${deleteId}`
      );

      setHistory(
        history.filter((item) => item.id !== deleteId)
      );

      if (selectedReport?.id === deleteId) {
        setSelectedReport(null);
      }

      setShowDeletePopup(false);
      setDeleteId(null);

      setSuccess("Report deleted successfully.");

      setTimeout(() => {
        setSuccess("");
      }, 3000);

    } catch (err) {

      setShowDeletePopup(false);

      setError("Failed to delete report.");

      setTimeout(() => {
        setError("");
      }, 3000);

    }

  };

  return (

    <div className="min-h-screen bg-gray-100">
      <MobileNavbar />

      <div className="flex">

      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10">

        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Startup History
        </h1>

        <p className="text-gray-500 mt-2 mb-6">
          View all your generated startup reports.
        </p>

        {error && (
          <div className="mb-6 bg-red-100 border border-red-300 text-red-700 rounded-xl p-4">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 bg-green-100 border border-green-300 text-green-700 rounded-xl p-4">
            {success}
          </div>
        )}

        {history.length === 0 ? (

          <div className="bg-white rounded-2xl shadow p-10 text-center">

            <h2 className="text-2xl font-bold">
              No Reports Found
            </h2>

            <p className="text-gray-500 mt-2">
              Generate your first AI report from Dashboard.
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {history.map((item) => (

              <div
                key={item.id}
                className="bg-white rounded-2xl shadow p-6"
              >

                <h2 className="text-2xl font-bold text-green-700">
                  {item.title}
                </h2>

                <p className="mt-3">
                  <b>Industry :</b> {item.industry}
                </p>

                <p className="text-gray-500 mt-2">
                  Status : {item.status}
                </p>

                <div className="flex gap-3 mt-6">

                  <button
                    onClick={() => setSelectedReport(item)}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl"
                  >
                    <Eye size={18} />
                    View
                  </button>

                  <button
                    onClick={() => {
                      setDeleteId(item.id);
                      setShowDeletePopup(true);
                    }}
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
                  >
                    <Trash2 size={18} />
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}


                {/* View Report Modal */}

        {selectedReport && (

          <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50">

            <div className="bg-white rounded-2xl shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto p-6">

              <div className="flex justify-between items-center">

                <h2 className="text-3xl font-bold text-green-700">
                  {selectedReport.title}
                </h2>

                <button
                  onClick={() => setSelectedReport(null)}
                  className="text-3xl font-bold text-gray-500 hover:text-black"
                >
                  ✕
                </button>

              </div>

              <Report
                title="CEO Report"
                text={selectedReport.ceo_report}
              />

              <Report
                title="Market Report"
                text={selectedReport.market_report}
              />

              <Report
                title="Finance Report"
                text={selectedReport.finance_report}
              />

              <Report
                title="Marketing Report"
                text={selectedReport.marketing_report}
              />

              <Report
                title="Technology Report"
                text={selectedReport.tech_report}
              />

            </div>

          </div>

        )}

        {/* Delete Popup */}

        {showDeletePopup && (

          <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50">

            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">

              <h2 className="text-2xl font-bold text-gray-800">
                Delete Report
              </h2>

              <p className="text-gray-600 mt-3">
                Are you sure you want to delete this startup report?
              </p>

              <div className="flex justify-end gap-3 mt-8">

                <button
                  onClick={() => {
                    setShowDeletePopup(false);
                    setDeleteId(null);
                  }}
                  className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  onClick={deleteReport}
                  className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
                >
                  Delete
                </button>

              </div>

            </div>

          </div>

        )}

      </main>
      </div>

 

    </div>

  );

}

function Report({ title, text }) {

  return (

    <div className="mt-8">

      <h3 className="text-xl font-bold text-green-700 mb-3">
        {title}
      </h3>

      <div className="bg-green-50 border border-green-100 rounded-xl p-4 whitespace-pre-wrap leading-7 text-gray-700">
        {text}
      </div>

    </div>

  );

}

export default History;