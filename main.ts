

type PlayerPosition = "LW" | "CF" | "RW" | "CM" | "LB" | "RB" | "ST";

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
}

// هيكل الفريقين
interface MatchData {
  myTeam: TeamLines;
  opponent: TeamLines;
}

// --- 2. إنشاء الأرضية (الملعب) ---
const pitchContainer = document.getElementById("container") as HTMLElement;

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
    let startX = 0,  startY = 0;
    let currentX = 0, currentY = 0;

    function startDrag(clientX: number, clientY: number): void {
        isDragging = true;
        startX = clientX - currentX;
        startY = clientY - currentY;
    };

    function onDrag(clientX: number, clientY: number): void {
        if(!isDragging) return;

        currentX = clientX - startX;
        currentY = clientY - startY;

        element.style.transform = `translate(${currentX}px, ${currentY}px)`;
    };

    function endDrag():void {
        isDragging = false;
    };
    

    // أحداث الماوس
    element.addEventListener("mousedown", (e: MouseEvent) => {
        startDrag(e.clientX, e.clientY);
        e.preventDefault();
    });

    document.addEventListener("mousemove", (e: MouseEvent) =>  {
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

    document.addEventListener("touchmove", (e:TouchEvent) => {
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
        ]
    },
    opponent: {
        attacks: [
            { id: 7, number: 10, name: "Player X", position: "ST" }
        ],
        middle: [
            { id: 8, number: 6, name: "Player Y", position: "CM" }
        ]
    }
};

const renderPlayers = (PlayerArray: Player[], containerId: string): void => {

    const parentContainer = document.getElementById(containerId);
    if(!parentContainer) return;

   // تفريغ الحاوية لمنع التكرار عند إعادة الرسم
    parentContainer.innerHTML = "";

    PlayerArray.forEach(player => {
        const playerContainer = document.createElement("div");
        const playerInner = document.createElement("div");
        const playerName = document.createElement("span");
        const playerNumber = document.createElement("span");

        playerNumber.innerText = player.number.toString();
        playerName.innerText = player.name;

        playerInner.appendChild(playerNumber);
        playerContainer.appendChild(playerInner);
        playerContainer.appendChild(playerName);

        const formattedName = player.name.replace(/\s+/g, '-');
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



   
}


// الرسم الأولي
renderPlayers(matchData.myTeam.attacks, "attacks");
renderPlayers(matchData.myTeam.middle, "middle");


// --- 6. دالة إضافة لاعب جديد ---
const addNewPlayer = (teamName:  keyof MatchData, lineName: keyof TeamLines, newPlayer: Player):void => {
    matchData[teamName][lineName].push(newPlayer);
    console.log("تمت اضافة اللاعب بنجاح");
};


// --- 7. ربط الزر وتحميل الصفحة ---
document.addEventListener("DOMContentLoaded", () => {

    const addBtn = document.getElementById("add-my-attacker-btn");

    if(addBtn)
    {
        addBtn.addEventListener("click", () => {
            console.log("ok - تم النقر بنجاح");

            const newPlayer: Player = {
                id: Math.random(),
                number: 99,
                name: "new Striker",
                position: "ST",
            };

            addNewPlayer("myTeam", "attacks", newPlayer);
            renderPlayers(matchData.myTeam.attacks, "attacks");
        });
    }
    else {
        console.error("خطأ: لم يتم العثور على الزر!");
    }


});


