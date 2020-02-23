var Hero = /** @class */ (function () {
    function Hero(mine) {
        this.mine = mine;
        this.att = Math.ceil(Math.random() * 2);
        this.hp = Math.ceil(Math.random() * 5) + 25;
        this.hero = true;
        this.field = true;
    }
    return Hero;
}());
var Sub = /** @class */ (function () {
    function Sub(mine) {
        this.field = false;
        this.mine = mine;
        this.att = Math.ceil(Math.random() * 2);
        this.hp = Math.ceil(Math.random() * 5) + 25;
        this.cost = Math.floor((this.att + this.hp) / 2);
    }
    return Sub;
}());
// 타입 가드
function isSub(data) {
    if (data.cost) {
        //쫄병이면
        return true;
    }
    return false;
}
function isHero(data) {
    if (data.hero) {
        //영웅이면
        return true;
    }
    return false;
}
var opponent = {
    hero: document.getElementById("rival-hero"),
    deck: document.getElementById("rival-deck"),
    field: document.getElementById("rival-cards"),
    cost: document.getElementById("rival-cost"),
    deckData: [],
    heroData: null,
    fieldData: [],
    chosenCard: null,
    chosenCardData: null
};
var me = {
    hero: document.getElementById("my-hero"),
    deck: document.getElementById("my-deck"),
    field: document.getElementById("my-cards"),
    cost: document.getElementById("my-cost"),
    deckData: [],
    heroData: null,
    fieldData: [],
    chosenCard: null,
    chosenCardData: null
};
var turnButton = document.getElementById("turn-btn");
var turn = true;
function initiate() {
    [opponent, me].forEach(function (item) {
        item.deckData = [];
        item.heroData = null;
        item.fieldData = [];
        item.chosenCard = null;
        item.chosenCardData = null;
    });
    createDeck({ mine: false, count: 5 });
    createDeck({ mine: false, count: 5 });
    createHero({ mine: false });
    createHero({ mine: true });
    redrawScreen({ mine: true });
    redrawScreen({ mine: false });
}
initiate();
function createDeck(_a) {
    var mine = _a.mine, count = _a.count;
    var player = mine ? me : opponent;
    for (var i = 0; i < count; i++) {
        player.deckData.push(new Sub(mine));
    }
    redrawDeck(player);
}
function createHero(_a) {
    var mine = _a.mine;
    var plyaer = mine ? me : opponent;
    plyaer.heroData = new Hero(mine);
    connectCardDom({ data: plyaer.heroData, DOM: plyaer.hero, hero: true });
}
function connectCardDom(_a) {
    var data = _a.data, DOM = _a.DOM, hero = _a.hero;
    var cardEl = document
        .querySelector(".card-hidden .card")
        .cloneNode(true);
    cardEl.querySelector(".card-att").textContent = String(data.att);
    cardEl.querySelector(".card-hp").textContent = String(data.hp);
    if (hero) {
        cardEl.querySelector(".card-cost").style.display =
            "none";
        var name_1 = document.createElement("div");
        name_1.textContent = "영웅";
        cardEl.appendChild(name_1);
    }
    else {
        cardEl.querySelector(".card-cost").textContent = String(data.cost);
    }
    cardEl.addEventListener("click", function () {
        if (isSub(data) && data.mine === turn && !data.field) {
            if (!deckTofield({ data: data })) {
                createDeck({ mine: turn, count: 1 });
            }
        }
    });
    DOM.appendChild(cardEl);
}
function redrawScreen(_a) {
    var mine = _a.mine;
    var player = mine ? me : opponent;
    redrawHero(player);
}
function redrawHero(target) {
    if (!target.heroData) {
        throw new Error("hero Data가 없습니다.");
    }
    target.hero.innerHTML = "";
    connectCardDom({ data: target.heroData, DOM: target.hero, hero: true });
}
function redrawDeck(target) {
    target.deck.innerHTML = "";
    target.deckData.forEach(function (data) {
        connectCardDom({ data: data, DOM: target.deck });
    });
}
function redrawField(target) {
    target.field.innerHTML = "";
    target.fieldData.forEach(function (data) {
        connectCardDom({ data: data, DOM: target.field });
    });
}
function deckTofield(_a) {
    var data = _a.data;
    var target = turn ? me : opponent;
    var currentCost = Number(target.cost.textContent);
    if (currentCost < data.cost) {
        alert("코스트가 모자랍니다.");
        return true;
    }
    data.field = true;
    var idx = target.deckData.indexOf(data);
    target.deckData.splice(idx, 1);
    target.fieldData.push(data);
    redrawDeck(target);
    redrawField(target);
    target.cost.textContent = String(currentCost - data.cost); // 남은 코스트 줄이기
    return false;
}
// function forEach<T>(arr: T[], callback: (item: T) => void): void {
//   for (let i: number = 0; i < arr.length; i++) {
//     callback(arr[i]);
//   }
// }
