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
    text: "Cones Auto High",
    value: "Cones Auto High",
  },
  {
    key: "2",
    text: "Cones Auto Mid",
    value: "Cones Auto Mid",
  },
  {
    key: "3",
    text: "Cones Auto Low",
    value: "Cones Auto Low",
  },
  {
    key: "4",
    text: "Cube Auto High",
    value: "Cube Auto High",
  },
  {
    key: "5",
    text: "Cube Auto Mid",
    value: "Cube Auto Mid",
  },
  {
    key: "6",
    text: "Cube Auto Low",
    value: "Cube Auto Low",
  },
  {
    key: "7",
    text: "Cones Tele High",
    value: "Cones Tele High",
  },
  {
    key: "8",
    text: "Cones Tele Mid",
    value: "Cones Tele Mid",
  },
  {
    key: "9",
    text: "Cones Tele Low",
    value: "Cones Tele Low",
  },
  {
    key: "10",
    text: "Cube Tele High",
    value: "Cube Tele High",
  },
  {
    key: "11",
    text: "Cube Tele Mid",
    value: "Cube Tele Mid",
  },
  {
    key: "12",
    text: "Cones Tele Low",
    value: "Cones Tele Low",
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
