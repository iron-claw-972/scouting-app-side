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
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
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
  const [redlist, setredlist] = useState([{}, {}, {}]);
  const [bluelist, setbluelist] = useState([{}, {}, {}]);
  const [scoreAuto, setScoreAuto] = useState([0, 0, 0, 0, 0, 0]);
  const [scoreTele, setScoreTele] = useState([0, 0, 0, 0, 0, 0]);
  const [scoreEnd, setScoreEnd] = useState([0, 0, 0, 0, 0, 0]);
  const [users, setUsers] = useState([
    {
      score_breakdown: {
        red: {
          totalPoints: 0,
          activationBonusAchieved: 0,
          sustainabilityBonusAchieved: 0,
          links: [],
        },
        blue: {
          totalPoints: 0,
          activationBonusAchieved: 0,
          sustainabilityBonusAchieved: 0,
          links: [],
        },
      },
    },
  ]);

  const matchDataArr = [];
  var redlst = [{}, {}, {}];
  var bluelst = [{}, {}, {}];
  var autoScores = [0, 0, 0, 0, 0, 0];
  var teleScores = [0, 0, 0, 0, 0, 0];
  var endScores = [0, 0, 0, 0, 0, 0];
  const queryParameters = new URLSearchParams(window.location.search);

  useEffect(() => {
    const match = queryParameters.get("match");
    setMatchNumber(match);
    if (users.length === 0) {
      setUsers([
        {
          score_breakdown: {
            red: {
              totalPoints: 0,
              activationBonusAchieved: 0,
              sustainabilityBonusAchieved: 0,
              links: [],
            },
            blue: {
              totalPoints: 0,
              activationBonusAchieved: 0,
              sustainabilityBonusAchieved: 0,
              links: [],
            },
          },
        },
      ]);
    }
  }, []);

  useEffect(async () => {
    if (queryTeam === "") return;

    const db = getFirestore();
    const q = query(collection(db, "test"), where("MatchNo", "==", queryTeam));
    const matchSnapshot = await getDocs(q);
    matchSnapshot.forEach((match) => {
      matchDataArr.push(match.data());
    });

    var redind = 0;
    var blueind = 0;

    for (let i = 0; i < matchDataArr.length; i++) {
      if (matchDataArr[i].color === false) {
        redlst[redind] = matchDataArr[i];
        redind = redind + 1;
      }
      if (matchDataArr[i].color === true) {
        bluelst[blueind] = matchDataArr[i];
        blueind = blueind + 1;
      }
    }
    setredlist(redlst);
    setbluelist(bluelst);
    autoScores[0] =
      (redlst[0].autoHighConeCount + redlst[0].autoHighCubeCount) * 6 +
      (redlst[0].autoMidConeCount + redlst[0].autoMidCubeCount) * 4 +
      (redlst[0].autoLowConeCount + redlst[0].autoLowCubeCount) * 3;
    if (redlst[0].engaged) {
      autoScores[0] += 12;
    } else if (redlst[0].docked) {
      autoScores[0] += 8;
    }
    autoScores[1] =
      (redlst[1].autoHighConeCount + redlst[1].autoHighCubeCount) * 6 +
      (redlst[1].autoMidConeCount + redlst[1].autoMidCubeCount) * 4 +
      (redlst[1].autoLowConeCount + redlst[1].autoLowCubeCount) * 3;
    if (redlst[1].engaged) {
      autoScores[1] += 12;
    } else if (redlst[0].docked) {
      autoScores[1] += 8;
    }
    autoScores[2] =
      (redlst[2].autoHighConeCount + redlst[2].autoHighCubeCount) * 6 +
      (redlst[2].autoMidConeCount + redlst[2].autoMidCubeCount) * 4 +
      (redlst[2].autoLowConeCount + redlst[2].autoLowCubeCount) * 3;
    if (redlst[2].engaged) {
      autoScores[2] += 12;
    } else if (redlst[0].docked) {
      autoScores[2] += 8;
    }
    autoScores[3] =
      (bluelst[0].autoHighConeCount + bluelst[0].autoHighCubeCount) * 6 +
      (bluelst[0].autoMidConeCount + bluelst[0].autoMidCubeCount) * 4 +
      (bluelst[0].autoLowConeCount + bluelst[0].autoLowCubeCount) * 3;
    if (bluelst[0].engaged) {
      autoScores[3] += 12;
    } else if (bluelst[0].docked) {
      autoScores[3] += 8;
    }
    autoScores[4] =
      (bluelst[1].autoHighConeCount + bluelst[1].autoHighCubeCount) * 6 +
      (bluelst[1].autoMidConeCount + bluelst[1].autoMidCubeCount) * 4 +
      (bluelst[1].autoLowConeCount + bluelst[1].autoLowCubeCount) * 3;
    if (bluelst[1].engaged) {
      autoScores[4] += 12;
    } else if (bluelst[1].docked) {
      autoScores[4] += 8;
    }
    autoScores[5] =
      (bluelst[2].autoHighConeCount + bluelst[2].autoHighCubeCount) * 6 +
      (bluelst[2].autoMidConeCount + bluelst[2].autoMidCubeCount) * 4 +
      (bluelst[2].autoLowConeCount + bluelst[2].autoLowCubeCount) * 3;
    if (bluelst[2].engaged) {
      autoScores[5] += 12;
    } else if (bluelst[2].docked) {
      autoScores[5] += 8;
    }

    teleScores[0] =
      (redlst[1].teleHighConeCount + redlst[1].teleHighCubeCount) * 6 +
      (redlst[1].teleMidConeCount + redlst[1].teleMidCubeCount) * 4 +
      (redlst[1].teleLowConeCount + redlst[1].teleLowCubeCount) * 3;
    teleScores[1] =
      (redlst[1].teleHighConeCount + redlst[1].teleHighCubeCount) * 6 +
      (redlst[1].teleMidConeCount + redlst[1].teleMidCubeCount) * 4 +
      (redlst[1].teleLowConeCount + redlst[1].teleLowCubeCount) * 3;
    teleScores[2] =
      (redlst[2].teleHighConeCount + redlst[2].teleHighCubeCount) * 6 +
      (redlst[2].teleMidConeCount + redlst[2].teleMidCubeCount) * 4 +
      (redlst[2].teleLowConeCount + redlst[2].teleLowCubeCount) * 3;
    teleScores[3] =
      (bluelst[0].teleHighConeCount + bluelst[0].teleHighCubeCount) * 6 +
      (bluelst[0].teleMidConeCount + bluelst[0].teleMidCubeCount) * 4 +
      (bluelst[0].teleLowConeCount + bluelst[0].teleLowCubeCount) * 3;
    teleScores[4] =
      (bluelst[1].teleHighConeCount + bluelst[1].teleHighCubeCount) * 6 +
      (bluelst[1].teleMidConeCount + bluelst[1].teleMidCubeCount) * 4 +
      (bluelst[1].teleLowConeCount + bluelst[1].teleLowCubeCount) * 3;
    teleScores[5] =
      (bluelst[2].teleHighConeCount + bluelst[2].teleHighCubeCount) * 6 +
      (bluelst[2].teleMidConeCount + bluelst[2].teleMidCubeCount) * 4 +
      (bluelst[2].teleLowConeCount + bluelst[2].teleLowCubeCount) * 3;
    const controller = new AbortController();
    var a = get_url(
      controller,
      "https://www.thebluealliance.com/api/v3/event/2023arc/matches"
    ).then((data) => {
      console.log(data);
      let rdata = [];
      for (let i = 0; i < data.length; i++) {
        console.log(data[i]["match_number"]);
        console.log(data[i]["comp_level"]);

        if (
          data[i]["comp_level"] === "qm" &&
          String(data[i]["match_number"]) === String(queryTeam)
        ) {
          console.log(data[i]);
          console.log("deez");
          rdata.push(data[i]);
          break;
        }
      }
      console.log(rdata);
      if (rdata.length == 0 || rdata[0].length === 2) {
        rdata = [
          {
            red: {
              totalPoints: 0,
              activationBonusAchieved: 0,
              sustainabilityBonusAchieved: 0,
            },
            blue: {
              totalPoints: 0,
              activationBonusAchieved: 0,
              sustainabilityBonusAchieved: 0,
            },
          },
        ];
      }
      console.log(rdata);

      setUsers(rdata);
      if (users.length === 0 || rdata[0].length === 2) {
        setUsers([
          {
            score_breakdown: {
              red: {
                totalPoints: 0,
                activationBonusAchieved: 0,
                sustainabilityBonusAchieved: 0,
                links: [],
              },
              blue: {
                totalPoints: 0,
                activationBonusAchieved: 0,
                sustainabilityBonusAchieved: 0,
                links: [],
              },
            },
          },
        ]);
      }
    });
    console.log("deez");
    console.log(users);
    setScoreAuto(autoScores);
    setScoreTele(teleScores);
    return () => controller.abort();
  }, [queryTeam]);
  async function get_url(controller, url) {
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "X-TBA-Auth-Key":
          "BPNgGnZjbEKimUE3vZUl4lwQxyVRVvGsTamHIawG5CMQWpM0DzG8wLhxu1BqCPCO",
      },
      signal: controller.signal,
    });
    return response.json();
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
      <a href={"https://www.thebluealliance.com/match/2023arc" + matchNumber}>
        <Button>To TBA</Button>
      </a>

      <Divider></Divider>

      <Container style={{ display: "flex" }}>
        <Container>
          <Header as="h3">at a glance</Header>
          <Header as="h5">teams</Header>
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
                <Table.Cell>
                  {users[0]["score_breakdown"]["red"]["totalPoints"]}
                </Table.Cell>
                <Table.Cell>
                  {users[0]["score_breakdown"]["blue"]["totalPoints"]}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Sustain RP</Table.Cell>
                <Table.Cell>
                  {String(
                    users[0]["score_breakdown"]["red"][
                      "sustainabilityBonusAchieved"
                    ]
                  )}
                </Table.Cell>
                <Table.Cell>
                  {String(
                    users[0]["score_breakdown"]["blue"][
                      "sustainabilityBonusAchieved"
                    ]
                  )}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Charging RP</Table.Cell>
                <Table.Cell>
                  {String(
                    users[0]["score_breakdown"]["red"][
                      "activationBonusAchieved"
                    ]
                  )}
                </Table.Cell>
                <Table.Cell>
                  {String(
                    users[0]["score_breakdown"]["blue"][
                      "activationBonusAchieved"
                    ]
                  )}
                </Table.Cell>
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
                  <Link to={"/teamlookup?team=" + redlist[0].teamNumber}>
                    <Button size="large" color="red">
                      {redlist[0].teamNumber}
                    </Button>
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Link to={"/teamlookup?team=" + redlist[1].teamNumber}>
                    <Button size="large" color="red">
                      {redlist[1].teamNumber}
                    </Button>
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Link to={"/teamlookup?team=" + redlist[2].teamNumber}>
                    {" "}
                    <Button size="large" color="red">
                      {redlist[2].teamNumber}
                    </Button>
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Link to={"/teamlookup?team=" + bluelist[0].teamNumber}>
                    <Button size="large" color="blue">
                      {bluelist[0].teamNumber}
                    </Button>
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Link to={"/teamlookup?team=" + bluelist[1].teamNumber}>
                    <Button size="large" color="blue">
                      {bluelist[1].teamNumber}
                    </Button>
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Link to={"/teamlookup?team=" + bluelist[2].teamNumber}>
                    <Button size="large" color="blue">
                      {bluelist[2].teamNumber}
                    </Button>
                  </Link>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Links</Table.Cell>
                <Table.Cell>
                  {users[0]["score_breakdown"]["red"]["links"].length}
                </Table.Cell>
                <Table.Cell>
                  {users[0]["score_breakdown"]["red"]["links"].length}
                </Table.Cell>
                <Table.Cell>
                  {users[0]["score_breakdown"]["red"]["links"].length}
                </Table.Cell>
                <Table.Cell>
                  {users[0]["score_breakdown"]["blue"]["links"].length}
                </Table.Cell>
                <Table.Cell>
                  {users[0]["score_breakdown"]["blue"]["links"].length}
                </Table.Cell>
                <Table.Cell>
                  {users[0]["score_breakdown"]["blue"]["links"].length}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Total Score</Table.Cell>
                <Table.Cell>{scoreAuto[0] + scoreTele[0]}</Table.Cell>
                <Table.Cell>{scoreAuto[1] + scoreTele[1]}</Table.Cell>
                <Table.Cell>{scoreAuto[2] + scoreTele[2]}</Table.Cell>
                <Table.Cell>{scoreAuto[3] + scoreTele[3]}</Table.Cell>
                <Table.Cell>{scoreAuto[4] + scoreTele[4]}</Table.Cell>
                <Table.Cell>{scoreAuto[5] + scoreTele[5]}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Ground Intakes</Table.Cell>
                <Table.Cell>{redlist[0].groundIntakes}</Table.Cell>
                <Table.Cell>{redlist[1].groundIntakes}</Table.Cell>
                <Table.Cell>{redlist[2].groundIntakes}</Table.Cell>
                <Table.Cell>{bluelist[0].groundIntakes}</Table.Cell>
                <Table.Cell>{bluelist[1].groundIntakes}</Table.Cell>
                <Table.Cell>{bluelist[2].groundIntakes}</Table.Cell>
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
                <Table.Cell>Auto Score</Table.Cell>
                <Table.Cell>{scoreAuto[0]}</Table.Cell>
                <Table.Cell>{scoreAuto[1]}</Table.Cell>
                <Table.Cell>{scoreAuto[2]}</Table.Cell>
                <Table.Cell>{scoreAuto[3]}</Table.Cell>
                <Table.Cell>{scoreAuto[4]}</Table.Cell>
                <Table.Cell>{scoreAuto[5]}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>MOBILITY??</Table.Cell>
                <Table.Cell>{}</Table.Cell>
                <Table.Cell>{}</Table.Cell>
                <Table.Cell>{}</Table.Cell>
                <Table.Cell>{}</Table.Cell>
                <Table.Cell>{}</Table.Cell>
                <Table.Cell>{}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Cone High</Table.Cell>
                <Table.Cell>{redlist[0].autoHighConeCount}</Table.Cell>
                <Table.Cell>{redlist[1].autoHighConeCount}</Table.Cell>
                <Table.Cell>{redlist[2].autoHighConeCount}</Table.Cell>
                <Table.Cell>{bluelist[0].autoHighConeCount}</Table.Cell>
                <Table.Cell>{bluelist[1].autoHighConeCount}</Table.Cell>
                <Table.Cell>{bluelist[2].autoHighConeCount}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Cone Mid</Table.Cell>
                <Table.Cell>{redlist[0].autoMidConeCount}</Table.Cell>
                <Table.Cell>{redlist[1].autoMidConeCount}</Table.Cell>
                <Table.Cell>{redlist[2].autoHighConeCount}</Table.Cell>
                <Table.Cell>{bluelist[0].autoMidConeCount}</Table.Cell>
                <Table.Cell>{bluelist[1].autoMidConeCount}</Table.Cell>
                <Table.Cell>{bluelist[2].autoHighConeCount}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Cone Low</Table.Cell>
                <Table.Cell>{redlist[0].autoLowConeCount}</Table.Cell>
                <Table.Cell>{redlist[1].autoLowConeCount}</Table.Cell>
                <Table.Cell>{redlist[2].autoLowConeCount}</Table.Cell>
                <Table.Cell>{bluelist[0].autoLowConeCount}</Table.Cell>
                <Table.Cell>{bluelist[1].autoLowConeCount}</Table.Cell>
                <Table.Cell>{bluelist[2].autoLowConeCount}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Cube High</Table.Cell>
                <Table.Cell>{redlist[0].autoHighCubeCount}</Table.Cell>
                <Table.Cell>{redlist[1].autoHighCubeCount}</Table.Cell>
                <Table.Cell>{redlist[2].autoHighCubeCount}</Table.Cell>
                <Table.Cell>{bluelist[0].autoHighCubeCount}</Table.Cell>
                <Table.Cell>{bluelist[1].autoHighCubeCount}</Table.Cell>
                <Table.Cell>{bluelist[2].autoHighCubeCount}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Cube Mid</Table.Cell>
                <Table.Cell>{redlist[0].autoMidCubeCount}</Table.Cell>
                <Table.Cell>{redlist[1].autoMidCubeCount}</Table.Cell>
                <Table.Cell>{redlist[2].autoMidCubeCount}</Table.Cell>
                <Table.Cell>{bluelist[0].autoMidCubeCount}</Table.Cell>
                <Table.Cell>{bluelist[1].autoMidCubeCount}</Table.Cell>
                <Table.Cell>{bluelist[2].autoMidCubeCount}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Cube Low</Table.Cell>
                <Table.Cell>{redlist[0].autoLowCubeCount}</Table.Cell>
                <Table.Cell>{redlist[1].autoLowCubeCount}</Table.Cell>
                <Table.Cell>{redlist[2].autoLowCubeCount}</Table.Cell>
                <Table.Cell>{bluelist[0].autoLowCubeCount}</Table.Cell>
                <Table.Cell>{bluelist[1].autoLowCubeCount}</Table.Cell>
                <Table.Cell>{bluelist[2].autoLowCubeCount}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>DOCKED??</Table.Cell>
                <Table.Cell>{String(redlist[0].autoDocked)}</Table.Cell>
                <Table.Cell>{String(redlist[1].autoDocked)}</Table.Cell>
                <Table.Cell>{String(redlist[2].autoDocked)}</Table.Cell>
                <Table.Cell>{String(bluelist[0].autoDocked)}</Table.Cell>
                <Table.Cell>{String(bluelist[1].autoDocked)}</Table.Cell>
                <Table.Cell>{String(bluelist[2].autoDocked)}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>ENGAGED??</Table.Cell>
                <Table.Cell>{String(redlist[0].autoEngaged)}</Table.Cell>
                <Table.Cell>{String(redlist[1].autoEngaged)}</Table.Cell>
                <Table.Cell>{String(redlist[2].autoEngaged)}</Table.Cell>
                <Table.Cell>{String(bluelist[0].autoEngaged)}</Table.Cell>
                <Table.Cell>{String(bluelist[1].autoEngaged)}</Table.Cell>
                <Table.Cell>{String(bluelist[2].autoEngaged)}</Table.Cell>
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
                <Table.Cell>Tele Score</Table.Cell>
                <Table.Cell>{scoreTele[0]}</Table.Cell>
                <Table.Cell>{scoreTele[1]}</Table.Cell>
                <Table.Cell>{scoreTele[2]}</Table.Cell>
                <Table.Cell>{scoreTele[3]}</Table.Cell>
                <Table.Cell>{scoreTele[4]}</Table.Cell>
                <Table.Cell>{scoreTele[5]}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Cone High</Table.Cell>
                <Table.Cell>{redlist[0].teleHighConeCount}</Table.Cell>
                <Table.Cell>{redlist[1].teleHighConeCount}</Table.Cell>
                <Table.Cell>{redlist[2].teleHighConeCount}</Table.Cell>
                <Table.Cell>{bluelist[0].teleHighConeCount}</Table.Cell>
                <Table.Cell>{bluelist[1].teleHighConeCount}</Table.Cell>
                <Table.Cell>{bluelist[2].teleHighConeCount}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Cone Mid</Table.Cell>
                <Table.Cell>{redlist[0].teleMidConeCount}</Table.Cell>
                <Table.Cell>{redlist[1].teleMidConeCount}</Table.Cell>
                <Table.Cell>{redlist[2].teleMidConeCount}</Table.Cell>
                <Table.Cell>{bluelist[0].teleMidConeCount}</Table.Cell>
                <Table.Cell>{bluelist[1].teleMidConeCount}</Table.Cell>
                <Table.Cell>{bluelist[2].teleMidConeCount}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Cone Low</Table.Cell>
                <Table.Cell>{redlist[0].teleLowConeCount}</Table.Cell>
                <Table.Cell>{redlist[1].teleLowConeCount}</Table.Cell>
                <Table.Cell>{redlist[2].teleLowConeCount}</Table.Cell>
                <Table.Cell>{bluelist[0].teleLowConeCount}</Table.Cell>
                <Table.Cell>{bluelist[1].teleLowConeCount}</Table.Cell>
                <Table.Cell>{bluelist[2].teleLowConeCount}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Cube High</Table.Cell>
                <Table.Cell>{redlist[0].teleHighCubeCount}</Table.Cell>
                <Table.Cell>{redlist[1].teleHighCubeCount}</Table.Cell>
                <Table.Cell>{redlist[2].teleHighCubeCount}</Table.Cell>
                <Table.Cell>{bluelist[0].teleHighCubeCount}</Table.Cell>
                <Table.Cell>{bluelist[1].teleHighCubeCount}</Table.Cell>
                <Table.Cell>{bluelist[2].teleHighCubeCount}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Cube Mid</Table.Cell>
                <Table.Cell>{redlist[0].teleMidCubeCount}</Table.Cell>
                <Table.Cell>{redlist[1].teleMidCubeCount}</Table.Cell>
                <Table.Cell>{redlist[2].teleMidCubeCount}</Table.Cell>
                <Table.Cell>{bluelist[0].teleMidCubeCount}</Table.Cell>
                <Table.Cell>{bluelist[1].teleMidCubeCount}</Table.Cell>
                <Table.Cell>{bluelist[2].teleMidCubeCount}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Cube Low</Table.Cell>
                <Table.Cell>{redlist[0].teleLowCubeCount}</Table.Cell>
                <Table.Cell>{redlist[1].teleLowCubeCount}</Table.Cell>
                <Table.Cell>{redlist[2].teleLowCubeCount}</Table.Cell>
                <Table.Cell>{bluelist[0].teleLowCubeCount}</Table.Cell>
                <Table.Cell>{bluelist[1].teleLowCubeCount}</Table.Cell>
                <Table.Cell>{bluelist[2].teleLowCubeCount}</Table.Cell>
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
                <Table.Cell>{redlist[0].teleDocked}</Table.Cell>
                <Table.Cell>{redlist[1].teleDocked}</Table.Cell>
                <Table.Cell>{redlist[2].teleDocked}</Table.Cell>
                <Table.Cell>{bluelist[0].teleDocked}</Table.Cell>
                <Table.Cell>{bluelist[1].teleDocked}</Table.Cell>
                <Table.Cell>{bluelist[2].teleDocked}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>ENGAGED??</Table.Cell>
                <Table.Cell>{redlist[0].teleEngaged}</Table.Cell>
                <Table.Cell>{redlist[1].teleEngaged}</Table.Cell>
                <Table.Cell>{redlist[2].teleEngaged}</Table.Cell>
                <Table.Cell>{bluelist[0].teleEngaged}</Table.Cell>
                <Table.Cell>{bluelist[1].teleEngaged}</Table.Cell>
                <Table.Cell>{bluelist[2].teleEngaged}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Container>
      </Container>
    </Container>
  );
};

export default NewTeamPages;
