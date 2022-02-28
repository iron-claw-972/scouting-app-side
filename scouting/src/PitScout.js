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
  Dropdown,
  TextArea,
} from "semantic-ui-react";
import {
  getFirestore,
  setDoc,
  doc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";

import {
  colorOptions,
  driveTrainOptions,
  cvOptions,
  autoOptions,
  yesNoOptions,
} from "./AllOptions";

const PitScout = () => {
  const [teamName, setTeamName] = useState("");
  const [teamNumber, setTeamNumber] = useState("");
  const [color, setColor] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [length, setLength] = useState("");
  const [driveTrain, setDriveTrain] = useState("");
  const [cvCapability, setCvCapability] = useState("");
  const [shooter, setShooter] = useState("");
  const [worlds, setWorlds] = useState("");
  const [pastFocuses, setPastFocuses] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);
  const [docRefId, setDocRefId] = useState("initRef");

  // by default resets everything, except team number
  const resetForm = () => {
    setTeamName("");
    setColor("");
    setWeight("");
    setHeight("");
    setLength("");
    setDriveTrain("");
    setCvCapability("");
    setShowError("");
    setWorlds("");
    setPastFocuses("");
  };

  useEffect(() => {
    setShowSuccess(false);
    setShowError(false);
  }, [
    teamNumber,
    teamName,
    color,
    weight,
    height,
    length,
    driveTrain,
    cvCapability,
    worlds,
    pastFocuses,
  ]);
  const pitData = {
    teamNumber,
    teamName,
    color,
    weight,
    height,
    length,
    driveTrain,
    cvCapability,
    worlds,
    pastFocuses,
    docRefId,
  };
  useEffect(() => {
    if (docRefId === "initRef") return;
    setShowQrCode(true);
    const db = getFirestore();
    const docRef = doc(db, "teams", docRefId);
    setDoc(docRef, pitData, { merge: true })
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
    const requiredFields = [teamNumber];
    if (requiredFields.some((f) => f === "")) {
      setShowModal(true);
      return false;
    }
    return true;
  };

  const lookupTeamIfExists = async () => {
    const db = getFirestore();
    const teamsRef = collection(db, "teams");
    const q = query(teamsRef, where("teamNumber", "==", teamNumber));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const {
        teamName,
        color,
        weight,
        height,
        length,
        driveTrain,
        cvCapability,
        worlds,
        pastFocuses,
      } = doc.data();
      setTeamName(teamName || "");
      setColor(color || "");
      setWeight(weight || "");
      setHeight(height || "");
      setLength(length || "");
      setDriveTrain(driveTrain || "");
      setCvCapability(cvCapability || "");
      setWorlds(worlds || "");
      setPastFocuses(pastFocuses || "");
    });
  };

  const truncateEmptyProperties = (obj) => {
    const keysToKeep = Object.keys(obj).filter((key) => {
      return obj[key].length > 0;
    });
    const newObj = {};
    keysToKeep.forEach((key) => {
      newObj[key] = obj[key];
    });
    return newObj;
  };

  const save = async () => {
    if (!validate()) return;
    setDocRefId(uuidv4());
  };
  return (
    <Container>
      <Header as="h1">Scout or prescout a Team</Header>
      <Header as="h4">In the enemy lair...</Header>

      <Message attached header="Add or Edit a Team's data" />
      <Form style={{ marginTop: 10 }}>
        <Form.Group widths="equal">
          <Form.Field>
            <label style={{ color: "red" }}>Team Number *</label>
            <input
              placeholder="Team Number"
              value={teamNumber}
              onChange={(e) => setTeamNumber(e.target.value)}
              onBlur={lookupTeamIfExists}
            />
          </Form.Field>
          <Form.Field>
            <label>Team Name</label>
            <Form.Input
              placeholder="Team Name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field>
            <label>Weight (lb)</label>
            <input
              placeholder="Weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Height</label>
            <input
              placeholder="Height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Length</label>
            <input
              placeholder="Length"
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
          </Form.Field>{" "}
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field
            style={{
              border: "1px solid rgba(0, 0, 0, 0.1)",
              borderRadius: "5px",
            }}
          >
            <label>Drive Train</label>
            <Dropdown
              options={driveTrainOptions}
              placeholder="Drive Train"
              value={driveTrain}
              onChange={(e, data) => setDriveTrain(data.value)}
            />
          </Form.Field>
          <Form.Field
            style={{
              border: "1px solid rgba(0, 0, 0, 0.1)",
              borderRadius: "5px",
            }}
          >
            <label>CV Capabilities</label>
            <Dropdown
              options={cvOptions}
              placeholder="CV Capabilities"
              value={cvCapability}
              onChange={(e, data) => setCvCapability(data.value)}
            />
          </Form.Field>
        </Form.Group>
        <Form.Field
          style={{
            border: "1px solid rgba(0, 0, 0, 0.1)",
            borderRadius: "5px",
          }}
        >
          <label>Been to Worlds?</label>
          <Dropdown
            options={yesNoOptions}
            placeholder=""
            value={worlds}
            onChange={(e, data) => setWorlds(data.value)}
          />
        </Form.Field>{" "}
        <Form.Field>
          <label>Past Focuses</label>
          <TextArea
            placeholder="Past Focuses"
            value={pastFocuses}
            onChange={(e) => setPastFocuses(e.target.value)}
          />
        </Form.Field>
        <Form.Group>
          <Button color="green" type="submit" onClick={save}>
            Submit / Save
          </Button>
        </Form.Group>
        <div style={{ marginTop: "30px", marginBottom: "10px" }} />
        <Form.Group>
          <Button color="red" type="reset" onClick={lookupTeamIfExists}>
            Undo edits
          </Button>
          <Button type="submit" color="red" onClick={resetForm}>
            Clear Form
          </Button>
        </Form.Group>
      </Form>
      <div style={{ marginTop: 20, marginBottom: 20 }}>
        <Link to="/"> Back to Home</Link>
      </div>
      <Modal size="small" open={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header>Some fields are blank</Modal.Header>
        <Modal.Content>
          <p>Please check some required fields with (*) are not entered</p>
        </Modal.Content>
        <Modal.Actions>
          <Button positive onClick={() => setShowModal(false)}>
            OK
          </Button>
        </Modal.Actions>
      </Modal>
      {showSuccess && <Message success header="Data saved successfully" />}
      {showError && <Message negative header="Unable to save record" />}
      <Modal
        open={showQrCode}
        size="fullscreen"
        onClose={() => setShowQrCode(false)}
      >
        <Modal.Content>
          <QRCode value={JSON.stringify(pitData)} />
        </Modal.Content>
      </Modal>
    </Container>
  );
};
export default PitScout;
