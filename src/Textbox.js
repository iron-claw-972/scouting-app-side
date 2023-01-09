//This is a simple component where you can display text in a box
//Use as needed.

//props are basically function arguments
export default function Textbox(props) {
  return (
    <div
      style={{
        border: "1px solid black",
        margin: "5px",
        padding: "5px",
        width: "80%",
      }}
    >
      <strong>{props.category}</strong>
      <br />
      <p style={{ whiteSpace: "pre-line" }}>{props.text}</p>
    </div>
  );
}
