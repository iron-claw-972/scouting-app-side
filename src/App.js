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
import PitScout from "./PitScout";

import DataDisplay from "./Credits";

import RawMatchTable from "./RawMatchTable";


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
      <Route path="pitscout" element={<PitScout />} />
      
      <Route path="/rawmatch" element={<RawMatchTable />} />

      <Route path="/Credits" element={<DataDisplay />} />

    </Routes>
  );
};

export default App;
