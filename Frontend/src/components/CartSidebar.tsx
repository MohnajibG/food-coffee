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
    const customer = {
      name: infos.name.trim(),
      email: infos.email.trim(),
      phone: infos.phone.trim(),
    };

    if (!customer.name || !customer.email || !customer.phone) {
      alert("Please fill in all your details.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart, customer }),
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
            className="fixed right-0 top-0 z-50 flex h-full w-full flex-col bg-[#212121] shadow-2xl sm:w-[420px]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 p-5">
              <h3 className="text-2xl font-bold text-white">Your Cart</h3>
              <button
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-3xl text-white/80"
              >
                ×
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5">
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
                      className="mb-3 flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 p-4 shadow-sm"
                    >
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-white">
                          {name}
                        </p>
                        <p className="text-sm text-white/70">
                          {qty} × {price.toFixed(2)} €
                        </p>
                      </div>
                      <button
                        onClick={() => setCart(cart.filter((_, x) => x !== i))}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-2xl text-red-300"
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
                    className="w-full rounded-xl border border-white/10 bg-white/8 p-3 text-white outline-none placeholder:text-white/45 focus:border-[#d8b56a]"
                    value={infos.name}
                    onChange={(e) =>
                      setInfos({ ...infos, name: e.target.value })
                    }
                  />
                  <input
                    placeholder="Email"
                    className="w-full rounded-xl border border-white/10 bg-white/8 p-3 text-white outline-none placeholder:text-white/45 focus:border-[#d8b56a]"
                    value={infos.email}
                    onChange={(e) =>
                      setInfos({ ...infos, email: e.target.value })
                    }
                  />
                  <input
                    placeholder="Phone number"
                    className="w-full rounded-xl border border-white/10 bg-white/8 p-3 text-white outline-none placeholder:text-white/45 focus:border-[#d8b56a]"
                    value={infos.phone}
                    onChange={(e) =>
                      setInfos({ ...infos, phone: e.target.value })
                    }
                  />
                </div>
              )}
            </div>

            {/* Footer / Total */}
            <div className="border-t border-white/10 p-4 sm:p-5">
              <p className="text-xl font-bold text-white">
                Total : {total.toFixed(2)} €
              </p>
              <motion.button
                onClick={checkoutWithStripe}
                whileHover={{ scale: 1.02 }}
                className="mt-4 w-full rounded-xl bg-linear-to-r from-[#50741f] to-[#3f5e13] py-3.5 text-lg font-semibold text-white shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
                disabled={cart.length === 0}
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
