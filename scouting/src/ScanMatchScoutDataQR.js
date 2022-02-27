import React, { useState, useEffect } from "react";
import { QrReader } from "@blackbox-vision/react-qr-reader";

import { Header, Container, Message } from "semantic-ui-react";

import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
} from "firebase/firestore";

const ScanMatchScoutDataQR = (props) => {
  const [data, setData] = useState("");

  const save = async () => {
    const db = getFirestore();
    addDoc(collection(db, "match"), JSON.parse(data))
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        //setTimeout(resetForm, 1500);
      })
      .catch((e) => {
        console.error("Error adding document: ", e);
      });
  };

  useEffect(save, [data]);

  return (
    <Container>
      <Header as="h1">
        Hold the QR code for the Match Data until you see SUCCESS below. Step
        closer.
      </Header>
      {data.length == 0 && (
        <QrReader
          onResult={(result, error) => {
            if (!!result) {
              setData(result.text);
            }

            if (!!error) {
              console.error(error);
            }
          }}
          style={{ width: "100%" }}
        />
      )}
      <p>{data}</p>
      {data.length > 0 && <Message info> SAVED SUCCESFULLY!</Message>}
    </Container>
  );
};

export default ScanMatchScoutDataQR;
