let input = document.querySelector('.input');
let button = document.querySelector('.button');
let wrapperCards = document.querySelector('.wrapper-cards');
let time = document.querySelector('.time');

let buttonGame = document.createElement("button");
let modalEnd = document.createElement("div");
let timeInterval

let arrCardOpen = [];

// создаем масив
let result = 4
let newArr = new Array();


button.onclick = function() {

  let value = +input.value;

  // очищаем .wrapper-cards
  if (document.querySelector(".card")) {
    wrapperCards.innerHTML = ''
  }

  button.disabled = true;

  // проверяем введеное число
  if (value % 2 == 0 && value <= 10 && value >= 4) {
    result = value;
  } else {
    result = 4;
    input.value = 4
    alert('Введите четное число от 4 до 10')
  }
  // задаем ширину .wrapper-cards
  wrapperCards.style.width = (160 * result) + 'px';
  // создаем новый масив
  for (let i = 0; i < result * result; i++) {
    newArr[i] = Math.trunc(i / 2) + 1
  }
  // перемешиваем масив
  function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }
  shuffle(newArr);

  // создаем div .card
  function getListContent() {
    let fragment = new DocumentFragment();
    for (let i = 0; i < result * result; i++) {
      let card = document.createElement("div");
      card.classList.add('card');
      card.dataset.number = newArr[i];
      fragment.append(card);
    }
    return fragment;
  }
  wrapperCards.append(getListContent()); // (*)


  // находим .card
  let cardInDom = document.querySelectorAll(".card");

  // вызываем функцию по клику на .card и показываем цифру
  let temp;
  for (let card of cardInDom) {
    card.onclick = () => {
      if (card.classList.contains("open")) return;
      let cardValue = card.dataset.number;
      card.innerHTML = cardValue;
      if (temp && temp != card) {
        if (temp.dataset.number == cardValue) {
          temp.classList.add("open");
          card.classList.add("open");
          temp = null;
          if (document.querySelectorAll(".card.open").length === result * result) {
            andGame();
            clearInterval(interval);
          }
        } else { 
            document.querySelector('.wrapper-cards').classList.add('disabled');
          setTimeout(()=>{
          card.innerHTML = "";
          temp.innerHTML = "";
          temp = null;
          document.querySelector('.wrapper-cards').classList.remove('disabled');},
          500); 
          
        }
      } else temp = card;
    };
  };

  let interval = setInterval(function() {
    timeInterval = parseFloat(time.textContent)
    if (timeInterval <= 0) {
      clearInterval(interval);
      andGame();
    } else {
      time.textContent = timeInterval - 1
    };
  }, 1000);
};

// закнчиваем игру

const andGame = function() {

  modalEnd.classList.add('modal-end');
  document.body.append(modalEnd);
  buttonGame.classList.add('button-game');
  modalEnd.append(buttonGame);
  buttonGame.append(document.createTextNode("Начать заново"));
}

// начинаеем игру  

buttonGame.onclick = function() {
  modalEnd.remove();
  buttonGame.innerHTML = ''
  time.textContent = 60
  timeInterval = parseFloat(time.textContent)
  button.onclick()
}