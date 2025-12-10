import { Link } from "react-router-dom";
import { FiX } from "react-icons/fi";
interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  return (
    <>
      {/* BACKDROP */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* MENU PANEL */}
      <div
        className={`
          fixed top-0 left-0 h-full w-72 bg-white/90 backdrop-blur-xl shadow-xl z-50
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* TOP — CLOSE BUTTON */}
        <div className="flex justify-between items-center px-6 py-5">
          <h3 className="text-lg font-semibold tracking-wide">Menu</h3>

          <button onClick={onClose} className="text-3xl">
            <FiX />
          </button>
        </div>

        <div className="border-b border-black/10 mb-4"></div>

        {/* LINKS */}
        <nav className="flex flex-col gap-6 px-6 text-lg">
          <Link to="/" onClick={onClose} className="hover:opacity-70">
            HOME
          </Link>
          <Link to="/traiteur" onClick={onClose} className="hover:opacity-70">
            TRAITEUR
          </Link>
          <Link to="/cafeterias" onClick={onClose} className="hover:opacity-70">
            CAFETERIAS
          </Link>
          <Link to="/contact" onClick={onClose} className="hover:opacity-70">
            CONTACT
          </Link>
        </nav>
      </div>
    </>
  );
};

export default MobileMenu;
