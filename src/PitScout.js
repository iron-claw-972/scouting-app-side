import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import QRCode from "react-qr-code";
import { v4 as uuidv4 } from "uuid";
import Camera, { FACING_MODES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

//Like match scout, this is very meaty
import {
  Header,
  Button,
  Form,
  Container,
  Modal,
  Message,
  Dropdown,
  TextArea,
  Divider,
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
  driveOptions,
  cvOptions,
  autoOptions,
  yesNoOptions,
  abilityOptions,
} from "./AllOptions";

const PitScout = () => {
  /*
  We create these state variables
  In summary, state in React.js allows components to re-render when a variable is changed.
  
  These variables work like this, using teamNumber as an example
  The line below this comment creates teamNumber and creates a function to set its value -- setTeamNumber
  setTeamNumber can be called at any time to change teamNumber
  It also sets the initial value of teamNumber to "", by using useState()
  */

  const [teamNumber, setTeamNumber] = useState("");
  const [gintake, setgintake] = useState(false);
  const [shelfIntake, setShelfIntake] = useState(false);
  const [organization, setOrg] = useState("");
  const [drive, setDrive] = useState("");
  const [ability, setAbility] = useState("");
  const [motors, setMotors] = useState(0);
  const [vision, setVision] = useState(false);
  const [balance, setBalance] = useState(false);

  const [dataUri, setDataUri] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showCamera, setShowCamera] = useState(false);

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);

  //This function sets everything back to the default values
  const resetForm = () => {
    setTeamNumber("");
    setgintake(false);
    setOrg("");
    setDrive("");
    setMotors(0);
    setVision(false);
    setBalance(false);
    setShelfIntake(false);
    setAbility("");
  };

  /*Whenever anything in the array in this function is changed, this function gets called.
  //This basically stops the form from showing suCceSS! or fAilLuRe after the poor scouter
  is fixing their mistake
  */
  useEffect(() => {
    setShowSuccess(false);
    setShowError(false);
  }, [teamNumber, gintake, organization, drive, vision, balance]);

  //We put all the variables declared previously into an array, this is our full team data

  const pitData = {
    teamNumber,
    gintake,
    drive,
    vision,
    balance,
    shelfIntake,
    motors,
    dataUri,
  };

  //checks if we at least filled out team number
  const validate = () => {
    const requiredFields = [teamNumber];
    if (requiredFields.some((f) => f === "")) {
      setShowModal(true);
      return false;
    }
    return true;
  };

  //This is the function for autofill if you've already filled out part of the form
  const lookupTeamIfExists = async () => {
    const db = getFirestore();
    const teamsRef = collection(db, "test-p");
    const q = query(teamsRef, where("teamNumber", "==", teamNumber));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const { teamNumber, scouterName, organization, lang, notes } = doc.data();
      setTeamNumber(teamNumber || "");
      setgintake(gintake || false);
      setOrg(organization || "");
      setDrive(drive || "");
      setVision(vision || false);
    });
  };

  //handling empty form fields on submit
  //after all, the whole form will be hard to fill out
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

  const randomCompliments = [
    "You look great, scouter! Got any beauty tips?",
    "Your hustle is admirable! (feed... me... data..)",
    "Nice fit, scouter!... (im not jealous)",
    "I can't think of a better person to get data from!",
    "If I could pick a human to be instead of scanning qr codes, I'd pick you!",
  ];

  const save = async () => {
    if (!validate()) return;
    setShowQrCode(true);
    const db = getFirestore();
    const docRef = doc(db, "test-p", teamNumber);
    setDoc(docRef, pitData, { merge: true })
      .then(() => {
        setShowSuccess(true);
        //setTimeout(resetForm, 1500);
      })
      .catch((e) => {
        console.error("Error adding document: ", e);
        setShowError(true);
      });
  };

  function handleTakePhoto(dataUri) {
    console.log(dataUri);
    setDataUri(dataUri);
    setShowCamera(false);
  }

  const ButtonGroup = ({ up, down }) => {
    return (
      <Container fluid>
        <Form.Group style={{ flexDirection: "column" }}>
          <Form.Field style={{ alignSelf: "center", margin: 5 }}>
            <Button size="big" color="linkedin" onClick={up}>
              +
            </Button>
          </Form.Field>
          <Form.Field style={{ alignSelf: "center", margin: 5 }}>
            <Button size="big" onClick={down}>
              -
            </Button>
          </Form.Field>
        </Form.Group>
      </Container>
    );
  };

  const motorsUp = () => {
    setMotors(motors + 1);
  };

  const motorsDown = () => {
    if (motors >= 1) {
      setMotors(motors - 1);
    }
  };
  /*Search these tags on semantic ui website for info
  Eventually, I'll make these modular and easier to make

  Near the bottom of return() we use a library to generate a qr code containing
  all the form data once you submit it
  This is necessary if we want to transfer data without wifi or with sketchy comp wifi
  */
  return (
    <body style={{ backgroundColor: "rgb(64,56,58)" }}>
      <Container>
        <Header
          as="h1"
          style={{ textAlign: "center", marginTop: "10px", color: "white" }}
        >
          Pit Scout
        </Header>

        <Form style={{ marginTop: 10 }}>
          <Form.Group width="equal">
            <Form.Field style={{ marginLeft: "10px" }}>
              <label style={{ color: "white" }}>Team Number *</label>
              <input
                placeholder="Team Number"
                value={teamNumber}
                onChange={(e) => setTeamNumber(e.target.value)}
                onBlur={lookupTeamIfExists}
              />
            </Form.Field>

            <Form.Field inline>
              <label style={{ color: "white" }}>Picture</label>
              <Button
                fluid
                icon="camera retro"
                size="medium"
                style={{ marginTop: "5px" }}
                onClick={() => {
                  setShowCamera(true);
                }}
              ></Button>
            </Form.Field>
            <Form.Field>
              <label style={{ color: "white" }}>X camera</label>
              <Button
                icon="undo"
                size="medium"
                style={{ margin: "0px" }}
                onClick={() => {
                  setShowCamera(false);
                }}
              ></Button>
            </Form.Field>
            <Form.Field style={{ marginTop: 10 }}>
              {showCamera ? (
                <Camera
                  sizeFactor={0.4}
                  idealFacingMode={FACING_MODES.ENVIRONMENT}
                  onTakePhoto={(dataUri) => {
                    handleTakePhoto(dataUri);
                  }}
                />
              ) : (
                <label></label>
              )}
            </Form.Field>
          </Form.Group>
          <Divider></Divider>
          <Form.Group style={{ textAlign: "center", margin: "auto" }}>
            <Form.Field>
              {gintake ? (
                <Button
                  size="huge"
                  color="green"
                  fluid
                  onClick={() => setgintake(false)}
                >
                  Ground itke
                </Button>
              ) : (
                <button
                  class="ui inverted huge white button"
                  fluid
                  onClick={() => setgintake(true)}
                >
                  Ground itke
                </button>
              )}
            </Form.Field>

            <Form.Field>
              {vision ? (
                <Button
                  size="huge"
                  fluid
                  color="green"
                  style={{ alignSelf: "right" }}
                  onClick={() => setVision(false)}
                >
                  Vision
                </Button>
              ) : (
                <button
                  class="ui inverted huge white button"
                  fluid
                  style={{ alignSelf: "right" }}
                  onClick={() => setVision(true)}
                >
                  Vision
                </button>
              )}
            </Form.Field>
          </Form.Group>
          <Divider hidden></Divider>
          <Form.Group style={{ textAlign: "center", margin: "auto" }}>
            <Form.Field>
              {shelfIntake ? (
                <Button
                  size="huge"
                  color="green"
                  fluid
                  onClick={() => setShelfIntake(false)}
                >
                  Shelf itke
                </Button>
              ) : (
                <button
                  class="ui inverted huge white button"
                  fluid
                  onClick={() => setShelfIntake(true)}
                >
                  Shelf itke
                </button>
              )}
            </Form.Field>

            <Form.Field>
              {balance ? (
                <Button
                  size="huge"
                  fluid
                  color="green"
                  onClick={() => setBalance(false)}
                >
                  Balance
                </Button>
              ) : (
                <button
                  class="ui inverted huge white button"
                  fluid
                  onClick={() => setBalance(true)}
                >
                  Balance
                </button>
              )}
            </Form.Field>
          </Form.Group>
          <Divider hidden></Divider>
          <Form.Group style={{ margin: "auto" }}>
            <Form.Field width="8">
              <label style={{ color: "white" }}>Drivetrain Type</label>
              <Form.Select
                fluid
                options={driveOptions}
                placeholder="Drivetrain"
                value={drive}
                onChange={(e, data) => setDrive(data.value)}
              />
            </Form.Field>
            <Form.Field width="8">
              <label style={{ color: "white" }}>Abilities</label>
              <Form.Select
                fluid
                options={abilityOptions}
                placeholder="Ability"
                value={ability}
                onChange={(e, data) => setAbility(data.value)}
              />
            </Form.Field>
          </Form.Group>
          <Divider></Divider>
          <Form.Group style={{ margin: "auto" }}>
            <Form.Field style={{ color: "white" }}>
              <Divider hidden />

              <label style={{ color: "white" }}>Motors #</label>
              {motors}
            </Form.Field>

            <Form.Field>
              <ButtonGroup up={motorsUp} down={motorsDown}></ButtonGroup>
            </Form.Field>

            <Button color="instagram" type="submit" onClick={save}>
              Submit / Save
            </Button>
          </Form.Group>
          <div style={{ marginTop: "30px", marginBottom: "10px" }} />
          <Form.Group>
            <Button color="black" type="reset" onClick={lookupTeamIfExists}>
              Undo edits
            </Button>
            <Button type="submit" color="grey" onClick={resetForm}>
              Clear Form
            </Button>
            <Link to="/">
              {" "}
              <Button color="white">Back to Home</Button>
            </Link>
          </Form.Group>
        </Form>

        <Modal
          size="small"
          open={showModal}
          onClose={() => setShowModal(false)}
        >
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
        ></Modal>
      </Container>
    </body>
  );
};
export default PitScout;
