# MapleStory Backend Assignment

## Before reading

안녕하세요, 메이플스토리 PC 웹 백엔드 포지션 지원자 김두열입니다.

오랜 기간 유저로서 함께했던 메이플스토리에 합류할 수 있는 소중한 기회였으나, 개인적인 사정으로 과제를 완료하지 못하여 큰 아쉬움이 남아 진행한 내용과 설계/구현 당시에 가졌던 고민을 정리하여 제출합니다.

메이플스토리의 채용 프로세스에 참여할 수 있도록 해주셔서 진심으로 감사드립니다.

## What's in my mind

설계/구현 단계에서 가진 생각들을 기록하여 다소 러프하게 기록하였습니다.

- 이벤트 조건을 관리하는 방법
  - 게임에서 발생하는 다양한 데이터가 정형화되어 관리되고 있다는 가정하에, Rule engine과 같은 개념을 활용하면 달성 조건을 보다 유연하고 안전하게 관리할 수 있을듯
  - 아마 노코드 플랫폼이나 서비스들이 비슷한 느낌으로 구현되어 있지 않을까 하는 생각이 드는데, n8n 같은 프로젝트의 구현부가 도움될 것 같다
  
- Microservice
  - 네트워크를 타는 작업에는 timeout을 설정하는데, 늦게라도 성공하는 경우는 어떻게 감지하지?
    - timeout은 호출자의 일방적인 처리 방식이므로, 일반적으로 각 서비스에서의 작업에 영향을 주지 않음
  - global trace id 같은걸 두고 서비스 간 통신에 사용하도록 하여 모든 작업을 rollback 가능하도록 만들면 될까?
  - 근데 지급한 아이템을 사용해버린 경우같이 취소할 수 없는 작업은 어쩌지
    - 취소 가능한 작업인지를 미리 정의하고 해당되는 작업들만 동기적으로 처리하도록 할 수 있을까

- 다른 서비스의 기능을 함수 호출하듯 사용하도록 만들자
  - 게이트웨이에서 각 서비스의 인터페이스만을 알도록 하여 의존성을 줄일 수 있음
    - 각 서비스의 인터페이스를 정의하고 이를 구현하는 ClientProxy를 구현하여 주입
    - 실제 호출부의 구현은 `libs/common/src/microservices`에 위치
  - 인터페이스로 추상화를 시도하였으나 결국 ClientProxy 기반이라 Type-safety를 완벽히 보장할 수 없는 한계가 느껴짐
  - gRPC나 Codegen을 활용하면 human error를 줄일 수 있을 것 같음

- 요청 검증은 누구의 일인가
  - 게이트웨이에서 처리하면 도메인 독립성이 떨어지고 게이트웨이가 너무 많은 역할과 책임을 지게 됨
  - 각 서비스에서 검증하면 API 문서화는 어떻게?
  - 게이트웨이는 형식, 각 서비스는 비즈니스 로직을 검증하는게 정석 같은데
    - 결과적으로 RequestDto 같은 객체를 양쪽 모두가 알아야 함
    - 단순히 타입 공유만을 위해 공통 라이브러리에 DTO를 둬도 괜찮을까? 라이브러리가 과하게 커질텐데

- 이벤트가 추가될때마다 게이트웨이에 엔드포인트를 자동으로 추가할 수 있을까
  - 공통된 규격을 만들어두면 안될것도 없겠다

- 도메인 엔티티를 어디에서 관리할 것인가
  - 지금은 공통 라이브러리에 두었는데, 서비스마다 관심사가 다르니 각 서비스에 두는 것이 맞는 것 같음
  - 사용자라는 자원만 보더라도 AuthService에서는 비밀번호나 권한 등이 필요하지만 EventService에서는 보상이나 유저의 행동에 대한 정보가 주요 관심사
  - Bounded context의 필요성을 느낀건가


- 트랜잭션
  - SAGA나 보상 트랜잭션같은 개념은 이론으로만 알고 있지 실제로 구현해본 적이 없음
  - 중복 지급방지 같은건 사용자 식별자 기준으로 Lock을 걸어주면 되지 않을까?
    - MongoDB에도 document를 잠글 수 있긴 하네

## 주요 기능 및 설계

구현을 완료한 항목은 ✅ 표시하였습니다.

### 1. Common
- [x] Monorepo 구조 채택
  - [x] 각 서비스를 독립적으로 배포 가능하도록 구성
  - [x] 공통 자원 관리를 위한 라이브러리 관리

### 2. Event Service
- [ ] Rule engine 기반 사용자 정의 이벤트 조건 설정
  - [ ] 다양한 경로로 수집된 게임 내 데이터에 기반한 조건 설정 기능
  - [ ] 유저 식별자 기준 Lock을 사용하여 보상 중복 방지

### 3. Auth Service
- [x] JWT 발급 및 검증
- [x] 사용자 정보 조회
- [ ] 비밀번호 암호화 및 검증
- [ ] 사용자 정보 수정

### 4. Gateway
- [x] 요청 검증
- [x] 각 마이크로서비스에 대한 라우팅 및 Health check
- [ ] JWT 인증 및 인가 처리


---

## 🛠️ How to setup

본 프로젝트를 실행하기 위해서는 Docker 및 Docker Compose가 설치되어 있어야 합니다.

### 1. Clone this repository

```bash
git clone {{repo_url}}

## How to setup

Before running the application, make sure you have Docker and Docker Compose installed on your machine.

1. Clone this repository

```bash
git clone {{repo_url}}
```

2. Change directory to the cloned repository

```bash
cd {{repo_name}}
```

3. Run the script to generate environment variables

```bash
chmod +x ./scripts/init.sh # if permission denied
./scripts/init.sh
```

4. Run the script to start all services

```bash
docker[-]compose up [-]d
```
