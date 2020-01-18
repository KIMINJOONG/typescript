let numberOne = Math.ceil(Math.random() * 9);
let numberTwo = Math.ceil(Math.random() * 9);

let result = numberOne * numberTwo;

const word = document.createElement("div");
word.textContent = `${numberOne} 곱하기 ${numberTwo}`;
document.body.append(word);

const form = document.createElement("form");
document.body.append(form);

const input = document.createElement("input");
input.type = "number";
