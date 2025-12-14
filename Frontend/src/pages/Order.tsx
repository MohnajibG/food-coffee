/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, type FC, useEffect } from "react";
import { motion } from "framer-motion";
import { FiShoppingCart } from "react-icons/fi";
import Categories from "../components/Categories";
import ProductGrid from "../components/ProductGrid";
import ProductModal from "../components/ProductModal";
import CartSidebar from "../components/CartSidebar";
import dataCafeteria from "../data/cafeterias.json";

/* ================= HERO (glass + gradient) ================= */ const heroImages =
  [
    "https://res.cloudinary.com/dqwocrdnh/image/upload/v1765486162/hero1_onn8o8.webp",
    "https://res.cloudinary.com/dqwocrdnh/image/upload/v1765487796/vue-aerienne-de-divers-cafe_nyncyf.webp",
    "https://res.cloudinary.com/dqwocrdnh/image/upload/v1765487799/set-de-patisseries-de-boulangerie-sur-une-table-en-bois_aeadxa.webp",
    "https://res.cloudinary.com/dqwocrdnh/image/upload/v1765487795/delicieux-bols-de-saumon-sur-table_kk9nai.webp",
  ];
const Hero: FC<{ subtitle?: string }> = ({ subtitle }) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(
      () => setIndex((i) => (i + 1) % heroImages.length),
      4000
    );
    return () => clearInterval(t);
  }, []);
  return (
    <section className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
      {" "}
      {heroImages.map((src, i) => (
        <motion.img
          key={i}
          src={src}
          initial={{ opacity: 0 }}
          animate={{ opacity: index === i ? 1 : 0 }}
          transition={{ duration: 1.4 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ))}{" "}
      {/* color gradient overlay for warmth */}{" "}
      <div className="absolute inset-0 " /> {/* centered glass card */}{" "}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        {" "}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="max-w-6xl w-full text-center "
        >
          {" "}
          <span className="block md:text-9xl text-gold">
            {" "}
            FOOD <br />& <br /> COFFEE{" "}
          </span>{" "}
          <h1 className="text-white text-4xl md:text-6xl font-extralight leading-tight">
            {" "}
            Pre-Order Your Meal{" "}
          </h1>{" "}
          <p className="mt-4 text-white/90 text-lg md:text-xl">
            {" "}
            {subtitle ?? "Fast — Fresh — At your campus."}{" "}
          </p>{" "}
          <div className="mt-6 flex items-center text-4xl font-extralight justify-center gap-4">
            {" "}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-9 py-3 rounded-xl bg-linear-to-r from-gold to-[#f3df9a] shadow-md"
            >
              {" "}
              View Menu{" "}
            </motion.button>{" "}
            <motion.a
              whileHover={{ y: -3 }}
              href="#products"
              className="px-9 py-3 rounded-xl border border-white/20 text-white/90 backdrop-blur-xl shadow-md"
            >
              {" "}
              How it works{" "}
            </motion.a>{" "}
          </div>{" "}
        </motion.div>{" "}
      </div>{" "}
    </section>
  );
};

const OrderPage = () => {
  const [cart, setCart] = useState<any[]>([]);
  const [openCart, setOpenCart] = useState(false);
  const [selectedCat, setSelectedCat] = useState<
    keyof typeof dataCafeteria | null
  >(null);
  const [product, setProduct] = useState<any>(null);
  const cartIconRef = useRef<HTMLButtonElement>(null);
  const [fly, setFly] = useState<{ img: string; x: number; y: number } | null>(
    null
  );

  const handleAdd = (product: any, img: HTMLImageElement | null) => {
    setCart((c) => [...c, product]);
    if (!img || !cartIconRef.current) return;

    const imgRect = img.getBoundingClientRect();
    const cartRect = cartIconRef.current.getBoundingClientRect();

    setFly({ img: product.photos[0], x: imgRect.x, y: imgRect.y });

    setTimeout(() => {
      setFly({ img: product.photos[0], x: cartRect.x, y: cartRect.y });
    }, 60);

    setTimeout(() => setFly(null), 700);
  };

  return (
    <div className="relative w-full bg-gold/10 ">
      <Hero subtitle="Premium picks & daily specials" />

      {/* Cart icon - mobile first bottom */}
      <div className="fixed top-60 right-0 transform -translate-x-1/2 md:fixed md:right-6 md:bottom-6 z-50 ">
        <motion.button
          ref={cartIconRef}
          onClick={() => setOpenCart(true)}
          whileHover={{ scale: 1.05 }}
          className="relative p-3 rounded-2xl bg-[#212121]/10 backdrop-blur-md border border-white/10 shadow-xl"
        >
          <FiShoppingCart size={26} className="text-white" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#50741f] text-white text-xs px-2 py-px rounded-full">
              {cart.length}
            </span>
          )}
        </motion.button>
      </div>

      {/* Main content */}
      <main className=" max-w-6xl mx-auto px-4 py-62 flex flex-col md:flex-row md:gap-6">
        <div className="md:w-1/5 mb-6 md:mb-0 sticky top-20">
          <Categories selected={selectedCat} onSelect={setSelectedCat} />
        </div>
        <div className="md:flex-1">
          <ProductGrid
            onAdd={handleAdd}
            selectedCat={selectedCat}
            setProduct={setProduct}
          />
        </div>
      </main>

      <CartSidebar
        open={openCart}
        onClose={() => setOpenCart(false)}
        cart={cart}
        setCart={setCart}
      />

      <ProductModal
        isOpen={!!product}
        product={product}
        onClose={() => setProduct(null)}
        onAdd={handleAdd}
      />

      {fly && (
        <motion.img
          src={fly.img}
          initial={{ x: fly.x, y: fly.y, scale: 1, opacity: 1 }}
          animate={{ x: fly.x, y: fly.y, scale: 0.18, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed w-16 h-16 object-cover rounded-xl pointer-events-none z-50"
          style={{ top: 0, left: 0 }}
        />
      )}
    </div>
  );
};

export default OrderPage;
