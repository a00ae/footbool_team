import { matchData, PLAYER_POSITIONS } from "./data/data.js";
import {
  PositionOption,
  LineType,
  MatchData,
  NewPlayerInput,
  Player,
  PlayerPosition,
  PositionColor,
  TeamLines,
  TeamSide,
} from "./types/index.js";

const teamColors = {
  myTeam: "#3b82f6", // اللون الافتراضي لفريقنا (أزرق)
  opponent: "#ef4444", // اللون الافتراضي للخصم (أحمر)
};

// 1. جلب العناصر من الـ DOM
const form = document.getElementById("add-player-form") as HTMLFormElement;
const pitchContainer = document.getElementById("container") as HTMLElement;
const dailogMenu = document.querySelector(".dailog-menu") as HTMLElement;
const openBtn = document.getElementById("add-my-attacker-btn");
const closeDailog = document.querySelector(".close") as HTMLElement;
// const modal = document.getElementById("add-player-modal") as HTMLDialogElement;
const inputBox = document.querySelector(".input-box") as HTMLElement;
const inputName = document.getElementById("player-name") as HTMLInputElement;
const clearInput = document.querySelector(".clear-input") as HTMLElement;
const countNum = document.getElementById("count-num") as HTMLElement;
const playerNumberInput = document.getElementById(
  "player-number",
) as HTMLInputElement;
const inputPosition = document.getElementById(
  "player-position",
) as HTMLSelectElement;
const dropDown = document.getElementById("drop-down") as HTMLElement;
const maxLength = 15; // الحد المسموح به

playerNumberInput?.addEventListener("input", () => {
  let value = playerNumberInput.value;

  if (value.length > 2) {
    playerNumberInput.value = value.slice(0, 2);
  }

  const numericValue = parseInt(value);
  if (numericValue > 99) {
    playerNumberInput.value = "99";
  }

  if (numericValue < 0) {
    playerNumberInput.value = "1";
  }
});

if (inputName && countNum && clearInput) {
  inputName.addEventListener("input", () => {
    clearInput.classList.add("active");
    const currentLength = inputName.value.trim().length;
    const remainingChars = maxLength - currentLength;
    countNum.textContent = remainingChars.toString();

    if (remainingChars <= 3) {
      countNum.style.color = "#ef4444";
      if (remainingChars === 0) {
        inputBox.style.borderColor = "#ef4444";
      } else {
        inputBox.style.borderColor = "";
      }
    } else {
      countNum.style.color = "";
    }
  });

  clearInput.addEventListener("click", () => {
    inputName.value = "";
    countNum.textContent = "";
    inputBox.style.borderColor = "";
    clearInput.classList.remove("active");
  });
}

inputPosition?.addEventListener("click", () => {
  dropDown.classList.toggle("visible");
});

function renderPositionOptions(
  listElement: HTMLElement,
  positions: PositionOption[],
  selectedValue = "ST",
): void {
  listElement.innerHTML = "";

  positions.forEach((pos) => {
    const isSelected = pos.value === selectedValue;

    const li = document.createElement("li");
    li.className = isSelected
      ? "dropdown-option is-selected"
      : "dropdown-option";
    li.setAttribute("role", "option");
    li.setAttribute("aria-selected", String(isSelected));
    li.dataset.value = pos.value;
    li.dataset.title = pos.title;
    li.dataset.subtitle = pos.subtitle;
    li.dataset.badge = pos.badge;
    li.dataset.color = pos.color;

    li.innerHTML = `
      <div class="option-info">
        <span class="option-badge">${pos.badge}</span>
        <div class="option-details">
          <span class="option-title">${pos.title}</span>
          <span class="option-subtitle">${pos.subtitle}</span>
        </div>
      </div>
      <i class="ri-check-line selected-check"></i>
    `;

    listElement.appendChild(li);
  });
}

const dropdownList = document.getElementById("dropdown-menu-list");
if (dropdownList) {
  renderPositionOptions(dropdownList, PLAYER_POSITIONS, "ST");
}

// 2. التحقق من وجود الفورم لضمان عدم حدوث أخطاء
if (form && dailogMenu) {
  // 3. هنا يتم النداء على الدالة عند الضغط على زر الإضافة (Submit)
  form.addEventListener("submit", (e: SubmitEvent) => {
    handlePlayerFormSubmit(e, dailogMenu);
  });
}

// ---  التحقق من الحد الأدنى والأقصى لعدد اللاعبين ---
const validateTeamCapacity = (teamName: TeamSide): boolean => {
  const totalPlayers =
    matchData[teamName].attacks.length +
    matchData[teamName].middle.length +
    matchData[teamName].goalkeeping.length;

  if (totalPlayers >= 11) {
    alert("opps not alloe");
    return false;
  }
  return true;
};

