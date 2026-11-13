export type Solving = {
  // issue: 실제로 겪은 문제 → 화면에 "문제 해결"로 표시
  // design: 설계할 때 미리 고려한 점 → 화면에 "설계 고려"로 표시
  kind: 'issue' | 'design';
  title: string;
  problem: string;
  cause?: string;
  solution: string;
  result?: string;
};

export type Project = {
  slug: string;
  index: string;
  title: string;
  subtitle: string;
  summary: string;
  description: string;
  tags: string[];
  category: string;
  image?: string;
  videos?: { label: string; src: string }[];
  fallback: 'fan' | 'vehicle' | 'pcb' | 'fpga';
  github?: string;
  role: string;
  features: string[];
  repositoryNote?: string;
  resources?: { label: string; url: string }[];
  // 아래 항목은 값을 채운 경우에만 화면에 표시됩니다.
  period?: string; // 예: '2026.03 ~ 2026.04 (4주)'
  team?: string; // 예: '4인 팀 프로젝트' 또는 '개인 프로젝트'
  diagrams?: { label: string; src: string }[]; // 예: { label: '하드웨어 구성도', src: '/images/avr-auto-car-hw.png' }
  solving?: Solving[];
};

export const projects: Project[] = [
  {
    slug: 'smart-fan', index: '01', title: 'Jetson Smart Fan Controller',
    subtitle: 'Linux 기반 스마트 선풍기 제어 시스템',
    summary: '스마트 선풍기의 LCD 출력과 BMP180 온도·기압 센서 연동 담당',
    description: 'Jetson Orin Nano와 Linux 기반의 스마트 선풍기 팀 프로젝트입니다. I2C로 BMP180 센서의 온도·기압을 읽고, 팬 상태·동작 모드·온도·속도 단계를 16×2 LCD에 표시하는 부분을 담당했습니다.',
    category: 'EMBEDDED LINUX', tags: ['C', 'Jetson Orin Nano', 'Linux', 'I2C', 'BMP180', 'LCD'],
    image: 'https://raw.githubusercontent.com/hckim-dev/jetson-smart-fan-controller/master/docs/assets/hardware-overview.jpg',
    fallback: 'fan', github: 'https://github.com/hckim-dev/jetson-smart-fan-controller',
    role: 'LCD 출력 · BMP180 센서 연동',
    period: '', team: '',
    features: [
      'BMP180 칩 ID 확인 후 보정 데이터 22바이트를 읽어 온도·기압 보상 계산',
      '16×2 LCD에 팬 ON/OFF, AUTO/MANUAL, 온도, 속도 단계 표시',
      'LCD 1바이트를 상위·하위 니블로 나눠 I2C로 전송',
      'LCD 작업 스레드가 변경 통지를 받아 화면을 갱신하고, 공유 상태는 mutex로 보호'
    ],
    solving: [
      {
        kind: 'design', title: 'LCD 잔상과 불필요한 I2C 전송',
        problem: '문자열 길이가 줄어들면 이전 글자가 화면에 남고, 같은 내용을 계속 다시 쓰면 I2C 전송이 불필요하게 반복됩니다.',
        solution: '각 줄을 16칸으로 공백 채움한 뒤 출력하고, 이전에 쓴 줄과 비교해 내용이 같으면 전송을 생략하도록 했습니다.',
        result: '상태가 바뀐 줄만 다시 쓰는 구조로 정리했습니다.'
      },
      {
        kind: 'design', title: '센서·LCD 오류가 팬 제어에 번지지 않게 하기',
        problem: '센서 값이 비정상이거나 LCD 전송이 실패했을 때 잘못된 값이 표시되거나 팬 제어까지 멈출 수 있습니다.',
        solution: '온도는 −40~85°C, 기압은 30,000~110,000Pa 범위를 검사하고, 유효하지 않으면 LCD에 T:ERR를 표시했습니다. LCD의 I2C 전송 오류는 기록만 하고 메인 프로그램이 경고를 남긴 뒤 모터 제어를 계속하도록 구성했습니다.'
      }
    ],
    repositoryNote: '링크는 팀 프로젝트 저장소입니다. 모터 커널 드라이버와 엔코더 코드는 다른 팀원이 작성한 코드로, 제가 작성한 코드는 아닙니다.'
  },
  {
    slug: 'vehicle', index: '02', title: 'Vehicle Control System',
    subtitle: 'STM32 × Qt 차량 전장 모니터링',
    summary: '차량 조작과 상태 확인을 위한 Qt 사용자 화면 담당',
    description: 'STM32와 Qt를 연결한 차량 전장 제어·모니터링 팀 프로젝트입니다. 차량을 조작하고 상태를 확인하는 Qt UI를 담당했습니다. 화면의 조작 영역과 정보 표시 영역을 구성했습니다.',
    category: 'QT / USER INTERFACE', tags: ['Qt', 'C++', 'UI'],
    image: 'https://github.com/user-attachments/assets/b6774df4-95da-4b87-a571-8b1e6f13cc96',
    fallback: 'vehicle', github: 'https://github.com/qkrtkdgus010208/Qt_ARM-Vehicle_Control_System',
    role: 'Qt UI',
    period: '', team: '',
    features: ['Qt 기반 차량 전장 사용자 화면 구성', '차량 조작을 위한 UI 요소 배치', '차량 상태를 확인하는 정보 표시 영역 구성']
  },
  {
    slug: 'board-guard', index: '03', title: 'Board Guard',
    subtitle: 'AI 기반 PCB 불량 검사·관리 시스템',
    summary: 'PCB 검사 결과를 사용자 인터페이스와 데이터베이스에 연결한 팀 프로젝트',
    description: '카메라로 PCB를 검사하고 판정 결과와 이력을 관리하는 팀 프로젝트입니다. UI·UX와 DB를 담당해 검사 상태를 확인하는 화면과 검사 이력의 저장·조회 기능을 구성했습니다.',
    category: 'UI / DATA', tags: ['Python', 'Flask', 'SQLite', 'Jetson', 'UI / UX'],
    image: 'https://raw.githubusercontent.com/clap-min99/board_guard/master/assets/front.gif',
    fallback: 'pcb', github: 'https://github.com/clap-min99/board_guard',
    role: 'UI·UX · DB',
    period: '', team: '',
    features: ['PASS / FAIL / MISSING 상태를 확인하는 검사 결과 화면 구성', 'SQLite를 이용한 검사 이력 저장·조회', '검사 결과와 결함 정보를 확인하는 UI 구성'],
    solving: [
      {
        kind: 'design', title: '빠른 필터 전환 시 오래된 응답이 화면을 덮어쓰는 경우',
        problem: 'PASS/FAIL·앞면/뒷면 필터를 빠르게 바꾸면 먼저 보낸 요청의 응답이 나중에 도착해 현재 필터와 다른 목록이 표시될 수 있습니다.',
        solution: '새 조회를 시작할 때 이전 요청을 취소하고, 응답을 그리기 전에 현재 요청의 응답인지 확인하도록 했습니다. 조회 API는 잘못된 조건에 400을 반환하고, 실패 시 화면에 재시도 버튼을 제공합니다.'
      },
      {
        kind: 'design', title: '확정된 검사 결과만 이력에 저장',
        problem: '검사를 중단하거나 앞면·뒷면을 전환하는 도중에 만들어진 결과가 저장되면 이력과 불량률 통계가 틀어집니다.',
        solution: 'MISSING 같은 현재 상태와 확정 결과를 구분해 새로 확정된 PASS·FAIL만 SQLite에 저장하고, 중단·전환 이전에 생성된 결과는 반영하지 않도록 검사했습니다. 프로그램 시작 시에는 DB 집계로 누적 통계를 복원합니다.'
      }
    ]
  },
  {
    slug: 'basys3-i2c-sensor-monitor', index: '04', title: 'Basys3 I2C Sensor Monitor',
    videos: [
      { label: 'basys3-i2c-sensor-monitor 시연 영상', src: '/videos/basys3-i2c-sensor-monitor.mp4' },
    ],
    subtitle: '두 FPGA 보드를 이용한 온습도·거리 모니터',
    summary: '슬레이브 FPGA의 센서 측정과 I2C·UART 전송, Qt 모니터 구현',
    description: '두 대의 Basys3 보드로 온도·습도·거리를 측정하고 표시하는 팀 프로젝트입니다. 슬레이브 보드를 담당해 DHT11과 HC-SR04의 신호를 Verilog로 처리하고, 마스터 보드가 I2C로 측정값을 읽을 수 있도록 구현했습니다. PC에서는 Qt 모니터로 UART 데이터를 받아 측정값과 센서별 오류를 확인할 수 있습니다.',
    category: 'FPGA / RTL', tags: ['Verilog', 'Basys3', 'I2C', 'UART', 'Qt', 'C++'],
    fallback: 'fpga', github: 'https://github.com/AI-System-Semiconductor-SW-Develop/Basys3-I2C-Sensor-Monitor',
    role: '슬레이브 RTL 설계 · 센서 연동 · Qt 모니터 · 통합 테스트벤치',
    period: '', team: '',
    features: [
      'DHT11 체크섬과 초음파 응답 시간을 검사하고, 센서별 정상 여부를 상태 헤더에 기록',
      '측정값과 상태를 I2C 6바이트로 제공하고, UART로는 1초마다 Qt 모니터에 전송',
      '가상 센서 입력을 이용해 I2C와 UART의 실제 출력 바이트를 비교하는 테스트벤치 작성',
      '초음파 거리 계산을 순차 연산으로 변경해 100MHz에서 WNS를 −1.555ns에서 +2.472ns로 개선'
    ],
    diagrams: [{ label: '시스템 구성도', src: '/images/basys3-i2c-system.png' } ,{ label: '테스트벤치', src: '/images/sensor_monitor_testbench.png' }],
    solving: [
      {
        // TODO: 원인 문장은 타이밍 리포트의 실제 critical path에 맞게 확인 후 수정해 주세요.
        kind: 'issue', title: '100MHz 타이밍 위반 (WNS −1.555ns)',
        problem: '구현 후 타이밍 리포트에서 100MHz 제약 기준 WNS가 −1.555ns로 나와 타이밍을 만족하지 못했습니다.',
        cause: '초음파 Echo 시간을 거리로 바꾸는 계산이 한 클럭 안에 조합 논리로 처리되어 경로 지연이 길었습니다.',
        solution: '거리 계산을 여러 클럭에 걸쳐 수행하는 순차 연산으로 변경했습니다.',
        result: 'WNS가 +2.472ns로 개선되어 100MHz 제약을 만족했습니다.'
      },
      {
        kind: 'design', title: '센서 오류를 정상 값과 구분해 전달',
        problem: 'DHT11 수신 오류나 초음파 무응답이 생겨도 이전 값이나 0이 그대로 전달되면 PC에서 정상 측정과 구분할 수 없습니다.',
        solution: 'DHT11은 체크섬, 초음파는 응답 시간을 검사해 센서별 정상 여부를 상태 헤더에 기록하고, 측정값과 함께 I2C·UART로 전송했습니다. Qt 모니터는 헤더를 읽어 센서별 오류를 따로 표시합니다.',
        result: '가상 센서 입력 테스트벤치로 I2C와 UART의 출력 바이트가 일치하는지 확인했습니다.'
      }
    ],
    repositoryNote: '저장소에는 제가 구현한 슬레이브 RTL, 테스트벤치, Qt 모니터와 팀 발표자료·시연 영상이 포함되어 있습니다. 마스터 보드의 I2C 제어와 OLED 출력은 팀원이 담당했습니다.'
  },
  {
    slug: 'avr-auto-car', index: '05', title: 'AVR RC Car',
    videos: [
      { label: '자율주행 시연', src: '/videos/avr-auto-car-autonomous.mp4' },
      { label: '수동 조종 시연', src: '/videos/avr-auto-car-manual.mp4' }
    ],
    subtitle: '블루투스 수동 조종과 초음파 장애물 회피',
    summary: 'ATmega128A 기반 RC카의 주행 제어·거리 측정·상태 표시 전체 구현',
    description: '블루투스로 조종하거나 초음파 센서로 장애물을 피하며 주행하는 RC카입니다. ATmega128A에서 모터 PWM, UART 명령 수신, 세 방향 거리 측정과 FND 표시를 구현했습니다. 자동 주행에서는 전방 거리에 따라 정지·후진·전진을 결정하고, 좌우 거리를 비교해 회전 방향을 선택합니다.',
    category: 'AVR / MOTOR CONTROL', tags: ['C', 'ATmega128A', 'UART', 'PWM', '초음파 센서', 'FND'],
    fallback: 'vehicle', github: 'https://github.com/AI-System-Semiconductor-SW-Develop/avr-projects/tree/main/auto-car',
    role: '2인팀(전체 구현)',
    period: '', team: '',
    features: ['UART1 블루투스 명령을 받아 전진·후진·좌우 회전·정지 처리', '초음파 Echo 인터럽트와 Timer3를 이용한 거리 측정 및 타임아웃 처리', '전방·좌우 거리에 따른 장애물 회피와 수동·자동 모드 전환 구현', 'Timer1 PWM으로 모터를 구동하고 FND에 주행 시간과 기록 표시', '모터와 FND가 공유하는 PORTF의 비트를 보존하도록 출력 처리'],
    diagrams: [{label:"회로도",src:"/images/auto_car.png"}],
    solving: [
      {
        kind: 'design', title: '모터 방향과 FND가 함께 쓰는 PORTF',
        problem: 'PORTF의 하위 4비트는 모터 방향, 상위 4비트는 FND 자리 선택에 사용합니다. 방향을 바꿀 때 포트 전체를 쓰면 FND 표시가 깨집니다.',
        cause: 'FND는 Timer2 인터럽트가 1ms마다 같은 포트를 변경하므로, 메인 루프가 포트 값을 읽고 수정해 다시 쓰는 사이에 인터럽트가 끼어들면 한쪽 변경이 사라집니다.',
        solution: '마스크로 하위 4비트만 수정해 상위 4비트를 보존하고, 갱신하는 동안 SREG를 저장한 뒤 인터럽트를 막았다가 이전 값으로 복원했습니다.',
        result: '모터 방향 전환과 FND 다중화 표시가 서로의 비트를 건드리지 않는 구조로 통합했습니다.'
      },
      {
        kind: 'design', title: '초음파 응답이 없을 때의 대기와 주행',
        problem: 'Echo가 돌아오지 않으면 측정이 끝나지 않아 주행 판단이 멈추고, 세 센서를 동시에 쏘면 다른 센서의 반사파를 잘못 받을 수 있습니다.',
        solution: 'Timer3가 7,500카운트(약 30ms)에 도달하면 측정 실패로 보고 0을 반환하며, 자동 주행은 전방 거리가 0이면 정지합니다. 센서는 왼쪽→중앙→오른쪽 순서로 20ms 간격을 두고 측정하고, 현재 측정 중인 센서의 인터럽트만 처리했습니다.'
      }
    ],
    resources: [{ label: '발표 자료', url: 'https://github.com/AI-System-Semiconductor-SW-Develop/avr-projects/blob/main/auto-car/docs/presentation.pptx' }]
  },
  {
    slug: 'avr-rtc-calculator', index: '06', title: 'RTC Calculator',
    videos: [{ label: 'RTC LCD 계산기 시연', src: '/videos/avr-rtc-calculator.mp4' }],
    subtitle: 'ATmega128A 기반 시계·계산기',
    summary: 'RTC 시계·계산기 팀 프로젝트에서 수식 계산과 버튼 입력 담당',
    description: 'DS1307 RTC와 LCD1602를 이용해 날짜·시간 표시와 계산기 기능을 제공하는 팀 프로젝트입니다. 계산기와 버튼 처리를 담당했습니다. 숫자와 연산자를 각각 스택에 저장하고, 연산자 우선순위를 비교해 입력한 수식을 계산하도록 구성했습니다.',
    category: 'AVR / USER INPUT', tags: ['C', 'ATmega128A', 'Stack', '버튼 입력', 'LCD1602'],
    fallback: 'fan', github: 'https://github.com/AI-System-Semiconductor-SW-Develop/avr-projects/tree/main/rtc-calculator',
    role: '계산기 · 버튼 입력',
    period: '', team: '',
    features: ['숫자 스택과 연산자 스택을 이용한 수식 계산 로직 구현', '사칙연산의 우선순위 비교와 계산 결과 반환 처리', '버튼 입력 감지 및 입력 상태 처리'],
    resources: [{ label: '발표 자료', url: 'https://github.com/AI-System-Semiconductor-SW-Develop/avr-projects/blob/main/rtc-calculator/docs/presentation.pptx' }]
  },
  {
    slug: 'jetson-rps-game', index: '07', title: 'Vision RPS Game',
    videos: [{ label: 'RPS Game 시연', src: '/videos/rcp_game_project.mp4' }],
    subtitle: '카메라로 손동작을 인식하는 가위바위보 게임',
    summary: 'Jetson에서 TensorRT 추론부터 승패 판정과 PyQt5 게임 화면까지 구현',
    description: '카메라 영상의 손동작을 가위·바위·보로 인식하는 Jetson Orin Nano 게임입니다. YOLO 모델의 TensorRT 추론을 연결하고, 영상 전처리와 검출 결과 후처리, 승패 판정, 게임 화면을 구현했습니다. 컴퓨터와 대결하는 싱글 모드와 화면 좌우의 두 사람이 대결하는 멀티 모드를 제공합니다.',
    category: 'JETSON / COMPUTER VISION', tags: ['Python', 'Jetson Orin Nano', 'TensorRT', 'PyQt5', 'OpenCV', 'YOLO'],
    fallback: 'vehicle', github: 'https://github.com/AI-System-Semiconductor-SW-Develop/RCP_game_project',
    role: '전체 구현',
    period: '', team: '',
    features: ['카메라 프레임 전처리, TensorRT 추론 및 클래스별 NMS 후처리 구현', '화면 좌우에서 플레이어의 손을 선택하고 최근 7프레임 중 5회 이상 일치한 손동작으로 판정', '3초 카운트다운, 승패 판정과 점수 누적 처리', 'PyQt5로 싱글·멀티 모드 선택, 카메라 화면, 라운드 진행 UI 구현'],
    diagrams: [{ label: '처리 흐름도', src: '/images/rps.png' }],
    solving: [
      {
        kind: 'design', title: '프레임마다 달라지는 인식 결과로 승패가 뒤집히는 경우',
        problem: '한 프레임의 검출 결과만으로 판정하면 손 모양이 바뀌는 순간이나 순간적인 오검출이 그대로 승패에 반영됩니다.',
        solution: '최근 최대 7프레임의 결과를 저장하고, 같은 손동작이 5회 이상일 때만 확정했습니다. 확정되지 않으면 재시도 안내를 표시하고 점수는 변경하지 않으며, 새 라운드마다 기록을 초기화합니다.',
        result: '판정 기준을 "한 프레임"에서 "최근 프레임의 다수결"로 바꿔 라운드 결과가 일시적인 검출에 좌우되지 않도록 했습니다.'
      },
      {
        kind: 'design', title: '모델 입력 비율과 원본 화면 좌표의 차이',
        problem: '카메라 프레임을 모델 입력 크기에 맞춰 그대로 늘리면 손 모양이 왜곡되고, 검출 박스 좌표도 원본 화면과 맞지 않습니다.',
        solution: '종횡비를 유지하는 letterbox로 전처리하고, 후처리에서 배율과 여백을 되돌려 박스를 원본 좌표로 복원한 뒤 화면 범위로 제한했습니다. 멀티 모드는 복원된 박스의 중심 X좌표로 좌우 플레이어를 구분합니다.'
      }
    ]
  },
  {
    slug: 'stm32-motor-control', index: '08', title: 'STM32 Motor Control',
    subtitle: '인터럽트와 FSM 기반 모터 방향·속도 제어',
    summary: '버튼과 UART 입력으로 모터 방향·속도·정지를 제어하는 펌웨어',
    description: 'STM32에서 버튼으로 회전 방향을 바꾸고 UART 명령으로 PWM 속도를 조절하는 모터 제어 프로젝트입니다. 정지·정회전·역회전·전환 대기 상태를 나누고, 방향을 바꾸기 전에 잠시 정지하도록 구성했습니다. 인터럽트에서는 이벤트를 기록하고 메인 루프에서 모터 동작을 처리합니다.',
    category: 'STM32 / MOTOR CONTROL', tags: ['C', 'STM32', 'FSM', 'PWM', 'UART', 'Interrupt'],
    fallback: 'fan', github: 'https://github.com/AI-System-Semiconductor-SW-Develop/motor_control_mini_project',
    role: '3인 팀 (각자 구현 후 비교·통합)',
    period: '', team: '',
    features: ['STOP·CW·CCW·SHORT_STOP 상태로 모터 제어 흐름 구성', '버튼 외부 인터럽트와 타이머를 이용한 방향 전환 및 길게 누르기 정지 처리', 'UART 숫자 명령을 PWM 속도 단계에 연결', '방향 전환 대기 시간을 타이머로 처리하고 메인 루프에서 다음 상태 적용'],
    solving: [
      {
        kind: 'design', title: '회전 중 즉시 방향을 바꾸지 않기',
        problem: '모터가 도는 상태에서 바로 반대 방향으로 구동하면 모터와 구동부에 부담이 갑니다.',
        solution: '정회전·역회전 사이에 SHORT_STOP 상태를 두고, 타이머로 대기 시간이 지난 뒤 메인 루프에서 다음 방향을 적용했습니다. 인터럽트에서는 이벤트만 기록해 모터 제어가 한 곳에서만 이뤄지도록 했습니다.'
      }
    ]
  },
  {
    slug: 'stm32-ws2812b', index: '09', title: 'WS2812B LED Control',
    subtitle: 'PWM·DMA를 이용한 LED 데이터 전송',
    summary: 'STM32 타이머와 DMA를 연결해 WS2812B LED 4개의 GRB 데이터 전송',
    description: 'WS2812B LED의 GRB 데이터를 PWM 듀티 값으로 변환해 DMA로 전송하는 프로젝트입니다. LED 4개에 필요한 96비트 버퍼를 구성하고 TIM2 PWM 출력과 DMA를 연결했습니다. 전송 사이의 리셋 구간은 TIM4 원샷 타이머로 처리했습니다.',
    category: 'STM32 / PWM & DMA', tags: ['C', 'STM32', 'PWM', 'DMA', 'WS2812B', 'Timer'],
    fallback: 'fan', github: 'https://github.com/AI-System-Semiconductor-SW-Develop/communication_control',
    role: '전체 구현',
    period: '', team: '',
    features: ['GRB 각 8비트를 0·1에 대응하는 PWM 듀티 배열로 변환', 'TIM2 CH3와 DMA1 Stream1을 연결해 96개 듀티 값 전송', 'GPIO Low 구간과 TIM4 원샷 타이머로 리셋 타이밍 처리', '타이머 시작 전 업데이트 플래그와 NVIC pending 상태를 초기화해 조기 인터럽트 방지'],
    solving: [
      {
        kind: 'issue', title: '설정한 시간보다 짧게 끝나는 TIM4 지연',
        problem: 'WS2812B 리셋 구간을 만드는 TIM4 원샷 지연이 설정한 시간보다 짧게 끝났습니다.',
        cause: 'PSC·ARR 값을 적용하려고 EGR의 UG 비트를 설정하면 UIF 플래그가 함께 세워집니다. 이 상태로 인터럽트를 켜서 실제 만료 전에 인터럽트가 발생했습니다.',
        solution: '타이머 정지 → PSC·ARR 설정 → UG → UIF 제거 → NVIC pending 제거 → 인터럽트 활성화 → 타이머 시작 순서로 초기화를 고쳤습니다.',
        result: '설정한 리셋 시간이 지난 뒤에만 인터럽트가 발생하도록 수정했습니다.'
      },
      {
        kind: 'design', title: 'PWM 데이터 앞에 불필요한 펄스가 붙지 않게 하기',
        problem: 'TIM2를 DMA보다 먼저 시작하면 DMA 설정이 끝날 때까지 초기 CCR 값이 출력되어 데이터 앞에 불필요한 구간이 생길 수 있습니다.',
        solution: '버퍼 생성 → TIM2 설정 → DMA 설정·활성화 → TIM2 시작 순서로 맞추고, DMA 완료 인터럽트에서 TIM2를 멈춘 뒤 핀을 GPIO Low로 바꿔 리셋 구간을 시작했습니다.'
      },
      {
        kind: 'issue', title: '길게 눌러 정지한 뒤 버튼을 떼면 다시 회전하는 문제',
        problem: '버튼을 3초 이상 누르면 모터가 정지하지만, 손을 떼는 순간 다시 회전을 시작했습니다.',
        cause: '버튼을 떼는 Rising 엣지를 항상 "짧은 누름"으로 처리했습니다. 3초 만료로 이미 STOP이 된 상태에서 뗌 이벤트가 들어와 STOP → CW 전환이 한 번 더 실행됐습니다.',
        solution: '3초 타이머가 동작 중인지 나타내는 플래그를 두고, 타이머가 만료되면 플래그를 내린 뒤 정지하도록 했습니다. 뗌 이벤트는 플래그가 켜져 있을 때만 방향 전환으로 처리하고, 메인 루프에서 만료를 뗌보다 먼저 확인합니다.',
        result: '길게 누른 뒤 손을 떼도 정지 상태가 유지되고, 3초 안에 뗀 경우에만 방향이 바뀝니다.'
      }
    ]
  },
  {
    slug: 'fpga-microwave-controller',
    index: '10',
    videos: [{ label: 'micor_wave_controller_시연', src: '/videos/micor_wave_FPGA_project.mp4' }],
    title: 'FPGA Microwave Controller',
    subtitle: 'Verilog 기반 전자레인지 통합 제어',
    summary: 'Basys 3에서 로터리 시간 설정, 카운트다운, 문 개폐와 모터·부저·FND 제어 구현',
    description: '전자레인지의 조작과 제어 흐름을 Verilog HDL로 구현한 프로젝트입니다. 로터리로 0~9999초를 설정하고 시작·일시정지·취소에 따라 카운트다운과 모터를 제어합니다. 서보로 문 개폐를 구현하고, 문이 열린 상태에서는 시작을 차단합니다. 조리 완료 시 FND 깜빡임과 부저 알림을 3회 동기화했습니다.',
    category: 'FPGA / Verilog HDL',
    tags: ['Verilog', 'FPGA', 'Basys 3', 'PWM', 'Rotary Encoder', 'Servo', 'FND'],
    fallback: 'fan',
    github: 'https://github.com/AI-System-Semiconductor-SW-Develop/FPGA-Microwave-Controller',
    role: '전체 구현',
    features: [
      '입력 동기화·디바운싱과 로터리 방향 판별로 1초 단위 시간 설정',
      '1ms tick 기반 카운트다운과 일시정지·재개·취소 제어',
      '문 상태 저장과 서보 PWM 제어, 문 열림 시 조리 정지 및 시작 차단',
      '조리 상태에 따른 DC 모터 구동과 FND·부저 완료 알림 3회 동기화',
      '테스트벤치로 시작·일시정지·재개·자연 종료 시나리오 확인'
    ],
    diagrams: [{label:"회로도",src:"/images/microwave_diagram.png"}, {label:"테스트벤치",src:"/images/microwave_testbench.png"}],
    resources: [
      { label: 'micro_wave 소스', url: 'https://github.com/AI-System-Semiconductor-SW-Develop/FPGA-Microwave-Controller' },
      { label: '시연 영상', url: 'https://github.com/AI-System-Semiconductor-SW-Develop/FPGA-Microwave-Controller/blob/main/media/demo.mp4' },
      { label: '발표 자료', url: 'https://github.com/AI-System-Semiconductor-SW-Develop/FPGA-Microwave-Controller/blob/main/docs/fpga-microwave-controller.pptx' }
    ]
  },
];