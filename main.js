const container = document.getElementById("container");



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