// -- دالة للتحقق مما إذا كان رقم القميص محجوزاً مسبقاً داخل نفس الفريق
const isNumberTaken = (teamName: TeamSide, shirtNumber: number): boolean => {
  const team = matchData[teamName];

  // تجميع كل لاعبي الفريق الحالي (هجوم، وسط، حراسة) في مصفوفة واحدة
  const allTeamPlayers = [...team.attacks, ...team.middle, ...team.goalkeeping];

  // التحقق مما إذا كان الرقم موجوداً مسبقاً
  return allTeamPlayers.some((player) => player.number === shirtNumber);
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

const renderPlayers = (PlayerArray: Player[], containerId: string): void => {
  console.log(containerId);
  const parentContainer = document.getElementById(containerId);
  if (!parentContainer) return;

  // تفريغ الحاوية لمنع التكرار عند إعادة الرسم
  parentContainer.innerHTML = "";

  PlayerArray.forEach((player) => {
    const playerContainer = document.createElement("div");
    const formattedName = player.name.replace(/\s+/g, "-");
    playerContainer.classList.add(`player-container-${formattedName}`);

    let foot = player.foot === "R" ? "Rehit Football" : "Left Football";


    playerContainer.innerHTML += `
    <div class="player-center">
      <div class="raiting-box">
        <span class="raiting">${player.rating}</span>
        <span>${player.position}</span> 
    
      </div>
        <div class="position-box">
          <div class="foot">
            <svg class="svg-football" style="color: var(--card-accent);" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1.5a2.5 2.5 0 0 0-2.1-2.47l-4.4-.73a3 3 0 0 1-2.1-1.46L9.5 8.5A2 2 0 0 0 7.7 7.5H6a2 2 0 0 0-2 2V16Z"/>
                <path d="M8 20v-2M12 20v-2M16 20v-2"/>
            </svg> 

            <!-- شارة القدم المفضلة -->
            <span > ${player.foot} </span>

          </div>
          <p>${foot} </p>
        </div>
      </div>
    `;


    const stylePlayer: Partial<CSSStyleDeclaration> = {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      position: "absolute",
      width: "180px",
      height: "110px",
      zIndex: "10",
      cursor: "pointer",
      borderRadius: "10px",
      backgroundColor: "var(--bg-card)"
    };






    Object.assign(playerContainer.style, stylePlayer);


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
      const addTitle = document.getElementById("add-title");
      const addDesc = document.getElementById("add-desc");
      if (addTitle && addDesc) {
        addTitle.innerText = "Add New Player";
        addDesc.innerText = "Add-on Options Section";
      }
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

//  إرسال النموذج والتحقق من الشروط ---
const handlePlayerFormSubmit = (e: SubmitEvent, modal: HTMLElement): void => {
  e.preventDefault();

  // const inputName = (document.getElementById("player-name") as HTMLInputElement);
  const inputNumber = parseInt(
    (document.getElementById("player-number") as HTMLInputElement).value,
    10,
  );

  const inputColor = (
    document.getElementById("jersey-color") as HTMLInputElement
  ).value;
  const selectedTeam = (
    document.getElementById("player-team") as HTMLSelectElement
  ).value as TeamSide;
  const selectedLine = (
    document.getElementById("player-line") as HTMLSelectElement
  ).value as LineType;

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
    alert(
      `عذراً، رقم القميص (${inputNumber}) محجوز مسبقاً للاعب آخر في هذا الفريق! يرجى اختيار رقم مختلف.`,
    );
    return;
  }

  // 4. منع تكرار لون القميص بين الفريقين
  const oppositeTeam: TeamSide =
    selectedTeam === "myTeam" ? "opponent" : "myTeam";
  if (inputColor.toLowerCase() === teamColors[oppositeTeam].toLowerCase()) {
    alert(
      "عذراً، هذا اللون مستخدم بالفعل من قبل الفريق الآخر! يرجى اختيار لون مختلف.",
    );
    return;
  }

  // حفظ اللون للفريق الحالي
  teamColors[selectedTeam] = inputColor;

  // 5. إنشاء كائن اللاعب الجديد وإضافته
  const newPlayer: Player = {
    id: Math.random(),
    name: inputName.value,
    number: inputNumber,
    position: inputPosition.value as PlayerPosition,
    rating: 99..toString(),
    foot: "R",
  };

  addNewPlayer(selectedTeam, selectedLine, newPlayer);
  renderPlayers(
    matchData[selectedTeam][selectedLine],
    `${selectedTeam}-${selectedLine}`,
  );

  // إغلاق النافذة وإعادة تعيين النموذج
  modal.classList.remove("active");
  (document.getElementById("add-player-form") as HTMLFormElement).reset();
};
