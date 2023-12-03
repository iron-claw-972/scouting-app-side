import React from "react";
import { Card, Header, Container, Divider } from "semantic-ui-react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
/*The main page
Pretty intuitive thanks to semantic-ui-react, which gives most of the
tags I've used below.
*/
const Home = () => (
  <Container fluid>
    <Header textAlign="center" as="h1" style={{ marginTop: 10 }}>
      ScoutingApp Min -- Iron Claw 972
    </Header>

    <Header as="h4" style={{ textAlign: "center" }}>
      Six weeks of labor hinges on your scouting data. No pressure!
    </Header>
    <Card.Group
      centered
      stackable
      textAlign="center"
      style={{ margin: "10px" }}
    >
      <Link to="/matchscout" style={{ margin: 10 }}>
        <Card color="orange">
          <Card.Content>
            <Card.Header>Match Scout (Objective)</Card.Header>
            <Card.Description>
              Collect data on a Robot during a match
            </Card.Description>
          </Card.Content>
        </Card>
      </Link>

      <Link to="/pitscout" style={{ margin: 10 }}>
        <Card color="orange">
          <Card.Content>
            <Card.Header content="Pit Scout" />
            <Card.Description content="It's better than a sheet of paper™" />
          </Card.Content>
        </Card>
      </Link>
    </Card.Group>

    <Divider section />

    <Card.Group
      centered
      stackable
      textAlign="center"
      style={{ margin: "10px" }}
    >
      <Link to="/Credits" style={{ margin: 10 }}>
        <Card>
          <Card.Content
            header="Credits and Notes"
            description="And to all the scouters: Congratulations!"
          />
        </Card>
      </Link>

      <Link style={{ margin: 10 }}>
        <Card href={"https://www.thebluealliance.com/event/2023arc#rankings"}>
          <Card.Content
            header="Blue Alliance"
            description="Quick link to blue alliance"
          />
        </Card>
      </Link>
    </Card.Group>
  </Container>
);

export default Home;
