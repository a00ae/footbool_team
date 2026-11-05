const container = document.getElementById("container");

// attacks
const attacks = ["Yousef", "Ibrahim", "Mohammed"];
// 

for(let i = 0; i < 8; i++ ) {
   const child = document.createElement("div");

   child.id = `child-${i}`
    child.classList.add("child")
   container.appendChild(child);

   if(i % 2 == 0 )
   {
    child.style.background = "#4caf50"
   }

}


for(let j = 0; j < attacks.length; j++)
{
    const playerContainer = document.createElement("div")
    const pleyer = document.createElement("div");
    const pleyerName = document.createElement("span");

    
    pleyer.id = `player-${attacks[j]}`;
    pleyer.classList.add(`player-${attacks[j]}`);
    playerContainer.appendChild(pleyer);
    playerContainer.appendChild(pleyerName)
    playerContainer.style.display = "flex";
    playerContainer.style.flexDirection ="column";
    playerContainer.style.gap = "10px";
    document.getElementById("attacks").appendChild(playerContainer);

    pleyerName.innerText = attacks[j];



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

