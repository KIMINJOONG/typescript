import { Card, Player } from "./types";
class Hero implements Card {
  public att: number;
  public hp: number;
  public hero: boolean;
  public field: true;
  public mine: boolean;
  constructor(mine: boolean) {
    this.mine = mine;
    this.att = Math.ceil(Math.random() * 2);
    this.hp = Math.ceil(Math.random() * 5) + 25;
    this.hero = true;
    this.field = true;
  }
}

class Sub implements Card {
  public att: number;
  public hp: number;
  public field: boolean = false;
  public mine: boolean;
  public cost: number;
  constructor(mine: boolean) {
    this.mine = mine;
    this.att = Math.ceil(Math.random() * 2);
    this.hp = Math.ceil(Math.random() * 5) + 25;
    this.cost = Math.floor((this.att + this.hp) / 2);
  }
}

// 타입 가드
function isSub(data: Card): data is Sub {
  if (data.cost) {
    //쫄병이면
    return true;
  }
  return false;
}

function isHero(data: Card): data is Sub {
  if (data.hero) {
    //영웅이면
    return true;
  }
  return false;
}

const opponent: Player = {
  hero: document.getElementById("rival-hero") as HTMLDivElement,
  deck: document.getElementById("rival-deck") as HTMLDivElement,
  field: document.getElementById("rival-cards") as HTMLDivElement,
  cost: document.getElementById("rival-cost") as HTMLDivElement,
  deckData: [],
  heroData: null,
  fieldData: [],
  chosenCard: null,
  chosenCardData: null
};

const me: Player = {
  hero: document.getElementById("my-hero") as HTMLDivElement,
  deck: document.getElementById("my-deck") as HTMLDivElement,
  field: document.getElementById("my-cards") as HTMLDivElement,
  cost: document.getElementById("my-cost") as HTMLDivElement,
  deckData: [],
  heroData: null,
  fieldData: [],
  chosenCard: null,
  chosenCardData: null
};

const turnButton = document.getElementById("turn-btn") as HTMLButtonElement;
let turn = true;

function initiate() {
  [opponent, me].forEach(item => {
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

function createDeck({ mine, count }: { mine: boolean; count: number }) {
  const player = mine ? me : opponent;
  for (let i: number = 0; i < count; i++) {
    player.deckData.push(new Sub(mine));
  }
  redrawDeck(player);
}

function createHero({ mine }: { mine: boolean }) {
  const plyaer = mine ? me : opponent;
  plyaer.heroData = new Hero(mine);
  connectCardDom({ data: plyaer.heroData, DOM: plyaer.hero, hero: true });
}

function connectCardDom({
  data,
  DOM,
  hero
}: {
  data: Card;
  DOM: HTMLDivElement;
  hero?: boolean;
}) {
  const cardEl = document
    .querySelector(".card-hidden .card")!
    .cloneNode(true) as HTMLDivElement;
  cardEl.querySelector(".card-att")!.textContent = String(data.att);
  cardEl.querySelector(".card-hp")!.textContent = String(data.hp);
  if (hero) {
    (cardEl.querySelector(".card-cost") as HTMLDivElement).style.display =
      "none";
    const name = document.createElement("div");
    name.textContent = "영웅";
    cardEl.appendChild(name);
  } else {
    cardEl.querySelector(".card-cost")!.textContent = String(data.cost);
  }
  cardEl.addEventListener("click", () => {
    if (isSub(data) && data.mine === turn && !data.field) {
      if (!deckTofield({ data })) {
        createDeck({ mine: turn, count: 1 });
      }
    }
  });
  DOM.appendChild(cardEl);
}

function redrawScreen({ mine }: { mine: boolean }) {
  const player = mine ? me : opponent;
  redrawHero(player);
}

function redrawHero(target: Player) {
  if (!target.heroData) {
    throw new Error("hero Data가 없습니다.");
  }
  target.hero.innerHTML = "";
  connectCardDom({ data: target.heroData, DOM: target.hero, hero: true });
}

function redrawDeck(target: Player) {
  target.deck.innerHTML = "";
  target.deckData.forEach(data => {
    connectCardDom({ data, DOM: target.deck });
  });
}

function redrawField(target: Player) {
  target.field.innerHTML = "";
  target.fieldData.forEach(data => {
    connectCardDom({ data, DOM: target.field });
  });
}

function deckTofield({ data }: { data: Sub }): boolean {
  const target = turn ? me : opponent;
  const currentCost = Number(target.cost.textContent);
  if (currentCost < data.cost) {
    alert("코스트가 모자랍니다.");
    return true;
  }
  data.field = true;
  const idx = target.deckData.indexOf(data);
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
