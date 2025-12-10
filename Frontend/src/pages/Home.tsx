import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col w-full">
      {/* ===================== HERO TRAITEUR ===================== */}
      <section className="relative flex flex-col items-center justify-center text-center h-[90vh] w-full theme-traiteur overflow-hidden px-6">
        {/* Theme-based gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-primary),var(--color-secondary))] animate-[pulse_8s_ease-in-out_infinite]" />

        {/* Texture overlay */}
        <div className="absolute inset-0 bg-[url('/images/texture-noise.png')] opacity-10 mix-blend-overlay" />

        {/* Subtle glowing halo */}
        <div className="absolute w-[600px] h-[600px] bg-gold/20 blur-[120px] rounded-full -top-20 opacity-40 animate-[float_12s_infinite_alternate]" />

        {/* Logo */}
        <img
          src="/images/logo.png"
          alt="Food Coffee Logo"
          className="relative z-10 h-50 w-auto object-contain mb-6 rounded-lg opacity-0 animate-[fadeIn_1.6s_ease-out_forwards]"
        />

        {/* Main title */}
        <h1
          className="relative z-10 text-5xl md:text-7xl font-serif mb-4 opacity-0 animate-[fadeUp_1.8s_ease-out_forwards] drop-shadow-[0_0_25px_rgba(255,215,130,0.25)]"
          style={{ color: "var(--color-accent)" }}
        >
          FOOD & COFFEE
        </h1>

        {/* Subtitle */}
        <p
          className="relative z-10 max-w-xl text-lg md:text-xl opacity-0 animate-[floatSoft_6s_ease-in-out_infinite]"
          style={{ color: "var(--color-lightGold)" }}
        >
          Catering & Cafeterias.
        </p>

        {/* CTA Placeholder */}
        <div className="relative z-10 flex gap-4 mt-8 flex-wrap opacity-0 animate-[fadeIn_2.6s_ease-out_forwards]" />
      </section>

      {/* ===================== CATERING / CAFÉ BLOCKS ===================== */}
      <section className="flex flex-col md:flex-row w-full gap-6 px-6 md:px-16 py-16">
        {/* ===== CATERING BLOCK ===== */}
        <Link to="/traiteur" className="flex-1">
          <div className="relative flex h-[400px] overflow-hidden shadow-2xl theme-traiteur rounded-4xl transition-transform duration-700 hover:scale-105">
            <img
              src="/images/traiteur.jpg"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[rgba(74,31,41,0.45)] backdrop-blur-sm" />
            <div className="absolute bottom-8 left-6 flex flex-col">
              <h2 className="text-white text-3xl md:text-4xl font-extrabold mb-2 drop-shadow-lg">
                Catering
              </h2>
              <span className="text-white font-semibold">Discover</span>
              <button className="mt-4 px-6 py-2 rounded-full bg-(--color-accent) text-(--color-bg) font-semibold hover:scale-105 transition">
                Learn More
              </button>
            </div>
          </div>
        </Link>

        {/* ===== CAFÉ BLOCK ===== */}
        <Link to="/cafeterias" className="flex-1">
          <div className="relative flex h-[400px] overflow-hidden shadow-2xl theme-cafe rounded-4xl transition-transform duration-700 hover:scale-105">
            <img
              src="/images/cafeteria.jpg"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[rgba(92,58,33,0.45)] backdrop-blur-sm" />
            <div className="absolute bottom-8 right-6 flex flex-col">
              <h2 className="text-white text-3xl md:text-4xl font-extrabold mb-2 drop-shadow-lg">
                Our Cafeterias
              </h2>
              <span className="text-white font-semibold">Order Now</span>
              <button className="mt-4 px-6 py-2 rounded-full bg-(--color-accent) text-(--color-bg) font-semibold hover:scale-105 transition">
                See More
              </button>
            </div>
          </div>
        </Link>
      </section>

      {/* ===================== CTA END ===================== */}
      <section className="flex flex-col items-center justify-center text-center py-24 px-6 theme-traiteur bg-(--color-secondary-green) relative overflow-hidden">
        {/* Glowing halo */}
        <div className="absolute w-[700px] h-[700px] bg-gold/20 blur-[160px] rounded-full -top-32 left-1/2 -translate-x-1/2 opacity-40 pointer-events-none" />
        <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-transparent opacity-20 rotate-12 pointer-events-none" />

        <h3 className="text-4xl md:text-5xl font-serif mb-6 tracking-wide opacity-0 animate-[fadeUp_1.2s_ease-out_forwards] text-lightGold">
          A solution designed for your needs
        </h3>

        <p className="max-w-2xl text-lg md:text-xl opacity-0 mt-2 leading-relaxed animate-[fadeUp_1.6s_ease-out_forwards] text-(--color-bg)">
          More than just catering: FOOD COFFEE creates gourmet spaces, organizes
          your events, and designs professional menus for companies, schools,
          and large institutions.
        </p>

        <Link
          to="/contact"
          className="relative mt-12 px-12 py-4 rounded-full text-xl font-semibold overflow-hidden bg-(--color-accent) text-(--color-bg) shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-transform duration-300 hover:scale-110 before:absolute before:inset-0 before:bg-white/20 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-20 after:absolute after:h-full after:w-0 after:top-0 after:left-0 after:bg-white/10 after:transition-all after:duration-500 hover:after:w-full opacity-0 animate-[fadeUp_2s_ease-out_forwards]"
        >
          Contact Us
        </Link>
      </section>
    </div>
  );
};

export default Home;
