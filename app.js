let sample = "piano";

//
let currConf = {
  arp1: {
    tempo: 0,
    notes: [],
    random: false,
    tone: "full",
  },
  arp2: {
    tempo: 0,
    notes: [],
    random: false,
    tone: "full",
  },
  arp3: {
    tempo: 0,
    notes: [],
    random: false,
    tone: "full",
  },
  arp4: {
    tempo: 0,
    notes: [],
    random: false,
    tone: "full",
  },
};
//

function getNote(key) {
  let audio = new Audio(`/audio/${sample}/${key}.mp3`);
  return audio;
}

function playNote(key) {
  let note = getNote(key);
  note.currentTime = 0;
  note.play();

  document.getElementById(key).classList.add("keyAnim");
  setTimeout(() => {
    document.getElementById(key).classList.remove("keyAnim");
  }, 150);
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("key")) {
    playNote(e.target.id);
    e.target.classList.add("keyAnim");

    setTimeout(() => {
      e.target.classList.remove("keyAnim");
    }, 200);
  }
});

let keyboard_keys = document.querySelectorAll(".key");

let keys = [];
keyboard_keys.forEach((key) => {
  keys.push(key.id);
});

let scale_C_Major = [
  keys[0],
  keys[2],
  keys[4],
  keys[5],
  keys[7],
  keys[9],
  keys[11],
  keys[12],
  keys[14],
  keys[16],
  keys[17],
  keys[19],
  keys[21],
  keys[23],
  keys[24],
];
let scale_C_Lydian = [
  keys[0],
  keys[2],
  keys[4],
  keys[6],
  keys[7],
  keys[9],
  keys[11],
  keys[12],
  keys[14],
  keys[16],
  keys[18],
  keys[19],
  keys[21],
  keys[23],
  keys[24],
];

// arp
function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// const interval = setInterval(arp, 1000);

function arpeggiate(scale, tempo, random, tone, selectedNotes) {
  if (tempo < 150) {
    return;
  }
  let notes = [];

  if (tone === "low") {
    if (selectedNotes.length > 0) {
      selectedNotes.forEach((n) => {
        notes.push(scale.slice(0, 7)[n]);
      });
    } else {
      notes = scale.slice(0, 7);
    }
  } else if (tone === "high") {
    if (selectedNotes.length > 0) {
      selectedNotes.forEach((n) => {
        notes.push(scale.slice(7, scale.length - 1)[n]);
      });
    } else {
      notes = scale.slice(7, scale.length - 1);
    }
  } else {
    if (selectedNotes.length > 0) {
      selectedNotes.forEach((n) => {
        notes.push(scale[n]);
      });
      selectedNotes.forEach((n) => {
        notes.push(scale[7 + Number(n)]);
      });
    } else {
      notes = scale;
    }
  }

  if (random) {
    setInterval(() => {
      playNote(notes[getRandom(0, notes.length - 1)]);
    }, tempo);
  } else {
    let counter = 0;

    setInterval(() => {
      playNote(notes[counter]);
      if (counter + 1 === notes.length) {
        counter = 0;
      } else {
        counter++;
      }
    }, tempo);
  }
}

