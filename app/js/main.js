let arrEmployees = [];

let employeeForm = document.getElementsByClassName("employee-form")[0];
let surnameName = document.getElementById("surname-name");
let position = document.getElementById("position");
let email = document.getElementById("email");
let tel = document.getElementById("tel");
let editBtns = document.getElementsByClassName("list-item__btn--edit");
let deleteBtns = document.getElementsByClassName("list-item__btn--delete");
let list = document.querySelector(".list");

if(localStorage.length > 0) {
    arrEmployees = JSON.parse(localStorage.employeesStr);
}

function renderList() {
    let htmlContent = "";
    let i = 0;
    arrEmployees.forEach(function (item) {
         htmlContent += `
            <div id="${i}" class="list__item list-item">
                <h4 class="list-item__surname-name">${item.surnameName}</h4>
                <p class="list-item__position">${item.position}</p>
                <p class="list-item__email-tel">Email: ${item.email} | Номер телефона: ${item.tel}</p>
                <button class="list-item__btn list-item__btn--edit"></button>
                <button class="list-item__btn list-item__btn--delete"></button>
            </div>
        `;
        i++;
    });
    list.innerHTML = htmlContent;
    for (let i = 0; i < editBtns.length; i++) {
        editBtns[i].addEventListener("click", editRecord);
        deleteBtns[i].addEventListener("click", deleteRecord);
    }
}

function clearForm() {
    employeeForm.reset();
}

function saveRecords() {
    if (arrEmployees.length === 0) {
        localStorage.clear();
    }
    else {
        let recordsStr = JSON.stringify(arrEmployees);
        localStorage.setItem("employeesStr", recordsStr);
    }
}
    
function addRecord(record) {
    arrEmployees.push(record);
    renderList();
    clearForm();
}

function deleteRecord() {
    let itemId = this.parentNode.id;
    arrEmployees.splice(itemId, 1);
    renderList();
}

function editRecord() {
    console.log(this.parentNode.id);
    console.log("edit");
}

function checkValidity() {
    let succeed = 1;
    let surnameNameWrong = document.getElementById("surname-name-wrong");
    surnameNameWrong.style.display = "none";
    let positionWrong = document.getElementById("position-wrong");
    positionWrong.style.display = "none";
    let emailWrong = document.getElementById("email-wrong");
    emailWrong.style.display = "none";
    let telWrong = document.getElementById("tel-wrong");
    telWrong.style.display = "none";

    const surnameNameRegExp = RegExp("(^[A-Za-z]{1,} [A-Za-z]{1,}$)|(^[А-Яа-я]{1,} [А-Яа-я]{1,}$)");
    if (!surnameNameRegExp.test(surnameName.value)){
        surnameNameWrong.style.display = "block";
        succeed = 0;
    }

    if (position.value.length < 5){
        positionWrong.style.display = "block";
        succeed = 0;
    }

    const emailRegExp = RegExp("^(?!.*@.*@.*$)(?!.*@.*\\-\\-.*\\..*$)(?!.*@.*\\-\\..*$)(?!.*@.*\\-$)(.*@.+(\\..{1,})?)$");
    if(!emailRegExp.test(email.value)){
        emailWrong.style.display = "block";
        succeed = 0;
    }

    const telRegExp = RegExp("(^[0-9]{10}$)|(^[0-9]{11}$)|(^\\+[0-9]{12}$)");
    if (!telRegExp.test(tel.value)){
        telWrong.style.display = "block";
        succeed = 0;
    }
    return succeed;
}

renderList();

employeeForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (checkValidity()){
        let record = {
            surnameName : surnameName.value,
            position : position.value,
            email : email.value,
            tel : tel.value
        };
        addRecord(record);
    }
});

window.onbeforeunload = function () {
    saveRecords();
};
