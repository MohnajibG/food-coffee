/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FC } from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CartSidebarProps {
  open: boolean;
  onClose: () => void;
  cart: any[];
  setCart: (cart: any[]) => void;
}

const CartSidebar: FC<CartSidebarProps> = ({
  open,
  onClose,
  cart,
  setCart,
}) => {
  // Calcul du total sécurisé
  const total = cart.reduce((sum, item) => {
    const qty = Number(item?.qty) || 0;
    const price = Number(item?.price) || 0;
    return sum + qty * price;
  }, 0);

  const [infos, setInfos] = useState({ name: "", email: "", phone: "" });

  const checkoutWithStripe = async () => {
    if (!infos.name || !infos.email || !infos.phone) {
      alert("Please fill in all your details.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart }),
      });

      const data = await res.json();
      if (data?.url) window.location.href = data.url;
    } catch (err) {
      console.error(err);
      alert("Failed to initiate payment.");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.aside
            className="fixed top-0 right-0 h-full w-[92%] md:w-[420px] bg-white/6 backdrop-blur-lg border-l border-white/10 shadow-2xl z-50 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-5 border-b border-white/8">
              <h3 className="text-2xl font-bold text-white">Your Cart</h3>
              <button onClick={onClose} className="text-3xl text-white/80">
                ×
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 p-5 overflow-y-auto">
              {cart.length === 0 ? (
                <div className="text-center text-white/70 mt-8">
                  Your cart is empty
                </div>
              ) : (
                cart.map((item, i) => {
                  const qty = Number(item?.qty) || 0;
                  const price = Number(item?.price) || 0;
                  const name = item?.name || "Unnamed item";

                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="p-4 bg-white/4 rounded-xl shadow-sm flex justify-between items-center mb-4 border border-white/6"
                    >
                      <div>
                        <p className="font-semibold text-white">{name}</p>
                        <p className="text-sm text-white/70">
                          {qty} × {price.toFixed(2)} €
                        </p>
                      </div>
                      <button
                        onClick={() => setCart(cart.filter((_, x) => x !== i))}
                        className="text-red-400 text-2xl"
                      >
                        ×
                      </button>
                    </motion.div>
                  );
                })
              )}

              {/* User Info */}
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

            {/* Footer / Total */}
            <div className="p-5 border-t border-white/8">
              <p className="text-xl font-bold text-white">
                Total : {total.toFixed(2)} €
              </p>
              <motion.button
                onClick={checkoutWithStripe}
                whileHover={{ scale: 1.02 }}
                className="mt-4 w-full bg-linear-to-r from-[#50741f] to-[#3f5e13] text-white py-3 rounded-xl text-lg font-semibold shadow-lg"
              >
                Pay with Stripe
              </motion.button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
