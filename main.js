// --- 2. إنشاء الأرضية (الملعب) ---
var pitchContainer = document.getElementById("container");
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
var makeDraggable = function (element) {
    var isDragging = false;
    var startX = 0, startY = 0;
    var currentX = 0, currentY = 0;
    function startDrag(clientX, clientY) {
        isDragging = true;
        startX = clientX - currentX;
        startY = clientY - currentY;
    }
    ;
    function onDrag(clientX, clientY) {
        if (!isDragging)
            return;
        currentX = clientX - startX;
        currentY = clientY - startY;
        element.style.transform = "translate(".concat(currentX, "px, ").concat(currentY, "px)");
    }
    ;
    function endDrag() {
        isDragging = false;
    }
    ;
    // أحداث الماوس
    element.addEventListener("mousedown", function (e) {
        startDrag(e.clientX, e.clientY);
        e.preventDefault();
    });
    document.addEventListener("mousemove", function (e) {
        onDrag(e.clientX, e.clientY);
    });
    document.addEventListener("mouseup", function () {
        endDrag();
    });
    // أحداث اللمس
    element.addEventListener("touchstart", function (e) {
        startDrag(e.touches[0].clientX, e.touches[0].clientY);
        e.preventDefault();
    });
    document.addEventListener("touchmove", function (e) {
        onDrag(e.touches[0].clientX, e.touches[0].clientY);
    });
    document.addEventListener("touchend", function () {
        endDrag();
    });
};
// --- 4. هيكل البيانات الأساسي للمباراة ---
var matchData = {
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
var renderPlayers = function (PlayerArray, containerId) {
    var parentContainer = document.getElementById(containerId);
    if (!parentContainer)
        return;
    // تفريغ الحاوية لمنع التكرار عند إعادة الرسم
    parentContainer.innerHTML = "";
    PlayerArray.forEach(function (player) {
        var playerContainer = document.createElement("div");
        var playerInner = document.createElement("div");
        var playerName = document.createElement("span");
        var playerNumber = document.createElement("span");
        playerNumber.innerText = player.number.toString();
        playerName.innerText = player.name;
        playerInner.appendChild(playerNumber);
        playerContainer.appendChild(playerInner);
        playerContainer.appendChild(playerName);
        var formattedName = player.name.replace(/\s+/g, '-');
        playerContainer.classList.add("player-container-".concat(formattedName));
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
        playerInner.id = "player-".concat(player.name);
        parentContainer.appendChild(playerContainer);
        makeDraggable(playerContainer);
    });
};
// الرسم الأولي
renderPlayers(matchData.myTeam.attacks, "attacks");
renderPlayers(matchData.myTeam.middle, "middle");
// --- 6. دالة إضافة لاعب جديد ---
var addNewPlayer = function (teamName, lineName, newPlayer) {
    matchData[teamName][lineName].push(newPlayer);
    console.log("تمت اضافة اللاعب بنجاح");
};
// --- 7. ربط الزر وتحميل الصفحة ---
document.addEventListener("DOMContentLoaded", function () {
    var addBtn = document.getElementById("add-my-attacker-btn");
    if (addBtn) {
        addBtn.addEventListener("click",  ()=> {
            console.log("تم النقر بنجاح");
        })
    }
    else {
        console.error("خطأ: لم يتم العثور على الزر!");
    }
});
