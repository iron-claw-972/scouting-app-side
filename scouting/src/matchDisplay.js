
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SpecTable from "./SpecTable";

import { getFirestore, collection, getDocs } from "firebase/firestore";

import { Grid, Label, List, LabelDetail, Table } from "semantic-ui-react";
import Textbox from "./Textbox";


const matchTable = () => {
    const matchDataArr = [];
    const matchSnapshot = await getDocs(collection(db, "match"));
    matchSnapshot.forEach((match) => {
        matchDataArr.push(match.data());
      });
    return(
        <Table.Body>
        </Table.Body>
    
    );
      
}