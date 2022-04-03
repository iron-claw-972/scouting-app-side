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

const hangarOptions = [
  { key: 1, text: "Traverse", value: "Traverse" },
  { key: 2, text: "High", value: "High" },
  { key: 3, text: "Mid", value: "Mid" },
  { key: 4, text: "Low", value: "Low" },
  { key: 5, text: "None", value: "None" },
];

export {
  colorOptions,
  driveTrainOptions,
  cvOptions,
  autoOptions,
  yesNoOptions,
  hangarOptions,
};
