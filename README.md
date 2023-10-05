# enCounters

This is a project built for the JavaScript Basics exam on [start2impact University](https://www.start2impact.it/).
enCounters is a **space-themed mini game** that combines the dynamics of a **counter** to these of the **game of the goose**.

![enCounters preview](https://raw.githubusercontent.com/nikthewik/encounters/main/assets/img/encounters-preview.jpg)

## Table of Contents

- [Overview](#overview)
  - [The assignment](#the-assignment)
  - [Technologies used](#technologies-used)
  - [Link](#link)
- [My process](#my-process)
  - [Idea](#idea)
  - [Development](#development)
- [Soundtrack](#soundtrack)
- [Author](#author)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Overview

### The assignment

Creating a fully responsive counter, equipped with two +/- buttons to increase or decrease the counter value.

Another requirement is to use only JavaScript (no HTML tags in the body, no library or framework) for element creation and counter display management.

All additional features deemed necessary are allowed.

### Technologies used

- Semantic HTML
- CSS
- JS
- JS Modules
- Flexbox
- Responsive design
- Mobile-first workflow

### Link

- enCounters - [Click here](https://ntw-encounters.netlify.app/).

## My process

### Idea

I decided to create a space-themed mini game based on a counter and the game of the goose, driven by my passion for video games, the necessity to sharpen my skills in JavaScript, and the desire to make this project useful for others (and for me as well, as a portfolio).

The game is very simple. Every time the + button or the - button is pressed, there is a certain chance that an event will occur:

- The counter increases or decreases by 1, depending on the button pressed;
- A positive quest occurs, advancing the player by X light years;
- A negative quest occurs, causing the player to regress by X light years.

When the counter reaches 100, the player wins. If the counter reaches -100, he loses.

### Development

The first step was to write a JS function capable of generating elements based on specific arguments, automating the process and saving me from repetitive tasks.

As I created site elements, I took care of their style with CSS, using a **mobile-first** approach.

Finally, with JavaScript, I focussed on how the game's logic should work and on the various additional features.

After realising that I wrote 650+ lines of code, I thought it was appropriate to split the `main.js` file into three separate **modules**: `main.js`, `elements.js`, and `quests.js`. In this way the code is more orderly and maintainable.

## Soundtrack

I took an additional step by using GarageBand to compose the game's soundtrack. I aimed to capture a spatial ambiance that evoked the thrill of interstellar exploration.
You can listening to it by [clicking here](https://youtu.be/KEvKu-AnTsE).

![GarageBand screenshot](https://raw.githubusercontent.com/nikthewik/encounters/main/assets/img/garageband-preview.jpg)

## Author

- GitHub - [nikthewik](https://github.com/nikthewik)
- LinkedIn - [in/nikthewik](https://linkedin.com/in/nikthewik)

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

## Acknowledgments

- [Jonas Schmedtmann](https://www.udemy.com/course/the-complete-javascript-course/) - Hands down, the best JS instructor on Udemy from which I learned a lot;
- [ChatGPT](https://openai.com/blog/chatgpt) - An artificial intelligence chatbot (developed by OpenAI), which I mainly used to review some JavaScript code and to create some quests;
- [Stack Overflow](https://stackoverflow.com/) - A wonderful community where you can find a solution to every Front-End Development problem and not only.
