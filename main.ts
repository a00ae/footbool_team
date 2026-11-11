type PlayerPosition = "GK" | "LW" | "CF" | "RW" | "CM" | "LB" | "RB" | "ST";

// بطاقة اللاعب
interface Player {
  id: number;
  number: number;
  name: string;
  position: PlayerPosition;
}
// هيكل كل طاقم
interface TeamLines {
  attacks: Player[];
  middle: Player[];
  goalkeeping: Player[];
}

// هيكل الفريقين
interface MatchData {
  myTeam: TeamLines;
  opponent: TeamLines;
}


// --- تحديث نموذج البيانات (Interfaces) ---
type TeamSide = "myTeam" | "opponent";
type LineType = "attacks" | "middle";

interface NewPlayerInput {
    name: string;
    number: number;
    position: PlayerPosition;
    color: string;
    team: TeamSide;
    line: LineType;
}

const teamColors = {
    myTeam: "#3b82f6",  // اللون الافتراضي لفريقنا (أزرق)
    opponent: "#ef4444" // اللون الافتراضي للخصم (أحمر)
};



// 1. جلب العناصر من الـ DOM
const form = document.getElementById("add-player-form") as HTMLFormElement;
const pitchContainer = document.getElementById("container") as HTMLElement;
const dailogMenu = document.querySelector(".dailog-menu") as HTMLElement;
const openBtn = document.getElementById("add-my-attacker-btn");
const closeDailog = document.querySelector(".close") as HTMLElement;
// const modal = document.getElementById("add-player-modal") as HTMLDialogElement;

// 2. التحقق من وجود الفورم لضمان عدم حدوث أخطاء
if (form && dailogMenu) {
    // 3. هنا يتم النداء على الدالة عند الضغط على زر الإضافة (Submit)
    form.addEventListener("submit", (e: SubmitEvent) => {
        handlePlayerFormSubmit(e, dailogMenu);
    });
};


// ---  التحقق من الحد الأدنى والأقصى لعدد اللاعبين ---
const validateTeamCapacity = (teamName: TeamSide): boolean => {
    const totalPlayers = matchData[teamName].attacks.length + matchData[teamName].middle.length + matchData[teamName].goalkeeping.length;

    if(totalPlayers >= 11){
        alert("opps not alloe");
        return false;
    }
    return true;

}

// -- دالة للتحقق مما إذا كان رقم القميص محجوزاً مسبقاً داخل نفس الفريق
const isNumberTaken = (teamName: TeamSide, shirtNumber: number): boolean => {
    const team = matchData[teamName];
    
    // تجميع كل لاعبي الفريق الحالي (هجوم، وسط، حراسة) في مصفوفة واحدة
    const allTeamPlayers = [
        ...team.attacks,
        ...team.middle,
        ...team.goalkeeping
    ];

    // التحقق مما إذا كان الرقم موجوداً مسبقاً
    return allTeamPlayers.some(player => player.number === shirtNumber);
};




