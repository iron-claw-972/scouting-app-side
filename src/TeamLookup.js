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
  const [teamNumber, setTeamNumber] = useState("");
  const [queryTeam, setQueryTeam] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(async () => {
    console.log("in useEffect queryTeam is ", queryTeam);
    if (queryTeam === "") return;
    const matchDataArr = [];
    const db = getFirestore();
    const q = query(
      collection(db, "match_svr"),
      where("teamNumber", "==", queryTeam)
    );
    const matchSnapshot = await getDocs(q);
    matchSnapshot.forEach((match) => {
      matchDataArr.push(match.data());
    });
    if (matchDataArr.length === 0) {
      setShowModal(true);
    }
    dispatch({ type: "ADD_DATA", data: matchDataArr });
  }, [queryTeam]);

  const [state, dispatch] = React.useReducer(exampleReducer, {
    column: null,
    data: [],
    direction: null,
  });

  const { column, data, direction } = state;

  let AutoLHData = {};
  let AutoUHData = {};
  let TeleopLHData = {};
  let TeleopUHData = {};
  let ClimbTimeData = {};
  for (let i = 0; i < data.length; i++) {
    const { MatchNo, AutoLH, AutoUH, TeleopLH, TeleopUH, ClimbTime } = data[i];
    AutoLHData = { ...AutoLHData, [MatchNo]: AutoLH };
    AutoUHData = { ...AutoUHData, [MatchNo]: AutoUH };
    TeleopLHData = { ...TeleopLHData, [MatchNo]: TeleopLH };
    TeleopUHData = { ...TeleopUHData, [MatchNo]: TeleopUH };
    ClimbTimeData = { ...ClimbTimeData, [MatchNo]: ClimbTime };
  }
  const chartData = [
    { name: "AutoLH", data: AutoLHData },
    { name: "AutoUH", data: AutoUHData },
    { name: "TeleopLH", data: TeleopLHData },
    { name: "TeleopUH", data: TeleopUHData },
    { name: "ClimbTime", data: ClimbTimeData },
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
          <Table celled small collapsing basic stackable>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Avg Cones Auto</Table.Cell>
                <Table.Cell>{}</Table.Cell>
                <Table.Cell>Avg Cubes Auto</Table.Cell>
                <Table.Cell>{}</Table.Cell>
                <Table.Cell>Has Vision</Table.Cell>
                <Table.Cell>{}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Avg Cones Tele</Table.Cell>
                <Table.Cell>{}</Table.Cell>
                <Table.Cell>Avg Cubes Tele</Table.Cell>
                <Table.Cell>{}</Table.Cell>
                <Table.Cell>Can Ground Intake</Table.Cell>
                <Table.Cell>{}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Avg Dock</Table.Cell>
                <Table.Cell>{}</Table.Cell>
                <Table.Cell>Avg Engage</Table.Cell>
                <Table.Cell>{}</Table.Cell>
                <Table.Cell>Can Shelf Intake</Table.Cell>
                <Table.Cell>{}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Avg Ground Intake</Table.Cell>
                <Table.Cell>{}</Table.Cell>
                <Table.Cell>Avg Mobility</Table.Cell>
                <Table.Cell>{}</Table.Cell>
                <Table.Cell>Can Balance</Table.Cell>
                <Table.Cell>{}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell># of Motors</Table.Cell>
                <Table.Cell>{}</Table.Cell>
                <Table.Cell>Drivetrain</Table.Cell>
                <Table.Cell>{}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Container>
        <Container>
          <Header as="h3">comments</Header>
          <Textbox></Textbox>
          <Textbox></Textbox>
          <Textbox></Textbox>
        </Container>
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
