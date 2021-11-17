function getNote(key) {
  let audio = new Audio(`/audio/${key}.mp3`);
  return audio;
}

function playNote(key) {
  console.log(key);
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

// Arpeggiator
function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// const interval = setInterval(arp, 1000);

function arpRandom(scale, tempo, tone) {
  setInterval(() => {
    if (tone === "low") {
      playNote(scale[getRandom(0, 6)]);
    } else if (tone === "high") {
      playNote(scale[getRandom(7, scale.length - 1)]);
    } else {
      playNote(scale[getRandom(0, scale.length - 1)]);
    }
  }, tempo);
}

function arp(scale, tempo, tone, selectedNotes) {
  let notes = [];

  if (tone === "low") {
    if (selectedNotes) {
      selectedNotes.forEach((n) => {
        notes.push(scale.slice(0, 7)[n]);
      });
    } else {
      notes = scale.slice(0, 7);
    }
  } else if (tone === "high") {
    notes = scale.slice(7, scale.length - 1);
  } else {
    notes = scale;
  }

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

arpeggiator.addEventListener("submit", (e) => {
  e.preventDefault();

  // e.target.notes.forEach((el) => {
  //   if (el.checked) {
  //     console.log(el.parentElement.parentElement.id, el.value);
  //   }
  // });

  // if (e.target.random.checked) {
  //   console.log("Random checked");
  // }

  if (arpeggiator.arp1.value >= 100) {
    arp(scale_C_Major, arpeggiator.arp1.value, "low", [0, 2, 4, 6]);
  }
  if (arpeggiator.arp2.value >= 100) {
    arp(scale_C_Lydian, arpeggiator.arp2.value, "low", [0, 2, 4, 6]);
  }
  if (arpeggiator.arp3.value >= 100) {
    arpRandom(scale_C_Lydian, arpeggiator.arp3.value, "high");
  }
  if (arpeggiator.arp4.value >= 100) {
    arp(scale_C_Lydian, arpeggiator.arp4.value, "high");
  }
});
