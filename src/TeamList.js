import React, { useState, useEffect } from "react";
import {
  Grid,
  Label,
  List,
  LabelDetail,
  Table,
  Container,
  Header,
  Button,
} from "semantic-ui-react";
import { Link } from "react-router-dom";

const TeamTab = ({ teamdata, oprs, team }) => {
  const record =
    teamdata.qual.ranking.record.losses +
    "-" +
    teamdata.qual.ranking.record.wins +
    "-" +
    teamdata.qual.ranking.record.losses;
  return (
    <Container>
      <Table basic compact small>
        <Table.Row>
          <Table.Cell>{teamdata.qual.ranking.rank}</Table.Cell>
          <Table.Cell>
            <Link to="/teampage">
              <Button>{team}</Button>
            </Link>
          </Table.Cell>
          <Table.Cell>{teamdata.qual.ranking.qual_average}</Table.Cell>
          <Table.Cell>smth else</Table.Cell>
          <Table.Cell>Auto</Table.Cell>
          <Table.Cell>{record}</Table.Cell>
          <Table.Cell>{teamdata.qual.ranking.matches_played}</Table.Cell>
        </Table.Row>
      </Table>
    </Container>
  );
};
const TeamList = () => {
  var res;
  fetch(
    "https://www.thebluealliance.com/api/v3/event/casj2022/teams/statuses"
  ).then((res) => res.json()); // the .json() method parses the JSON response into a JS object literal
  console.log(res);

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
            <Table.HeaderCell>{}</Table.HeaderCell>
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
