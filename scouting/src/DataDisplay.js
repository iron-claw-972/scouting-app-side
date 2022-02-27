//This isnt data display
//Thats for nerds
import Textbox from "./Textbox";

export default function DataDisplay() {
  const topic = ":)";
  const text =
    "In the coming years, we can keep the most of the code the same, and just change the fields in the form/display. ";
  return (
    <div>
      <h1>Thanks for using the app!</h1>
      <Textbox category={topic} text={text}></Textbox>
    </div>
  );
}
