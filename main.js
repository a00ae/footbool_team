const container = document.getElementById("container");

// attacks
const attacks = ["Mohammed", "Yousef", "Ibrahim"];
const middle = ["Yaman", "Fajr", "Hassan"];

for (let i = 0; i < 8; i++) {
  const child = document.createElement("div");

  child.id = `child-${i}`;
  child.classList.add("child");
  container.appendChild(child);

  if (i % 2 == 0) {
    child.style.background = "#4caf50";
  }
}

// middle
for (let j = 0; j < attacks.length; j++) {
  const playerContainer = document.createElement("div");
  const pleyer = document.createElement("div");
  const pleyerName = document.createElement("span");
  const playerNumber= document.createElement("span");



//   player Number;

pleyer.appendChild(playerNumber);


// playerNumber.innerText = 10;






  playerContainer.appendChild(pleyer);
  playerContainer.appendChild(pleyerName);
  playerContainer.classList.add(`player-container-${attacks[j]}`);
  playerContainer.style.display = "flex";
  playerContainer.style.flexDirection = "column";
  playerContainer.style.alignItems = "center";
  playerContainer.style.gap = "10px";
  playerContainer.style.position = "absolute";
  document.getElementById("attacks").appendChild(playerContainer);
  pleyer.classList.add("player");
  pleyer.id = `player-${attacks[j]}`;

  pleyerName.innerText = attacks[j];
}

for (let x = 0; x < middle.length; x++) {

  const playerContainer = document.createElement("div");
  const pleyer = document.createElement("div");
  const pleyerName = document.createElement("span");

  playerContainer.appendChild(pleyer);
  playerContainer.appendChild(pleyerName);
  playerContainer.classList.add(`player-container-${middle[x]}`);
  console.log(middle[x])
  playerContainer.style.display = "flex";
  playerContainer.style.flexDirection = "column";
  playerContainer.style.alignItems = "center";
  playerContainer.style.gap = "10px";
  playerContainer.style.position = "absolute";
  document.getElementById("middle").appendChild(playerContainer);

  pleyer.classList.add("player");
  pleyer.id = `player-${middle[x]}`;

  pleyerName.innerText = middle[x];
}

// // ^ Yousef + 10;
// const yousef = document.createElement("div");
// const yousefName = document.createElement("span");
// yousef.id = "yousef";
// yousef.classList.add("yousef");
// yousefName.id = "yousef-name";
// yousefName.classList.add("yousef-name");

// document.getElementById("attacks").appendChild(yousef);
// document.getElementById("attacks").appendChild(yousefName);
// yousefName.innerText= "Yousef"

// // ^ Ibrahim

// const yousef = document.createElement("div");
// const yousefName = document.createElement("span");
// yousef.id = "yousef";
// yousef.classList.add("yousef");
// yousefName.id = "yousef-name";
// yousefName.classList.add("yousef-name");

// document.getElementById("attacks").appendChild(yousef);
// document.getElementById("attacks").appendChild(yousefName);
// yousefName.innerText= "Yousef"
