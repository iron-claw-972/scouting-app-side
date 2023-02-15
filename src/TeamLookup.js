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
  Image,
} from "semantic-ui-react";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { LineChart, PieChart } from "react-chartkick";
import "chartkick/chart.js";
import Textbox from "./Textbox.js";
import CanvasChooser from "./CanvasChooser";

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
  var matchDataArr = []
  const [mousePos, setMousePos] = useState({});

  const [teamNumber, setTeamNumber] = useState("");
  const [queryTeam, setQueryTeam] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [avgData, setAvgData] = useState({})
  useEffect(async () => {
    console.log("in useEffect queryTeam is ", queryTeam);
    if (queryTeam === "") return;
    matchDataArr = [];

  const [pitData, setPitData] = useState([{}]);

  useEffect(async () => {
    console.log("in useEffect queryTeam is ", queryTeam);
    if (queryTeam === "") return;
    const matchDataArr = [];
    const pitDataArr = [];

    const db = getFirestore();
    const q = query(
      collection(db, "test"),
      where("teamNumber", "==", queryTeam)
    );
    const matchSnapshot = await getDocs(q);
    matchSnapshot.forEach((match) => {
      matchDataArr.push(match.data());
    });

    const pitq = query(
      collection(db, "test-p"),
      where("teamNumber", "==", queryTeam)
    );
    const pitSnapshot = await getDocs(pitq);
    pitSnapshot.forEach((match) => {
      pitDataArr.push(match.data());
    });
    setPitData(pitDataArr);
    console.log(pitData);

    if (matchDataArr.length === 0) {
      setShowModal(true);
    }
    console.log(JSON.stringify(matchDataArr))
    setAvgData(prevData => {return {...prevData, Avg_Cubes_Auto_H: search(matchDataArr, "autoHighCubeCount") }})
    setAvgData(prevData => {return {...prevData, Avg_Cubes_Auto_M: search(matchDataArr, "autoMidCubeCount") }})
    setAvgData(prevData => {return {...prevData, Avg_Cubes_Auto_L: search(matchDataArr, "autoLowCubeCount") }})
    setAvgData(prevData => {return {...prevData, Avg_Cones_Auto_H: search(matchDataArr, "autoHighConeCount") }})
    setAvgData(prevData => {return {...prevData, Avg_Cones_Auto_M: search(matchDataArr, "autoMidConeCount") }})
    setAvgData(prevData => {return {...prevData, Avg_Cones_Auto_L: search(matchDataArr, "autoLowConeCount") }})

    setAvgData(prevData => {return {...prevData, Avg_Cubes_Tele_H: search(matchDataArr, "teleHighCubeCount") }})
    setAvgData(prevData => {return {...prevData, Avg_Cubes_Tele_M: search(matchDataArr, "teleMidCubeCount") }})
    setAvgData(prevData => {return {...prevData, Avg_Cubes_Tele_L: search(matchDataArr, "teleLowCubeCount") }})
    setAvgData(prevData => {return {...prevData, Avg_Cones_Tele_H: search(matchDataArr, "teleHighConeCount") }})
    setAvgData(prevData => {return {...prevData, Avg_Cones_Tele_M: search(matchDataArr, "teleMidConeCount") }})
    setAvgData(prevData => {return {...prevData, Avg_Cones_Tele_L: search(matchDataArr, "teleLowConeCount") }})
    // setAvgData(prevData => {return {...prevData, Ground_Intakes: search(matchDataArr, "groundIntakes") }})
    dispatch({ type: "ADD_DATA", data: matchDataArr });


  }, [queryTeam]);

  const [state, dispatch] = React.useReducer(exampleReducer, {
    column: null,
    data: [],
    direction: null,
  });

  const { column, data, direction } = state;
  function search(data, param) {
    var avg = 0
    for (let i = 0; i < data.length; i++) {
      avg += data[i][param]
    }
    return avg / data.length
  }
  const chartData = [

  ];
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
            <Button type="submit" onClick={() => setQueryTeam(teamNumber)}>
              Search
            </Button>
          </Form.Field>
        </Form.Group>
      </Form>
      <Container style={{ display: "flex" }}>
        <Container>
          <Header style={{ marginLeft: 10 }} as="h3">
            stats
          </Header>
          <Table celled small collapsing basic stackable>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Can Shelf Intake</Table.Cell>

                <Table.Cell>{String(pitData[0].shelfIntake)}</Table.Cell>

                <Table.Cell>Has Vision</Table.Cell>
                <Table.Cell>{String(pitData[0].vision)}</Table.Cell>
                <Table.Cell>Can Balance</Table.Cell>
                <Table.Cell>{String(pitData[0].balance)}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Avg Cones Auto</Table.Cell>
                <Table.Cell>
                  H {avgData["Avg_Cones_Auto_H"]} M {avgData["Avg_Cones_Auto_M"]} L {avgData["Avg_Cones_Auto_L"]}
                </Table.Cell>
                <Table.Cell>Avg Cubes Auto</Table.Cell>
                <Table.Cell>
                H {avgData["Avg_Cubes_Auto_H"]} M {avgData["Avg_Cubes_Auto_M"]} L {avgData["Avg_Cubes_Auto_L"]}
                </Table.Cell>
                <Table.Cell>Avg Cones Tele</Table.Cell>
                <Table.Cell>
                H {avgData["Avg_Cones_Tele_H"]} M {avgData["Avg_Cones_Tele_M"]} L {avgData["Avg_Cones_Tele_L"]}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Avg Cones Tele</Table.Cell>
                <Table.Cell>
                H {avgData["Avg_Cones_Tele_H"]} M {avgData["Avg_Cones_Tele_M"]} L {avgData["Avg_Cones_Tele_L"]}
                </Table.Cell>
                <Table.Cell>Avg Cubes Tele</Table.Cell>
                <Table.Cell>
                H {avgData["Avg_Cubes_Tele_H"]} M {avgData["Avg_Cubes_Tele_M"]} L {avgData["Avg_Cubes_Tele_L"]}
                </Table.Cell>
                <Table.Cell>Avg Ground Intake</Table.Cell>
                <Table.Cell>
                  H { } M { } L { }
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Avg Dock</Table.Cell>
                <Table.Cell>{ }</Table.Cell>
                <Table.Cell>Avg Engage</Table.Cell>
                <Table.Cell>{ }</Table.Cell>

                <Table.Cell>Ranking</Table.Cell>
                <Table.Cell>{ }</Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell># of Motors</Table.Cell>

                <Table.Cell>{pitData[0].motors}</Table.Cell>

                <Table.Cell>Drivetrain</Table.Cell>
                <Table.Cell>{ }</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Container>
        <Container>
          <Header style={{ marginLeft: 10 }} as="h3">
            comments
          </Header>
          <Header style={{ marginLeft: 10 }} as="h5">
            defense
          </Header>
          <Segment style={{ marginLeft: 10 }}>
            {" "}
            lorem impsum dolor lorem impsum dolor lorem impsum dolor lorem lorem
            impsum dolor lorem impsum dolor lorem impsum dolor lorem lorem
            impsum dolor lorem impsum dolor lorem impsum dolor lorem lorem
            impsum dolor lorem impsum dolor lorem impsum dolor lorem
          </Segment>
          <Header style={{ marginLeft: 10 }} as="h5">
            driver skillz
          </Header>
          <Segment style={{ marginLeft: 10 }}>
            lorem impsum dolor lorem impsum dolor lorem impsum dolor lorem
            impsum dolor lorem impsum dolor
          </Segment>
        </Container>
        <Container>
          <Header>Auto Starts</Header>
          <CanvasChooser
            setMouseCoord={mousePos}
            getMouseCoord={{ x: 0, y: 0 }}
            style={{ marginLeft: 10 }}
          />
          <Divider></Divider>
          <Image src={pitData[0].dataUri}></Image>
        </Container>
      </Container>
      <Container>
        <Header as="h3">Matches:</Header>
      </Container>
      <Divider></Divider>
      <label>what to graph</label>
      <Form.Select></Form.Select>
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
