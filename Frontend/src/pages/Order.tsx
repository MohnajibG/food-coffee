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
  qty?: number;
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
  const categoryKeys = Object.keys(
    dataCafeteria,
  ) as (keyof typeof dataCafeteria)[];

  const [selectedCat, setSelectedCat] = useState<
    keyof typeof dataCafeteria | null
  >(categoryKeys[0] ?? null);

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
    <div className="relative min-h-screen w-full overflow-hidden bg-[#f7f1e4] text-[#212121]">
      <Hero
        heroPhotos={heroImages}
        overlayColor="rgba(0,0,0,0.45)"
        className="min-h-[560px] h-[78svh] md:h-[82vh]"
        title={
          <>
            <span className="block mt-3 text-4xl md:text-9xl text-gold">
              FOOD <br />& <br /> COFFEE
            </span>
          </>
        }
        subtitle="Premium picks & daily specials"
      >
        <div className="flex w-full max-w-sm flex-col items-stretch justify-center gap-3 sm:max-w-none sm:flex-row sm:items-center">
          <a
            href="#products"
            className="rounded-xl bg-linear-to-r from-gold to-[#f3df9a] px-7 py-3 text-center font-semibold text-black shadow-xl transition hover:brightness-105"
          >
            View Menu
          </a>

          <a
            href="#products"
            className="rounded-xl border border-white/25 px-7 py-3 text-center font-semibold text-white backdrop-blur-xl transition hover:bg-white/10"
          >
            Browse categories
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
        className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 py-10 sm:px-6 md:flex-row md:gap-8 md:py-16 lg:px-8"
      >
        <aside className="sticky top-0 z-20 -mx-4 bg-[#f7f1e4]/95 px-4 py-3 backdrop-blur md:top-20 md:z-auto md:mx-0 md:w-64 md:shrink-0 md:bg-transparent md:px-0 md:py-0">
          <Categories selected={selectedCat} onSelect={setSelectedCat} />
        </aside>

        <section className="min-w-0 flex-1">
          <div className="mb-5">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#50741f]">
              Menu
            </p>
            <h2 className="mt-1 text-2xl font-semibold text-[#212121] sm:text-3xl">
              Choose your favourites
            </h2>
          </div>

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
