let counter = 0;
const imgFirst =
  "https://cdn.pixabay.com/photo/2017/12/22/11/09/schilthorn-3033448_1280.jpg";
const paraFirst = `Boka en resa hit idag för endast 20% av ordinarie pris. Njut av mat i värdsklass i en svårslagen miljö.`;

const imgSecond =
  "https://cdn.pixabay.com/photo/2016/10/08/14/49/skiing-1723857_1280.jpg";
const paraSecond =
  "Vi erbjuder Sveriges i särklass bästa skidåkning. Längdskidor som alpin-skidåkning.";

const imgThird =
  "https://cdn.pixabay.com/photo/2019/03/02/15/44/skating-4030045_1280.jpg";
const paraThird =
  "Upplev den ultimata vinterkänslan när du åker skridskor på sjön i området hos oss. Utrustning finns att hyra för hela familjen.";

const imgFourth =
  "https://cdn.pixabay.com/photo/2018/03/03/18/52/wood-3196284_1280.jpg";
const paraFourth =
  "Aktiviteter i all ära, men bäst av allt är väl ändå att bara koppla av och ta det lugnt ett slag, vilket du gör bäst i vårt alldeles egna spa.";

display();
document
  .querySelector(".menu-btn")
  .addEventListener("click", () =>
    document.querySelector(".main-nav-flex").classList.toggle("show")
  );
function display() {
  checkCounter();
  switch (counter) {
    case 0:
      presentFirst();
      break;
    case 1:
      presentSecond();
      break;
    case 2:
      presentThird();
      break;
    case 3:
      presentFourth();
      break;
  }
  setNavBtn();
}
function setNavBtn() {
  document.querySelectorAll(".rounded-nav-btn").forEach((item) => {
    item.style.backgroundColor = "rgba(0,0,0,0.4)";
  });
  document.querySelector(`.nav-btn-${counter}`).style.backgroundColor = "#fff";
}
function prev() {
  counter--;
  display();
}
function next() {
  counter++;
  display();
}
function checkCounter() {
  if (counter > 3) {
    counter = 0;
  } else if (counter < 0) {
    counter = 3;
  }
  if (counter == 0) {
    presentFirst();
  } else if (counter == 1) {
    presentSecond();
  } else if (counter == 2) {
    presentThird();
  } else if (counter == 3) {
    presentFourth();
  }
}
function contentHeroBtnClicked() {
  switch (counter) {
    case 1:
      break;
    case 2:
      break;
    case 3:
      break;
  }
}
function setBtn(btnText) {
  document.querySelector(".content-hero-btn").innerHTML = btnText;
}
function setHeader(header) {
  document.querySelector(".content-hero-header").innerHTML = header;
}
function setPara(para) {
  document.querySelector(".content-hero-para").innerHTML = para;
}
function backgroundImage(url) {
  document.querySelector(".content-hero").style.backgroundImage = `url(${url})`;
}
function presentFirst() {
  setHeader("Utforska Berget");
  setPara(paraFirst);
  backgroundImage(imgFirst);
  setBtn("Boka resa");
  document.querySelector(".content-hero-btn").href =
    "https://www.alpresor.se/skidresor/";
  counter = 0;
  setNavBtn();
}
function presentSecond() {
  setHeader("Skidåkning");
  setPara(paraSecond);
  backgroundImage(imgSecond);
  setBtn("Till skidshoppen");
  document.querySelector(".content-hero-btn").href = "https://www.skistore.se/";
  counter = 1;
  setNavBtn();
}
function presentThird() {
  setHeader("Skridskor på sjön");
  setPara(paraThird);
  backgroundImage(imgThird);
  setBtn("Läs mer");
  document.querySelector(".content-hero-btn").href =
    "https://www.friluftsframjandet.se/lat-aventyret-borja/hitta-aventyr/skridskor/";
  counter = 2;
  setNavBtn();
}
function presentFourth() {
  setHeader("Vårt spa");
  setPara(paraFourth);
  backgroundImage(imgFourth);
  setBtn("Spana in vårt spa");
  document.querySelector(".content-hero-btn").href = "https://selmaspa.se/";
  counter = 3;
  setNavBtn();
}
