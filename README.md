# i18n-editor
[![npm](https://img.shields.io/npm/v/i18n-editor.svg)](https://www.npmjs.com/package/i18n-editor) [![npm-downloads](https://img.shields.io/npm/dm/i18n-editor.svg)](https://www.npmjs.com/package/i18n-editor)

i18n-editor를 사용하여 여러개로 분리되어 있는 다국어 `JSON` 번역 파일을 한 화면에서 관리하고 편집할 수 있습니다.

# Content
- [Features](#features)
- [Getting started](#getting-started)
    - [Installation](#installation)
    - [Run](#run)
- [Usage](#usage)
    - [Locale 디렉토리 선택](#locale-디렉토리-선택)
    - [Locale 디렉토리 생성](#locale-디렉토리-생성)
    - [다국어 번역 파일 선택 및 생성](#다국어-번역-파일-선택-및-생성)
    - [다국어 번역 파일 편집](#다국어-번역-파일-편집)
- [Features to be added](#features-to-be-added)

# Features

- 다국어 번역 파일을 관리하는 최상위 디렉토리인 **Locale 디렉토리**를 선택하거나 생성합니다.
- Locale 디렉토리 하위에 존재하는 다국어 번역 파일을 선택해서 편집하거나 새로운 파일을 생성할 수 있습니다.
- 새로운 언어를 편리하게 추가할 수 있습니다.
- 새로운 번역 정보 (`번역 key - 번역 value`) 추가 시 여러 언어에 대한 파일을 각각 수정하는 번거로움을 해결합니다. 편리하게 새로운 번역 정보를 추가할 수 있습니다.

# Getting started

[https://www.npmjs.com/package/i18n-editor](https://www.npmjs.com/package/i18n-editor)

## Installation
npm
```bash
$ npm install -D i18n-editor
```

yarn
```bash
$ yarn add -D i18n-editor
```

## Run

Terminal에 `npx i18n-editor` 명령어를 입력하여 애플리케이션을 실행시킬 수 있습니다. 이때, 포트 번호를 옵션으로 지정할 수 있습니다.

기본 옵션으로 실행 (4848번 포트 사용)
```bash
$ npx i18n-editor
```

실행 포트 옵션 (9000번 포트 사용)
```bash
$ npx i18n-eidtor -p 9000
```
```bash
$ npx i18n-editor --port 9000
```

명령어를 실행하면 브라우저 창이 새로 열리면서 애플리케이션이 실행됩니다.

# Usage

## Locale 디렉토리 선택

가장 먼저 다국어 번역 파일을 관리하는 최상위 디렉토리인 Locale 디렉토리를 선택합니다.

![Locale 디렉토리 선택](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/4e59ddf0-21b9-4181-a1b5-1209329c3b3e/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230129%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230129T085651Z&X-Amz-Expires=86400&X-Amz-Signature=9779a68c05f133b73da5526fe697fa0c5e4b4ac506b535bac4a77f3feb394e7a&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject)

Locale 디렉토리의 구조는 다음과 같아야 합니다.

```
📂locale directory
  📂ko
    🗒️common.json
    🗒️...
  📂en
    🗒️common.json
    🗒️...
  📂ja
    🗒️common.json
    🗒️...
  📂... (언어 코드명)
  ```

- Locale 디렉토리 내에는 **언어 코드로 된 이름**을 가진 디렉토리가 하나 이상 존재해야 합니다.
- 언어 코드로 된 이름을 가진 디렉토리 하위에 다국어 번역 파일이 존재합니다.

## Locale 디렉토리 생성

만약 위 조건에 맞지 않는 **유효하지 않은 디렉토리를 선택**하는 경우 선택한 디렉토리를 **Locale 디렉토리 조건에 맞도록** 만들 수 있습니다.

선택한 디렉토리 하위에 언어 코드로 된 이름을 가진 디렉토리가 없으면 **언어 코드명 디렉토리를 새로 생성**할 수 있습니다. 이 떄, 언어 코드명 디렉토리와 함께 **언어 코드명 디렉토리 하위**에 위치할 **다국어 번역 파일도 함께 생성**합니다.

## 다국어 번역 파일 선택 및 생성

선택한 Locale 디렉토리 하위 언어코드명 폴더 하위에 있는 다국어 번역 파일 중 편집할 파일을 선택합니다.

새로운 파일을 생성할 수도 있습니다. 새로 생성한 파일은 Locale 디렉토리에 존재하는 **모든 언어코드명 폴더 하위에 생성**됩니다.

![편집할 번역 파일 선택](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/2a954482-231c-4ca4-b387-925358b3cfe2/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230129%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230129T085748Z&X-Amz-Expires=86400&X-Amz-Signature=717b961087e1830f8862e993dea292769b33b3d784cf00baefca3827d0b2a7fb&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject)

💡 Locale 디렉토리 선택 후 편집할 다국어 번역 파일까지 선택하면 **다음 실행부터 마지막으로 선택된 Locale 디렉토리가 자동으로 선택**됩니다.

## 다국어 번역 파일 편집

### 번역 값 편집 (행 편집)

다국어 번역 파일을 선택하면 파일을 편집할 수 있는 표가 나타납니다. 파일에 번역 값이 없는 경우 새로운 번역 키를 추가합니다.

![새 번역 추가](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/68b1dd82-c3fa-481a-b9ee-02ccd862e8ec/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230129%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230129T085813Z&X-Amz-Expires=86400&X-Amz-Signature=65e9a23721eb18dde90a1bb5c2cb287d0008c1124562803e111c4c44b020f091&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject)

번역 키를 추가하면 해당 키에 대한 번역 값을 편집할 수 있습니다. **편집하려는 셀을 클릭**하면 Textarea가 활성화됩니다.

단, **번역 키값은 수정할 수 없습니다**.

![번역 값 편집](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/403d5f45-21bf-4441-b263-04dcd491e7f0/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230129%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230129T085836Z&X-Amz-Expires=86400&X-Amz-Signature=0eab3f1b9689a10312af17875442f5f620344387fadef0eee3f858f3a63f634d&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject)

편집하려는 행의 번역 key 셀(가장 좌측 열)의 우측 상단 버튼을 클릭하면 행 편집 옵션이 나타납니다.

![번역 편집](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/7e10b8aa-cac7-4353-9328-150425d3d5ff/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230129%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230129T085911Z&X-Amz-Expires=86400&X-Amz-Signature=7f2bc62723f0e99d51cbee993fea9f44ea6d4cb437a01e1984bb9e726a9521dc&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject)

`위쪽에 새 번역 추가`, `아래쪽에 새 번역 추가`를 클릭하여 원하는 위치에 **새 행을 추가**합니다.

`번역 값 지우기`를 클릭하여 선택된 행의 **모든 번역 값을 지웁니다**. 번역 키는 지워지지 않습니다.

`번역 삭제`를 클릭하여 **선택된 행을 삭제**합니다.

### 언어 편집 (열 편집)

Locale 디렉토리 하위에 있는 **언어코드명 디렉토리가 파일 편집 표의 열(Column)이 됩니다.**

```
📂locale directory	
  📂ko
    🗒️animal.json
  📂en
    🗒️animal.json
```

위 구조와 같이 Locale 디렉토리 내에 `en`, `ko` 언어코드명 디렉토리가 있다면 아래와 같이 다국어 편집 표에서 `en`과 `ko` 열을 확인할 수 있습니다.

![열 보기](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/92a94596-35b2-460b-9fea-70762d3e0d23/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230129%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230129T085946Z&X-Amz-Expires=86400&X-Amz-Signature=b0d8bee9eeee91d3790810ed9228aa9000b81953a9460b8a82cc2421f2feb4e4&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject)

표 좌측 상단의 `+ 언어 추가` 버튼을 클릭하여 새 언어를 추가할 수 있습니다.

언어 코드 셀(열 헤더)의 우측 상단 버튼을 클릭하면 열 편집 옵션이 나타납니다. **번역 키 열은 수정할 수 없습니다.**

![언어 편집](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/3009d691-dd3a-4ef8-8117-387b79404524/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230129%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230129T090043Z&X-Amz-Expires=86400&X-Amz-Signature=fabc574234220810690062a3ab7ceae583aa1b20dddea066d545a348bdbfe385&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject)

`언어 삭제`를 클릭하여 선택된 열의 언어를 삭제할 수 있습니다.

🚨언어를 삭제하면 **Locale 디렉토리 하위의 언어 코드명 디렉토리가 삭제**되기 때문에 현재 편집하고 있는 파일 외에 **다른 모든 파일에서도 선택된 언어가 삭제**됩니다.

# Features to be added

- 행 순서 변경
- 애플리케이션의 국제화 (다국어 지원)
- CSV import, export
