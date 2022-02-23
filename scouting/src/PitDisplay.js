import ClimbSpecs from "./ClimbSpecs";
import DriveSpecs from "./DriveSpecs";
import ShooterSpecs from "./ShooterSpecs";
import Sponsors from "./Sponsors";
import Textbox from "./Textbox";
import PdfViewer from "./PdfViewer";

export default function PitDisplay(props) {
  const autoHeading = "Auto Capabilities";
  const autoCapabilities =
    "Deposit preloaded ball, intake 1-2 more balls, and deposit them.";
  const teamHist =
    "Iron Claw is an FRC team that operates through the Robotics Class at Los Gatos High School. It was founded with a strong belief in the importance of student leadership.";

  return (
    <div>
      <h3>Publicity Board</h3>
      <ClimbSpecs></ClimbSpecs>
      <ShooterSpecs></ShooterSpecs>
      <DriveSpecs></DriveSpecs>
      <Textbox category={autoHeading} text={autoCapabilities}></Textbox>
      <PdfViewer />
      <Textbox category={"About Us"} text={teamHist}></Textbox>
    </div>
  );
}
