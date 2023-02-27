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
    jc: [[1, 254], [972, 972]],
    lf: [[1,1678], [972, 972]],
    jd: [[1, 971], [972, 972]],
    af: [[1, 972], [972, 972]],
    lg: [[1, 649], [972, 972]],
    emh: [[1, 973], [972, 972]],
    jj: [[2, 254], [972, 972]],
    mk: [[2, 1678] [972, 972]],
    tl: [[2, 971], [972, 972]],
    cm: [[2, 972], [972, 972]],
    jm: [[2, 649], [972, 972]],
    fr: [[2, 973], [972, 972]],
    ms: [[3, 254], [972, 972]],
    os: [[3, 1678] [972, 972]],
    as: [[3, 971], [972, 972]],
    rt: [[3, 972], [972, 972]],
    rv: [[3, 649], [972, 972]],
    az: [[3, 973], [972, 972]],
    tz: [[4, 254], [972, 972]],
    tb: [[4, 1678] [972, 972]],
    tc: [[4, 971], [972, 972]],
    yd: [[4, 972], [972, 972]],
    jud: [[4, 649], [972, 972]],
    ad: [[4, 973], [972, 972]],
    ee: [[5, 254], [972, 972]],
    ch: [[5, 1678] [972, 972]],
    ep: [[5, 971], [972, 972]],
    ar: [[5, 972], [972, 972]],
    ns: [[5, 649], [972, 972]],
    gt: [[5, 973], [972, 972]],
    aw: [[6, 254], [972, 972]],
    sa: [[6, 1678] [972, 972]],
    la: [[6, 971], [972, 972]],
    mc: [[6, 972], [972, 972]],
    ld: [[6, 649], [972, 972]],
    ke: [[6, 973], [972, 972]],
    pg: [[7, 254], [972, 972]],
    elh: [[7, 1678] [972, 972]],
    eh: [[7, 971], [972, 972]],
    ih: [[7, 972], [972, 972]],
    hh: [[7, 649], [972, 972]],
    hl: [[7, 973], [972, 972]],
    cn: [[8, 254], [972, 972]],
    ap: [[8, 1678] [972, 972]],
    cs: [[8, 971], [972, 972]],
    rs: [[8, 972], [972, 972]],
    ay: [[8, 649], [972, 972]],
    ac: [[8, 973], [972, 972]],
    joj: [[9, 254], [972, 972]],
    sp: [[9, 1678] [972, 972]],
    mes: [[9, 971], [972, 972]],
    kt: [[9, 972], [972, 972]],
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

  export {initials}