//  إرسال النموذج والتحقق من الشروط ---
const handlePlayerFormSubmit = (e: SubmitEvent, modal: HTMLElement): void => {
    e.preventDefault();

    const inputName = (document.getElementById("player-name") as HTMLInputElement).value;
    const inputNumber = parseInt((document.getElementById("player-number") as HTMLInputElement).value, 10);
    const inputPosition = (document.getElementById("player-position") as HTMLSelectElement).value as PlayerPosition;
    const inputColor = (document.getElementById("jersey-color") as HTMLInputElement).value;
    const selectedTeam = (document.getElementById("player-team") as HTMLSelectElement).value as TeamSide;
    const selectedLine = (document.getElementById("player-line") as HTMLSelectElement).value as LineType;

    // 1. التحقق من النطاق الصحيح لرقم القميص (من 1 إلى 99)
    if (inputNumber < 1 || inputNumber > 99) {
        alert("رقم القميص يجب أن يكون بين 1 و 99 حصراً!");
        return;
    }

    // 2. التحقق من الحد الأقصى لعدد اللاعبين (11 لاعب)
    if (!validateTeamCapacity(selectedTeam)) {
        return;
    }

    // 3. (القاعدة الجديدة) التحقق مما إذا كان الرقم محجوزاً مسبقاً لفلاعب آخر في نفس الفريق
    if (isNumberTaken(selectedTeam, inputNumber)) {
        alert(`عذراً، رقم القميص (${inputNumber}) محجوز مسبقاً للاعب آخر في هذا الفريق! يرجى اختيار رقم مختلف.`);
        return;
    }

    // 4. منع تكرار لون القميص بين الفريقين
    const oppositeTeam: TeamSide = selectedTeam === "myTeam" ? "opponent" : "myTeam";
    if (inputColor.toLowerCase() === teamColors[oppositeTeam].toLowerCase()) {
        alert("عذراً، هذا اللون مستخدم بالفعل من قبل الفريق الآخر! يرجى اختيار لون مختلف.");
        return;
    }

    // حفظ اللون للفريق الحالي
    teamColors[selectedTeam] = inputColor;

    // 5. إنشاء كائن اللاعب الجديد وإضافته
    const newPlayer: Player = {
        id: Math.random(),
        name: inputName,
        number: inputNumber,
        position: inputPosition
    };

    addNewPlayer(selectedTeam, selectedLine, newPlayer);
    renderPlayers(matchData[selectedTeam][selectedLine], `${selectedTeam}-${selectedLine}`);

    // إغلاق النافذة وإعادة تعيين النموذج
    modal.classList.remove("active");
    (document.getElementById("add-player-form") as HTMLFormElement).reset();
};
 







// Add Dailog Mode
let mode = "Add";

// const addingGrassToTheFiled = (grass: number): void => {
//   for (let i = 0; i < grass; i++) {
//     const child = document.createElement("div");
//     child.id = `child-${i}`;
//     child.classList.add("child");
//     pitchContainer.appendChild(child);

//     if (i % 2 == 0) child.style.background = "#4caf50";
//   }
// };

// addingGrassToTheFiled(22);

// --- 3. دالة السحب والإفلات (مع تحديد أنواع بيانات العناصر) ---
const makeDraggable = (element: HTMLElement): void => {
  let isDragging = false;
  let startX = 0,
    startY = 0;
  let currentX = 0,
    currentY = 0;

  function startDrag(clientX: number, clientY: number): void {
    isDragging = true;
    startX = clientX - currentX;
    startY = clientY - currentY;
  }

  function onDrag(clientX: number, clientY: number): void {
    if (!isDragging) return;

    currentX = clientX - startX;
    currentY = clientY - startY;

    element.style.transform = `translate(${currentX}px, ${currentY}px)`;
  }

  function endDrag(): void {
    isDragging = false;
  }

  // أحداث الماوس
  element.addEventListener("mousedown", (e: MouseEvent) => {
    startDrag(e.clientX, e.clientY);
    e.preventDefault();
  });

  document.addEventListener("mousemove", (e: MouseEvent) => {
    onDrag(e.clientX, e.clientY);
  });

  document.addEventListener("mouseup", () => {
    endDrag();
  });

  // أحداث اللمس
  element.addEventListener("touchstart", (e: TouchEvent) => {
    startDrag(e.touches[0].clientX, e.touches[0].clientY);
    e.preventDefault();
  });

  document.addEventListener("touchmove", (e: TouchEvent) => {
    onDrag(e.touches[0].clientX, e.touches[0].clientY);
  });

  document.addEventListener("touchend", () => {
    endDrag();
  });
};

// --- 4. هيكل البيانات الأساسي للمباراة ---

