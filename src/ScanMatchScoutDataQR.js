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

//Scan the match data qr code that was generated in the form

const ScanMatchScoutDataQR = (props) => {
  //see MatchScout.js or PitScout.js for state explanation
  const [data, setData] = useState("");

  //this saves the data to database
  const save = async () => {
    const db = getFirestore();
    const matchData = JSON.parse(data);
    const docRefId = matchData.teamNumber + "_" + matchData.MatchNo;
    console.log(matchData);
    const docRef = doc(db, "test", docRefId);
    setDoc(docRef, matchData, { merge: true });
  };

  //when data is changed (the qr code is scanned), the function save() is called on it
  useEffect(save, [data]);

  //:)
  const randomCompliments = [
    "You look great, scouter! Got any beauty tips?",
    "Your hustle is admirable! (feed... me... data..)",
    "Nice fit, scouter!... (im not jealous)",
    "I can't think of a better person to get data from!",
    "If I could pick a human to be instead of scanning qr codes, I'd pick you!",
  ];
  return (
    <Container>
      <Header as="h1">Scan the Match Data</Header>
      <Header as="h2">
        Hold the QR code for the Match Data until you see SUCCESS below. Step
        closer.
      </Header>
      <Header as="h4">
        {
          randomCompliments[
            Math.floor(Math.random() * randomCompliments.length)
          ]
        }
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
