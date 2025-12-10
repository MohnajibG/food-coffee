import { Link } from "react-router-dom";

const NavDesktop = () => {
  return (
    <nav
      className="hidden md:flex items-center gap-10 text-lg font-sans"
      style={{ color: "var(--color-text)" }}
    >
      <Link className="hover:text-color-accent transition" to="/">
        HOME
      </Link>
      <Link className="hover:text-color-accent transition" to="/traiteur">
        TRAITEUR
      </Link>
      <Link className="hover:text-color-accent transition" to="/cafeterias">
        CAFETERIAS
      </Link>
      <Link className="hover:text-color-accent transition" to="/contact">
        CONTACT
      </Link>
    </nav>
  );
};

export default NavDesktop;
