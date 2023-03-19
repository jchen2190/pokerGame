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
        cardHand[i].suit = deckCopy[r].suit;
        cardHand[i].kind = deckCopy[r].kind;
        cardHand[i].indx = i;
        cardHand[i].boolean = true;
        cardHand[i].style.cursor = "pointer";
        deckCopy.splice(r, 1);
        if (deckCopy.length <= 2) { 
            deckCopy = [...deck];
        }
    }
    dealBtnDisable();
    switchBtnEnable();
}

function selectCard() {
    if(cardHand[this.indx].boolean) {
        cardHand[this.indx].style.transform = "translateY(-10px)";
    } else {
        cardHand[this.indx].style.transform = "translateY(0px)";
    }
    cardHand[this.indx].boolean = !cardHand[this.indx].boolean
}

// TODO: stop after one switch
function switchPokerHand() {
    for (let i = 0; i < cardHand.length; i++) {
        if(cardHand[i].boolean == false) {
            let r = Math.floor(Math.random() * deckCopy.length);
            cardHand[i].src = `images/${deckCopy[r].file}`;
            cardHand[i].suit = deckCopy[r].suit;
            cardHand[i].kind = deckCopy[r].kind;
            cardHand[i].style.transform = "translate(0px)";
            cardHand[i].boolean = true;
            deckCopy.splice(r, 1);
        }
    }
    evalGame();
}

// TODO: evaluate card hand
function evalGame() {
    let cardKind = [];
    let cardSuit = [];
    for (let i = 0; i < cardHand.length; i++) {
        cardKind.push(cardHand[i].kind);
        cardSuit.push(cardHand[i].suit);
    }
    console.log('cardKind', cardKind);
    console.log('cardSuit', cardSuit);

    let countKind = {};
    let countSuit = {};
    cardKind.forEach((e) => {
        countKind[e] = (countKind[e] || 0) + 1;
    })
    cardSuit.forEach((e) => {
        countSuit[e] = (countSuit[e] || 0) + 1;
    })
    console.log('countKind', countKind);
    console.log('countSuit', countSuit);

    if (countSuit.Spades == "5" || countSuit.Hearts == "5" || countSuit.Clubs == "5" || countSuit.Diamonds == "5") {
        console.log("FLUSH");
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