arp.addEventListener("submit", (e) => {
  e.preventDefault();

  // Config save

  currConf.arp1.tempo = Number(arp.arp1.value);
  currConf.arp2.tempo = Number(arp.arp2.value);
  currConf.arp3.tempo = Number(arp.arp3.value);
  currConf.arp4.tempo = Number(arp.arp4.value);
  arp.notesArp1.forEach((n) => {
    if (n.checked) {
      currConf.arp1.notes.push(n.value);
    }
  });
  arp.notesArp2.forEach((n) => {
    if (n.checked) {
      currConf.arp2.notes.push(n.value);
    }
  });
  arp.notesArp3.forEach((n) => {
    if (n.checked) {
      currConf.arp3.notes.push(n.value);
    }
  });
  arp.notesArp4.forEach((n) => {
    if (n.checked) {
      currConf.arp4.notes.push(n.value);
    }
  });
  currConf.arp1.random = arp.randomArp1.checked;
  currConf.arp2.random = arp.randomArp2.checked;
  currConf.arp3.random = arp.randomArp3.checked;
  currConf.arp4.random = arp.randomArp4.checked;
  currConf.arp1.tone = arp.toneArp1.value;
  currConf.arp2.tone = arp.toneArp2.value;
  currConf.arp3.tone = arp.toneArp3.value;
  currConf.arp4.tone = arp.toneArp4.value;

  console.log(currConf);

  //

  const notesArp1 = [];
  arp.notesArp1.forEach((n) => {
    if (n.checked) {
      notesArp1.push(n.value);
    }
  });
  const notesArp2 = [];
  arp.notesArp2.forEach((n) => {
    if (n.checked) {
      notesArp2.push(n.value);
    }
  });
  const notesArp3 = [];
  arp.notesArp3.forEach((n) => {
    if (n.checked) {
      notesArp3.push(n.value);
    }
  });
  const notesArp4 = [];
  arp.notesArp4.forEach((n) => {
    if (n.checked) {
      notesArp4.push(n.value);
    }
  });

  if (arp.arp1.value >= 100) {
    arpeggiate(
      scale_C_Lydian,
      arp.arp1.value,
      arp.randomArp1.checked,
      arp.toneArp1.value,
      notesArp1
    );
  }
  if (arp.arp2.value >= 100) {
    arpeggiate(
      scale_C_Lydian,
      arp.arp2.value,
      arp.randomArp2.checked,
      arp.toneArp2.value,
      notesArp2
    );
  }
  if (arp.arp3.value >= 100) {
    arpeggiate(
      scale_C_Lydian,
      arp.arp3.value,
      arp.randomArp3.checked,
      arp.toneArp3.value,
      notesArp3
    );
  }
  if (arp.arp4.value >= 100) {
    arpeggiate(
      scale_C_Lydian,
      arp.arp4.value,
      arp.randomArp4.checked,
      arp.toneArp4.value,
      notesArp4
    );
  }
});

//
//
//

let demos = [
  {
    arp1: {
      tempo: 1400,
      notes: ["0", "2", "3", "6", "4"],
      random: false,
      tone: "low",
    },
    arp2: {
      tempo: 1800,
      notes: ["0", "2", "4", "6"],
      random: true,
      tone: "high",
    },
    arp3: {
      tempo: 200,
      notes: ["6", "2"],
      random: true,
      tone: "full",
    },
    arp4: {
      tempo: 300,
      notes: ["0", "2", "4"],
      random: false,
      tone: "low",
    },
  },

  {
    arp1: {
      tempo: 300,
      notes: [],
      random: false,
      tone: "high",
    },
    arp2: {
      tempo: 150,
      notes: ["2", "4", "6"],
      random: true,
      tone: "high",
    },
    arp3: {
      tempo: 900,
      notes: ["0", "3"],
      random: true,
      tone: "full",
    },
    arp4: {
      tempo: 0,
      notes: [],
      random: false,
      tone: "",
    },
  },
];

function displayDemos() {
  demoBtns.innerHTML = "";
  demos.forEach((demo) => {
    const btn = document.createElement("BUTTON");
    btn.classList.add("demoBtn");
    btn.dataset.demo = demos.indexOf(demo);
    btn.innerText = demos.indexOf(demo) + 1;
    demoBtns.appendChild(btn);
  });
}

function arpConfig(source) {
  arpeggiate(
    scale_C_Lydian,
    source.arp1.tempo,
    false,
    source.arp1.tone,
    source.arp1.notes
  );
  arpeggiate(
    scale_C_Lydian,
    source.arp2.tempo,
    false,
    source.arp2.tone,
    source.arp2.notes
  );
  arpeggiate(
    scale_C_Lydian,
    source.arp3.tempo,
    false,
    source.arp3.tone,
    source.arp3.notes
  );
  arpeggiate(
    scale_C_Lydian,
    source.arp4.tempo,
    false,
    source.arp4.tone,
    source.arp4.notes
  );
}


document.addEventListener("click", (e) => {
  if (e.target.dataset.demo) {
    arpConfig(demos[0]);
  } else if (e.target.id === "saveBtn" && !demos.includes(currConf)) {
    demos.push(currConf);
    displayDemos();
    localStorage.setItem("demos", JSON.stringify(demos));
  }
});

if (localStorage.getItem("demos")) {
  demos = JSON.parse(localStorage.getItem("demos"));
  console.log(demos);
}

displayDemos();
