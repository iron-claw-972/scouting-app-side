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
  Input,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
const NewTeamPages = () => {
  return (
    <Container>
      <Header style={{ textAlign: "center", margin: "2px" }} as="h1">
        Team Pages
      </Header>
      <label>-Team 1-</label>
      <Input fluid size="small" placeholder="" />
      <label>-Team 2-</label>
      <Input fluid size="small" placeholder="" />
      <label>-Team 3-</label>
      <Input fluid size="small" placeholder="" />
    </Container>
  );
};

export default NewTeamPages;
