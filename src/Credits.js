/*
This isnt even a data display
-2022
It's the credits and version notes file
Use this to preserve the history of the scouting app
And honor the scouters. 
-2023
*/

export default function DataDisplay() {
  return (
    <div>
      <h1 style={{ textAlign: "center", margin: 10 }}>
        Thanks for using the app!
      </h1>
      <h2 style={{ textAlign: "center", margin: 5, marginLeft: 10 }}>
        Worked on by:
      </h2>
      <h5 style={{ textAlign: "center", margin: 10 }}>
        Ashir Rao (Lead), Elisa Pan, Edwin Hou, Johann Jacob (2023)
      </h5>
      <h5 style={{ textAlign: "center", margin: 10 }}>
        Ashir Rao, Richie Tan (2022)
      </h5>
      <h5 style={{ textAlign: "center", margin: 10 }}>
        Pranav Tadepalli, Alan Sheu (2019)
      </h5>
      <h2 style={{ textAlign: "center", margin: 10 }}>Thanks to:</h2>
      <h5 style={{ textAlign: "center", margin: 10 }}>
        Scouting/Strategy team, the scouters, and most of all -- the mentors!
      </h5>
      <h2 style={{ textAlign: "center", margin: 10 }}>------</h2>
      <h3 style={{ textAlign: "center", margin: 10 }}>Version Notes:</h3>
      <h5 style={{ textAlign: "center", margin: 15 }}>
        -added match scout subjective, focused on button based design, dark
        mode, more graphs and charts, integration with API, more readable UI,
        auto assignments (2023)
      </h5>
      <h5 style={{ textAlign: "center", margin: 15 }}>
        Version notes not implemented in 2022. (2022)
      </h5>
      <h2 style={{ textAlign: "center", margin: 10 }}>------</h2>

      <h5 style={{ textAlign: "center", margin: 10 }}>
        Team 972 - Iron Claw at Los Gatos High School
      </h5>
      <h5 style={{ textAlign: "center", margin: 10 }}>Best wishes!</h5>
    </div>
  );
}
