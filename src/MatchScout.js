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
import { truncate } from "lodash";

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
  const [mode, setMode] = useState(true);

  const [AutoLH, setAutoLH] = useState(0);
  const [AutoUH, setAutoUH] = useState(0);

  const [AutoCLR, setAutoCLR] = useState(0);
  const [AutoCMR, setAutoCMR] = useState(0);
  const [AutoCHR, setAutoCHR] = useState(0);
  const [TeleCLR, setTeleCLR] = useState(0);
  const [TeleCMR, setTeleCMR] = useState(0);
  const [TeleCHR, setTeleCHR] = useState(0);

  const [AutoULR, setAutoULR] = useState(0);
  const [AutoUMR, setAutoUMR] = useState(0);
  const [AutoUHR, setAutoUHR] = useState(0);
  const [TeleULR, setTeleULR] = useState(0);
  const [TeleUMR, setTeleUMR] = useState(0);
  const [TeleUHR, setTeleUHR] = useState(0);

  const [AutoLRSelected, setAutoLRSelected] = useState(false);
  const [AutoMRSelected, setAutoMRSelected] = useState(false);
  const [AutoHRSelected, setAutoHRSelected] = useState(false);

  const [TeleHRSelected, setTeleHRSelected] = useState(false);
  const [TeleMRSelected, setTeleMRSelected] = useState(false);
  const [TeleLRSelected, setTeleLRSelected] = useState(false);

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

  const [docked, setDocked] = useState("");
  const [engaged, setEngaged] = useState("");

  const [autolevelSelected, setautolevelSelected] = useState(false);
  const [telelevelSelected, settelelevelSelected] = useState(false);
  const [autopiece, setautoPiece] = useState(false);
  const [telepiece, settelePiece] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showLookupError, setShowLookupError] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);

  const [timerRunning, setTimerRunning] = useState(false);

  const [groundIntakes, setGroundIntakes] = useState(0);

  const [cubeButton, setCubeButton] = useState(true);
  const [coneButton, setConeButton] = useState(false);

  const [autoHighCubeCount, setAutoHighCubeCount] = useState(0);
  const [autoMidCubeCount, setAutoMidCubeCount] = useState(0);
  const [autoLowCubeCount, setAutoLowCubeCount] = useState(0);

  const [autoHighConeCount, setAutoHighConeCount] = useState(0);
  const [autoMidConeCount, setAutoMidConeCount] = useState(0);
  const [autoLowConeCount, setAutoLowConeCount] = useState(0);

  const [teleHighCubeCount, setTeleHighCubeCount] = useState(0);
  const [teleMidCubeCount, setTeleMidCubeCount] = useState(0);
  const [teleLowCubeCount, setTeleLowCubeCount] = useState(0);

  const [teleHighConeCount, setTeleHighConeCount] = useState(0);
  const [teleMidConeCount, setTeleMidConeCount] = useState(0);
  const [teleLowConeCount, setTeleLowConeCount] = useState(0);
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
    docked,
    engaged,
    groundIntakes,
    autoHighCubeCount,
    autoMidCubeCount,
    autoLowCubeCount,
    autoHighConeCount,
    autoMidConeCount,
    autoLowConeCount,
    teleHighCubeCount,
    teleMidCubeCount,
    teleLowCubeCount,
    teleHighConeCount,
    teleMidConeCount,
    teleLowConeCount
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
    setGroundIntakes(0);
    setDocked(false);
    setEngaged(false);
    setautoPiece(false);
    settelePiece(false);
    setAutoLRSelected(false);
    setAutoMRSelected(false);
    setAutoHRSelected(false);
    setautolevelSelected(false);
    setTeleLRSelected(false);
    setTeleMRSelected(false);
    setTeleHRSelected(false);
    settelelevelSelected(false);
    setMode(true);
    setCubeButton(true);
    setConeButton(false);
    setAutoHighCubeCount(0);
    setAutoMidCubeCount(0);
    setAutoLowCubeCount(0);
    setAutoHighConeCount(0);
    setAutoMidConeCount(0);
    setAutoLowConeCount(0);
    setTeleHighCubeCount(0);
    setTeleMidCubeCount(0);
    setTeleLowCubeCount(0);
    setTeleHighConeCount(0);
    setTeleMidConeCount(0);
    setTeleLowConeCount(0);
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
    const requiredFields = [MatchNo, teamNumber];
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

  const randomCompliments = [
    "You look great, scouter! Got any beauty tips?",
    "Your hustle is admirable! (feed... me... data..)",
    "Nice fit, scouter!... (im not jealous)",
    "I can't think of a better person to get data from!",
    "If I could pick a human to be instead of scanning qr codes, I'd pick you!",
  ];

  /*Search these tags on semantic ui website for info
 Eventually, I'll make these modular and easier to make

 Near the bottom of return() we use a library to generate a qr code containing
 all the form data once you submit it
 This is necessary if we want to transfer data without wifi or with sketchy comp wifi
 */

  const autoLRClick = () => {
    setAutoLRSelected(true);
    setAutoMRSelected(false);
    setAutoHRSelected(false);
    setautolevelSelected(true);
  };

  const autoMRClick = () => {
    setAutoLRSelected(false);
    setAutoMRSelected(true);
    setAutoHRSelected(false);
    setautolevelSelected(true);
  };

  const autoHRClick = () => {
    setAutoLRSelected(false);
    setAutoMRSelected(false);
    setAutoHRSelected(true);
    setautolevelSelected(true);
  };
  const teleLRClick = () => {
    setTeleLRSelected(true);
    setTeleMRSelected(false);
    setTeleHRSelected(false);
    settelelevelSelected(true);
  };

  const teleMRClick = () => {
    setTeleLRSelected(false);
    setTeleMRSelected(true);
    setTeleHRSelected(false);
    settelelevelSelected(true);
  };

  const teleHRClick = () => {
    setTeleLRSelected(false);
    setTeleMRSelected(false);
    setTeleHRSelected(true);
    settelelevelSelected(true);
  };

  const AutoHighUp = () => {
    if (cubeButton) {
      setAutoHighCubeCount(autoHighCubeCount + 1);
    }
    if (coneButton) {
      setAutoHighConeCount(autoHighConeCount + 1);
    }
  };
  const AutoHighDown = () => {
    if (cubeButton) {
      if (autoHighCubeCount > -9) {
        setAutoHighCubeCount(autoHighCubeCount - 1);
      }
    }
    if (coneButton) {
      if (autoHighConeCount > -9) {
        setAutoHighConeCount(autoHighConeCount - 1);
      }
    }
  };

  const AutoMidUp = () => {
    if (cubeButton) {
      setAutoMidCubeCount(autoMidCubeCount + 1);
    }
    if (coneButton) {
      setAutoMidConeCount(autoMidConeCount + 1);
    }
  };
  const AutoMidDown = () => {
    if (cubeButton) {
      if (autoMidCubeCount > -9) {
        setAutoMidCubeCount(autoMidCubeCount - 1);
      }
    }
    if (coneButton) {
      if (autoMidConeCount > -9) {
        setAutoMidConeCount(autoMidConeCount - 1);
      }
    }
  };

  const AutoLowUp = () => {
    if (cubeButton) {
      setAutoLowCubeCount(autoLowCubeCount + 1);
    }
    if (coneButton) {
      setAutoLowConeCount(autoLowConeCount + 1);
    }
  };
  const AutoLowDown = () => {
    if (cubeButton) {
      if (autoLowCubeCount > -9) {
        setAutoLowCubeCount(autoLowCubeCount - 1);
      }
    }
    if (coneButton) {
      if (autoLowConeCount > -9) {
        setAutoLowConeCount(autoLowConeCount - 1);
      }
    }
  };

  const TeleHighUp = () => {
    if (cubeButton) {
      setTeleHighCubeCount(teleHighCubeCount + 1);
    }
    if (coneButton) {
      setTeleHighConeCount(teleHighConeCount + 1);
    }
  };
  const TeleHighDown = () => {
    if (cubeButton) {
      if (teleHighCubeCount > -9) {
        setTeleHighCubeCount(teleHighCubeCount - 1);
      }
    }
    if (coneButton) {
      if (teleHighConeCount > -9) {
        setTeleHighConeCount(teleHighConeCount - 1);
      }
    }
  };

  const TeleMidUp = () => {
    if (cubeButton) {
      setTeleMidCubeCount(teleMidCubeCount + 1);
    }
    if (coneButton) {
      setTeleMidConeCount(teleMidConeCount + 1);
    }
  };
  const TeleMidDown = () => {
    if (cubeButton) {
      if (teleMidCubeCount > -9) {
        setTeleMidCubeCount(teleMidCubeCount - 1);
      }
    }
    if (coneButton) {
      if (teleMidConeCount > -9) {
        setTeleMidConeCount(teleMidConeCount - 1);
      }
    }
  };

  const TeleLowUp = () => {
    if (cubeButton) {
      setTeleLowCubeCount(teleLowCubeCount + 1);
    }
    if (coneButton) {
      setTeleLowConeCount(teleLowConeCount + 1);
    }
  };
  const TeleLowDown = () => {
    if (cubeButton) {
      if (teleLowCubeCount > -9) {
        setTeleLowCubeCount(teleLowCubeCount - 1);
      }
    }
    if (coneButton) {
      if (teleLowConeCount > -9) {
        setTeleLowConeCount(teleLowConeCount - 1);
      }
    }
  };

  const CubeCone = () => {
    if (cubeButton) {
      setConeButton(true);
      setCubeButton(false);
    }
    if (coneButton) {
      setConeButton(false);
      setCubeButton(true);
    }
  };

  const teleUHDown = () => {
    if (TeleopUH === 0) return;
    setTeleopUH(TeleopUH - 1);
  };

  const groundIntakesUp = () => {
    setGroundIntakes(groundIntakes + 1);
  };

  const groundIntakesDown = () => {
    if (groundIntakes > 0) {
      setGroundIntakes(groundIntakes - 1);
    }
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

  const HighEnterRemoveButtons = ({ enter, remove }) => {
    return (
      <Container>
        <Button
          icon="chevron up"
          size="mini"
          style={{ margin: "0px" }}
          onClick={enter}
        ></Button>
        <Button
          icon="chevron down"
          size="mini"
          style={{ margin: "0px", marginLeft: "5px" }}
          onClick={remove}
        ></Button>
      </Container>
    );
  };

  const MidEnterRemoveButtons = ({ enter, remove }) => {
    return (
      <Container>
        <Button
          icon="chevron up"
          size="mini"
          style={{ margin: "0px" }}
          onClick={enter}
        ></Button>
        <Button
          icon="chevron down"
          size="mini"
          style={{ margin: "0px", marginLeft: "5px" }}
          onClick={remove}
        ></Button>
      </Container>
    );
  };

  const LowEnterRemoveButtons = ({ enter, remove }) => {
    return (
      <Container>
        <Button
          icon="chevron up"
          size="mini"
          style={{ margin: "0px" }}
          onClick={enter}
        ></Button>
        <Button
          icon="chevron down"
          size="mini"
          style={{ margin: "0px", marginLeft: "5px" }}
          onClick={remove}
        ></Button>
      </Container>
    );
  };

  return (
    <body style={{ backgroundColor: "rgb(64,56,58)" }}>
      <Container>
        <Header
          as="h1"
          style={{ textAlign: "center", marginTop: "10px", color: "white" }}
        >
          Match Scout (Objective)
        </Header>
        <Form style={{ marginTop: 5 }}>
          <Form.Group style={{ margin: 10 }}>
            <Form.Field>
              <label style={{ color: "white" }}>-Your Initials-</label>
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
              <label style={{ color: "white" }}>---Team #*---</label>
              <Input
                fluid
                size="medium"
                placeholder=""
                value={teamNumber}
                onChange={(e) => setTeamNumber(e.target.value)}
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
          {mode ? (
            <Container>
              <Header style={{ color: "white" }} as="h3">
                Auto
              </Header>
              <Form.Field>
                <Header style={{ color: "white" }} as="h4">
                  Piece Scoring:
                </Header>
              </Form.Field>

              <Form.Field>
                {cubeButton ? (
                  <Button
                    size="small"
                    style={{
                      marginDown: "5px",
                      marginTop: "11px",
                      marginLeft: "52px",
                    }}
                    color="purple"
                    onClick={CubeCone}
                  >
                    CUBE
                  </Button>
                ) : (
                  <button
                    class="ui inverted small purple button"
                    style={{
                      marginDown: "5px",
                      marginTop: "11px",
                      marginLeft: "52px",
                    }}
                    onClick={CubeCone}
                  >
                    CUBE
                  </button>
                )}
                {coneButton ? (
                  <Button
                    size="small"
                    style={{
                      marginDown: "5px",
                      marginTop: "11px",
                      marginLeft: "3px",
                    }}
                    color="yellow"
                    onClick={CubeCone}
                  >
                    CONE
                  </Button>
                ) : (
                  <button
                    class="ui inverted small yellow button"
                    style={{
                      marginDown: "5px",
                      marginTop: "11px",
                      marginLeft: "3px",
                    }}
                    onClick={CubeCone}
                  >
                    CONE
                  </button>
                )}
              </Form.Field>

              <Form.Group>
                <Form.Field>
                  <label
                    style={{
                      color: "white",
                      fontSize: "20px",
                      marginTop: "5px",
                    }}
                  >
                    High
                  </label>
                  <label
                    style={{
                      color: "white",
                      fontSize: "20px",
                      marginTop: "29px",
                    }}
                  >
                    Mid
                  </label>
                  <label
                    style={{
                      color: "white",
                      fontSize: "20px",
                      marginTop: "25px",
                    }}
                  >
                    Low
                  </label>
                </Form.Field>
                <Form.Group style={{ marginTop: "7px", marginLeft: "28px" }}>
                  <Form.Field>
                    <label style={{ color: "white" }}>
                      {autoHighCubeCount}
                    </label>
                    <Divider hidden style={{ marginBottom: "12px" }}></Divider>
                    <label style={{ color: "white" }}>{autoMidCubeCount}</label>
                    <Divider hidden style={{ marginBottom: "10px" }}></Divider>
                    <label style={{ color: "white" }}>{autoLowCubeCount}</label>
                  </Form.Field>
                  <Form.Field style={{ marginLeft: "59px" }}>
                    <label style={{ color: "white" }}>
                      {autoHighConeCount}
                    </label>
                    <Divider hidden style={{ marginBottom: "12px" }}></Divider>
                    <label style={{ color: "white" }}>{autoMidConeCount}</label>
                    <Divider hidden style={{ marginBottom: "10px" }}></Divider>
                    <label style={{ color: "white" }}>{autoLowConeCount}</label>
                  </Form.Field>
                  <Form.Field style={{ marginLeft: "9px" }}>
                    <HighEnterRemoveButtons
                      enter={AutoHighUp}
                      remove={AutoHighDown}
                    ></HighEnterRemoveButtons>
                    <Divider hidden style={{ marginBottom: "4px" }}></Divider>
                    <MidEnterRemoveButtons
                      enter={AutoMidUp}
                      remove={AutoMidDown}
                    ></MidEnterRemoveButtons>
                    <Divider hidden style={{ marginBottom: "3px" }}></Divider>
                    <LowEnterRemoveButtons
                      enter={AutoLowUp}
                      remove={AutoLowDown}
                    ></LowEnterRemoveButtons>
                  </Form.Field>
                </Form.Group>
                <Form.Group
                  style={{
                    alignSelf: "center",
                    paddingTop: "25px",
                    margin: "auto",
                  }}
                >
                  {docked ? (
                    <Button
                      size="medium"
                      color="green"
                      style={{ marginRight: "20px", width: "125px" }}
                      onClick={() => setDocked(false)}
                    >
                      Dock
                    </Button>
                  ) : (
                    <Button
                      size="medium"
                      color="white"
                      style={{ marginRight: "20px", width: "125px" }}
                      onClick={() => setDocked(true)}
                    >
                      Dock
                    </Button>
                  )}
                  {engaged ? (
                    <Button
                      size="medium"
                      color="green"
                      style={{ marginRight: "20px", width: "125px" }}
                      onClick={() => setEngaged(false)}
                    >
                      Engage
                    </Button>
                  ) : (
                    <Button
                      size="medium"
                      color="white"
                      style={{ marginRight: "20px", width: "125px" }}
                      onClick={() => setEngaged(true)}
                    >
                      Engage
                    </Button>
                  )}
                </Form.Group>
                <Form.Group style={{ marginTop: 20 }}>
                  <Form.Field style={{ color: "white" }}>
                    <Divider hidden />

                    <h5 style={{ color: "white" }}>Ground Intakes</h5>
                    {groundIntakes}
                  </Form.Field>

                  <Form.Field>
                    <ButtonGroup
                      up={groundIntakesUp}
                      down={groundIntakesDown}
                    ></ButtonGroup>
                  </Form.Field>
                  <Button
                    size="medium"
                    color="blue"
                    style={{ margin: "10px" }}
                    onClick={() => setMode(false)}
                  >
                    To tele
                  </Button>
                </Form.Group>
              </Form.Group>
            </Container>
          ) : (
            <Container>
              <Header style={{ color: "white" }} as="h3">
                Tele/End
              </Header>
              <Form.Field>
                <Header style={{ color: "white" }} as="h4">
                  Piece Scoring:
                </Header>
              </Form.Field>
              <Form.Field>
                {cubeButton ? (
                  <Button
                    size="small"
                    style={{
                      marginDown: "5px",
                      marginTop: "11px",
                      marginLeft: "52px",
                    }}
                    color="purple"
                    onClick={CubeCone}
                  >
                    CUBE
                  </Button>
                ) : (
                  <button
                    class="ui inverted small purple button"
                    style={{
                      marginDown: "5px",
                      marginTop: "11px",
                      marginLeft: "52px",
                    }}
                    onClick={CubeCone}
                  >
                    CUBE
                  </button>
                )}
                {coneButton ? (
                  <Button
                    size="small"
                    style={{
                      marginDown: "5px",
                      marginTop: "11px",
                      marginLeft: "3px",
                    }}
                    color="yellow"
                    onClick={CubeCone}
                  >
                    CONE
                  </Button>
                ) : (
                  <button
                    class="ui inverted small yellow button"
                    style={{
                      marginDown: "5px",
                      marginTop: "11px",
                      marginLeft: "3px",
                    }}
                    onClick={CubeCone}
                  >
                    CONE
                  </button>
                )}
              </Form.Field>
              <Form.Group>
                <Form.Field>
                  <label
                    style={{
                      color: "white",
                      fontSize: "20px",
                      marginTop: "5px",
                    }}
                  >
                    High
                  </label>
                  <label
                    style={{
                      color: "white",
                      fontSize: "20px",
                      marginTop: "29px",
                    }}
                  >
                    Mid
                  </label>
                  <label
                    style={{
                      color: "white",
                      fontSize: "20px",
                      marginTop: "25px",
                    }}
                  >
                    Low
                  </label>
                </Form.Field>
                <Form.Group style={{ marginTop: "7px", marginLeft: "28px" }}>
                  <Form.Field>
                    <label style={{ color: "white" }}>
                      {teleHighCubeCount}
                    </label>
                    <Divider hidden style={{ marginBottom: "12px" }}></Divider>
                    <label style={{ color: "white" }}>
                      {teleMidCubeCount}
                    </label>
                    <Divider hidden style={{ marginBottom: "10px" }}></Divider>
                    <label style={{ color: "white" }}>
                      {teleLowCubeCount}
                    </label>
                  </Form.Field>
                  <Form.Field style={{ marginLeft: "59px" }}>
                    <label style={{ color: "white" }}>
                      {teleHighConeCount}
                    </label>
                    <Divider hidden style={{ marginBottom: "12px" }}></Divider>
                    <label style={{ color: "white" }}>
                      {teleMidConeCount}
                    </label>
                    <Divider hidden style={{ marginBottom: "10px" }}></Divider>
                    <label style={{ color: "white" }}>
                      {teleLowConeCount}
                    </label>
                  </Form.Field>
                  <Form.Field style={{ marginLeft: "9px" }}>
                    <HighEnterRemoveButtons
                      enter={TeleHighUp}
                      remove={TeleHighDown}
                    ></HighEnterRemoveButtons>
                    <Divider hidden style={{ marginBottom: "4px" }}></Divider>
                    <MidEnterRemoveButtons
                      enter={TeleMidUp}
                      remove={TeleMidDown}
                    ></MidEnterRemoveButtons>
                    <Divider hidden style={{ marginBottom: "3px" }}></Divider>
                    <LowEnterRemoveButtons
                      enter={TeleLowUp}
                      remove={TeleLowDown}
                    ></LowEnterRemoveButtons>
                  </Form.Field>
                </Form.Group>

                <Form.Group style={{ marginTop: 20 }}>
                  <Form.Field style={{ color: "white" }}>
                    <Divider hidden />
                    <h5 style={{ color: "white" }}>Ground Intakes</h5>
                    {groundIntakes}
                  </Form.Field>

                  <Form.Field>
                    <ButtonGroup
                      up={groundIntakesUp}
                      down={groundIntakesDown}
                    ></ButtonGroup>
                  </Form.Field>
                  <Button
                    size="medium"
                    color="blue"
                    style={{ margin: "10px" }}
                    onClick={() => setMode(true)}
                  >
                    To auto
                  </Button>
                </Form.Group>
              </Form.Group>
            </Container>
          )}

          <Divider></Divider>
          <Form.Group widths="equal">
            <Button color="instagram" type="submit" onClick={save}>
              Submit / Save
            </Button>
            <Button type="submit" color="grey" onClick={resetForm}>
              Clear
            </Button>
            <Link to="/">
              {" "}
              <Button color="white">Back to Home</Button>
            </Link>
          </Form.Group>
          <Divider hidden></Divider>
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
            <h3 style = {{ margin: "0px" }}>Thank you for submitting! Here's a compliment:</h3>
            <h4 style = {{ margin: "0px", color: "rgb(105,105,105)" }}>{randomCompliments[
              Math.floor(Math.random() * randomCompliments.length)
            ]}</h4>
          </Modal.Content>
        </Modal>
      </Container>
    </body>
  );
};
export default MatchScout;
