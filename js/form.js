const form = document.querySelector(".about-contact-form");

const name = document.querySelector("#name");
const nameError = document.querySelector("#name-error");

const email = document.querySelector("#email");
const emailError = document.querySelector("#email-error");

const subject = document.querySelector("#subject");
const subjectError = document.querySelector("#subject-error");

function formValidate() {
  event.preventDefault();
  if (lengthHandler(name.value, 2) === true) {
    nameError.style.display = "none";
  } else {
    nameError.style.display = "block";
    console.log("nope");
  }

  if (emailValidate(email.value) === true) {
    emailError.style.display = "none";
  } else {
    emailError.style.display = "block";
  }

  if (lengthHandler(subject.value, 4) === true) {
    subjectError.style.display = "none";
  } else {
    subjectError.style.display = "block";
  }
}

form.addEventListener("submit", formValidate);

function lengthHandler(value, lngth) {
  if (value.trim().length > lngth) {
    return true;
  } else {
    return false;
  }
}

function emailValidate(email) {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const patternMatch = regEx.test(email);
  return patternMatch;
}
