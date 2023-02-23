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
            header="Picklist + Teams List"
            description="current ranking + link to teams list"
          />
        </Card>
      </Link>
      <Link to={`/teampages`} style={{ margin: 10 }}>
        <Card>
          <Card.Content
            header="Match Display"
            description="All you want to know about a match"
          />
        </Card>
      </Link>

      <Link to="/rawmatchtable" style={{ margin: 10 }}>
        <Card>
          <Card.Content
            header="Raw Matches Table"
            description="View Match data table "
          />
        </Card>
      </Link>

      <Link to={`/teamlookup/`} style={{ margin: 10 }}>
        <Card>
          <Card.Content
            header="Team Lookup"
            description="Data Visualization by team "
          />
        </Card>
      </Link>

      <Link to="/matchlist" style={{ margin: 10 }}>
        <Card>
          <Card.Content header="Match List" description="TBD" />
        </Card>
      </Link>

      <Link to="/pitdisplay" style={{ margin: 10 }}>
        <Card>
          <Card.Content
            header="Pit Display"
            description="Show other teams that our robot is better than their's"
          />
        </Card>
      </Link>
      <Link to="/teamlookup?team=972" style={{ margin: 10 }}>
        <Card>
          <Card.Content
            header="Credits and Notes"
            description="Rest here, oh scouter dear to my heart!"
          />
        </Card>
      </Link>

      <Link style={{ margin: 10 }}>
        <Card href={"https://www.thebluealliance.com/event/2023caph#rankings"}>
          <Card.Content
            header="Rankings and Averages"
            description="The Blue Alliance has lots of useful data, dont miss it"
          />
        </Card>
      </Link>
    </Card.Group>
  </Container>
);

export default Home;
