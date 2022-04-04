import React from "react";
import { Card, Header, Container, Divider } from "semantic-ui-react";
import { Link } from "react-router-dom";

/*The main page
Pretty intuitive thanks to semantic-ui-react, which gives most of the
tags I've used below.
*/
const Home = () => (
  <Container fluid>
    <Header textAlign="center" as="h1" style={{ marginTop: 10 }}>
      Scouting App 2022
    </Header>
    <Header textAlign="center" as="h3">
      "Through scouting, our nation achieves greatness" - Georgeham Lincolnton
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
            <Card.Header>Match Scout</Card.Header>
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
            <Card.Description content="Collect data on a robot's specs in the pit" />
          </Card.Content>
        </Card>
      </Link>
    </Card.Group>

    <Divider section />

    <Card.Group centered stackable textAlign="center" style={{ marginTop: 10 }}>
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

      <Link to="/teampages" style={{ margin: 10 }}>
        <Card>
          <Card.Content
            header="Team Pages"
            description="View scouting and TBA data about FRC teams"
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

      <Link to="/pitdisplay" style={{ margin: 10 }}>
        <Card>
          <Card.Content
            header="Pit Display"
            description="Show other teams that our robot is better than their's"
          />
        </Card>
      </Link>
      <Link to="/datadisplay" style={{ margin: 10 }}>
        <Card>
          <Card.Content
            header="Credits and Notes"
            description="Rest here, oh scouter dear to my heart!"
          />
        </Card>
      </Link>

      <Card href={"https://www.thebluealliance.com/event/2022casj#rankings"}>
        <Card.Content
          header="Live Rankings"
          description="You can also see OPR on The Blue Alliance"
        />
      </Card>
    </Card.Group>
  </Container>
);

export default Home;
