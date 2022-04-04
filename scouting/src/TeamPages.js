//EXPLANATIONS IN COMMENTS

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SpecTable from "./SpecTable";

import { getFirestore, collection, getDocs } from "firebase/firestore";

import { Grid, Label, List, LabelDetail, Table } from "semantic-ui-react";
import Textbox from "./Textbox";

const TeamCard = ({ bgcolor, labelcolor, textcolor, teamData }) => {
  //The whole team's data is put in this array
  const {
    teamNumber = "",
    scouterName = "",
    organization = "",
    lang = "",
    notes = "",
    match = [],
    hangar = [[0, 0, 0, 0]],
    matchAvg = [[0, 0, 0, 0, 0]],
    commentAuto = [""],
    commentTele = [""],
    commentEnd = [""],
  } = teamData;

  //This function displays text, but it looks nice
  const TextHelper = (props) => (
    <span style={{ fontSize: 16, color: textcolor }}>{props.children}</span>
  );

  const linkGen = (lst) => {
    const sz = lst.length;
    return lst.map((e, i) => {
      var str = "https://www.thebluealliance.com/match/2022casj_qm" + e;
      return (
        <a key={e} href={str}>
          {e}
          {i + 1 === sz ? "" : ","}
        </a>
      );
    });
  };

  /* 
  This uses semantic ui
  As you can see, it displays the values from the above array
  They are loaded and formatted below the return() function
  */

  return (
    <div>
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
          </Grid.Row>

          <Grid.Row columns={2} divided>
            <Grid.Column>
              <Label horizontal color={labelcolor}>
                Pit Scouter:
              </Label>
              <TextHelper>{scouterName}</TextHelper>
            </Grid.Column>
            <Grid.Column>
              <Label horizontal color={labelcolor}>
                Robot Lang:
              </Label>
              <TextHelper>{lang}</TextHelper>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={1} divided>
            <Grid.Column>
              <Label horizontal color={labelcolor}>
                organization level:
              </Label>
              <TextHelper>{organization}</TextHelper>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Textbox category={"Notes from Pit:"} text={notes} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Label>Matches Played</Label>
            </Grid.Column>
            <Grid.Column>
              <p style={{ fontSize: 20 }}>{linkGen(match)}</p>
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
                text={commentAuto.join("-")}
              ></Textbox>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Textbox
                category={"Teleop comments"}
                text={commentTele.join("-")}
              ></Textbox>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Textbox
                category={"Endgame comments"}
                text={commentEnd.join("-")}
              ></Textbox>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </List.Item>
    </div>
  );
};

//The tricky part starts here: the loading and formatting
const TeamPages = () => {
  //see MatchScout.js or Pitscout.js for state explanation
  //THIS WHERE OUR TEAM DATA WILL EVENTUALLY GO
  const [teamData, setTeamData] = useState([]);

  //useEffect is called when the page loads
  //Our work is mostly done here
  useEffect(async () => {
    //to store match data
    const matchDataArr = [];
    //to store pit data
    const teamDataArr = [];

    //formatted and combined data goes here
    const mergedDataArr = [];

    //This gets teamSnapshot (Pit Scout data) and matchSnapshot (Match Scout data)
    const db = getFirestore();
    const teamSnapshot = await getDocs(collection(db, "teams_svr"));
    const matchSnapshot = await getDocs(collection(db, "match_svr"));
    console.log(teamSnapshot);

    //This pushes each data object (a match or a team) to their respective arrays.
    matchSnapshot.forEach((match) => {
      matchDataArr.push(match.data());
    });
    teamSnapshot.forEach((team) => {
      teamDataArr.push(team.data());
    });

    //This formats the data so that the component as defined in return() can render it
    //Iterating over teams
    for (let i = 0; i < teamDataArr.length; i++) {
      //Iterating over matches to find ones that the team played in
      let filteredTeamMatchData = matchDataArr.filter((md) => {
        return md.teamNumber == teamDataArr[i].teamNumber;
      });

      //THIS IS THE FORMAT HANGAR DATA MUST BE IN
      let hang = [
        ["Traverse", "High", "Mid", "Low", "None"],
        [0, 0, 0, 0, 0, 0],
      ];

      //THIS IS THE FORMAT NUMERICAL DATA MUST BE IN
      let matchavg = [
        ["auto LH", "auto UH", "teleop LH", "teleop UH", "Climb Time"],
        [0, 0, 0, 0, 0],
      ];

      //total matches (will divide numerical data by this to find averages)

      var totMatch = 0;

      //comments stored here
      var autoC = [];
      var teleopC = [];
      var endgameC = [];
      var matches = [];

      //iterating over matches the team played.
      filteredTeamMatchData.forEach((j) => {
        totMatch = totMatch + 1;

        //this counts which bar team made to in each match
        //and increments corresponding value
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

        matches.push(j.MatchNo);
        console.log(matches);

        //This simply adds in the numerical data (we haven't calculated average yet)
        matchavg[1][0] += parseInt(j.AutoLH);
        matchavg[1][1] += parseInt(j.AutoUH);
        matchavg[1][2] += parseInt(j.TeleopLH);
        matchavg[1][3] += parseInt(j.TeleopUH);
        matchavg[1][4] += parseInt(j.ClimbTime);

        //This adds in comments
        autoC.push(j.name + ":  " + j.AutoC + "\n");
        teleopC.push(j.name + ":  " + j.TeleopC + "\n");
        endgameC.push(j.name + ":  " + j.EndgameC + "\n");
      });

      //This divides numerical data by number of matches to get averages
      if (totMatch > 0) {
        for (let k = 0; k < matchavg[1].length; k++) {
          matchavg[1][k] = Number(matchavg[1][k] / totMatch).toFixed(3);
        }
      }

      //We create a new object with all our data
      const newMatchAvgObj = {
        match: matches,
        hangar: hang,
        matchAvg: matchavg,
        commentAuto: autoC,
        commentTele: teleopC,
        commentEnd: endgameC,
      };
      teamDataArr[i].teamNumber = "-" + teamDataArr[i].teamNumber + "-";

      //This combines team data and match data and pushes it to an array -- mergedDataArr

      mergedDataArr.push({ ...teamDataArr[i], ...newMatchAvgObj });
    }

    //...And we use that array as teamData
    console.log(mergedDataArr);
    setTeamData(mergedDataArr);
  }, []);

  /*
  Use this dummy data (incorrectly named "match data", its actually all the data)
  and use it to play around with what data is displayed.
  */
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
        ["Traverse", "High", "Medium", "Low", "None"],
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
        ["Traverse", "High", "Medium", "Low", "None"],
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

  //This uses our teamData to return a teamPage for every team
  const returnTeamCards = () => {
    //alternating colors
    return teamData.map((teamRow, index) => {
      let labelcolor, bgcolor;
      if (index % 2 == 0) {
        labelcolor = "black";
        bgcolor = "white";
      } else {
        labelcolor = "orange";
        bgcolor = "white";
      }
      //returning the TeamCard with the inputs
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
  //This is the final return, it returns the teamPages in a list container (see semantic ui)
  return (
    <List style={{ margin: "10px", padding: "10px" }}>{returnTeamCards()}</List>
  );
};
export default TeamPages;
