import { useState } from "react";
import {
  Menu,
  X,
  LayoutDashboard,
  History,
  LogOut,
  Rocket,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

function MobileNavbar() {

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl ${
      isActive
        ? "bg-green-100 text-green-700 font-semibold"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <div className="md:hidden">

      {/* Top Navbar */}

      <div className="bg-green-800 text-white px-4 py-3 flex justify-between items-center">

        <div className="flex items-center gap-2">

          <Rocket size={26} />

          <h1 className="text-xl font-bold">
            FounderFlow
          </h1>

        </div>

        <button onClick={() => setOpen(!open)}>

          {open ? <X size={28} /> : <Menu size={28} />}

        </button>

      </div>

      {/* Menu */}

      {open && (

        <div className="bg-white shadow-lg p-4 space-y-3">

          <NavLink
            to="/dashboard"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>

          <NavLink
            to="/history"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            <History size={20} />
            History
          </NavLink>

          <button
            onClick={logout}
            className="w-full bg-red-500 hover:bg-red-600 text-white rounded-xl py-3 flex justify-center items-center gap-2"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>

      )}

    </div>
  );
}

export default MobileNavbar;