import { useCallback, useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { motion, AnimatePresence, easeOut, easeIn } from "framer-motion";
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

const PDF_PATH = "/documents/FOOD&COFFEE.pdf";

export default function FlipbookPDF() {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [numPages, setNumPages] = useState(0);
  const [page, setPage] = useState(1);
  const [width, setWidth] = useState(900);
  const ref = useRef<HTMLDivElement | null>(null);

  /* ---------------------------------------------
     Resize dynamique
  --------------------------------------------- */
  useEffect(() => {
    if (!ref.current) return;
    const obs = new ResizeObserver((entries) => {
      const w = entries[0].contentRect.width;
      setWidth(Math.min(1100, Math.max(320, w)));
    });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  /* ---------------------------------------------
     Chargement PDF → Blob
  --------------------------------------------- */
  useEffect(() => {
    let stop = false;
    let obj: string | null = null;

    (async () => {
      const res = await fetch(PDF_PATH);
      const blob = await res.blob();
      if (stop) return;
      obj = URL.createObjectURL(blob);
      setBlobUrl(obj);
    })();

    return () => {
      stop = true;
      if (obj) URL.revokeObjectURL(obj);
    };
  }, []);

  const next = useCallback(() => {
    setPage((p) => Math.min(numPages, p + 2));
  }, [numPages]);

  const prev = useCallback(() => {
    setPage((p) => Math.max(1, p - 2));
  }, []);

  const onDocLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPage(1);
  };

  const spread = Math.floor(width / 2) - 20;

  /* ---------------------------------------------
     ANIMATION LIVRE PREMIUM (Framer v12 compatible)
  --------------------------------------------- */
  const pageTurn = {
    initial: {
      opacity: 0,
      rotateY: 20,
      scale: 0.97,
      x: 60,
      boxShadow: "0 25px 60px rgba(0,0,0,0.15)",
    },
    animate: {
      opacity: 1,
      rotateY: 0,
      scale: 1,
      x: 0,
      boxShadow: "0 15px 40px rgba(0,0,0,0.12)",
      transition: {
        duration: 0.55,
        ease: easeOut,
      },
    },
    exit: {
      opacity: 0,
      rotateY: -20,
      scale: 0.96,
      x: -60,
      boxShadow: "0 25px 60px rgba(0,0,0,0.15)",
      transition: {
        duration: 0.45,
        ease: easeIn,
      },
    },
  };

  return (
    <section className="min-h-screen w-full bg-[#faf8f3] py-20 px-4 flex justify-center">
      <div
        ref={ref}
        className="w-full max-w-6xl mx-auto flex flex-col items-center relative"
      >
        {/* Cadre premium */}
        <div className="absolute inset-0 mx-auto max-w-4xl -z-10 bg-linear-to-b from-white to-[#faf3d5] rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.07)]" />

        {/* ------------------- FLIPBOOK ------------------- */}
        {blobUrl ? (
          <Document
            file={blobUrl}
            onLoadSuccess={onDocLoadSuccess}
            loading={<div className="text-gray-600 mt-10">Chargement…</div>}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={page}
                variants={pageTurn}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex justify-center gap-6 perspective-1000 p-10"
              >
                {/* Page gauche */}
                <div className="rounded-xl overflow-hidden bg-white shadow-lg">
                  <Page
                    pageNumber={page}
                    width={spread}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                </div>

                {/* Page droite */}
                {page + 1 <= numPages && (
                  <div className="rounded-xl overflow-hidden bg-white shadow-lg">
                    <Page
                      pageNumber={page + 1}
                      width={spread}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                    />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </Document>
        ) : (
          <div className="text-gray-600 mt-10">Chargement…</div>
        )}

        {/* ----------------------- NAVIGATION PREMIUM ----------------------- */}
        {numPages > 0 && (
          <div className="flex items-center gap-6 mt-10">
            <button
              onClick={prev}
              disabled={page <= 1}
              className="px-6 py-3 rounded-full bg-[#faf3d5] border border-[#d4af37] text-[#3d5a17] font-semibold shadow-md hover:bg-[#f3e8c1] transition disabled:opacity-40"
            >
              ← Page précédente
            </button>

            <span className="text-[#3d5a17] font-semibold tracking-wide">
              {page} / {numPages}
            </span>

            <button
              onClick={next}
              disabled={page >= numPages}
              className="px-6 py-3 rounded-full bg-[#faf3d5] border border-[#d4af37] text-[#3d5a17] font-semibold shadow-md hover:bg-[#f3e8c1] transition disabled:opacity-40"
            >
              Page suivante →
            </button>

            <a
              href={PDF_PATH}
              download
              className="px-6 py-3 rounded-full bg-[#50741f] text-white font-semibold shadow-lg hover:bg-[#3d5a17] transition"
            >
              Télécharger PDF
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
