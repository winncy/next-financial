"use client";
import { Page, Document, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useRef, useState } from "react";
import { useSize } from "ahooks";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const PdfViewer = ({ url, onLoad }: { url: string; onLoad?: () => void }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const divRef = useRef(null);

  const size = useSize(divRef);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    onLoad?.();
    console.log("pdf 加载完成，页数：", numPages);
  };

  return (
    <Document
      file={url}
      onLoadSuccess={onDocumentLoadSuccess}
      className="h-full"
    >
      <div className="flex h-full flex-col overflow-hidden" ref={divRef}>
        <div className="no-scrollbar h-full overflow-y-auto">
          {Array.from(new Array(numPages), (_, i) => (
            <Page
              key={i}
              pageNumber={i + 1}
              // height={size?.height}
              width={size?.width}
            />
          ))}
        </div>
      </div>
    </Document>
  );
};

export default PdfViewer;
