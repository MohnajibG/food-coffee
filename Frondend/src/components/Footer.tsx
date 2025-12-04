const Footer = () => {
  return (
    <footer
      className="theme-traiteur flex flex-col items-center gap-10 px-6 py-14 md:flex-row md:items-start md:justify-between md:px-12"
      style={{
        backgroundColor: "var(--color-primary)",
        color: "var(--color-text)",
      }}
    >
      {/* LOGO CENTRE */}
      <div className="flex flex-col items-center md:items-start gap-3">
        <img
          src="/images/logo.png"
          alt="Logo Food Coffee"
          className="h-14 w-auto object-contain"
        />
        <h2
          className="text-2xl font-serif"
          style={{ color: "var(--color-accent-light)" }}
        >
          FOOD COFFEE
        </h2>
        <p className="text-sm opacity-80 text-center md:text-left">
          Traiteur & Cafétérias professionnelles
        </p>
      </div>

      {/* LIENS */}
      <div className="flex flex-col items-center md:items-start gap-2 text-sm opacity-90">
        <p
          className="cursor-pointer transition"
          style={{ color: "var(--color-accent-light)" }}
        >
          Mentions légales
        </p>
        <p
          className="cursor-pointer transition"
          style={{ color: "var(--color-accent-light)" }}
        >
          Politique de confidentialité
        </p>
      </div>

      {/* INFOS */}
      <div
        className="flex flex-col items-center md:items-end gap-1 text-sm opacity-90"
        style={{ color: "var(--color-accent-light)" }}
      >
        <p>SIRET : 00000000000000</p>
        <p>Adresse : Paris, France</p>
        <p>Téléphone : 01 00 00 00 00</p>
        <p>Email : contact@foodCOFFEE.com</p>
      </div>
    </footer>
  );
};

export default Footer;
