// src/components/FlipbookPDF.tsx
import { useCallback, useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { motion, type Variants } from "framer-motion";

// Worker UMD → fonctionne en Vite
import workerSrc from "pdfjs-dist/build/pdf.worker.min.js?url";
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

// PDF dans /public/docs
const PDF_PATH = "/docs/sample.pdf";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Skeleton = () => (
  <div className="flex h-72 w-full items-center justify-center bg-gray-200">
    <span className="text-gray-600 text-sm">Chargement du PDF…</span>
  </div>
);

export default function FlipbookPDF() {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [containerWidth, setContainerWidth] = useState<number>(900);

  const wrapRef = useRef<HTMLDivElement | null>(null);

  // resize
  useEffect(() => {
    if (!wrapRef.current) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0].contentRect.width ?? 900;
      setContainerWidth(Math.min(900, Math.max(320, Math.floor(w))));
    });
    ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  // fetch PDF → blob
  useEffect(() => {
    let stop = false;
    let obj: string | null = null;

    (async () => {
      try {
        const res = await fetch(PDF_PATH);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const blob = await res.blob();
        if (stop) return;
        obj = URL.createObjectURL(blob);
        setBlobUrl(obj);
      } catch (e) {
        console.error("Erreur PDF :", e);
      }
    })();

    return () => {
      stop = true;
      if (obj) URL.revokeObjectURL(obj);
    };
  }, []);

  // switch pages (flipbook style)
  const prev = useCallback(() => {
    setPage((p) => Math.max(1, p - 2));
  }, []);

  const next = useCallback(() => {
    setPage((p) => Math.min(numPages, p + 2));
  }, [numPages]);

  // keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  // load success
  const onDocLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPage(1);
  };

  return (
    <section className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div ref={wrapRef} className="w-full max-w-5xl mx-auto">
        {blobUrl ? (
          <Document
            file={blobUrl}
            onLoadSuccess={onDocLoadSuccess}
            onLoadError={(e: unknown) => console.error("PDF Error:", e)}
            loading={<Skeleton />}
          >
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="flex justify-center gap-4"
            >
              {/* Page gauche */}
              <Page
                pageNumber={page}
                width={containerWidth / 2 - 12}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />

              {/* Page droite */}
              {page + 1 <= numPages && (
                <Page
                  pageNumber={page + 1}
                  width={containerWidth / 2 - 12}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              )}
            </motion.div>
          </Document>
        ) : (
          <Skeleton />
        )}

        {numPages > 0 && (
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              disabled={page <= 1}
              className={`px-4 py-2 rounded-md text-sm ${
                page <= 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              ← Précédent
            </button>

            <span className="text-gray-700">
              {page} / {numPages}
            </span>

            <button
              onClick={next}
              disabled={page >= numPages}
              className={`px-4 py-2 rounded-md text-sm ${
                page >= numPages
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Suivant →
            </button>

            <a
              href={PDF_PATH}
              download
              className="ml-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
            >
              Télécharger
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
