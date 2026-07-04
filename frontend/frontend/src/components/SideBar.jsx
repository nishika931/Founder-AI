import { LayoutDashboard, History, LogOut, Rocket } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
      isActive
        ? "bg-white text-green-700 font-semibold"
        : "text-green-100 hover:bg-green-700"
    }`;

  return (

    <aside className="hidden md:flex w-64 min-h-screen bg-green-800 text-white flex-col">

      <div className="p-6">

        <div className="flex items-center gap-3">

          <Rocket size={34} />

          <div>

            <h1 className="text-2xl font-bold">
              FounderFlow
            </h1>

            <p className="text-green-200 text-sm">
              From Idea to Execution
            </p>

          </div>

        </div>

        <nav className="mt-10 space-y-3">

          <NavLink
            to="/dashboard"
            className={linkClass}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>

          <NavLink
            to="/history"
            className={linkClass}
          >
            <History size={20} />
            History
          </NavLink>

        </nav>

      </div>

      <div className="mt-auto p-6">

        <button
          onClick={logout}
          className="w-full bg-red-500 hover:bg-red-600 rounded-xl py-3 flex justify-center items-center gap-2"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </aside>

  );
}

export default Sidebar;