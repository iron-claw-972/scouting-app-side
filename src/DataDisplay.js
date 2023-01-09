/*This isnt even a data display
Its credits and notes
In other words, this file is inaccurately named
Change it if you want.
Use this to preserve the legacy of the brave programmers who dared to
venture into the land of the webpage, far from the familiar lands
of WPI Lib and their robot-programming comrades.*/

export default function DataDisplay() {
  return (
    <div>
      <h1>Thanks for using the app!</h1>
      <h3 style={{ marginLeft: 10 }}>Worked on by:</h3>
      <h5 style={{ marginLeft: 10 }}>Ashir Rao, Richie Tan</h5>
      <h3 style={{ marginLeft: 10 }}>Thanks to:</h3>
      <h5 style={{ marginLeft: 10 }}>
        Our Scouting and Strategy Team, our industrious scouters, Ashir's Dad,
        and our amazing mentors!
      </h5>
      <h2>------</h2>
      <h3 style={{ marginLeft: 10 }}>Notes</h3>
      <h5 style={{ marginLeft: 10 }}>
        Use this in future years, you likely won't have to change much.
      </h5>
      <h4>Trans rights are a good.</h4>
      <h5 style={{ marginLeft: 10 }}>
        From Team 972 - Iron Claw at Los Gatos High School :)
      </h5>
      <h4 style={{ textAlign: "center" }}>Water Game ... some day</h4>
    </div>
  );
}
