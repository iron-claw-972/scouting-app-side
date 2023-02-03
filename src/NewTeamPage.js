import React, { useState, useEffect } from "react";
import {
  Grid,
  Label,
  List,
  LabelDetail,
  Divider,
  Container,
  Header,
  Button,
  Input,
  Form,
  Table,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
const NewTeamPages = () => {
  return (
    <Container>
      <Header style={{ textAlign: "center", margin: "2px" }} as="h1">
        Match Display
        <Header as="h5" style={{ textAlign: "center" }}>
          about a match.
        </Header>
      </Header>
      <Divider hidden></Divider>
      <label> Match# </label>
      <Input size="small" placeholder="" />
      <Table celled small collapsing basic stackable>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Header color="red">Red</Header>
            </Table.Cell>
            <Table.Cell>
              <Header color="blue">Blue</Header>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Container>
  );
};

export default NewTeamPages;
