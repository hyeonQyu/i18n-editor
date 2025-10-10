# i18n-editor

[![npm](https://img.shields.io/npm/v/i18n-editor.svg)](https://www.npmjs.com/package/i18n-editor) [![npm-downloads](https://img.shields.io/npm/dm/i18n-editor.svg)](https://www.npmjs.com/package/i18n-editor)

i18n-editor는 다국어 JSON 번역 파일을 효율적으로 관리할 수 있는 데스크톱 에디터입니다. 여러 워크스페이스를 전환하면서 다양한 프로젝트의 번역 파일을 한 곳에서 관리할 수 있습니다.

![워크스페이스](https://github.com/user-attachments/assets/8095596c-3820-4c6d-8741-b960d431c415)

![네임스페이스](https://github.com/user-attachments/assets/6fbad164-c7a9-4c8c-91f5-a025efe266b0)

# 목차

- [주요 개념](#주요-개념)
  - [워크스페이스](#워크스페이스-workspace)
  - [네임스페이스](#네임스페이스-namespace)
- [주요 기능](#주요-기능)
- [시작하기](#시작하기)
  - [설치](#설치)
  - [실행](#실행)
- [사용 방법](#사용-방법)
  - [워크스페이스 관리](#워크스페이스-관리)
  - [네임스페이스 관리](#네임스페이스-관리)
- [개발자 가이드](#개발자-가이드)
  - [빌드 및 패키징](#빌드-및-패키징)
  - [GitHub Release 생성](#github-release-생성)

# 주요 개념

## 워크스페이스 (Workspace)

워크스페이스는 하나의 프로젝트에서 사용되는 다국어 번역 파일들의 집합을 의미합니다. 각 워크스페이스는 다음과 같은 특징을 가집니다:

- 독립적인 언어 설정: 각 워크스페이스는 자신만의 지원 언어 목록을 가질 수 있습니다.
- 여러 네임스페이스 관리: 하나의 워크스페이스 안에서 여러 개의 네임스페이스를 관리할 수 있습니다.

## 네임스페이스 (Namespace)

네임스페이스는 번역 파일을 논리적으로 구분하는 단위입니다. 예를 들어:

- common: 공통으로 사용되는 번역
- auth: 인증 관련 번역
- product: 상품 관련 번역

각 네임스페이스는 지원하는 모든 언어의 번역을 포함하며, JSON 파일로 관리됩니다.

# 주요 기능

- **워크스페이스 관리**

  - 여러 프로젝트의 번역 파일을 별도의 워크스페이스로 관리
  - 워크스페이스 간 빠른 전환 지원
  - 마지막으로 작업한 워크스페이스 자동 복원

- **네임스페이스 편집**

  - 모든 언어의 번역을 한 화면에서 관리
  - 새로운 번역 키-값 쌍 추가 및 삭제
  - 번역 실시간 수정

- **언어 관리**
  - 새로운 언어 추가 및 삭제
  - 언어별 번역 파일 자동 동기화

# 시작하기

## 설치

npm을 사용하는 경우:

```bash
npm install -D i18n-editor
```

yarn을 사용하는 경우:

```bash
yarn add -D i18n-editor
```

## 실행

기본 설정으로 실행 (포트 5252 사용):

```bash
npx i18n-editor
```

커스텀 포트로 실행:

```bash
i18n-editor -p 9000
```

또는

```bash
i18n-editor --port 9000
```

명령어를 실행하면 자동으로 브라우저 창이 열리면서 애플리케이션이 실행됩니다. 기본적으로 시스템의 기본 브라우저를 사용하여 실행됩니다.

# 사용 방법

## 워크스페이스 관리

### 워크스페이스 구조

워크스페이스는 다음과 같은 구조를 가져야 합니다:

```
📂workspace
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

### 워크스페이스 선택

1. 홈 화면에서 "디렉토리 선택하고 시작" 버튼을 클릭합니다.
2. 번역 파일이 있는 디렉토리를 선택합니다.
3. 선택한 디렉토리가 워크스페이스로 등록됩니다.

### 워크스페이스 전환

- 사이드바의 워크스페이스 목록에서 원하는 워크스페이스를 클릭하여 전환할 수 있습니다.
- 최근 사용한 워크스페이스는 자동으로 저장되어 다음 실행 시 복원됩니다.

### 워크스페이스 수정

- 워크스페이스의 기본 정보를 수정할 수 있습니다
  - 디렉토리 변경
  - 워크스페이스명
  - 언어 추가 및 삭제
  - 네임스페이스 추가 및 삭제

## 네임스페이스 관리

### 네임스페이스 편집

1. 워크스페이스에서 편집할 네임스페이스를 선택합니다.
2. 표 형식의 에디터에서 번역을 관리할 수 있습니다:
   - 새 번역 추가
     - 특정 번역의 행 옵션 메뉴에서 "위에 번역 추가" 혹은 "아래에 번역 추가" 선택
     - 네임스페이스 최하단에 번역 키값을 입력하여 번역 추가
   - 번역 수정: 셀을 클릭하여 직접 편집
   - 번역 삭제: 행 옵션 메뉴에서 "삭제" 선택

# 개발자 가이드

## 빌드 및 패키징

### 개발 환경 설정

```bash
# 의존성 설치
yarn install

# 개발 서버 실행
yarn dev
```

### 빌드

```bash
# 전체 빌드
yarn build

# 플랫폼별 패키징
yarn package:mac    # macOS용 빌드
yarn package:win    # Windows용 빌드
yarn package:linux  # Linux용 빌드
yarn package        # 모든 플랫폼용 빌드
```

빌드가 완료되면 `release/` 디렉토리에 다음과 같은 구조로 파일들이 생성됩니다:

```
release/
├── packed/           # 배포용 설치 파일들
│   ├── mac/         # macOS .dmg 파일들
│   ├── windows/     # Windows .exe 파일들
│   └── linux/       # Linux .AppImage, .deb 파일들
└── unpacked/        # 압축 해제된 앱 파일들
```

## GitHub Release 생성

GitHub Release를 자동으로 생성하고 빌드된 파일들을 업로드하는 스크립트를 제공합니다.

### 사전 준비

1. **GitHub CLI 설치** (이미 설치되어 있다면 건너뛰기):

   ```bash
   # macOS
   brew install gh

   # Windows (Chocolatey)
   choco install gh

   # Linux
   # https://github.com/cli/cli/blob/trunk/docs/install_linux.md 참조
   ```

2. **GitHub 인증**:
   ```bash
   gh auth login
   ```

### Release 생성 명령어

```bash
# 기본 릴리스 생성 (빌드 + 릴리스 생성)
yarn release

# 드래프트 릴리스 생성
yarn release:draft

# 프리릴리스 생성
yarn release:prerelease

# 빌드 없이 릴리스 생성 (이미 빌드된 파일 사용)
yarn release:skip-build
```

### 릴리스 노트 커스터마이징

릴리스 노트를 커스터마이징하려면 프로젝트 루트에 `RELEASE_NOTES.md` 파일을 생성하세요:

```bash
# 템플릿 복사
cp RELEASE_NOTES.template.md RELEASE_NOTES.md

# 릴리스 노트 편집
# RELEASE_NOTES.md 파일을 수정하여 이번 릴리스의 변경사항을 작성
```

### 릴리스 프로세스

1. **버전 업데이트**: `package.json`의 `version` 필드를 업데이트
2. **변경사항 작성**: `RELEASE_NOTES.md` 파일에 이번 릴리스의 변경사항 작성
3. **릴리스 생성**: `yarn release` 명령어 실행
4. **확인**: GitHub에서 생성된 릴리스 확인

### 릴리스 스크립트 옵션

- `--draft`: 드래프트 릴리스로 생성 (공개되지 않음)
- `--prerelease`: 프리릴리스로 표시 (베타, 알파 버전 등)
- `--skip-build`: 빌드 과정을 건너뛰고 기존 빌드 파일 사용

### 예시

```bash
# v1.2.0 정식 릴리스
yarn release

# v1.3.0-beta.1 베타 릴리스
yarn release:prerelease

# 드래프트로 먼저 확인 후 공개
yarn release:draft
# GitHub에서 드래프트 확인 후 수동으로 공개
```
