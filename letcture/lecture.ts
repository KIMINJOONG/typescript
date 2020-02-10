let imgCoords = "0";

interface RSP {
  readonly ROCK: "0";
  readonly SCISSOR: "-142px";
  readonly PAPER: "-284px";
}

const rsp: RSP = {
  ROCK: "0",
  SCISSOR: "-142px",
  PAPER: "-284px"
};

interface Example {
  a: 3;
  b: 7;
  [key: string]: number;
}

const score = {
  ROCK: 0,
  SCISSOR: 1,
  PAPER: -1
} as const;

// ROCK | SCISSORS | PAPER // union 이라고 부른다
function computerChoice(imgCoords: RSP[keyof RSP]): keyof RSP {
  return (Object.keys(rsp) as ["ROCK", "SCISSOR", "PAPER"]).find(
    (k) => rsp[k] === imgCoords)!
  );
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
