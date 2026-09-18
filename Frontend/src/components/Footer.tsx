import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";

const navLinks = ["About us", "Legal notice", "Privacy policy", "Terms of use"];

const socials = [
  { icon: FaFacebookF, label: "Facebook", url: "#" },
  { icon: FaInstagram, label: "Instagram", url: "#" },
  { icon: FaLinkedinIn, label: "LinkedIn", url: "#" },
];

const Footer = () => {
  return (
    <footer
      className="theme-traiteur relative overflow-hidden px-6 pb-10 pt-16 sm:px-10 md:px-16"
      style={{
        backgroundColor: "var(--color-primary)",
        color: "var(--color-accent-light)",
      }}
    >
      {/* Decorative gold gradient edge */}
      <div className="absolute top-0 left-0 h-px w-full bg-linear-to-r from-transparent via-gold/60 to-transparent" />
      <div className="absolute -top-24 left-1/2 h-64 w-[500px] -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-14">
        {/* TOP SECTION */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.3fr_1fr_1fr] md:gap-8">
          {/* BRAND */}
          <div className="flex flex-col items-center gap-4 text-center md:items-start md:text-left">
            <img
              src="/images/logo.png"
              alt="Food Coffee Logo"
              className="h-24 w-auto object-contain opacity-90"
            />
            <p className="max-w-xs text-sm leading-relaxed opacity-70">
              Premium catering services and culinary expertise dedicated to
              corporate spaces, campuses, and professional events.
            </p>
          </div>

          {/* NAVIGATION */}
          <div className="flex flex-col items-center gap-3 text-center md:items-start md:text-left">
            <h3 className="font-serif text-lg tracking-wide text-gold">
              Company
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm opacity-70">
              {navLinks.map((link) => (
                <li key={link}>{link}</li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div className="flex flex-col items-center gap-4 text-center md:items-end md:text-right">
            <h3 className="font-serif text-lg tracking-wide text-gold">
              Contact
            </h3>

            <ul className="flex flex-col gap-2.5 text-sm opacity-80">
              <li className="flex items-center gap-2 md:flex-row-reverse">
                <FiMapPin className="text-gold/80" size={14} />
                <span>Paris, France</span>
              </li>
              <li className="flex items-center gap-2 md:flex-row-reverse">
                <FiPhone className="text-gold/80" size={14} />
                <span>01 00 00 00 00</span>
              </li>
              <li className="flex items-center gap-2 md:flex-row-reverse">
                <FiMail className="text-gold/80" size={14} />
                <span>contact@foodcoffee.com</span>
              </li>
            </ul>

            <div className="flex items-center gap-3 pt-1">
              {socials.map(({ icon: Icon, label, url }) => (
                <a
                  key={label}
                  href={url}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-gold shadow-sm transition-all hover:-translate-y-0.5 hover:bg-gold hover:text-[#4a1f29]"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* SEPARATOR */}
        <div className="h-px w-full bg-gold/15" />

        {/* BOTTOM SECTION */}
        <div className="flex flex-col items-center gap-2 text-center text-xs tracking-wide opacity-55 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} FOOD COFFEE — All rights reserved.</span>
          <span>SIRET 00000000000000</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
