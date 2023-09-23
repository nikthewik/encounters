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

// --- Audio Song
const audioSong = createEl("audio", "", "", page);
audioSong.setAttribute("loop", "");
audioSong.setAttribute("type", "audio/mp3");
audioSong.setAttribute("src", "/assets/media/encounters.mp3");
audioSong.volume = 1;

// --- Audio Alarm
const audioAlarm = createEl("audio", "", "", page);
audioAlarm.setAttribute("loop", "");
audioAlarm.setAttribute("type", "audio/mp3");
audioAlarm.setAttribute("src", "/assets/media/alarm.mp3");
audioAlarm.volume = 1;

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

// ----- Mini Display For Quest Countdown
const miniDisplay = createEl(
  "div",
  "mini-display normal-text record-font-size",
  "0",
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

// ---- Record Container
const recordContainer = createEl("div", "flex flex-cc", "", infoPanel);
// ----- Record Image
const recordImg = createEl("img", "record-img", "", recordContainer);
recordImg.setAttribute("src", "/assets/img/record.png");
// ----- Record Text
const recordText = createEl(
  "p",
  "copyright-font-size normal-text",
  ":",
  recordContainer
);
// ----- Record
const record = createEl(
  "div",
  "record record-font-size normal-text",
  "0",
  recordContainer
);

// --- Footer
const footer = createEl(
  "footer",
  "copyright-font-size normal-text",
  "Copyright © 2023 Nicola Pavoni. All Rights Reserved.",
  page
);

// --- Info, Rules
const infoRulesContainer = createEl(
  "div",
  "info-rules-container none",
  "",
  page
);
// ---- Button Container
const containerCloseControl = createEl("div", "flex", "", infoRulesContainer);
// ----- Button For Accessibility
const btnContainerCloseWindow = createEl(
  "button",
  "btn-container btn-container-close-window flex",
  "",
  containerCloseControl
);
// ------ Close Window Img
const closeWindow = createEl(
  "img",
  "close-window",
  "",
  btnContainerCloseWindow
);
closeWindow.setAttribute("src", "/assets/img/close-window.png");
// ---- Rules
const rules = createEl(
  "p",
  "quest-font-size normal-text",
  "Ciao, son Nik!",
  infoRulesContainer
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
let isGameOver;

let isPlusBtnPressed;
let isMinusBtnPressed;
let isPlusBtnBlocked;
let isMinusBtnBlocked;
let isPossibilityBlocked;
let isPositiveQuest;
let isNegativeQuest;

let possibility;
let randomIndex;
let questReward;
let questCountdown;

let totalEncounters;
let recordEncounters = 0;

// Positive Quests
const positiveQuests = [
  // 5 Points Quests
  `You eat the best ice cream of the entire Universe on the planet ParadIce. Move FORWARD in your adventure by 5 light years! 🍧`,
  `You uncover an ancient alien artifact on the planet Makhaar. Move FORWARD in your adventure by 5 light years! 💎`,
  `You land on a party moon and join an intergalactic feast. Move FORWARD by 5 light years, but first... Let's dance! 🕺🏻`,
  `You stumble upon a Space Café where the owner insists you to try their famous cosmic cappuccino. Move FORWARD by 5 light years! 🥤`,
  `You win the Race2Space competition. As a prize, you get a lot of solid propellant to move FORWARD by 5 light years! 🚀`,
  `You rescue some space travelers in danger. As thanks, they share coordinates of a wormhole. Move FORWARD by 5 light years! 🆘`,
  `NX-3000 joins you! He is a powerful AI companion, but also a nice friend. Your OS moves FORWARD by 5 light years, just as you! 🤖`,
  // 7 Points Quests
  `You meet Lyssa Grey Glove: "Soon, hide over here! The Dark Army is coming!". Move FORWARD in your adventure by 7 light years! 🥷🏻`,
  `You meet Tarta, the Omniscient: "I'll tell you about my vision... but slowly!". Move FORWARD in your adventure by 7 light years! 🐢`,
  `You meet De-Lo, Dead Lotus: "Do you need some brute force? Ahahah all right, I’ll join you.". Move FORWARD by 7 light years! 🪷`,
  `Marcus, the M-astrophysicist joins you: “Everything as planned. I optimised the route.”. Move FORWARD by 7 light years! 🧑🏻‍🔬`,
  `BeatriX D/Headshot joins you: “An anti-matter sniper rifle and a beer?! I'm totally in, let's go!”. Move FORWARD by 7 light years! 🍻`,
  `You successfully negotiate a trade alliance with an alien nation, gaining advanced propulsion tech. Move FORWARD by 7 light years! 🫱🏻‍🫲🏾`,
  // 10 Points Quests
  `You establish the Space Pirates Brigade. You really feel free. Move FORWARD in your adventure by 10 light years! 🏴‍☠️`,
  `The Galactic Council commends your achievements, granting you an interstellar boost. Move FORWARD by 10 light years! 🏛️`,
  `You infiltrate the Dark Army’s data vault, extracting critical intel about its evil affairs. Move FORWARD by 10 light years! 💾`,
  `You enter the Sakura Cosmo: a region of space full of cherry blossoms. You feel very grateful. Move FORWARD by 10 light years! 🌸`,
  `A space bard serenades you with a cosmic ballad, inspiring you to venture FORWARD by 10 light years! 🎶`,
  // 30 Points Teleporting Quests
  `You discover a peculiar anomaly that creates a quantum link with a distant star. Move INSTANTLY FORWARD by 30 light years! 🌟`,
  `You discover a peculiar anomaly that creates a quantum link with a distant star. Move INSTANTLY FORWARD by 30 light years! 🌟`,
];

// Negative Quests
const negativeQuests = [
  // 5 Points Quests
  `"Oh no, a holographic trap!". That spaceship isn’t real: you’ve wasted so much fuel to follow it. Move BACK by 5 light years! ⛽️`,
  `You contract a rare type of space virus, requiring immediate quarantine. Move BACK by 5 light years! 🦠`,
  `"What does this big red button do? *click*". You activate a space-time dilation field by mistake, moving BACK by 5 light years! ⏳`,
  `"Energy levels critical!". Your energy reserves run critically low, requiring you to move BACK of 5 light years for recharge! 🪫`,
  `“That is… Oh no! A huge interstellar banana peel!”. Your spaceship slides BACK by 5 light years! 🍌`,
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
  `"Sir, there's been a misunderstanding!". The Interstellar Police issue a warrant for your arrest. Move BACK by 10 light years! 👮‍♂️`,
  `The Dark Army gets your position. It’s only a matter of time before it gets to you. Move BACK by 10 light years! 👹`,
  // 30 Points Teleporting Quests
  `You encounter a super massive gravitational anomaly that pulls your ship off course. Move INSTANTLY BACK by 30 light years! ⚫️`,
  `You encounter a super massive gravitational anomaly that pulls your ship off course. Move INSTANTLY BACK by 30 light years! ⚫️`,
];

////////////////////////////////////////////////////////////////////////////////

// FUNCTIONS

// GAME ENGINE
// To Initialize The Game
function initGame() {
  isGameOver = false;
  isPlusBtnPressed = false;
  isMinusBtnPressed = false;
  isPlusBtnBlocked = false;
  isMinusBtnBlocked = false;
  isPossibilityBlocked = false;
  isPositiveQuest = false;
  isNegativeQuest = false;

  possibility = 0;
  randomIndex = 0;
  questReward = 0;
  questCountdown = 0;

  counter = 0;
  display.innerHTML = counter;
  miniDisplay.innerHTML = questCountdown;

  totalEncounters = 0;
  title.innerHTML = `enCounters`;
}

initGame();

// To Play The Game
function playGame() {
  if (isGameOver === false) {
    playMedia();
    if (isPlusBtnPressed === true) {
      counter++;
    } else if (isMinusBtnPressed === true) {
      counter--;
    }
    if (counter <= -100 || counter >= 100) {
      setGameOver();
    } else {
      manageQuestPossibility();
    }
    setPlayback();
    setColorsToRed();
    manageAudioAlarm();
  }
}

// To Manage The Possibility Of An Encounter
function manageQuestPossibility() {
  if (isPossibilityBlocked === true) {
    possibility = 1;
  } else {
    possibility = Math.floor(Math.random() * 100 + 1);
  }

  console.log(`Possibility: ${possibility}`);

  if (possibility > 0 && possibility <= 72) {
    resetFontSize();
    display.innerHTML = counter;
  } else if (possibility >= 73 && possibility <= 86) {
    setFontSize();
    display.innerHTML = getRandomQuest(positiveQuests);
    isMinusBtnBlocked = true;
    isPlusBtnBlocked = false;
    isPositiveQuest = true;
  } else if (possibility >= 87 && possibility <= 100) {
    setFontSize();
    display.innerHTML = getRandomQuest(negativeQuests);
    isPlusBtnBlocked = true;
    isMinusBtnBlocked = false;
    isNegativeQuest = true;
  }

  setQuestCountdown();

  if (possibility > 72) {
    totalEncounters++;
    title.innerHTML = `enCounters = ${totalEncounters}`;
  }
}

// To Get A Random Quest From An Array
function getRandomQuest(questArray) {
  randomIndex = Math.floor(Math.random() * questArray.length);
  getQuestReward();

  console.log(`Random Index: ${randomIndex}`);
  return questArray[randomIndex];
}

// To Get A Reward Based On A Quest's Position In The Array
function getQuestReward() {
  if (randomIndex >= 0 && randomIndex <= 6) {
    questReward = 5;
  } else if (randomIndex >= 7 && randomIndex <= 12) {
    questReward = 7;
  } else if (randomIndex >= 13 && randomIndex <= 17) {
    questReward = 10;
  } else if (randomIndex >= 18 && randomIndex <= 19) {
    questReward = 1;
    if (possibility > 86) {
      counter -= 30;
    } else {
      counter += 30;
    }
  }
  console.log(`Quest Reward: ${questReward}`);
  return questReward;
}

// To Set A Countdown To Determine The Duration Of A Quest
function setQuestCountdown() {
  questCountdown = questReward;

  if (questCountdown === 0) {
    questReward = 0;
    isPlusBtnBlocked = false;
    isMinusBtnBlocked = false;
    isPossibilityBlocked = false;
    isPositiveQuest = false;
    isNegativeQuest = false;
    manageMiniDisplay();
  } else {
    manageMiniDisplay();
    questCountdown--;
    questReward--;
    isPossibilityBlocked = true;
  }
}

// To View The Quest Countdown
function manageMiniDisplay() {
  if (isPositiveQuest === true && isNegativeQuest === false) {
    miniDisplay.innerHTML = `+${questCountdown}`;
  } else if (isPositiveQuest === false && isNegativeQuest === true) {
    miniDisplay.innerHTML = `-${questCountdown}`;
  } else if (isPositiveQuest === false && isNegativeQuest === false) {
    miniDisplay.innerHTML = questCountdown;
  }
}

// GAME OVER
// To End The Game
function setGameOver() {
  setFontSize();
  title.innerHTML = `enCounters: ${totalEncounters + 1}`;
  if (counter > 0) {
    display.innerHTML = `After ${totalEncounters} encounters, life brought you here for the best one: you find yourself thanks to an existence full of experiences. YOU WIN! 🎉`;
    if (recordEncounters < totalEncounters + 1) {
      recordEncounters = totalEncounters + 1;
      record.innerHTML = recordEncounters;
    }
  } else {
    display.innerHTML =
      "The Dark Army captures you and sells you as a slave on the planet Kragas. You are destined to die alone, in chains. YOU LOSE! 💀";
  }
  isGameOver = true;
}

// RESET GAME
// To Reset The Game To Initial Value
function resetGame() {
  resetMedia();
  resetFontSize();
  resetColors();
  initGame();
}

// MEDIA
// To Play The Audio And The Background Video
function playMedia() {
  if (isPlusBtnPressed === true || isMinusBtnPressed === true) {
    video.play();
    audioSong.play();
  }
}

function manageAudioAlarm() {
  if (counter < 0) {
    audioAlarm.play();
  } else {
    audioAlarm.pause();
  }
}

// To Reset And Stop The Audio And The Background Video
function resetMedia() {
  video.pause();
  video.currentTime = 0;
  audioSong.pause();
  audioSong.currentTime = 0;
  audioAlarm.pause();
  audioAlarm.currentTime = 0;
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
  audioAlarm.volume = 0;
  audioSong.volume = 0;
  volume.setAttribute("src", "/assets/img/volume-off.png");
}

// To Unmute The Audio
function unmuteAudio() {
  audioAlarm.volume = 1;
  audioSong.volume = 1;
  volume.setAttribute("src", "/assets/img/volume-on.png");
}

// FONT
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

// RED ALARM INTERFACE
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
    miniDisplay.classList.remove("normal-text");
    miniDisplay.classList.add("alarm-text");
    info.classList.add("alarm-icon");
    volume.classList.add("alarm-icon");
    github.classList.add("alarm-icon");
    cap.classList.remove("normal-text");
    cap.classList.add("alarm-text");
    recordImg.classList.add("alarm-icon");
    recordText.classList.remove("normal-text");
    recordText.classList.add("alarm-text");
    record.classList.remove("normal-text");
    record.classList.add("alarm-text");
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
  miniDisplay.classList.remove("alarm-text");
  miniDisplay.classList.add("normal-text");
  info.classList.remove("alarm-icon");
  volume.classList.remove("alarm-icon");
  github.classList.remove("alarm-icon");
  cap.classList.remove("alarm-text");
  cap.classList.add("normal-text");
  recordImg.classList.remove("alarm-icon");
  recordText.classList.remove("alarm-text");
  recordText.classList.add("normal-text");
  record.classList.remove("alarm-text");
  record.classList.add("normal-text");
  footer.classList.remove("alarm-text");
  footer.classList.add("normal-text");
  alarmFilter.classList.remove("alarm-filter");
  alarmFilter.classList.add("none");
}

////////////////////////////////////////////////////////////////////////////////

// EVENTS
// Plus Btn
plusBtn.addEventListener("click", () => {
  if (isPlusBtnBlocked === false) {
    isPlusBtnPressed = true;
    playGame();
    isPlusBtnPressed = false;
  }
});

// Reset Btn
resetBtn.addEventListener("click", () => {
  resetGame();
});

// Minus Btn
minusBtn.addEventListener("click", () => {
  if (isMinusBtnBlocked === false) {
    isMinusBtnPressed = true;
    playGame();
    isMinusBtnPressed = false;
  }
});

// Info Btn
btnContainerInfo.addEventListener("click", () => {
  infoRulesContainer.classList.remove("none");
  infoRulesContainer.classList.add("flex", "flex-cc-col");
});

// Close Window
btnContainerCloseWindow.addEventListener("click", () => {
  infoRulesContainer.classList.remove("flex", "flex-cc-col");
  infoRulesContainer.classList.add("none");
});

// Volume Btn
btnContainerVolume.addEventListener("click", () => {
  if (audioSong.volume === 1) {
    muteAudio();
  } else if (audioSong.volume === 0) {
    unmuteAudio();
  }
});

////////////////////////////////////////////////////////////////////////////////
