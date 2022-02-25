import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  Header,
  Button,
  Form,
  Container,
  Modal,
  Message,
  Label,
  Placeholder,
  Divider,
  TextArea,
} from "semantic-ui-react";

import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
} from "firebase/firestore";

import {
  colorOptions,
  driveTrainOptions,
  cvOptions,
  autoOptions,
  yesNoOptions,
} from "./AllOptions";

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
    setShowSuccess(false);
    setShowError(false);
    setShowLookupError(false);
  }, [teamNumber]);

  const validate = () => {
    const requiredFields = [];
    if (requiredFields.some((f) => f === "")) {
      setShowModal(true);
      return false;
    }
    return true;
  };

  const lookupTeam = async () => {
    const db = getFirestore();
    const docRef = doc(db, "teams", teamNumber);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const { teamName, climb, AutoLH, AutoUH, AutoC } = docSnap.data();
        setTeamName(teamName);
        setAutoLH(AutoLH || 0);
        setAutoUH(AutoUH || 0);
        setAutoC(AutoC || "");
        setTeleopLH(TeleopLH || 0);
        setTeleopUH(TeleopUH || 0);
        setTeleopC(TeleopC || "");
        setHangar(Hangar || 0);
        setClimbTime(ClimbTime || 0);
        setEndgameC(EndgameC || "");
      } else {
        setShowLookupError(true);
        resetForm();
      }
    } catch (e) {
      console.error(e);
      setShowLookupError(true);
    }
  };

  const save = async () => {
    if (!validate()) return;
    const db = getFirestore();
    try {
      const docRef = await addDoc(collection(db, "match"), {
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
      });
      console.log("Document written with ID: ", docRef.id);
      setShowSuccess(true);
      setTimeout(resetForm, 1500);
    } catch (e) {
      console.error("Error adding document: ", e);
      setShowError(true);
    }
  };

  return (
    <Container>
      <Header as="h1">Scout a match</Header>

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
          <Form.Field style={{ alignSelf: "flex-end" }}>
            <Button color="blue" onClick={lookupTeam}>
              Lookup Team by number
            </Button>
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field>
            <label>Team Name</label>
            {teamName && <Label>{teamName}</Label>}
            {teamName.length === 0 && (
              <Placeholder>
                <Placeholder.Paragraph>
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder.Paragraph>
              </Placeholder>
            )}
          </Form.Field>
        </Form.Group>
        <Divider horizontal>
          <Header as="h4">Add Match data below</Header>
        </Divider>
        <Form.Group widths="equal">
          <Form.Field>
            <label>Auto Low Hub</label>
            <input
              placeholder="Auto LH"
              value={AutoLH}
              onChange={(e) => setAutoLH(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Auto Upper Hub</label>
            <input
              placeholder="Auto UH"
              value={AutoUH}
              onChange={(e) => setAutoUH(e.target.value)}
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
            />
          </Form.Field>
          <Form.Field>
            <label>Teleop Upper Hub</label>
            <input
              placeholder="Teleop UH"
              value={TeleopUH}
              onChange={(e) => setTeleopUH(e.target.value)}
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
            <label>Hangar Points</label>
            <TextArea
              placeholder="Hangar"
              value={Hangar}
              onChange={(e) => setHangar(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Climb time</label>
            <input
              placeholder="Climb Time"
              value={ClimbTime}
              onChange={(e) => setClimbTime(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Endgame Comments</label>
            <TextArea
              placeholder="Endgame Comments"
              value={TeleopC}
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

        <Button type="submit" color="green" onClick={save}>
          Submit
        </Button>
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
    </Container>
  );
};
export default MatchScout;
