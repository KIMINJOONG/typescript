# 제로초님의 타입스크립트 강좌를 보며 만드는 프로젝트

---

- npm i typescript, npm i -g typescript해주기
- 터미널에서 tsc lecture.ts 를 해주면 ts파일을 .js파일로 컴파일시켜준다.

## 몰랐던점

- 타입스크립트라고 무조건 타입을 붙여줄 필요는 없다. 명확한 타입은 안붙여줘도됨

### .d.ts?

- typescript에서 자동완성이 되는경우? 누군가 .d.ts를 만들어뒀기때문에!
- .ts = 실제코드(프로그래밍), d.ts = 타입을 직접만들어야하는경우 타입들만선언해준 파일

### tsconfig에서 중요한것

- allowJS = true설정시, 자바스크립트를 컴파일 시켜준다. 점진적으로 ts로 변경가능
- declaration = true설정시,시 .d.ts파일 생성
- 나머지는 공식문서를 보는게 좋을것같다. 이하 생략~
- strict가 붙은 옵션과 noImplictit이 붙은 옵션은 들은 전부 true로 켜두는게 좋다 안그러면 타입스크립트를 쓰는 의미가 매우 줄어듬
- 타입스크립트는 ES3까지도 변환해주는 설정(target)이 있다.
- import \* as React와 import React는 엄청난 차이가 존재한다 특히 export default를 할때
- 초보자라면 strict : true설정만해줘도 가능하다.
- lib옵션을 따로 설정한다면 ["ES6", "ES2020", "ES2019"]이렇게 다 넣어주는게 좋다.
- include설정은 어떤 특정파일만 컴파일하겠다.
- exclude : ["*.js"] => js파일은 컴파일하지 않겠다.
- 여러개 프로젝트가 있는경우 공통 tsconfig가 있고 프로젝트마다 별개의 tsconfig설정이 존재할경우 extends에서 설정
- 타입스크립트 핸드북을 처음부터 끝까지 읽어보기 -> what's new 1.1~3.7까지 정독

### 배열

- 배열의 개수가 3인경우, 엄격하게 하는것이좋다

```
let arr: number[] = [1,2,3,4];
let arr: string[] = ['1','2','3'];
let arr: [boolean, number, string] = [true, 2, '3']; // Tuple

arr[4] = true => 에러
```

### 상수

- 타입을 엄격하게 지정하여 상수처럼 사용 가능
- 객체 역시 const를 붙여주면 안에 내부값도 변경 할 수 없다.

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

- 타입을 선언했는데 처음에는 없다가 나중에 생기는 경우! ?를 붙여주면 된다! 있을지 없을지 모르는경우에는 뒤에 ?꼭 붙여주기

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

- 타입을 명시해서 함수를 작성하는 방법
- 함수에 return을 사용하지않을시 void로 타입을 선언해주면 됨

```
function add(a: number, b: number): number {
    return a + b;
}
```

- 함수가 함수를 리턴할때(고차함수)
- 함수 자체를 타입으로 쓸때는 매개변수 => 리턴타입으로 해주면됨 (고차함수는 가독성이 매우 안좋아진다.)

```
function add(a: number, b: number): (c: string) => number {
    return (c: string) => {
        return 3;
    }
}
```

- 객체안에 함수가 존재하는 경우

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

- 대부분의 경우는 배열을 의도와다르게 잘못만들었을때 never 라는 에러가 발생한다.
- 타입을 빈배열로 만들고 푸시를 하면 never에러 발생
- any는 뭐든 다 될수있다 배열, 스트링, 넘버, 오브젝트 등 그러나 타입스크립트를 쓰는데 any를 쓰는건 좋지않다. 그러나 어쩔수없는 경우에는 사용해야함 또는 타입 정의 할때 너무 복잡해서 못만들겠을 경우사용

### 타입캐스팅

- ex)리액트 플러그인? 등 라이브러리 만들때 다음상황이 많이 생긴다.

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

- 남이만들어놓은 타입은 타입추론을 이용한게 좋다. 왜냐? 혹시나 업데이트를 해버리면 괜히 타입붙혔다가 에러가 발생함
- 내가 만들어놓은것만 붙여주는게 좋다.

### npx란?

- npx를 사용하면 global로 설치하지 않아도 명령어 사용가능하다. npm i typescript, npm i -g typescript에서 -g로 설치안해도 npx붙이면 전역으로 명령어 사용가능
- 프로젝트 버전과 명령어(npm i -g로 설치한)버전과 동일하지 않을경우 에러가 날수있기때문에 npx를 사용해주는것이좋다!
  ex) package.json에서 typescript버전은 3.x인데 -g로 설치한 버전이 4.x라면?? 에러가 생길수있다!@ npx를 사용시 해당 프로젝트의 버전을 이용해서 명령어를 사용함
