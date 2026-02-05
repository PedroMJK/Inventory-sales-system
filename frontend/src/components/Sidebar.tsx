import { NavLink } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <aside
      className={`
        fixed md:static inset-y-0 left-0 z-40
        w-64 bg-gray-800 text-white
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
    >
      <nav className="p-4 space-y-2">

        <NavItem to="/" label="Dashboard" onClick={onClose} end />
        <NavItem to="/products" label="Products" onClick={onClose} />
        <NavItem to="/customers" label="Customers" onClick={onClose} />
        <NavItem to="/sales" label="Sales" onClick={onClose} />

      </nav>
    </aside>
  );
}

function NavItem({ to, label, onClick, end = false }: any) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) =>
        `block px-3 py-2 rounded transition
         ${isActive ? "bg-gray-700 font-semibold" : "hover:bg-gray-700"}`
      }
    >
      {label}
    </NavLink>
  );
}
