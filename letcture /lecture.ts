interface A {
    hello: true;
}

interface B {
    bye: true;
}

type C = {
    hi: false;
};

interface D {
    hello: true;
    bye: true;
    hi: false;
}

const a: A = {
    hello: true
};

const b: B = {
    bye: true
};

const c: A & B & C = {
    hello: true,
    bye: true,
    hi: false
};

const reuslt = Array.prototype.map.call([1, 2, 3], item => {
    return item.toFixed(1);
});

// [1,2,3] = T, (item) => {return item.toFiexed(1)} = Args
// [1,2,3].map((item => {return item.toFiexed(1)}))

// 정확하게 타이핑을 해주면 아래와 같다.
const reuslt1 = Array.prototype.map.call<
    number[],
    [(item: number) => string],
    string[]
>([1, 2, 3], item => {
    return item.toFixed(1);
});

//result: ['1.0', '2.0', '3.0']

const result2 = Array.prototype.map.call([1, 2, 3], item => {
    return item.toFiexed(1);
});
