# 제로초님의 타입스크립트 강좌를 보며 만드는 프로젝트

---

-   npm i typescript, npm i -g typescript해주기
-   터미널에서 tsc lecture.ts 를 해주면 ts파일을 .js파일로 컴파일시켜준다.

## 몰랐던점

-   타입스크립트라고 무조건 타입을 붙여줄 필요는 없다. 명확한 타입은 안붙여줘도됨

### .d.ts?

-   typescript에서 자동완성이 되는경우? 누군가 .d.ts를 만들어뒀기때문에!
-   .ts = 실제코드(프로그래밍), d.ts = 타입을 직접만들어야하는경우 타입들만선언해준 파일

### tsconfig에서 중요한것

-   allowJS = true설정시, 자바스크립트를 컴파일 시켜준다. 점진적으로 ts로 변경가능
-   declaration = true설정시,시 .d.ts파일 생성
-   나머지는 공식문서를 보는게 좋을것같다. 이하 생략~
-   strict가 붙은 옵션과 noImplictit이 붙은 옵션은 들은 전부 true로 켜두는게 좋다 안그러면 타입스크립트를 쓰는 의미가 매우 줄어듬
-   타입스크립트는 ES3까지도 변환해주는 설정(target)이 있다.
-   import \* as React와 import React는 엄청난 차이가 존재한다 특히 export default를 할때
-   초보자라면 strict : true설정만해줘도 가능하다.
-   lib옵션을 따로 설정한다면 ["ES6", "ES2020", "ES2019"]이렇게 다 넣어주는게 좋다.
-   include설정은 어떤 특정파일만 컴파일하겠다.
-   exclude : ["*.js"] => js파일은 컴파일하지 않겠다.
-   여러개 프로젝트가 있는경우 공통 tsconfig가 있고 프로젝트마다 별개의 tsconfig설정이 존재할경우 extends에서 설정
-   타입스크립트 핸드북을 처음부터 끝까지 읽어보기 -> what's new 1.1~3.7까지 정독

### 배열

-   배열의 개수가 3인경우, 엄격하게 하는것이좋다

```
let arr: number[] = [1,2,3,4];
let arr: string[] = ['1','2','3'];
let arr: [boolean, number, string] = [true, 2, '3']; // Tuple

arr[4] = true => 에러
```

### 상수

-   타입을 엄격하게 지정하여 상수처럼 사용 가능
-   객체 역시 const를 붙여주면 안에 내부값도 변경 할 수 없다.

```
let str = 'hello' as const;
str = 'hi' -> error
let arr = [true, 2, '3'] as const;

const obj = { a: 'b' } as const;
obj.a = 'c';


```

### 객체에서 타입선언

```
const obj : { a: string, b: number } = { a: 'b'}; => error, 타입에는 b가있지만 실제 값에 b가 존재하지않아서
```

-   타입을 선언했는데 처음에는 없다가 나중에 생기는 경우! ?를 붙여주면 된다! 있을지 없을지 모르는경우에는 뒤에 ?꼭 붙여주기

```
const obj : { a: string, b?: number } = { a: 'b'};

obj.b = 3
```

### enum

```
enum Color { Red, Green, Blue}
let c: Color = Color.Green;
```

### 함수

-   타입을 명시해서 함수를 작성하는 방법
-   함수에 return을 사용하지않을시 void로 타입을 선언해주면 됨

```
function add(a: number, b: number): number {
    return a + b;
}
```

-   함수가 함수를 리턴할때(고차함수)
-   함수 자체를 타입으로 쓸때는 매개변수 => 리턴타입으로 해주면됨 (고차함수는 가독성이 매우 안좋아진다.)

```
function add(a: number, b: number): (c: string) => number {
    return (c: string) => {
        return 3;
    }
}
```

-   객체안에 함수가 존재하는 경우

```
const obj2: { a: (b: number) => string } = {
    a(b: number) {
        return 'hello'
    }
}

// 매개변수가 있어도 되고 없어도 되는경우 ?를 붙여준다. 오버로딩
const obj2: { a: (b?: number) => string } = {
    a(b?: number) {
        return 'hello'
    }
}
```

### never, any

-   대부분의 경우는 배열을 의도와다르게 잘못만들었을때 never 라는 에러가 발생한다.
-   타입을 빈배열로 만들고 푸시를 하면 never에러 발생
-   any는 뭐든 다 될수있다 배열, 스트링, 넘버, 오브젝트 등 그러나 타입스크립트를 쓰는데 any를 쓰는건 좋지않다. 그러나 어쩔수없는 경우에는 사용해야함 또는 타입 정의 할때 너무 복잡해서 못만들겠을 경우사용

