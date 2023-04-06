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
  
    assignments = {'jc': [[43, '3045'], [44, '9125'], [45, '9143'], [46, '114'], [47, '649'], [48, '8045'], [49, '8016'], [50, '1967'], [51, '5419'], [52, '604'], [53, '9038'], [54, '9111'], [55, '649'], [56, '971']], 'jd': [], 'lf': [], 'af': [], 'lg': [], 'emh': [], 'jj': [], 'mk': [[57, '5924'], [58, '5419'], [59, '8016'], [60, '8169'], [61, '8840'], [62, '8045'], [63, '4159'], [64, '5700'], [65, '1351'], [66, '972'], [67, '4186'], [68, '115'], [69, '4765'], [70, '8852']], 'tl': [], 'cm': [], 'jm': [], 'fr': [], 'ms': [], 'os': [[43, '972'], [44, '581'], [45, '8852'], [46, '5924'], [47, '1351'], [48, '841'], [49, '115'], [50, '4765'], [51, '972'], [52, '4186'], [53, '5507'], [54, '8016'], [55, '8045'], [56, '9114']], 'as': [], 'rt': [], 'rv': [], 'az': [[29, '971'], [30, '649'], [31, '9006'], [32, '8751'], [33, '8852'], [34, '1967'], [35, '1700'], [36, '972'], [37, '4904'], [38, '9125'], [39, '5419'], [40, '9114'], [41, '5924'], [42, '9038']], 'tz': [[29, '114'], [30, '7245'], [31, '5507'], [32, '9143'], [33, '9114'], [34, '8045'], [35, '115'], [36, '2854'], [37, '9111'], [38, '4159'], [39, '5430'], [40, '114'], [41, '1700'], [42, '6619']], 'tb': [[57, '4186'], [58, '9143'], [59, '8404'], [60, '9111'], [61, '1700'], [62, '8852'], [63, '841'], [64, '8404'], [65, '1967'], [66, '5430'], [67, '581'], [68, '114'], [69, '6619'], [70, '5419']], 'tc': [[1, '4904'], [10, '5700'], [11, '4904'], [12, '7245'], [13, '6619'], [14, '8169'], [2, '5700'], [3, '8840'], [4, '115'], [5, '1351'], [6, '8793'], [7, '8751'], [8, '8404'], [9, '5430']], 'yd': [[15, '1700'], [16, '1967'], [17, '4669'], [18, '114'], [19, '5924'], [20, '4186'], [21, '9143'], [22, '8852'], [23, '5430'], [24, '8751'], [25, '9114'], [26, '5507'], [27, '115'], [28, '1351']], 'jud': [[57, '604'], [58, '299'], [59, '9125'], [60, '8793'], [61, '3045'], [62, '6619'], [63, '649'], [64, '7245'], [65, '9111'], [66, '9114'], [67, '4669'], [68, '8840'], [69, '841'], [70, '6418']], 'ad': [[57, '4765'], [58, '4669'], [59, '1351'], [60, '2854'], [61, '5430'], [62, '115'], [63, '6962'], [64, '9143'], [65, '5924'], [66, '5507'], [67, '1700'], [68, '4159'], [69, '6962'], [70, '8751']], 'ee': [[15, '8852'], [16, '581'], [17, '4765'], [18, '9038'], [19, '299'], [20, '972'], [21, '8045'], [22, '581'], [23, '971'], [24, '7245'], [25, '972'], [26, '6619'], [27, '8169'], [28, '4159']], 'ch': [[15, '5700'], [16, '2854'], [17, '6962'], [18, '7245'], [19, '4904'], [20, '6619'], [21, '4159'], [22, '9111'], [23, '2854'], [24, '299'], [25, '1967'], [26, '5419'], [27, '841'], [28, '5924']], 'ep': [[43, '4904'], [44, '299'], [45, '8840'], [46, '4186'], [47, '9038'], [48, '2854'], [49, '8793'], [50, '8404'], [51, '8840'], [52, '9125'], [53, '5700'], [54, '115'], [55, '581'], [56, '8751']], 'ar': [], 'ns': [[57, '4904'], [58, '114'], [59, '5507'], [60, '9038'], [61, '9114'], [62, '581'], [63, '8751'], [64, '8016'], [65, '9125'], [66, '604'], [67, '8045'], [68, '649'], [69, '8793'], [70, '9038']], 'gt': [], 'aw': [[15, '8404'], [16, '3045'], [17, '115'], [18, '1351'], [19, '8751'], [20, '649'], [21, '841'], [22, '604'], [23, '4765'], [24, '4669'], [25, '9038'], [26, '9125'], [27, '9143'], [28, '8016']], 'sa': [[15, '5430'], [16, '604'], [17, '9125'], [18, '971'], [19, '5507'], [20, '8016'], [21, '5419'], [22, '6962'], [23, '114'], [24, '6418'], [25, '649'], [26, '3045'], [27, '4904'], [28, '8840']], 'la': [[43, '4159'], [44, '6418'], [45, '7245'], [46, '8169'], [47, '4669'], [48, '9114'], [49, '5430'], [50, '7245'], [51, '5924'], [52, '114'], [53, '4159'], [54, '2854'], [55, '6962'], [56, '841']], 'mc': [[43, '9006'], [44, '4765'], [45, '1967'], [46, '6962'], [47, '604'], [48, '9111'], [49, '6619'], [50, '4904'], [51, '8852'], [52, '6418'], [53, '4669'], [54, '3045'], [55, '5430'], [56, '6619']], 'ld': [[1, '4186'], [10, '6962'], [11, '604'], [12, '971'], [13, '972'], [14, '299'], [2, '649'], [3, '841'], [4, '299'], [5, '581'], [6, '9114'], [7, '9143'], [8, '841'], [9, '9111']], 'ke': [], 'pg': [[1, '4669'], [10, '8840'], [11, '8016'], [12, '6418'], [13, '114'], [14, '8793'], [2, '3045'], [3, '5430'], [4, '1967'], [5, '6962'], [6, '972'], [7, '971'], [8, '8852'], [9, '4765']], 'elh': [[29, '604'], [30, '5430'], [31, '972'], [32, '9111'], [33, '1351'], [34, '6619'], [35, '9038'], [36, '649'], [37, '6962'], [38, '8751'], [39, '8169'], [40, '8016'], [41, '8793'], [42, '5700']], 'eh': [[29, '8793'], [30, '6962'], [31, '5700'], [32, '4904'], [33, '4159'], [34, '4669'], [35, '841'], [36, '4765'], [37, '9143'], [38, '581'], [39, '8404'], [40, '8852'], [41, '4669'], [42, '8045']], 'ih': [[57, '7245'], [58, '5700'], [59, '1967'], [60, '972'], [61, '9006'], [62, '971'], [63, '6418'], [64, '299'], [65, '8169'], [66, '4904'], [67, '971'], [68, '9006'], [69, '3045'], [70, '2854']], 'hh': [], 'hl': [[29, '8404'], [30, '2854'], [31, '581'], [32, '9125'], [33, '8169'], [34, '8840'], [35, '5924'], [36, '971'], [37, '9006'], [38, '7245'], [39, '6418'], [40, '1967'], [41, '4186'], [42, '115']], 'cn': [[15, '9111'], [16, '8840'], [17, '9114'], [18, '6418'], [19, '8793'], [20, '8169'], [21, '9006'], [22, '8404'], [23, '5700'], [24, '8793'], [25, '4186'], [26, '9006'], [27, '1700'], [28, '8045']], 'ap': [[29, '4765'], [30, '299'], [31, '6418'], [32, '4186'], [33, '3045'], [34, '5419'], [35, '8016'], [36, '5507'], [37, '299'], [38, '3045'], [39, '8840'], [40, '841'], [41, '1351'], [42, '604']], 'cs': [[1, '2854'], [10, '9125'], [11, '649'], [12, '115'], [13, '1351'], [14, '5507'], [2, '6418'], [3, '9038'], [4, '604'], [5, '8016'], [6, '8045'], [7, '5924'], [8, '3045'], [9, '4669']], 'rs': [], 'ay': [], 'ac': [[1, '8404'], [10, '1700'], [11, '581'], [12, '5924'], [13, '8751'], [14, '8045'], [2, '8852'], [3, '4765'], [4, '1700'], [5, '5507'], [6, '5419'], [7, '8169'], [8, '4186'], [9, '1967']], 'joj': [], 'sp': [[1, '6619'], [10, '2854'], [11, '5419'], [12, '9114'], [13, '9143'], [14, '9006'], [2, '9111'], [3, '9125'], [4, '4159'], [5, '114'], [6, '7245'], [7, '9006'], [8, '9038'], [9, '4159']], 'mes': [[43, '971'], [44, '8404'], [45, '5507'], [46, '5419'], [47, '1700'], [48, '5700'], [49, '8751'], [50, '9006'], [51, '299'], [52, '9143'], [53, '8169'], [54, '1351'], [55, '8793'], [56, '1700']], 'kt': []}

  
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
        var name = prop;
        console.log({ done, scoutMatch, scoutTeam, subjective, name });
        const docRef = doc(
          db,
          "test-a",
          String(lst[i][1]) + "_" + String(lst[i][0]) + "_" + name.toLowerCase()
        );
        setDoc(
          docRef,
          { done, scoutMatch, scoutTeam, subjective, name },
          { merge: true }
        );
      }
    }
  export {initials}