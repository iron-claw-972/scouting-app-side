import Textbox from "./Textbox";
import PdfViewer from "./PdfViewer";
import SpecTable from "./SpecTable";

import { Divider, Header } from "semantic-ui-react";
import styles from "./Home.module.css";

export default function PitDisplay(props) {
  //history of the team
  const teamHist =
    "Iron Claw is an FRC team that operates through the Robotics Class at Los Gatos High School. It was founded with a strong belief in the importance of student leadership.";

  //see the files of the components for explanation
  return (
    <div>
      <Divider />
      <h1>Iron Claw 972-Publicity Board</h1>
      <img src="Screen-Shot-2019-02-15-at-3.24.47-PM-1.png"></img>
      <img src="Screen-Shot-2019-02-15-at-3.24.47-PM-1.png"></img>
      <img src="Screen-Shot-2019-02-15-at-3.24.47-PM-1.png"></img>

      <PdfViewer />

      <img
        className={styles.sponsorImage}
        src={require("./sponsorLogos/newMilleniumFoundation.png")}
      />
      <img
        className={styles.sponsorImage}
        src={require("./sponsorLogos/aeronet.png")}
      />
      <img
        className={styles.sponsorImage}
        src={require("./sponsorLogos/google.png")}
      />
      <img
        className={styles.sponsorImage}
        src={require("./sponsorLogos/campusInsuranceService.png")}
      />
      <img
        className={styles.sponsorImage}
        src={require("./sponsorLogos/facilitron.png")}
      />
      <img
        className={styles.sponsorImage}
        src={require("./sponsorLogos/baeSystems.png")}
      />
      <img
        className={styles.sponsorImage}
        src={require("./sponsorLogos/rotaryClubLosGatos.png")}
      />
      <img
        className={styles.sponsorImage}
        src={require("./sponsorLogos/qualcomm.png")}
      />
      <img
        className={styles.sponsorImage}
        src={require("./sponsorLogos/lockheedMartin.png")}
      />
      <img
        className={styles.sponsorImage}
        src={require("./sponsorLogos/brRacing.png")}
      />
      <img
        className={styles.sponsorImage}
        src={require("./sponsorLogos/atlas.png")}
      />
      <img
        className={styles.sponsorImage}
        src={require("./sponsorLogos/intuitiveSurgical.png")}
      />
      <img
        className={styles.sponsorImage}
        src={require("./sponsorLogos/texasInstruments.png")}
      />
      <img
        className={styles.sponsorImage}
        src={require("./sponsorLogos/tempCFO.png")}
      />
      <img
        className={styles.sponsorImage}
        src={require("./sponsorLogos/NowForeverStudios.png")}
      />
      <Textbox category={"About Us"} text={teamHist}></Textbox>
    </div>
  );
}
