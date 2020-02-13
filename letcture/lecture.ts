interface ICard {
  att?: number;
  hp?: number;
  cost?: number;
}

class Card implements ICard {
  protected att?: number;
  protected hp?: number;
  private cost?: number;
  private mine?: boolean;

  constructor(hero: boolean, mine: boolean) {
    if (hero) {
      return new Hero(mine);
    } else {
      this.att = Math.ceil(Math.random() * 5);
      this.hp = Math.ceil(Math.random() * 5);
      this.cost = Math.floor((this.att + this.hp) / 2);
    }
    if (mine) {
      this.mine = true;
    }
  }
}

class Hero extends Card {
  private hero: boolean;
  private field: boolean;
  constructor(mine: boolean) {
    super(true, mine);
    this.att = Math.ceil(Math.random() * 2);
    this.hp = Math.ceil(Math.random() * 5) + 25;
    this.hero = true;
    this.field = true;
  }
}

interface Card {
  att: number;
  hp: number;
  cost: number;
}
interface Player {
  hero: HTMLDivElement;
  deck: HTMLDivElement;
  field: HTMLDivElement;
  cost: HTMLDivElement;
  deckData: Card[];
  heroData?: Card | null;
  fieldData: Card[];
  chosenCard?: HTMLDivElement | null;
  chosenCardData?: Card | null;
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
