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

        let card = {  // make card objects
            kind: kind,
            suit: suit,
            name: name,
            file: file,
            valu: valu,
        };
        deck.push(card);
    }
}

const btn = document.querySelector('button');
btn.addEventListener('click', dealPokerHand);
const cardHand = document.querySelectorAll('#card-box img');
const cardBox = document.getElementById('card-box');

deckCopy = [...deck];

function dealPokerHand() {
    // cardBox.innerHTML = ""; // remove all content from card box
    for (let i = 0; i < cardHand.length; i++) {
        let r = Math.floor(Math.random() * deckCopy.length); // 0-51
        cardHand[i].src = `images/${deckCopy[r].file}`; // images/${deckCopy[r]}.png
        deckCopy.splice(r, 1); // remove 1 card at the random index
        if (deckCopy.length <= 2) { 
            deckCopy = [...deckOfCards]; // fresh deck
        }
    }
}