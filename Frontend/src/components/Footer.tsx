const Footer = () => {
  return (
    <footer
      className="theme-traiteur relative px-8 py-20 md:px-20"
      style={{
        backgroundColor: "var(--color-primary)",
        color: "var(--color-accent-light)",
      }}
    >
      {/* Thin top border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gold/30" />

      {/* MAIN WRAPPER */}
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        {/* TOP SECTION : LOGO + NAV + CONTACT */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
          {/* BRAND */}
          <div className="flex flex-col items-center  gap-4">
            <img
              src="/images/logo.png"
              alt="Food Coffee Logo"
              className="h-34 w-auto object-contain opacity-90"
            />

            <p className="text-sm opacity-75 max-w-xs leading-relaxed text-center md:text-justify">
              Premium catering services and culinary expertise dedicated to
              corporate spaces, campuses, and professional events.
            </p>
          </div>

          {/* NAVIGATION */}
          <div className="flex flex-col items-center md:items-start md:ml-24 gap-3 text-sm">
            <h3 className="text-xl font-semibold text-gold mb-2 tracking-wide">
              Company
            </h3>

            {["About us", "Legal notice", "Privacy policy", "Terms of use"].map(
              (link, i) => (
                <p
                  key={i}
                  className="cursor-pointer opacity-70 hover:opacity-100 transition-all"
                >
                  {link}
                </p>
              )
            )}
          </div>

          {/* CONTACT INFO */}
          <div className="flex flex-col items-center md:items-end gap-3 text-sm">
            <h3 className="text-xl font-semibold text-gold mb-2 tracking-wide">
              Contact
            </h3>

            <div className="opacity-80 text-center md:text-right space-y-1">
              <p>SIRET: 00000000000000</p>
              <p>Paris, France</p>
              <p>Phone: 01 00 00 00 00</p>
              <p>Email: contact@foodcoffee.com</p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-4">
              {[
                { icon: "facebook", url: "#" },
                { icon: "instagram", url: "#" },
                { icon: "linkedin", url: "#" },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.url}
                  className="
                    w-9 h-9 rounded-full 
                    bg-white/10 hover:bg-white/20 
                    flex items-center justify-center 
                    text-gold hover:text-white 
                    text-lg transition-all backdrop-blur-sm shadow-sm
                  "
                >
                  <i className={`bi bi-${s.icon}`} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* SEPARATOR */}
        <div className="w-full h-px bg-gold/20" />

        {/* BOTTOM SECTION */}
        <div className="text-center text-xs opacity-60 tracking-wide">
          © {new Date().getFullYear()} FOOD COFFEE — All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
