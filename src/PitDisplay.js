import Textbox from "./Textbox";
import PdfViewer from "./PdfViewer";
import SpecTable from "./SpecTable";

import { Divider, Header } from "semantic-ui-react";
import styles from "./Home.module.css";

export default function PitDisplay(props) {
  //history of the team
  const teamHist =
    "Iron Claw is an FRC team that operates through the Robotics Class at Los Gatos High School. It was founded with a strong belief in the importance of student leadership.";

  //see the PdfViewer.js and Textbox.js files for explanation
  return (
    <div>
      <Divider />
      <Header as="h1" textAlign="center">
        Iron Claw 972 Publicity Board
      </Header>
      <img
        className={styles.center}
        src="Screen-Shot-2019-02-15-at-3.24.47-PM-1.png"
      ></img>

      <PdfViewer />
    </div>
  );
}