### 타입캐스팅

-   ex)리액트 플러그인? 등 라이브러리 만들때 다음상황이 많이 생긴다.

```
const hello: number = 3;

완전히 다른타입으로 바꾸는 경우?(강제로 변경)

아래와 같이 number타입을 string타입으로 캐스팅을 할 수 있다.
(hello as unknown as string).substr(1,2);
(<string><unknown>hello).substr(1,2);

서로 관계가 있는경우?(상속을 받는지 등)
const div = document.createElement("div");
const a = div as HTMLElement;
```

#### 타입은 언제붙히는게 좋을까

-   남이만들어놓은 타입은 타입추론을 이용한게 좋다. 왜냐? 혹시나 업데이트를 해버리면 괜히 타입붙혔다가 에러가 발생함
-   내가 만들어놓은것만 붙여주는게 좋다.

#### interface

```
interface RSP {
  ROCK: "0";
  SCISSOR: "-142px";
  PAPER: "-284px";
}

const rsp: RSP = {
  ROCK: "0",
  SCISSOR: "-142px",
  PAPER: "-284px"
} as const;

위와같이 해줘도 무방하지만 보통 interface에서는 저렇게 값을 넣지않고 타입을 선언해주기때문에
앞에 readonly를 붙혀주는게 좋다

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
```

1. 특징

-   객체를 어떤형식으로 만들어야할지(클래스와 비슷함)
-   서로간의 상속이 가능하다.
-   같은 이름으로 여러개를 만들수있고 js로 변환될때 하나로 합쳐짐(남의 라이브러리가 문제점이 있거나 수정하고싶을때 사용하면 됨)
-   주로 객체에 많이 사용함

#### 객체의 인터페이스가 확실하지 않을때?

-   왠만하면 타입을 엄격하게 지정하는게 좋지만 정말 불가피한 상황일때는 아래와 같이 interface를 선언하여 여유를 준다.

```
interface Example {
  a: 3,
  b: 7,
  [key: string]: number;
}

const example: Example = {
  a: 3,
  b: 7,
  c: 1
}

```

#### type ?(타입 앨리어스라고 부름)

1. 특징

-   인터페이스처럼 합쳐지지 않는다. 무조건 하나만 존재함
-   타입이 좀 더 넓은 범위
-   보통 | 과 같이 씀, 객체를 사용할때는 왠만하면 인터페이스를 사용하는게 좋다. 한 코드에서 두가지 방식을 쓰는건 좋지않다.
-   타입시스템을 쓸 경우에 주로 많이 사용
-   아래와 같이 새로운 타입을 만들어냄

```
type Hello = string | number;

type Hello = {
  ROCK: string;
  PAPER: string;
} | string;

```

---

-   tsconfig에서 lib를 설정하지않으면 기본값으로 es5와 dom만 사용한다.
-   혹시나 es6문법이나 그이상의 문법을 사용한다면 아래와같이 추가해주면된다.

```
tsconfig.json

{
  "compilerOptions": {
    "strict": true,
    "lib": [
      "ES5",
      "ES6",
      "ES2016",
      "ES2017",
      "ES2018",
      "ES2019",
      "ES2020",
      "DOM"
    ]
  },
  "exclude": ["*.js"]
}

```

-   아래의 상황처럼 imgCoords)!에서 !는?
-   타입시스템에서는 값이 없을수있다고 경고를 하지만 개발자인 내가 무조건 값이 있다는 보증을 하는것이다. 즉 타입스크립트에서 undefined경고를 줬지만 프로그래머가 무시를 하는것이기때문에 실수를하면 에러가 날 가능성이 있다. null일 경우도 가능

```
function computerChoice(imgCoords: RSP[keyof RSP]): keyof RSP {
  return (Object.keys(rsp) as ["ROCK", "SCISSOR", "PAPER"]).find(
    (k) => rsp[k] === imgCoords)!
  );
}
```

-   함수안에서 this를 사용할경우 매개변수첫번째에 this가 무엇인지 타입을 꼭 정해주어야한다.

```
document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("click", function(this:HTMLButtonElement, e: Event) {
    const myChoice = this.textContent;
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
```

---

## 타입스크립트에서 null과 undefined

