let imgCoords = "0";

interface RSP {
  readonly ROCK: string;
  readonly SCISSOR: string;
  readonly PAPER: string;
}

const rsp: RSP = {
  ROCK: "0",
  SCISSOR: "-142px",
  PAPER: "-284px"
};

const score = {
  ROCK: 0,
  SCISSOR: 1,
  PAPER: -1
} as const;

function computerChoice(imgCoords): "ROKC" | "SCISSORS" | "PAPER" {
  return Object.keys(rsp).find(k => rsp[k] === imgCoords);
}

document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("click", function() {
    const myChoice = this.textContetnt;
    const myScore = score[myChoice];
    const computerScore = score[computerChoice(imgCoords)];
    const diff = myScore - computerScore;
    if (diff === 0) {
      console.log("비겼습니다.");
    } else if ([-1, 2].indexOf(diff)) {
      console.log("이겼습니다!!");
    } else {
      console.log("졌습니다 ㅜㅜ");
    }
  });
});
