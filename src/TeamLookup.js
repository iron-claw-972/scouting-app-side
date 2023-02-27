import React, { useEffect, useState } from "react";
import _ from "lodash";

import {
  Table,
  Container,
  Form,
  Button,
  Modal,
  Header,
  Divider,
  Radio,
  Segment,
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
import { LineChart, BarChart } from "react-chartkick";
import "chartkick/chart.js";
import Textbox from "./Textbox.js";
import CanvasChooser from "./CanvasChooser";
import CanvasDisplay from "./CanvasDisplay";

import {
  colorOptions,
  driveOptions,
  cvOptions,
  autoOptions,
  yesNoOptions,
  graphOptions,
} from "./AllOptions";
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

const TeamLookup = () => {
  var matchDataArr = [];
  const [mousePos, setMousePos] = useState({});

  const [teamNumber, setTeamNumber] = useState("");
  const [graph, setGraph] = useState("");
  const [queryTeam, setQueryTeam] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [avgData, setAvgData] = useState({});
  const [totalScore, setTotalScore] = useState();
  const [realDocked, setrealDocked] = useState(0);
  const [realEngaged, setrealEngaged] = useState(0);
  const [pitData, setPitData] = useState([{}]);
  const [matchData, setMatchData] = useState([{}]);
  const [coords, setCoords] = useState([{}]);

  const [realDriver, setRealDriver] = useState("");
  const [realDefense, setRealDefense] = useState("");
  const [chartData, setChartData] = useState({});

  const [namesList, setNamesList] = useState([]);


  function handleChart(graph) {
    try {
      var q = graph.querySelector("span").textContent;
    } catch (error) {
      var q = graph.textContent;
    }
    var output = {};
    // console.log(q)
    // console.log(JSON.stringify(matchData))
    // console.log(q)
    // console.log(matchData)
    for (let i = 0; i < matchData.length; i++) {
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

      output[matchData[i]["MatchNo"]] = matchData[i][type];
    }
    // return output
    setChartData(output);
    setGraph(q);
  }
  const queryParameters = new URLSearchParams(window.location.search);

  useEffect(() => {
    const team = queryParameters.get("team");
    setTeamNumber(team);
  }, []);
  useEffect(async () => {
    if (queryTeam === "") return;
    matchDataArr = [];
    const db = getFirestore();
    const q = query(
      collection(db, "test"),
      where("teamNumber", "==", queryTeam)
    );

    const matchSnapshot = await getDocs(q);
    matchSnapshot.forEach((match) => {
      matchDataArr.push(match.data());
    });

    if (matchDataArr.length === 0) {
      setShowModal(true);
    }
    setMatchData(matchDataArr);

    
    var names = [];

    for (let i = 0; i < matchDataArr.length; i++) {
      names.push(matchDataArr[i].name)
    }

    setNamesList(names);

    var initcoords = [];
    matchData.forEach((match) => initcoords.push(match.mousePos));
    console.log(initcoords);
    setCoords(initcoords);

    setAvgData((prevData) => {
      return {
        ...prevData,
        Avg_Cubes_Auto_H: search(matchDataArr, "autoHighCubeCount"),
      };
    });
    setAvgData((prevData) => {
      return {
        ...prevData,
        Avg_Cubes_Auto_M: search(matchDataArr, "autoMidCubeCount"),
      };
    });
    setAvgData((prevData) => {
      return {
        ...prevData,
        Avg_Cubes_Auto_L: search(matchDataArr, "autoLowCubeCount"),
      };
    });
    setAvgData((prevData) => {
      return {
        ...prevData,
        Avg_Cones_Auto_H: search(matchDataArr, "autoHighConeCount"),
      };
    });
    setAvgData((prevData) => {
      return {
        ...prevData,
        Avg_Cones_Auto_M: search(matchDataArr, "autoMidConeCount"),
      };
    });
    setAvgData((prevData) => {
      return {
        ...prevData,
        Avg_Cones_Auto_L: search(matchDataArr, "autoLowConeCount"),
      };
    });

    setAvgData((prevData) => {
      return {
        ...prevData,
        Avg_Cubes_Tele_H: search(matchDataArr, "teleHighCubeCount"),
      };
    });
    setAvgData((prevData) => {
      return {
        ...prevData,
        Avg_Cubes_Tele_M: search(matchDataArr, "teleMidCubeCount"),
      };
    });
    setAvgData((prevData) => {
      return {
        ...prevData,
        Avg_Cubes_Tele_L: search(matchDataArr, "teleLowCubeCount"),
      };
    });
    setAvgData((prevData) => {
      return {
        ...prevData,
        Avg_Cones_Tele_H: search(matchDataArr, "teleHighConeCount"),
      };
    });
    setAvgData((prevData) => {
      return {
        ...prevData,
        Avg_Cones_Tele_M: search(matchDataArr, "teleMidConeCount"),
      };
    });
    setAvgData((prevData) => {
      return {
        ...prevData,
        Avg_Cones_Tele_L: search(matchDataArr, "teleLowConeCount"),
      };
    });

    const pitq = query(
      collection(db, "test-p"),
      where("teamNumber", "==", queryTeam)
    );

    const pitSnapshot = await getDocs(pitq);
    var pitDataArr = [];
    pitSnapshot.forEach((match) => {
      pitDataArr.push(match.data());
    });
    if (pitDataArr.length > 0) {
      setPitData(pitDataArr[0]);
    }

    if (matchDataArr.length === 0) {
      setShowModal(true);
    }

    var subsnap1 = query(
      collection(db, "test_s"),
      where("teamNumber1", "==", queryTeam)
    );
    subsnap1 = await getDocs(subsnap1);

    var subq1 = [];

    subsnap1.forEach((match) => {
      subq1.push(match.data());
    });

    var subq2 = [];
    var subsnap2 = query(
      collection(db, "test_s"),
      where("teamNumber2", "==", queryTeam)
    );
    subsnap2 = await getDocs(subsnap2);

    subsnap2.forEach((match) => {
      subq2.push(match.data());
    });

    var subq3 = [];

    var subsnap3 = query(
      collection(db, "test_s"),
      where("teamNumber3", "==", queryTeam)
    );

    subsnap3 = await getDocs(subsnap3);

    subsnap3.forEach((match) => {
      subq3.push(match.data());
    });

    var defenseStr = "";
    var driverStr = "";
    var initials = new Object();
    initials = {
      "jc": "Julio",
      "jd": "Joshua D",
      "lf": "Leah",
      "af": "Anthony",
      "lg": "Leison",
      "emh": "Emi",
      "jj": "Jake",
      "mk": "Michael K",
      "tl": "Teo(dor)",
      "cm": "Cole M",
      "jm": "Joushua M",
      "fr": "Faris",
      "ms": "Max",
      "os": "Om",
      "as": "Angela",
      "rt": "Richie",
      "rv": "Robert(o)",
      "az": "Allan",
      "tz": "Tony",
      "tb": "Theadin",
      "tc": "Tyrus",
      "yd": "Yichen",
      "jud": "Julia",
      "ad": "Andrea",
      "ee": "Eliot",
      "ch": "Cole H",
      "ep": "Elisa",
      "ar": "Ashir",
      "ns": "Nicole",
      "gt": "Gavin",
      "aw": "Ani",
      "sa": "Sahil",
      "la": "Laksh(ya)",
      "mc": "Michael C",
      "ld": "Leo",
      "ke": "Kyle",
      "pg": "Paola",
      "elh": "Ellery",
      "eh": "Edwin",
      "ih": "Ian",
      "hh": "Ian",
      "hl": "Henry",
      "cn": "Cameron",
      "ap": "Arnav",
      "cs": "Cici",
      "rs": "Cici",
      "ay": "Adam",
      "ac": "Alex",
      "joj": "Johann",
      "sp": "Saara",
      "mes": "Mehaan",
      "kt": "Kaushik",
    };

    for (let i = 0; i < subq1.length; i++) {
      defenseStr = defenseStr + initials[subq1[i].name.toLowerCase()] + " (" + subq1[i].MatchNo + "): ";
      defenseStr = defenseStr + subq1[i].defense1 + " // ";

      driverStr = driverStr + initials[subq1[i].name.toLowerCase()] + " (" + subq1[i].MatchNo + "): ";
      driverStr = driverStr + subq1[i].driverCapacity1 + " // ";
    }

    for (let i = 0; i < subq2.length; i++) {
      defenseStr = defenseStr + initials[subq2[i].name.toLowerCase()]  + " (" + subq2[i].MatchNo + "): ";
      defenseStr = defenseStr + subq2[i].defense2 + "\n";

      driverStr = driverStr + initials[subq2[i].name.toLowerCase()] +  " (" + subq2[i].MatchNo + "): ";
      driverStr = driverStr + subq2[i].driverCapacity2 + "\n";
    }

    for (let i = 0; i < subq3.length; i++) {
      defenseStr = defenseStr + initials[subq3[i].name.toLowerCase()] + " (" + subq3[i].MatchNo + "): ";
      defenseStr = defenseStr + subq3[i].defense3 + "\n";

      driverStr = driverStr + initials[subq3[i].name.toLowerCase()]  + " (" + subq3[i].MatchNo + "): ";
      driverStr = driverStr + subq3[i].driverCapacity3 + "\n";
    }

    setRealDefense(defenseStr);
    setRealDriver(driverStr);
    setAvgData((prevData) => {
      return {
        ...prevData,
        Avg_Cubes_Auto_H: search(matchDataArr, "autoHighCubeCount"),
      };
    });
    setAvgData((prevData) => {
      return {
        ...prevData,
        Avg_Cubes_Auto_M: search(matchDataArr, "autoMidCubeCount"),
      };
    });
    setAvgData((prevData) => {
      return {
        ...prevData,
        Ground_Intake: search(matchDataArr, "groundIntakes"),
      };
    });
    setAvgData((prevData) => {
      return {
        ...prevData,
        Avg_Cubes_Auto_L: search(matchDataArr, "autoLowCubeCount"),
      };
    });
    setAvgData((prevData) => {
      return {
        ...prevData,
        Avg_Cones_Auto_H: search(matchDataArr, "autoHighConeCount"),
      };
    });
    setAvgData((prevData) => {
      return {
        ...prevData,
        Avg_Cones_Auto_M: search(matchDataArr, "autoMidConeCount"),
      };
    });
    setAvgData((prevData) => {
      return {
        ...prevData,
        Avg_Cones_Auto_L: search(matchDataArr, "autoLowConeCount"),
      };
    });

    setAvgData((prevData) => {
      return {
        ...prevData,
        Avg_Cubes_Tele_H: search(matchDataArr, "teleHighCubeCount"),
      };
    });
    setAvgData((prevData) => {
      return {
        ...prevData,
        Avg_Cubes_Tele_M: search(matchDataArr, "teleMidCubeCount"),
      };
    });
    setAvgData((prevData) => {
      return {
        ...prevData,
        Avg_Cubes_Tele_L: search(matchDataArr, "teleLowCubeCount"),
      };
    });
    setAvgData((prevData) => {
      return {
        ...prevData,
        Avg_Cones_Tele_H: search(matchDataArr, "teleHighConeCount"),
      };
    });
    setAvgData((prevData) => {
      return {
        ...prevData,
        Avg_Cones_Tele_M: search(matchDataArr, "teleMidConeCount"),
      };
    });
    setAvgData((prevData) => {
      return {
        ...prevData,
        Avg_Cones_Tele_L: search(matchDataArr, "teleLowConeCount"),
      };
    });
    // setAvgData(prevData => {return {...prevData, Ground_Intakes: search(matchDataArr, "groundIntakes") }})
    setTotalScore(total(matchDataArr));
    dispatch({ type: "ADD_DATA", data: matchDataArr });
    var docks = 0;
    var engage = 0;
    for (let i = 0; i < matchDataArr.length; i++) {
      if (matchDataArr[i].docked) {
        docks = docks + 1;
      }

      if (matchDataArr[i].engage) {
        engage = engage + 1;
      }
    }

    setrealDocked(Math.round((docks / matchDataArr.length) * 100) / 100);
    setrealEngaged(Math.round((engage / matchDataArr.length) * 100) / 100);
  }, [queryTeam]);
  
  const [state, dispatch] = React.useReducer(exampleReducer, {
    column: null,
    data: [],
    direction: null,
  });

  const { column, data, direction } = state;
  function search(data, param) {
    var avg = 0;
    for (let i = 0; i < data.length; i++) {
      avg += data[i][param];
    }
    return (avg / data.length).toFixed(1);
  }
  function total(data) {
    var out = 0;
    var values = {
      autoHighCubeCount: 6,
      autoMidCubeCount: 4,
      autoLowCubeCount: 3,
      autoHighConeCount: 6,
      autoMidConeCount: 4,
      autoLowConeCount: 3,
      teleHighCubeCount: 5,
      teleMidCubeCount: 3,
      teleLowCubeCount: 2,
      teleHighConeCount: 5,
      teleMidConeCount: 3,
      teleLowConeCount: 2,
    };
    for (let i = 0; i < data.length; i++) {
      var k = Object.keys(data[i]);
      for (let j = 0; j < k.length; j++) {
        if (Object.keys(values).indexOf(k[j]) != -1) {
          out += data[i][k[j]] * values[k[j]];
        }
      }
    }
    setTotalScore((out / data.length).toFixed(1));
  }

  return (
    <Container>
      <Header as="h1" style={{ textAlign: "center", margin: "3px" }}>
        Team Lookup
      </Header>
      <Form style={{ marginTop: 15 }}>
        <Form.Group unstackable>
          <Form.Input
            value={teamNumber}
            onChange={(e) => setTeamNumber(e.target.value)}
          />
          <Form.Field style={{ alignSelf: "flexEnd" }}>
            <Button type="submit" onClick={() => setQueryTeam(teamNumber)}>names
              Search
            </Button>
            <Button type="submit" onClick={() => window.open('https://www.thebluealliance.com/team/'+teamNumber+'/2023', '_blank').focus()}>
              To TBA
            </Button>
          </Form.Field>
        </Form.Group>
      </Form>
      <Container style={{ display: "flex" }}>
        <Container>
          <Header style={{ marginLeft: 10 }} as="h3">
            stats
          </Header>
          <label>Scouters: {namesList.map((item, index) => {return<label key={index}>{item} </label>})}
          </label>
          <Table celled small collapsing basic stackable>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Can Shelf Intake</Table.Cell>
                <Table.Cell>{String(pitData.shelfIntake)}</Table.Cell>

                <Table.Cell>Has Vision</Table.Cell>
                <Table.Cell>{String(pitData.vision)}</Table.Cell>
                <Table.Cell>Can Balance</Table.Cell>
                <Table.Cell>{String(pitData.balance)}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Avg Cones Auto</Table.Cell>
                <Table.Cell>
                  H {avgData["Avg_Cones_Auto_H"]} / M{" "}
                  {avgData["Avg_Cones_Auto_M"]} / L{" "}
                  {avgData["Avg_Cones_Auto_L"]}
                </Table.Cell>
                <Table.Cell>Avg Cubes Auto</Table.Cell>
                <Table.Cell>
                  H {avgData["Avg_Cubes_Auto_H"]} / M
                  {avgData["Avg_Cubes_Auto_M"]} / L{" "}
                  {avgData["Avg_Cubes_Auto_L"]}
                </Table.Cell>
                <Table.Cell>Avg Cones Tele</Table.Cell>
                <Table.Cell>
                  H {avgData["Avg_Cones_Tele_H"]} / M{" "}
                  {avgData["Avg_Cones_Tele_M"]} / L{" "}
                  {avgData["Avg_Cones_Tele_L"]}
                </Table.Cell>
                <Table.Cell>Avg Cones Tele</Table.Cell>
                <Table.Cell>
                  H {avgData["Avg_Cones_Tele_H"]} / M{" "}
                  {avgData["Avg_Cones_Tele_M"]} / L{" "}
                  {avgData["Avg_Cones_Tele_L"]}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Avg Cones Tele</Table.Cell>
                <Table.Cell>
                  H {avgData["Avg_Cones_Tele_H"]} / M{" "}
                  {avgData["Avg_Cones_Tele_M"]} / L{" "}
                  {avgData["Avg_Cones_Tele_L"]}
                </Table.Cell>
                <Table.Cell>Avg Cubes Tele</Table.Cell>
                <Table.Cell>
                  H {avgData["Avg_Cubes_Tele_H"]} / M{" "}
                  {avgData["Avg_Cubes_Tele_M"]} / L{" "}
                  {avgData["Avg_Cubes_Tele_L"]}
                </Table.Cell>
                <Table.Cell>Avg Cubes Tele</Table.Cell>
                <Table.Cell>
                  H {avgData["Avg_Cubes_Tele_H"]} / M{" "}
                  {avgData["Avg_Cubes_Tele_M"]} / L{" "}
                  {avgData["Avg_Cubes_Tele_L"]}
                </Table.Cell>
                <Table.Cell>Avg Ground Intake</Table.Cell>
                <Table.Cell>{avgData["Ground_Intake"]}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Avg Dock</Table.Cell>
                <Table.Cell>{realDocked}</Table.Cell>
                <Table.Cell>Avg Engage</Table.Cell>
                <Table.Cell>{realEngaged}</Table.Cell>

                <Table.Cell>Ranking</Table.Cell>
                <Table.Cell></Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell># of Motors</Table.Cell>
                <Table.Cell>{String(pitData.motors)}</Table.Cell>

                <Table.Cell>Drivetrain</Table.Cell>
                <Table.Cell>{pitData.drive}</Table.Cell>
                <Table.Cell>Avg Total Score</Table.Cell>
                <Table.Cell>{totalScore}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Container>
        <Container>
          <Header style={{ marginLeft: 20 }} as="h3">
            comments
          </Header>
          <Header style={{ marginLeft: 20 }} as="h5">
            defense
          </Header>
          <Segment style={{ marginLeft: 20 }}>{realDefense}</Segment>
          <Header style={{ marginLeft: 20 }} as="h5">
            driver skills
          </Header>
          <Segment style={{ marginLeft: 20 }}>{realDriver}</Segment>
        </Container>
        <Form.Group style={{ marginLeft: 20 }}>
          <Header style={{ marginLeft: 20 }}>Auto Starts</Header>
          <CanvasDisplay data={coords}></CanvasDisplay>
        </Form.Group>
      </Container>
      <Container>
        <Header as="h3">Matches:</Header>
      </Container>
      <Divider></Divider>
      <label>what to graph</label>
      <Form.Select
        value={graph}
        options={graphOptions}
        onChange={(e) => handleChart(e.target)}
      ></Form.Select>
      <LineChart data={chartData} curve={false} />
      <Modal
        size="mini"
        centered={false}
        open={showModal}
        onClose={() => setShowModal(false)}
      >
        <Modal.Header>Team not found</Modal.Header>
        <Modal.Content>
          <p>{queryTeam} not found</p>
        </Modal.Content>
        <Modal.Actions>
          <Button positive onClick={() => setShowModal(false)}>
            OK
          </Button>
        </Modal.Actions>
      </Modal>
    </Container>
  );
};

export default TeamLookup;
