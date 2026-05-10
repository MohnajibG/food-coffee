import { useRef, useState } from "react";

import Hero from "../components/Hero";
import Categories from "../components/Categories";
import ProductGrid from "../components/ProductGrid";
import ProductModal from "../components/ProductModal";
import CartSidebar from "../components/CartSidebar";
import FloatingCartButton from "../components/FloatingCartButton";
import FlyToCart from "../components/FlyToCart";

import dataCafeteria from "../data/cafeterias.json";

interface Product {
  id: string;
  name: string;
  price: number;
  photos: string[];
  description?: string;
}
const heroImages = [
  "https://res.cloudinary.com/dqwocrdnh/image/upload/v1765486162/hero1_onn8o8.webp",
  "https://res.cloudinary.com/dqwocrdnh/image/upload/v1765487796/vue-aerienne-de-divers-cafe_nyncyf.webp",
  "https://res.cloudinary.com/dqwocrdnh/image/upload/v1765487799/set-de-patisseries-de-boulangerie-sur-une-table-en-bois_aeadxa.webp",
  "https://res.cloudinary.com/dqwocrdnh/image/upload/v1765487795/delicieux-bols-de-saumon-sur-table_kk9nai.webp",
];

const OrderPage = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [openCart, setOpenCart] = useState(false);

  const [selectedCat, setSelectedCat] = useState<
    keyof typeof dataCafeteria | null
  >(null);

  const [product, setProduct] = useState<Product | null>(null);

  const cartIconRef = useRef<HTMLButtonElement>(null);

  const [fly, setFly] = useState<{
    img: string;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
  } | null>(null);

  const handleAdd = (product: Product, img: HTMLImageElement | null) => {
    setCart((prev) => [...prev, product]);

    if (!img || !cartIconRef.current) return;

    const imgRect = img.getBoundingClientRect();
    const cartRect = cartIconRef.current.getBoundingClientRect();

    setFly({
      img: product.photos[0],
      startX: imgRect.left,
      startY: imgRect.top,
      endX: cartRect.left,
      endY: cartRect.top,
    });

    setTimeout(() => setFly(null), 700);
  };

  return (
    <div className="relative min-h-screen min-w-screen bg-gold/10 overflow-hidden">
      <Hero
        heroPhotos={heroImages}
        overlayColor="rgba(0,0,0,0.45)"
        className="h-screen"
        title={
          <>
            <span className="text-gold block text-5xl md:text-8xl font-light">
              FOOD
            </span>

            <span className="text-white text-4xl md:text-6xl">& COFFEE</span>
          </>
        }
        subtitle="Premium picks & daily specials"
      >
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <button className="px-8 py-3 rounded-xl bg-linear-to-r from-gold to-[#f3df9a] text-black shadow-xl">
            View Menu
          </button>

          <a
            href="#products"
            className="px-8 py-3 rounded-xl border border-white/20 text-white backdrop-blur-xl"
          >
            How it works
          </a>
        </div>
      </Hero>

      <FloatingCartButton
        count={cart.length}
        onClick={() => setOpenCart(true)}
        cartRef={cartIconRef}
      />

      <main
        id="products"
        className="max-w-7xl mx-auto px-4 py-24 flex flex-col md:flex-row gap-8"
      >
        <aside className="md:w-1/5 sticky top-20 h-fit">
          <Categories selected={selectedCat} onSelect={setSelectedCat} />
        </aside>

        <section className="flex-1">
          <ProductGrid
            onAdd={handleAdd}
            selectedCat={selectedCat}
            setProduct={setProduct}
          />
        </section>
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

      <FlyToCart fly={fly} />
    </div>
  );
};

export default OrderPage;
