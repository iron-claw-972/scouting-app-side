import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  Header,
  Button,
  Form,
  Container,
  Modal,
  Message,
} from "semantic-ui-react";

import { getFirestore, collection, addDoc } from "firebase/firestore";

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
  const [programmingLanguage, setProgrammingLanguage] = useState("");
  const [cvCapability, setCvCapability] = useState("");
  const [shooter, setShooter] = useState("");
  const [climb, setClimb] = useState("");
  const [worlds, setWorlds] = useState(false);
  const [auto, setAuto] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const resetForm = () => {
    setTeamName("");
    setTeamNumber("");
    setColor("");
    setWeight("");
    setHeight("");
    setLength("");
    setDriveTrain("");
    setProgrammingLanguage("");
    setCvCapability("");
    setShowError("");
    setClimb("");
    setShooter("");
    setAuto("");
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
    programmingLanguage,
    cvCapability,
    shooter,
    climb,
    auto,
  ]);

  const validate = () => {
    const requiredFields = [teamNumber];
    if (requiredFields.some((f) => f === "")) {
      setShowModal(true);
      return false;
    }
    return true;
  };

  const save = async () => {
    if (!validate()) return;
    const db = getFirestore();
    try {
      const docRef = await addDoc(collection(db, "teams"), {
        teamNumber,
        teamName,
        color,
        weight,
        height,
        length,
        driveTrain,
        programmingLanguage,
        cvCapability,
        highShooter: shooter,
        highClimber: climb,
        auto,
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
      <Header as="h1">Scout or prescout a Team</Header>

      <Message attached header="Add or Edit a Team's data" />
      <Form style={{ marginTop: 10 }}>
        <Form.Group widths="equal">
          <Form.Field>
            <label>Team Name</label>
            <Form.Input
              placeholder="Team Name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label style={{ color: "red" }}>Team Number *</label>
            <input
              placeholder="Team Number"
              value={teamNumber}
              onChange={(e) => setTeamNumber(e.target.value)}
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
          <Form.Field>
            <label>Drive Train</label>
            <Form.Select
              options={driveTrainOptions}
              placeholder="Drive Train"
              value={driveTrain}
              onChange={(e, data) => setDriveTrain(data.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>CV Capabilities</label>
            <Form.Select
              options={cvOptions}
              placeholder="CV Capabilities"
              value={cvCapability}
              onChange={(e, data) => setCvCapability(data.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Auto Capabilities</label>
            <Form.Select
              options={autoOptions}
              placeholder="Auto Capabilities"
              value={auto}
              onChange={(e, data) => setAuto(data.value)}
            />
          </Form.Field>
        </Form.Group>

        <Form.Group>
          <Form.Field>
            <label>Has high Shooter *</label>
            <Form.Select
              options={yesNoOptions}
              placeholder="Has high shooter"
              value={shooter}
              onChange={(e, data) => setShooter(data.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Has high climber *</label>
            <Form.Select
              options={yesNoOptions}
              placeholder="Has high climber"
              value={climb}
              onChange={(e, data) => setClimb(data.value)}
            />
          </Form.Field>{" "}
        </Form.Group>
        <Form.Field>
          <label>Programming Language</label>
          <input
            placeholder="Programming Language"
            value={programmingLanguage}
            onChange={(e) => setProgrammingLanguage(e.target.value)}
          />
        </Form.Field>

        <Button type="submit" onClick={save}>
          Submit
        </Button>
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
    </Container>
  );
};
export default PitScout;
