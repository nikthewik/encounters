"use strict";

////////////////////////////////////////////////////////////////////////////////

// ELEMENTS
// Function To Create Elements
function createEl(htmlTag, cssClass, text, parentEl) {
  // 1. Creating HTML Element
  let el = document.createElement(htmlTag);
  // 2. Adding CSS Classes
  el.className = cssClass;
  // 3. Adding Text
  el.textContent = text;
  // 4. Appending Element To The Parent
  parentEl.appendChild(el);

  return el;
}

// ELEMENTS OBTAINED
// Meta Tag For The Color Of The Notch On iPhone
let colorNotch = document.querySelector('meta[name="theme-color"]');

// - Body
const body = document.querySelector("body");

// ELEMENTS CREATED
// -- Page
const page = createEl("div", "page flex flex-cc-col", "", body);

// --- Video
const video = createEl("video", "", "", page);
video.setAttribute("loop", "true");
video.setAttribute("muted", "true");
video.setAttribute("playsinline", "true");
video.setAttribute("poster", "/assets/img/poster.jpg");
// ---- Source Webm
const sourceWebm = createEl("source", "", "", video);
sourceWebm.setAttribute("type", "video/webm");
sourceWebm.setAttribute("src", "/assets/media/bg-video.webm");
// ---- Source Mp4
const sourceMp4 = createEl("source", "", "", video);
sourceMp4.setAttribute("type", "video/mp4");
sourceMp4.setAttribute("src", "/assets/media/bg-video.mp4");

// --- Alarm Filter
const alarmFilter = createEl("div", "none", "", page);

// --- Audio
const audio = createEl("audio", "", "", page);
audio.setAttribute("loop", "");
audio.setAttribute("type", "audio/mp3");
audio.setAttribute("src", "/assets/media/encounters.mp3");
audio.volume = 1;

// --- Title
const title = createEl(
  "h1",
  "title title-font-size normal-text",
  "enCounters",
  page
);

// --- Container
const container = createEl(
  "div",
  "container flex flex-cc-col normal-border",
  "",
  page
);
// ---- Display
const display = createEl(
  "div",
  "display flex flex-cc-col num-font-size normal-text",
  "0",
  container
);
// ---- Buttons
const buttons = createEl("div", "buttons flex flex-cc-col", "", container);
// ----- Plus
const plusBtn = createEl(
  "button",
  "plus btn text-font-size normal-text normal-border",
  "+",
  buttons
);
// ----- Reset
const resetBtn = createEl(
  "button",
  "reset btn text-font-size normal-text normal-border",
  "⟲",
  buttons
);
// ----- Minus
const minusBtn = createEl(
  "button",
  "minus btn text-font-size normal-text normal-border",
  "-",
  buttons
);

// --- Info Panel
const infoPanel = createEl("div", "info-panel flex", "", page);

// ---- Controls
const controls = createEl("div", "controls flex flex-cc", "", infoPanel);
// ----- Button For Accessibility
const btnContainerInfo = createEl(
  "button",
  "btn-container flex flex-cc",
  "",
  controls
);
// ------ Info
const info = createEl("img", "info", "", btnContainerInfo);
info.setAttribute("src", "/assets/img/info.png");
// ----- Button For Accessibility
const btnContainerVolume = createEl(
  "button",
  "btn-container flex flex-cc",
  "",
  controls
);
// ------ Volume
const volume = createEl("img", "volume", "", btnContainerVolume);
volume.setAttribute("src", "/assets/img/volume-on.png");

// ---- Social
const social = createEl("div", "social flex flex-cc", "", infoPanel);
// ----- Link
const link = createEl("a", "flex flex-cc", "", social);
link.setAttribute("href", "https://github.com/nikthewik");
link.setAttribute("target", "_blank");
// ------ GitHub
const github = createEl("img", "github", "", link);
github.setAttribute("src", "/assets/img/github.png");
// ----- Caption
const cap = createEl(
  "p",
  "copyright-font-size normal-text",
  "by nikthewik.",
  social
);

// --- Footer
const footer = createEl(
  "footer",
  "copyright-font-size normal-text",
  "Copyright © 2023 Nicola Pavoni. All Rights Reserved.",
  page
);

////////////////////////////////////////////////////////////////////////////////

// MEDIA QUERIES
// To Hide Volume Btn On Apple Mobile Devices
if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
  btnContainerVolume.classList.add("none");
  volume.classList.add("none");
}

////////////////////////////////////////////////////////////////////////////////

// VARIABLES

