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

export {
  colorOptions,
  driveTrainOptions,
  cvOptions,
  autoOptions,
  yesNoOptions,
};
