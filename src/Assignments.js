import {
    getFirestore,
    setDoc,
    doc,
    getDocs,
    collection,
    query,
    where,
  } from "firebase/firestore";

var initials = new Object();
initials = {
  "jc": "Julio",
  "jd": "Joshua D",
  "lf": "Leah",
  "af": "Anthony",
  "lg": "Leison",
  "emh": "Emi",
  "jj": "Jake",
  "mk": "Michael K",
  "tl": "Teo(dor)",
  "cm": "Cole M",
  "jm": "Joushua M",
  "fr": "Faris",
  "ms": "Max",
  "os": "Om",
  "as": "Angela",
  "rt": "Richie",
  "rv": "Robert(o)",
  "az": "Allan",
  "tz": "Tony",
  "tb": "Theadin",
  "tc": "Tyrus",
  "yd": "Yichen",
  "jud": "Julia",
  "ad": "Andrea",
  "ee": "Eliot",
  "ch": "Cole H",
  "ep": "Elisa",
  "ar": "Ashir",
  "ns": "Nicole",
  "gt": "Gavin",
  "aw": "Ani",
  "sa": "Sahil",
  "la": "Laksh(ya)",
  "mc": "Michael C",
  "ld": "Leo",
  "ke": "Kyle",
  "pg": "Paola",
  "elh": "Ellery",
  "eh": "Edwin",
  "ih": "Ian",
  "hh": "Ian",
  "hl": "Henry",
  "cn": "Cameron",
  "ap": "Arnav",
  "cs": "Cici",
  "rs": "Cici",
  "ay": "Adam",
  "ac": "Alex",
  "joj": "Johann",
  "sp": "Saara",
  "mes": "Mehaan",
  "kt": "Kaushik",
};


var assignments = new Object();

  assignments = {
    ar: [
      [1, 5025],
      [2, 1678],
      [3, 6560],
      [4, 4817],
      [5, 8537],
      [6, 1678],
      [7, 2659],
    ],
    tc: [
      [1, 8768],
      [2, 589],
      [3, 5285],
      [4, 3859],
      [5, 2102],
      [6, 1836],
      [7, 4711],
    ],
  };

  var done = false;
  var scoutMatch = 0;
  var scoutTeam = 0;
  var subjective = true;

  for (const prop in assignments) {
    let lst = assignments[prop];
    const db = getFirestore();

    for (let i = 0; i < lst.length; i++) {
      subjective = true;
      scoutMatch = lst[i][0];
      scoutTeam = lst[i][1];
      var name = prop
      const docRef = doc(
        db,
        "test-a",
        String(lst[i][1]) + "_" + String(lst[i][0])
      );
      setDoc(
        docRef,
        { done, scoutMatch, scoutTeam, subjective, name },
        { merge: true }
      );
    }
  }