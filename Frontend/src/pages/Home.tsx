import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1 } },
};

const zoom: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const Home = () => {
  return (
    <div className="flex flex-col w-full">
      {/* ===================== HERO ===================== */}
      <section className="relative flex flex-col items-center justify-center text-center h-[50%] w-full theme-traiteur overflow-hidden px-6 pb-30">
        {/* BG Anim */}
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-primary),var(--color-secondary))]"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dqwocrdnh/image/upload/v1765486719/noise_frqd9n.webp')] opacity-40 mix-blend-overlay" />

        <motion.div
          className="absolute w-[600px] h-[600px] bg-gold/90 blur-[120px] rounded-full -top-20 opacity-40"
          animate={{ y: [-20, 20] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: [0.4, 0, 0.2, 1],
          }}
        />

        {/* Logo */}

        <motion.img
          src="/images/logo.png"
          alt="Food Coffee Logo"
          className="relative z-10 h-128 w-auto object-contain mb-6 rounded-lg"
          variants={fade}
          initial="hidden"
          animate="show"
        />

        {/* Title */}
        <motion.h1
          className="relative z-10 text-5xl md:text-8xl font-serif mb-6 drop-shadow-[0_0_25px_rgba(255,215,130,0.25)]"
          style={{ color: "var(--color-accent)" }}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          FOOD & COFFEE
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="relative z-10 max-w-xl text-lg md:text-xl font-light drop-shadow-[0_0_15px_rgba(255,215,130,0.25)]"
          style={{ color: "var(--color-lightGold)" }}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Catering & Cafeterias.
        </motion.p>
      </section>

      {/* ===================== BLOCKS ===================== */}
      <motion.section
        className="flex flex-col md:flex-row w-full gap-6 px-6 md:px-16 py-56"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* ===== CATERING ===== */}
        <motion.div variants={zoom} className="flex-1">
          <Link to="/traiteur">
            <div className="relative flex h-[400px] overflow-hidden shadow-2xl theme-traiteur rounded-4xl transition-transform duration-700 hover:scale-105">
              <motion.img
                src="https://res.cloudinary.com/dqwocrdnh/image/upload/v1765486167/traiteur_qccu3j.webp"
                alt="Traiteur"
                className="w-full h-full object-cover  backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
              <div className="absolute inset-0 bg-[rgba(74,31,41,0.45)]" />
              <div className="absolute bottom-8 left-6 flex flex-col">
                <h2 className="text-white text-3xl md:text-4xl font-extrabold mb-2 drop-shadow-lg">
                  Catering
                </h2>
                <span className="text-white font-semibold">Discover</span>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-4 px-6 py-2 rounded-full bg-(--color-accent) text-(--color-bg) font-extralight"
                >
                  Learn More
                </motion.button>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* ===== CAFETERIAS ===== */}
        <motion.div variants={zoom} className="flex-1">
          <Link to="/cafeterias">
            <div className="relative flex h-[400px] overflow-hidden shadow-2xl theme-cafe rounded-4xl transition-transform duration-700 hover:scale-105">
              <motion.img
                src="https://res.cloudinary.com/dqwocrdnh/image/upload/v1765486160/cafeteria_dozyx7.webp"
                className="w-full h-full object-cover hover:backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
              <div className="absolute inset-0 bg-[rgba(92,58,33,0.45)] " />
              <div className="absolute bottom-8 right-6 flex flex-col">
                <h2 className="text-white text-3xl md:text-4xl font-extrabold mb-2 drop-shadow-lg">
                  Our Cafeterias
                </h2>
                <span className="text-white font-semibold">Order Now</span>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-4 px-6 py-2 rounded-full bg-(--color-accent) text-(--color-bg) font-extralight"
                >
                  See More
                </motion.button>
              </div>
            </div>
          </Link>
        </motion.div>
      </motion.section>

      {/* ===================== CTA END ===================== */}
      <motion.section
        className="flex flex-col  items-center justify-center text-center py-54 px-6 theme-traiteur 
      bg-[radial-gradient(ellipse_at_center,var(--color-secondary-green),var(--color-secondary-green-light))]
       relative overflow-hidden "
      >
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
          className="
    flex items-center justify-center
    mt-12 px-18 py-4 
    rounded-full text-lg font-extralight
    bg-(--color-accent) text-(--color-bg)
    shadow-lg transition-transform duration-300 
    hover:scale-110
    animate-fadeUp
  "
        >
          Contact Us
        </Link>
      </motion.section>
    </div>
  );
};

export default Home;
