let bar = document.getElementById("about_timeline_highlight");

let tileList = document.getElementsByClassName("about_timeline_grid_tile");
let eventList = document.getElementsByClassName("about_timeline_event");

const next = (i, max) => {
    i >= max ? i = 0 : i++;
}

const switchEvent = (i) => {
    if(i == 0){
        // bar.style.left = tileList[0].offsetLeft - 3 + "px";
        // bar.style.width = tileList[0].offsetWidth + 9 + "px";
        return;
    }

    if(i == eventList.length-1){
        // bar.style.left = tileList[0].offsetLeft - 3 + "px";
        // bar.style.width = tileList[eventList.length-1].offsetWidth + tileList[eventList.length-1].offsetLeft + 9 + "px";
        return;
    }

    // bar.style.left = tileList[0].offsetLeft - 3 + "px";
    // bar.style.width = tileList[i].offsetWidth + tileList[i].offsetLeft - tileList[0].offsetLeft + 9 + "px";
    return;
}

for(let i = 1; i < eventList.length-1; i++){
    eventList[i].addEventListener("mouseover", () => switchEvent(i));
}