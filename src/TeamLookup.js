import React, { useEffect, useState } from "react";
import _ from "lodash";
import {
  Radio,
  Container,
  Form,
  Button,
  Modal,
  Header,
  Divider,
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
      <Container style={{ display: "inline-block" }}>
        <Container>
          <Form.Field inline>
            <label>last 4 matches only</label>
            <Radio
              style={{
                display: "inline-block",
                marginLeft: "20px",
                marginTop: "3px",
                alignSelf: "center",
              }}
              toggle
            />
          </Form.Field>
        </Container>
        <Container>
          <Header as="h3" style={{ display: "inline-block" }}>
            Avg Cones Auto:
          </Header>
          <Header
            as="h3"
            style={{ display: "inline-block", marginLeft: "50px" }}
          >
            Avg Cubes Auto:
          </Header>
        </Container>
        <Container>
          <Header style={{ display: "inline-block" }} as="h3">
            Avg Cubes Tele:
          </Header>
          <Header
            as="h3"
            style={{ display: "inline-block", marginLeft: "50px" }}
          >
            Avg Cubes Tele:
          </Header>
        </Container>
        <Container>
          <Header as="h3" style={{ display: "inline-block" }}>
            #Docks:
          </Header>
          <Header
            as="h3"
            style={{ display: "inline-block", marginLeft: "115px" }}
          >
            #Engage:
          </Header>
        </Container>

        <Container>
          <Header as="h3" style={{ display: "inline-block" }}>
            Avg Ground Intake:
          </Header>
          <Header
            as="h3"
            style={{ display: "inline-block", marginLeft: "40px" }}
          >
            Avg Links:
          </Header>
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
