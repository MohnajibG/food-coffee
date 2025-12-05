import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col w-full">
      {/* ===================== HERO ===================== */}
      <section className="relative flex flex-col items-center justify-center text-center h-screen w-full theme-traiteur z-20 overflow-hidden px-6 mt-36">
        {/* Dégradé basé sur ton thème */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-primary),var(--color-secondary))] animate-[pulse_8s_ease-in-out_infinite]" />

        {/* Texture */}
        <div className="absolute inset-0 bg-[url('/images/texture-noise.png')] opacity-10 mix-blend-overlay" />

        {/* Halo lumineux subtil */}
        <div className="absolute w-[600px] h-[600px] bg-gold/20 blur-[120px] rounded-full -top-20 opacity-40 animate-[float_12s_infinite_alternate]" />

        {/* LOGO avec fade + scale */}
        <img
          src="/images/logo.png"
          alt="Logo Food Coffee"
          className="
      relative z-10 h-50 w-auto object-contain mb-6 rounded-lg
      opacity-0 animate-[fadeIn_1.6s_ease-out_forwards]
    "
        />

        {/* TITRE avec glow + fade/slide */}
        <h1
          className="
      relative z-10 text-5xl md:text-9xl font-serif mb-4 
      opacity-0 translate-y-4 animate-[fadeUp_1.8s_ease-out_forwards]
      drop-shadow-[0_0_25px_rgba(255,215,130,0.25)]
    "
          style={{ color: "var(--color-accent)" }}
        >
          FOOD & COFFEE
        </h1>

        {/* SOUS-TITRE avec léger float */}
        <p
          className="
      relative z-10 max-w-xl text-lg md:text-xl opacity-0 translate-y-4
      animate-[fadeUp_2.2s_ease-out_forwards]
      animate-[floatSoft_6s_ease-in-out_infinite]
    "
          style={{ color: "var(--color-lightGold)" }}
        >
          Traiteur & Cafétérias.
        </p>
        <p
          className="relative z-10 max-w-xl text-lg md:text-xl opacity-90 transition-opacity duration-700"
          style={{ color: "var(--color-lightGold)" }}
        >
          Traiteur & Cafétérias.
        </p>

        {/* CTA ZONE — toujours vide mais animée pour préparation */}
        <div
          className="
      relative z-10 flex gap-4 mt-8 flex-wrap 
      opacity-0 animate-[fadeIn_2.6s_ease-out_forwards]
    "
        />
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
        className="
    flex z-20 flex-col items-center justify-center text-center py-24 px-6 theme-traiteur
    bg-[radial-gradient(ellipse_at_center,var(--color-secondary-green),var(--color-secondary-green-light))]
    relative overflow-hidden
  "
        style={{
          backgroundColor: "var(--color-secondary-green)",
          color: "var(--color-bg)",
        }}
      >
        {/* Halo lumineux subtil */}
        <div className="absolute w-[700px] h-[700px] bg-gold/20 blur-[160px] rounded-full -top-32 left-1/2 -translate-x-1/2 opacity-40 pointer-events-none" />

        {/* Light beams */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-20 rotate-12 pointer-events-none" />

        {/* Titre */}
        <h3
          className="
      text-4xl md:text-5xl font-serif mb-6 tracking-wide
      opacity-0 animate-[fadeUp_1.2s_ease-out_forwards]
    "
          style={{ color: "var(--color-lightGold)" }}
        >
          Une solution pensée pour vos besoins
        </h3>

        {/* Texte */}
        <p
          className="
      max-w-2xl text-lg md:text-xl opacity-0 mt-2 leading-relaxed
      animate-[fadeUp_1.6s_ease-out_forwards]
    "
          style={{ color: "var(--color-bg)" }}
        >
          Bien plus qu’un traiteur : FOOD COFFEE crée des espaces gourmands,
          organise vos événements et conçoit des menus professionnels pensés
          pour les entreprises, les écoles et les grandes institutions.
        </p>

        {/* CTA Button */}
        <Link
          to="/contact"
          className="
      relative mt-12 px-12 py-4 rounded-full text-xl font-semibold overflow-hidden 
      bg-[#50741f] text-white shadow-[0_10px_30px_rgba(0,0,0,0.25)]
      transition-transform duration-300 hover:scale-110
      before:absolute before:inset-0 before:bg-white/20 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-20
      after:absolute after:h-full after:w-0 after:top-0 after:left-0 after:bg-white/10 after:transition-all after:duration-500 hover:after:w-full
      opacity-0 animate-[fadeUp_2s_ease-out_forwards]
    "
        >
          Nous contacter
        </Link>
      </section>

      <style>
        {`
@keyframes fadeUp {
  0% { opacity:0; transform:translateY(20px); }
  100% { opacity:1; transform:translateY(0); }
}
`}
      </style>
    </div>
  );
};

export default Home;
