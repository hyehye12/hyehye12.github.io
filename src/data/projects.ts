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
};

export const projects: Project[] = [
  {
    slug: 'smart-fan', index: '01', title: 'Jetson Smart Fan Controller',
    subtitle: 'Linux 기반 스마트 선풍기 제어 시스템',
    summary: '스마트 선풍기의 LCD 출력, 온도·고도 센서 연동 및 엔코더 담당',
    description: 'Jetson Orin Nano와 Linux 기반의 스마트 선풍기 팀 프로젝트입니다. LCD와 온도·고도 센서를 연결하고, 센서 정보를 LCD에 표시하는 부분을 담당했습니다. 조작 입력을 받는 엔코더도 담당했습니다.',
    category: 'EMBEDDED LINUX', tags: ['C', 'Jetson Orin Nano', 'Linux', 'LCD', '온도·고도 센서', '엔코더'],
    image: 'https://raw.githubusercontent.com/hckim-dev/jetson-smart-fan-controller/master/docs/assets/hardware-overview.jpg',
    fallback: 'fan', github: 'https://github.com/hckim-dev/jetson-smart-fan-controller',
    role: 'LCD · 온도/고도 센서 연동 · 엔코더',
    features: ['LCD 출력 기능 구현', '온도·고도 센서와 LCD를 연동해 센서 정보 표시', '엔코더를 이용한 사용자 입력 부분 담당'],
    repositoryNote: '링크는 팀 프로젝트 저장소입니다. 저장소에 포함된 엔코더 코드는 다른 팀원이 작성한 코드로, 제가 작성한 코드는 아닙니다.'
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
    features: ['PASS / FAIL / MISSING 상태를 확인하는 검사 결과 화면 구성', 'SQLite를 이용한 검사 이력 저장·조회', '검사 결과와 결함 정보를 확인하는 UI 구성']
  },
  {
    slug: 'fpga-microwave-controller',
    index: '04',
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
    resources: [
      { label: 'micro_wave 소스', url: 'https://github.com/AI-System-Semiconductor-SW-Develop/FPGA-Microwave-Controller' },
      { label: '시연 영상', url: 'https://github.com/AI-System-Semiconductor-SW-Develop/FPGA-Microwave-Controller/blob/main/media/demo.mp4' },
      { label: '발표 자료', url: 'https://github.com/AI-System-Semiconductor-SW-Develop/FPGA-Microwave-Controller/blob/main/docs/fpga-microwave-controller.pptx' }
    ]
  },
  {
    slug: 'fpga-clock', index: '10', title: 'FPGA Digital Clock',
    subtitle: 'Basys 3 기반 분·초 시계와 스톱워치',
    summary: '4자리 FND에 표시하는 분·초 시계와 10ms 단위 스톱워치',
    description: 'Basys 3 보드에서 Verilog로 분·초 시계와 스톱워치를 구현했습니다. 버튼으로 모드를 전환하고 스톱워치를 일시정지하거나 초기화할 수 있습니다. 시계는 스톱워치 모드에서도 계속 동작하며, 일시정지 상태에서 3초 동안 입력이 없으면 FND 세그먼트 애니메이션을 표시합니다.',
    category: 'FPGA / DIGITAL LOGIC', tags: ['Verilog HDL', 'Basys 3', 'FSM', 'Vivado'],
    image: 'https://raw.githubusercontent.com/AI-System-Semiconductor-SW-Develop/FPGA-Verilog-Projects/main/minsec_stopwatch_project/media/demo.gif',
    github: 'https://github.com/AI-System-Semiconductor-SW-Develop/FPGA-Verilog-Projects',
    fallback: 'fpga', role: 'Verilog 로직 구현 · 시뮬레이션',
    features: ['100MHz 입력 클럭을 이용한 분·초 카운터와 10ms 단위 스톱워치 구현', '시계·스톱워치·일시정지·초기화 상태를 FSM으로 제어', '버튼 디바운싱과 4자리 FND 다중화 출력 구현', '일시정지 후 3초 무입력 시 세그먼트 애니메이션 표시', '테스트벤치로 버튼 입력과 상태 전환 파형 확인'],
    resources: [
      { label: '시계·스톱워치 소스', url: 'https://github.com/AI-System-Semiconductor-SW-Develop/FPGA-Verilog-Projects/tree/main/minsec_stopwatch_project' },
      { label: '시연 영상', url: 'https://github.com/AI-System-Semiconductor-SW-Develop/FPGA-Verilog-Projects/blob/main/minsec_stopwatch_project/media/demo.mp4' },
      { label: '발표 자료', url: 'https://github.com/AI-System-Semiconductor-SW-Develop/FPGA-Verilog-Projects/blob/main/minsec_stopwatch_project/docs/minsec-stopwatch.pptx' }
    ]
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
    role: '전체 구현',
    features: ['UART1 블루투스 명령을 받아 전진·후진·좌우 회전·정지 처리', '초음파 Echo 인터럽트와 Timer3를 이용한 거리 측정 및 타임아웃 처리', '전방·좌우 거리에 따른 장애물 회피와 수동·자동 모드 전환 구현', 'Timer1 PWM으로 모터를 구동하고 FND에 주행 시간과 기록 표시', '모터와 FND가 공유하는 PORTF의 비트를 보존하도록 출력 처리'],
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
    features: ['숫자 스택과 연산자 스택을 이용한 수식 계산 로직 구현', '사칙연산의 우선순위 비교와 계산 결과 반환 처리', '버튼 입력 감지 및 입력 상태 처리'],
    resources: [{ label: '발표 자료', url: 'https://github.com/AI-System-Semiconductor-SW-Develop/avr-projects/blob/main/rtc-calculator/docs/presentation.pptx' }]
  },
  {
    slug: 'jetson-rps-game', index: '07', title: 'Vision RPS Game',
    videos: [{ label: 'RPC Game 시연', src: '/videos/rcp_game_project.mp4' }],
    subtitle: '카메라로 손동작을 인식하는 가위바위보 게임',
    summary: 'Jetson에서 TensorRT 추론부터 승패 판정과 PyQt5 게임 화면까지 구현',
    description: '카메라 영상의 손동작을 가위·바위·보로 인식하는 Jetson Orin Nano 게임입니다. YOLO 모델의 TensorRT 추론을 연결하고, 영상 전처리와 검출 결과 후처리, 승패 판정, 게임 화면을 구현했습니다. 컴퓨터와 대결하는 싱글 모드와 화면 좌우의 두 사람이 대결하는 멀티 모드를 제공합니다.',
    category: 'JETSON / COMPUTER VISION', tags: ['Python', 'Jetson Orin Nano', 'TensorRT', 'PyQt5', 'OpenCV', 'YOLO'],
    fallback: 'vehicle', github: 'https://github.com/AI-System-Semiconductor-SW-Develop/RCP_game_project',
    role: '전체 구현',
    features: ['카메라 프레임 전처리, TensorRT 추론 및 클래스별 NMS 후처리 구현', '화면 좌우에서 플레이어의 손을 선택하고 최근 7프레임 중 5회 이상 일치한 손동작으로 판정', '3초 카운트다운, 승패 판정과 점수 누적 처리', 'PyQt5로 싱글·멀티 모드 선택, 카메라 화면, 라운드 진행 UI 구현']
  },
  {
    slug: 'stm32-motor-control', index: '08', title: 'STM32 Motor Control',
    subtitle: '인터럽트와 FSM 기반 모터 방향·속도 제어',
    summary: '버튼과 UART 입력으로 모터 방향·속도·정지를 제어하는 펌웨어',
    description: 'STM32에서 버튼으로 회전 방향을 바꾸고 UART 명령으로 PWM 속도를 조절하는 모터 제어 프로젝트입니다. 정지·정회전·역회전·전환 대기 상태를 나누고, 방향을 바꾸기 전에 잠시 정지하도록 구성했습니다. 인터럽트에서는 이벤트를 기록하고 메인 루프에서 모터 동작을 처리합니다.',
    category: 'STM32 / MOTOR CONTROL', tags: ['C', 'STM32', 'FSM', 'PWM', 'UART', 'Interrupt'],
    fallback: 'fan', github: 'https://github.com/AI-System-Semiconductor-SW-Develop/motor_control_mini_project',
    role: '전체 구현',
    features: ['STOP·CW·CCW·SHORT_STOP 상태로 모터 제어 흐름 구성', '버튼 외부 인터럽트와 타이머를 이용한 방향 전환 및 길게 누르기 정지 처리', 'UART 숫자 명령을 PWM 속도 단계에 연결', '방향 전환 대기 시간을 타이머로 처리하고 메인 루프에서 다음 상태 적용']
  },
  {
    slug: 'stm32-ws2812b', index: '09', title: 'WS2812B LED Control',
    subtitle: 'PWM·DMA를 이용한 LED 데이터 전송',
    summary: 'STM32 타이머와 DMA를 연결해 WS2812B LED 4개의 GRB 데이터 전송',
    description: 'WS2812B LED의 GRB 데이터를 PWM 듀티 값으로 변환해 DMA로 전송하는 프로젝트입니다. LED 4개에 필요한 96비트 버퍼를 구성하고 TIM2 PWM 출력과 DMA를 연결했습니다. 전송 사이의 리셋 구간은 TIM4 원샷 타이머로 처리했습니다.',
    category: 'STM32 / PWM & DMA', tags: ['C', 'STM32', 'PWM', 'DMA', 'WS2812B', 'Timer'],
    fallback: 'fan', github: 'https://github.com/AI-System-Semiconductor-SW-Develop/communication_control',
    role: '전체 구현',
    features: ['GRB 각 8비트를 0·1에 대응하는 PWM 듀티 배열로 변환', 'TIM2 CH3와 DMA1 Stream1을 연결해 96개 듀티 값 전송', 'GPIO Low 구간과 TIM4 원샷 타이머로 리셋 타이밍 처리', '타이머 시작 전 업데이트 플래그와 NVIC pending 상태를 초기화해 조기 인터럽트 방지']
  }
];
