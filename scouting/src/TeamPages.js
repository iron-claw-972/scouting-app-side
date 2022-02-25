import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getFirestore, collection, getDocs } from "firebase/firestore";

import { Grid, Label, List, LabelDetail } from "semantic-ui-react";

const TeamCard = ({ bgcolor, labelcolor, textcolor, teamData }) => {
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

        <Grid.Row columns={4} divided>
          <Grid.Column>
            <Label horizontal color={labelcolor}>
              Auto?:
            </Label>
            <TextHelper>{auto}</TextHelper>
          </Grid.Column>
          <Grid.Column>
            <Label horizontal color={labelcolor}>
              Can climb:
            </Label>
            <TextHelper>{climb}</TextHelper>
          </Grid.Column>
          <Grid.Column>
            <Label horizontal color={labelcolor}>
              Shoot high?:
            </Label>
            <TextHelper>{shooter}</TextHelper>
          </Grid.Column>

          <Grid.Column>
            <Label horizontal color={labelcolor}>
              DriveTrain:
            </Label>
            <TextHelper>{driveTrain}</TextHelper>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={4} divided>
          <Grid.Column>
            <Label horizontal color={labelcolor}>
              CV:
            </Label>
            <TextHelper>{cvCapability}</TextHelper>
          </Grid.Column>
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
          <Grid.Column width={3}>
            <Label horizontal color={labelcolor}>
              Lang:
            </Label>
            <TextHelper>{programmingLanguage}</TextHelper>
          </Grid.Column>
          <Grid.Column width={3}>
            <Label horizontal color={labelcolor}>
              World?:
            </Label>
            <TextHelper>{worlds}</TextHelper>
          </Grid.Column>
          <Grid.Column width={10}>
            <TextHelper>{pastFocuses}</TextHelper>
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
