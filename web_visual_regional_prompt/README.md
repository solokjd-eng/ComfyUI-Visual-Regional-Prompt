# 📐 Visual Grid Regional Prompt Studio (Web App)

ComfyUI 커스텀 노드 [ComfyUI-Visual-Regional-Prompt](https://github.com/solokjd-eng/ComfyUI-Visual-Regional-Prompt)의 핵심 기능을 브라우저에서 바로 사용할 수 있도록 구축한 **웹 스튜디오 버전**입니다.

Krea 2, Midjourney, Flux, Stable Diffusion 3, GPT-4o, MiniMax, DALL-E 등 최신 생성형 AI 모델에 최적화된 **복합 공간 분할 프롬프트**를 시각적으로 디자인하고 실시간 생성할 수 있습니다.

---

## 🌟 주요 기능 (Key Features)

1. **시각적 드래그 & 드롭 캔버스 (Interactive Visual Grid)**
   * `16:9`, `9:16`, `1:1`, `4:3`, `3:4`, `3:2`, `21:9` 화면비 완벽 지원
   * 원하는 그리드 칸 수(Cols x Rows) 자유 조절
   * 마우스 드래그로 직사각형 영역(Area)을 즉시 생성 및 네온 컬러 자동 배정

2. **원클릭 추천 레이아웃 템플릿 (Layout Presets)**
   * 👑 **캐릭터 시트 3분할 앙상블**: 왼쪽 전신 + 우상단 얼굴 클로즈업 + 우하단 상반신
   * 📐 **4컷 멀티 앵글 시트**: 정면, 측면, 액션, 뒷모습 4분할
   * 💬 **만화 컷 분할 (Comic Story)**: 3단 와이드 컷 분할
   * ⚔️ **2인 대치 샷 (Side-by-Side Duel)**
   * 📱 **9:16 숏폼 세로 3단 스토리**

3. **원클릭 샷/구도 프리셋 & 한글 실시간 번역**
   * 인물 앵글(전신, 상반신, 클로즈업, 45도, 하이앵글, 로우앵글 등) 드롭다운 및 퀵 태그 칩
   * 한글로 작성 후 `Ctrl + Enter` 또는 번역 버튼 클릭 시 AI 표준 영문 키워드로 자동 치환

4. **다양한 AI 엔진별 출력 포맷 지원**
   * **자연어 공간 표현 (Natural Spatial)**: Krea 2, MiniMax, Flux, Midjourney 최적화 (글자 새김 아티팩트 방지)
   * **ComfyUI / SD Regional (BREAK 문법)**: Stable Diffusion 지역 프롬프트
   * **구조화 태그 (Structured Tags)**: `[Area 1 - Left] ...`
   * **바운딩 박스 (Bounding Box)**: `<area_1 bbox="[0.0, 0.0, 0.5, 1.0]">`
   * **원시 데이터 (Raw JSON)**: 프리셋 저장 및 연동용

5. **원클릭 스타일 옵션**
   * ⚪ 스튜디오 백색 배경 (White Backdrop)
   * 🔳 검정 실선 격자 (Black Divider Lines)
   * 👤 캐릭터 시트 최적화 (Consistency & Uniform Lighting)
   * ✨ 실루엣 목업 표시 (Visual Figure Silhouette)

---

## 🚀 실행 방법

### 방법 1. 배치 파일 실행
폴더 내 `start_web.bat`을 더블 클릭하면 자동으로 로컬 서버가 시작되고 브라우저가 열립니다.

### 방법 2. PowerShell 실행
```powershell
.\start_web.ps1
```

### 방법 3. GitHub Pages 무료 배포
이 `web_visual_regional_prompt` 폴더를 GitHub 저장소에 올리고 **Settings > Pages**를 활성화하면 웹 주소로 언제 어디서든 접속할 수 있습니다!
