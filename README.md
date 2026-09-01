# 📐 ComfyUI Visual Grid Regional Prompt Node (비주얼 그리드 프롬프트)

화면을 바둑판 그리드 형태로 나누어, 마우스 드래그로 원하는 영역(구역)을 시각적으로 지정하고 각 구역의 프롬프트를 입력하여 **최신 AI(Krea 2, MiniMax, Gemini, ChatGPT, Sora 등)**에 최적화된 복합 공간 레이아웃 프롬프트(STRING)를 만들어내는 ComfyUI 전용 커스텀 노드입니다.

---

## ✨ 주요 기능

1. **화면 비율(Aspect Ratio) 자유 조절**
   * `16:9`, `9:16`, `1:1`, `4:3`, `3:4`, `3:2`, `2:3`, `21:9` 지원
   * 비율 변경 시 노드 내부 캔버스 비율이 실시간으로 변형

2. **가로/세로 칸 수(Grid) 조절**
   * 기본 6x3 격자 외에도 원하는 가로칸, 세로칸 수를 입력하고 [적용] 클릭 시 즉시 갱신

3. **직관적인 마우스 조작 인터페이스**
   * **좌클릭 드래그**: 빈 칸들을 드래그하면 직사각형 영역으로 묶이며 ①, ②, ③... 번호 부여 및 고유 색상 하이라이트
   * **좌클릭 1회 (영역 클릭)**: 해당 영역의 프롬프트 입력/수정 팝업창 표시
   * **우클릭 1회 (영역 클릭)** 또는 **우상단 [×] 버튼**: 해당 영역 지정 해제 및 번호 자동 재정렬

4. **다양한 출력 포맷 지원**
   * **Natural Spatial**: Krea 2, MiniMax, Sora, Gemini 등 최신 멀티모달 AI가 완벽히 인식하는 자연어 구도 문장
   * **Structured Tags**: `[Area 1 - Left Column]: ...` 형식의 구조화된 태그 포맷
   * **Comma-Separated**: 번호 순서대로 프롬프트만 쉼표로 연결
   * **Raw JSON**: 커스텀 파이프라인이나 LLM 연동용 원본 JSON 데이터

5. **다국어 UI 지원**
   * **한국어** / **English** 원클릭 전환

---

## 🚀 설치 및 적용 방법

1. [install_junction.bat](file:///e:/Downloads/ComfyUI-Visual-Regional-Prompt/install_junction.bat) 파일을 더블 클릭하여 실행합니다.
   * `D:\utill\AI\Data\Packages\ComfyUI_new\custom_nodes\` 경로로 정션(Junction)이 자동 생성됩니다.
2. ComfyUI를 실행하거나 재시작합니다.
3. ComfyUI 빈 캔버스에서 더블 클릭 후 **`Visual Grid Regional Prompt`** (또는 `비주얼 그리드`)를 검색하여 노드를 추가합니다.
