const kinds = ['2','3','4','5','6','7','8','9','10','Jack','Queen','King', 'Ace'];
const suits = ['Diamonds', 'Hearts', 'Spades', 'Clubs'];
const deck = [];

for (let i = 0; i < kinds.length; i++) {
    for (let j = 0; j < suits.length; j++) {     
        let kind = kinds[i];
        let suit = suits[j];
        let name = `${kind} of ${suit}`;
        let file = `${kind}-of-${suit}.png`;
        let valu = 0;
        
        if (kind == 'Ace') {
            valu = 11; 
        } else if (kind.length > 3) {
            valu = 10; // J Q K
        } else {
            valu = Number(kind);
        }

        let card = {
            kind: kind,
            suit: suit,
            name: name,
            file: file,
            valu: valu,
        };
        deck.push(card);
    }
}

const dealBtn = document.querySelector("#deal-btn");
dealBtn.addEventListener("click", dealPokerHand);
const switchBtn = document.querySelector("#switch-btn")
switchBtn.addEventListener("click", switchPokerHand)
const cardHand = document.querySelectorAll("#card-box img")
const cardBox = document.getElementById("card-box");
deckCopy = [...deck];

function dealPokerHand() {
    for (let i = 0; i < cardHand.length; i++) {
        let r = Math.floor(Math.random() * deckCopy.length); // 0-51
        cardHand[i].src = `images/${deckCopy[r].file}`;
        cardHand[i].addEventListener("click", selectCard);
        cardHand[i].valu = i;
        cardHand[i].boolean = true;
        deckCopy.splice(r, 1);
        if (deckCopy.length <= 2) { 
            deckCopy = [...deck];
        }
    }
    dealBtnDisable();
    switchBtnEnable();
}

// TODO: change border (to transform?) and fixed image
function selectCard() {
    if(cardHand[this.valu].boolean) {
        cardHand[this.valu].style.border = "5px solid green";
    } else {
        cardHand[this.valu].style.border = "5px solid red";
    }
    cardHand[this.valu].boolean = !cardHand[this.valu].boolean
    console.log(cardHand[this.valu].boolean);
}

// TODO: stop after one switch
function switchPokerHand() {
    for (let i = 0; i < cardHand.length; i++) {
        if(cardHand[i].boolean == false) {
            let r = Math.floor(Math.random() * deckCopy.length);
            cardHand[i].src = `images/${deckCopy[r].file}`;
            deckCopy.splice(r, 1);
        }
    }
}

function dealBtnEnable() {
    dealBtn.disabled = false;
    dealBtn.classList.add("btnEnable");
    dealBtn.classList.remove("btnDisable");
}
function dealBtnDisable() {
    dealBtn.disabled = true;
    dealBtn.classList.remove("btnEnable");
    dealBtn.classList.add("btnDisable");
}
function switchBtnEnable() {
    switchBtn.disabled = false;
    switchBtn.classList.add("btnEnable");
    switchBtn.classList.remove("btnDisable");
}
function switchBtnDisable() {
    switchBtn.disabled = true;
    switchBtn.classList.remove("btnEnable");
    switchBtn.classList.add("btnDisable");
}