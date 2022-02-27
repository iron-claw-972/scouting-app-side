import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import QRCode from "react-qr-code";
import { v4 as uuidv4 } from "uuid";

import {
  Header,
  Button,
  Form,
  Container,
  Modal,
  Message,
  TextArea,
} from "semantic-ui-react";

import { getFirestore, doc, setDoc } from "firebase/firestore";

import { colorOptions, hangarOptions } from "./AllOptions";

const MatchScout = () => {
  const [teamNumber, setTeamNumber] = useState("");
  const [teamName, setTeamName] = useState("");
  const [AutoLH, setAutoLH] = useState(0);
  const [AutoUH, setAutoUH] = useState(0);
  const [AutoC, setAutoC] = useState("");
  const [TeleopLH, setTeleopLH] = useState(0);
  const [TeleopUH, setTeleopUH] = useState(0);
  const [TeleopC, setTeleopC] = useState("");
  const [Hangar, setHangar] = useState("");
  const [ClimbTime, setClimbTime] = useState(0);
  const [EndgameC, setEndgameC] = useState("");

  const [color, setColor] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showLookupError, setShowLookupError] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);
  const [docRefId, setDocRefId] = useState("initRef");

  const matchData = {
    AutoLH,
    AutoUH,
    AutoC,
    TeleopLH,
    TeleopUH,
    TeleopC,
    Hangar,
    ClimbTime,
    EndgameC,
    teamName,
    teamNumber,
    color,
    docRefId,
  };

  const resetForm = () => {
    setAutoLH(0);
    setAutoUH(0);
    setAutoC("");
    setTeleopLH(0);
    setTeleopUH(0);
    setTeleopC("");
    setHangar("");
    setClimbTime(0);
    setEndgameC("");
    setTeamName("");
    setColor("");
  };

  useEffect(() => {
    if (docRefId === "initRef") return;
    setShowQrCode(true);
    const db = getFirestore();
    const docRef = doc(db, "match", docRefId);
    setDoc(docRef, matchData, { merge: true })
      .then(() => {
        setShowSuccess(true);
        //setTimeout(resetForm, 1500);
      })
      .catch((e) => {
        console.error("Error adding document: ", e);
        setShowError(true);
      });
  }, [docRefId]);

  const validate = () => {
    const requiredFields = [];
    if (requiredFields.some((f) => f === "")) {
      setShowModal(true);
      return false;
    }
    return true;
  };

  const save = async () => {
    if (!validate()) return;
    setDocRefId(uuidv4());
  };

  return (
    <Container>
      <Header as="h1">Scout a match</Header>
      <Header as="h4">careful... you might miss something</Header>

      <Message attached header="Add Match data" />
      <Form>
        <Form.Group>
          <Form.Field>
            <label>Team Number</label>
            <input
              placeholder="Team Number"
              value={teamNumber}
              onChange={(e) => setTeamNumber(e.target.value)}
            />
          </Form.Field>
        </Form.Group>

        <Form.Group widths="equal">
          <Form.Field>
            <label>Auto Low Hub</label>
            <input
              placeholder="Auto LH"
              value={AutoLH}
              onChange={(e) => setAutoLH(e.target.value)}
              type="number"
            />
          </Form.Field>
          <Form.Field>
            <label>Auto Upper Hub</label>
            <input
              placeholder="Auto UH"
              value={AutoUH}
              onChange={(e) => setAutoUH(e.target.value)}
              type="number"
            />
          </Form.Field>
          <Form.Field>
            <label>Auto Comments</label>
            <TextArea
              placeholder="Auto Comments"
              value={AutoC}
              onChange={(e) => setAutoC(e.target.value)}
            />
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field>
            <label>Teleop Low Hub</label>
            <input
              placeholder="Teleop LH"
              value={TeleopLH}
              onChange={(e) => setTeleopLH(e.target.value)}
              type="number"
            />
          </Form.Field>
          <Form.Field>
            <label>Teleop Upper Hub</label>
            <input
              placeholder="Teleop UH"
              value={TeleopUH}
              onChange={(e) => setTeleopUH(e.target.value)}
              type="number"
            />
          </Form.Field>
          <Form.Field>
            <label>Teleop Comments</label>
            <TextArea
              placeholder="Teleop Comments"
              value={TeleopC}
              onChange={(e) => setTeleopC(e.target.value)}
            />
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field>
            <label>Hangar</label>
            <Form.Select
              options={hangarOptions}
              placeholder="Hangar"
              value={Hangar}
              onChange={(e, data) => setHangar(data.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Climb time</label>
            <input
              placeholder="Climb Time"
              value={ClimbTime}
              onChange={(e) => setClimbTime(e.target.value)}
              type="number"
            />
          </Form.Field>
          <Form.Field>
            <label>Endgame Comments</label>
            <TextArea
              placeholder="Endgame Comments"
              value={EndgameC}
              onChange={(e) => setEndgameC(e.target.value)}
            />
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field>
            <label style={{ color: "red" }}>Alliance Color *</label>
            <Form.Select
              options={colorOptions}
              placeholder="Alliance Color (required)"
              value={color}
              onChange={(e, data) => setColor(data.value)}
            />
          </Form.Field>
        </Form.Group>

        <Form.Group widths="equal">
          <Button type="submit" color="green" onClick={save}>
            Submit
          </Button>
          <Button
            type="submit"
            color="blue"
            onClick={() => {
              setShowQrCode(true);
            }}
          >
            Show QR again
          </Button>
          <Button type="submit" color="red" onClick={resetForm}>
            Clear Form
          </Button>
        </Form.Group>
      </Form>
      <div style={{ marginTop: 20, marginBottom: 30 }}>
        <Link to="/"> Back to Home</Link>
      </div>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header>Some fields are blank</Modal.Header>
        <Modal.Content>
          <p>Please check some fields are not entered</p>
        </Modal.Content>
        <Modal.Actions>
          <Button positive onClick={() => setShowModal(false)}>
            OK
          </Button>
        </Modal.Actions>
      </Modal>
      {showSuccess && <Message success header="Data saved successfully" />}
      {showError && <Message negative header="Unable to save record" />}
      {showLookupError && (
        <Link to="/pitscout">
          <Message
            negative
            header="Team number not found, please add team first - Click Here"
          />
        </Link>
      )}

      <Modal
        open={showQrCode}
        size="fullscreen"
        onClose={() => setShowQrCode(false)}
      >
        <Modal.Content>
          <QRCode value={JSON.stringify(matchData)} />
        </Modal.Content>
      </Modal>
    </Container>
  );
};
export default MatchScout;
