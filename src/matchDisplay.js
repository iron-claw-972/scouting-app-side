import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SpecTable from "./SpecTable";

import { getFirestore, collection, getDocs } from "firebase/firestore";

import { Grid, Label, List, LabelDetail, Table } from "semantic-ui-react";
import Textbox from "./Textbox";

const matchDisplay = () => {
  var matches;
  fetch("https://www.thebluealliance.com/api/v2/event/2022casj/matches")
    .then((response) => response.json())
    .then((data) => matches);
};
