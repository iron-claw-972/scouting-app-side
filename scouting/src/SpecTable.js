//HI RICHIE
//THIS IS MY TABLE COMPONENT

import React from "react";
import { Table } from "semantic-ui-react";

//a table component. You can use this for any type of table.
//It takes in an array of arrays, and uses the values to make a table
const returnTableRows = (specData) => {
  return specData.map((row) => {
    return <Table.Row>{returnTableCells(row)}</Table.Row>;
  });
};

const returnTableCells = (row) => {
  return row.map((e) => {
    return <Table.Cell key={e.teamNumber}>{e}</Table.Cell>;
  });
};

/* specData is an array of array with each row as the spec data
   e.g. here numColumns is 3
   [
       [spec1, val1, comment1],
       [spec2, val2, comment2]
       ...
   ]
*/

const SpecTable = ({ numColumns, headerName, specData }) => {
  return (
    <Table
      collapsing
      celled
      striped
      style={{ margin: "10px", maxWidth: "80%" }}
    >
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell key={0} colSpan={numColumns}>
            {headerName}
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>{returnTableRows(specData)}</Table.Body>
    </Table>
  );
};

export default SpecTable;
