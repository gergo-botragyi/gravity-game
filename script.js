const container = vaszon.getBoundingClientRect();
let counter;
let hs = 0;
let dif = "Easy";
let directions = [-1,1];

// SZIMULÁCIÓHOZ HASZNÁLT VÁLTOZÓK DEKLARÁCIÓJA

let galaxis = new Galaxis("Kistejút")
let napocska;

function inicializalas(){
    let xdir = directions[Math.floor(Math.random()*directions.length)];
    let ydir = directions[Math.floor(Math.random()*directions.length)];
    napocska = new Egitest("Nap", 100, new Vektor(container.width/2, container.height/2), new Vektor(xdir, ydir), "#FF0000", "#000000", galaxis);
    vaszon.appendChild(napocska.svgobject);
}

function szimulacios_lepes(){
    Egitest.gravitacios_kolcsonhatas(galaxis.egitestei);
    console.log(galaxis.egitestei)
    counter++;
    score.innerHTML = counter;
    for (const egitest of galaxis.egitestei) {
        egitest.mozogj();       
        if(egitest.p.y < 0 || egitest.p.y>container.height || egitest.p.x < 0 || egitest.p.x > container.width){
            egitest.torol();
            if(egitest.nev == "Nap")
            {
                animationStop();
            }
        }
    }
}



// --------------------------------- Motorháztető alatt -----------------------------------------------

let globalID;
let running = false;


function update() {
    if(running){
        szimulacios_lepes();
        globalID = requestAnimationFrame(update);
    }
}

help.addEventListener("click", ()=>{window.alert("A játék célja, hogy a piros bolygót a zöld körvonallal jelölt területen belül minél tovább kell bent tartani más bolygók gravitációja segítségével!");})

startbtn.addEventListener("click", start);
dropbtn.addEventListener("click", ()=>{list.style.display = "flex"; list.style.flexDirection = "row";})
easy.addEventListener("click", difficulty);
easy.diff = "Easy"
medium.addEventListener("click", difficulty);
medium.diff = "Medium"
hard.addEventListener("click", difficulty);
hard.diff = "Hard"

function difficulty(evt){
    dropbtn.innerHTML = evt.currentTarget.diff;
    dif = evt.currentTarget.diff;
    list.style.display = "none";
}

function start(){
    if(!running){
        floater.style.display = "none";
        floater.style.zIndex = "-100";
        vaszon.style.pointerEvents = "auto";        
        inicializalas();
        animationStart()
    }
}

function animationStart() {
    if (!running) {
        globalID = requestAnimationFrame(update);
        running = true;      
        counter = 0;        
    }
}

function animationStop() {
    if (running) {
        cancelAnimationFrame(globalID);
        running = false;
        deleteEverything();
        if(hs<counter){hs=counter; highScore.innerHTML = hs}
        finalscore.innerHTML = counter;
        counter = 0;
        floater.style.display = "flex"
        floater.style.zIndex = "100";
        vaszon.style.pointerEvents = "none";         
    }
}

function deleteEverything(){
    for (const egitest of [...galaxis.egitestei]) {
        egitest.torol();
    } 
}

vaszon.addEventListener("mousedown", bolygo_letevese, false);

function bolygo_letevese(evt) {
    let cursorpt = cursorPoint(evt);
    let p = new Vektor(cursorpt.x, cursorpt.y);
    let v = new Vektor(parseFloat(0.1), parseFloat(0.1));   
    let tomeg = 50;
    switch (dif) {
        case "Easy":
            tomeg = 50;
            break;
        case "Medium":
            tomeg = "25";
            break;
        case "Hard":
            tomeg="5";
            break;
    }
    let bolygocska = new Egitest("Hold"+galaxis.egitestei.length, parseFloat(tomeg), p, v, "#5f5f5f", "#000000", galaxis);
    vaszon.appendChild(bolygocska.svgobject);
}
    
function cursorPoint(evt) {
    let pt = vaszon.createSVGPoint();
    pt.x = evt.clientX; 
    pt.y = evt.clientY;     
    return pt.matrixTransform(vaszon.getScreenCTM().inverse());
}
