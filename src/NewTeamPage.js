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
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";

const NewTeamPages = () => {
  const [queryTeam, setQueryTeam] = useState("");
  const [matchNumber, setMatchNumber] = useState("");
  const matchDataArr = [];
  useEffect(async () => {
    if (queryTeam === "") return;

    const db = getFirestore();
    const q = query(collection(db, "test"), where("MatchNo", "==", queryTeam));
    const matchSnapshot = await getDocs(q);
    matchSnapshot.forEach((match) => {
      matchDataArr.push(match.data());
    });
    console.log(matchDataArr);
  }, [queryTeam]);
  const redlst = [{}, {}, {}];
  const redind = 0;
  const blueind = 0;
  const bluelst = [{}, {}, {}];
  for (let i = 0; i < matchDataArr.length; i++) {
    if (matchDataArr[i].color == false) {
      redlst[redind] = matchDataArr[i];
      redind = redind + 1;
    }
    if (matchDataArr[i].color == true) {
      bluelst[blueind] = matchDataArr[i];
      blueind = blueind + 1;
    }
  }

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
      <Input
        value={matchNumber}
        size="small"
        placeholder=""
        onChange={(e) => setMatchNumber(e.target.value)}
      />
      <Button type="submit" onClick={() => setQueryTeam(matchNumber)}>
        Search
      </Button>
      <Divider></Divider>
      <Container style={{ display: "flex" }}>
        <Container>
          <Header as="h3">at a glance</Header>
          <Table celled small collapsing basic unstackable>
            <Table.Body>
              <Table.Row>
                <Table.Cell>{}</Table.Cell>
                <Table.Cell>
                  <Header color="red">Red</Header>
                </Table.Cell>
                <Table.Cell>
                  <Header color="blue">Blue</Header>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Score</Table.Cell>
                <Table.Cell>{}</Table.Cell>
                <Table.Cell>{}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Sustain RP</Table.Cell>
                <Table.Cell>{}</Table.Cell>
                <Table.Cell>{}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Charging RP</Table.Cell>
                <Table.Cell>{}</Table.Cell>
                <Table.Cell>{}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Predicted Score</Table.Cell>
                <Table.Cell>{}</Table.Cell>
                <Table.Cell>{}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Container>
        <Container>
          <Header as="h3">detailed scorecard</Header>
          <Table collapsing basic unstackable>
            <Table.Body>
              <Table.Row>
                <Table.Cell></Table.Cell>
                <Table.Cell>
                  <Button size="large" color="red"></Button>
                </Table.Cell>
                <Table.Cell>
                  <Button size="large" color="red"></Button>
                </Table.Cell>
                <Table.Cell>
                  <Button size="large" color="red"></Button>
                </Table.Cell>
                <Table.Cell>
                  <Button size="large" color="blue"></Button>
                </Table.Cell>
                <Table.Cell>
                  <Button size="large" color="blue"></Button>
                </Table.Cell>
                <Table.Cell>
                  <Button size="large" color="blue"></Button>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Ground Intakes</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>{}</Table.Cell>
                <Table.Cell>{}</Table.Cell>
                <Table.Cell>{}</Table.Cell>
                <Table.Cell>
                  <Button color="black">Auto</Button>
                </Table.Cell>
                <Table.Cell>{}</Table.Cell>
                <Table.Cell>{}</Table.Cell>
                <Table.Cell>{}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Score</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>MOBILITY??</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Cone High</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Cone Mid</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Cone Low</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Cube Low</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Cube Low</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Cube Low</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>DOCKED??</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>ENGAGED??</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>{}</Table.Cell>
                <Table.Cell>{}</Table.Cell>
                <Table.Cell>{}</Table.Cell>
                <Table.Cell>
                  <Button color="black">Tele</Button>
                </Table.Cell>
                <Table.Cell>{}</Table.Cell>
                <Table.Cell>{}</Table.Cell>
                <Table.Cell>{}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Score</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Cone High</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Cone Mid</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Cone Low</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Cube Low</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Cube Low</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Cube Low</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>{}</Table.Cell>
                <Table.Cell>{}</Table.Cell>
                <Table.Cell>{}</Table.Cell>
                <Table.Cell>
                  <Button color="black">Endgame</Button>
                </Table.Cell>
                <Table.Cell>{}</Table.Cell>
                <Table.Cell>{}</Table.Cell>
                <Table.Cell>{}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Score</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>DOCKED??</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>ENGAGED??</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Container>
      </Container>
    </Container>
  );
};

export default NewTeamPages;
