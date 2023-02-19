import React, { useState, useEffect } from "react";
import {
  Divider,
  Label,
  List,
  LabelDetail,
  Table,
  Container,
  Header,
  Button,
  Form,
  Input,
} from "semantic-ui-react";

import { LineChart, PieChart } from "react-chartkick";

import { Link } from "react-router-dom";

const TeamTab = ({ teamdata, oprs, team }) => {
  const [teamList, setTeamList] = useState({});
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
          <Table.Cell></Table.Cell>
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
  fetch(8).then((res) => res.json()); // the .json() method parses the JSON response into a JS object literal
  console.log(res);

  return (
    <Container>
      <Header as="h1" style={{ textAlign: "center", margin: "3px" }}>
        All teams + Picklist Editor
      </Header>
      <Header as="h5" style={{ textAlign: "center", margin: "3px" }}>
        (Rankings are ~2 matches behind real rankings during comp)
      </Header>

      <label> -Team 1-</label>
      <Input size="small" placeholder="" />
      <label> -Team 2-</label>
      <Input size="small" placeholder="" />
      <label> -Team 3-</label>
      <Input size="small" placeholder="" />

      <Divider hidden></Divider>
      <label>what to graph</label>

      <Form.Select></Form.Select>
      <LineChart></LineChart>
      <Divider></Divider>
      <Header as="h3">Picklist:</Header>
      <Divider></Divider>
      <Table basic compact small sortable unstackable singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Rank</Table.HeaderCell>
            <Table.HeaderCell>Team</Table.HeaderCell>
            <Table.HeaderCell>Avg Match</Table.HeaderCell>
            <Table.HeaderCell>Avg Charge</Table.HeaderCell>
            <Table.HeaderCell>Auto</Table.HeaderCell>
            <Table.HeaderCell>Record</Table.HeaderCell>
            <Table.HeaderCell>Played</Table.HeaderCell>
            <Table.HeaderCell>Add 2 Picklist</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
    </Container>
  );
};

export default TeamList;
