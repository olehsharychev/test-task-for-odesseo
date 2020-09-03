let arrEmployees = [];

let employeeForm = document.getElementsByClassName("employee-form")[0];
let surnameName = document.getElementById("surname-name");
let position = document.getElementById("position");
let email = document.getElementById("email");
let tel = document.getElementById("tel");
let list = document.querySelector(".list");
let mode = 0; // 0 - create new record, 1 - edit existing record

if (localStorage.length > 0) {
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

    let editBtns = document.getElementsByClassName("list-item__btn--edit");
    let deleteBtns = document.getElementsByClassName("list-item__btn--delete");
    for (let i = 0; i < editBtns.length; i++) {
        editBtns[i].addEventListener("click", fillForm);
        deleteBtns[i].addEventListener("click", function () {
            let itemId = this.parentNode.id;
            // deleting records blocked while editing
            if (mode === 0) {
                deleteRecord(itemId);
            }
        });
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
}

function deleteRecord(itemId) {
    arrEmployees.splice(itemId, 1);
    renderList();
}

function fillForm() {
    mode = 1;
    let itemId = this.parentNode.id;
    localStorage.setItem("editingId", itemId);
    surnameName.value = arrEmployees[itemId].surnameName;
    position.value = arrEmployees[itemId].position;
    email.value = arrEmployees[itemId].email;
    tel.value = arrEmployees[itemId].tel;
}

function saveChanges() {
    let recordId = localStorage.getItem("editingId");
    arrEmployees[recordId].surnameName = surnameName.value;
    arrEmployees[recordId].position = position.value;
    arrEmployees[recordId].email = email.value;
    arrEmployees[recordId].tel = tel.value;
    mode = 0;
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
    if (!surnameNameRegExp.test(surnameName.value)) {
        surnameNameWrong.style.display = "block";
        succeed = 0;
    }

    if (position.value.length < 5) {
        positionWrong.style.display = "block";
        succeed = 0;
    }

    const emailRegExp = RegExp("^(?!.*@.*@.*$)(?!.*@.*\\-\\-.*\\..*$)(?!.*@.*\\-\\..*$)(?!.*@.*\\-$)(.*@.+(\\..{1,})?)$");
    if (!emailRegExp.test(email.value)) {
        emailWrong.style.display = "block";
        succeed = 0;
    }

    const telRegExp = RegExp("(^0[0-9]{9}$)|(^80[0-9]{9}$)|(^\\+380[0-9]{9}$)");
    if (!telRegExp.test(tel.value)) {
        telWrong.style.display = "block";
        succeed = 0;
    }
    return succeed;
}

renderList();

employeeForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (checkValidity()) {
        if (mode === 0) { // add new record
            let record = {
                surnameName: surnameName.value,
                position: position.value,
                email: email.value,
                tel: tel.value
            };
            addRecord(record);
            clearForm();
            renderList();
        }
        if (mode === 1) { // edit existing record
            saveChanges();
            clearForm();
            renderList();
        }
    }

});

// save arrEmployees on closing or updating window
window.onbeforeunload = function () {
    saveRecords();
};
