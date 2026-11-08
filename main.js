const container = document.getElementById("container");

// الارضية
for (let i = 0; i < 22; i++) {
  const child = document.createElement("div");

  child.id = `child-${i}`;
  child.classList.add("child");
  container.appendChild(child);

  if (i % 2 == 0) {
    child.style.background = "#4caf50";
  }
}


function makeDraggable(element) {
    let isDragging = false;
    let startX, startY;
    let currentX = 0;
    let currentY = 0;

    // --- 1. بدء السحب (الماوس + اللمس) ---
    function startDrag(clientX, clientY) {
        isDragging = true;
        startX = clientX - currentX;
        startY = clientY - currentY;
    }

    // --- 2. أثناء الحركة (الماوس + اللمس) ---
    function onDrag(clientX, clientY) {
        if (!isDragging) return;
        
        currentX = clientX - startX;
        currentY = clientY - startY;

        // التحريك باستخدام الـ GPU لأفضل أداء
        element.style.transform = `translate(${currentX}px, ${currentY}px)`;
    }

    // --- 3. إيقاف السحب (الماوس + اللمس) ---
    function endDrag() {
        isDragging = false;
    }

    // --- أحداث الماوس (للكمبيوتر) ---
    element.addEventListener("mousedown", (e) => {
        startDrag(e.clientX, e.clientY);
        e.preventDefault(); // لمنع السلوك الافتراضي لتحديد النص
    });

    document.addEventListener("mousemove", (e) => {
        onDrag(e.clientX, e.clientY);
    });

    document.addEventListener("mouseup", () => {
        endDrag();
    });

    // --- أحداث اللمس (للهواتف والأجهزة اللوحية) ---
    element.addEventListener("touchstart", (e) => {
        startDrag(e.touches[0].clientX, e.touches[0].clientY);
        e.preventDefault();
    });

    document.addEventListener("touchmove", (e) => {
        onDrag(e.touches[0].clientX, e.touches[0].clientY);
    });

    document.addEventListener("touchend", () => {
        endDrag();
    });
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
    playerContainer.style.justifyContent = "center";
    playerContainer.style.gap = "10px";
    playerContainer.style.position = "absolute";
    playerContainer.style.width = "80px";
    playerContainer.style.height = "80px";
    playerContainer.style.zIndex = "10";
    playerContainer.style.cursor = "pointer"



    

    playerInner.classList.add("player");
    playerInner.id = `player-${player.name}`;

    // إضافته إلى الأب الرئيسي (attacks أو middle)
    parentContainer.appendChild(playerContainer);

    makeDraggable(playerContainer);
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
