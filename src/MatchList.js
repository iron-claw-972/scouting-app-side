import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Form,
  Input,
  Container,
  Label
} from "semantic-ui-react";

import { getFirestore, doc, setDoc } from "firebase/firestore";


const MatchList = () => {

  const [match, setMatch] = useState("");

  return (
    <Container>
      <Form.Field style={{ margin: "10px"}}>
        <label>-Match Data-</label>
        <Input
        fluid
        size="medium"
        placeholder="match"
        value={match}
        onChange={(e) => setMatch(e.target.value)}
        />
      </Form.Field>
      <Link to="/" style={{ margin: "10px" }}>
        {" "}
        <Button color="white">Back to Home</Button>
      </Link>
    </Container>
  );
};
export default MatchList;
