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

  const [skips, setSkips] = useState(0);
  const [teamNumber1, setTeamNumber1] = useState("");
  const [teamNumber2, setTeamNumber2] = useState("");
  const [teamNumber3, setTeamNumber3] = useState("");

  const [defense1, setDefense1] = useState(0);
  const [defense2, setDefense2] = useState(0);
  const [defense3, setDefense3] = useState(0);

  const [driverCapacity1, setDriverCapacity1] = useState(3);
  const [driverCapacity2, setDriverCapacity2] = useState(3);
  const [driverCapacity3, setDriverCapacity3] = useState(3);

  const [color, setColor] = useState(false);

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
    const controller = new AbortController();

    var a = get_url(
      controller,
      "https://www.thebluealliance.com/api/v3/event/2023casf/matches"
    ).then((data) => {
      console.log(data);
      data.forEach((match) => {
        if (match["match_number"] == Number(MatchNo)) {
          if (color) {
            setTeamNumber1(
              match["alliances"]["blue"]["team_keys"][0].replace("frc", "")
            );
            setTeamNumber2(
              match["alliances"]["blue"]["team_keys"][1].replace("frc", "")
            );
            setTeamNumber3(
              match["alliances"]["blue"]["team_keys"][2].replace("frc", "")
            );
          }
          if (!color) {
            setTeamNumber1(
              match["alliances"]["red"]["team_keys"][0].replace("frc", "")
            );
            setTeamNumber2(
              match["alliances"]["red"]["team_keys"][1].replace("frc", "")
            );
            setTeamNumber3(
              match["alliances"]["red"]["team_keys"][2].replace("frc", "")
            );
          }
        }
      });
    });
    return () => controller.abort();
  }, [MatchNo, color]);

  async function get_url(controller, url) {
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "X-TBA-Auth-Key":
          "BPNgGnZjbEKimUE3vZUl4lwQxyVRVvGsTamHIawG5CMQWpM0DzG8wLhxu1BqCPCO",
      },
      signal: controller.signal,
    });
    return response.json();
  }

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

  const upDC2 = () => {
    if (driverCapacity2 < 5) {
      setDriverCapacity2(driverCapacity2 + 1);
    }
  };

  const downDC2 = () => {
    if (driverCapacity2 >= 1) {
      setDriverCapacity2(driverCapacity2 - 1);
    }
  };

  const upDC1 = () => {
    if (driverCapacity1 < 5) {
      setDriverCapacity1(driverCapacity1 + 1);
    }
  };

  const downDC1 = () => {
    if (driverCapacity1 >= 1) {
      setDriverCapacity1(driverCapacity1 - 1);
    }
  };

  const upDC3 = () => {
    if (driverCapacity3 < 5) {
      setDriverCapacity3(driverCapacity3 + 1);
    }
  };

  const downDC3 = () => {
    if (driverCapacity3 >= 1) {
      setDriverCapacity3(driverCapacity3 - 1);
    }
  };

  const upDefC3 = () => {
    setDefense3(defense3 + 1);
  };

  const downDefC3 = () => {
    if (defense3 >= 1) {
      defense3(defense3 - 1);
    }
  };

  const upDefC2 = () => {
    setDefense2(defense2 + 1);
  };

  const downDefC2 = () => {
    if (defense2 >= 1) {
      defense2(defense2 - 1);
    }
  };

  const upDefC1 = () => {
    setDefense1(defense1 + 1);
  };

  const downDefC1 = () => {
    if (defense1 >= 1) {
      defense1(defense1 - 1);
    }
  };
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
  const ButtonGroup = ({ up, down }) => {
    return (
      <Container fluid>
        <Form.Group style={{ flexDirection: "column" }}>
          <Form.Field style={{ alignSelf: "center", margin: 2 }}>
            <Button size="small" color="orange" onClick={up}>
              +
            </Button>
          </Form.Field>
          <Form.Field style={{ alignSelf: "center", margin: 5 }}>
            <Button size="small" onClick={down}>
              -
            </Button>
          </Form.Field>
        </Form.Group>
      </Container>
    );
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
    setMatchNo(Number(MatchNo) + 1);
    setTeamNumber1("");
    setTeamNumber2("");
    setTeamNumber3("");
    setDriverCapacity2(3);
    setDriverCapacity3(3);

    setDriverCapacity1(3);
    setDefense1("");
    setDefense2("");

    setDefense3("");
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
          <Form.Group
            style={{
              marginLeft: "55px",
              margin: 2,
            }}
          >
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
                  style={{ width: "68px" }}
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
                  style={{ width: "68px" }}
                  onClick={() => setColor(true)}
                >
                  Red
                </Button>
              )}
            </Form.Field>
          </Form.Group>

          <Divider></Divider>
          <Header as="h4" style={{ color: "white" }}>
            Rate on Driver Skill out of 5,
          </Header>
          <Header as="h4" style={{ color: "white" }}>
            Take Notes on substations and intake and soring reliability
          </Header>
          <Header style={{ color: "white" }} as="h4">
            Ex: (Double SS, consistent scoring, fumbled intake 2-3 times)
          </Header>
          <Header style={{ color: "white" }} as="h4">
            5 - almost no mistakes, overcomes D, doesn't hinder allies. 3 -
            average, competent, recovers from mistakes, 1 - hinders allies,
            doesn't accomplish task
          </Header>
          <Header style={{ color: "white" }} as="h4"></Header>
          <Form.Group>
            <Form.Field style={{ marginTop: "0px" }}>
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
              <Form.Field style={{ color: "white" }}>
                <Divider hidden />

                <label style={{ color: "white", marginLeft: 3 }}>Dr</label>
                <p style={{ color: "white", marginLeft: 4 }}>
                  {driverCapacity1}
                </p>
              </Form.Field>
              <Form.Field>
                <ButtonGroup up={upDC1} down={downDC1}></ButtonGroup>
              </Form.Field>
              <Form.Field style={{ color: "white" }}>
                <label style={{ color: "white" }}>Notes</label>
                <Form.TextArea
                  style={{ width: "150px" }}
                  onChange={(e) => setDefense1(e.target.value)}
                ></Form.TextArea>
              </Form.Field>
            </Form.Group>
          </Form.Group>

          <Divider></Divider>

          <Form.Group>
            <Form.Field style={{ marginTop: "0px" }}>
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
              <Form.Field style={{ color: "white" }}>
                <Divider hidden />

                <label style={{ color: "white", marginLeft: 3 }}>Dr</label>
                <p style={{ color: "white", marginLeft: 4 }}>
                  {driverCapacity2}
                </p>
              </Form.Field>
              <Form.Field>
                <ButtonGroup up={upDC2} down={downDC2}></ButtonGroup>
              </Form.Field>
              <Form.Field style={{ color: "white" }}>
                <label style={{ color: "white" }}>Notes</label>
                <Form.TextArea
                  style={{ width: "150px" }}
                  onChange={(e) => setDefense2(e.target.value)}
                ></Form.TextArea>
              </Form.Field>
            </Form.Group>
          </Form.Group>

          <Divider></Divider>

          <Form.Group>
            <Form.Group>
              <Form.Field style={{ marginTop: "0px" }}>
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
              <Form.Field style={{ color: "white" }}>
                <Divider hidden />

                <label style={{ color: "white", marginLeft: 3 }}>Dr</label>
                <p style={{ color: "white", marginLeft: 4 }}>
                  {driverCapacity3}
                </p>
              </Form.Field>
              <Form.Field>
                <ButtonGroup up={upDC3} down={downDC3}></ButtonGroup>
              </Form.Field>
              <Form.Field style={{ color: "white" }}>
                <label style={{ color: "white" }}>Notes</label>
                <Form.TextArea
                  style={{ width: "150px" }}
                  onChange={(e) => setDefense3(e.target.value)}
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
