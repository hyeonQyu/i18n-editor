# locale-json-manager
## 개발 동기
[React.js, Next.js에서 편리하게 다국어 json 파일 관리하기](https://velog.io/@hyeonq/React.js-Next.js%EC%97%90%EC%84%9C-%ED%8E%B8%EB%A6%AC%ED%95%98%EA%B2%8C-%EB%8B%A4%EA%B5%AD%EC%96%B4-json-%ED%8C%8C%EC%9D%BC-%EA%B4%80%EB%A6%AC%ED%95%98%EA%B8%B0)

## 사용 방법
### 설치
https://www.npmjs.com/package/locale-json-manager

devDependency에 추가
```
npm
$ npm install -D locale-json-manager

yarn
$ yarn add -D locale-json-manager
```

### 실행
```
4848번 포트 사용 (기본값)
$ npx ljm

9000번 포트 사용
$npx ljm -p 9000
$npx ljm --port 9000
```

### 실행 화면
애플리케이션을 실행시키면 브라우저 창이 켜지면서 아래와 같은 화면이 나타납니다.

![](https://velog.velcdn.com/images/hyeonq/post/e3bac1cb-0cb3-43a1-ba76-94d8b4d85a0c/image.png)

#### locale 폴더
다국어 파일을 갖고 있는 언어별 폴더가 생성될 폴더의 경로입니다.
기본값은 **${projectDirectory}/public/locales** 입니다.

#### 다국어 JSON 파일
편집할 언어 파일을 첨부합니다.
파일 첨부 시 아래 `다국어 JSON 파일을 선택하세요` 영역에 파일 내용이 표시됩니다.

#### 기본 언어 설정
JSON 파일에서 key값으로 입력할 기본 언어를 설정합니다.
`영어`와 `한국어`를 지원하는 경우 기본 언어를 `한국어`로 선택 후 `common.json`파일에 `안녕하세요`라는 문구를 추가하면 다음과 같이 저장됩니다.  
**locales > ko > common.json**
```json
{
  "안녕하세요": "안녕하세요"
}
```
**locales > en > common.json**
```json
{
  "안녕하세요": ""
}
```

#### 지원 언어 설정
지원하는 언어만큼 locales 폴더 하위에 JSON 파일이 생성됩니다.
`영어`, `한국어`, `일본어`를 선택하고 `common.json`파일을 편집한 경우 아래와 같이 저장됩니다.

📂locales  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;📂ko  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;🗒️common.json  
&nbsp;&nbsp;&nbsp;&nbsp;📂en  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;🗒️common.json  
&nbsp;&nbsp;&nbsp;&nbsp;📂ja  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;🗒️common.json  

#### 문구 추가
`추가할 문구를 입력하세요`라고 적혀있는 input field에 문구를 입력하고 엔터키를 누르면 문구가 추가됩니다.

#### 문구 찾기
`문구 찾기` 영역에 찾으려는 문구를 입력하여 필터링 할 수 있습니다.

#### 문구 삭제
문구 옆 X버튼을 클릭하여 추가한 문구를 삭제할 수 있습니다.

![](https://velog.velcdn.com/images/hyeonq/post/7e4a4832-55db-4fcd-a0cf-c23d8a849fe7/image.png)

#### 저장
Ctrl + S 단축키를 입력하여 변경한 내용을 저장합니다.
