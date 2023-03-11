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
  Divider,
  Icon,
  Input,
} from "semantic-ui-react";

import { getFirestore, doc, setDoc } from "firebase/firestore";

const MatchScoutSubjective = () => {
  const [MatchNo, setMatchNo] = useState("");
  const [name, setName] = useState("");

  const [teamNumber1, setTeamNumber1] = useState("");
  const [teamNumber2, setTeamNumber2] = useState("");
  const [teamNumber3, setTeamNumber3] = useState("");

  const [defense1, setDefense1] = useState("");
  const [defense2, setDefense2] = useState("");
  const [defense3, setDefense3] = useState("");

  const [driverCapacity1, setDriverCapacity1] = useState("");
  const [driverCapacity2, setDriverCapacity2] = useState("");
  const [driverCapacity3, setDriverCapacity3] = useState("");

  const [color, setColor] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showLookupError, setShowLookupError] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);

  //docRef is a unique id that we will store the match under
  //we will use the default value "initRef", and set the id later.
  const [docRefId, setDocRefId] = useState("initRef");

  //This gets called on page load and whenever docRefId changes
  //You can see docRefId in an array at the bottom
  //Anything in that array being changed triggers this function.
  useEffect(() => {
    //Checks if we're trying to save a match
    if (docRefId === "initRef") return;

    //Shows qr code for non-wifi data transfer
    //And then saves into the database
    setShowQrCode(true);
    const db = getFirestore();
    const docRef = doc(db, "test_s", docRefId);
    setDoc(docRef, matchData, { merge: true })
      .then(() => {
        setShowSuccess(true);
      })
      .catch((e) => {
        console.error("Error adding document: ", e);
        setShowError(true);
      });
    resetForm();
  }, [docRefId]);

  //This function has an array called requiredFields
  //And it checks whether they've been filled out
  //It's empty now, but could be useful in coming years
  const validate = () => {
    const requiredFields = [MatchNo, teamNumber1, teamNumber2, teamNumber3];
    if (requiredFields.some((f) => f === "")) {
      setShowModal(true);
      return false;
    }
    return true;
  };

  //This saves the data in the form
  //setDocRefId is using a library that generates a unique ID
  //REMEMBER, docRefId being changed triggers the useEffect() function!
  const save = (asynbility) => {
    if (!validate()) return;
    setDocRefId(String(MatchNo) + String(color));
  };

  const matchData = {
    MatchNo,
    name,
    teamNumber1,
    teamNumber2,
    teamNumber3,
    defense1,
    defense2,
    defense3,
    driverCapacity1,
    driverCapacity2,
    driverCapacity3,
  };

  const resetForm = () => {
    setMatchNo("");
    setName("");
    setTeamNumber1("");
    setTeamNumber2("");
    setTeamNumber3("");
  };

  const randomCompliments = [
    "You look great, scouter! Got any beauty tips?",
    "Your hustle is admirable! (feed... me... data..)",
    "Nice fit, scouter!... (im not jealous)",
    "I can't think of a better person to get data from!",
    "If I could pick a human to be instead of scanning qr codes, I'd pick you!",
  ];

  return (
    <body style={{ backgroundColor: "rgb(64,56,58)" }}>
      <Container>
        <Header
          as="h1"
          style={{ textAlign: "center", marginTop: "10px", color: "white" }}
        >
          Match Scout (Subjective)
        </Header>
        <Form style={{ marginTop: 5 }}>
          <Form.Group style={{ margin: 2 }}>
            <Form.Field>
              <label style={{ color: "white" }}>Your Initials</label>
              <Input
                fluid
                size="medium"
                placeholder=""
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Field>

            <Form.Field>
              <label style={{ color: "white" }}>Match #*</label>
              <Input
                fluid
                size="medium"
                placeholder=""
                value={MatchNo}
                onChange={(e) => setMatchNo(e.target.value)}
              />
            </Form.Field>

            <Form.Field>
              <label style={{ color: "white" }}>Alliance</label>
              {color ? (
                <Button
                  fluid
                  size="small"
                  margin="4px"
                  color="blue"
                  onClick={() => setColor(false)}
                >
                  Blue
                </Button>
              ) : (
                <Button
                  fluid
                  size="small"
                  margin="4px"
                  color="red"
                  onClick={() => setColor(true)}
                >
                  Red
                </Button>
              )}
            </Form.Field>
          </Form.Group>

          <Divider></Divider>

          <Form.Group>
            <Form.Field style={{ margin: "10px", marginTop: "0px" }}>
              <label style={{ color: "white" }}>Team 1 #*</label>
              <Input
                fluid
                size="medium"
                style={{ minWidth: "65px" }}
                placeholder=""
                value={teamNumber1}
                onChange={(e) => setTeamNumber1(e.target.value)}
              />
            </Form.Field>
            <Form.Group>
              <Form.Field style={{ marginLeft: "10px" }}>
                <label style={{ color: "white" }}>Defense</label>
                <Form.TextArea
                  style={{ width: "150px" }}
                  onChange={(e) => setDefense1(e.target.value)}
                ></Form.TextArea>
              </Form.Field>
              <Form.Field>
                <label style={{ color: "white" }}>
                  Driver Capability (LINKS)
                </label>
                <Form.TextArea
                  style={{ width: "150px" }}
                  onChange={(e) => setDriverCapacity1(e.target.value)}
                ></Form.TextArea>
              </Form.Field>
            </Form.Group>
          </Form.Group>

          <Divider></Divider>

          <Form.Group>
            <Form.Field style={{ margin: "10px", marginTop: "0px" }}>
              <label style={{ color: "white" }}>Team 2 #*</label>
              <Input
                fluid
                size="medium"
                style={{ minWidth: "65px" }}
                placeholder=""
                value={teamNumber2}
                onChange={(e) => setTeamNumber2(e.target.value)}
              />
            </Form.Field>
            <Form.Group>
              <Form.Field style={{ marginLeft: "10px" }}>
                <label style={{ color: "white" }}>Defense</label>
                <Form.TextArea
                  style={{ width: "150px" }}
                  onChange={(e) => setDefense2(e.target.value)}
                ></Form.TextArea>
              </Form.Field>
              <Form.Field>
                <label style={{ color: "white" }}>
                  Driver Capability (LINKS)
                </label>
                <Form.TextArea
                  style={{ width: "150px" }}
                  onChange={(e) => setDriverCapacity2(e.target.value)}
                ></Form.TextArea>
              </Form.Field>
            </Form.Group>
          </Form.Group>

          <Divider></Divider>

          <Form.Group>
            <Form.Field style={{ margin: "10px", marginTop: "0px" }}>
              <label style={{ color: "white" }}>Team 3 #*</label>
              <Input
                fluid
                size="medium"
                style={{ minWidth: "65px" }}
                placeholder=""
                value={teamNumber3}
                onChange={(e) => setTeamNumber3(e.target.value)}
              />
            </Form.Field>
            <Form.Group>
              <Form.Field style={{ marginLeft: "10px" }}>
                <label style={{ color: "white" }}>Defense</label>
                <Form.TextArea
                  style={{ width: "150px" }}
                  onChange={(e) => setDefense3(e.target.value)}
                ></Form.TextArea>
              </Form.Field>
              <Form.Field>
                <label style={{ color: "white" }}>
                  Driver Capability (LINKS)
                </label>
                <Form.TextArea
                  style={{ width: "150px" }}
                  onChange={(e) => setDriverCapacity3(e.target.value)}
                ></Form.TextArea>
              </Form.Field>
            </Form.Group>
          </Form.Group>

          <Divider></Divider>

          <Form.Group widths="equal">
            <Button color="instagram" type="submit" onClick={save}>
              Submit / Save
            </Button>
            <Link to="/">
              {" "}
              <Button color="white">Back to Home</Button>
            </Link>
          </Form.Group>
        </Form>
        <Modal open={showModal} onClose={() => setShowModal(false)}>
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
            <h3 style={{ margin: "0px" }}>
              Thank you for submitting! Here's a compliment:
            </h3>
            <h4 style={{ margin: "0px", color: "rgb(105,105,105)" }}>
              {
                randomCompliments[
                  Math.floor(Math.random() * randomCompliments.length)
                ]
              }
            </h4>
          </Modal.Content>
        </Modal>
      </Container>
    </body>
  );
};
export default MatchScoutSubjective;
