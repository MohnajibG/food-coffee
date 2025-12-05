/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, type FC, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import dataCafeteria from "../data/cafeterias.json";
import { FiShoppingCart } from "react-icons/fi";

/* ================= HERO ================= */

const heroImages = [
  "/images/traiteur/hero1.jpg",
  "/images/traiteur/hero2.jpg",
  "/images/traiteur/hero3.jpg",
];

const Hero: FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setIndex((i) => (i + 1) % heroImages.length),
      4000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
      {heroImages.map((src, i) => (
        <motion.img
          key={i}
          src={src}
          initial={{ opacity: 0 }}
          animate={{ opacity: index === i ? 1 : 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ))}

      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-white text-4xl md:text-7xl font-light leading-tight"
        >
          Précommandez vos repas
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-white text-lg md:text-2xl mt-4 opacity-90"
        >
          Rapide, simple, efficace.
        </motion.p>
      </div>
    </section>
  );
};

/* ================= PRODUCT MODAL ================= */

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
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end justify-center z-[99]"
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 300 }}
            animate={{ y: 0 }}
            exit={{ y: 300 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-t-3xl w-full max-h-[90vh] p-5 overflow-y-auto shadow-2xl"
          >
            <img
              src={product.photos?.[0]}
              className="modal-product-img w-full h-52 md:h-64 object-cover rounded-2xl shadow-lg"
            />

            <h3 className="text-2xl md:text-3xl font-bold text-[#4a1f29] mt-4">
              {product.nom}
            </h3>

            <p className="text-lg md:text-xl font-semibold text-[#50741f] mt-1">
              {product.prix.toFixed(2)} €
            </p>

            {product.description && (
              <p className="mt-4 text-gray-600 text-sm md:text-base">
                {product.description}
              </p>
            )}

            <div className="flex items-center gap-4 mt-6">
              <button
                onClick={() => qty > 1 && setQty(qty - 1)}
                className="w-12 h-12 bg-gray-200 rounded-full text-2xl"
              >
                –
              </button>

              <span className="text-2xl font-semibold">{qty}</span>

              <button
                onClick={() => setQty(qty + 1)}
                className="w-12 h-12 bg-gray-200 rounded-full text-2xl"
              >
                +
              </button>
            </div>

            <button
              onClick={() => {
                onAdd(
                  { ...product, qty },
                  document.querySelector(".modal-product-img")
                );
                setQty(1);
                onClose();
              }}
              className="mt-8 w-full bg-[#50741f] text-white py-3 rounded-xl text-lg font-semibold"
            >
              Ajouter au panier
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ================= PANIER ================= */

const PanierRight: FC<{
  open: boolean;
  onClose: () => void;
  cart: any[];
  setCart: any;
}> = ({ open, onClose, cart, setCart }) => {
  const total = cart.reduce((s, p) => s + p.qty * p.prix, 0);

  const [infos, setInfos] = useState({
    nom: "",
    email: "",
    tel: "",
  });

  const sendOrder = () => {
    const message = cart
      .map((p) => `${p.nom} × ${p.qty} — ${p.prix}€`)
      .join("\n");

    emailjs.send(
      "serviceID",
      "templateID",
      {
        nom: infos.nom,
        email: infos.email,
        tel: infos.tel,
        panier: message,
        total: total.toFixed(2),
      },
      "publicKey"
    );

    alert("Commande envoyée !");
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[90]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed top-0 right-0 h-full w-[90%] md:w-[420px] bg-white shadow-2xl z-[99] flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35 }}
          >
            <div className="flex justify-between items-center p-5 border-b">
              <h3 className="text-2xl font-bold text-[#4a1f29]">Panier</h3>
              <button onClick={onClose} className="text-3xl text-gray-500">
                ×
              </button>
            </div>

            <div className="flex-1 p-5 overflow-y-auto">
              {cart.map((item, i) => (
                <div
                  key={i}
                  className="p-4 bg-gray-50 rounded-xl shadow flex justify-between items-center mb-4 border"
                >
                  <div>
                    <p className="font-semibold">{item.nom}</p>
                    <p className="text-sm opacity-70">
                      {item.qty} × {item.prix.toFixed(2)} €
                    </p>
                  </div>

                  <button
                    onClick={() => setCart(cart.filter((_, x) => x !== i))}
                    className="text-red-500 text-2xl"
                  >
                    ×
                  </button>
                </div>
              ))}

              {cart.length > 0 && (
                <div className="mt-6 space-y-4">
                  <input
                    placeholder="Nom complet"
                    className="w-full border p-3 rounded-xl"
                    value={infos.nom}
                    onChange={(e) =>
                      setInfos({ ...infos, nom: e.target.value })
                    }
                  />
                  <input
                    placeholder="Email"
                    className="w-full border p-3 rounded-xl"
                    value={infos.email}
                    onChange={(e) =>
                      setInfos({ ...infos, email: e.target.value })
                    }
                  />
                  <input
                    placeholder="Téléphone"
                    className="w-full border p-3 rounded-xl"
                    value={infos.tel}
                    onChange={(e) =>
                      setInfos({ ...infos, tel: e.target.value })
                    }
                  />
                </div>
              )}
            </div>

            <div className="p-5 border-t">
              <p className="text-xl font-bold text-[#50741f]">
                Total : {total.toFixed(2)} €
              </p>

              <button
                onClick={sendOrder}
                className="mt-4 w-full bg-[#50741f] text-white py-3 rounded-xl text-lg font-semibold"
              >
                Envoyer la commande
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

/* ================= CATEGORIES ================= */

const Categories: FC<{
  selected: keyof typeof dataCafeteria | null;
  onSelect: (c: keyof typeof dataCafeteria) => void;
}> = ({ selected, onSelect }) => {
  const categories = Object.keys(
    dataCafeteria
  ) as (keyof typeof dataCafeteria)[];

  return (
    <div className="overflow-x-auto no-scrollbar flex flex-col md:flex-wrap gap-3 px-4 py-3 w-full md:flex-row md:h-16 items-center justify-center">
      {categories.map((cat) => (
        <motion.div
          key={cat}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(cat)}
          className={`px-5 py-2 rounded-xl border whitespace-nowrap shadow-sm text-lg font-medium cursor-pointer
              ${
                selected === cat
                  ? "bg-[#50741f] text-white border-[#50741f]"
                  : "bg-[#50741f]/20 text-gray-700 border-gray-200"
              }`}
        >
          {cat.replace(/_/g, " ")}
        </motion.div>
      ))}
    </div>
  );
};

/* ================= PRODUITS ================= */

const Catalogue: FC<{
  onAdd: (p: any, img: HTMLImageElement | null) => void;
}> = ({ onAdd }) => {
  const [cat, setCat] = useState<keyof typeof dataCafeteria | null>(null);
  const [product, setProduct] = useState<any>(null);

  return (
    <section className="py-10 bg-gray-50 w-full">
      <h2 className="text-4xl text-center font-light text-[#d8b56a] mb-6">
        Nos Produits
      </h2>

      <Categories selected={cat} onSelect={setCat} />

      {cat && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 px-4 mt-8 w-full">
          {dataCafeteria[cat].map((item: any, i: number) => (
            <motion.div
              key={i}
              onClick={() => setProduct(item)}
              whileHover={{ scale: 1.03 }}
              className="bg-[#50741f]/30 border border-gray-200 p-4 rounded-xl shadow-sm"
            >
              <h4 className="text-lg font-semibold">{item.nom}</h4>
              <p className="text-[#50741f] font-bold mt-2 text-sm">
                {item.prix.toFixed(2)} €
              </p>
            </motion.div>
          ))}
        </div>
      )}

      <ProductModal
        isOpen={!!product}
        product={product}
        onClose={() => setProduct(null)}
        onAdd={onAdd}
      />
    </section>
  );
};

