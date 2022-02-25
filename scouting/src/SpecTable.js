import React from "react";
import { Table } from "semantic-ui-react";

const returnTableRows = (specData) => {
  return specData.map((row) => {
    return <Table.Row>{returnTableCells(row)}</Table.Row>;
  });
};

const returnTableCells = (row) => {
  return row.map((e) => {
    return <Table.Cell>{e}</Table.Cell>;
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
const SpecTable = ({ numColumns, headerName, specData }) => (
  <Table collapsing celled striped style={{ margin: "10px", maxWidth: "80%" }}>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell colSpan={numColumns}>{headerName}</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>{returnTableRows(specData)}</Table.Body>
  </Table>
);

export default SpecTable;
