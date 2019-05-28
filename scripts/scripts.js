const colours = [
  "red",
  "green",
  "blue",
  "skyblue",
  "greenyellow",
  "violet",
  "orange",
  "yellow",
  "rebeccapurple"
];
const colLength = colours.length;
const arr = new Array();
const fstTime = new Date().getTime();
const cards = [...document.querySelectorAll("div")];
let deliveredColour;
const match = e => {
  const that = e.target;
  that.classList.remove("hidden");
  if (that.className === deliveredColour) {
    arr.push(deliveredColour);
    cards.forEach(card => {
      card.removeEventListener("click", match);
      setTimeout(e => {
        if (
          !card.classList.contains("hidden") &&
          !card.classList.contains("off")
        )
          card.classList.add("off");
        card.addEventListener("click", taken);
      }, 200);
    });
    if (colLength === arr.length)
      return setTimeout(() => {
        const sndTime = new Date().getTime();
        const time = (sndTime - fstTime) / 1000;
        alert(`You won! Your time is: ${time} seconds.`);
        location.reload();
      }, 250);
  } else {
    cards.forEach(card => {
      card.removeEventListener("click", match);
      setTimeout(e => {
        if (
          !card.classList.contains("hidden") &&
          !card.classList.contains("off")
        )
          card.classList.add("hidden");
        card.addEventListener("click", taken);
      }, 200);
    });
  }
  deliveredColour = null;
};
const taken = e => {
  that = e.target;
  that.classList.remove("hidden");
  deliveredColour = that.className;
  cards.forEach(card => {
    card.removeEventListener("click", taken);
    if (card !== that) card.addEventListener("click", match);
  });
};
const init = () => {
  const arr = [];
  cards.forEach(card => {
    const index = Math.floor(Math.random() * colours.length);
    const color = colours[index];
    if (arr.includes(color)) colours.splice(index, 1);
    else arr.push(color);
    card.classList.add(color);
  });
  cards.forEach(card => {
    setTimeout(() => {
      card.classList.add("hidden");
      card.addEventListener("click", taken);
    }, 2000);
  });
};

init();