-   tsconfig.json에서 "strictNullChecks": true, 옵션을 추가해주면 null과 undefined를 구분한다.
-   변수명뒤에 ?를 붙여도 해당 물음표는 undefined를 의미하는것이기 때문에 null은 제외가 된다. 빈 값을 의도적으로 넣었음을 알리기 위해 null을 사용
-   타입스크립트의 효과를 보려면 strict옵션은 무조건 true로 주는게 가장좋다!

```
{
  "compilerOptions": {
    "strict": true,
    "strictNullChecks": true,
    "lib": [
      "ES5",
      "ES6",
      "ES2016",
      "ES2017",
      "ES2018",
      "ES2019",
      "ES2020",
      "DOM"
    ]
  },
  "exclude": ["*.js"],
  "include": ["lecture.ts"]
}

```

---

#### class?

-   public, protected, private이 존재, 각각의 의미와 사용법은 자바랑 동일하다고 보면된다.

1. public

-   모두에게 공개

2. protected

-   자식에게만 공개(부모에게는 공개안함)

3. private

-   외부에서 접근 불가

-   interface에서는 public, protected, private는 사용할수 없다.

#### interface?

-   존재해야되는것을 강제해야할때 주로 클래스에서 상속받아서 사용함
-   꼭 객체를 표현하는거 뿐만아니라, 함수나 클래스도 표현해줄 수 있긴 하지만 잘 안쓰는듯 하다..?

#### Generic(제네릭)?

-   타입스크립트를 보면 <>를 볼 수 있다. 쉽게 얘기하면 짝맞추기 입니다.
-   아래의 함수로 나는 분명히 숫자도 더하게 하고 싶고 문자도 더하고 싶은 경우

```
function add(a: number, b: number) {
  return a + b;
}

function add(a: string, b: string) {
  return a + b;
}

중복 에러 발생


function add(a: string | number, b: string | number): string | number {
  return a + b;
}
add(1, 'abc');
add(1, 2);
add('a', 'b');

셋 다 가능 하지만 나의 의도는 숫자끼리, 문자끼리만 더 할 수 있게하고싶은 경우? add(1, 'abc')는 에러가 나야하는경우?
그럴 때 사용하는 것이 제네릭!
```

-   그럼 제네릭을 사용한 경우를 알아보자

```
interface obj<T> {
  add: (a: T, b: T) => T;
}

const a: obj<number> = {
  add: (a, b) => a + b;
}

const b: obj<string> = {
  add: (a, b) => a + b;
}
a.add(1,2);
a.add('a', 'b'); => error
b.add('a', 'b');
b.add(1,2); => error
```

-   인터페이스 선언은 여유롭게! 실제 함수로 사용할때는 확실하게!
-   callback에서 특별히 true, false를 반환하는 함수는 predicate라고 이름을 붙힌다. .find 함수 타입참조
-   특별히 true, false를 반환하지않으면 callback

### 타입가드?

-   is를 사용해서 카드라는 큰 클래스가 있으면 그중에서 쫄병인지 아닌지 구분이 됨

```
function isSub(data: Card): data is Sub {
  if (data.cost) {
    //쫄병이면
    return true;
  }
  return false;
}
```

### nodejs의 모듈시스템

-   common js라고 부름.
-   typescript의 모듈시스템은 따로있음. 자바스크립트의 최신문법 ES2015모듈 시스템을 그대로 계승

#### 둘의 차이?

-   모듈은 다른파일에서 사용할수있게끔 만드는것. 코딩을 계속하다보면 한파일이 길어지니까 가독성과 재사용성을 높이기위해 모듈로 만들어줌
-   typescript는 commonJS도 지원한다.
-   큰 차이는 default에서 차이가남 다이나믹인지 스태틱인지, 동적인지 정적인지
-   exports와 module.exports는 둘중에 하나만 쓰는게 좋다.
-   export와 export default 즉 default라는게 생기고 module.exports는 사라짐
-   default라는게 새로 생겨서 export와 충돌하지않는다.

```
export const a = 'b';
// exports.a = 'b';

export default function() {

};
// module.exports = function() {}; -> 같지않음
```

-   어떤 모듈이 commonJS문법으로 작성됐다면? 타입스크립트에서 가져올때는..

```
import * as hi from './module';로 가져오는게 문법적으로 맞다! 주의할것
import hi from './module';로 사용하고싶다면 esModuleInterop을 true옵션을 줘야함
```

-   정리: commonJS문법으로 작성된것을 import할때는 반드시 import \* as 이름명 from './module';로 가져올것!

---

-   import와 export가 있으면 모듈이되고 없으면 그냥 스크립트임.
-   보통 interface등 타입선언과 관련된것은 모듈로빼서 재사용성과 가독성을 높이는게 좋다.

