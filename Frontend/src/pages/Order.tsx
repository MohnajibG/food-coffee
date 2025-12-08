/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, type FC, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import dataCafeteria from "../data/cafeterias.json";
import { FiShoppingCart } from "react-icons/fi";

/* ================= HERO (glass + gradient) ================= */

const heroImages = [
  "/images/traiteur/hero1.jpg",
  "/images/traiteur/hero2.jpg",
  "/images/traiteur/hero3.jpg",
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
      {heroImages.map((src, i) => (
        <motion.img
          key={i}
          src={src}
          initial={{ opacity: 0 }}
          animate={{ opacity: index === i ? 1 : 0 }}
          transition={{ duration: 1.4 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ))}

      {/* color gradient overlay for warmth */}
      <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/20 to-black/60" />

      {/* centered glass card */}
      <div className="absolute inset-0 flex items-center justify-center px-4 mt-36">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl w-full bg-white/6 backdrop-blur-md border border-white/10 rounded-3xl p-8 text-center
                     shadow-2xl"
        >
          <h1 className="text-white text-4xl md:text-6xl font-extrabold leading-tight">
            Pre-Order Your Meal
          </h1>
          <p className="mt-4 text-white/90 text-lg md:text-xl">
            {subtitle ?? "Fast — Fresh — At your campus."}
          </p>

          <div className="mt-6 flex items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 rounded-xl bg-linear-to-r from-gold to-[#f3df9a] font-semibold shadow-md"
            >
              View Menu
            </motion.button>

            <motion.a
              whileHover={{ y: -3 }}
              href="#products"
              className="px-5 py-3 rounded-xl border border-white/20 text-white/90 backdrop-blur-sm"
            >
              How it works
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ================= PRODUCT MODAL (glass) ================= */

const ProductModal: FC<{
  isOpen: boolean;
  product: any;
  onClose: () => void;
  onAdd: (p: any, img: HTMLImageElement | null) => void;
}> = ({ isOpen, product, onClose, onAdd }) => {
  const [qty, setQty] = useState(1);
  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end justify-center z-99"
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 350 }}
            animate={{ y: 0 }}
            exit={{ y: 350 }}
            transition={{ duration: 0.35 }}
            className="bg-white/6 backdrop-blur-lg border border-white/10 rounded-t-3xl w-full max-h-[90vh] p-5 overflow-y-auto shadow-2xl"
          >
            <img
              src={product.photos?.[0]}
              className="modal-product-img w-full h-56 md:h-64 object-cover rounded-2xl shadow-inner"
            />

            <h3 className="text-2xl md:text-3xl font-bold text-white mt-4 drop-shadow">
              {product.nom}
            </h3>

            <p className="text-lg md:text-xl font-semibold text-white/90 mt-1">
              {product.prix.toFixed(2)} €
            </p>

            {product.description && (
              <p className="mt-4 /80 text-sm md:text-base">
                {product.description}
              </p>
            )}

            <div className="flex items-center gap-4 mt-6">
              <button
                onClick={() => qty > 1 && setQty(qty - 1)}
                className="w-12 h-12 bg-white/8 rounded-full text-2xl"
              >
                –
              </button>

              <span
                className="text-2xl font-semibold"
                style={{ color: "var(--color-text)" }}
              >
                {qty}
              </span>

              <button
                onClick={() => setQty(qty + 1)}
                className="w-12 h-12 bg-white/8 rounded-full text-2xl"
              >
                +
              </button>
            </div>

            <motion.button
              onClick={() => {
                onAdd(
                  { ...product, qty },
                  document.querySelector(".modal-product-img")
                );
                setQty(1);
                onClose();
              }}
              whileHover={{ scale: 1.02 }}
              className="mt-8 w-full bg-linear-to-r from-[#50741f] to-[#3f5e13] text-white py-3 rounded-xl text-lg font-semibold shadow-lg"
            >
              Add to cart
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ================= CART SIDEBAR (glass) ================= */

const CartSidebar: FC<{
  open: boolean;
  onClose: () => void;
  cart: any[];
  setCart: any;
}> = ({ open, onClose, cart, setCart }) => {
  const total = cart.reduce((s, p) => s + p.qty * p.prix, 0);

  const [infos, setInfos] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const sendOrder = () => {
    const message = cart
      .map((p) => `${p.nom} × ${p.qty} — ${p.prix}€`)
      .join("\n");
    emailjs.send(
      "serviceID",
      "templateID",
      {
        name: infos.name,
        email: infos.email,
        phone: infos.phone,
        cart: message,
        total: total.toFixed(2),
      },
      "publicKey"
    );
    alert("Order sent!");
    setCart([]); // clear after send
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.aside
            className="fixed top-0 right-0 h-full w-[92%] md:w-[420px] bg-white/6 backdrop-blur-lg border-l border-white/10 shadow-2xl z-99 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35 }}
          >
            <div className="flex justify-between items-center p-5 border-b border-white/8">
              <h3 className="text-2xl font-bold text-white">Your Cart</h3>
              <button onClick={onClose} className="text-3xl text-white/80">
                ×
              </button>
            </div>

            <div className="flex-1 p-5 overflow-y-auto">
              {cart.length === 0 && (
                <div className="text-center text-white/70 mt-8">
                  Your cart is empty
                </div>
              )}

              {cart.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="p-4 bg-white/4 rounded-xl shadow-sm flex justify-between items-center mb-4 border border-white/6"
                >
                  <div>
                    <p className="font-semibold text-white">{item.nom}</p>
                    <p className="text-sm text-white/70">
                      {item.qty} × {item.prix.toFixed(2)} €
                    </p>
                  </div>

                  <button
                    onClick={() => setCart(cart.filter((_, x) => x !== i))}
                    className="text-red-400 text-2xl"
                  >
                    ×
                  </button>
                </motion.div>
              ))}

              {cart.length > 0 && (
                <div className="mt-6 space-y-4">
                  <input
                    placeholder="Full name"
                    className="w-full border border-white/10 p-3 rounded-xl bg-white/4 text-white"
                    value={infos.name}
                    onChange={(e) =>
                      setInfos({ ...infos, name: e.target.value })
                    }
                  />
                  <input
                    placeholder="Email"
                    className="w-full border border-white/10 p-3 rounded-xl bg-white/4 text-white"
                    value={infos.email}
                    onChange={(e) =>
                      setInfos({ ...infos, email: e.target.value })
                    }
                  />
                  <input
                    placeholder="Phone number"
                    className="w-full border border-white/10 p-3 rounded-xl bg-white/4 text-white"
                    value={infos.phone}
                    onChange={(e) =>
                      setInfos({ ...infos, phone: e.target.value })
                    }
                  />
                </div>
              )}
            </div>

            <div className="p-5 border-t border-white/8">
              <p className="text-xl font-bold text-white">
                Total : {total.toFixed(2)} €
              </p>
              <motion.button
                onClick={sendOrder}
                whileHover={{ scale: 1.02 }}
                className="mt-4 w-full bg-linear-to-r from-[#50741f] to-[#3f5e13] text-white py-3 rounded-xl text-lg font-semibold shadow-lg"
              >
                Send Order
              </motion.button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

/* ================= CATEGORIES (chip style glass) ================= */

const Categories: FC<{
  selected: keyof typeof dataCafeteria | null;
  onSelect: (c: keyof typeof dataCafeteria) => void;
}> = ({ selected, onSelect }) => {
  const categories = Object.keys(
    dataCafeteria
  ) as (keyof typeof dataCafeteria)[];

  return (
    <div className="overflow-x-auto no-scrollbar flex gap-3 px-4 py-3 w-full items-center justify-center">
      {categories.map((cat) => (
        <motion.div
          key={cat}
          whileTap={{ scale: 0.96 }}
          onClick={() => onSelect(cat)}
          className={`px-4 py-2 rounded-full border whitespace-nowrap shadow-sm text-sm font-medium cursor-pointer toppercase
            ${
              selected === cat
                ? "bg-linear-to-r from-[#50741f] to-[#3f5e13] text-white"
                : "bg-white/6 text-[#212121] border-white/6"
            }`}
        >
          {cat.replace(/_/g, " ")}
        </motion.div>
      ))}
    </div>
  );
};

/* ================= PRODUCT GRID (cards glass + hover) ================= */

const ProductGrid: FC<{
  onAdd: (p: any, img: HTMLImageElement | null) => void;
}> = ({ onAdd }) => {
  const [cat, setCat] = useState<keyof typeof dataCafeteria | null>(null);
  const [product, setProduct] = useState<any>(null);

  return (
    <section id="products" className="py-80 px-4 md:px-8 w-full">
      <h2 className="text-4xl text-center font-light text-[#f1d985] mb-6">
        Our Products
      </h2>

      <div className="max-w-6xl mx-auto">
        <Categories selected={cat} onSelect={setCat} />

        {cat && (
          <motion.div
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8"
          >
            {dataCafeteria[cat].map((item: any, i: number) => (
              <motion.div
                key={i}
                onClick={() => setProduct(item)}
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="relative p-4 rounded-2xl bg-white/4 backdrop-blur-sm border border-white/8 shadow-lg cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-white/8 shrink-0">
                    <img
                      src={item.photos?.[0]}
                      alt={item.nom}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h4 className="text-[#212121] font-semibold">{item.nom}</h4>
                    <p className="text-[#212121]/80 mt-1">
                      {item.description?.slice(0, 80)}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-white/95">
                      {item.prix.toFixed(2)} €
                    </p>
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAdd(
                          item,
                          document.querySelector(".modal-product-img")
                        );
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-4 bg-linear-to-r from-[#50741f] to-[#3f5e13] text-white px-3 py-2 rounded-lg text-sm"
                    >
                      + Add
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        <ProductModal
          isOpen={!!product}
          product={product}
          onClose={() => setProduct(null)}
          onAdd={onAdd}
        />
      </div>
    </section>
  );
};

/* ================= PAGE ================= */

const OrderPage = () => {
  const [cart, setCart] = useState<any[]>([]);
  const [openCart, setOpenCart] = useState(false);
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
    <div className="relative w-full text-white">
      <Hero subtitle="Premium picks & daily specials" />

      {/* Cart icon - floating glass */}
      <div className="fixed right-6 bottom-6 z-60">
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

      <main className="pt-8">
        <ProductGrid onAdd={handleAdd} />
      </main>

      <CartSidebar
        open={openCart}
        onClose={() => setOpenCart(false)}
        cart={cart}
        setCart={setCart}
      />

      {/* Fly animation */}
      {fly && (
        <motion.img
          src={fly.img}
          initial={{ x: fly.x, y: fly.y, scale: 1, opacity: 1 }}
          animate={{ x: fly.x, y: fly.y, scale: 0.18, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed w-16 h-16 object-cover rounded-xl pointer-events-none z-9999"
          style={{ top: 0, left: 0 }}
        />
      )}
    </div>
  );
};

export default OrderPage;
