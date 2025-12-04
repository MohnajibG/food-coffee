import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col w-full">
      {/* ===================== HERO ===================== */}
      <section className="mt-30 relative flex flex-col items-center justify-center text-center h-[50vh] w-full theme-traiteur z-20 overflow-hidden px-6">
        {/* Dégradé basé sur ton thème */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-primary),var(--color-secondary))]" />

        {/* Texture */}
        <div className="absolute inset-0 bg-[url('/images/texture-noise.png')] opacity-10" />

        {/* CONTENU */}
        <img
          src="/images/logo.png"
          alt="Logo Food Coffee"
          className="relative z-10 h-50 w-auto object-contain mb-6 rounded-lg transition-opacity duration-700"
        />

        <h1
          className="relative z-10 text-5xl md:text-6xl font-serif mb-4 transition-opacity duration-700"
          style={{ color: "var(--color-accent)" }}
        >
          FOOD & COFFEE
        </h1>

        <p
          className="relative z-10 max-w-xl text-lg md:text-xl opacity-90 transition-opacity duration-700"
          style={{ color: "var(--color-lightGold)" }}
        >
          Traiteur & Cafétérias.
        </p>

        <div className="relative z-10 flex gap-4 mt-8 flex-wrap transition-opacity duration-700" />
      </section>

      {/* ===================== BLOCS TRAITEUR / CAFÉ ===================== */}
      <section className="flex flex-col items-center md:flex-row w-full gap-5 px-6 md:px-16 py-16">
        {/* ===== BLOC TRAITEUR ===== */}
        <Link to="/cafeterias" className="flex-1">
          <div className="relative flex h-[360px] md:h-[50%] overflow-hidden shadow-2xl theme-cafe rounded-4xl transition-transform duration-700 hover:scale-105">
            <img
              src="/images/traiteur.jpg"
              className="w-full h-full object-cover"
            />

            <div className="absolute bottom-[25%] left-[25%] flex flex-col">
              <h2 className="text-white text-4xl md:text-5xl font-extrabold mb-3 drop-shadow-xl">
                Traiteur
              </h2>

              <span className="text-white font-semibold text-center">
                {" "}
                Découvrir
              </span>
            </div>
          </div>
        </Link>

        {/* ===== BLOC CAFETERIAS ===== */}
        <Link to="/cafeterias" className="flex-1">
          <div className="relative flex h-[420px] md:h-[50%] overflow-hidden shadow-2xl theme-cafe rounded-4xl transition-transform duration-700 hover:scale-105">
            <img
              src="/images/cafeteria.jpg"
              className="w-full h-full object-cover"
            />

            {/* Overlay couleur thème CAFÉ */}
            <div
              className="absolute inset-0 backdrop-blur-[1px]"
              style={{ backgroundColor: "rgba(92,58,33,0.45)" }}
            />

            <div className="absolute bottom-[25%] right-[15%] flex flex-col">
              <h2 className="text-white text-4xl md:text-5xl font-extrabold mb-3 drop-shadow-xl">
                Nos Cafétérias
              </h2>
              <span className="text-white font-semibold text-center">
                Commander
              </span>
            </div>
          </div>
        </Link>
      </section>

      {/* ===================== CTA END ===================== */}
      <section
        className="flex z-20 flex-col items-center justify-center text-center py-16 px-6 theme-traiteur bg-[radial-gradient(ellipse_at_center,var(--color-secondary-green),var(--color-secondary-green-light))]"
        style={{
          backgroundColor: "var(--color-secondary-green)",
          color: "var(--color-bg)",
        }}
      >
        <h3 className="text-3xl md:text-4xl font-serif mb-4 transition-opacity duration-700">
          Une solution pensée pour vos besoins
        </h3>

        <p className="max-w-xl text-base md:text-lg opacity-80 transition-opacity duration-700">
          Cafétérias étudiantes, service traiteur professionnel, événements et
          plateaux repas : FOOD COFFEE accompagne entreprises, écoles et
          institutions.
        </p>

        <Link
          to="/contact"
          className="mt-10 px-10 py-2 rounded-full text-lg font-semibold transition transform hover:scale-105 text-center bg-[#50741f] text-white"
        >
          Nous contacter
        </Link>
      </section>
    </div>
  );
};

export default Home;
