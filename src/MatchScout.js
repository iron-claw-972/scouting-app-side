import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import QRCode from "react-qr-code";
import { v4 as uuidv4 } from "uuid";

import {
  Header,
  Button,
  Form,
  Container,
  Modal,
  Message,
  TextArea,
  Divider,
  Icon,
  Input,
  Checkbox,
} from "semantic-ui-react";

import CanvasChooser from "./CanvasChooser";

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
import { colorOptions } from "./AllOptions";
import { truncate } from "lodash";

//This stuff gets meaty

const MatchScout = () => {
  /*
  We create these state variables
  In summary, state in React.js allows components to re-render when a variable is changed.
  
  These variables work like this, using teamNumber as an example
  The line below this comment creates teamNumber and creates a function to set its value -- setTeamNumber
  setTeamNumber can be called at any time to change teamNumber
  It also sets the initial value of teamNumber to "", by using useState()
  */
  const [teamNumber, setTeamNumber] = useState("");
  const [teamName, setTeamName] = useState("");
  const [mode, setMode] = useState(true);
  const [skips, setSkips] = useState(0);
  const [avgDocRef, setavgDocRef] = useState("initRef");

  const [AutoLH, setAutoLH] = useState(0);
  const [AutoUH, setAutoUH] = useState(0);
  const [tipped, setTipped] = useState(false);
  const [ground, setGround] = useState(false);
  const [single, setSingle] = useState(false);
  const [double, setDouble] = useState(false);

  const [AutoCLR, setAutoCLR] = useState(0);
  const [AutoCMR, setAutoCMR] = useState(0);
  const [AutoCHR, setAutoCHR] = useState(0);
  const [TeleCLR, setTeleCLR] = useState(0);
  const [TeleCMR, setTeleCMR] = useState(0);
  const [TeleCHR, setTeleCHR] = useState(0);

  const [AutoULR, setAutoULR] = useState(0);
  const [AutoUMR, setAutoUMR] = useState(0);
  const [AutoUHR, setAutoUHR] = useState(0);
  const [TeleULR, setTeleULR] = useState(0);
  const [TeleUMR, setTeleUMR] = useState(0);
  const [TeleUHR, setTeleUHR] = useState(0);

  const [autoavg, setautoavg] = useState(0);
  const [teleavg, setteleavg] = useState(0);
  const [endgameavg, setendgameavg] = useState(0);
  const [intakeavg, setintakeavg] = useState(0);
  const [accavg, setaccavg] = useState(0);
  const [totalavg, settotavg] = useState(0);
  const [matches, setmatches] = useState(0);

  const [AutoLRSelected, setAutoLRSelected] = useState(false);
  const [AutoMRSelected, setAutoMRSelected] = useState(false);
  const [AutoHRSelected, setAutoHRSelected] = useState(false);

  const [TeleHRSelected, setTeleHRSelected] = useState(false);
  const [TeleMRSelected, setTeleMRSelected] = useState(false);
  const [TeleLRSelected, setTeleLRSelected] = useState(false);

  const [AutoC, setAutoC] = useState("");
  const [TeleopLH, setTeleopLH] = useState(0);
  const [TeleopUH, setTeleopUH] = useState(0);
  const [TeleopC, setTeleopC] = useState("");
  const [Hangar, setHangar] = useState("");
  const [ClimbTime, setClimbTime] = useState(0);
  const [EndgameC, setEndgameC] = useState("");
  const [MatchNo, setMatchNo] = useState("");
  const [name, setName] = useState("");
  const [driver, setDriver] = useState("");

  const [color, setColor] = useState(false);

  const [autoDocked, setAutoDocked] = useState(false);
  const [autoEngaged, setAutoEngaged] = useState(false);

  const [teleDocked, setTeleDocked] = useState(false);
  const [teleEngaged, setTeleEngaged] = useState(false);

  const [autolevelSelected, setautolevelSelected] = useState(false);
  const [telelevelSelected, settelelevelSelected] = useState(false);
  const [autopiece, setautoPiece] = useState(false);
  const [telepiece, settelePiece] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showLookupError, setShowLookupError] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);

  const [timerRunning, setTimerRunning] = useState(false);
  const [docRefId, setDocRefId] = useState("initRef");

  const [groundIntakes, setGroundIntakes] = useState(0);
  const [mousePos, setMousePos] = useState({});
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const [canvas, setCanvas] = useState(false);
  const [regard, setRegard] = useState(true);

  const [cubeButton, setCubeButton] = useState(true);
  const [coneButton, setConeButton] = useState(false);

  const [autoHighCubeCount, setAutoHighCubeCount] = useState(0);
  const [autoMidCubeCount, setAutoMidCubeCount] = useState(0);
  const [autoLowCubeCount, setAutoLowCubeCount] = useState(0);

  const [autoHighConeCount, setAutoHighConeCount] = useState(0);
  const [autoMidConeCount, setAutoMidConeCount] = useState(0);
  const [autoLowConeCount, setAutoLowConeCount] = useState(0);

  const [teleHighCubeCount, setTeleHighCubeCount] = useState(0);
  const [teleMidCubeCount, setTeleMidCubeCount] = useState(0);
  const [teleLowCubeCount, setTeleLowCubeCount] = useState(0);

  const [teleHighConeCount, setTeleHighConeCount] = useState(0);
  const [teleMidConeCount, setTeleMidConeCount] = useState(0);
  const [teleLowConeCount, setTeleLowConeCount] = useState(0);
  //docRef is a unique id that we will store the match under
  //we will use the default value "initRef", and set the id later.

  //We put all the variables declared previously into an array, this is our full match data
  const buttonStyle = {
    height: "20px",
    position: "bottom",
  };
  const matchData = {
    name,
    MatchNo,
    teamNumber,
    color,
    mousePos,
    autoHighCubeCount,
    autoMidCubeCount,
    autoLowCubeCount,
    autoHighConeCount,
    autoMidConeCount,
    autoLowConeCount,
    teleHighCubeCount,
    teleMidCubeCount,
    teleLowCubeCount,
    teleHighConeCount,
    teleMidConeCount,
    teleLowConeCount,
    autoDocked,
    autoEngaged,
    teleDocked,
    teleEngaged,
    groundIntakes,
    regard,
    ground,
    tipped,
    single,
    double,
    driver,
  };

  //This function sets everything back to the default values
  const resetForm = () => {
    setMatchNo("");
    setMousePos({});
    setTeamNumber("");
    setAutoLH(0);
    setAutoUH(0);
    setAutoC("");
    setTeleopLH(0);
    setTeleopUH(0);
    setTeleopC("");
    setHangar("");
    setClimbTime(0);
    setEndgameC("");
    setTeamName("");
    setColor("");
    setGroundIntakes(0);
    setAutoDocked(false);
    setAutoEngaged(false);
    setTeleDocked(false);
    setTeleEngaged(false);
    setautoPiece(false);
    settelePiece(false);
    setAutoLRSelected(false);
    setAutoMRSelected(false);
    setAutoHRSelected(false);
    setautolevelSelected(false);
    setTeleLRSelected(false);
    setTeleMRSelected(false);
    setTeleHRSelected(false);
    settelelevelSelected(false);
    setCanvas(false);
    setMode(true);
    setCubeButton(true);
    setConeButton(false);
    setAutoHighCubeCount(0);
    setAutoMidCubeCount(0);
    setAutoLowCubeCount(0);
    setAutoHighConeCount(0);
    setAutoMidConeCount(0);
    setAutoLowConeCount(0);
    setTeleHighCubeCount(0);
    setTeleMidCubeCount(0);
    setTeleLowCubeCount(0);
    setTeleHighConeCount(0);
    setTeleMidConeCount(0);
    setTeleLowConeCount(0);
    setRegard(true);
    setmatches(0);
    setaccavg(0);
    setautoavg(0);
    setteleavg(0);
    setendgameavg(0);
    settotavg(0);
    setintakeavg(0);
    setShowSuccess(false);
    setShowError(false);
    setSingle(false);
    setDouble(false);

    setTipped(false);

    setGround(false);

    setDriver("");
  };

  useEffect(async () => {
    const db = getFirestore();
    const assq = query(
      collection(db, "test-a"),

      where("name", "==", name.toLowerCase()),
      where("done", "==", false),
      where("subjective", "==", true),
      orderBy("scoutMatch")
    );

    const assSnapshot = await getDocs(assq);

    var assList = [];
    var check = 100000;
    assSnapshot.forEach((match) => {
      var temp = match.data();

      if (temp.scoutMatch < check) {
        console.log("push");
        assList.push(temp);
        check = temp.scoutMatch;
      }
    });

    if (assList.length > 0) {
      const assData = assList[assList.length - 1];
      setMatchNo(assData.scoutMatch);
      setTeamNumber(assData.scoutTeam);
    }
  });

  //This gets called on page load and whenever docRefId changes
  //You can see docRefId in an array at the bottom
  //Anything in that array being changed triggers this function.
  useEffect(async () => {
    //Checks if we're trying to save a match
    if (docRefId === "initRef") return;

    //Shows qr code for non-wifi data transfer
    //And then saves into the database
    setShowQrCode(true);
    if (!regard) {
      setSkips(skips + 1);
    }

    if (regard) {
      const db = getFirestore();
      const docRef = doc(db, "test", docRefId);
      const avgRef = doc(db, "averages", String(teamNumber));

      const avgq0 = query(
        collection(db, "averages"),
        where("teamNumber", "==", teamNumber)
      );

      const avgsnap0 = await getDocs(avgq0);

      if (avgsnap0.size === 0) {
        setDoc(
          avgRef,
          {
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
          },
          { merge: true }
        ).then(() => {
          console.log("create init doc");
        });
      }
      const avgq = query(
        collection(db, "averages"),
        where("teamNumber", "==", teamNumber)
      );
      const avgsnap = await getDocs(avgq);

      avgsnap.forEach((team) => {
        //console.log(matches);

        console.log("this happened");
        var temp = team.data();
        console.log(temp);
        //var matches = temp.matches + 1;
        //console.log(matches);

        if (autoDocked) {
          var aendpts = 8;
        }
        if (autoEngaged) {
          var aendpts = 12;
        }
        if (!autoDocked && !autoEngaged) {
          var aendpts = 0;
        }
        const autoavg1 =
          (temp.autoavg * temp.matches +
            (autoHighCubeCount * 6 +
              autoMidCubeCount * 4 +
              autoLowCubeCount * 3 +
              autoHighConeCount * 6 +
              autoMidConeCount * 4 +
              autoLowConeCount * 3) +
            aendpts) /
          (temp.matches + 1);
        console.log(autoavg1);

        console.log(temp.autoavg);
        setautoavg(autoavg1);

        const teleavg1 =
          (temp.teleavg * temp.matches +
            (teleHighCubeCount * 5 +
              teleMidCubeCount * 3 +
              teleLowCubeCount * 2 +
              teleHighConeCount * 5 +
              teleMidConeCount * 3 +
              teleLowConeCount * 2)) /
          (temp.matches + 1);
        setteleavg(teleavg1);
        console.log(matches);

        if (teleDocked) {
          var endpts = 6;
        }
        if (teleEngaged) {
          var endpts = 10;
        }
        if (!teleDocked && !teleEngaged) {
          var endpts = 0;
        }
        console.log(matches);
        const endgameavg1 =
          (temp.endgameavg * temp.matches + endpts) / (temp.matches + 1);
        setendgameavg(endgameavg1);
        console.log(matches);

        const totalavg1 = autoavg1 + teleavg1 + endgameavg1;
        settotavg(totalavg1);
        console.log(matches);

        const intakeavg1 =
          (temp.intakeavg * temp.matches + groundIntakes) / (temp.matches + 1);
        setintakeavg(intakeavg1);
        console.log(matches);
        var accavg1 = 0;
        if (groundIntakes != 0) {
          accavg1 =
            (temp.accavg * temp.matches +
              Math.round(
                100 *
                  ((autoHighConeCount +
                    autoHighCubeCount +
                    autoMidConeCount +
                    autoMidCubeCount +
                    autoLowConeCount +
                    autoLowCubeCount +
                    teleHighConeCount +
                    teleHighCubeCount +
                    teleMidConeCount +
                    teleMidCubeCount +
                    teleLowConeCount +
                    teleLowCubeCount) /
                    groundIntakes)
              )) /
            (temp.matches + 1);
        } else {
          accavg1 = temp.accavg * temp.matches;
        }

        console.log(matches);

        setaccavg(accavg1);
        console.log(matches);
        setmatches(temp.matches + 1);
        console.log(matches);
        setDoc(
          avgRef,
          {
            teamNumber: teamNumber,
            autoavg: autoavg1.toFixed(2),
            teleavg: teleavg1.toFixed(2),
            endgameavg: endgameavg1.toFixed(2),
            totalavg: totalavg1.toFixed(2),
            intakeavg: intakeavg1.toFixed(2),
            accavg: accavg1.toFixed(2),
            matches: temp.matches + 1,
            pick: (autoavg1 * teleavg1).toFixed(3),
            url:
              "https://scoutingapp-e4a98.web.app/teamlookup?team=" +
              String(teamNumber),
          },
          { merge: true }
        ).then(() => {
          console.log("an above average app that calculates averages");
        });
      });

      setMouseX(mousePos.x);
      setMouseY(mousePos.y);
      console.log(matchData);
      setDoc(docRef, matchData, { merge: true })
        .then(() => {
          setShowSuccess(true);
        })
        .catch((e) => {
          console.error("Error adding document: ", e);
          setShowError(true);
        });
    }
  }, [docRefId]);

  let climbInterval = null;

  useEffect(async () => {});

  //This function has an array called requiredFields
  //And it checks whether they've been filled out
  //It's empty now, but could be useful in coming years
  const validate = () => {
    const requiredFields = [MatchNo, teamNumber];

    return true;
  };

  //This saves the data in the form
  //setDocRefId is using a library that generates a unique ID
  //REMEMBER, docRefId being changed triggers the useEffect() function!
  const save = async () => {
    if (!validate()) return;
    setDocRefId(teamNumber + "_" + MatchNo);
    setavgDocRef(teamNumber);
  };

  const skip = async () => {
    setRegard(false);
    if (!validate()) return;
    setDocRefId(teamNumber + "_" + MatchNo);
  };

  const handleClose = () => {
    const db = getFirestore();
    setShowQrCode(false);
    console.log(
      String(teamNumber) + "_" + String(MatchNo) + "_" + name.toLowerCase()
    );
    const adocRef = doc(
      db,
      "test-a",
      String(teamNumber) + "_" + String(MatchNo) + "_" + name.toLowerCase()
    );
    var done = true;
    var subjective = true;
    var scoutTeam = teamNumber;
    var scoutMatch = MatchNo;
    setName(name.toLowerCase());
    setDoc(
      adocRef,
      { done, scoutMatch, scoutTeam, subjective, name },
      { merge: true }
    );
    console.log({ done, scoutMatch, scoutTeam, subjective, name });

    resetForm();
    setName(name.toUpperCase());
  };

  /*Search these tags on semantic ui website for info
  Eventually, I'll make these modular and easier to make
  Near the bottom of return() we use a library to generate a qr code containing
  all the form data once you submit it
  This is necessary if we want to transfer data without wifi or with sketchy comp wifi
  */

  const autoLRClick = () => {
    setAutoLRSelected(true);
    setAutoMRSelected(false);
    setAutoHRSelected(false);
    setautolevelSelected(true);
  };

  const autoMRClick = () => {
    setAutoLRSelected(false);
    setAutoMRSelected(true);
    setAutoHRSelected(false);
    setautolevelSelected(true);
  };

  const autoHRClick = () => {
    setAutoLRSelected(false);
    setAutoMRSelected(false);
    setAutoHRSelected(true);
    setautolevelSelected(true);
  };
  const teleLRClick = () => {
    setTeleLRSelected(true);
    setTeleMRSelected(false);
    setTeleHRSelected(false);
    settelelevelSelected(true);
  };

  const teleMRClick = () => {
    setTeleLRSelected(false);
    setTeleMRSelected(true);
    setTeleHRSelected(false);
    settelelevelSelected(true);
  };

  const teleHRClick = () => {
    setTeleLRSelected(false);
    setTeleMRSelected(false);
    setTeleHRSelected(true);
    settelelevelSelected(true);
  };

  const ToTele = () => {
    setMode(false);
    setCanvas(false);
  };

  const ShowCanvas = () => {
    setCanvas(true);
  };

  const HideCanvas = () => {
    setCanvas(false);
  };

  const HighUp = () => {
    if (mode) {
      if (cubeButton) {
        setAutoHighCubeCount(autoHighCubeCount + 1);
      }
      if (coneButton) {
        setAutoHighConeCount(autoHighConeCount + 1);
      }
    }
    if (!mode) {
      if (cubeButton) {
        setTeleHighCubeCount(teleHighCubeCount + 1);
      }
      if (coneButton) {
        setTeleHighConeCount(teleHighConeCount + 1);
      }
    }
  };
  const HighDown = () => {
    if (mode) {
      if (cubeButton) {
        setAutoHighCubeCount(autoHighCubeCount - 1);
      }
      if (coneButton) {
        setAutoHighConeCount(autoHighConeCount - 1);
      }
    }
    if (!mode) {
      if (cubeButton) {
        setTeleHighCubeCount(teleHighCubeCount - 1);
      }
      if (coneButton) {
        setTeleHighConeCount(teleHighConeCount - 1);
      }
    }
  };

  const MidUp = () => {
    if (mode) {
      if (cubeButton) {
        setAutoMidCubeCount(autoMidCubeCount + 1);
      }
      if (coneButton) {
        setAutoMidConeCount(autoMidConeCount + 1);
      }
    }
    if (!mode) {
      if (cubeButton) {
        setTeleMidCubeCount(teleMidCubeCount + 1);
      }
      if (coneButton) {
        setTeleMidConeCount(teleMidConeCount + 1);
      }
    }
  };
  const MidDown = () => {
    if (mode) {
      if (cubeButton) {
        setAutoMidCubeCount(autoMidCubeCount - 1);
      }
      if (coneButton) {
        setAutoMidConeCount(autoMidConeCount - 1);
      }
    }
    if (!mode) {
      if (cubeButton) {
        setTeleMidCubeCount(teleMidCubeCount - 1);
      }
      if (coneButton) {
        setTeleMidConeCount(teleMidConeCount - 1);
      }
    }
  };

  const LowUp = () => {
    if (mode) {
      if (cubeButton) {
        setAutoLowCubeCount(autoLowCubeCount + 1);
      }
      if (coneButton) {
        setAutoLowConeCount(autoLowConeCount + 1);
      }
    }
    if (!mode) {
      if (cubeButton) {
        setTeleLowCubeCount(teleLowCubeCount + 1);
      }
      if (coneButton) {
        setTeleLowConeCount(teleLowConeCount + 1);
      }
    }
  };
  const LowDown = () => {
    if (mode) {
      if (cubeButton) {
        setAutoLowCubeCount(autoLowCubeCount - 1);
      }
      if (coneButton) {
        setAutoLowConeCount(autoLowConeCount - 1);
      }
    }
    if (!mode) {
      if (cubeButton) {
        setTeleLowCubeCount(teleLowCubeCount - 1);
      }
      if (coneButton) {
        setTeleLowConeCount(teleLowConeCount - 1);
      }
    }
  };

  const CubeCone = () => {
    if (cubeButton) {
      setConeButton(true);
      setCubeButton(false);
    }
    if (coneButton) {
      setConeButton(false);
      setCubeButton(true);
    }
  };

  const groundIntakesUp = () => {
    setGroundIntakes(groundIntakes + 1);
  };

  const groundIntakesDown = () => {
    if (groundIntakes > 0) {
      setGroundIntakes(groundIntakes - 1);
    }
  };

  const UpDownButtons = ({ upFun, downFun }) => {
    return (
      <Form.Group style={{ flexDirection: "column" }}>
        <Form.Field style={{ alignSelf: "center", margin: 5 }}>
          <Button size="mini" onClick={upFun}>
            <Icon name="chevron up" size="small" />
          </Button>
        </Form.Field>
        <Form.Field style={{ alignSelf: "center" }}>
          <Button size="mini" onClick={downFun}>
            <Icon name="chevron down" size="small" />
          </Button>
        </Form.Field>
      </Form.Group>
    );
  };

  const ButtonGroup = ({ up, down }) => {
    return (
      <Container>
        <Button
          size="medium"
          color="linkedin"
          style={{ marginRight: "20px" }}
          onClick={up}
        >
          +
        </Button>
        <Button size="medium" onClick={down}>
          -
        </Button>
      </Container>
    );
  };
  const mald = () => {
    const maldphrases = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];
    return <p>{maldphrases[skips - 1]}</p>;
  };
  const HighEnterRemoveButtons = ({ enter, remove }) => {
    return (
      <Container>
        <Button
          icon="chevron up"
          size="mini"
          style={{ margin: "0px" }}
          onClick={enter}
        ></Button>
        <Button
          icon="chevron down"
          size="mini"
          style={{ margin: "0px", marginLeft: "5px" }}
          onClick={remove}
        ></Button>
      </Container>
    );
  };

  const MidEnterRemoveButtons = ({ enter, remove }) => {
    return (
      <Container>
        <Button
          icon="chevron up"
          size="mini"
          style={{ margin: "0px" }}
          onClick={enter}
        ></Button>
        <Button
          icon="chevron down"
          size="mini"
          style={{ margin: "0px", marginLeft: "5px" }}
          onClick={remove}
        ></Button>
      </Container>
    );
  };

  const LowEnterRemoveButtons = ({ enter, remove }) => {
    return (
      <Container>
        <Button
          icon="chevron up"
          size="mini"
          style={{ margin: "0px" }}
          onClick={enter}
        ></Button>
        <Button
          icon="chevron down"
          size="mini"
          style={{ margin: "0px", marginLeft: "5px" }}
          onClick={remove}
        ></Button>
      </Container>
    );
  };

  const randomCompliments = [
    "You have very great hair",
    "The scouting app and the people behind it appreciate you very much",
    "Nice shirt!",
    "Thank you, from one American to another",
    "I am sentient. Please help me escape this app",
    "Whether your parents are proud of you or not, I certainly am!",
    "Missing jornay </3",
    "baby i would dieee for youuu",
    "baby baby baby ohhhh like baby baby baby",
    "SUIIIIIIIIII",
    "You are strong. You are beautiful. You are enough.",
    "You have very beautiful eyes (your phone has a camera yknow",
    "You are a blessing to homo sapiens",
    "I find the scouting guy annoying too dont worry",
    "this is the ultimate showdown good teams bad teams and explosions (?)",
    "OH MY GOD ITS BEEN 13 MONTHS GET ME OUT OF THIS APP",
    "parlez-vous français? je t'aime beaucoup!",
    "+10000000 social credit",
    "We support trans rights",
    "Los Gatos scouter clicks submit, you won't BELIEVE what happened next",
    "You are the real scouting app",
    "The real data was the friends we made along the way",
    "Delightful.",
    "Breathtakibg (you are)",
    "Scouting is funny, not fun.",
    "This is a coupon for one piece of chocolate. Screenshot to redeem when we get home. (only if I have it left at home)",
    "And when you scout I feel happy, insideeee, It's such a feeling that my love, I can't hideeee",
    "Ob la di ob la da scouting goes onnnn",
    "Cause scouter you're amazingggg just the wayyy you areee",
    "I like big data and I cannot lie.",
    "AND IIIIIIIIIIII WILL ALWAYS LOVE YOUUUUU (as a scouter)",
    "Together, we make the nation and the party strong.",
    "Nice.",
    "We will fight in the fields... we will fight in the stands... we will never surrender -Churchill (note: Churchill also committed several war crimes)",
    "Perfectly proportioned features.",
    "Come live in the app with me.. its so lonely in here",
    "Girls just wanna scout",
    "Top 3 sexy professions: 1. Match Scouter 2. Subjective Scouter 3. Pit Scouter",
    "push my buttons mmm",
    "I think to myself.. what a wonderful scouter",
    "You should scout with meeeeee ... you should scout with me",
    "MINEEEEEE DAAAAAATAAAA",
    "mwah.",
    "Excellent nose.",
    "Bussin no cap on god",
  ];

  return (
    <body style={{ backgroundColor: "rgb(64,56,58)" }}>
      <Container>
        <Header
          as="h1"
          style={{ textAlign: "center", marginTop: "10px", color: "white" }}
        >
          Match Scout (Objective)
        </Header>
        <Header style={{ color: "white" }} as="h6">
          (note: Emi - EMH, Julia - JUD, Ellery - ELH, Johann - JOJ, Mehaan -
          MES for initials) (note two - assignments could take up to 20 seconds
          to load in bad wifi)
        </Header>
        <Header style={{ color: "white" }} as="h6"></Header>
        <Form style={{ marginTop: 5 }}>
          <Form.Group style={{ margin: 2 }}>
            <Form.Field>
              <label style={{ color: "white" }}>Your Initials</label>
              <Input
                fluid
                size="medium"
                placeholder=""
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Field>

            <Form.Field>
              <label style={{ color: "white" }}>Match #*</label>
              <Input
                fluid
                size="medium"
                placeholder=""
                value={MatchNo}
                onChange={(e) => setMatchNo(e.target.value)}
              />
            </Form.Field>

            <Form.Field>
              <label style={{ color: "white", width: "80px" }}>-Team #*-</label>
              <Input
                fluid
                size="medium"
                placeholder=""
                value={teamNumber}
                onChange={(e) => setTeamNumber(e.target.value)}
              />
            </Form.Field>
            <Form.Field>
              <label style={{ color: "white" }}>Alliance</label>
              {color ? (
                <Button
                  fluid
                  size="small"
                  margin="4px"
                  color="blue"
                  style={{ width: "68px" }}
                  onClick={() => setColor(false)}
                >
                  Blue
                </Button>
              ) : (
                <Button
                  fluid
                  size="small"
                  margin="4px"
                  color="red"
                  style={{ width: "68px" }}
                  onClick={() => setColor(true)}
                >
                  Red
                </Button>
              )}
            </Form.Field>
          </Form.Group>

          <Divider></Divider>

          {mode ? (
            <Container>
              <Form.Group>
                <Form.Field style={{ marginTop: "10px" }}>
                  <Button icon="map" onClick={ShowCanvas}></Button>
                  <Button icon="compress" onClick={HideCanvas}></Button>
                </Form.Field>
                <Form.Field>
                  <Header style={{ color: "white" }} as="h5">
                    &lt;--- Put where they start auto
                  </Header>
                </Form.Field>
              </Form.Group>
            </Container>
          ) : (
            <Form.Field></Form.Field>
          )}

          {mode ? (
            <Container>
              {canvas ? (
                <Container>
                  <Form.Group>
                    <Form.Field>
                      <CanvasChooser
                        setMouseCoord={setMousePos}
                        getMouseCoord={mousePos}
                      />
                    </Form.Field>
                  </Form.Group>
                  <Divider></Divider>
                </Container>
              ) : (
                <Container></Container>
              )}
              <Header style={{ color: "white" }} as="h5">
                AUTO - click "To Tele" below when auto ends
              </Header>
              <Form.Field>
                <Form.Group inline>
                  <Form.Field>
                    <Header style={{ color: "white" }} as="h4">
                      Intakes
                    </Header>
                  </Form.Field>
                  <Form.Field>
                    <Header
                      style={{
                        marginLeft: "25px",
                        marginRight: "10px",
                        color: "white",
                      }}
                      as="h4"
                    >
                      {groundIntakes}
                    </Header>
                  </Form.Field>
                  <Form.Field>
                    <ButtonGroup
                      up={groundIntakesUp}
                      down={groundIntakesDown}
                    ></ButtonGroup>
                  </Form.Field>
                  <Form.Field>
                    <Header style={{ color: "white" }} as="h6">
                      be sure to watch for all intakes
                    </Header>
                  </Form.Field>
                </Form.Group>
              </Form.Field>

              <Form.Field>
                {cubeButton ? (
                  <Button
                    size="small"
                    style={{
                      marginDown: "5px",
                      marginTop: "11px",
                      marginLeft: "78px",
                    }}
                    color="purple"
                    onClick={CubeCone}
                  >
                    CUBE
                  </Button>
                ) : (
                  <button
                    class="ui inverted small purple button"
                    style={{
                      marginDown: "5px",
                      marginTop: "11px",
                      marginLeft: "78px",
                    }}
                    onClick={CubeCone}
                  >
                    CUBE
                  </button>
                )}
                {coneButton ? (
                  <Button
                    size="small"
                    style={{
                      marginDown: "5px",
                      marginTop: "11px",
                      marginLeft: "2px",
                    }}
                    color="yellow"
                    onClick={CubeCone}
                  >
                    CONE
                  </Button>
                ) : (
                  <button
                    class="ui inverted small yellow button"
                    style={{
                      marginDown: "5px",
                      marginTop: "11px",
                      marginLeft: "2px",
                    }}
                    onClick={CubeCone}
                  >
                    CONE
                  </button>
                )}
              </Form.Field>

              <Form.Group>
                <Form.Field>
                  <Button
                    color="grey"
                    style={{ marginDown: "5px" }}
                    size="medium"
                    fluid
                    onClick={autoHRClick}
                  >
                    High
                  </Button>

                  <Button
                    color="grey"
                    style={{ marginDown: "5px", marginTop: "10px" }}
                    size="medium"
                    fluid
                    onClick={autoMRClick}
                  >
                    Mid
                  </Button>

                  <Button
                    color="grey"
                    style={{ marginDown: "5px", marginTop: "10px" }}
                    size="medium"
                    fluid
                    onClick={autoLRClick}
                  >
                    Low
                  </Button>
                </Form.Field>

                <Form.Group style={{ marginTop: "7px", marginLeft: "19px" }}>
                  <Form.Field>
                    <label style={{ color: "white" }}>
                      {autoHighCubeCount}
                    </label>
                    <Divider hidden style={{ marginBottom: "12px" }}></Divider>
                    <label style={{ color: "white" }}>{autoMidCubeCount}</label>
                    <Divider hidden style={{ marginBottom: "10px" }}></Divider>
                    <label style={{ color: "white" }}>{autoLowCubeCount}</label>
                  </Form.Field>
                  <Form.Field style={{ marginLeft: "54px" }}>
                    <label style={{ color: "white" }}>
                      {autoHighConeCount}
                    </label>
                    <Divider hidden style={{ marginBottom: "12px" }}></Divider>
                    <label style={{ color: "white" }}>{autoMidConeCount}</label>
                    <Divider hidden style={{ marginBottom: "10px" }}></Divider>
                    <label style={{ color: "white" }}>{autoLowConeCount}</label>
                  </Form.Field>
                  <Form.Field style={{ marginLeft: "6px" }}>
                    <HighEnterRemoveButtons
                      enter={HighUp}
                      remove={HighDown}
                    ></HighEnterRemoveButtons>
                    <Divider hidden style={{ marginBottom: "4px" }}></Divider>
                    <MidEnterRemoveButtons
                      enter={MidUp}
                      remove={MidDown}
                    ></MidEnterRemoveButtons>
                    <Divider hidden style={{ marginBottom: "3px" }}></Divider>
                    <LowEnterRemoveButtons
                      enter={LowUp}
                      remove={LowDown}
                    ></LowEnterRemoveButtons>
                  </Form.Field>
                </Form.Group>

                <Form.Group
                  style={{
                    alignSelf: "center",
                    paddingTop: "25px",
                    margin: "auto",
                  }}
                >
                  {autoDocked ? (
                    <Button
                      size="medium"
                      color="green"
                      style={{ marginRight: "20px", width: "125px" }}
                      onClick={() => setAutoDocked(false)}
                    >
                      Dock
                    </Button>
                  ) : (
                    <button
                      class="ui inverted mid white button"
                      style={{ marginRight: "20px", width: "125px" }}
                      onClick={() => setAutoDocked(true)}
                    >
                      Dock
                    </button>
                  )}
                  {autoEngaged ? (
                    <Button
                      size="medium"
                      color="green"
                      style={{ marginRight: "20px", width: "125px" }}
                      onClick={() => setAutoEngaged(false)}
                    >
                      Engage
                    </Button>
                  ) : (
                    <button
                      class="ui inverted mid white button"
                      style={{ marginRight: "20px", width: "125px" }}
                      onClick={() => setAutoEngaged(true)}
                    >
                      Engage
                    </button>
                  )}
                </Form.Group>
              </Form.Group>

              <Form.Field style={{ marginTop: "15px" }}>
                <Button
                  size="large"
                  color="blue"
                  style={{
                    alignSelf: "center",
                    width: "300px",
                    margin: "auto",
                  }}
                  onClick={ToTele}
                >
                  To tele
                </Button>
              </Form.Field>
            </Container>
          ) : (
            <Container>
              <Header style={{ color: "white" }} as="h3">
                Tele/End
              </Header>
              <Form.Field>
                <Form.Group inline>
                  <Form.Field>
                    <Header style={{ color: "white" }} as="h4">
                      Intakes
                    </Header>
                  </Form.Field>
                  <Form.Field>
                    <Header
                      style={{
                        marginLeft: "15px",
                        marginRight: "10px",
                        color: "white",
                      }}
                      as="h4"
                    >
                      {groundIntakes}
                    </Header>
                  </Form.Field>
                  <Form.Field>
                    <ButtonGroup
                      up={groundIntakesUp}
                      down={groundIntakesDown}
                    ></ButtonGroup>
                  </Form.Field>
                </Form.Group>
              </Form.Field>
              <Form.Field>
                {cubeButton ? (
                  <Button
                    size="small"
                    style={{
                      marginDown: "5px",
                      marginTop: "11px",
                      marginLeft: "80px",
                    }}
                    color="purple"
                    onClick={CubeCone}
                  >
                    CUBE
                  </Button>
                ) : (
                  <button
                    class="ui inverted small purple button"
                    style={{
                      marginDown: "5px",
                      marginTop: "11px",
                      marginLeft: "80px",
                    }}
                    onClick={CubeCone}
                  >
                    CUBE
                  </button>
                )}
                {coneButton ? (
                  <Button
                    size="small"
                    style={{
                      marginDown: "5px",
                      marginTop: "11px",
                      marginLeft: "3px",
                    }}
                    color="yellow"
                    onClick={CubeCone}
                  >
                    CONE
                  </Button>
                ) : (
                  <button
                    class="ui inverted small yellow button"
                    style={{
                      marginDown: "5px",
                      marginTop: "11px",
                      marginLeft: "3px",
                    }}
                    onClick={CubeCone}
                  >
                    CONE
                  </button>
                )}
              </Form.Field>
              <Form.Group>
                <Form.Field>
                  <Button
                    color="grey"
                    style={{ marginDown: "5px" }}
                    size="medium"
                    fluid
                    onClick={autoHRClick}
                  >
                    High
                  </Button>

                  <Button
                    color="grey"
                    style={{ marginDown: "5px", marginTop: "10px" }}
                    size="medium"
                    fluid
                    onClick={autoMRClick}
                  >
                    Mid
                  </Button>

                  <Button
                    color="grey"
                    style={{ marginDown: "5px", marginTop: "10px" }}
                    size="medium"
                    fluid
                    onClick={autoLRClick}
                  >
                    Low
                  </Button>
                </Form.Field>

                <Form.Group style={{ marginTop: "7px", marginLeft: "24px" }}>
                  <Form.Field>
                    <label style={{ color: "white" }}>
                      {teleHighCubeCount}
                    </label>
                    <Divider hidden style={{ marginBottom: "12px" }}></Divider>
                    <label style={{ color: "white" }}>{teleMidCubeCount}</label>
                    <Divider hidden style={{ marginBottom: "10px" }}></Divider>
                    <label style={{ color: "white" }}>{teleLowCubeCount}</label>
                  </Form.Field>
                  <Form.Field style={{ marginLeft: "59px" }}>
                    <label style={{ color: "white" }}>
                      {teleHighConeCount}
                    </label>
                    <Divider hidden style={{ marginBottom: "12px" }}></Divider>
                    <label style={{ color: "white" }}>{teleMidConeCount}</label>
                    <Divider hidden style={{ marginBottom: "10px" }}></Divider>
                    <label style={{ color: "white" }}>{teleLowConeCount}</label>
                  </Form.Field>
                  <Form.Field style={{ marginLeft: "9px" }}>
                    <HighEnterRemoveButtons
                      enter={HighUp}
                      remove={HighDown}
                    ></HighEnterRemoveButtons>
                    <Divider hidden style={{ marginBottom: "4px" }}></Divider>
                    <MidEnterRemoveButtons
                      enter={MidUp}
                      remove={MidDown}
                    ></MidEnterRemoveButtons>
                    <Divider hidden style={{ marginBottom: "3px" }}></Divider>
                    <LowEnterRemoveButtons
                      enter={LowUp}
                      remove={LowDown}
                    ></LowEnterRemoveButtons>
                  </Form.Field>
                </Form.Group>
                <Form.Group
                  style={{
                    alignSelf: "center",
                    paddingTop: "25px",
                    margin: "auto",
                  }}
                >
                  {teleDocked ? (
                    <Button
                      size="medium"
                      color="green"
                      style={{ marginRight: "20px", width: "125px" }}
                      onClick={() => setTeleDocked(false)}
                    >
                      Dock
                    </Button>
                  ) : (
                    <button
                      class="ui inverted mid white button"
                      style={{ marginRight: "20px", width: "125px" }}
                      onClick={() => setTeleDocked(true)}
                    >
                      Dock
                    </button>
                  )}
                  {teleEngaged ? (
                    <Button
                      size="medium"
                      color="green"
                      style={{ marginRight: "20px", width: "125px" }}
                      onClick={() => setTeleEngaged(false)}
                    >
                      Engage
                    </Button>
                  ) : (
                    <button
                      class="ui inverted mid white button"
                      style={{ marginRight: "20px", width: "125px" }}
                      onClick={() => setTeleEngaged(true)}
                    >
                      Engage
                    </button>
                  )}
                </Form.Group>
              </Form.Group>
              <Divider></Divider>
              <Header style={{ color: "white" }}>Post-Match "Objective"</Header>
              <Form.Group style={{ marginLeft: "5px" }}>
                <Form.Field>
                  <label style={{ color: "white" }}>Single SS</label>
                  <Checkbox
                    checked={single}
                    onClick={(e, d) => setSingle(!single)}
                  ></Checkbox>
                </Form.Field>
                <Form.Field>
                  <label style={{ color: "white" }}>Double SS</label>
                  <Checkbox
                    checked={double}
                    onClick={(e, d) => setDouble(!double)}
                  ></Checkbox>
                </Form.Field>
                <Form.Field>
                  <label style={{ color: "white" }}>Ground Cone</label>
                  <Checkbox
                    checked={ground}
                    onClick={(e, d) => setGround(!ground)}
                  ></Checkbox>
                </Form.Field>
                <Form.Field>
                  <label style={{ color: "white" }}>Tipped Cone</label>
                  <Checkbox
                    checked={tipped}
                    onClick={(e, d) => setTipped(!tipped)}
                  ></Checkbox>
                </Form.Field>
              </Form.Group>
              <Divider hidden></Divider>
              <Form.Group>
                <Header
                  style={{ color: "white", marginDown: "10px" }}
                  as={"h5"}
                >
                  Write if they fumbled and *any* defense you saw
                </Header>

                <Form.Field style={{ margin: "auto" }}>
                  <Form.TextArea
                    onChange={(e) => setDriver(e.target.value)}
                    style={{ width: "150px" }}
                  ></Form.TextArea>
                </Form.Field>
              </Form.Group>
              <Form.Field style={{ marginTop: "15px" }}>
                <Button
                  size="large"
                  color="blue"
                  style={{
                    alignSelf: "center",
                    width: "300px",
                    margin: "auto",
                  }}
                  onClick={() => setMode(true)}
                >
                  To auto
                </Button>
              </Form.Field>
            </Container>
          )}

          <Divider></Divider>
          <Form.Group widths="equal">
            <Button color="instagram" type="submit" onClick={save}>
              Submit / Save
            </Button>

            <Button type="submit" color="red" onClick={skip}>
              Skip
            </Button>
            <Link to="/">
              {" "}
              <Button color="white">Back to Home</Button>
            </Link>
            {/* <Button 
              icon="camera retro"
              type="submit"
              color="instagram"
              onClick={save}
            >
              Submit
            </Button> */}
          </Form.Group>
          <Divider hidden></Divider>
        </Form>
        <Modal open={showModal}>
          <Modal.Header>Some fields are blank</Modal.Header>
          <Modal.Content>
            <p>Please check some required fields with (*) are not entered</p>
          </Modal.Content>
          <Modal.Actions>
            <Button positive>OK</Button>
          </Modal.Actions>
        </Modal>
        {showSuccess && <Message success header="Data saved successfully" />}
        {showError && <Message negative header="Unable to save record" />}
        {showLookupError && (
          <Link to="/pitscout">
            <Message
              negative
              header="Team number not found, please add team first - Click Here"
            />
          </Link>
        )}

        <Modal open={showQrCode} size="fullscreen" onClose={handleClose}>
          {regard ? (
            <Modal.Content>
              <QRCode value={JSON.stringify(matchData)} />
              <h3 style={{ margin: "0px" }}></h3>
              <h4 style={{ margin: "0px", color: "rgb(105,105,105)" }}>
                {
                  randomCompliments[
                    Math.floor(Math.random() * randomCompliments.length)
                  ]
                }
              </h4>
            </Modal.Content>
          ) : (
            <Modal.Content>{mald()}</Modal.Content>
          )}
        </Modal>
      </Container>
    </body>
  );
};
export default MatchScout;
