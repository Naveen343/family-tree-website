import { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import familyPDF from "../assets/test.pdf";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;

export default function FamilyByLaw() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [scale, setScale] = useState(1.2);
  const renderTaskRef = useRef(null);

  // Pan state
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const loadingTask = pdfjsLib.getDocument(familyPDF);
    loadingTask.promise.then((pdf) => {
      setPdfDoc(pdf);
      renderPage(1, pdf);
    });
  }, []);

  const renderPage = (num, pdf = pdfDoc, newScale = scale) => {
    if (!pdf) return;

    pdf.getPage(num).then((page) => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const viewport = page.getViewport({ scale: newScale });
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      if (renderTaskRef.current) renderTaskRef.current.cancel();

      const renderTask = page.render({ canvasContext: ctx, viewport });
      renderTaskRef.current = renderTask;

      canvas.style.opacity = 0;
      renderTask.promise
        .then(() => {
          canvas.style.transition = "opacity 0.5s";
          canvas.style.opacity = 1;
          renderTaskRef.current = null;
          setOffset({ x: 0, y: 0 }); // Reset pan after zoom
        })
        .catch((err) => {
          if (err?.name === "RenderingCancelledException") return;
          console.error(err);
        });
    });
  };

  const nextPage = () => {
    if (pdfDoc && pageNum < pdfDoc.numPages) {
      const newPage = pageNum + 1;
      setPageNum(newPage);
      renderPage(newPage);
    }
  };

  const prevPage = () => {
    if (pdfDoc && pageNum > 1) {
      const newPage = pageNum - 1;
      setPageNum(newPage);
      renderPage(newPage);
    }
  };

  const zoomIn = () => {
    const newScale = scale + 0.3;
    setScale(newScale);
    renderPage(pageNum, pdfDoc, newScale);
  };

  const zoomOut = () => {
    const newScale = Math.max(scale - 0.3, 0.5);
    setScale(newScale);
    renderPage(pageNum, pdfDoc, newScale);
  };

  // 🧭 Pan handling (only active when zoomed in)
  const handleTouchStart = (e) => {
    if (scale <= 1) return; // allow normal scroll
    e.preventDefault();
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({ x: touch.clientX - offset.x, y: touch.clientY - offset.y });
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const touch = e.touches[0];
    setOffset({
      x: touch.clientX - dragStart.x,
      y: touch.clientY - dragStart.y,
    });
  };

  const handleTouchEnd = () => setIsDragging(false);

  const handleMouseDown = (e) => {
    if (scale <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <div className="bg-[#16202B] min-h-screen text-white flex flex-col items-center py-6 px-3 sm:px-6">
      <h1 className="text-3xl sm:text-4xl font-bold text-secondary mb-6 text-center">
        Family By-Law
      </h1>

      <div
        ref={containerRef}
        className="relative bg-[#1E2A36] p-3 sm:p-4 rounded-xl shadow-lg overflow-hidden max-w-full"
        style={{
          width: "100%",
          maxWidth: "95vw",
          height: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          position: "relative",
          touchAction: scale > 1 ? "none" : "auto", // ✅ allows scroll when zoomed out
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <canvas
          ref={canvasRef}
          className="rounded-md transition-transform duration-200 ease-in-out"
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px)`,
            cursor: scale > 1 ? (isDragging ? "grabbing" : "grab") : "default",
          }}
        />

        {/* Page navigation */}
        <button
          onClick={prevPage}
          className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-secondary text-[#16202B] font-bold px-3 py-2 rounded hover:opacity-80 text-sm sm:text-base"
        >
          ◀
        </button>
        <button
          onClick={nextPage}
          className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-secondary text-[#16202B] font-bold px-3 py-2 rounded hover:opacity-80 text-sm sm:text-base"
        >
          ▶
        </button>
      </div>

      {/* Controls below */}
      <div className="mt-6 flex gap-3 sm:gap-4 flex-wrap justify-center">
        <button
          onClick={zoomOut}
          className="bg-secondary text-[#16202B] px-4 py-2 rounded hover:opacity-80 text-sm sm:text-base"
        >
          Zoom Out
        </button>
        <button
          onClick={zoomIn}
          className="bg-secondary text-[#16202B] px-4 py-2 rounded hover:opacity-80 text-sm sm:text-base"
        >
          Zoom In
        </button>
      </div>

      <p className="mt-4 text-gray-400 text-sm sm:text-base">
        Page {pageNum} of {pdfDoc ? pdfDoc.numPages : "…"}
      </p>
    </div>
  );
}
