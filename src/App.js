import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  getFirestore,
  setDoc,
  doc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import Home from "./Home";
import MatchScout from "./MatchScout";
import MatchScoutSubjective from "./MatchScoutSubjective";
import PitScout from "./PitScout";
import NewTeamPages from "./NewTeamPage";
import PitDisplay from "./PitDisplay";
import DataDisplay from "./DataDisplay";
import ScanMatchScoutDataQR from "./ScanMatchScoutDataQR";
import ScanPitScoutDataQR from "./ScanPitScoutDataQR";
import RawMatchTable from "./RawMatchTable";
import TeamLookup from "./TeamLookup";
import TeamList from "./TeamList";
import MatchList from "./ListMatch";

// Testing
import CanvasDisplay from "./CanvasDisplay";

import CanvasChooser from "./CanvasChooser";

//setting up main page
//The element= causes all the content of the pages to show
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="matchscout" element={<MatchScout />} />
      <Route path="matchscoutsubjective" element={<MatchScoutSubjective />} />
      <Route path="pitscout" element={<PitScout />} />
      <Route path="/teampages/" element={<NewTeamPages />} />
      <Route path="rawmatchtable" element={<RawMatchTable />} />
      <Route path="/teamlist" element={<TeamList />} />
      <Route path="/teamlookup/" element={<TeamLookup />} />

      <Route path="/rawmatch" element={<RawMatchTable />} />

      <Route path="datadisplay" element={<DataDisplay />} />
      <Route path="scanmatchscoutdata" element={<ScanMatchScoutDataQR />} />
      <Route path="scanpitscoutdata" element={<ScanPitScoutDataQR />} />
      <Route path="/matchlist" element={<MatchList />} />
    </Routes>
  );
};

export default App;
