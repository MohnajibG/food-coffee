import { useCallback, useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { motion, AnimatePresence, easeOut, easeIn } from "framer-motion";
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

const PDF_PATH = "/documents/FOOD&COFFEE.pdf";

const FlipbookPDF = () => {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [numPages, setNumPages] = useState(0);
  const [page, setPage] = useState(1);
  const [width, setWidth] = useState(900);
  const [isMobile, setIsMobile] = useState(false);

  const ref = useRef<HTMLDivElement | null>(null);

  // Detect mobile / desktop
  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Responsive width
  useEffect(() => {
    if (!ref.current) return;
    const obs = new ResizeObserver((entries) => {
      const w = entries[0].contentRect.width;
      setWidth(Math.min(1100, Math.max(320, w)));
    });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // Load PDF blob
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

  // Navigation
  const next = useCallback(() => {
    setPage((p) => Math.min(numPages, p + (isMobile ? 1 : 2)));
  }, [numPages, isMobile]);

  const prev = useCallback(() => {
    setPage((p) => Math.max(1, p - (isMobile ? 1 : 2)));
  }, [isMobile]);

  const onDocLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPage(1);
  };

  const spread = isMobile ? width - 40 : Math.floor(width / 2) - 20;

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
      transition: { duration: 0.55, ease: easeOut },
    },
    exit: {
      opacity: 0,
      rotateY: -20,
      scale: 0.96,
      x: -60,
      boxShadow: "0 25px 60px rgba(0,0,0,0.15)",
      transition: { duration: 0.45, ease: easeIn },
    },
  };

  return (
    <section className="min-h-screen w-full py-10 px-4 flex justify-center theme-traiteur">
      <div
        ref={ref}
        className="w-full max-w-8xl mx-auto flex flex-col items-center justify-center relative"
      >
        {/* Flipbook */}
        {blobUrl ? (
          <Document
            file={blobUrl}
            onLoadSuccess={onDocLoadSuccess}
            loading={<div className="text-gray-600 mt-10">Loading…</div>}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={page}
                variants={pageTurn}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex justify-center gap-6 p-4 rounded-3xl"
              >
                {/* Left page (mobile = single page) */}
                <div className="rounded-xl overflow-hidden bg-white shadow-lg">
                  <Page
                    pageNumber={page}
                    width={spread}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                </div>

                {/* Right page (DESKTOP ONLY) */}
                {!isMobile && page + 1 <= numPages && (
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
          <div className="text-gray-600 mt-10">Loading…</div>
        )}

        {/* Navigation */}
        {numPages > 0 && (
          <>
            <div className="flex  items-center gap-4 mt-10 justify-center">
              <button
                onClick={prev}
                disabled={page <= 1}
                className="px-2 py-3  w-40 rounded-full bg-(--color-secondary-green) text-white shadow-md hover:bg-(--color-secondary-green-light) transition disabled:opacity-40"
              >
                ← Previous
              </button>

              <span className="flex flex-row text-(--color-primary) text-xs tracking-wide">
                {page} / {numPages}
              </span>

              <button
                onClick={next}
                disabled={page >= numPages}
                className="px-2 py-3  w-40 rounded-full bg-(--color-secondary-green) text-white shadow-md hover:bg-(--color-secondary-green-light) transition disabled:opacity-40"
              >
                Next →
              </button>
            </div>
            <a
              href={PDF_PATH}
              download
              className="px-6 py-3 mt-4 rounded-full bg-(--color-accent) text-(--color-bg) shadow-lg hover:bg-(--color-secondary-green) transition"
            >
              Download PDF
            </a>
          </>
        )}
      </div>
    </section>
  );
};

export default FlipbookPDF;
