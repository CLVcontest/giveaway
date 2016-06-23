document.addEventListener("DOMContentLoaded", init);
var winningNumber = 4689;

function init () {

  if (localStorage.getItem("contest") === null) {
    localStorage.setItem("contest", JSON.stringify([]));
  }

  var clvLogo = document.querySelector("#clvLogo");
  clvLogo.addEventListener("click", emailAdmin);

  var contestForm = document.querySelector("#contestForm");
  contestForm.addEventListener("submit", formSubmitted);
}

function emailAdmin() {
  var contestObject = JSON.parse(localStorage.getItem("contest"));
  var bodyemail = 'name, email, number \n';

  for (var i = 0; i < contestObject.length ; i++) {
    bodyemail += contestObject[i].name + ',' + contestObject[i].email + ',' + contestObject[i].number + '\n';
  }

  var email = 'kirkdavies@rogers.com';
  var subject = 'CLV Contest Email List';
  var mailto_link = 'mailto:' + email + '?subject=' + subject + '&body=' + encodeURI(bodyemail);

  window.location.href = mailto_link;
}

function formSubmitted (ev) {
  ev.preventDefault();

  var formName = document.querySelector("#formName");
  var formEmail = document.querySelector("#formEmail");
  var nameError = document.querySelector("#formNameError");
  var emailError = document.querySelector("#formEmailError");
  nameError.innerHTML = '';
  emailError.innerHTML = '';

  if (formName.value.trim() == '') {
    nameError.innerHTML = 'Please enter a name';
  }

  if (!validateEmail(formEmail.value)) {
    emailError.innerHTML = "Please enter a valid email address";
  }

  if (validateEmail(formEmail.value) && formName.value.trim() != '') {
    var contestObject = JSON.parse(localStorage.getItem("contest"));
    var randomNumber = generateNumber(contestObject.length + 1);

    var newEmail = {
      name: formName.value.trim(),
      email: formEmail.value.trim(),
      number: randomNumber
    };

    contestObject.push(newEmail);
    localStorage.setItem("contest", JSON.stringify(contestObject));

    alert(randomNumber);
  }
}

function generateNumber(emailNumber) {

  if (emailNumber === 4) {
    return winningNumber;
  }else {
    var losingNumber = Math.floor(1000 + Math.random() * 9000);

    if (losingNumber === winningNumber) {
      losingNumber += 3;
    }
    return losingNumber;
  }
}

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}