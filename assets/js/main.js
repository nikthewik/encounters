////////////////////////////////////////////////////////////////////////////////

import * as elem from "./elements.js";
import * as q from "./quests.js";

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

////////////////////////////////////////////////////////////////////////////////

// GAME
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
  elem.display.innerHTML = counter;
  elem.miniDisplay.innerHTML = questCountdown;

  totalEncounters = 0;
  elem.title.innerHTML = `enCounters`;
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

  if (possibility > 0 && possibility <= 72) {
    resetFontSize();
    elem.display.innerHTML = counter;
  } else if (possibility >= 73 && possibility <= 86) {
    setFontSize();
    elem.display.innerHTML = getRandomQuest(q.positiveQuests);
    isMinusBtnBlocked = true;
    isPlusBtnBlocked = false;
    isPositiveQuest = true;
  } else if (possibility >= 87 && possibility <= 100) {
    setFontSize();
    elem.display.innerHTML = getRandomQuest(q.negativeQuests);
    isPlusBtnBlocked = true;
    isMinusBtnBlocked = false;
    isNegativeQuest = true;
  }

  setQuestCountdown();

  if (possibility > 72) {
    totalEncounters++;
    elem.title.innerHTML = `enCounters = ${totalEncounters}`;
  }
}

// To Get A Random Quest From An Array
function getRandomQuest(questArray) {
  randomIndex = Math.floor(Math.random() * questArray.length);
  getQuestReward();
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
    elem.miniDisplay.innerHTML = `+${questCountdown}`;
  } else if (isPositiveQuest === false && isNegativeQuest === true) {
    elem.miniDisplay.innerHTML = `-${questCountdown}`;
  } else if (isPositiveQuest === false && isNegativeQuest === false) {
    elem.miniDisplay.innerHTML = questCountdown;
  }
}

