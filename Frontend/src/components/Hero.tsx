import { useState, useEffect, type FC, type ReactNode } from "react";

interface HeroProps {
  heroPhotos: string[];
  title: ReactNode; // ReactNode pour titre dynamique
  subtitle?: ReactNode; // ReactNode pour sous-titre dynamique
  overlayColor?: string; // couleur overlay
  interval?: number; // durée du slideshow en ms
  className?: string; // classes supplémentaires
  children?: ReactNode; // pour boutons ou autres composants
}

const Hero: FC<HeroProps> = ({
  heroPhotos,
  title,
  subtitle,
  overlayColor = "rgba(0,0,0,0.4)",
  interval = 4000,
  className = "h-screen",
  children,
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % heroPhotos.length);
    }, interval);
    return () => clearInterval(t);
  }, [heroPhotos.length, interval]);

  return (
    <section className={`relative w-full h-[80%] overflow-hidden ${className}`}>
      {heroPhotos.map((src, i) => (
        <img
          key={i}
          src={src}
          style={{ opacity: i === index ? 1 : 0 }}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
        />
      ))}

      <div
        className="absolute inset-0"
        style={{ backgroundColor: overlayColor }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full gap-6 px-6">
        <h1 className="text-white text-4xl md:text-6xl font-extrabold drop-shadow-xl">
          {title}
        </h1>
        {subtitle && (
          <p className="text-white/90 text-lg md:text-2xl max-w-3xl">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  );
};

export default Hero;
