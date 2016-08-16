document.addEventListener("DOMContentLoaded", init);

/* Admin Values Change To Suit Your Needs */
var winningContestantNumber = 1;
var winningNumber = 4689; // Do not start it with a zero
var adminPassword = '0000';
var adminEmailAddress = 'kaitlyn.elgie@clvgroup.com';

/* Global Variables */
var clvLogo, adminForm, adminFunctions, contestForm, emailAdminBtn, clearEmailsBtn;

function init () {

  if (localStorage.getItem("contest") === null) {
    localStorage.setItem("contest", JSON.stringify([]));
  }

  clvLogo = document.querySelector("#clvLogo");
  clvLogo.addEventListener("click", showAdminLogin);

  adminForm = document.querySelector("#adminForm");
  adminForm.addEventListener("submit", adminLogin);

  adminFunctions = document.querySelector("#adminFunctions");

  contestForm = document.querySelector("#contestForm");
  contestForm.addEventListener("submit", formSubmitted);

  emailAdminBtn = document.querySelector("#emailAdmin");
  emailAdminBtn.addEventListener("click", function() {
    emailAdmin();
  });

  clearEmailsBtn = document.querySelector("#clearEmails");
  clearEmailsBtn.addEventListener("click", function() {
    if (confirm('Are you sure you want clear all emails, this cannot be undone?')) {
      localStorage.clear();
      localStorage.setItem("contest", JSON.stringify([]));
      alert("All emails have been deleted successfully");
    } else {
      // Do nothing!
    }
  });
}

function showAdminLogin() {

  if (adminForm.style.display == 'none' && adminFunctions.style.display == 'none') {
    adminForm.style.display = 'block';
  }else {
    adminForm.style.display = 'none';
    adminFunctions.style.display = 'none';
  }

}

function adminLogin(ev) {

  ev.preventDefault();

  var enteredPassword = document.querySelector("#adminPassword");

  if (enteredPassword.value == adminPassword) {
    enteredPassword.value = '';
    adminForm.style.display = 'none';
    adminFunctions.style.display = 'block';
  }else {
    alert("Incorrect Password");
  }

}

function emailAdmin() {
  var contestObject = JSON.parse(localStorage.getItem("contest"));
  var bodyemail = 'name, email, number \n';

  for (var i = 0; i < contestObject.length ; i++) {
    bodyemail += contestObject[i].name + ',' + contestObject[i].email + ',' + contestObject[i].number + '\n';
  }

  var email = adminEmailAddress;
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

    alert("Thank You For Entering The Contest!\n" + "Your lock code is: " + randomNumber);

    formName.value = '';
    formEmail.value = '';
  }
}

function generateNumber(emailNumber) {

  if (emailNumber === winningContestantNumber) {
    return winningNumber;
  }else {
    var losingNumber = Math.floor(1000 + Math.random() * 9000);

    if (losingNumber === winningNumber) {
      losingNumber += 2;
    }
    return losingNumber;
  }
}

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
