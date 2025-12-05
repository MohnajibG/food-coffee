const Footer = () => {
  return (
    <footer
      className="theme-traiteur relative px-8 py-16 md:px-16"
      style={{
        backgroundColor: "var(--color-primary)",
        color: "var(--color-accent-light)",
      }}
    >
      {/* Ligne décorative or */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gold/40" />

      {/* GRID PRINCIPALE */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-14">
        {/* COLONNE 1 : LOGO + CLAIM */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <img
            src="/images/logo.png"
            alt="Logo Food Coffee"
            className="h-16 w-auto object-contain drop-shadow-lg"
          />

          <h2 className="text-2xl font-semibold tracking-wide text-gold">
            FOOD COFFEE
          </h2>

          <p className="text-sm opacity-80 text-center md:text-left max-w-xs leading-relaxed">
            Traiteur haut de gamme & solutions culinaires pour entreprises,
            campus et événements professionnels.
          </p>
        </div>

        {/* COLONNE 2 : LIENS */}
        <div className="flex flex-col items-center md:items-start gap-3 text-sm">
          <h3 className="text-lg font-bold text-gold mb-1 tracking-wide">
            Informations
          </h3>

          {[
            "À propos",
            "Mentions légales",
            "Politique de confidentialité",
            "Conditions d'utilisation",
          ].map((link, i) => (
            <p
              key={i}
              className="cursor-pointer hover:opacity-100 opacity-70 transition-all hover:translate-x-1"
            >
              {link}
            </p>
          ))}
        </div>

        {/* COLONNE 3 : CONTACT + RESEAUX */}
        <div className="flex flex-col items-center md:items-end gap-4">
          <h3 className="text-lg font-bold text-gold tracking-wide">Contact</h3>

          <div className="text-sm opacity-85 text-center md:text-right space-y-1">
            <p>SIRET : 00000000000000</p>
            <p>Paris, France</p>
            <p>Tél : 01 00 00 00 00</p>
            <p>Email : contact@foodcoffee.com</p>
          </div>

          {/* Réseaux sociaux */}
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
                  w-10 h-10 rounded-full 
                  bg-white/10 hover:bg-white/20 
                  flex items-center justify-center 
                  text-gold hover:text-white 
                  text-xl transition-all backdrop-blur-sm shadow-md
                "
              >
                <i className={`bi bi-${s.icon}`} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* SEPARATOR */}
      <div className="w-full h-[1px] bg-gold/20 my-10" />

      {/* BAS DE FOOTER */}
      <div className="text-center text-xs opacity-70 tracking-wide">
        © {new Date().getFullYear()} FOOD COFFEE — Tous droits réservés.
      </div>
    </footer>
  );
};

export default Footer;
