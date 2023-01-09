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

import { colorOptions } from "./AllOptions";

//This stuff gets meaty

const MatchScout = () => {
  /*
  We create these state variables
  In summary, state in React.js allows components to re-render when a variable is changed.
  
  These variables work like this, using teamNumber as an example
  The line below this comment creates teamNumber and creates a function to set its value -- setTeamNumber
  setTeamNumber can be called at any time to change teamNumber
  It also sets the initial value of teamNumber to "", by using useState()
  */
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
  const [MatchNo, setMatchNo] = useState("");
  const [name, setName] = useState("");

  const [color, setColor] = useState("");

  const [levelSelected, setlevelSelected] = useState(false);
  const [pieceSelected, setpieceSelected] = useState(false);
  const [autopiece, setautoPiece] = useState(false);
  const [telepiece, settelePiece] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showLookupError, setShowLookupError] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);

  const [timerRunning, setTimerRunning] = useState(false);

  //docRef is a unique id that we will store the match under
  //we will use the default value "initRef", and set the id later.
  const [docRefId, setDocRefId] = useState("initRef");

  //We put all the variables declared previously into an array, this is our full match data
  const buttonStyle = {
    height: "20px",
    position: "bottom",
  };
  const matchData = {
    MatchNo,
    name,
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

  //This function sets everything back to the default values
  const resetForm = () => {
    setMatchNo("");
    setName("");
    setTeamNumber("");
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
    const docRef = doc(db, "match_svr", docRefId);
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

  let climbInterval = null;
  useEffect(() => {
    if (timerRunning) {
      if (!climbInterval)
        climbInterval = setInterval(
          () => setClimbTime((ClimbTime) => ClimbTime + 1),
          1000
        );
    } else {
      clearInterval(climbInterval);
    }
    return () => clearInterval(climbInterval);
  }, [timerRunning]);

  //This function has an array called requiredFields
  //And it checks whether they've been filled out
  //It's empty now, but could be useful in coming years
  const validate = () => {
    const requiredFields = [];
    if (requiredFields.some((f) => f === "")) {
      setShowModal(true);
      return false;
    }
    return true;
  };

  //This saves the data in the form
  //setDocRefId is using a library that generates a unique ID
  //REMEMBER, docRefId being changed triggers the useEffect() function!
  const save = async () => {
    if (!validate()) return;
    setDocRefId(uuidv4());
  };

  /*Search these tags on semantic ui website for info
  Eventually, I'll make these modular and easier to make

  Near the bottom of return() we use a library to generate a qr code containing
  all the form data once you submit it
  This is necessary if we want to transfer data without wifi or with sketchy comp wifi
  */

  const autoLHUp = () => {
    setAutoLH(AutoLH + 1);
  };

  const autoLHDown = () => {
    if (AutoLH === 0) return;
    setAutoLH(AutoLH - 1);
  };

  const autoUHUp = () => {
    setAutoUH(AutoUH + 1);
  };

  const autoUHDown = () => {
    if (AutoUH === 0) return;
    setAutoUH(AutoUH - 1);
  };

  const teleLHUp = () => {
    setTeleopLH(TeleopLH + 1);
  };

  const teleLHDown = () => {
    if (TeleopLH === 0) return;
    setTeleopLH(TeleopLH - 1);
  };

  const teleUHUp = () => {
    setTeleopUH(TeleopUH + 1);
  };

  const teleUHDown = () => {
    if (TeleopUH === 0) return;
    setTeleopUH(TeleopUH - 1);
  };

  const UpDownButtons = ({ upFun, downFun }) => {
    return (
      <Form.Group style={{ flexDirection: "column" }}>
        <Form.Field style={{ alignSelf: "center", margin: 5 }}>
          <Button size="mini" onClick={upFun}>
            <Icon name="chevron up" size="small" />
          </Button>
        </Form.Field>
        <Form.Field style={{ alignSelf: "center" }}>
          <Button size="mini" onClick={downFun}>
            <Icon name="chevron down" size="small" />
          </Button>
        </Form.Field>
      </Form.Group>
    );
  };

  return (
    <Container>
      <Header as="h1" style={{ textAlign: "center", marginTop: "10px" }}>
        Match Scout (Objective)
      </Header>
      <Form style={{ marginTop: 5 }}>
        <Form.Group style={{ margin: 10 }}>
          <Form.Field>
            <label>-Your Initials-</label>
            <Input
              fluid
              size="medium"
              placeholder=""
              value={teamNumber}
              onChange={(e) => setTeamNumber(e.target.value)}
            />
          </Form.Field>

          <Form.Field>
            <label>Match #</label>
            <Input
              fluid
              size="medium"
              placeholder=""
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Field>

          <Form.Field>
            <label>---Team #---</label>
            <Input
              fluid
              size="medium"
              placeholder=""
              value={MatchNo}
              onChange={(e) => setMatchNo(e.target.value)}
            />
          </Form.Field>

          <Form.Field>
            <label>Alliance</label>
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

        <Header style={{ color: "black" }} as="h3">
          Auto
        </Header>
        <Form.Field>
          <Header style={{ color: "black" }} as="h4">
            Piece Scoring:
          </Header>
        </Form.Field>

        <Form.Group>
          <Form.Field>
            <Button
              color="vk"
              style={{ marginDown: "5px", marginTop: "10px" }}
              size="medium"
              fluid
            >
              High
            </Button>
            <Button
              color="black"
              style={{ marginDown: "5px", marginTop: "10px" }}
              size="medium"
              fluid
            >
              Mid
            </Button>
            <Button
              color="black"
              style={{ marginDown: "5px", marginTop: "10px" }}
              size="medium"
              fluid
            >
              Low
            </Button>
          </Form.Field>
          <Form.Field>
            {autopiece ? (
              <Button
                fluid
                size="medium"
                style={{ marginDown: "5px", marginTop: "11px" }}
                color="purple"
                onClick={() => setautoPiece(false)}
              >
                CUBE
              </Button>
            ) : (
              <Button
                fluid
                size="small"
                style={{ marginDown: "5px", marginTop: "11px" }}
                color="yellow"
                onClick={() => setautoPiece(true)}
              >
                CONE
              </Button>
            )}
            <Divider fitted></Divider>
            <Button
              style={{ marginDown: "5px", marginTop: "15px" }}
              fluid
              size="mini"
            >
              Enter?
            </Button>
            <Button
              style={{ marginDown: "5px", marginTop: "15px" }}
              fluid
              size="mini"
            >
              Undo
            </Button>
          </Form.Field>
        </Form.Group>

        <Header style={{ color: "black" }} as="h3">
          Tele/End
        </Header>
        <Header style={{ color: "black" }} as="h4">
          Piece Scoring
        </Header>

        <Form.Group>
          <Form.Field>
            <Button
              color="vk"
              style={{ marginDown: "5px", marginTop: "10px" }}
              size="medium"
              fluid
            >
              High
            </Button>
            <Button
              color="black"
              style={{ marginDown: "5px", marginTop: "10px" }}
              size="medium"
              fluid
            >
              Mid
            </Button>
            <Button
              color="black"
              style={{ marginDown: "5px", marginTop: "10px" }}
              size="medium"
              fluid
            >
              Low
            </Button>
          </Form.Field>
          <Form.Field>
            {telepiece ? (
              <Button
                fluid
                style={{ marginTop: "10px" }}
                size="medium"
                color="purple"
                onClick={() => settelePiece(false)}
              >
                CUBE
              </Button>
            ) : (
              <Button
                fluid
                size="small"
                style={{ marginTop: "10px" }}
                color="yellow"
                onClick={() => settelePiece(true)}
              >
                CONE
              </Button>
            )}
            <Divider fitted></Divider>
            <Button
              style={{ marginDown: "5px", marginTop: "15px" }}
              fluid
              size="mini"
              icon="X"
            >
              Enter?
            </Button>
            <Button
              style={{ marginDown: "5px", marginTop: "15px" }}
              fluid
              size="mini"
              color="google plus"
            >
              Undo
            </Button>
          </Form.Field>
        </Form.Group>
        <Divider></Divider>
        <Form.Group widths="equal">
          <Button
            icon="camera retro"
            type="submit"
            color="green"
            onClick={save}
          >
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