let counter;
let gameOver;
let isPlusBtnPressed = false;
let isMinusBtnPressed = false;
let isPlusBtnBlocked = false;
let isMinusBtnBlocked = false;
let possibility;
let randomIndex;
let questReward;
let questCounter;

const positiveQuests = [
  // 5 Points Quests
  `You eat the best icecream of the entire Cosmo on the planet ParadIce. Move forward in your adventure by 5 light years! 🍧`,
  `You find an ancient treasure on the planet Makhaar. Move forward in your adventure by 5 light years! 💍`,
  `You intercept a mysterious alien trasmission asking for help. Move forward in your adventure by 5 light years! 👽`,
  `You eat the best icecream of the entire Cosmo on the planet ParadIce. Move forward in your adventure by 5 light years! 🍧`,
  `You eat the best icecream of the entire Cosmo on the planet ParadIce. Move forward in your adventure by 5 light years! 🍧`,
  `You eat the best icecream of the entire Cosmo on the planet ParadIce. Move forward in your adventure by 5 light years! 🍧`,
  `You eat the best icecream of the entire Cosmo on the planet ParadIce. Move forward in your adventure by 5 light years! 🍧`,
  // 7 Points Quests
  `You meet Lyssa Grey Glove: "Soon, hide over here! The Dark Army is coming!". Move forward in your adventure by 7 light years!  🥷🏻`,
  `You meet Tarta, the Omniscient: "I'll tell you a secret... but slowly!". Move forward in your adventure by 7 light years! 🐢`,
  `You meet De-Lo, Dead Lotus: "Ahahah you’re a strange guy! All right, I’ll help you." Move forward in your adventure by 7 light years! 🪷`,
  `You find an ancient treasure on the planet Makhaar. Move forward in your adventure by 7 light years! 💎`,
  `You find an ancient treasure on the planet Makhaar. Move forward in your adventure by 7 light years! 💎`,
  `You find an ancient treasure on the planet Makhaar. Move forward in your adventure by 7 light years! 💎`,
  // 10 Points Quests
  `You join the Space Pirate Brigade. You really feel free. Move forward in your adventure by 10 light years! 🏴‍☠️`,
  `You join the Space Pirate Brigade. You really feel free. Move forward in your adventure by 10 light years! 🏴‍☠️`,
  `You join the Space Pirate Brigade. You really feel free. Move forward in your adventure by 10 light years! 🏴‍☠️`,
  `You join the Space Pirate Brigade. You really feel free. Move forward in your adventure by 10 light years! 🏴‍☠️`,
  `You join the Space Pirate Brigade. You really feel free. Move forward in your adventure by 10 light years! 🏴‍☠️`,
  // 30 Points Teleporting Quests
  `You discover a peculiar anomaly that creates a quantum link with a distant star. Move INSTANTLY forward by 30 light years! 🌟`,
  `You discover a peculiar anomaly that creates a quantum link with a distant star. Move INSTANTLY forward by 30 light years! 🌟`,
];

const negativeQuests = [
  // 5 Points Quests
  `Oh no, an holographic trap! That ship was a misdirection, you’ve wasted so much fuel... Move backwards by 5 light years! ⛽️`,
  `Oh no, an holographic trap! That ship was a misdirection, you’ve wasted so much fuel... Move backwards by 5 light years! ⛽️`,
  `Oh no, an holographic trap! That ship was a misdirection, you’ve wasted so much fuel... Move backwards by 5 light years! ⛽️`,
  `Oh no, an holographic trap! That ship was a misdirection, you’ve wasted so much fuel... Move backwards by 5 light years! ⛽️`,
  `Oh no, an holographic trap! That ship was a misdirection, you’ve wasted so much fuel... Move backwards by 5 light years! ⛽️`,
  `Oh no, an holographic trap! That ship was a misdirection, you’ve wasted so much fuel... Move backwards by 5 light years! ⛽️`,
  `Oh no, an holographic trap! That ship was a misdirection, you’ve wasted so much fuel... Move backwards by 5 light years! ⛽️`,
  // 7 Points Quests
  `Oh no, an holographic trap! That ship was a misdirection, you’ve wasted so much fuel... Move backwards by 7 light years! ⛽️`,
  `Oh no, an holographic trap! That ship was a misdirection, you’ve wasted so much fuel... Move backwards by 7 light years! ⛽️`,
  `Oh no, an holographic trap! That ship was a misdirection, you’ve wasted so much fuel... Move backwards by 7 light years! ⛽️`,
  `Oh no, an holographic trap! That ship was a misdirection, you’ve wasted so much fuel... Move backwards by 7 light years! ⛽️`,
  `Oh no, an holographic trap! That ship was a misdirection, you’ve wasted so much fuel... Move backwards by 7 light years! ⛽️`,
  `Oh no, an holographic trap! That ship was a misdirection, you’ve wasted so much fuel... Move backwards by 7 light years! ⛽️`,
  // 10 Points Quests
  `Oh no, an holographic trap! That ship was a misdirection, you’ve wasted so much fuel... Move backwards by 10 light years! ⛽️`,
  `Oh no, an holographic trap! That ship was a misdirection, you’ve wasted so much fuel... Move backwards by 10 light years! ⛽️`,
  `Oh no, an holographic trap! That ship was a misdirection, you’ve wasted so much fuel... Move backwards by 10 light years! ⛽️`,
  `Oh no, an holographic trap! That ship was a misdirection, you’ve wasted so much fuel... Move backwards by 10 light years! ⛽️`,
  `Oh no, an holographic trap! That ship was a misdirection, you’ve wasted so much fuel... Move backwards by 10 light years! ⛽️`,
  // 30 Points Teleporting Quests
  `You encounter a super massive gravitational anomaly that pulls your ship off course. Move INSTANTLY backwards by 30 light years! ⚫️`,
  `You encounter a super massive gravitational anomaly that pulls your ship off course. Move INSTANTLY backwards by 30 light years! ⚫️`,
];

