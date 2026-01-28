import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white">
      <nav className="p-4 space-y-2">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `block px-3 py-2 rounded ${
              isActive ? "bg-gray-700 font-semibold" : "hover:bg-gray-700"
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/products"
          className={({ isActive }) =>
            `block px-3 py-2 rounded ${
              isActive ? "bg-gray-700 font-semibold" : "hover:bg-gray-700"
            }`
          }
        >
          Products
        </NavLink>

        <NavLink
          to="/clients"
          className={({ isActive }) =>
            `block px-3 py-2 rounded ${
              isActive ? "bg-gray-700 font-semibold" : "hover:bg-gray-700"
            }`
          }
        >
          Clients
        </NavLink>

        <NavLink
          to="/sales"
          className={({ isActive }) =>
            `block px-3 py-2 rounded ${
              isActive ? "bg-gray-700 font-semibold" : "hover:bg-gray-700"
            }`
          }
        >
          Sales
        </NavLink>
      </nav>
    </aside>
  );
}
