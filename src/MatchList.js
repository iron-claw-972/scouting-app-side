import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  Button,
} from "semantic-ui-react";

import { getFirestore, doc, setDoc } from "firebase/firestore";

const MatchList = () => {
  return (
  <Link to="/" style={{ margin: "10px" }}>
    {" "}
    <Button color="white">Back to Home</Button>
  </Link>
  );
};
export default MatchList;
