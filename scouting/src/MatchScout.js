import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  Header,
  Button,
  Checkbox,
  Form,
  Container,
  Modal,
} from "semantic-ui-react";

import { getFirestore, collection, addDoc } from "firebase/firestore";

const options = [
  { key: "r", text: "Red", value: "red" },
  { key: "b", text: "Blue", value: "blue" },
];
const MatchScout = () => {
  const [eventKey, setEventKey] = useState(null);
  const [matchKey, setMatchKey] = useState(null);
  const [teamName, setTeamName] = useState(null);
  const [teamNumber, setTeamNumber] = useState(null);
  const [color, setColor] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const validate = () => {
    if (
      eventKey == null ||
      matchKey == null ||
      teamNumber == null ||
      teamName == null ||
      color == null
    ) {
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
        eventKey,
        matchKey,
        teamName,
        teamNumber,
        color,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  return (
    <Container>
      <Header as="h1">Scout a match</Header>
      <Form>
        <Form.Field>
          <label>Event Key</label>
          <input
            placeholder="Event Key"
            value={eventKey}
            onChange={(e) => setEventKey(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Match Key</label>
          <input
            placeholder="Match Key"
            value={matchKey}
            onChange={(e) => setMatchKey(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Team Name</label>
          <input
            placeholder="Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Team Number</label>
          <input
            placeholder="Team Number"
            value={teamNumber}
            onChange={(e) => setTeamNumber(e.target.value)}
          />
        </Form.Field>
        <Form.Select
          options={options}
          placeholder="Alliance Color"
          value={color}
          onChange={(e, data) => setColor(data.value)}
        />
        <Button type="submit" onClick={save}>
          Submit
        </Button>
      </Form>
      <div style={{ marginTop: 20 }}>
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
    </Container>
  );
};
export default MatchScout;
