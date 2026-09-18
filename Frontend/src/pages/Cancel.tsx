import { Link } from "react-router-dom";
import { FiXCircle } from "react-icons/fi";

const Cancel = () => {
  return (
    <div className="flex min-h-[70vh] w-full flex-col items-center justify-center gap-4 bg-cream px-6 text-center text-ink">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-ink/10">
        <FiXCircle size={36} className="text-ink/70" />
      </div>
      <h1 className="text-3xl font-bold text-ink sm:text-4xl">
        Payment canceled
      </h1>
      <p className="max-w-md text-ink/70">
        Your payment was not completed. You can go back to the menu to try
        again.
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

export default Cancel;
