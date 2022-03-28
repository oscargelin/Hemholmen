const calendarSection = document.querySelector(".calendar-section");
const guestSection = document.querySelector(".guest-section");
const timeSection = document.querySelector(".time-section");
const reqSection = document.querySelector(".req-section");
const contactSection = document.querySelector(".contact-section");
const infoBox = document.querySelector(".info-box");
const calendarIcon = document.querySelector(".grid-icon-calendar");
const guestIcon = document.querySelector(".grid-icon-guests");
const timeIcon = document.querySelector(".grid-icon-time");
const reqIcon = document.querySelector(".grid-icon-req");
const contactIcon = document.querySelector(".grid-icon-contact");
const visited = "grid-icon-visited";
const active = "grid-icon-active";
const hidden = "hidden";
let dateInfo = "";
let guestsInfo = "";
let timeInfo = "";
let reqInfo = "";
let clientPhone = "";
let clientEmail = "";
let clientName = "";
let bookedDay = "";
let bookedDate;
const patterns = {
  name: /^[-'a-zA-ZÀ-ÖØ-öø-ſ,.'-]{2,}\s?[-'a-zA-ZÀ-ÖØ-öø-ſ,.'-]+$/,
  phone: /^(([+]46)\s*(7)|07)[02369]\s*(\d{4})\s*(\d{3})$/,
  email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
};
const checkboxTerms = document.querySelector("#terms-checkbox");
const checkboxPhone = document.querySelector("#phone-checkbox");
const checkboxEmail = document.querySelector("#email-checkbox");

activateCalendarIcon();

function renderGuestSection(date) {
  dateInfo = setTheDate(date);
  bookedDate = new Date(d.getFullYear(), d.getMonth(), date);
  showSection(infoBox);
  document.querySelector(".date-info").innerHTML = dateInfo;
  hideSection(calendarSection);
  showSection(guestSection);
  deActivateGridIcon(calendarIcon);
  activateGridIcon(guestIcon);
  addVisitedClass(guestIcon);
  document.querySelectorAll(".guest-amount").forEach((item) => {
    item.addEventListener("click", (event) => {
      guestsInfo = item.querySelector(".guest-value").innerHTML;
      document.querySelector(
        ".guests-info"
      ).innerHTML = `Antal Gäster: ${guestsInfo}`;
      renderTimeSection();
    });
  });
}

function renderTimeSection() {
  hideSection(guestSection);
  showSection(timeSection);
  deActivateGridIcon(guestIcon);
  activateGridIcon(timeIcon);
  addVisitedClass(timeIcon);
  document.querySelectorAll(".time-element").forEach((item) => {
    item.addEventListener("click", (event) => {
      if (!item.classList.contains("time-booked")) {
        timeInfo = item.querySelector(".time-value").innerHTML;
        document.querySelector(".time-info").innerHTML = `Tid: ${timeInfo}`;
        renderRequirements();
      }
    });
  });
}

function renderRequirements() {
  hideSection(timeSection);
  showSection(reqSection);
  deActivateGridIcon(timeIcon);
  activateGridIcon(reqIcon);
  addVisitedClass(reqIcon);
}

function renderContactSection() {
  reqInfo = document.querySelector("#req-input").value;
  if (reqInfo != "") {
    document.querySelector(
      ".req-info"
    ).innerHTML = `Övriga önskemål: ${reqInfo}`;
  }
  hideSection(reqSection);
  showSection(contactSection);
  deActivateGridIcon(reqIcon);
  activateGridIcon(contactIcon);
  addVisitedClass(contactIcon);
  document.querySelectorAll(".form").forEach((item) => {
    item.addEventListener("keyup", (event) => {
      checkForms(event.target, patterns[event.target.attributes.name.value]);
    });
  });
}
function checkForms(field, regex) {
  let verifiedCircle = `.${field.attributes.name.value}-circle`;
  let formPara = `.${field.attributes.name.value}-para`;
  const contactBtn = document.querySelector(".contact-btn");
  if (regex.test(field.value)) {
    field.classList.add("verified");
    field.classList.remove("not-verified");
    document.querySelector(verifiedCircle).classList.remove("hidden");
    document.querySelector(formPara).classList.remove("orange");
  } else {
    field.classList.remove("verified");
    field.classList.add("not-verified");
    document.querySelector(verifiedCircle).classList.add("hidden");
    document.querySelector(formPara).classList.add("orange");
  }
  if (
    document.querySelector("#name").classList.contains("verified") &&
    document.querySelector("#email").classList.contains("verified") &&
    document.querySelector("#phone").classList.contains("verified")
  ) {
    contactBtn.classList.remove("grey-btn");
    contactBtn.classList.add("send-btn");
    contactBtn.setAttribute("onClick", "contactBtnClicked()");
  } else {
    contactBtn.classList.add("grey-btn");
    contactBtn.classList.remove("send-btn");
    contactBtn.setAttribute("onClick", "deActivateBtn()");
  }
}
function deActivateBtn() {
  console.log("knappen är inaktiverad");
}
function contactBtnClicked() {
  clientName = document.querySelector("#name").value;
  clientEmail = document.querySelector("#email").value;
  clientPhone = document.querySelector("#phone").value;
  renderBookingConfirmation();
}

