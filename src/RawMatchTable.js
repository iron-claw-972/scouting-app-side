import React, { useEffect } from "react";
import _ from "lodash";
import { Card, Header, Container, Divider } from "semantic-ui-react";

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
      <Header>
        Averages Calculated! (Could take a while if the wifi's bad)
      </Header>
    </Container>
  );
};

export default RawMatchTable;
