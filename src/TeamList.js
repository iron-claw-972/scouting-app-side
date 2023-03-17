import React, { useState, useEffect } from "react";
import _ from "lodash";

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
function exampleReducer(state, action) {
  switch (action.type) {
    case "CHANGE_SORT":
      if (state.column === action.column) {
        return {
          ...state,
          data: state.data.slice().reverse(),
          direction:
            state.direction === "ascending" ? "descending" : "ascending",
        };
      }

      return {
        column: action.column,
        data: _.sortBy(state.data, [action.column]),
        direction: "ascending",
      };
    case "ADD_DATA":
      return {
        ...state,
        data: action.data,
      };
    default:
      throw new Error();
  }
}

const TeamList = () => {
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const [team3, setTeam3] = useState("");
  const [graph, setGraph] = useState("");
  const [team1data, setTeam1data] = useState([{}]);
  const [team2data, setTeam2data] = useState([{}]);
  const [team3data, setTeam3data] = useState([{}]);
  const [chartData, setChartData] = useState([{}]);
  const [loaded, setLoaded] = useState(false);
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
  useEffect(() => {
    var tempdata = [];
    var teamlst = [];
    const controller = new AbortController();
    var t = get_url(
      controller,
      "https://www.thebluealliance.com/api/v3/event/2023caph/teams"
    ).then((data) => {
      for (let i = 0; i < data.length; i++) {
        teamlst.push("frc" + data[i]["team_number"]);
      }
    });
    var a = get_url(
      controller,
      "https://www.thebluealliance.com/api/v3/event/2023caph/teams/statuses"
    ).then((data) => {
      for (let i = 0; i < teamlst.length; i++) {
        var temptempdata = {};
        temptempdata["rank"] = data[teamlst[i]]["qual"]["ranking"]["rank"];
        temptempdata["team"] = teamlst[i].replace("frc", "");
        temptempdata["match_avg"] =
          data[teamlst[i]]["qual"]["ranking"]["sort_orders"][1];
        temptempdata["charge_avg"] =
          data[teamlst[i]]["qual"]["ranking"]["sort_orders"][2];
        temptempdata["auto_avg"] =
          data[teamlst[i]]["qual"]["ranking"]["sort_orders"][3];

        temptempdata["win"] =
          data[teamlst[i]]["qual"]["ranking"]["record"]["wins"];
        temptempdata["loss"] =
          data[teamlst[i]]["qual"]["ranking"]["record"]["losses"];
        temptempdata["tie"] =
          data[teamlst[i]]["qual"]["ranking"]["record"]["ties"];
        tempdata.push(temptempdata);
      }
      console.log(tempdata);
      if (!loaded) {
        console.log("attempt");
        dispatch({ type: "ADD_DATA", data: tempdata });
        setLoaded(true);
      }
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
  });
  const [state, dispatch] = React.useReducer(exampleReducer, {
    column: null,
    data: [],
    direction: null,
  });
  const { column, data, direction } = state;
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
    setTeam2data(matchDataArr2);
    setTeam3data(matchDataArr3);
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
      <Link>
        <Button
          onClick={() =>
            window
              .open(
                "https://www.thebluealliance.com/event/2023caph#event-insights"
              )
              .focus()
          }
        >
          To OPRS
        </Button>
      </Link>
      <Table basic compact small sortable unstackable singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={column === "rank" ? direction : null}
              onClick={() => dispatch({ type: "CHANGE_SORT", column: "rank" })}
            >
              Rank
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "team" ? direction : null}
              onClick={() => dispatch({ type: "CHANGE_SORT", column: "team" })}
            >
              Team
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "match_avg" ? direction : null}
              onClick={() =>
                dispatch({ type: "CHANGE_SORT", column: "match_avg" })
              }
            >
              Avg Match
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "charge_avg" ? direction : null}
              onClick={() =>
                dispatch({ type: "CHANGE_SORT", column: "charge_avg" })
              }
            >
              {" "}
              Avg Charge
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "auto_avg" ? direction : null}
              onClick={() =>
                dispatch({ type: "CHANGE_SORT", column: "auto_avg" })
              }
            >
              Avg Auto
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "win" ? direction : null}
              onClick={() => dispatch({ type: "CHANGE_SORT", column: "win" })}
            >
              Win
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "loss" ? direction : null}
              onClick={() => dispatch({ type: "CHANGE_SORT", column: "loss" })}
            >
              Loss
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "tie" ? direction : null}
              onClick={() => dispatch({ type: "CHANGE_SORT", column: "tie" })}
            >
              Ties
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map(
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
              <Table.Row key={Math.random()}>
                <Table.Cell>{rank}</Table.Cell>
                <Table.Cell>
                  <Link to={"/teamlookup?team=" + team}>
                    {" "}
                    <Button size="medium">{team}</Button>
                  </Link>
                </Table.Cell>
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