const matchData: MatchData = {
  myTeam: {
    attacks: [
      { id: 1, number: 7, name: "Mohammed", position: "LW" },
      { id: 2, number: 10, name: "Yousef", position: "CF" },
      { id: 3, number: 11, name: "Ibrahim", position: "RW" },
    ],
    middle: [
      { id: 4, number: 5, name: "Yaman", position: "LB" },
      { id: 5, number: 8, name: "Fajr", position: "CM" },
      { id: 6, number: 4, name: "Hassan", position: "RB" },
    ],
    goalkeeping: [
        {id: 7, number: 25, name: "Abo", position: "GK"}
    ]
  },
  opponent: {
    attacks: [{ id: 7, number: 10, name: "Player X", position: "ST" }],
    middle: [{ id: 8, number: 6, name: "Player Y", position: "CM" }],
    goalkeeping: [{id: 20, number: 1, name: "Player GK", position: "GK"}]
  },
};

const renderPlayers = (PlayerArray: Player[], containerId: string): void => {
    console.log(containerId)
  const parentContainer = document.getElementById(containerId);
  if (!parentContainer) return;

  // تفريغ الحاوية لمنع التكرار عند إعادة الرسم
  parentContainer.innerHTML = "";

  PlayerArray.forEach((player) => {
    const playerContainer = document.createElement("div");
    const playerInner = document.createElement("div");
    const playerName = document.createElement("span");
    const playerNumber = document.createElement("span");

    playerNumber.innerText = player.number.toString();
    playerName.innerText = player.name;

    playerInner.appendChild(playerNumber);
    playerContainer.appendChild(playerInner);
    playerContainer.appendChild(playerName);

    const formattedName = player.name.replace(/\s+/g, "-");
    playerContainer.classList.add(`player-container-${formattedName}`);
    playerContainer.style.display = "flex";
    playerContainer.style.flexDirection = "column";
    playerContainer.style.alignItems = "center";
    playerContainer.style.justifyContent = "center";
    playerContainer.style.gap = "10px";
    playerContainer.style.position = "absolute";
    playerContainer.style.width = "80px";
    playerContainer.style.height = "80px";
    playerContainer.style.zIndex = "10";
    playerContainer.style.cursor = "pointer";

    playerInner.classList.add("player");
    playerInner.id = `player-${player.name}`;


    parentContainer.appendChild(playerContainer);
    makeDraggable(playerContainer);
  });
};

// الرسم الأولي
renderPlayers(matchData.myTeam.attacks, "attacks");
renderPlayers(matchData.myTeam.middle, "middle");
renderPlayers(matchData.myTeam.goalkeeping, "goalkeeping");

// --- 6. دالة إضافة لاعب جديد ---
const addNewPlayer = (
  teamName: keyof MatchData,
  lineName: keyof TeamLines,
  newPlayer: Player,
): void => {
  matchData[teamName][lineName].push(newPlayer);
  console.log("تمت اضافة اللاعب بنجاح");
};

// --- 7. ربط الزر وتحميل الصفحة ---
document.addEventListener("DOMContentLoaded", () => {
  if (openBtn) {
    openBtn.addEventListener("click", () => {
      console.log("ok - تم النقر بنجاح");
      dailogMenu.classList.toggle("active");
      mode = "Add";
      const addButton = document.getElementById("add");
      if (addButton) addButton.innerText = "Add New Player";



      // const newPlayer: Player = {
      //     id: Math.random(),
      //     number: 99,
      //     name: "new Striker",
      //     position: "ST",
      // };

      // addNewPlayer("myTeam", "attacks", newPlayer);
      // renderPlayers(matchData.myTeam.attacks, "attacks");
    });
  } else {
    console.error("خطأ: لم يتم العثور على الزر!");
  }
});

// --- 8. اغلاق النافذة المنبثقة  ---

window.addEventListener("mousedown", (e: MouseEvent) => {
  const target = e.target as Node;

  if (
    dailogMenu &&
    !dailogMenu.contains(target) &&
    openBtn &&
    !openBtn.contains(target)
  ) {
    dailogMenu.classList.remove("active");
  }
});

// اغلاق الناذة من خلال النقر على زر ❌
closeDailog.onclick = () => {
    dailogMenu.classList.remove("active");
}