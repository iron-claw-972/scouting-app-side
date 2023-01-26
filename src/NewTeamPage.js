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
} from "semantic-ui-react";
import { Link } from "react-router-dom";
const NewTeamPages = () => {
  return (
    <Container>
      <Header style={{ textAlign: "center", margin: "2px" }} as="h1">
        Team Pages
        <Header as="h5" style={{ textAlign: "center" }}>
          the man in the chair, automated entirely by software
        </Header>
      </Header>
      <Divider hidden></Divider>

      <label> -Team 1-</label>
      <Input size="small" placeholder="" />
      <label> -Team 2-</label>
      <Input size="small" placeholder="" />

      <label> -Team 3-</label>
      <Input size="small" placeholder="" />
    </Container>
  );
};

export default NewTeamPages;
