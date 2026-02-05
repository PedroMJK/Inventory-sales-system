interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="bg-white shadow px-4 md:px-6 py-4 flex items-center gap-4">

      <button
        onClick={onMenuClick}
        className="md:hidden text-gray-700 cursor-pointer"
        aria-label="Open menu"
      >
        ☰
      </button>

      <h1 className="text-xl font-semibold text-gray-800">
        Inventory Sales System
      </h1>
    </header>
  );
}