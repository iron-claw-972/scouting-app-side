import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import "semantic-ui-css/semantic.min.css";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

import firebaseConfig from "./firebaseconfig.js";
import { initializeApp } from "firebase/app";
import {
  initializeFirestore,
  enableIndexedDbPersistence,
  CACHE_SIZE_UNLIMITED,
} from "firebase/firestore";

//This lets us use our Firebase databaes
const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, {
  cacheSizeBytes: CACHE_SIZE_UNLIMITED,
});

/*
In the event there is no wifi at the competition
We will store data locally, and have it sync as soon as there is wifi
Pretty sweet, huh?
*/
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code == "failed-precondition") {
    // Multiple tabs open, persistence can only be enabled
    // in one tab at a a time.
    // ...
    console.err(
      "Local persistence did not work perhaps you have multiple tabs open"
    );
  } else if (err.code == "unimplemented") {
    // The current browser does not support all of the
    // features required to enable persistence
    // ...
    console.err("Local persistence did not work, not supported by browser");
  }
});

//Rendering the App (see App.js)
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
serviceWorkerRegistration.register();
