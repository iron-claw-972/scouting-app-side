import Textbox from "./Textbox";
import PdfViewer from "./PdfViewer";
import SpecTable from "./SpecTable";

import { Header } from "semantic-ui-react";

export default function PitDisplay(props) {
  const autoHeading = "Auto Capabilities";
  const autoCapabilities =
    "Deposit preloaded ball, intake 1-2 more balls, and deposit them.";
  const teamHist =
    "Iron Claw is an FRC team that operates through the Robotics Class at Los Gatos High School. It was founded with a strong belief in the importance of student leadership.";

  const climbSpecs = [
    ["spec1", "spec 1 details"],
    ["spec2", "spec 2 details"],
  ];

  const cargoSpecs = [
    ["spec1", "more specs", "spec 1 details"],
    ["spec2", "more specs", "spec 2 details"],
  ];

  const driveSpecs = [
    ["spec1", "spec 1 details"],
    ["spec2", "spec 2 details"],
  ];

  return (
    <div>
      <Header as="h1">Iron Claw 972-Publicity Board</Header>
      <img src="Screen-Shot-2019-02-15-at-3.24.47-PM-1.png"></img>

      <Textbox category={autoHeading} text={autoCapabilities}></Textbox>
      <PdfViewer />
      <Textbox category={"About Us"} text={teamHist}></Textbox>
    </div>
  );
}
