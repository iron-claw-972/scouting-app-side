import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
// import pdf worker as a url, see `next.config.js` and `pdf-worker.js`

import { Button, Grid } from "semantic-ui-react";

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

  const NavButtons = () => {
    return (
      <Grid columns={2} style={{ margin: "10px" }}>
        <Grid.Row>
          <Grid.Column>
            <Button onClick={onDownClick}>Previous</Button>
          </Grid.Column>
          <Grid.Column>
            <Button onClick={onUpClick}>Next</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  };
  return (
    <div>
      <NavButtons />
      <Document file="TechBinder.pdf" onLoadSuccess={onDocumentLoadSuccess}>
        <Page
          pageNumber={pageNum}
          renderAnnotationLayer={false}
          renderTextLayer={false}
        />
      </Document>
      <NavButtons />
    </div>
  );
};

export default PdfViewer;
