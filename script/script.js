let myarrey = [];
const todoList = JSON.parse(localStorage.getItem("todo_list"));

//creation id
const creatid = () => {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const h = today.getHours();
    const m = today.getMinutes();
    const s = today.getSeconds();
    const id = mm + dd + yyyy + h + m + s;
    return id;
}

//Modal content
const modal = document.getElementById("myModal");
const btn = () => {
    modal.style.display = "block";
}

const Closure = () => {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//modal clean list
const modalclean = document.getElementById("Modaclean");
let clean = () => {
    modalclean.style.display = "block";
}
const ClosureClean = () => {
    modalclean.style.display = "none";
}

//modal edit list
const editlistmodel = document.getElementById("Modaledit");
let edit = () => {
    editlistmodel.style.display = "block";
}
const Closedit = () => {
    editlistmodel.style.display = "none";
}

//Open the modal clean
const openModelDelet = (id) => {
    clean();
    const confirmDeletion = document.getElementById("confirm-deletion");
    confirmDeletion.onclick = function() { deleteListItem(id) };
}

//button done
const doneTask = (id) => {
    const index = myarrey.findIndex(arry => arry.id === id);
    const elementSelected = document.getElementById(id);

    if (myarrey[index].status === "active") {
        myarrey[index].status = "inactive";

        elementSelected.classList.remove("active");
    } else {
        myarrey[index].status = "active";

        elementSelected.classList.add("active");
    }

    localStorage.setItem("todo_list", JSON.stringify(myarrey));
}

//Element construction
const enterButton = document.getElementById("enter");
const input = document.getElementById("userInput");
const inputAddStore = document.getElementById('userInput');
let ul = document.querySelector("ul");

const ElementConstruction = (element) => {

    const li = document.createElement("li");
    const p = document.createElement("p");
    const div = document.createElement("div");
    const div1 = document.createElement("div");
    const dBtn = document.createElement("button");
    const edit = document.createElement("img");
    const tick = document.createElement("img");

    p.appendChild(document.createTextNode(element.title));

    div1.appendChild(p);
    div1.classList.add("txtlist");
    li.appendChild(div1);
    li.appendChild(div);
    div.classList.add("content-edit");
    ul.appendChild(li);
    li.classList.add("list");
    li.classList.add(element.status);
    li.setAttribute('id', element.id);
    div.appendChild(edit);
    edit.src = "img/item.png";
    edit.classList.add("editlist");
    div.appendChild(dBtn);
    dBtn.classList.add("button-clean");
    dBtn.appendChild(tick);
    tick.src = "img/tickicon.png";
    tick.classList.add("tickicon");

    edit.onclick = function() { openModelDelet(element.id) }
    dBtn.onclick = function() { doneTask(element.id) };
    div1.onclick = function() { openModelDelet(element.id) };
}

//add task list
const addTask = () => {
    const newTask = { id: creatid(), title: inputAddStore.value, status: "inactive" };
    myarrey.push(newTask);
    inputAddStore.value = "";
    ElementConstruction(newTask);
    Closure();
    localStorage.setItem("todo_list", JSON.stringify(myarrey));
}

//deleteListItem
const deleteListItem = (id) => {
    const index = myarrey.findIndex(arry => { return arry.id === id; });
    myarrey.splice(index, 1);
    const elementSelected = document.getElementById(id);
    elementSelected.parentNode.removeChild(elementSelected);
    ClosureClean();
    localStorage.setItem("todo_list", JSON.stringify(myarrey));
}

//Press the button
const inputLenght = () => {
    return input.value.length;
}
const addListAfterClick = () => {
    if (inputLenght() > 0) {
        addTask();
    }
}

//Press the enter key
const addListAfterClickKeypress = (event) => {
    if (inputLenght() > 0 && event.which === 13) {
        addTask();
    }
}

enterButton.addEventListener("click", addListAfterClick);
input.addEventListener("keypress", addListAfterClickKeypress);

if (todoList) {
    myarrey = todoList;
    if (myarrey.length) {
        myarrey.map(item => {
            ElementConstruction(item);
        });
    }
}