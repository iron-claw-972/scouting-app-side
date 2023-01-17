import React, { useState, useEffect } from "react";
import {
  Grid,
  Label,
  List,
  LabelDetail,
  Table,
  Container,
  Header,
} from "semantic-ui-react";

const TeamTab = ({ teamdata }) => {
  return (
    <Container>
      <Table basic compact small>
        <Table.Row>
          <Table.Cell>Rank</Table.Cell>
          <Table.Cell>Team</Table.Cell>
          <Table.Cell>Avg Match</Table.Cell>
          <Table.Cell>Avg Hangar</Table.Cell>
          <Table.Cell>Auto</Table.Cell>
          <Table.Cell>Record</Table.Cell>
          <Table.Cell>Played</Table.Cell>
        </Table.Row>
      </Table>
    </Container>
  );
};
const TeamList = () => {
  const compcode = "casj2022";
  const xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "https://www.thebluealliance.com/api/v3/event/" + compcode + "/matches"
  );
  xhr.send();
  xhr.responseType = "json";
  xhr.onload = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      const data = xhr.response;
    } else {
      console.log(`Error: ${xhr.status}`);
    }
  };
  return (
    <Container>
      <Header as="h1" style={{ textAlign: "center", margin: "3px" }}>
        Ranking
      </Header>
      <Header as="h5" style={{ textAlign: "center", margin: "3px" }}>
        Rankings are ~2 matches behind real rankings
      </Header>
      <Table basic compact small sortable unstackable singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Rank</Table.HeaderCell>
            <Table.HeaderCell>Team</Table.HeaderCell>
            <Table.HeaderCell>Avg Match</Table.HeaderCell>
            <Table.HeaderCell>Avg Hangar</Table.HeaderCell>
            <Table.HeaderCell>Auto</Table.HeaderCell>
            <Table.HeaderCell>Record</Table.HeaderCell>
            <Table.HeaderCell>Played</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
    </Container>
  );
};

export default TeamList;
