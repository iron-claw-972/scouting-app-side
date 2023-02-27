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
      Scouting App 2023
    </Header>

    <Header as="h4" style={{ textAlign: "center" }}>
      BULLETIN: *clickity click click click* the scouting app is under
      construction!
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

      <Link to="/matchscoutsubjective" style={{ margin: 10 }}>
        <Card color="orange">
          <Card.Content>
            <Card.Header>Match Scout (Subjective)</Card.Header>
            <Card.Description>
              Collect subjective data on an alliance during a match
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
      <Link to="/scanmatchscoutdata" style={{ margin: 10 }}>
        <Card>
          <Card.Content>
            <Card.Header content="Scan Match data" />
            <Card.Description content="Scan the QR code for Match Data" />
          </Card.Content>
        </Card>
      </Link>

      <Link to="/scanpitscoutdata" style={{ margin: 10 }}>
        <Card>
          <Card.Content>
            <Card.Header content="Scan Pit and Prescout data" />
            <Card.Description content="Scan the QR code for Pit Data" />
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
      <Link to="/teamlist" style={{ margin: 10 }}>
        <Card>
          <Card.Content
            header="Picklist & Teams List"
            description="Picklist and current rankings"
          />
        </Card>
      </Link>
      <Link to={`/teampages`} style={{ margin: 10 }}>
        <Card>
          <Card.Content
            header="Match Display"
            description="All about a ... match"
          />
        </Card>
      </Link>

      <Link to={`/teamlookup/`} style={{ margin: 10 }}>
        <Card>
          <Card.Content
            header="Team Lookup"
            description="All about a ... team"
          />
        </Card>
      </Link>

      <Link to="/matchlist" style={{ margin: 10 }}>
        <Card>
          <Card.Content header="Match List" description="List of matches" />
        </Card>
      </Link>

      <Link to="/pitdisplay" style={{ margin: 10 }}>
        <Card>
          <Card.Content header="Pit Display" description="-" />
        </Card>
      </Link>
      <Link to="/datadisplay" style={{ margin: 10 }}>
        <Card>
          <Card.Content
            header="Credits and Notes"
            description="And to all the scouters: Congratulations!"
          />
        </Card>
      </Link>

      <Link style={{ margin: 10 }}>
        <Card href={"https://www.thebluealliance.com/event/2023caph#rankings"}>
          <Card.Content
            header="Rankings and Averages"
            description="Quick link to blue alliance"
          />
        </Card>
      </Link>
    </Card.Group>
  </Container>
);

export default Home;
