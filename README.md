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

### npx란?

- npx를 사용하면 global로 설치하지 않아도 명령어 사용가능하다. npm i typescript, npm i -g typescript에서 -g로 설치안해도 npx붙이면 전역으로 명령어 사용가능
- 프로젝트 버전과 명령어(npm i -g로 설치한)버전과 동일하지 않을경우 에러가 날수있기때문에 npx를 사용해주는것이좋다!
  ex) package.json에서 typescript버전은 3.x인데 -g로 설치한 버전이 4.x라면?? 에러가 생길수있다!@ npx를 사용시 해당 프로젝트의 버전을 이용해서 명령어를 사용함