function renderBookingConfirmation() {
  document.querySelector(
    ".date-confirmed"
  ).innerHTML = `<i class="far fa-calendar-alt"></i>  ${getDayName(
    bookedDate.getDay()
  )} ${dateInfo}`;
  document.querySelector(
    ".guests-confirmed"
  ).innerHTML += `<i class="fas fa-user-friends"></i>  ${guestsInfo}`;
  document.querySelector(
    ".time-confirmed"
  ).innerHTML += ` <i class="far fa-clock"></i> ${timeInfo}`;
  if (reqInfo != "") {
    document.querySelector(
      ".req-confirmed"
    ).innerHTML += ` <i class="fas fa-comment"></i> ${reqInfo}`;
  }
  if (checkboxEmail.checked && checkboxPhone.checked) {
    document.querySelector(
      ".client-info-confirmed"
    ).innerHTML = ` <i class="fas fa-paper-plane"></i> <span class="text-small"> Bokningsbekräftelse skickad till ${clientEmail} & ${clientPhone}</span>`;
  } else if (checkboxPhone.checked) {
    document.querySelector(
      ".client-info-confirmed"
    ).innerHTML = `<i class="fas fa-paper-plane"></i> Bokningsbekräftelse skickad till: ${clientPhone}`;
  } else if (checkboxEmail.checked) {
    document.querySelector(
      ".client-info-confirmed"
    ).innerHTML = `<i class="fas fa-paper-plane"></i> Bokningsbekräftelse skickad till: ${clientEmail}`;
  }
  hideSection(document.querySelector(".booking-section"));
  showSection(document.querySelector(".booking-confirmation-section"));
}
function hideAll() {
  calendarSection.classList.add(hidden);
  guestSection.classList.add(hidden);
  timeSection.classList.add(hidden);
  reqSection.classList.add(hidden);
  contactSection.classList.add(hidden);
}
function showSection(section) {
  section.classList.remove(hidden);
}
function activateCalendarIcon() {
  activateGridIcon(calendarIcon);
  addVisitedClass(calendarIcon);
}
function addVisitedClass(icon) {
  icon.classList.add(visited);
}
function hideSection(section) {
  section.classList.add(hidden);
}
function showSection(section) {
  section.classList.remove(hidden);
}
function deActivateGridIcon(icon) {
  icon.classList.remove(active);
}
function hideAllGridIcons() {
  calendarIcon.classList.remove(active);
  guestIcon.classList.remove(active);
  timeIcon.classList.remove(active);
  reqIcon.classList.remove(active);
  contactIcon.classList.remove(active);
}
function activateGridIcon(gridIcon) {
  gridIcon.classList.add(active);
}
function isVisited(icon) {
  return icon.classList.contains(visited);
}

