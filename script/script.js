const inputBox = document.getElementById("input-box");
const uncheckedList = document.getElementById("unchecked-list");
const checkedList = document.getElementById("checked-list");
var levelElement = document.querySelector('.level');

var level = 0;
var clearedTasks = 0;
var requiredTasks = 2;
var progress = 0;

function changeTitle(element) {
    var input = document.createElement('input');
    input.type = 'text';
    input.value = element.innerText;
    input.classList.add('editable-input');

    element.parentNode.replaceChild(input, element);

    input.focus();

    input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            saveTitle(input.value); 
            element.innerText = input.value;
            input.blur(); 

            loadTitle();
        }
    });

    input.addEventListener('blur', function() {
        saveTitle(input.value);
        element.innerText = input.value;
        loadTitle();
    });
}


function saveTitle(title) {
    localStorage.setItem("pageTitle", title);
}

function loadTitle() {
    var title = localStorage.getItem("pageTitle");
    if (title) {
        document.getElementById("todo-header").innerText = title;
    }
}

loadTitle();

function addTask() {
    if (inputBox.value === '') {
        alert("Bitte gib etwas ein!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        if (li.classList.contains("checked")) {
            checkedList.appendChild(li);
        } else {
            uncheckedList.insertBefore(li, uncheckedList.firstChild);
        }
    }
    inputBox.value = "";
    saveData();
}

inputBox.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});

function handleTaskClick(e) {
    if (e.target.tagName === "LI") {
        const targetList = e.target.classList.contains("checked") ? uncheckedList : checkedList;
        targetList.appendChild(e.target);
        e.target.classList.toggle("checked");
        if (e.target.classList.contains("checked")) {
            clearedTasks++;
            updateLevel();
            updateProgressBar();
        }
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}

uncheckedList.addEventListener("click", handleTaskClick, false);
checkedList.addEventListener("click", handleTaskClick, false);

function saveData() {
    localStorage.setItem("uncheckedData", uncheckedList.innerHTML);
    localStorage.setItem("checkedData", checkedList.innerHTML);
    localStorage.setItem("level", level);
    localStorage.setItem("clearedTasks", clearedTasks);
    localStorage.setItem("requiredTasks", requiredTasks);
    localStorage.setItem("progress", progress);
}

function showTask() {
    uncheckedList.innerHTML = localStorage.getItem("uncheckedData") || "";
    checkedList.innerHTML = localStorage.getItem("checkedData") || "";
    level = parseInt(localStorage.getItem("level")) || 0;
    clearedTasks = parseInt(localStorage.getItem("clearedTasks")) || 0;
    requiredTasks = parseInt(localStorage.getItem("requiredTasks")) || 2;
    progress = parseFloat(localStorage.getItem("progress")) || 0;
    levelElement.innerHTML = level;
    updateProgressBar();
}

function updateLevel() {
    if (clearedTasks >= requiredTasks) {
        level++;
        clearedTasks = 0;
        requiredTasks++;
        lvlUpAnimation();
        updateProgressBar();
        levelElement.innerHTML = level;
        // if (level === 1) {
        //     alert("Du bist ein Level aufgestiegen!\nSchließe weitere Aufgaben ab, um mehr Erfahrungspunkte zu sammeln.");
        // }
    }
}

function updateProgressBar() {
    var progress = clearedTasks / requiredTasks * 70;
    document.querySelector('.progress-bar').style.width = progress + '%'; 
}

function lvlUpAnimation() {
    var progress = document.querySelector('.progress');
    progress.style.background = '#cc9ef9ff';
    setTimeout(function() {
        progress.style.background = '#8c24f2ff';
    }, 500); 
}
showTask();
//localStorage.clear();