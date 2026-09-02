# 📐 ComfyUI Visual Grid Regional Prompt (비주얼 그리드 프롬프트)

화면을 바둑판 그리드(Grid) 형태로 나누어, 마우스 드래그로 원하는 영역을 시각적으로 지정하고 각 구역의 프롬프트를 설정하여 **최신 이미지/영상 AI(Krea 2, MiniMax, Flux, SD3, Midjourney, Gemini, ChatGPT 등)**에 최적화된 복합 공간 레이아웃 프롬프트(STRING)를 생성하는 ComfyUI 전용 커스텀 노드입니다.

---

## ✨ 주요 기능 (Key Features)

1. **시각적 그리드 캔버스 & 모서리 리사이즈 (Interactive Resizable Grid Canvas)**
   * `16:9`, `9:16`, `1:1`, `4:3`, `3:4`, `3:2`, `2:3`, `21:9` 등 다양한 화면비 지원.
   * 그리드 캔버스 우측 하단 모서리를 마우스로 드래그하여 **원하는 크기로 확대/축소** 가능 (새로고침 시 크기 기억).
   * **마우스 조작 최적화**: 노드 위에서 마우스 중간 버튼 클릭 드래그(Canvas Pan) 및 휠 줌(Zoom) 완벽 지원.

2. **직관적인 영역(Area) 지정 & 번호 관리**
   * **좌클릭 드래그**: 원하는 크기의 직사각형 구역을 자유롭게 생성 (자동 번호 부여 및 고유 네온 색상 하이라이트).
   * **구역 클릭**: 프롬프트 설정 팝업창 열기.
   * **우클릭** 또는 **우상단 [×] 버튼**: 구역 삭제 및 번호 자동 재정렬.

3. **원클릭 샷/구도 프리셋 & 실시간 자동 영문 번역**
   * **원클릭 프리셋**: 얼굴, 상반신, 전신, 45도 각도, 클로즈업 등 체계적인 샷/구도 프리셋 드롭다운 지원 (선택 시 즉시 적용).
   * **직접 한글 입력**: 한글로 입력 시 실시간 무료 번역 API 및 AI 최적화 사전 기반으로 자연스러운 영어 프롬프트로 자동 변환.

4. **원클릭 스타일 옵션 토글 바**
   * **⚪ 백색 배경 [ON/OFF]**: 스튜디오 순백색 배경(Clean Studio White Backdrop) 효과 적용.
   * **🔳 검정 실선 격자 [ON/OFF]**: 각 구역을 얇은 검정 실선(Black Divider Lines)으로 명확히 구분하는 만화/콜라주 패널 레이아웃 적용.
   * **👤 캐릭터 시트용 추천 효과 [ON/OFF]**: 인물 일관성(Model Sheet Consistency), 균일한 스튜디오 조명(Soft Even Studio Lighting), 전 패널 선명도(Sharp Focus)를 접두사/접미사에 원클릭 자동 반영.

5. **텍스트 렌더링 아티팩트 방지 (Natural Spatial Output)**
   * 이미지 내에 숫자나 글자가 새겨지는 문제를 방지하기 위해 좌표/숫자 대신 자연스러운 영어 위치 표현(`On the left side (full height)`, `In the top-center panel` 등)과 글자 방지 네거티브 키워드를 자동 조합.

6. **프롬프트 미리보기 창 자동 조절 & 높이 기억**
   * 텍스트 길이에 따라 자동으로 높이가 유연하게 늘어나며, 사용자가 수동 조절한 높이도 영구 기억.

---

## 🚀 설치 방법 (Installation)

### 방법 1: Git Clone
ComfyUI의 `custom_nodes` 디렉토리에서 아래 명령어를 실행합니다:
```bash
cd ComfyUI/custom_nodes
git clone https://github.com/solokjd-eng/ComfyUI-Visual-Regional-Prompt.git
```

### 방법 2: ComfyUI Manager
1. ComfyUI Manager에서 **`Visual Grid Regional Prompt`** 검색 후 설치합니다.
2. ComfyUI를 재시작하고 웹 브라우저에서 **`Ctrl + Shift + R`**(강력 새로고침)을 실행합니다.

---

## 📄 라이선스 (License)
MIT License
