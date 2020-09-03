let arrEmployees = [];

let employeeForm = document.getElementsByClassName("employee-form")[0];
let surnameName = document.getElementById("surname-name");
let position = document.getElementById("position");
let email = document.getElementById("email");
let tel = document.getElementById("tel");

function addNode(node) {
    
}

function deleteNode(node) {
    
}

function editNode(node) {
    
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

employeeForm.addEventListener("submit", function (e) {
    e.preventDefault();
    checkValidity();
});
