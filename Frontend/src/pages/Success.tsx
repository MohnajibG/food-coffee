import { Link } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";

const Success = () => {
  return (
    <div className="flex min-h-[70vh] w-full flex-col items-center justify-center gap-4 bg-cream px-6 text-center text-ink">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-accent/10">
        <FiCheckCircle size={36} className="text-green-accent" />
      </div>
      <h1 className="text-3xl font-bold text-green-accent sm:text-4xl">
        Payment successful!
      </h1>
      <p className="max-w-md text-ink/70">
        Thank you for your order. You will receive a confirmation shortly.
      </p>
      <Link
        to="/order"
        className="mt-2 rounded-xl bg-linear-to-r from-gold to-lightGold px-7 py-3 font-semibold text-black shadow-xl transition hover:brightness-105"
      >
        Back to menu
      </Link>
    </div>
  );
};

export default Success;
