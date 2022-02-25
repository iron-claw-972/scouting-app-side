import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SpecTable from "./SpecTable";

import { getFirestore, collection, getDocs } from "firebase/firestore";

import { Grid, Label, List, LabelDetail, Table } from "semantic-ui-react";

const TeamCard = ({ bgcolor, labelcolor, textcolor, teamData }) => {
  const dummyData = [
    [
      "auto LH",
      "auto UH",
      "teleop LH",
      "teleop UH",
      "Climb Time",
      "Hangar",
      "Auto Comments",
      "Teleop Comments",
      "Endgame Comments",
    ],
    [
      2,
      0,
      5,
      0,
      20,
      "Traverse",
      "good",
      "decent",
      "literally insane literally insaneliterally insaneliterally insaneliterally insaneliterally insaneliterally insaneinsaneliterally insaneinsaneliterally insaneinsaneliterally insaneinsaneliterally insaneinsaneliterally insaneinsaneliterally insaneinsaneliterally insaneinsaneliterally insaneinsaneliterally insaneinsaneliterally insaneinsaneliterally insaneinsaneliterally insaneinsaneliterally insaneinsaneliterally insaneinsaneliterally insane",
    ],
  ];
  const {
    teamNumber = "",
    teamName = "",
    cvCapability = "",
    driveTrain = "",
    height = "",
    length = "",
    pastFocuses = "",
    weight = "",
    worlds = "",
  } = teamData;

  const TextHelper = (props) => (
    <span style={{ fontSize: 16, color: textcolor }}>{props.children}</span>
  );
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
            <Label size="huge" color={labelcolor}>
              {teamNumber}
            </Label>
          </Grid.Column>
          <Grid.Column>
            <Label color={labelcolor} size="big">
              <LabelDetail>{teamName}</LabelDetail>
            </Label>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={2} divided>
          <Grid.Column>
            <Label horizontal color={labelcolor}>
              DriveTrain:
            </Label>
            <TextHelper>{driveTrain}</TextHelper>
          </Grid.Column>
          <Grid.Column>
            <Label horizontal color={labelcolor}>
              CV:
            </Label>
            <TextHelper>{cvCapability}</TextHelper>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={3} divided>
          <Grid.Column>
            <Label horizontal color={labelcolor}>
              Height:
            </Label>
            <TextHelper>{height}</TextHelper>
          </Grid.Column>
          <Grid.Column>
            <Label horizontal color={labelcolor}>
              Length:
            </Label>
            <TextHelper>{length}</TextHelper>
          </Grid.Column>
          <Grid.Column>
            <Label horizontal color={labelcolor}>
              Weight:
            </Label>
            <TextHelper>{weight}</TextHelper>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row divided>
          <Grid.Column width={6}>
            <Label horizontal color={labelcolor}>
              World?:
            </Label>
            <TextHelper>{worlds}</TextHelper>
          </Grid.Column>
          <Grid.Column width={10}>
            <TextHelper>{pastFocuses}</TextHelper>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row divided>
          <SpecTable columns={6} headerName="matchData" specData={dummyData} />
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
    setTeamData(teamDataArr);
  }, []);

  const returnTeamCards = () => {
    return teamData.map((teamRow, index) => {
      let labelcolor, bgcolor;
      if (index % 2 == 0) {
        labelcolor = "black";
        bgcolor = "white";
      } else {
        labelcolor = "orange";
        bgcolor = "white";
      }
      return (
        <TeamCard
          bgcolor={bgcolor}
          labelcolor={labelcolor}
          textcolor={"black"}
          teamData={teamRow}
        />
      );
    });
  };

  return (
    <List style={{ margin: "10px", padding: "10px" }}>{returnTeamCards()}</List>
  );
};
export default TeamPages;
