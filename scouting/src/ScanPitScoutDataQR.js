import React, { useState, useEffect } from "react";
import { QrReader } from "@blackbox-vision/react-qr-reader";

import { Header, Container, Message } from "semantic-ui-react";

import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

const ScanPitScoutDataQR = (props) => {
  const [data, setData] = useState("");

  const save = async () => {
    const db = getFirestore();
    const matchData = JSON.parse(data);
    const { docRefId } = matchData;
    const docRef = doc(db, "teams", docRefId);
    setDoc(docRef, matchData, { merge: true });
  };

  useEffect(save, [data]);

  return (
    <Container>
      <Header as="h1">
        Hold the QR code for the Pit Data until you see SUCCESS below. Step
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

export default ScanPitScoutDataQR;