### d.ts

-   라이브러리에 사용되는 모든 타입들을 선언해둔 ㅍ파일
-   내 프로젝트가 라이브러리 일때 사용.

```
function a() {}

export = a;

```

-   그런것들을 import할때는 require을 사용한다. 위와같은 소스는 commonJS문법이기 때문에

### 남의 패키지 사용하기

-   타입이 없는거를 새로 타입을 선언할때 declare d.ts파일에서 사용

-   리덕스 소스중..

```
declare const $CombinedState: unique symbol
```

---

1.  트리플 슬래쉬?

-   트리플 슬래쉬 레퍼런스라고 부름 특수한 기능을한다. 보통 d.ts파일 가장윗부분에 위치.

-   path와 types가 존재 path는 경로를 적어주고, types는 패키지 이름을 적어줌
-   프로젝트 코딩할땐 쓸 필요가 별로없고, 내 라이브러리를 만들때, 필요한 타입들을 만들때 사용

```
/// <reference types="symbol-observable" />
```

### DefinitelyTyped?

-   타입이 안되어있는 라이브러리들을 누군가가 타입을 만들어 놓은것! d3js, jQuery, react등등
-   자체적으로 타입을 지원하지않는 라이브러리라면 @types/jquery, @types/라이브러리명 을하여서 타입을 받아서 사용하는게 좋다

### intersection & call, apply

```
interface A {
    hello: true;
}

interface B {
    bye: true;
}

type C = {
    hi: false;
};

const a: A = {
    hello: true
};

const b: B = {
    bye: true
};

아래는 인터섹션 3개 전부 만족해야함
const c: A & B & C = {
    hello: true,
    bye: true,
    hi: false
};

아래는 셋중 하나만 만족하면 됌
const c: A | B | C = {
  hello: true,
}

```

1. 처음부터 만족하게 만들면 되는데 왜 A B C를 쪼개놓은걸까?

-   만일 interface D가 필요한데 아래와 같을때 이미 존재하는 A, B, C와 중복이 되기때문에 중복 최소화

```
interface D {
    hello: true;
    bye: true;
    hi: false;
}
```

2. call, bind, apply는 타입추론이 잘 안된다.

-   그러나 타입스크립트가 업데이트되면서 strictBindCallApply라는 옵션이 생겨서 true를 주면 더 엄격하게 변한다.
-   엄격해지면 너무 복잡해져서 단점도 있다.

```
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
```

-   같은함수가 타입이 현저하게 다른건 여러개 나열하는데 이걸 function 오버로딩이라고 한다.
-   타이핑이 힘들다. any타입을 최대한 지향해야하지만..써줄수밖에없다.

### ts utility Types

-   ts 핸드북에 있는거 꼭 보기!!

1. partial

-   인터페이스로 선언된 A의 일부분만 써줄수있다.

```
interface A {
    a: "b";
    c: true;
    d: 123;
}
const a: A = {
    a: "b",
    c: true,
    d: 123
};

const b: Partial<A> = {
    c: true,
    d: 123
};
```

2. Readonly<제네릭>

-   하나하나 readonly를 붙혀줄필요없이 전부적용

```
interface A {
    a: "b";
    c: true;
    d: 123;
}
const c: Readonly<A> = {
    a: "b",
    c: true,
    d: 123
};
```

3. Pick<T,K>

-   인터페이스에 선언된것중 명시한것만 뽑아서 사용하겠다

```
interface Todo {
    title: string;
    desc: string;
    completed: boolean;
}

type TodoPreview = Pick<Todo, "title" | "completed">;

const todo: TodoPreview = {
    title: "Clean room",
    completed: false
};
```

4. Omit

-   Pick과 딱 반대

-   중복되는 코드와 중복되는 행동들을 줄이기 위해서는 ts공식문서에서 utility types 꼭 보기!!

### npx란?

-   npx를 사용하면 global로 설치하지 않아도 명령어 사용가능하다. npm i typescript, npm i -g typescript에서 -g로 설치안해도 npx붙이면 전역으로 명령어 사용가능
-   프로젝트 버전과 명령어(npm i -g로 설치한)버전과 동일하지 않을경우 에러가 날수있기때문에 npx를 사용해주는것이좋다!
    ex) package.json에서 typescript버전은 3.x인데 -g로 설치한 버전이 4.x라면?? 에러가 생길수있다!@ npx를 사용시 해당 프로젝트의 버전을 이용해서 명령어를 사용함