////////////////////////////////////////////////////////////////////////////////

// FUNCTIONS

function initGame() {
  gameOver = false;
  counter = 0;
  display.innerHTML = counter;
}

initGame();

function playGame() {
  if (gameOver === false && counter > -99 && counter < 99) {
    playMedia();

    if (isPlusBtnPressed === true) {
      counter++;
    } else if (isMinusBtnPressed === true) {
      counter--;
    }
    manageQuestPossibility();
  } else {
    setGameOver();
  }
  setPlayback();
  setColorsToRed();
}

function setGameOver() {
  setFontSize();
  display.innerHTML =
    counter > 0
      ? "Life brought you here for the very last encounter: you find yourself thanks to an existence full of experiences. YOU WIN! 🎉"
      : "The Dark Army captures you and sells you as a slave on the planet Kragas. You are destined to die in chains. YOU LOST! 💀";
  gameOver = true;
}

function resetGame() {
  resetMedia();
  resetFontSize();
  resetColors();
  initGame();
  questReward = 0;
  questCounter = 0;
  setQuestCounter();
}

// To Play The Audio And The Background Video
function playMedia() {
  if (video.paused && audio.paused) {
    video.play();
    audio.play();
  }
}

// To Reset And Stop The Audio And The Background Video
function resetMedia() {
  video.currentTime = 0;
  video.pause();
  audio.currentTime = 0;
  audio.pause();
}

// To Speed Up The Background Video
function setPlayback() {
  if (counter < 10) {
    video.playbackRate = 1;
  } else if (counter >= 10 && counter < 20) {
    video.playbackRate = 1.5;
  } else if (counter >= 20 && counter < 30) {
    video.playbackRate = 2;
  } else if (counter >= 30 && counter < 40) {
    video.playbackRate = 2.5;
  } else if (counter >= 40 && counter < 50) {
    video.playbackRate = 3;
  } else if (counter >= 50 && counter < 60) {
    video.playbackRate = 3.5;
  } else if (counter >= 60 && counter < 70) {
    video.playbackRate = 4;
  } else if (counter >= 70 && counter < 80) {
    video.playbackRate = 4.5;
  } else if (counter >= 80 && counter < 90) {
    video.playbackRate = 5.2;
  } else if (counter >= 90 && counter <= 100) {
    video.playbackRate = 6;
  }
}

// To Mute The Audio
function muteAudio() {
  audio.volume = 0;
  volume.setAttribute("src", "/assets/img/volume-off.png");
}

// To Unmute The Audio
function unmuteAudio() {
  audio.volume = 1;
  volume.setAttribute("src", "/assets/img/volume-on.png");
}

// To Control The Font-size When There Is Text Instead Of Numbers On Display
function setFontSize() {
  display.classList.remove("num-font-size");
  display.classList.add("quest-font-size");
}

// To Reset Font-size To Initial Value
function resetFontSize() {
  display.classList.remove("quest-font-size");
  display.classList.add("num-font-size");
}

