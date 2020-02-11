"use strict";
var imgCoords = "0";
var rsp = {
    ROCK: "0",
    SCISSORS: "-142px",
    PAPER: "-284px"
};
var score = {
    ROCK: 0,
    SCISSORS: 1,
    PAPER: -1
};
// ROCK | SCISSORS | PAPER // union 이라고 부른다
function computerChoice(imgCoords) {
    return Object.keys(rsp).find(function (k) { return rsp[k] === imgCoords; });
}
document.querySelectorAll(".btn").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
        var myChoice = this.textContent;
        var myScore = score[myChoice];
        var computerScore = score[computerChoice(imgCoords)];
        var diff = myScore - computerScore;
        if (diff === 0) {
            console.log("비겼습니다.");
        }
        else if ([-1, 2].indexOf(diff)) {
            console.log("이겼습니다!!");
        }
        else {
            console.log("졌습니다 ㅜㅜ");
        }
    });
});
