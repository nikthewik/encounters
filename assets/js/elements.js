////////////////////////////////////////////////////////////////////////////////

// CREATING ELEMENTS IN JAVASCRIPT
// This Is A Function To Create Elements Directly In JavaScript
function createEl(htmlTag, cssClass, text, parentEl) {
  let el = document.createElement(htmlTag);
  el.className = cssClass;
  el.textContent = text;
  parentEl.appendChild(el);
  return el;
}

////////////////////////////////////////////////////////////////////////////////

// ELEMENTS OBTAINED FROM THE HTML FILE
// Meta Tag For The Color Of The Notch On Mobile
export let colorNotch = document.querySelector('meta[name="theme-color"]');

// - Body
export const body = document.querySelector("body");

////////////////////////////////////////////////////////////////////////////////

// ELEMENTS CREATED BY "createEl" FUNCTION
// -- Page
export const page = createEl("div", "page flex flex-cc-col", "", body);

// --- Video
export const video = createEl("video", "", "", page);
video.setAttribute("loop", "true");
video.setAttribute("muted", "true");
video.setAttribute("playsinline", "true");
video.setAttribute("poster", "/assets/img/poster.jpg");
// ---- Source Webm
export const sourceWebm = createEl("source", "", "", video);
sourceWebm.setAttribute("type", "video/webm");
sourceWebm.setAttribute("src", "/assets/media/bg-video.webm");
// ---- Source Mp4 Fallback
export const sourceMp4 = createEl("source", "", "", video);
sourceMp4.setAttribute("type", "video/mp4");
sourceMp4.setAttribute("src", "/assets/media/bg-video.mp4");

// --- Red Alarm Filter
export const alarmFilter = createEl("div", "none", "", page);

// --- Audio Song
export const audioSong = createEl("audio", "", "", page);
audioSong.setAttribute("loop", "");
audioSong.setAttribute("type", "audio/mp3");
audioSong.setAttribute("src", "/assets/media/encounters.mp3");
audioSong.volume = 1;

// --- Audio Alarm
export const audioAlarm = createEl("audio", "", "", page);
audioAlarm.setAttribute("loop", "");
audioAlarm.setAttribute("type", "audio/mp3");
audioAlarm.setAttribute("src", "/assets/media/alarm.mp3");
audioAlarm.volume = 1;

// --- Title
export const title = createEl(
  "h1",
  "title title-font-size normal-text",
  "enCounters",
  page
);

// --- Container
export const container = createEl(
  "div",
  "container flex flex-cc-col normal-border",
  "",
  page
);
// ---- Display
export const display = createEl(
  "div",
  "display flex flex-cc-col num-font-size normal-text",
  "0",
  container
);
// ---- Buttons
export const buttons = createEl(
  "div",
  "buttons flex flex-cc-col",
  "",
  container
);
// ----- Plus Btn
export const plusBtn = createEl(
  "button",
  "plus btn text-font-size normal-text normal-border",
  "+",
  buttons
);
// ----- Reset Btn
export const resetBtn = createEl(
  "button",
  "reset btn text-font-size normal-text normal-border",
  "⟲",
  buttons
);
// ----- Minus Btn
export const minusBtn = createEl(
  "button",
  "minus btn text-font-size normal-text normal-border",
  "-",
  buttons
);

// ----- Mini Display To View Quest Countdown
export const miniDisplay = createEl(
  "div",
  "mini-display normal-text record-font-size",
  "0",
  buttons
);

// --- Info Panel
export const infoPanel = createEl("div", "info-panel flex", "", page);

// ---- Controls
export const controls = createEl("div", "controls flex flex-cc", "", infoPanel);

// ----- Button For Accessibility
export const btnContainerInfo = createEl(
  "button",
  "btn-container flex flex-cc",
  "",
  controls
);
// ------ Info
export const info = createEl("img", "info", "", btnContainerInfo);
info.setAttribute("src", "/assets/img/info.png");
info.setAttribute("alt", "Info icon");

// ----- Button For Accessibility
export const btnContainerVolume = createEl(
  "button",
  "btn-container flex flex-cc",
  "",
  controls
);
// ------ Volume
export const volume = createEl("img", "volume", "", btnContainerVolume);
volume.setAttribute("src", "/assets/img/volume-on.png");
volume.setAttribute("alt", "Volume icon");

// ---- Social
export const social = createEl("div", "social flex flex-cc", "", infoPanel);

// ----- Link
export const link = createEl("a", "flex flex-cc", "", social);
link.setAttribute("href", "https://github.com/nikthewik");
link.setAttribute("target", "_blank");
// ------ GitHub
export const github = createEl("img", "github", "", link);
github.setAttribute("src", "/assets/img/github.png");
github.setAttribute("alt", "Github icon");
// ----- Caption
export const cap = createEl(
  "p",
  "copyright-font-size normal-text",
  "by nikthewik.",
  social
);

// ---- Record Container
export const recordContainer = createEl("div", "flex flex-cc", "", infoPanel);

// ----- Record Image
export const recordImg = createEl("img", "record-img", "", recordContainer);
recordImg.setAttribute("src", "/assets/img/record.png");
recordImg.setAttribute("alt", "Medal icon");
// ----- Record Text
export const recordText = createEl(
  "p",
  "copyright-font-size normal-text",
  ":",
  recordContainer
);
// ----- Record
export const record = createEl(
  "div",
  "record record-font-size normal-text",
  "0",
  recordContainer
);

// --- Footer
export const footer = createEl(
  "footer",
  "copyright-font-size normal-text",
  "Copyright © 2023 Nicola Pavoni. All Rights Reserved.",
  page
);

// --- Info, Rules
export const infoRulesContainer = createEl(
  "div",
  "info-rules-container none",
  "",
  page
);

// ---- Button Container
export const containerCloseControl = createEl(
  "div",
  "flex",
  "",
  infoRulesContainer
);
// ----- Button For Accessibility
export const btnContainerCloseWindow = createEl(
  "button",
  "btn-container btn-container-close-window flex",
  "",
  containerCloseControl
);
// ------ Close Window Img
export const closeWindow = createEl(
  "img",
  "close-window",
  "",
  btnContainerCloseWindow
);
closeWindow.setAttribute("src", "/assets/img/close-window.png");

// ---- Rules
export const rules = createEl(
  "p",
  "quest-font-size normal-text",
  "Ciao, son Nik!",
  infoRulesContainer
);
// ---- Container Credits
export const creditsContainer = createEl(
  "div",
  "credits-container flex",
  "",
  infoRulesContainer
);
// ----- Icons Credits
export const iconsCredits = createEl(
  "p",
  "copyright-font-size normal-text",
  "Icons By",
  creditsContainer
);
// ----- Link To Icons8
export const icons8 = createEl(
  "a",
  "icons-8 copyright-font-size normal-text",
  "icons8.com.",
  creditsContainer
);
icons8.setAttribute("href", "https://www.icons8.com");
icons8.setAttribute("target", "_blank");

////////////////////////////////////////////////////////////////////////////////
