import React, { useEffect, useState } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";

import {
  Table,
  Container,
  Form,
  Button,
  Modal,
  Header,
  Divider,
  Radio,
  Segment,
  Label,
  Checkbox
} from "semantic-ui-react";
import {
  getFirestore,
  setDoc,
  doc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { LineChart, BarChart } from "react-chartkick";
import "chartkick/chart.js";
import Textbox from "./Textbox.js";
import CanvasDisplay from "./CanvasDisplay";

import {
  colorOptions,
  driveOptions,
  cvOptions,
  autoOptions,
  yesNoOptions,
  graphOptions,
} from "./AllOptions";

function exampleReducer(state, action) {
  switch (action.type) {
    case "CHANGE_SORT":
      if (state.column === action.column) {
        return {
          ...state,
          data: state.data.slice().reverse(),
          direction:
            state.direction === "ascending" ? "descending" : "ascending",
        };
      }

      return {
        column: action.column,
        data: _.sortBy(state.data, [action.column]),
        direction: "ascending",
      };
    case "ADD_DATA":
      return {
        ...state,
        data: action.data,
      };
    default:
      throw new Error();
  }
}

const TeamLookup = () => {
  var matchDataArr = [];
  
  const [mousePos, setMousePos] = useState({});

  const [teamNumber, setTeamNumber] = useState("");
  const [graph, setGraph] = useState("");
  const [queryTeam, setQueryTeam] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [avgData, setAvgData] = useState({});
  const [totalScore, setTotalScore] = useState();
  const [realDocked, setrealDocked] = useState(0);
  const [realEngaged, setrealEngaged] = useState(0);
  const [pitData, setPitData] = useState([{}]);
  const [matchData, setMatchData] = useState([{}]);

  const [tipped, setTipped] = useState(0);
  const [ground, setGround] = useState(0);
  const [single, setSingle] = useState(0);
  const [double, setDouble] = useState(0);
  const [avgListData, setAvgListData] = useState({
    teamNumber: teamNumber,
    autoavg: 0,
    teleavg: 0,
    endgameavg: 0,
    totalavg: 0,
    intakeavg: 0,
    accavg: 0,
    matches: 0,
    url:
      "https://scoutingapp-e4a98.web.app/teamlookup?team=" +
      String(teamNumber),
  })
  const [coords, setCoords] = useState([{}]);

  const [realDriver, setRealDriver] = useState("");
  const [realDefense, setRealDefense] = useState("");
  const [chartData, setChartData] = useState({});
  const [driveravg, setdriveravg] = useState(0)
  let initcoords = [];
  const [namesList, setNamesList] = useState([]);

  const [low, setLow] = useState(true); 
  const [mid, setMid] = useState(true);
  const [high, setHigh] = useState(true);
  const [all, setAll] = useState(true);
  const [points, setPoints] = useState();



  function handleChart(g, d) {
    console.log(d)
    setGraph(d)
    
    var q = d;
    console.log(q)
    var output = [{name: "Tele Mid", data: {}}, {name: "Tele Low", data: {}}, {name: "Tele High", data: {}}, {name: "Tele Total", data: {}}, {name: "Auto Mid", data: {}}, {name: "Auto Low", data: {}}, {name: "Auto High", data: {}}, {name: "Auto Total", data: {}}];
    // console.log(q)
    // console.log(JSON.stringify(matchData))
    // console.log(q)
    // console.log(matchData)
    for (let i = 0; i < matchData.length; i++){
      console.log(all)
      if(all){
        if(q == "Tele"){
          output[3]["data"][matchData[i]["MatchNo"]] = matchData[i]["teleHighConeCount"] + matchData[i]["teleHighCubeCount"] + matchData[i]["teleMidCubeCount"] + matchData[i]["teleMidConeCount"] + matchData[i]["teleLowConeCount"] + matchData[i]["teleLowCubeCount"]
        }
        

        if(q == "Auto"){
          output[7]["data"][matchData[i]["MatchNo"]] = matchData[i]["autoHighConeCount"] + matchData[i]["autoHighCubeCount"] + matchData[i]["autoMidCubeCount"] + matchData[i]["autoMidConeCount"] + matchData[i]["autoLowConeCount"] + matchData[i]["autoLowCubeCount"]
        }

      }

      if(high){
        if(q == "Tele"){
          output[2]["data"][matchData[i]["MatchNo"]] = matchData[i]["teleHighConeCount"] + matchData[i]["teleHighCubeCount"]
        }

        if(q == "Auto"){
          output[6]["data"][matchData[i]["MatchNo"]] = matchData[i]["autoHighConeCount"] + matchData[i]["autoHighCubeCount"]
        }
      }

      if (mid){
        if(q == "Tele"){
          output[0]["data"][matchData[i]["MatchNo"]] = matchData[i]["teleHighConeCount"] + matchData[i]["teleMidCubeCount"]
        }
        if(q == "Auto"){
          output[4]["data"][matchData[i]["MatchNo"]] = matchData[i]["autoMidConeCount"] + matchData[i]["autoMidCubeCount"]
        }
      }


      if (low){
        if(q == "Tele"){
          output[1]["data"][matchData[i]["MatchNo"]] = matchData[i]["teleLowConeCount"] + matchData[i]["teleLowCubeCount"]
        }
        if(q == "Auto"){
          output[5]["data"][matchData[i]["MatchNo"]] = matchData[i]["autoLowConeCount"] + matchData[i]["autoLowCubeCount"]
        }
      }
      console.log(matchData.length)
    }
    
    
      //output[matchData[i]["MatchNo"]] = matchData[i][type];
    // return output
    console.log(output)
    setChartData(output);
  }

  const queryParameters = new URLSearchParams(window.location.search);

  useEffect(() => {
    const team = queryParameters.get("team");
    setTeamNumber(team);
  }, []);

  useEffect(() => {
    handleChart("", graph)
  }, [low, mid, high, all]);

  // const db = getFirestore();
  //   const matchSnapshot = await getDocs(collection(db, "test"));
  //   var matchArr = [];
  //   var y;
  //   matchSnapshot.forEach((match) => {
  //     matchArr.push(match.data());
  //   });

  useEffect(async () => {
    console.log("UseEffect called")
    if (queryTeam === "") return;
    matchDataArr = [];
    const db = getFirestore();
    const q = query(
      collection(db, "test"),
      where("teamNumber", "==", queryTeam)
    );

    const matchSnapshot = await getDocs(q);
    matchSnapshot.forEach((match) => {
      console.log(matchSnapshot.length)
      matchDataArr.push(match.data());
    });
    console.log(matchDataArr)
    if (matchDataArr.length === 0) {
      setShowModal(true);
    }

    setMatchData(matchDataArr);

    const avgq0 = query(
      collection(db, "averages"),
      where("teamNumber", "==", teamNumber)
    );

    const avgSnapshot = await getDocs(avgq0);
    console.log(avgListData)

    avgSnapshot.forEach((team) => {
      console.log(team.data())
      setAvgListData(team.data())
      console.log(avgListData)
    })

    console.log("fml")




    var initials = new Object();
    initials = {
      "jc": "Julio",
      "jd": "Joshua D",
      "lf": "Leah",
      "af": "Anthony",
      "lg": "Leison",
      "emh": "Emi",
      "jj": "Jake",
      "mk": "Michael K",
      "tl": "Teo(dor)",
      "cm": "Cole M",
      "jm": "Joushua M",
      "fr": "Faris",
      "ms": "Max",
      "os": "Om",
      "as": "Angela",
      "rt": "Richie",
      "rv": "Robert(o)",
      "az": "Allan",
      "tz": "Tony",
      "tb": "Theadin",
      "tc": "Tyrus",
      "yd": "Yichen",
      "jud": "Julia",
      "ad": "Andrea",
      "ee": "Eliot",
      "ch": "Cole H",
      "ep": "Elisa",
      "ar": "Ashir",
      "ns": "Nicole",
      "gt": "Gavin",
      "aw": "Ani",
      "sa": "Sahil",
      "la": "Laksh(ya)",
      "mc": "Michael C",
      "ld": "Leo",
      "ke": "Kyle",
      "pg": "Paola",
      "elh": "Ellery",
      "eh": "Edwin",
      "ih": "Ian",
      "hh": "Ian",
      "hl": "Henry",
      "cn": "Cameron",
      "ap": "Arnav",
      "cs": "Leison",
      "rs": "Cici",
      "ay": "Adam",
      "ac": "Alex",
      "joj": "Johann",
      "sp": "Saara",
      "mes": "Mehaan",
      "kt": "Kaushik",
      "tt": "day 0 practice"
    };
    var names = [];
    

    var defensestr= ""
    var iground = 0
    var itipped = 0
    var isingle = 0
    var idouble = 0
    for (let i = 0; i < matchDataArr.length; i++) {

      if (!names.includes(initials[matchDataArr[i].name.toLowerCase()])){
        names.push(initials[matchDataArr[i].name.toLowerCase()])
      }

      defensestr = defensestr + initials[matchDataArr[i].name.toLowerCase()] + " (" + String(matchDataArr[i].MatchNo) + "): " + matchDataArr[i].driver + "\n"
      if (matchDataArr[i].ground){
        iground = iground+1
      }
      if (matchDataArr[i].tipped){
        itipped = itipped+1
      }
      if (matchDataArr[i].single){
        isingle = isingle+1
      }
      if (matchDataArr[i].double){
        idouble = idouble+1
      }
    }
    setGround(iground)
    setTipped(itipped)
    setDouble(idouble)
    setSingle(isingle)

    setRealDefense(defensestr)
    setNamesList(names);

    var initcoords = [];
    matchData.forEach((match) => initcoords.push(match.mousePos));
    console.log(initcoords);
    setCoords(initcoords);

    {/* setAvgData((prevData) => {
      return {
        ...prevData,
        Avg_Cubes_Auto_H: search(matchDataArr, "autoHighCubeCount"),
      };
    });
    setAvgData((prevData) => {
      return {
        ...prevData,
        Avg_Cubes_Auto_M: search(matchDataArr, "autoMidCubeCount"),
      };
    });
    setAvgData((prevData) => {
      return {
        ...prevData,
        Avg_Cubes_Auto_L: search(matchDataArr, "autoLowCubeCount"),
      };
    });
    setAvgData((prevData) => {
      return {
        ...prevData,
        Avg_Cones_Auto_H: search(matchDataArr, "autoHighConeCount"),
      };
    });
    setAvgData((prevData) => {
      return {
        ...prevData,
        Avg_Cones_Auto_M: search(matchDataArr, "autoMidConeCount"),
      };
    });
    setAvgData((prevData) => {
      return {
        ...prevData,
        Avg_Cones_Auto_L: search(matchDataArr, "autoLowConeCount"),
      };
    });

    setAvgData((prevData) => {
      return {
        ...prevData,
        Avg_Cubes_Tele_H: search(matchDataArr, "teleHighCubeCount"),
      };
    });
      return {
        ...prevData,
        Avg_Cubes_Tele_M: search(matchDataArr, "teleMidCubeCount"),
      };
    });
    setAvgData((prevData) => {
      return {
        ...prevData,
        Avg_Cubes_Tele_L: search(matchDataArr, "teleLowCubeCount"),
      };
    });
    setAvgData((prevData) => {
      return {
        ...prevData,
        Avg_Cones_Tele_H: search(matchDataArr, "teleHighConeCount"),
      };
    });
    setAvgData((prevData) => {
      return {
        ...prevData,
        Avg_Cones_Tele_M: search(matchDataArr, "teleMidConeCount"),
      };
    });
    setAvgData((prevData) => {
      return {
        ...prevData,
        Avg_Cones_Tele_L: search(matchDataArr, "teleLowConeCount"),
      };
    }); */}

    const pitq = query(
      collection(db, "test-p"),
      where("teamNumber", "==", queryTeam)
    );

    const pitSnapshot = await getDocs(pitq);
    var pitDataArr = [];
    pitSnapshot.forEach((match) => {
      pitDataArr.push(match.data());
    });
    if (pitDataArr.length > 0) {
      setPitData(pitDataArr[0]);
    }

    console.log(pitData)


    /*
    var subsnap1 = query(
      collection(db, "test_s"),
      where("teamNumber1", "==", queryTeam)
    );
    subsnap1 = await getDocs(subsnap1);

    var subq1 = [];

    subsnap1.forEach((match) => {
      subq1.push(match.data());
    });

    var subq2 = [];
    var subsnap2 = query(
      collection(db, "test_s"),
      where("teamNumber2", "==", queryTeam)
    );
    subsnap2 = await getDocs(subsnap2);

    subsnap2.forEach((match) => {
      subq2.push(match.data());
    });

    var subq3 = [];

    var subsnap3 = query(
      collection(db, "test_s"),
      where("teamNumber3", "==", queryTeam)
    );

    subsnap3 = await getDocs(subsnap3);

    subsnap3.forEach((match) => {
      subq3.push(match.data());
    });

    var defenseStr = "";
    var driverStr = "";
    
    var matches = 0;
    var tot = 0;
    for (let i = 0; i < subq1.length; i++) {
      defenseStr = defenseStr + initials[subq1[i].name.toLowerCase()] + " (" + subq1[i].MatchNo + "): ";
      defenseStr = defenseStr + subq1[i].defense1 + " \n ";

      driverStr = driverStr + initials[subq1[i].name.toLowerCase()] + " (" + subq1[i].MatchNo + "): ";
      driverStr = driverStr + subq1[i].driverCapacity1 +"/10 (Driver)" + "\n ";
      tot = tot + Number(subq1[i].driverCapacity1)
      matches=matches + 1

    }

    for (let i = 0; i < subq2.length; i++) {
      defenseStr = defenseStr + initials[subq2[i].name.toLowerCase()]  + " (" + subq2[i].MatchNo + "): ";
      defenseStr = defenseStr + subq2[i].defense2  + "\n";

      driverStr = driverStr + initials[subq2[i].name.toLowerCase()] +  " (" + subq2[i].MatchNo + "): ";
      driverStr = driverStr + subq2[i].driverCapacity2 +"/10 (Driver)" + "\n";
      tot = tot + Number(subq2[i].driverCapacity2)
      matches=matches + 1

    }

    for (let i = 0; i < subq3.length; i++) {
      defenseStr = defenseStr + initials[subq3[i].name.toLowerCase()] + " (" + subq3[i].MatchNo + "): ";
      defenseStr = defenseStr + subq3[i].defense3 + "\n";

      driverStr = driverStr + initials[subq3[i].name.toLowerCase()]  + " (" + subq3[i].MatchNo + "): ";
      driverStr = driverStr + subq3[i].driverCapacity3 +"/10 (Driver)" + "\n";
      tot = tot + Number(subq3[i].driverCapacity3)
      matches=matches + 1


    }
    */
    
    // setAvgData((prevData) => {
    //   return {
    //     ...prevData,
    //     Avg_Cubes_Auto_H: search(matchDataArr, "autoHighCubeCount"),
    //   };
    // });
    // setAvgData((prevData) => {
    //   return {
    //     ...prevData,
    //     Avg_Cubes_Auto_M: search(matchDataArr, "autoMidCubeCount"),
    //   };
    // });
    // setAvgData((prevData) => {
    //   return {
    //     ...prevData,
    //     Ground_Intake: search(matchDataArr, "groundIntakes"),
    //   };
    // });
    // setAvgData((prevData) => {
    //   return {
    //     ...prevData,
    //     Avg_Cubes_Auto_L: search(matchDataArr, "autoLowCubeCount"),
    //   };
    // });
    // setAvgData((prevData) => {
    //   return {
    //     ...prevData,
    //     Avg_Cones_Auto_H: search(matchDataArr, "autoHighConeCount"),
    //   };
    // });
    // setAvgData((prevData) => {
    //   return {
    //     ...prevData,
    //     Avg_Cones_Auto_M: search(matchDataArr, "autoMidConeCount"),
    //   };
    // });
    // setAvgData((prevData) => {
    //   return {
    //     ...prevData,
    //     Avg_Cones_Auto_L: search(matchDataArr, "autoLowConeCount"),
    //   };
    // });

    // setAvgData((prevData) => {
    //   return {
    //     ...prevData,
    //     Avg_Cubes_Tele_H: search(matchDataArr, "teleHighCubeCount"),
    //   };
    // });
    // setAvgData((prevData) => {
    //   return {
    //     ...prevData,
    //     Avg_Cubes_Tele_M: search(matchDataArr, "teleMidCubeCount"),
    //   };
    // });
    // setAvgData((prevData) => {
    //   return {
    //     ...prevData,
    //     Avg_Cubes_Tele_L: search(matchDataArr, "teleLowCubeCount"),
    //   };
    // });
    // setAvgData((prevData) => {
    //   return {
    //     ...prevData,
    //     Avg_Cones_Tele_H: search(matchDataArr, "teleHighConeCount"),
    //   };
    // });
    // setAvgData((prevData) => {
    //   return {
    //     ...prevData,
    //     Avg_Cones_Tele_M: search(matchDataArr, "teleMidConeCount"),
    //   };
    // });
    // setAvgData((prevData) => {
    //   return {
    //     ...prevData,
    //     Avg_Cones_Tele_L: search(matchDataArr, "teleLowConeCount"),
    //   };
    // });
    // setAvgData(prevData => {return {...prevData, Ground_Intakes: search(matchDataArr, "groundIntakes") }})
    setTotalScore(total(matchDataArr));
    dispatch({ type: "ADD_DATA", data: matchDataArr });
    var docks = 0;
    var engage = 0;
    for (let i = 0; i < matchDataArr.length; i++) {
      if (matchDataArr[i].docked) {
        docks = docks + 1;
      }

      if (matchDataArr[i].engage) {
        engage = engage + 1;
      }
    }

    setrealDocked(Math.round((docks / matchDataArr.length) * 100) / 100);
    setrealEngaged(Math.round((engage / matchDataArr.length) * 100) / 100);
  }, [queryTeam]);
  
  const [state, dispatch] = React.useReducer(exampleReducer, {
    column: null,
    data: [],
    direction: null,
  });

  const { column, data, direction } = state;
  function search(data, param) {
    var avg = 0;
    for (let i = 0; i < data.length; i++) {
      avg += data[i][param];
    }
    return (avg / data.length).toFixed(1);
  }
  function total(data) {
    var out = 0;
    var values = {
      autoHighCubeCount: 6,
      autoMidCubeCount: 4,
      autoLowCubeCount: 3,
      autoHighConeCount: 6,
      autoMidConeCount: 4,
      autoLowConeCount: 3,
      teleHighCubeCount: 5,
      teleMidCubeCount: 3,
      teleLowCubeCount: 2,
      teleHighConeCount: 5,
      teleMidConeCount: 3,
      teleLowConeCount: 2,
    };
    for (let i = 0; i < data.length; i++) {
      var k = Object.keys(data[i]);
      for (let j = 0; j < k.length; j++) {
        if (Object.keys(values).indexOf(k[j]) != -1) {
          out += data[i][k[j]] * values[k[j]];
        }
      }
    }
    setTotalScore((out / data.length).toFixed(1));
  }


  matchData.forEach((match) => {
    if (match.mousePos != null) {
      initcoords.push({x: match.mousePos.x, y: match.mousePos.y});  
    } else {
      initcoords.push({x: match.mouseX, y: match.mouseY});
    }
  });
  

  return (
    <Container>
      <Header as="h1" style={{ textAlign: "center", margin: "10px", fontSize: "24px" }}>
        Team Lookup
      </Header>
      <a href={"https://docs.google.com/document/d/1Sj7vSJHVVQzgD6Oyr5MAMKlX8v2_6_6Og-0I1QfTM8I/edit"} style={{ padding: "10px" }}>
        <Header as="h4" style={{ textDecoration: "underline", color: "blue", textAlign: "center", margin: "1px", fontSize: "16px" }}>
          Prescout data - subjective (the homework)
        </Header>
      </a>
      <a href={"https://docs.google.com/spreadsheets/d/1nENFc7wUSSK75jH7wOvW3KpL09tOJoauwmjS2tBvf-U/edit#gid=1069226125"} style={{ padding: "10px" }}>
        <Header as="h4" style={{ textDecoration: "underline", color: "blue", textAlign: "center", margin: "1px", fontSize: "16px" }}>
          Prescout data - objective (past results)
        </Header>
      </a>
      <Form style={{ marginTop: 15 }}>
        <Form.Group unstackable>
          <Form.Input
            value={teamNumber}
            onChange={(e) => setTeamNumber(e.target.value)}
            style={{ width: "80%", fontSize: "16px" }}
          />
          <Form.Field style={{ alignSelf: "flexEnd", marginTop: "10px" }}>
            <Button type="submit" onClick={() => setQueryTeam(teamNumber)} style={{ fontSize: "16px" }}>
              Search
            </Button>
            <Button type="submit" onClick={() => window.open('https://www.thebluealliance.com/team/'+teamNumber+'/2023', '_blank').focus()} style={{ fontSize: "16px" }}>
              To TBA
            </Button>
          </Form.Field>
        </Form.Group>
      </Form>
      <Container>
        <Header as="h3">
          stats
        </Header>
        <Table unstackable>
          <Table.Row>
            <Table.HeaderCell>Drivetrain</Table.HeaderCell>
            <Table.HeaderCell>Dimensions</Table.HeaderCell>
            <Table.HeaderCell>Ability</Table.HeaderCell>
            <Table.HeaderCell>Auto Engage</Table.HeaderCell>
            <Table.HeaderCell>Ground Intake</Table.HeaderCell>
            <Table.HeaderCell>Shelf Intake</Table.HeaderCell>
            <Table.HeaderCell>Vision</Table.HeaderCell>
            <Table.HeaderCell>Motors</Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{String(pitData.drive)}</Table.Cell>
            <Table.Cell>{String(pitData.dim)}</Table.Cell>
            <Table.Cell>{String(pitData.ability)}</Table.Cell>
            <Table.Cell>{String(pitData.balance)}</Table.Cell>
            <Table.Cell>{String(pitData.gintake)}</Table.Cell>
            <Table.Cell>{String(pitData.shelfIntake)}</Table.Cell>
            <Table.Cell>{String(pitData.vision)}</Table.Cell>
            <Table.Cell>{String(pitData.motors)}</Table.Cell>
          </Table.Row>
        </Table>
        <Divider></Divider>
        <Label size="large" color="red" style={{ fontSize: "16px" }}>Auto Avg <Label.Detail>{avgListData.autoavg}</Label.Detail></Label>
        <Label size="large" color="blue" style={{ fontSize: "16px" }}>Tele Avg <Label.Detail>{avgListData.teleavg}</Label.Detail></Label>
        <Label size="large" color="pink" style={{ fontSize: "16px" }}>Endgame Avg <Label.Detail>{avgListData.endgameavg}</Label.Detail></Label>
        <Label size="large" color="black" style={{ fontSize: "16px" }}>Total Avg <Label.Detail>{avgListData.totalavg}</Label.Detail></Label>
        <Label size="large" color="violet" style={{ fontSize: "16px" }}>Intakes Avg <Label.Detail>{avgListData.intakeavg}</Label.Detail></Label>
        <Label size="large" color="grey" style={{ fontSize: "16px" }}>Accuracy Avg <Label.Detail>{avgListData.accavg}</Label.Detail></Label>
        <Label size="large" color="black" style={{ fontSize: "16px" }}>Single <Label.Detail>{single}</Label.Detail></Label>
        <Label size="large" color="black" style={{ fontSize: "16px" }}>Double <Label.Detail>{double}</Label.Detail></Label>
        <Label size="large" color="black" style={{ fontSize: "16px" }}>Ground<Label.Detail>{tipped}</Label.Detail></Label>
        <Label size="large" color="black" style={{ fontSize: "16px" }}>Tipped<Label.Detail>{ground}</Label.Detail></Label>
        <Divider></Divider>
        <label>what to graph</label>
        <Form.Select
          value={graph}
          options={graphOptions}
          onChange={(e, data) => handleChart(e, data.value)}
          style={{ fontSize: "16px" }}
        ></Form.Select>
        <LineChart data={chartData} curve={false} />
        <Checkbox label={"Low"} checked={low} onClick={() => setLow(!low)}></Checkbox>
        <Checkbox label={"Mid"} checked={mid} onClick={() => setMid(!mid)}></Checkbox>
        <Checkbox label={"High "} checked={high} onClick={() => setHigh(!high)}></Checkbox>
        <Checkbox label={"All"} checked={all} onClick={() => setAll(!all)}></Checkbox>
        <Divider></Divider>
        <label>Scouters: {namesList.map((item, index) => {return<label key={index}>{item} </label>})}
        </label>
        <Table celled small collapsing basic unstackable striped compact>
          <Table.Body>
            <Table.Row>
              <Table.HeaderCell style={{ textAlign: "center", width: "110px" }}>Match</Table.HeaderCell>
              <Table.HeaderCell style={{ textAlign: "center", width: "110px" }}>Intakes</Table.HeaderCell>
              <Table.HeaderCell style={{ textAlign: "center", width: "110px" }}>Accuracy*</Table.HeaderCell>
              <Table.HeaderCell style={{ textAlign: "center", width: "110px" }}>*Auto High Cone*</Table.HeaderCell>
              <Table.HeaderCell style={{ textAlign: "center", width: "110px" }}>*Auto High Cube*</Table.HeaderCell>
              <Table.HeaderCell style={{ textAlign: "center", width: "110px" }}>Auto Mid Cone</Table.HeaderCell>
              <Table.HeaderCell style={{ textAlign: "center", width: "110px" }}>Auto Mid Cube</Table.HeaderCell>
              <Table.HeaderCell style={{ textAlign: "center", width: "110px" }}>Auto Low Cone</Table.HeaderCell>
              <Table.HeaderCell style={{ textAlign: "center", width: "110px" }}>*Auto Low Cube*</Table.HeaderCell>
              <Table.HeaderCell style={{ textAlign: "center", width: "110px" }}>*Tele High Cone*</Table.HeaderCell>
              <Table.HeaderCell style={{ textAlign: "center", width: "110px" }}>*Tele High Cube*</Table.HeaderCell>
              <Table.HeaderCell style={{ textAlign: "center", width: "110px" }}>Tele Mid Cone</Table.HeaderCell>
              <Table.HeaderCell style={{ textAlign: "center", width: "110px" }}>Tele Mid Cube</Table.HeaderCell>
              <Table.HeaderCell style={{ textAlign: "center", width: "110px" }}>Tele Low Cone</Table.HeaderCell>
              <Table.HeaderCell style={{ textAlign: "center", width: "110px" }}>*Tele Low Cube*</Table.HeaderCell>
              <Table.HeaderCell style={{ textAlign: "center", width: "110px" }}>Auto Dock</Table.HeaderCell>
              <Table.HeaderCell style={{ textAlign: "center", width: "110px" }}>Auto Engage</Table.HeaderCell>
              <Table.HeaderCell style={{ textAlign: "center", width: "110px" }}>Tele Dock</Table.HeaderCell>
              <Table.HeaderCell style={{ textAlign: "center", width: "110px" }}>Tele Engage</Table.HeaderCell>
            </Table.Row>
            {data.map(
              ({
                MatchNo,
                groundIntakes,
                autoHighConeCount,
                autoHighCubeCount,
                autoMidConeCount,
                autoMidCubeCount,
                autoLowConeCount,
                autoLowCubeCount,
                teleHighConeCount,
                teleHighCubeCount,
                teleMidConeCount,
                teleMidCubeCount,
                teleLowConeCount,
                teleLowCubeCount,
                autoDocked,
                autoEngaged,
                teleDocked,
                teleEngaged
              }) => (
                <Table.Row key={String(MatchNo)}>
                  <Table.Cell style={{ textAlign: "center" }}><Link to={"/teampages?match=" + String(MatchNo)}><Button>{MatchNo}</Button></Link></Table.Cell>
                  <Table.Cell style={{ textAlign: "center" }}>{groundIntakes}</Table.Cell>
                  <Table.Cell style={{ textAlign: "center" }}>{String(Math.round(100*((autoHighConeCount+autoHighCubeCount+autoMidConeCount+autoMidCubeCount+autoLowConeCount+autoLowCubeCount+teleHighConeCount+teleHighCubeCount+teleMidConeCount+teleMidCubeCount+teleLowConeCount+teleLowCubeCount)/groundIntakes))) + "%"}</Table.Cell>
                  <Table.Cell style={{ textAlign: "center" }}>{autoHighConeCount}</Table.Cell>
                  <Table.Cell style={{ textAlign: "center" }}>{autoHighCubeCount}</Table.Cell>
                  <Table.Cell style={{ textAlign: "center" }}>{autoMidConeCount}</Table.Cell>
                  <Table.Cell style={{ textAlign: "center" }}>{autoMidCubeCount}</Table.Cell>
                  <Table.Cell style={{ textAlign: "center" }}>{autoLowConeCount}</Table.Cell>
                  <Table.Cell style={{ textAlign: "center" }}>{autoLowCubeCount}</Table.Cell>
                  <Table.Cell style={{ textAlign: "center" }}>{teleHighConeCount}</Table.Cell>
                  <Table.Cell style={{ textAlign: "center" }}>{teleHighCubeCount}</Table.Cell>
                  <Table.Cell style={{ textAlign: "center" }}>{teleMidConeCount}</Table.Cell>
                  <Table.Cell style={{ textAlign: "center" }}>{teleMidCubeCount}</Table.Cell>
                  <Table.Cell style={{ textAlign: "center" }}>{teleLowConeCount}</Table.Cell>
                  <Table.Cell style={{ textAlign: "center" }}>{teleLowCubeCount}</Table.Cell>
                  <Table.Cell style={{ textAlign: "center" }}>{String(autoDocked)}</Table.Cell>
                  <Table.Cell style={{ textAlign: "center" }}>{String(autoEngaged)}</Table.Cell>
                  <Table.Cell style={{ textAlign: "center" }}>{String(teleDocked)}</Table.Cell>
                  <Table.Cell style={{ textAlign: "center" }}>{String(teleEngaged)}</Table.Cell>
                </Table.Row>
              )
            )}
          </Table.Body>
        </Table>
      </Container>
      <Container style={{ display: "flex" }}>
        <Form.Group style={{ minWidth: 300 }}>
          <Header style={{ marginLeft: 20, marginTop: "30px" }} as="h3">
            Comments
          </Header>
          <Header style={{ marginLeft: 20 }} as="h5">Driver and Defense</Header>
          <Segment massive style={{ marginLeft: 20, whiteSpace: "pre-line" }}>{realDefense}</Segment>
        </Form.Group>
        <Form.Group style={{ marginLeft: 40 }}>
          <Header style={{ marginTop: "30px" }}>Auto Starts</Header>
          <CanvasDisplay data={coords}></CanvasDisplay>
        </Form.Group>
      </Container>
      <Header>pic</Header>
      <img src={pitData.dataUri} alt="Team Pic" />
      <Modal
        size="mini"
        centered={false}
        open={showModal}
        onClose={() => setShowModal(false)}
      >
        <Modal.Header>Team not found</Modal.Header>
        <Modal.Content>
          <p>{queryTeam} not found</p>
        </Modal.Content>
        <Modal.Actions>
          <Button positive onClick={() => setShowModal(false)}>
            OK
          </Button>
        </Modal.Actions>
      </Modal>
    </Container>
  );
  
};

export default TeamLookup;
