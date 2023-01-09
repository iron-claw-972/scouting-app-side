import React, { useEffect, useState } from "react";
import _ from "lodash";
import { Table, Container, Form, Button, Modal } from "semantic-ui-react";
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
      <Table sortable celled striped unstackable compact="very" size="small">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={column === "MatchNo" ? direction : null}
              onClick={() =>
                dispatch({ type: "CHANGE_SORT", column: "MatchNo" })
              }
            >
              MatchNo
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "teamNumber" ? direction : null}
              onClick={() =>
                dispatch({ type: "CHANGE_SORT", column: "teamNumber" })
              }
            >
              teamNumber
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "AutoLH" ? direction : null}
              onClick={() =>
                dispatch({ type: "CHANGE_SORT", column: "AutoLH" })
              }
            >
              AutoLH
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "AutoUH" ? direction : null}
              onClick={() =>
                dispatch({ type: "CHANGE_SORT", column: "AutoUH" })
              }
            >
              AutoUH
            </Table.HeaderCell>
            <Table.HeaderCell>AutoC</Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "TeleopLH" ? direction : null}
              onClick={() =>
                dispatch({ type: "CHANGE_SORT", column: "TeleopLH" })
              }
            >
              TeleopLH
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "TeleopUH" ? direction : null}
              onClick={() =>
                dispatch({ type: "CHANGE_SORT", column: "TeleopUH" })
              }
            >
              TeleopUH
            </Table.HeaderCell>
            <Table.HeaderCell>TeleopC</Table.HeaderCell>
            <Table.HeaderCell>Hangar</Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "ClimbTime" ? direction : null}
              onClick={() =>
                dispatch({ type: "CHANGE_SORT", column: "ClimbTime" })
              }
            >
              ClimbTime
            </Table.HeaderCell>
            <Table.HeaderCell>EndgameC</Table.HeaderCell>
            <Table.HeaderCell>color</Table.HeaderCell>
            <Table.HeaderCell>name</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map(
            ({
              MatchNo,
              teamNumber,
              AutoLH,
              AutoUH,
              AutoC,
              TeleopLH,
              TeleopUH,
              TeleopC,
              hangar,
              ClimbTime,
              EndgameC,
              color,
              name,
            }) => (
              <Table.Row key={MatchNo + teamNumber}>
                <Table.Cell>{MatchNo}</Table.Cell>
                <Table.Cell>{teamNumber}</Table.Cell>
                <Table.Cell>{AutoLH}</Table.Cell>
                <Table.Cell>{AutoUH}</Table.Cell>
                <Table.Cell>{AutoC}</Table.Cell>
                <Table.Cell>{TeleopLH}</Table.Cell>
                <Table.Cell>{TeleopUH}</Table.Cell>
                <Table.Cell>{TeleopC}</Table.Cell>
                <Table.Cell>{hangar}</Table.Cell>
                <Table.Cell>{ClimbTime}</Table.Cell>
                <Table.Cell>{EndgameC}</Table.Cell>
                <Table.Cell>{color}</Table.Cell>
                <Table.Cell>{name}</Table.Cell>
              </Table.Row>
            )
          )}
        </Table.Body>
      </Table>

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
