const inputBox = document.getElementById("input-box");
const uncheckedList = document.getElementById("unchecked-list");
const checkedList = document.getElementById("checked-list");

function addTask() {
    if (inputBox.value === '') {
        alert("Kein Inhalt!");
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
}

function showTask() {
    uncheckedList.innerHTML = localStorage.getItem("uncheckedData") || "";
    checkedList.innerHTML = localStorage.getItem("checkedData") || "";
}

showTask();
