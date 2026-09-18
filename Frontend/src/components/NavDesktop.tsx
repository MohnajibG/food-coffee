import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/traiteur", label: "Traiteur" },
  { to: "/cafeterias", label: "Cafeterias" },
  { to: "/contact", label: "Contact" },
];

const NavDesktop = () => {
  return (
    <nav
      className="hidden items-center gap-10 text-sm font-semibold tracking-wide uppercase md:flex"
      style={{ color: "var(--color-text)" }}
    >
      {links.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `relative py-1 transition-colors hover:text-(--color-accent) ${
              isActive ? "text-(--color-accent)" : ""
            }`
          }
        >
          {({ isActive }) => (
            <>
              {label}
              <span
                className={`absolute -bottom-1 left-0 h-px w-full bg-(--color-accent) transition-opacity ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              />
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export default NavDesktop;
