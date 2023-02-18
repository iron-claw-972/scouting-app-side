/*When working with forms, we are going to have dropdown menus
For simplicity and modularity, all possible values for dropdown menus
are stored here.
As a rule of thumb, if its not an objective fact about a robot, don't make a dropdown
For example:
"Drivetrain type" is good, its part of their robot
"Can score" is not, we have to see the robot in action for that
I've broken my own rules below, those menus aren't used in the final scouting forms*/

const colorOptions = [
  {
    key: "r",
    text: "Red",
    value: "red",
    image: { avatar: true, src: "/assets/red.png" },
  },
  {
    key: "b",
    text: "Blue",
    value: "blue",
    image: { avatar: true, src: "/assets/blue.png" },
  },
];
const graphOptions = [
  {
    key: "1",
    text: "Avg Cones Auto High",
    value: "Avg Cones Auto High",
  },
  {
    key: "2",
    text: "Avg Cones Auto Mid",
    value: "Avg Cones Auto Mid",
  },
  {
    key: "3",
    text: "Avg Cones Auto Low",
    value: "Avg Cones Auto Low",
  },
  {
    key: "4",
    text: "Avg Cube Auto High",
    value: "Avg Cube Auto High",
  },
  {
    key: "5",
    text: "Avg Cube Auto Mid",
    value: "Avg Cube Auto Mid",
  },
  {
    key: "6",
    text: "Avg Cube Auto Low",
    value: "Avg Cube Auto Low",
  },
  {
    key: "7",
    text: "Avg Cones Tele High",
    value: "Avg Cones Tele High",
  },
  {
    key: "8",
    text: "Avg Cones Tele Mid",
    value: "Avg Cones Tele Mid",
  },
  {
    key: "9",
    text: "Avg Cones Tele Low",
    value: "Avg Cones Tele Low",
  },
  {
    key: "10",
    text: "Avg Cube Tele High",
    value: "Avg Cube Tele High",
  },
  {
    key: "11",
    text: "Avg Cube Tele Mid",
    value: "Avg Cube Tele Mid",
  },
  {
    key: "12",
    text: "Avg Cones Tele Low",
    value: "Avg Cones Tele Low",
  },
];
const driveTrainOptions = [
  {
    key: 1,
    text: "2W",
    value: "2W",
  },
  {
    key: 2,
    text: "4W",
    value: "4W",
  },
  {
    key: 3,
    text: "6W",
    value: "6W",
  },
  {
    key: 4,
    text: "Car",
    value: "Car",
  },
  {
    key: 5,
    text: "Swerve",
    value: "Swerve",
  },
  {
    key: 6,
    text: "Crab",
    value: "Crab",
  },
  {
    key: 7,
    text: "Holoneme",
    value: "Holoneme",
  },
  {
    key: 8,
    text: "Mecanum",
    value: "Mecanum",
  },
];

const cvOptions = [
  { key: 1, text: "yes", value: "yes" },
  { key: 2, text: "no", value: "no" },
  { key: 3, text: "somewhat", value: "somewhat" },
];

const autoOptions = [
  { key: 1, text: "can move", value: "can move" },
  { key: 2, text: "can score", value: "can score" },
  { key: 3, text: "none", value: "none" },
];

const yesNoOptions = [
  { key: 1, text: "yes", value: "yes" },
  { key: 2, text: "no", value: "no" },
  { key: 3, text: "maybe", value: "maybe" },
];

const driveOptions = [
  { key: 1, text: "Tank", value: "Tank" },
  { key: 2, text: "Swerve", value: "Swerve" },
  { key: 3, text: "Mecanum", value: "Mecanum" },
  { key: 4, text: "Slide", value: "Slide" },
  { key: 5, text: "Other", value: "Other" },
];

const abilityOptions = [
  { key: 1, text: "Cubes", value: "Cube" },
  { key: 2, text: "Cones", value: "Cones" },
  { key: 3, text: "Cubes AND Cones", value: "Cubes AND Cones" },
  { key: 4, text: "None", value: "None" },
];

export {
  colorOptions,
  driveTrainOptions,
  cvOptions,
  autoOptions,
  yesNoOptions,
  driveOptions,
  abilityOptions,
  graphOptions,
};
