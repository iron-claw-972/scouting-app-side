import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import { Button, Grid } from "semantic-ui-react";

//this over here is what lets us view the Tech Binder as a pdf
//simply replace the pdf in the <Document> tag with this year's Tech Binder

const PdfViewer = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNum, setPageNum] = useState(1);

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

  /*getting the pdf worker, necessary with library
  THIS SHOULD STILL WORK WITH NO WIFI
  IN THE EVENT THAT THE PDF DOESNT LOAD
  YOU WILL NEED TO CONNECT TO WIFI OR DATA FOR 5 SECONDS
  TO DOWNLOAD THIS WORKER*/
  pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  //flicking through pages
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

  //rendering navigation buttons
  const NavButtons = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
      </div>
    );
  };

  //Find the <Document> tag, replace with this year's pdf
  return (
    <div>
      <NavButtons />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Document
          file="2022 Diet Tech Binder (2).pdf"
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page
            pageNumber={pageNum}
            renderAnnotationLayer={false}
            renderTextLayer={false}
          />
        </Document>
      </div>
      <NavButtons />
    </div>
  );
};

export default PdfViewer;
