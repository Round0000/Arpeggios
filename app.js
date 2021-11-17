function getNote(key) {
  let audio = new Audio(`/audio/${key}.mp3`);
  return audio;
}

function playNote(key) {
  console.log(key);
  let note = getNote(key);
  note.currentTime = 0;
  note.play();
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

let keys = document.querySelectorAll(".key");

let scale_C_Major = document.querySelectorAll(".key.n");
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

function arp(scale, tempo, tone) {
  setInterval(() => {
    if (tone === "low") {
      scale[getRandom(0, Math.round(scale.length / 2))].click();
    } else if (tone === "high") {
      scale[getRandom(Math.round(scale.length / 2), scale.length - 1)].click();
    } else {
      scale[getRandom(0, scale.length - 1)].click();
    }
  }, tempo);
}

arpeggiator.addEventListener("submit", (e) => {
  e.preventDefault();

  if (arpeggiator.tempo.value >= 200) {
    arp(scale_C_Lydian, arpeggiator.tempo.value, "low");
  }
  if (arpeggiator.tempo2.value >= 200) {
    arp(scale_C_Lydian, arpeggiator.tempo2.value, "high");
  }
  if (arpeggiator.tempo3.value >= 200) {
    arp(scale_C_Lydian, arpeggiator.tempo3.value, "high");
  }
  if (arpeggiator.tempo4.value >= 200) {
    arp(scale_C_Lydian, arpeggiator.tempo4.value, "high");
  }
});
