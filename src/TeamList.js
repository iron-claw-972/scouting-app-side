import React, { useState, useEffect } from "react";
import {
  Divider,
  Label,
  List,
  LabelDetail,
  Table,
  Container,
  Header,
  Button,
  Form,
  Input,
} from "semantic-ui-react";
import {
  getFirestore,
  setDoc,
  doc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { LineChart, PieChart } from "react-chartkick";

import {
  colorOptions,
  driveOptions,
  cvOptions,
  autoOptions,
  yesNoOptions,
  graphOptions,
} from "./AllOptions";

import { Link } from "react-router-dom";

const TeamTab = ({ teamdata, oprs, team }) => {
  const [teamList, setTeamList] = useState({});
  const record =
    teamdata.qual.ranking.record.losses +
    "-" +
    teamdata.qual.ranking.record.wins +
    "-" +
    teamdata.qual.ranking.record.losses;
  return (
    <Container>
      <Table basic compact small>
        <Table.Row>
          <Table.Cell>{teamdata.qual.ranking.rank}</Table.Cell>
          <Table.Cell>
            <Link to="/teampage">
              <Button>{team}</Button>
            </Link>
          </Table.Cell>
          <Table.Cell>{teamdata.qual.ranking.qual_average}</Table.Cell>
          <Table.Cell></Table.Cell>
          <Table.Cell>Auto</Table.Cell>
          <Table.Cell>{record}</Table.Cell>
          <Table.Cell>{teamdata.qual.ranking.matches_played}</Table.Cell>
        </Table.Row>
      </Table>
    </Container>
  );
};
const TeamList = () => {
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const [team3, setTeam3] = useState("");
  const [graph, setGraph] = useState("");
  const [team1data, setTeam1data] = useState([{}]);
  const [team2data, setTeam2data] = useState([{}]);
  const [team3data, setTeam3data] = useState([{}]);
  const [chartData, setChartData] = useState([{}]);
  const [tabData, setTabData] = useState([]);

  function handleChart(graph) {
    try {
      var q = graph.querySelector("span").textContent;
    } catch (error) {
      var q = graph.textContent;
    }
    var output1 = {};
    // console.log(q)
    // console.log(JSON.stringify(matchData))
    // console.log(q)
    // console.log(matchData)
    for (let i = 0; i < team1data.length; i++) {
      let type =
        q.split(/(\s+)/)[2].toLowerCase() +
        q.split(/(\s+)/)[4] +
        q.split(/(\s+)/)[0] +
        "Count";
      function replaceLast(x, y, z) {
        var a = x.split("");
        a[x.lastIndexOf(y)] = z;
        return a.join("");
      }
      if (type.includes("Cone")) {
        type = replaceLast(type, "s", "");
      }

      console.log(team1data);

      output1[i + 1] = team1data[i][type];
    }

    var output2 = {};
    // console.log(q)
    // console.log(JSON.stringify(matchData))
    // console.log(q)
    // console.log(matchData)
    for (let i = 0; i < team2data.length; i++) {
      let type =
        q.split(/(\s+)/)[2].toLowerCase() +
        q.split(/(\s+)/)[4] +
        q.split(/(\s+)/)[0] +
        "Count";
      function replaceLast(x, y, z) {
        var a = x.split("");
        a[x.lastIndexOf(y)] = z;
        return a.join("");
      }
      if (type.includes("Cone")) {
        type = replaceLast(type, "s", "");
      }

      output2[i + 1] = team2data[i][type];
    }

    var output3 = {};

    for (let i = 0; i < team3data.length; i++) {
      let type =
        q.split(/(\s+)/)[2].toLowerCase() +
        q.split(/(\s+)/)[4] +
        q.split(/(\s+)/)[0] +
        "Count";
      console.log(type);
      function replaceLast(x, y, z) {
        var a = x.split("");
        a[x.lastIndexOf(y)] = z;
        return a.join("");
      }
      if (type.includes("Cone")) {
        type = replaceLast(type, "s", "");
      }

      output3[i + 1] = team3data[i][type];
    }
    console.log(team1data);
    console.log(output2);
    console.log(output3);
    // return output
    var graph1 = { name: team1, data: output1 };
    var graph2 = { name: team2, data: output2 };
    var graph3 = { name: team3, data: output3 };

    setChartData([graph1, graph2, graph3]);
    console.log(chartData);
    setGraph(q);
  }

  useEffect(async () => {
    const db = getFirestore();
    const q1 = query(collection(db, "test"), where("teamNumber", "==", team1));
    var matchDataArr1 = [];

    const matchSnapshot = await getDocs(q1);
    matchSnapshot.forEach((match) => {
      matchDataArr1.push(match.data());
    });

    const q2 = query(collection(db, "test"), where("teamNumber", "==", team2));
    var matchDataArr2 = [];
    const matchSnapshot2 = await getDocs(q2);
    matchSnapshot2.forEach((match) => {
      matchDataArr2.push(match.data());
    });

    const q3 = query(collection(db, "test"), where("teamNumber", "==", team3));
    var matchDataArr3 = [];
    const matchSnapshot3 = await getDocs(q3);
    matchSnapshot3.forEach((match) => {
      matchDataArr3.push(match.data());
    });

    setTeam1data(matchDataArr1);
    console.log(team1data);
    setTeam2data(matchDataArr2);
    setTeam3data(matchDataArr3);
    var tempdata = [];
    var teamlst = [];
    const controller = new AbortController();
    var t = get_url(
      controller,
      "https://www.thebluealliance.com/api/v3/event/2023week0/teams"
    ).then((data) => {
      for (let i = 0; i < data.length; i++) {
        teamlst.push("frc" + data[i]["team_number"]);
      }
    });
    console.log(tempdata);
    var a = get_url(
      controller,
      "https://www.thebluealliance.com/api/v3/event/2023week0/teams/statuses"
    ).then((data) => {
      for (let i = 0; i < teamlst.length; i++) {
        tempdata[0] = data[teamlst[i]]["qual"]["ranking"]["rank"];
        tempdata[1] = teamlst[i].replace("frc", "");
        tempdata[2] = data[teamlst[i]]["qual"]["ranking"]["sort_orders"][1];
        tempdata[3] = data[teamlst[i]]["qual"]["ranking"]["sort_orders"][2];
        tempdata[4] = data[teamlst[i]]["qual"]["ranking"]["sort_orders"][3];

        tempdata[5] = data[teamlst[i]]["qual"]["ranking"]["record"]["wins"];
        tempdata[6] = data[teamlst[i]]["qual"]["ranking"]["record"]["losses"];
        tempdata[7] = data[teamlst[i]]["qual"]["ranking"]["record"]["ties"];
      }
    });

    console.log(tempdata);
    setTabData(tempdata);
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
  }, [team1, team2, team3]);

  return (
    <Container>
      <Header as="h1" style={{ textAlign: "center", margin: "3px" }}>
        All teams + Picklist Editor
      </Header>
      <Header as="h5" style={{ textAlign: "center", margin: "3px" }}>
        (Rankings are ~2 matches behind real rankings during comp)
      </Header>

      <label>-Team 1-</label>
      <Input
        value={team1}
        onChange={(e) => setTeam1(e.target.value)}
        size="small"
      />
      <label> -Team 2-</label>
      <Input
        value={team2}
        onChange={(e) => setTeam2(e.target.value)}
        size="small"
      />
      <label> -Team 3-</label>
      <Input
        value={team3}
        onChange={(e) => setTeam3(e.target.value)}
        size="small"
      />

      <Divider hidden></Divider>
      <label>what to graph</label>

      <Form.Select
        value={graph}
        options={graphOptions}
        onChange={(e) => handleChart(e.target)}
      ></Form.Select>
      <LineChart data={chartData} curve={false} />
      <Divider></Divider>
      <Header as="h3">Picklist:</Header>
      <Divider></Divider>
      <Table basic compact small sortable unstackable singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Rank</Table.HeaderCell>
            <Table.HeaderCell>Team</Table.HeaderCell>
            <Table.HeaderCell>Avg Match</Table.HeaderCell>
            <Table.HeaderCell>Avg Charge</Table.HeaderCell>
            <Table.HeaderCell>Avg Auto</Table.HeaderCell>
            <Table.HeaderCell>Win</Table.HeaderCell>
            <Table.HeaderCell>Loss</Table.HeaderCell>
            <Table.HeaderCell>Ties</Table.HeaderCell>
            <Table.HeaderCell>Add 2 Picklist</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {tabData.map(
            ({
              rank,
              team,
              match_avg,
              charge_avg,
              auto_avg,
              win,
              loss,
              tie,
            }) => (
              <Table.Row key={team}>
                <Table.Cell>{rank}</Table.Cell>
                <Table.Cell>{team}</Table.Cell>
                <Table.Cell>{match_avg}</Table.Cell>
                <Table.Cell>{charge_avg}</Table.Cell>
                <Table.Cell>{auto_avg}</Table.Cell>
                <Table.Cell>{win}</Table.Cell>
                <Table.Cell>{loss}</Table.Cell>
                <Table.Cell>{tie}</Table.Cell>
              </Table.Row>
            )
          )}
        </Table.Body>
      </Table>
    </Container>
  );
};

export default TeamList;
