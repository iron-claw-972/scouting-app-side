import React, { useEffect } from "react";
import _ from "lodash";
import { Table, Button, Container } from "semantic-ui-react";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";
function exampleReducer(state, action) {
  switch (action.type) {
    case "CHANGE_SORT":
      if (state.column === action.column) {
        console.log("1");

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

const RawMatchTable = () => {
  useEffect(async () => {
    const matchDataArr = [];
    var csvDataArr = [];
    csvDataArr.push([
      "MatchNo",
      "teamNumber",
      "autoHighConeCount",
      "autoHighCubeCount",
      "autoMidConeCount",
      "autoMidCubeCount",
      "autoLowConeCount",
      "autoLowCubeCount",
      "teleHighConeCount",
      "teleHighCubeCount",
      "teleMidConeCount",
      "teleMidCubeCount",
      "teleLowConeCount",
      "teleLowCubeCount",
      "defense",
      "driver",
      "name",
    ]);
    const db = getFirestore();
    const matchSnapshot = await getDocs(collection(db, "test"));
    var matchArr = [];
    var y;
    matchSnapshot.forEach((match) => {
      matchArr.push(match.data());
    });
    for (const match of matchArr) {
      var x = match;
      console.log(x);

      var tempData = [];

      tempData.push(x["MatchNo"]);
      tempData.push(x["teamNumber"]);
      tempData.push(x["autoHighConeCount"]);
      tempData.push(x["autoHighCubeCount"]);
      tempData.push(x["autoMidConeCount"]);
      tempData.push(x["autoMidCubeCount"]);
      tempData.push(x["autoLowConeCount"]);
      tempData.push(x["autoLowCubeCount"]);
      tempData.push(x["teleHighConeCount"]);
      tempData.push(x["teleHighCubeCount"]);
      tempData.push(x["teleMidConeCount"]);
      tempData.push(x["teleMidCubeCount"]);
      tempData.push(x["teleLowConeCount"]);

      tempData.push(x["teleLowCubeCount"]);
      tempData.push(x["name"]);

      const q1 = query(
        collection(db, "test_s"),
        where("MatchNo", "==", String(x["MatchNo"])),
        where("teamNumber1", "==", String(x["teamnumber"]))
      );
      var paraSnapshot = await getDocs(q1);
      console.log(paraSnapshot);
      paraSnapshot.forEach((match) => {
        y = match.data();
        console.log(y);

        tempData.push(y["defense1"]);
        tempData.push(y["driverCapacity1"]);
      });
      const q2 = query(
        collection(db, "test_s"),
        where("MatchNo", "==", String(x["MatchNo"])),
        where("teamNumber2", "==", String(x["teamnumber"]))
      );
      paraSnapshot = await getDocs(q2);
      paraSnapshot.forEach((match) => {
        y = match.data();
        tempData.push(y["defense2"]);
        tempData.push(y["driverCapacity2"]);
      });
      const q3 = query(
        collection(db, "test_s"),
        where("MatchNo", "==", String(x["MatchNo"])),
        where("teamNumber3", "==", String(x["teamnumber"]))
      );
      paraSnapshot = await getDocs(q3);
      paraSnapshot.forEach((match) => {
        y = match.data();
        tempData.push(y["defense3"]);
        tempData.push(y["driverCapacity3"]);
      });
      console.log(tempData);
      matchDataArr.push(match);
      console.log(match);
      csvDataArr.push(tempData);
    }
    console.log(csvDataArr);
    let csvContent =
      "data:text/csv;charset=utf-8," +
      csvDataArr.map((e) => e.join(",")).join("\n");
    var encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
    console.log(matchDataArr);
    dispatch({ type: "ADD_DATA", data: matchDataArr });
  }, []);

  const [state, dispatch] = React.useReducer(exampleReducer, {
    column: null,
    data: [],
    direction: null,
  });

  const { column, data, direction } = state;

  return (
    <Container>
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
              sorted={column === "autoHighConeCount" ? direction : null}
              onClick={() =>
                dispatch({ type: "CHANGE_SORT", column: "autoHighConeCount" })
              }
            >
              Auto High Cone
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "autoHighCubeCount" ? direction : null}
              onClick={() =>
                dispatch({ type: "CHANGE_SORT", column: "autoHighCubeCount" })
              }
            >
              Auto High Cube
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "autoMidConeCount" ? direction : null}
              onClick={() =>
                dispatch({ type: "CHANGE_SORT", column: "autoMidConeCount" })
              }
            >
              Auto Mid Cone
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "autoMidCubeCount" ? direction : null}
              onClick={() =>
                dispatch({ type: "CHANGE_SORT", column: "autoMidCubeCount" })
              }
            >
              Auto Mid Cube
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "autoLowConeCount" ? direction : null}
              onClick={() =>
                dispatch({ type: "CHANGE_SORT", column: "autoLowConeCount" })
              }
            >
              Auto Low Cone
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "autoLowCubeCount" ? direction : null}
              onClick={() =>
                dispatch({ type: "CHANGE_SORT", column: "autoLowCubeCount" })
              }
            >
              Auto Low Cube
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "teleHighConeCount" ? direction : null}
              onClick={() =>
                dispatch({ type: "CHANGE_SORT", column: "teleHighConeCount" })
              }
            >
              Tele High Cone
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "teleHighCubeCount" ? direction : null}
              onClick={() =>
                dispatch({ type: "CHANGE_SORT", column: "teleHighCubeCount" })
              }
            >
              Tele High Cube
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "teleMidConeCount" ? direction : null}
              onClick={() =>
                dispatch({ type: "CHANGE_SORT", column: "teleMidConeCount" })
              }
            >
              Tele Mid Cone
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "teleMidCubeCount" ? direction : null}
              onClick={() =>
                dispatch({
                  type: "CHANGE_SORT",
                  column: "ClimbteleMidCubeCountTime",
                })
              }
            >
              Tele Mid Cube
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "teleLowConeCount" ? direction : null}
              onClick={() =>
                dispatch({ type: "CHANGE_SORT", column: "teleLowConeCount" })
              }
            >
              Tele Low Cone
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "teleLowCubeCount" ? direction : null}
              onClick={() =>
                dispatch({ type: "CHANGE_SORT", column: "teleLowCubeCount" })
              }
            >
              Tele Low Cube
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "name" ? direction : null}
              onClick={() => dispatch({ type: "CHANGE_SORT", column: "name" })}
            >
              Name
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map(
            ({
              MatchNo,
              teamNumber,
              autoHighConeCount,
              autoHighCubeCount,
              autoMidConeCount,
              autoMidCubeCount,
              autoLowConeCount,
              autoLowCubeCount,
              teleHighConeCount,
              teleHighCubeCount,
              teleMidConeCount,
              teleMidCubeCount,
              teleLowConeCount,
              teleLowCubeCount,
              name,
            }) => (
              <Table.Row key={String(teamNumber) + "_" + String(MatchNo)}>
                <Table.Cell>{MatchNo}</Table.Cell>
                <Table.Cell>{teamNumber}</Table.Cell>
                <Table.Cell>{autoHighConeCount}</Table.Cell>
                <Table.Cell>{autoHighCubeCount}</Table.Cell>
                <Table.Cell>{autoMidConeCount}</Table.Cell>
                <Table.Cell>{autoMidCubeCount}</Table.Cell>
                <Table.Cell>{autoLowConeCount}</Table.Cell>
                <Table.Cell>{autoLowCubeCount}</Table.Cell>
                <Table.Cell>{teleHighConeCount}</Table.Cell>
                <Table.Cell>{teleHighCubeCount}</Table.Cell>
                <Table.Cell>{teleMidConeCount}</Table.Cell>
                <Table.Cell>{teleMidCubeCount}</Table.Cell>
                <Table.Cell>{teleLowConeCount}</Table.Cell>
                <Table.Cell>{teleLowCubeCount}</Table.Cell>
                <Table.Cell>{name}</Table.Cell>
              </Table.Row>
            )
          )}
        </Table.Body>
      </Table>
      <Button> export </Button>
    </Container>
  );
};

export default RawMatchTable;
