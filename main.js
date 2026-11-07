const container = document.getElementById("container");

// attacks
// const attacks = ["Mohammed", "Yousef", "Ibrahim"];
// const middle = ["Yaman", "Fajr", "Hassan"];


// الارضية
for (let i = 0; i < 20; i++) {
  const child = document.createElement("div");

  child.id = `child-${i}`;
  child.classList.add("child");
  container.appendChild(child);

  if (i % 2 == 0) {
    child.style.background = "#4caf50";
  }
}




















const team = {
  attacks: [
    {
      id: 1,
      number: 9,
      name: "Mohammed",
      position: "LW",
    },
    {
      id: 2,
      number: 7,
      name: "Yousef",
      position: "CF",
    },
    {
      id: 3,
      number: 11,
      name: "Ibrahim",
      position: "RW",
    },
  ],
  middle: [
    {
      id: 4,
      number: 5,
      name: "Yaman",
      position: "LB",
    },
    {
      id: 5,
      number: 8,
      name: "Fajr",
      position: "CM",
    },
    {
      id: 6,
      number: 4,
      name: "Hassan",
      position: "RB",
    },
  ],
};



// middle

const renderPlayres = (playerArray, containerId) => {
    // attacks, middle
  const parentContainer = document.getElementById(containerId);


  console.log(parentContainer);

  // Loop And Element
  playerArray.forEach((player) => {
// إنشاء عناصر لكل لاعب على حدة
        const playerContainer = document.createElement("div");
        const playerInner = document.createElement("div");
        const playerName = document.createElement("span");
        const playerNumber = document.createElement("span");

        // تعبئة البيانات
        playerNumber.innerText = player.number;
        playerName.innerText = player.name;

        playerInner.appendChild(playerNumber);
        playerContainer.appendChild(playerInner);
        playerContainer.appendChild(playerName);

        // التصميم والـ Classes الخاصة بحاوية هذا اللاعب فقط
        playerContainer.classList.add(`player-container-${player.name}`); // أو حسب ما تريده (مثلاً باسم اللاعب أو مركزه)
        playerContainer.style.display = "flex";
        playerContainer.style.flexDirection = "column";
        playerContainer.style.alignItems = "center";
        playerContainer.style.gap = "10px";
        playerContainer.style.position = "absolute";

        playerInner.classList.add("player");
        playerInner.id = `player-${player.name}`;

        // إضافته إلى الأب الرئيسي (attacks أو middle)
        parentContainer.appendChild(playerContainer);


  });
};

renderPlayres(team.attacks, "attacks");
renderPlayres(team.middle, "middle");











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
