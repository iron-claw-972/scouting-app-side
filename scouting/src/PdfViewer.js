import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
// import pdf worker as a url, see `next.config.js` and `pdf-worker.js`

const PdfViewer = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNum, setPageNum] = useState(1);

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

  pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  function onUpClick() {
    if (pageNum < numPages) {
      setPageNum(pageNum + 1);
    }
  }

  function onDownClick() {
    if (pageNum > 1) {
      setPageNum(pageNum - 1);
    }
  }
  return (
    <div>
      <button onClick={onDownClick}>prev</button>

      <button onClick={onUpClick}>next</button>

      <Document file="TechBinder.pdf" onLoadSuccess={onDocumentLoadSuccess}>
        <Page
          pageNumber={pageNum}
          renderAnnotationLayer={false}
          renderTextLayer={false}
        />
      </Document>
    </div>
  );
};

export default PdfViewer;
