import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getFirestore, collection, getDocs } from "firebase/firestore";

import { Grid, Label, List, LabelDetail } from "semantic-ui-react";

const TeamCard = ({ bgcolor, labelcolor, teamData }) => {
  const {
    teamNumber = "",
    teamName = "",
    auto = "",
    climb = "",
    cvCapability = "",
    driveTrain = "",
    height = "",
    length = "",
    pastFocuses = "",
    programmingLanguage = "",
    shooter = "",
    weight = "",
    worlds = "",
  } = teamData;
  return (
    <List.Item key={teamNumber}>
      <Grid
        divided="vertically"
        stackable
        style={{
          background: bgcolor,
          border: "2px solid rgba(0, 0, 0, 0.5)",
          borderRadius: "5px",
          margin: "5px",
        }}
      >
        <Grid.Row columns={2} textAlign="center" verticalAlign="bottom">
          <Grid.Column>
            <Label tag size="huge" color={labelcolor}>
              {teamNumber}
            </Label>
          </Grid.Column>
          <Grid.Column>
            <Label color={labelcolor} size="large">
              <LabelDetail>{teamName}</LabelDetail>
            </Label>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={4} divided>
          <Grid.Column>
            <Label horizontal color={labelcolor}>
              Auto?:
            </Label>
            <span style={{ fontSize: 18, color: labelcolor }}>{auto}</span>
          </Grid.Column>
          <Grid.Column>
            <Label horizontal color={labelcolor}>
              Can climb:
            </Label>
            <span style={{ fontSize: 18, color: labelcolor }}>{climb}</span>
          </Grid.Column>
          <Grid.Column>
            <Label horizontal color={labelcolor}>
              Shoot high?:
            </Label>
            <span style={{ fontSize: 18, color: labelcolor }}>{shooter}</span>
          </Grid.Column>

          <Grid.Column>
            <Label horizontal color={labelcolor}>
              DriveTrain:
            </Label>
            <span style={{ fontSize: 18, color: labelcolor }}>
              {driveTrain}
            </span>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={4} divided>
          <Grid.Column>
            <Label horizontal color={labelcolor}>
              CV:
            </Label>
            <span style={{ fontSize: 18, color: labelcolor }}>
              {cvCapability}
            </span>
          </Grid.Column>
          <Grid.Column>
            <Label horizontal color={labelcolor}>
              Height:
            </Label>
            <span style={{ fontSize: 18, color: labelcolor }}>{height}</span>
          </Grid.Column>
          <Grid.Column>
            <Label horizontal color={labelcolor}>
              Length:
            </Label>
            <span style={{ fontSize: 18, color: labelcolor }}>{length}</span>
          </Grid.Column>
          <Grid.Column>
            <Label horizontal color={labelcolor}>
              Weight:
            </Label>
            <span style={{ fontSize: 18, color: labelcolor }}>{weight}</span>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row divided>
          <Grid.Column width={3}>
            <Label horizontal color={labelcolor}>
              Lang:
            </Label>
            <span style={{ fontSize: 18, color: labelcolor }}>
              {programmingLanguage}
            </span>
          </Grid.Column>
          <Grid.Column width={3}>
            <Label horizontal color={labelcolor}>
              World?:
            </Label>
            <span style={{ fontSize: 18, color: labelcolor }}>{worlds}</span>
          </Grid.Column>
          <Grid.Column width={10}>
            <span style={{ fontSize: 18, color: labelcolor }}>
              {pastFocuses}
            </span>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </List.Item>
  );
};

const TeamPages = () => {
  const [teamData, setTeamData] = useState([]);
  useEffect(async () => {
    const db = getFirestore();
    const querySnapshot = await getDocs(collection(db, "teams"));
    const teamDataArr = [];
    querySnapshot.forEach((doc) => {
      teamDataArr.push(doc.data());
    });
    console.log(teamDataArr);
    setTeamData(teamDataArr);
  }, []);

  const returnTeamCards = () => {
    return teamData.map((teamRow, index) => {
      let labelcolor, bgcolor;
      if (index % 2 == 0) {
        labelcolor = "blue";
        bgcolor = "#ced8f2";
      } else {
        labelcolor = "brown";
        bgcolor = "#ffffe0";
      }
      return (
        <TeamCard
          bgcolor={bgcolor}
          labelcolor={labelcolor}
          teamData={teamRow}
        />
      );
    });
  };

  const teamData1 = [
    {
      teamNumber: "10",
      teamName: "The best team NorthEast",
      auto: "can move",
      climb: "yes",
      cvCapability: "no",
      driveTrain: "2W",
      height: "124",
      length: "32",
      pastFocuses: "has been doing well in auto mode",
      programmingLanguage: "Java",
      shooter: "yes",
      weight: "25",
      worlds: "yes",
    },
    {
      teamNumber: "11",
      teamName: "The best team from South",
    },
  ];
  return (
    <List style={{ margin: "10px", padding: "10px" }}>{returnTeamCards()}</List>
  );
};
export default TeamPages;
