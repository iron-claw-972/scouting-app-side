import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import QRCode from "react-qr-code";
import { v4 as uuidv4 } from "uuid";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

//Like match scout, this is very meaty
import {
  Card,
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

const MatchList = () => {
  const compcode = "2023arc";
  const controller = new AbortController();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const controller = new AbortController();
    var a = get_url(
      controller,
      "https://www.thebluealliance.com/api/v3/event/2023arc/matches"
    ).then((data) => {
      let rdata = [];
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        if (data[i]["comp_level"] === "qm") {
          rdata.push(data[i]);
        }
      }
      setUsers(rdata);
      console.log(data);
    });
    return () => controller.abort();
  }, []);

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

  return (
    <div>
      <h1
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          textAlign: "center",
          fontSize: "50px",
        }}
      >
        match list
      </h1>
      <h3></h3>
      {[...Array(users.length)].map((e, i) => {
        return (
          <Card
            style={{
              marginTop: "1vh",
              width: "80vw",
              height: "15vh",
              marginLeft: "auto",
              marginRight: "auto",
              position: "relative",
              textAlign: "center",
            }}
          >
            <Link to={"/teampages?match=" + (i + 1)}>
              <Button
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "5%",
                  zIndex: "999",
                }}
              >
                {"#" + (i + 1)}
              </Button>
            </Link>

            <Button
              color="red"
              style={{
                position: "absolute",
                left: "5%",
                margin: "0px",
                padding: "0px",
                top: "10%",
                width: "10%",
                background: "#d16f69",
              }}
            >
              Red
            </Button>
            <Link
              to={
                "/teamlookup?team=" +
                users[i]["alliances"]["red"]["team_keys"][0].replace("frc", "")
              }
            >
              <Button
                style={{
                  position: "absolute",
                  left: "5%",
                  margin: "0px",
                  padding: "0px",
                  top: "35%",
                  width: "10%",
                }}
              >
                {users[i]["alliances"]["red"]["team_keys"][0].replace(
                  "frc",
                  ""
                )}
              </Button>
            </Link>
            <Link
              to={
                "/teamlookup?team=" +
                users[i]["alliances"]["red"]["team_keys"][1].replace("frc", "")
              }
            >
              <Button
                style={{
                  position: "absolute",
                  left: "5%",
                  margin: "0px",
                  padding: "0px",
                  top: "55%",
                  width: "10%",
                }}
              >
                {users[i]["alliances"]["red"]["team_keys"][1].replace(
                  "frc",
                  ""
                )}
              </Button>
            </Link>
            <Link
              to={
                "/teamlookup?team=" +
                users[i]["alliances"]["red"]["team_keys"][2].replace("frc", "")
              }
            >
              <Button
                style={{
                  position: "absolute",
                  left: "5%",
                  margin: "0px",
                  padding: "0px",
                  top: "75%",
                  width: "10%",
                }}
              >
                {users[i]["alliances"]["red"]["team_keys"][2].replace(
                  "frc",
                  ""
                )}
              </Button>
            </Link>
            <Button
              color="blue"
              style={{
                position: "absolute",
                right: "5%",
                margin: "0px",
                padding: "0px",
                top: "10%",
                width: "10%",
              }}
            >
              Blue
            </Button>
            <Link
              to={
                "/teamlookup?team=" +
                users[i]["alliances"]["blue"]["team_keys"][0].replace("frc", "")
              }
            >
              <Button
                style={{
                  position: "absolute",
                  right: "5%",
                  margin: "0px",
                  padding: "0px",
                  top: "35%",
                  width: "10%",
                }}
              >
                {users[i]["alliances"]["blue"]["team_keys"][0].replace(
                  "frc",
                  ""
                )}
              </Button>
            </Link>
            <Link
              to={
                "/teamlookup?team=" +
                users[i]["alliances"]["blue"]["team_keys"][1].replace("frc", "")
              }
            >
              <Button
                style={{
                  position: "absolute",
                  right: "5%",
                  margin: "0px",
                  padding: "0px",
                  top: "55%",
                  width: "10%",
                }}
              >
                {users[i]["alliances"]["blue"]["team_keys"][1].replace(
                  "frc",
                  ""
                )}
              </Button>
            </Link>
            <Link
              to={
                "/teamlookup?team=" +
                users[i]["alliances"]["blue"]["team_keys"][2].replace("frc", "")
              }
            >
              <Button
                style={{
                  position: "absolute",
                  right: "5%",
                  margin: "0px",
                  padding: "0px",
                  top: "75%",
                  width: "10%",
                }}
              >
                {users[i]["alliances"]["blue"]["team_keys"][2].replace(
                  "frc",
                  ""
                )}
              </Button>
            </Link>

            <Card.Content
              style={{
                position: "absolute",
                right: "30%",
                margin: "0px",
                padding: "0px",
                top: "50%",
              }}
              description="RP"
            ></Card.Content>
            <Card.Content
              style={{
                position: "absolute",
                right: "30%",
                margin: "0px",
                padding: "0px",
                top: "0%",
              }}
              description="Score"
            ></Card.Content>
            <Card.Content
              style={{
                position: "absolute",
                left: "30%",
                margin: "0px",
                padding: "0px",
                top: "0%",
              }}
              description="Score"
            ></Card.Content>
            <Card.Content
              style={{
                position: "absolute",
                right: "30%",
                margin: "0px",
                padding: "0px",
                top: "25%",
              }}
              description={JSON.stringify(
                users[i]["score_breakdown"]["blue"]["totalPoints"]
              )}
            ></Card.Content>
            <Card.Content
              style={{
                position: "absolute",
                left: "30%",
                margin: "0px",
                padding: "0px",
                top: "25%",
              }}
              description={JSON.stringify(
                users[i]["score_breakdown"]["red"]["totalPoints"]
              )}
            ></Card.Content>
            <Card.Content
              style={{
                position: "absolute",
                right: "30%",
                margin: "0px",
                padding: "0px",
                top: "75%",
              }}
              description={JSON.stringify(
                users[i]["score_breakdown"]["blue"]["rp"]
              )}
            ></Card.Content>
            <Card.Content
              style={{
                position: "absolute",
                left: "30%",
                margin: "0px",
                padding: "0px",
                top: "50%",
              }}
              description="RP"
            ></Card.Content>
            <Card.Content
              style={{
                position: "absolute",
                left: "30%",
                margin: "0px",
                padding: "0px",
                top: "75%",
              }}
              description={JSON.stringify(
                users[i]["score_breakdown"]["red"]["rp"]
              )}
            ></Card.Content>
          </Card>
        );
      })}
    </div>
  );
};

export default MatchList;
