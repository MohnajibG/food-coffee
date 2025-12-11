import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import NavDesktop from "./NavDesktop.tsx";
import MobileMenu from "./MobileMenu.tsx";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Détection du thème (traiteur / cafeteria)
  const theme = location.pathname.includes("cafeterias")
    ? "theme-cafe"
    : "theme-traiteur";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const headerStyle = {
    paddingTop: scrolled ? "8px" : "18px",
    paddingBottom: scrolled ? "8px" : "18px",
    backgroundColor: scrolled
      ? "rgba(255,255,255,0.7)"
      : "rgba(255,255,255,0.25)",
    backdropFilter: "blur(8px)",
    transition: "padding 0.25s, background-color 0.25s",
  };

  return (
    <>
      <header
        className={`${theme} fixed top-0 left-0 w-full z-50 flex items-center justify-between px-5 md:px-10`}
        style={headerStyle}
      >
        {/* LEFT — BURGER + LOGO */}
        <div className="flex justify-between items-center w-full">
          {/* BURGER MOBILE */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-3xl mx-5"
            style={{ color: "var(--color-text)" }}
          >
            <FiMenu />
          </button>

          {/* LOGO */}
          <img
            src="/images/logo.png"
            alt="Food Coffee Logo"
            className="h-32 w-auto object-contain rounded-sm"
          />
        </div>

        {/* RIGHT — NAV DESKTOP */}
        <NavDesktop />
      </header>

      {/* MOBILE MENU */}
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};

export default Header;