function calendarClicked() {
  hideAll();
  hideAllGridIcons();
  showSection(calendarSection);
  activateGridIcon(calendarIcon);
}
function guestClicked() {
  if (isVisited(guestIcon)) {
    hideAll();
    hideAllGridIcons();
    showSection(guestSection);
    activateGridIcon(guestIcon);
  }
}
function timeClicked() {
  if (isVisited(timeIcon)) {
    hideAll();
    hideAllGridIcons();
    showSection(timeSection);
    activateGridIcon(timeIcon);
  }
}
function reqClicked() {
  if (isVisited(reqIcon)) {
    hideAll();
    hideAllGridIcons();
    showSection(reqSection);
    activateGridIcon(reqIcon);
  }
}
function contactClicked() {
  if (isVisited(contactIcon)) {
    hideAll();
    hideAllGridIcons();
    showSection(contactSection);
    activateGridIcon(contactIcon);
  }
}
// Calendar
let today = new Date();
let d = new Date();
d.setDate(1);
let year = d.getFullYear();
let month = d.getMonth();
let day = d.getDate();
printDays();
function getTheMonth() {
  return month;
}
function incrementMonth() {
  month += 1;
  if (month > 11) {
    month = 0;
    incrementYear();
  }
  d.setMonth(month);
  printDays();
}
function decrementMonth() {
  month -= 1;
  if (month < 0) {
    month = 11;
    decrementYear();
  }
  d.setMonth(month);
  printDays();
}
function setFooterHeader() {
  document.querySelector(".footer-heading").innerHTML = `Idag: ${getDayName(
    today.getDay()
  )} ${today.getDate()} 
   ${getMonthName(today.getMonth())} ${today.getFullYear()}`;
}
function setCalendarHeader() {
  document.querySelector(".calendar-heading").innerHTML = `${getMonthName(
    month
  )} ${year}`;
}
function printDays() {
  setCalendarHeader();
  setFooterHeader();
  let string = "";
  string += printPrev();
  for (let i = 1; i <= getDaysInMonth(month); i++) {
    if (
      i === today.getDate() &&
      getTheMonth() === today.getMonth() &&
      getYear() === today.getFullYear()
    ) {
      string += `<div class="day today" onClick="renderGuestSection(${i})">${i}</div>`;
    } else if (
      i < today.getDate() &&
      getTheMonth() <= today.getMonth() &&
      getYear() <= today.getFullYear()
    ) {
      string += `<div class="day prev-days">${i}</div>`;
    } else {
      string += `<div class="day" onClick="renderGuestSection(${i})">${i}</div>`;
    }
  }
  string += printNext();
  document.querySelector(".calendar").innerHTML = string;
}
function setTheDate(date) {
  let temp = "";
  if (date < 10) {
    date = `0${date}`;
  }
  if (d.getMonth() + 1 > 9) {
    temp = `${d.getFullYear()}-${d.getMonth() + 1}-${date}`;
  } else {
    temp = `${d.getFullYear()}-0${d.getMonth() + 1}-${date}`;
  }
  bookedDay = getDayName(date);
  return temp;
}
function printPrev() {
  let temp = "";
  for (let i = d.getDay() - 1; i > 0; i--) {
    temp += `<div class="day prev-days">${
      getDaysInMonth(d.getMonth() - 1) - i + 1
    }</div>`;
  }
  return temp;
}
function printNext() {
  let temp = "";
  let dTemp = new Date(d.getFullYear(), d.getMonth() + 1, 1);
  for (let i = 1; i <= 7 - dTemp.getDay() + 1; i++) {
    temp += `<div class="day next-days">${i}</div>`;
  }
  return temp;
}

function decrementYear() {
  year = year - 1;
  d.setYear(year);
}
function incrementYear() {
  year = year + 1;
  d.setYear(year);
}

function getYear() {
  return year;
}
function getDaysInMonth(month) {
  let days = new Date(getYear(), month + 1, 0).getDate();
  return days;
}
function getDayName(day) {
  switch (day) {
    case 0:
      day = "Söndag";
      break;
    case 1:
      day = "Måndag";
      break;
    case 2:
      day = "Tisdag";
      break;
    case 3:
      day = "Onsdag";
      break;
    case 4:
      day = "Torsdag";
      break;
    case 5:
      day = "Fredag";
      break;
    case 6:
      day = "Lördag";
      break;
  }
  return day;
}
function getMonthName(month) {
  switch (month) {
    case 0:
      month = "Januari";
      break;
    case 1:
      month = "Februari";
      break;
    case 2:
      month = "Mars";
      break;
    case 3:
      month = "April";
      break;
    case 4:
      month = "Maj";
      break;
    case 5:
      month = "Juni";
      break;
    case 6:
      month = "Juli";
      break;
    case 7:
      month = "Augusti";
      break;
    case 8:
      month = "September";
      break;
    case 9:
      month = "Oktober";
      break;
    case 10:
      month = "November";
      break;
    case 11:
      month = "December";
      break;
  }
  return month;
}