// To Set Color Interface To Red
function setColorsToRed() {
  if (counter < 0) {
    colorNotch.setAttribute("content", "#ff0000");
    title.classList.remove("normal-text");
    title.classList.add("alarm-text");
    container.classList.remove("normal-border");
    container.classList.add("alarm-border");
    display.classList.remove("normal-text");
    display.classList.add("alarm-text");
    plusBtn.classList.remove("normal-text", "normal-border");
    plusBtn.classList.add("alarm-text", "alarm-border");
    resetBtn.classList.remove("normal-text", "normal-border");
    resetBtn.classList.add("alarm-text", "alarm-border");
    minusBtn.classList.remove("normal-text", "normal-border");
    minusBtn.classList.add("alarm-text", "alarm-border");
    info.classList.add("alarm-icon");
    volume.classList.add("alarm-icon");
    github.classList.add("alarm-icon");
    cap.classList.remove("normal-text");
    cap.classList.add("alarm-text");
    footer.classList.remove("normal-text");
    footer.classList.add("alarm-text");
    alarmFilter.classList.remove("none");
    alarmFilter.classList.add("alarm-filter");
  } else {
    resetColors();
  }
}

// To Reset Color Interface To Normal
function resetColors() {
  colorNotch.setAttribute("content", "#ececec");
  title.classList.remove("alarm-text");
  title.classList.add("normal-text");
  container.classList.remove("alarm-border");
  container.classList.add("normal-border");
  display.classList.remove("alarm-text");
  display.classList.add("normal-text");
  plusBtn.classList.remove("alarm-text", "alarm-border");
  plusBtn.classList.add("normal-text", "normal-border");
  resetBtn.classList.remove("alarm-text", "alarm-border");
  resetBtn.classList.add("normal-text", "normal-border");
  minusBtn.classList.remove("alarm-text", "alarm-border");
  minusBtn.classList.add("normal-text", "normal-border");
  info.classList.remove("alarm-icon");
  volume.classList.remove("alarm-icon");
  github.classList.remove("alarm-icon");
  cap.classList.remove("alarm-text");
  cap.classList.add("normal-text");
  footer.classList.remove("alarm-text");
  footer.classList.add("normal-text");
  alarmFilter.classList.remove("alarm-filter");
  alarmFilter.classList.add("none");
}

function manageQuestPossibility() {
  possibility = Math.floor(Math.random() * 100 + 1);
  console.log(`Possibility: ${possibility}`);
  if (possibility > 0 && possibility <= 80) {
    resetFontSize();
    display.innerHTML = counter;
  } else if (possibility >= 81 && possibility <= 90) {
    setFontSize();
    display.innerHTML = getRandomQuest(positiveQuests);
    isMinusBtnBlocked = true;
    isPlusBtnBlocked = false;
    questCounter = questReward;
  } else if (possibility >= 91 && possibility <= 100) {
    setFontSize();
    display.innerHTML = getRandomQuest(negativeQuests);
    isPlusBtnBlocked = true;
    isMinusBtnBlocked = false;
    questCounter = questReward;
  }
}

function getRandomQuest(questArray) {
  randomIndex = Math.floor(Math.random() * questArray.length);
  getQuestReward();

  console.log(`Random Index: ${randomIndex}`);
  return questArray[randomIndex];
}

function getQuestReward() {
  if (randomIndex >= 0 && randomIndex <= 6) {
    questReward = 5;
  } else if (randomIndex >= 7 && randomIndex <= 12) {
    questReward = 7;
  } else if (randomIndex >= 13 && randomIndex <= 17) {
    questReward = 10;
  } else if (randomIndex >= 18 && randomIndex <= 19) {
    questReward = 1;
    if (possibility > 89) {
      counter -= 30;
    } else {
      counter += 30;
    }
  }
  console.log(`Quest Reward: ${questReward}`);
  return questReward;
}

function setQuestCounter() {
  if (questCounter === 0) {
    isPlusBtnBlocked = false;
    isMinusBtnBlocked = false;
  } else {
    questCounter--;
  }
}

////////////////////////////////////////////////////////////////////////////////

// EVENTS

plusBtn.addEventListener("click", () => {
  if (isPlusBtnBlocked === false) {
    isPlusBtnPressed = true;
    playGame();
    setQuestCounter();
    isPlusBtnPressed = false;
  }
});

resetBtn.addEventListener("click", () => {
  resetGame();
});

minusBtn.addEventListener("click", () => {
  if (isMinusBtnBlocked === false) {
    isMinusBtnPressed = true;
    playGame();
    setQuestCounter();
    isMinusBtnPressed = false;
  }
});

btnContainerVolume.addEventListener("click", () => {
  if (audio.volume === 1) {
    muteAudio();
  } else if (audio.volume === 0) {
    unmuteAudio();
  }
});

////////////////////////////////////////////////////////////////////////////////