// GAME OVER
// To End The Game
function setGameOver() {
  setFontSize();
  elem.title.innerHTML = `enCounters: ${totalEncounters + 1}`;
  elem.miniDisplay.innerHTML = "0";
  if (counter > 0) {
    elem.display.innerHTML = `After ${totalEncounters} encounters, life brought you here for the best one: you find yourself thanks to an existence full of experiences. YOU WIN! 🎉`;
    if (recordEncounters < totalEncounters + 1) {
      recordEncounters = totalEncounters + 1;
      elem.record.innerHTML = recordEncounters;
    }
  } else {
    elem.display.innerHTML =
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

////////////////////////////////////////////////////////////////////////////////

// MEDIA
// To Play The Audio Song And The Background Video
function playMedia() {
  if (isPlusBtnPressed === true || isMinusBtnPressed === true) {
    elem.video.play();
    elem.audioSong.play();
  }
}

// To Play And Pause The Audio Alarm
function manageAudioAlarm() {
  if (counter < 0) {
    elem.audioAlarm.play();
  } else {
    elem.audioAlarm.pause();
  }
}

// To Reset And Stop The Audio And The Background Video
function resetMedia() {
  elem.video.pause();
  elem.video.currentTime = 0;
  elem.audioSong.pause();
  elem.audioSong.currentTime = 0;
  elem.audioAlarm.pause();
  elem.audioAlarm.currentTime = 0;
}

// To Speed Up The Background Video
function setPlayback() {
  if (counter < 10) {
    elem.video.playbackRate = 1;
  } else if (counter >= 10 && counter < 20) {
    elem.video.playbackRate = 1.5;
  } else if (counter >= 20 && counter < 30) {
    elem.video.playbackRate = 2;
  } else if (counter >= 30 && counter < 40) {
    elem.video.playbackRate = 2.5;
  } else if (counter >= 40 && counter < 50) {
    elem.video.playbackRate = 3;
  } else if (counter >= 50 && counter < 60) {
    elem.video.playbackRate = 3.5;
  } else if (counter >= 60 && counter < 70) {
    elem.video.playbackRate = 4;
  } else if (counter >= 70 && counter < 80) {
    elem.video.playbackRate = 4.5;
  } else if (counter >= 80 && counter < 90) {
    elem.video.playbackRate = 5.2;
  } else if (counter >= 90 && counter <= 100) {
    elem.video.playbackRate = 6;
  }
}

// To Mute The Audio
function muteAudio() {
  elem.audioAlarm.volume = 0;
  elem.audioSong.volume = 0;
  elem.volume.setAttribute("src", "/assets/img/volume-off.png");
}

// To Unmute The Audio
function unmuteAudio() {
  elem.audioAlarm.volume = 1;
  elem.audioSong.volume = 1;
  elem.volume.setAttribute("src", "/assets/img/volume-on.png");
}

////////////////////////////////////////////////////////////////////////////////

// FONT
// To Control The Font-size When There Is Text Instead Of Numbers On Display
function setFontSize() {
  elem.display.classList.remove("num-font-size");
  elem.display.classList.add("quest-font-size");
}

// To Reset Font-size To Initial Value
function resetFontSize() {
  elem.display.classList.remove("quest-font-size");
  elem.display.classList.add("num-font-size");
}

////////////////////////////////////////////////////////////////////////////////

// RED ALARM INTERFACE
// To Set Color Interface To Red
function setColorsToRed() {
  if (counter < 0) {
    elem.colorNotch.setAttribute("content", "#ff0000");
    elem.title.classList.remove("normal-text");
    elem.title.classList.add("alarm-text");
    elem.container.classList.remove("normal-border");
    elem.container.classList.add("alarm-border");
    elem.display.classList.remove("normal-text");
    elem.display.classList.add("alarm-text");
    elem.plusBtn.classList.remove("normal-text", "normal-border");
    elem.plusBtn.classList.add("alarm-text", "alarm-border");
    elem.resetBtn.classList.remove("normal-text", "normal-border");
    elem.resetBtn.classList.add("alarm-text", "alarm-border");
    elem.minusBtn.classList.remove("normal-text", "normal-border");
    elem.minusBtn.classList.add("alarm-text", "alarm-border");
    elem.miniDisplay.classList.remove("normal-text");
    elem.miniDisplay.classList.add("alarm-text");
    elem.info.classList.add("alarm-icon");
    elem.volume.classList.add("alarm-icon");
    elem.github.classList.add("alarm-icon");
    elem.cap.classList.remove("normal-text");
    elem.cap.classList.add("alarm-text");
    elem.recordImg.classList.add("alarm-icon");
    elem.recordText.classList.remove("normal-text");
    elem.recordText.classList.add("alarm-text");
    elem.record.classList.remove("normal-text");
    elem.record.classList.add("alarm-text");
    elem.footer.classList.remove("normal-text");
    elem.footer.classList.add("alarm-text");
    elem.alarmFilter.classList.remove("none");
    elem.alarmFilter.classList.add("alarm-filter");
  } else {
    resetColors();
  }
}

// To Reset Color Interface To Normal
function resetColors() {
  elem.colorNotch.setAttribute("content", "#ececec");
  elem.title.classList.remove("alarm-text");
  elem.title.classList.add("normal-text");
  elem.container.classList.remove("alarm-border");
  elem.container.classList.add("normal-border");
  elem.display.classList.remove("alarm-text");
  elem.display.classList.add("normal-text");
  elem.plusBtn.classList.remove("alarm-text", "alarm-border");
  elem.plusBtn.classList.add("normal-text", "normal-border");
  elem.resetBtn.classList.remove("alarm-text", "alarm-border");
  elem.resetBtn.classList.add("normal-text", "normal-border");
  elem.minusBtn.classList.remove("alarm-text", "alarm-border");
  elem.minusBtn.classList.add("normal-text", "normal-border");
  elem.miniDisplay.classList.remove("alarm-text");
  elem.miniDisplay.classList.add("normal-text");
  elem.info.classList.remove("alarm-icon");
  elem.volume.classList.remove("alarm-icon");
  elem.github.classList.remove("alarm-icon");
  elem.cap.classList.remove("alarm-text");
  elem.cap.classList.add("normal-text");
  elem.recordImg.classList.remove("alarm-icon");
  elem.recordText.classList.remove("alarm-text");
  elem.recordText.classList.add("normal-text");
  elem.record.classList.remove("alarm-text");
  elem.record.classList.add("normal-text");
  elem.footer.classList.remove("alarm-text");
  elem.footer.classList.add("normal-text");
  elem.alarmFilter.classList.remove("alarm-filter");
  elem.alarmFilter.classList.add("none");
}

////////////////////////////////////////////////////////////////////////////////

// MEDIA QUERIES
// To Hide Volume Btn On Apple Mobile Devices
if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
  elem.btnContainerVolume.classList.add("none");
  elem.volume.classList.add("none");
}

////////////////////////////////////////////////////////////////////////////////

// EVENTS
// Plus Btn
elem.plusBtn.addEventListener("click", () => {
  if (isPlusBtnBlocked === false) {
    isPlusBtnPressed = true;
    playGame();
    isPlusBtnPressed = false;
  }
});

// Reset Btn
elem.resetBtn.addEventListener("click", () => {
  resetGame();
});

// Minus Btn
elem.minusBtn.addEventListener("click", () => {
  if (isMinusBtnBlocked === false) {
    isMinusBtnPressed = true;
    playGame();
    isMinusBtnPressed = false;
  }
});

// Info Btn
elem.btnContainerInfo.addEventListener("click", () => {
  elem.infoRulesContainer.classList.remove("none");
  elem.infoRulesContainer.classList.add("flex", "flex-cc-col");
});

// Close Window
elem.btnContainerCloseWindow.addEventListener("click", () => {
  elem.infoRulesContainer.classList.remove("flex", "flex-cc-col");
  elem.infoRulesContainer.classList.add("none");
});

// Volume Btn
elem.btnContainerVolume.addEventListener("click", () => {
  if (elem.audioSong.volume === 1) {
    muteAudio();
  } else if (elem.audioSong.volume === 0) {
    unmuteAudio();
  }
});

////////////////////////////////////////////////////////////////////////////////
