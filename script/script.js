const myarrey = [];
const todoList = JSON.parse(localStorage.getItem("todo_list"));

//creation id
const creatNewId = () => {
    let today = new Date();
    const date = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    const hours = today.getHours();
    const minutes = today.getMinutes();
    const seconds = today.getSeconds();
    const id = month + date + year + hours + minutes + seconds;
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
const clean = () => {
    modalclean.style.display = "block";
}
const closeModel = () => {
    modalclean.style.display = "none";
}

//modal edit list
const editlistmodel = document.getElementById("Modaledit");
const inputEdit = document.querySelector(".inputEdit");
const btnEdit = document.querySelector(".btnEditList");

const edit = (id) => {
    btnEdit.onclick = function() { editList(id) };

    editlistmodel.style.display = "block";
    myarrey.map(index => {
        if (index.id === id) {
            inputEdit.value = index.title;
        }

    });
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

//edit list
const editList = (id) => {
    let inputEditList = inputEdit.value;
    if (inputEditList) {
        myarrey.findIndex(index => {
            if (index.id === id) {
                index.title = inputEditList;
                document.getElementById(id).childNodes[0].childNodes[0].innerHTML = inputEditList;
                localStorage.setItem("todo_list", JSON.stringify(myarrey));
            }
        })
    }
    Closedit();
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
const ElementConstruction = (element) => {
    const ul = document.querySelector("ul");

    const li = document.createElement("li");
    const p = document.createElement("p");
    const div = document.createElement("div");
    const div1 = document.createElement("div");
    const dBtn = document.createElement("button");
    const editList = document.createElement("img");
    const deleteList = document.createElement("img");
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
    div.appendChild(editList);
    editList.src = "img/editIcon.png";
    editList.classList.add("editlist");
    div.appendChild(deleteList);
    deleteList.src = "img/item.png";
    deleteList.classList.add("deleteList");
    div.appendChild(dBtn);
    dBtn.classList.add("button-clean");
    dBtn.appendChild(tick);
    tick.src = "img/tickicon.png";
    tick.classList.add("tickicon");

    editList.onclick = function() { edit(element.id) }
    deleteList.onclick = function() { openModelDelet(element.id) }
    dBtn.onclick = function() { doneTask(element.id) };
}

//add task list
const addTask = () => {
    const inputAddStore = document.getElementById('userInput');
    const newTask = { id: creatNewId(), title: inputAddStore.value, status: "inactive" };
    myarrey.push(newTask);
    localStorage.setItem("todo_list", JSON.stringify(myarrey));
    inputAddStore.value = "";
    ElementConstruction(newTask);
    Closure();
}

//deleteListItem
const deleteListItem = (id) => {
    const index = myarrey.findIndex(arry => arry.id === id);
    myarrey.splice(index, 1);
    localStorage.setItem("todo_list", JSON.stringify(myarrey));
    const elementSelected = document.getElementById(id);
    elementSelected.parentNode.removeChild(elementSelected);
    closeModel();
}

//Press the button
const input = document.getElementById("userInput");
const inputLenght = () => input.value.length;

const enterButton = document.getElementById("enter");
const addListAfterClick = () => {
    if (inputLenght() > 0) {
        addTask();
    }
}
enterButton.addEventListener("click", addListAfterClick);

if (todoList) {
    todoList.map(item => {
        myarrey.push(item);
    })
    if (myarrey.length) {
        myarrey.map(item => {
            ElementConstruction(item);
        });
    }
}