/* ================= PAGE ================= */

const Precommande = () => {
  const [cart, setCart] = useState<any[]>([]);
  const [openPanier, setOpenPanier] = useState(false);
  const cartIconRef = useRef<HTMLButtonElement>(null);

  const [fly, setFly] = useState<{
    img: string;
    x: number;
    y: number;
  } | null>(null);

  const handleAdd = (product: any, img: HTMLImageElement | null) => {
    setCart((c) => [...c, product]);

    if (!img || !cartIconRef.current) return;

    const imgRect = img.getBoundingClientRect();
    const cartRect = cartIconRef.current.getBoundingClientRect();

    setFly({ img: product.photos[0], x: imgRect.x, y: imgRect.y });

    setTimeout(() => {
      setFly({ img: product.photos[0], x: cartRect.x, y: cartRect.y });
    }, 50);

    setTimeout(() => setFly(null), 600);
  };

  return (
    <div className="relative w-full mt-26">
      <Hero />
      <div className="flex justify-end items-center px-4 py-4 w-full">
        <button
          ref={cartIconRef}
          onClick={() => setOpenPanier(true)}
          className="relative"
        >
          <FiShoppingCart size={30} className="text-[#4a1f29]" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-3 bg-[#50741f] text-white text-sm px-2 py-[2px] rounded-full">
              {cart.length}
            </span>
          )}
        </button>
      </div>

      <Catalogue onAdd={handleAdd} />

      <PanierRight
        open={openPanier}
        onClose={() => setOpenPanier(false)}
        cart={cart}
        setCart={setCart}
      />

      {fly && (
        <motion.img
          src={fly.img}
          initial={{ x: fly.x, y: fly.y, scale: 1, opacity: 1 }}
          animate={{
            x: fly.x,
            y: fly.y,
            scale: 0.2,
            opacity: 0,
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed w-16 h-16 object-cover rounded-xl pointer-events-none z-[9999]"
          style={{ top: 0, left: 0 }}
        />
      )}
    </div>
  );
};

export default Precommande;
