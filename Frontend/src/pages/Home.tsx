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
      <section className="relative flex min-h-[520px] w-full flex-col items-center justify-center text-center theme-traiteur overflow-hidden px-6 py-20 md:min-h-[640px]">
        {/* BG Anim */}
        <motion.div
          className="absolute  inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-primary),var(--color-secondary))]"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <div className="absolute bg-[url('https://res.cloudinary.com/dqwocrdnh/image/upload/f_auto,q_auto,w_800/v1765486719/noise_frqd9n.webp')] opacity-90 mix-blend-overlay" />

        <motion.div
          className="absolute w-[600px] h-[600px] bg-gold/90 blur-[120px] rounded-full -top-20 opacity-40"
          animate={{ y: [-20, 20] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: [0.4, 0, 0.2, 1],
          }}
        />

        {/* Logo — LCP element: rendered immediately, no fade/JS delay, eagerly fetched */}
        <img
          src="/images/logo.svg"
          alt="Food Coffee Logo"
          className="relative z-10 h-24 w-auto object-contain sm:h-28 md:h-52 lg:h-52"
          fetchPriority="high"
          loading="eager"
          decoding="sync"
        />

        {/* Title */}
        <motion.h1
          className="text-shine-gold relative z-12 mt-6 w-full max-w-[22ch] text-balance text-3xl font-extrabold drop-shadow-[0_0_25px_rgba(255,215,130,0.25)] sm:max-w-none sm:text-4xl md:text-8xl"
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          Catering <br /> &amp; <br /> Cafeterias
        </motion.h1>

        {/* Gold divider */}
        <motion.div
          className="relative z-10 mt-12 h-0.5 w-20 rounded-full sm:w-28"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--color-gold), transparent)",
          }}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Subtitle */}
        {/* <motion.p
          className="relative z-10 mt-3 max-w-xl text-base font-extralight text-center drop-shadow-[0_0_15px_rgba(255,215,130,0.25)] sm:text-lg"
          style={{ color: "var(--color-lightGold)" }}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Fresh meals, daily specials, and catering crafted for your campus or
          event.
        </motion.p> */}

        {/* CTAs */}
        {/* <motion.div
          className="relative z-10 mt-8 flex w-full max-w-sm flex-col items-stretch justify-center gap-3 sm:max-w-none sm:flex-row sm:items-center"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            to="/order"
            className="rounded-xl bg-linear-to-r from-gold to-lightGold px-8 py-3.5 text-center font-semibold text-black shadow-xl transition hover:brightness-105"
          >
            Order Now
          </Link>
          <Link
            to="/traiteur"
            className="rounded-xl border border-white/25 px-8 py-3.5 text-center font-semibold text-white backdrop-blur-xl transition hover:bg-white/10"
          >
            Discover Catering
          </Link>
        </motion.div> */}
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
                src="https://images.unsplash.com/photo-1645914401798-1f93bb80b6ec?w=640&q=60&auto=format&fit=crop"
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
                src="https://images.unsplash.com/photo-1551266681-ba5f0b95e2e5?w=640&q=60&auto=format&fit=crop"
                alt="Cafeterias"
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

        <h3 className="text-4xl md:text-5xl mb-6 tracking-wide opacity-0 text-justify animate-[fadeUp_1.2s_ease-out_forwards] text-lightGold uppercase font-extralight">
          A solution designed for your needs
        </h3>

        <p className="max-w-2xl text-lg md:text-xl text-justify opacity-0 mt-2 leading-relaxed animate-[fadeUp_1.6s_ease-out_forwards] text-(--color-bg)">
          More than just catering: FOOD & COFFEE creates gourmet spaces,
          organizes your events, and designs professional menus for companies,
          schools, and large institutions.
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
