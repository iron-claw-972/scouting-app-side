import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SpecTable from "./SpecTable";

import { getFirestore, collection, getDocs } from "firebase/firestore";

import { Grid, Label, List, LabelDetail, Table } from "semantic-ui-react";
import Textbox from "./Textbox";

//It's going to be blank if there's no data
const TeamCard = ({ bgcolor, labelcolor, textcolor, teamData }) => {
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
    hangar = [[0, 0, 0, 0, 0]],
    matchAvg = [[0, 0, 0, 0, 0]],
    commentAuto = [""],
    commentTele = [""],
    commentEnd = [""],
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
          <Grid.Column width={7}>
            <SpecTable
              columns={5}
              headerName="match averages"
              specData={matchAvg}
            />
          </Grid.Column>
          <Grid.Column width={7}>
            <SpecTable columns={5} headerName="Hangar" specData={hangar} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Textbox
              category={"Auto comments"}
              text={commentAuto.join(",   ")}
            ></Textbox>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Textbox
              category={"Teleop comments"}
              text={commentTele.join(",   ")}
            ></Textbox>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Textbox
              category={"Endgame comments"}
              text={commentEnd.join(",   ")}
            ></Textbox>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </List.Item>
  );
};

const TeamPages = () => {
  const [teamData, setTeamData] = useState([]);

  useEffect(async () => {
    const matchDataArr = [];
    const teamDataArr = [];
    const mergedDataArr = [];

    const db = getFirestore();
    const teamSnapshot = await getDocs(collection(db, "teams"));
    const matchSnapshot = await getDocs(collection(db, "match"));

    matchSnapshot.forEach((match) => {
      matchDataArr.push(match.data());
    });
    teamSnapshot.forEach((team) => {
      teamDataArr.push(team.data());
    });

    for (let i = 0; i < teamDataArr.length; i++) {
      let filteredTeamMatchData = matchDataArr.filter((md) => {
        return md.teamNumber == teamDataArr[i].teamNumber;
      });
      let hang = [
        ["Traverse", "High", "Medium", "Low", "None"],
        [0, 0, 0, 0, 0],
      ];
      let matchavg = [
        ["auto LH", "auto UH", "teleop LH", "teleop UH", "Climb Time"],
        [0, 0, 0, 0, 0],
      ];
      var totMatch = 0;
      var autoC = [];
      var teleopC = [];
      var endgameC = [];
      filteredTeamMatchData.forEach((j) => {
        totMatch = totMatch + 1;
        if (j.Hangar == "Traverse") {
          hang[1][0] += 1;
        } else if (j.Hangar == "High") {
          hang[1][1] += 1;
        } else if (j.Hangar == "Medium") {
          hang[1][2] += 1;
        } else if (j.Hangar == "Low") {
          hang[1][3] += 1;
        } else {
          hang[1][4] += 1;
        }
        matchavg[1][0] += parseInt(j.AutoLH);
        matchavg[1][1] += parseInt(j.AutoUH);
        matchavg[1][2] += parseInt(j.TeleopLH);
        matchavg[1][3] += parseInt(j.TeleopUH);
        matchavg[1][4] += parseInt(j.ClimbTime);

        autoC.push(j.AutoC);
        teleopC.push(j.TeleopC);
        endgameC.push(j.EndgameC);
      });
      if (totMatch > 0) {
        for (let k = 0; k < matchavg[1].length; k++) {
          matchavg[1][k] = matchavg[1][k] / totMatch;
        }
      }

      // calculate averages
      // create nested arrays
      // shove this all into one object
      // merge this object with teamDataArr[i]
      const newMatchAvgObj = {
        hangar: hang,
        matchAvg: matchavg,
        commentAuto: autoC,
        commentTele: teleopC,
        commentEnd: endgameC,
      };

      mergedDataArr.push({ ...teamDataArr[i], ...newMatchAvgObj });
    }
    console.log(mergedDataArr);
    setTeamData(mergedDataArr);
  }, []);

  const dummyMatchDataArr = [
    {
      teamNumber: "123",
      teamName: "Some team",
      cvCapability: "no",
      driveTrain: "2W",
      height: "12",
      length: "15",
      pastFocuses: "this was good in past",
      weight: "20",
      worlds: "yes",
      hangar: [
        ["Traverse", "High", "Medium", "low", "None"],
        [0, 2, 1, 1, 0],
      ],
      matchAvg: [
        ["auto LH", "auto UH", "teleop LH", "teleop UH", "Climb Time"],
        [1, 2, 4, 2, 25],
      ],
      commentAuto: ["blah1", "blah2", "blah1", "blah2"],
      commentTele: ["clah1", "clah2", "clah1", "clah2"],
      commentEnd: ["elah1", "elah2", "elah1", "elah2"],
    },
    {
      teamNumber: "210",
      teamName: "Some other team",
      cvCapability: "no",
      driveTrain: "2W",
      height: "12",
      length: "15",
      pastFocuses: "this was good in past",
      weight: "20",
      worlds: "yes",
      hangar: [
        ["Traverse", "High", "Medium", "low", "None"],
        [0, 2, 1, 1, 0],
      ],
      matchAvg: [
        ["auto LH", "auto UH", "teleop LH", "teleop UH", "Climb Time"],
        [1, 2, 4, 2, 25],
      ],
      commentAuto: ["blae1", "blae2", "blae1", "blae2"],
      commentTele: ["clae1", "clae2", "clae1", "clae2"],
      commentEnd: ["elae1", "elae2", "elae1", "elae2"],
    },
  ];

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
          key={index}
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
