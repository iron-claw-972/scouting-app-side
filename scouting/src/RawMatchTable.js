import React, { useEffect } from "react";
import _ from "lodash";
import { Table } from "semantic-ui-react";
import { getFirestore, collection, getDocs } from "firebase/firestore";

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

const RawMatchTable = () => {
  useEffect(async () => {
    const matchDataArr = [];
    const db = getFirestore();
    const matchSnapshot = await getDocs(collection(db, "match_svr"));
    matchSnapshot.forEach((match) => {
      matchDataArr.push(match.data());
    });
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
    <Table sortable celled striped unstackable compact="very" size="small">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell
            sorted={column === "MatchNo" ? direction : null}
            onClick={() => dispatch({ type: "CHANGE_SORT", column: "MatchNo" })}
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
            onClick={() => dispatch({ type: "CHANGE_SORT", column: "AutoLH" })}
          >
            AutoLH
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === "AutoUH" ? direction : null}
            onClick={() => dispatch({ type: "CHANGE_SORT", column: "AutoUH" })}
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
  );
};

export default RawMatchTable;
