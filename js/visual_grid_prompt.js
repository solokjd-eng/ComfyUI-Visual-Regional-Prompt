import { app } from "../../scripts/app.js";

// 다국어 UI 텍스트 사전
const I18N = {
    "한국어": {
        aspectRatio: "화면비",
        cols: "가로",
        rows: "세로",
        apply: "적용",
        format: "출력 포맷",
        lang: "UI:",
        whiteBg: "⚪ 백색 배경",
        whiteBgTooltip: "배경을 깔끔한 순백색 스튜디오(White Studio Backdrop)로 설정",
        blackGrid: "🔳 검정 실선 격자",
        blackGridTooltip: "각 구역을 얇은 검정색 실선(Black Divider Lines)으로 명확하게 분할",
        charSheet: "👤 캐릭터 시트용 추천 효과",
        charSheetTooltip: "동일 인물 일관성, 균일한 스튜디오 조명, 전 패널 선명도 효과를 접두사/접미사에 자동 적용",
        prefix: "접두사 (Prefix):",
        prefixPlaceholder: "공통 스타일, 조명 등 (예: masterpiece, cinematic lighting)...",
        suffix: "접미사 (Suffix):",
        suffixPlaceholder: "공통 마감 태그 (예: 8k resolution, photorealistic)...",
        generate: "✨ 프롬프트 생성 & 동기화",
        clearAll: "전체 초기화",
        guide1: "🖱️ 마우스 드래그: 원하는 크기의 직사각형 구역(Area) 생성",
        guide2: "✏️ 번호 구역 클릭: 프롬프트 입력 및 자동 영문 번역",
        guide3: "❌ 우클릭 / [×] 클릭: 구역 삭제",
        modalTitle: "구역 프롬프트 설정 (한글 입력 시 자동 영문 번역)",
        modalArea: "구역",
        modalPos: "위치",
        presetLabel: "⚡ 프리셋 선택 (원클릭 샷/각도):",
        presetDefault: "▼ ⚡ 프리셋 선택 (샷/구도)",
        directInputLabel: "✏️ 직접 한글 입력 (실시간 자동 번역):",
        directPlaceholder: "예: 전신 정면, 양손으로 볼을 당기는...",
        modalKoLabel: "🇰🇷 한글 프롬프트 (프리셋 선택 또는 직접 입력):",
        modalKoPlaceholder: "예: 전신 정면, 얼굴 클로즈업 측면, 사이버펑크 도시 배경...",
        modalEnLabel: "🇺🇸 영문 자동 번역 (AI 전달용 / 직접 수정 가능):",
        modalEnPlaceholder: "full body, front view, 1girl, smiling...",
        apiBadgeReady: "🌐 무료 실시간 번역 API 연동",
        apiBadgeTranslating: "⏳ 실시간 번역 중...",
        apiBadgeDone: "✅ 실시간 번역 완료",
        apiBadgePreset: "⚡ 프리셋 적용 완료",
        modalSave: "적용 (Ctrl+Enter)",
        modalCancel: "취소 (Esc)",
        modalDelete: "구역 삭제",
        previewTitle: "최종 출력 프롬프트 (100% 영문 AI 최적화):",
        previewPlaceholder: "구역을 생성하고 프롬프트를 입력하면 여기에 실시간으로 조합됩니다.",
        copyBtn: "📋 복사",
        copied: "복사 완료!"
    },
    "English": {
        aspectRatio: "Ratio",
        cols: "Cols",
        rows: "Rows",
        apply: "Apply",
        format: "Format",
        lang: "UI:",
        whiteBg: "⚪ White BG",
        whiteBgTooltip: "Set clean pure solid white background",
        blackGrid: "🔳 Black Grid Lines",
        blackGridTooltip: "Demarcate each area with thin black border lines",
        charSheet: "👤 Char Sheet Preset",
        charSheetTooltip: "Automatically apply character model sheet consistency, even studio lighting, and sharp focus to prefix/suffix",
        prefix: "Prefix Prompt:",
        prefixPlaceholder: "Global style, lighting (e.g. masterpiece, cinematic lighting)...",
        suffix: "Suffix Prompt:",
        suffixPlaceholder: "Global suffix tags (e.g. 8k resolution, photorealistic)...",
        generate: "✨ Generate & Sync Prompt",
        clearAll: "Clear All",
        guide1: "🖱️ Mouse Drag: Create custom rectangular Area",
        guide2: "✏️ Click Area: Edit Prompt & Auto-translate",
        guide3: "❌ Right Click / [×]: Delete Area",
        modalTitle: "Area Prompt Editor (Auto-Translate enabled)",
        modalArea: "Area",
        modalPos: "Position",
        presetLabel: "⚡ Quick Preset (Shot/Angle):",
        presetDefault: "▼ ⚡ Select Preset (Shot/Angle)",
        directInputLabel: "✏️ Custom Input (Real-time translation):",
        directPlaceholder: "e.g. full body, pulling cheeks...",
        modalKoLabel: "🇰🇷 Korean Prompt (Preset or Custom):",
        modalKoPlaceholder: "e.g. full body front, cyberpunk city...",
        modalEnLabel: "🇺🇸 English Prompt (Sent to AI / Editable):",
        modalEnPlaceholder: "full body, front view, cyberpunk city...",
        apiBadgeReady: "🌐 Real-time Translation API",
        apiBadgeTranslating: "⏳ Translating in real-time...",
        apiBadgeDone: "✅ Translated successfully",
        apiBadgePreset: "⚡ Preset applied",
        modalSave: "Apply (Ctrl+Enter)",
        modalCancel: "Cancel (Esc)",
        modalDelete: "Delete Area",
        previewTitle: "Generated Output Prompt (100% English AI Optimized):",
        previewPlaceholder: "Create areas and enter prompts to see real-time output here.",
        copyBtn: "📋 Copy",
        copied: "Copied!"
    }
};

// 엑셀 표 기반 체계적 샷/구도 프리셋 그룹 (한국어 + 영어)
const PRESET_GROUPS = [
    {
        group: "얼굴 - 일반 (Face)",
        items: [
            { label: "얼굴 일반: 정면 (Front View)", ko: "얼굴 정면", en: "face, front view, detailed facial features" },
            { label: "얼굴 일반: 측면 (Side View)", ko: "얼굴 측면", en: "face, side profile view" },
            { label: "얼굴 일반: 45도 측면 (3/4 View)", ko: "얼굴 45도 측면", en: "face, three-quarter view, 45-degree angle" },
            { label: "얼굴 일반: 후면 (Back View)", ko: "얼굴 후면", en: "back of head, from behind" },
            { label: "얼굴 일반: 위에서 내려다 보기 (High Angle)", ko: "얼굴 하이앵글 (위에서)", en: "face, high angle, from above" },
            { label: "얼굴 일반: 아래에서 올려다 보기 (Low Angle)", ko: "얼굴 로우앵글 (아래에서)", en: "face, low angle, from below" }
        ]
    },
    {
        group: "얼굴 - 초근접 (Extreme Close-Up)",
        items: [
            { label: "얼굴 초근접: 정면 (Front View)", ko: "얼굴 초근접 정면", en: "extreme close-up face, front view, macro detail" },
            { label: "얼굴 초근접: 측면 (Side View)", ko: "얼굴 초근접 측면", en: "extreme close-up face, side profile view" },
            { label: "얼굴 초근접: 45도 측면 (3/4 View)", ko: "얼굴 초근접 45도 측면", en: "extreme close-up face, three-quarter view, 45-degree angle" },
            { label: "얼굴 초근접: 후면 (Back View)", ko: "얼굴 초근접 후면", en: "extreme close-up back of head" },
            { label: "얼굴 초근접: 위에서 내려다 보기 (High Angle)", ko: "얼굴 초근접 하이앵글", en: "extreme close-up face, high angle, from above" },
            { label: "얼굴 초근접: 아래에서 올려다 보기 (Low Angle)", ko: "얼굴 초근접 로우앵글", en: "extreme close-up face, low angle, from below" }
        ]
    },
    {
        group: "상반신 - 가슴까지 (Bust Shot)",
        items: [
            { label: "상반신 (가슴): 정면 (Front View)", ko: "상반신 가슴 정면", en: "bust shot, upper body, front view" },
            { label: "상반신 (가슴): 측면 (Side View)", ko: "상반신 가슴 측면", en: "bust shot, upper body, side profile view" },
            { label: "상반신 (가슴): 45도 측면 (3/4 View)", ko: "상반신 가슴 45도 측면", en: "bust shot, upper body, three-quarter view, 45-degree angle" },
            { label: "상반신 (가슴): 후면 (Back View)", ko: "상반신 가슴 후면", en: "bust shot, upper body, back view, from behind" },
            { label: "상반신 (가슴): 위에서 내려다 보기 (High Angle)", ko: "상반신 가슴 하이앵글", en: "bust shot, upper body, high angle, from above" },
            { label: "상반신 (가슴): 아래에서 올려다 보기 (Low Angle)", ko: "상반신 가슴 로우앵글", en: "bust shot, upper body, low angle, from below" }
        ]
    },
    {
        group: "상반신 - 허리까지 (Waist Shot)",
        items: [
            { label: "상반신 (허리): 정면 (Front View)", ko: "상반신 허리 정면", en: "waist shot, waist up, front view" },
            { label: "상반신 (허리): 측면 (Side View)", ko: "상반신 허리 측면", en: "waist shot, waist up, side profile view" },
            { label: "상반신 (허리): 45도 측면 (3/4 View)", ko: "상반신 허리 45도 측면", en: "waist shot, waist up, three-quarter view, 45-degree angle" },
            { label: "상반신 (허리): 후면 (Back View)", ko: "상반신 허리 후면", en: "waist shot, waist up, back view, from behind" },
            { label: "상반신 (허리): 위에서 내려다 보기 (High Angle)", ko: "상반신 허리 하이앵글", en: "waist shot, waist up, high angle, from above" },
            { label: "상반신 (허리): 아래에서 올려다 보기 (Low Angle)", ko: "상반신 허리 로우앵글", en: "waist shot, waist up, low angle, from below" }
        ]
    },
    {
        group: "전신 - 일반 (Full Body)",
        items: [
            { label: "전신: 정면 (Front View)", ko: "전신 정면", en: "full body, front view" },
            { label: "전신: 측면 (Side View)", ko: "전신 측면", en: "full body, side profile view" },
            { label: "전신: 45도 측면 (3/4 View)", ko: "전신 45도 측면", en: "full body, three-quarter view, 45-degree angle" },
            { label: "전신: 후면 (Back View)", ko: "전신 후면", en: "full body, back view, from behind" },
            { label: "전신: 위에서 내려다 보기 (High Angle)", ko: "전신 하이앵글", en: "full body, high angle, bird-eye view, from above" },
            { label: "전신: 아래에서 올려다 보기 (Low Angle)", ko: "전신 로우앵글", en: "full body, low angle, worm-eye view, from below" }
        ]
    },
    {
        group: "하반신 - 일반 (Lower Body)",
        items: [
            { label: "하반신: 정면 (Front View)", ko: "하반신 정면", en: "lower body, legs, front view" },
            { label: "하반신: 측면 (Side View)", ko: "하반신 측면", en: "lower body, legs, side profile view" },
            { label: "하반신: 45도 측면 (3/4 View)", ko: "하반신 45도 측면", en: "lower body, legs, three-quarter view, 45-degree angle" },
            { label: "하반신: 후면 (Back View)", ko: "하반신 후면", en: "lower body, legs, back view, from behind" },
            { label: "하반신: 위에서 내려다 보기 (High Angle)", ko: "하반신 하이앵글", en: "lower body, legs, high angle, from above" },
            { label: "하반신: 아래에서 올려다 보기 (Low Angle)", ko: "하반신 로우앵글", en: "lower body, legs, low angle, from below" }
        ]
    },
    {
        group: "소품 & 배경 (Props & Background)",
        items: [
            { label: "소품 / 오브젝트 (Props)", ko: "소품 오브젝트", en: "detailed prop, focused object" },
            { label: "사이버펑크 도시 (Cyberpunk City)", ko: "사이버펑크 도시", en: "cyberpunk neon city, glowing holographic lights" },
            { label: "자연 / 숲 (Lush Forest)", ko: "자연 숲 배경", en: "lush forest, trees, dappled sunlight" },
            { label: "해변 / 바다 (Ocean Beach)", ko: "해변 바다 배경", en: "ocean, sandy beach, sea waves" },
            { label: "아늑한 실내 (Cozy Room)", ko: "아늑한 실내 방", en: "indoor room, cozy interior" }
        ]
    }
];

// 고유 파스텔 컬러 팔레트
const AREA_COLORS = [
    { bg: "rgba(59, 130, 246, 0.45)", border: "#3b82f6", text: "#93c5fd" }, // Blue
    { bg: "rgba(16, 185, 129, 0.45)", border: "#10b981", text: "#6ee7b7" }, // Emerald
    { bg: "rgba(245, 158, 11, 0.45)", border: "#f59e0b", text: "#fcd34d" }, // Amber
    { bg: "rgba(239, 68, 68, 0.45)",  border: "#ef4444", text: "#fca5a5" }, // Red
    { bg: "rgba(168, 85, 247, 0.45)", border: "#a855f7", text: "#d8b4fe" }, // Purple
    { bg: "rgba(236, 72, 153, 0.45)", border: "#ec4899", text: "#f9a8d4" }, // Pink
    { bg: "rgba(20, 184, 166, 0.45)", border: "#14b8a6", text: "#5eead4" }, // Teal
    { bg: "rgba(249, 115, 22, 0.45)", border: "#f97316", text: "#fdba74" }, // Orange
];

// 한글 ➡️ 영문 AI 프롬프트 규칙 기반 번역 사전
const PROMPT_TRANSLATIONS = [
    // 1. 복합 샷 & 부위 & 각도 (가장 긴 복합 패턴 우선 매칭)
    [/(얼굴\s*)?클로즈업\s*(45도(\s*측면|\s*각도)?|반측면|쿼터뷰)/gi, "close-up shot, detailed face, three-quarter view, 45-degree angle"],
    [/(얼굴\s*)?클로즈업\s*측면/gi, "close-up shot, detailed face, side profile view"],
    [/(얼굴\s*)?클로즈업\s*정면/gi, "close-up shot, detailed face, front view"],
    [/얼굴\s*클로즈업/gi, "close-up shot, detailed face"],
    [/얼굴\s*정면|정면\s*얼굴/gi, "detailed face, front view"],
    [/얼굴\s*측면|측면\s*얼굴/gi, "detailed face, side profile view"],
    [/익스트림\s*클로즈업|초근접/gi, "extreme close-up shot, macro detail"],
    [/클로즈업/gi, "close-up shot"],

    [/전신\s*(45도(\s*측면|\s*각도)?|반측면|쿼터뷰)/gi, "full body, three-quarter view, 45-degree angle"],
    [/전신\s*정면/gi, "full body, front view"],
    [/전신\s*측면/gi, "full body, side profile view"],
    [/전신\s*(후면|뒷모습)/gi, "full body, back view"],
    [/전신/gi, "full body"],

    [/상반신\s*(45도(\s*측면|\s*각도)?|반측면|쿼터뷰)/gi, "upper body, three-quarter view, 45-degree angle"],
    [/상반신\s*정면/gi, "upper body, front view"],
    [/상반신\s*측면/gi, "upper body, side profile view"],
    [/상반신\s*(후면|뒷모습)/gi, "upper body, back view"],
    [/상반신/gi, "upper body, waist up"],

    [/하반신\s*(45도(\s*측면|\s*각도)?|반측면|쿼터뷰)/gi, "lower body, legs, three-quarter view, 45-degree angle"],
    [/하반신\s*정면/gi, "lower body, legs, front view"],
    [/하반신\s*측면/gi, "lower body, legs, side profile view"],
    [/하반신\s*(후면|뒷모습)/gi, "lower body, legs, back view"],
    [/하반신/gi, "lower body, legs"],

    // 2. 헤어 & 눈 & 캐릭터 외모 (단일 음절 신체 부위보다 먼저 매칭하여 '은발'이 '은+feet'로 오치환되는 것 방지)
    [/은발/gi, "silver hair"],
    [/백발/gi, "white hair"],
    [/금발/gi, "blonde hair"],
    [/흑발|검은\s*머리/gi, "black hair"],
    [/갈색\s*머리|갈발/gi, "brown hair"],
    [/붉은\s*머리|적발/gi, "red hair"],
    [/파란\s*머리|청발/gi, "blue hair"],
    [/분홍\s*머리|핑크\s*(헤어|머리)/gi, "pink hair"],
    [/보라색\s*머리/gi, "purple hair"],
    [/녹색\s*머리|초록\s*머리/gi, "green hair"],
    [/단발/gi, "short bob hair"],
    [/장발|긴\s*머리/gi, "long flowing hair"],
    [/숏컷/gi, "pixie cut, short hair"],
    [/포니테일/gi, "ponytail hair"],
    [/트윈테일|양갈래/gi, "twintails hair"],
    [/땋은\s*머리/gi, "braided hair"],
    [/웨이브\s*머리|곱슬머리/gi, "wavy curly hair"],
    [/생머리/gi, "straight hair"],
    [/푸른\s*눈|파란\s*눈/gi, "blue eyes"],
    [/붉은\s*눈|빨간\s*눈/gi, "red eyes"],
    [/녹색\s*눈|초록\s*눈/gi, "green eyes"],
    [/보라색\s*눈/gi, "purple eyes"],
    [/금안|노란\s*눈/gi, "golden eyes"],
    [/오드아이/gi, "heterochromia, odd eyes"],

    [/(\d+)\s*세/gi, "$1-year-old"],
    [/한국인|한국\s*(사람|여성|소녀|소년대)?/gi, "korean"],
    [/여고생|고등학교\s*여학생/gi, "high school girl, student"],
    [/남고생|고등학교\s*남학생/gi, "high school boy, student"],
    [/여대생|대학생\s*여성/gi, "college girl, university student"],
    [/어여쁜\s*소녀|예쁜\s*소녀|소녀|미소녀/gi, "1girl, beautiful girl"],
    [/여자|여성|미녀/gi, "1woman, beautiful woman"],
    [/소년|미소년/gi, "1boy, handsome boy"],
    [/남자|남성|미남/gi, "1man, handsome man"],
    [/어린이|아이/gi, "child, cute kid"],
    [/여우귀/gi, "fox ears, fennec ears"],
    [/고양이귀/gi, "cat ears"],
    [/토끼귀/gi, "rabbit ears"],
    [/엘프귀/gi, "elf ears"],
    [/날개|천사\s*날개/gi, "angel wings, feathered wings"],
    [/악마\s*날개/gi, "demon wings, bat wings"],
    [/꼬리/gi, "fluffy tail"],

    // 3. 앵글 & 시점 & 구도
    [/45도(\s*측면|\s*각도|\s*뷰)?|반측면|쿼터뷰/gi, "three-quarter view, 45-degree angle"],
    [/90도(\s*측면|\s*각도|\s*프로필)?/gi, "side profile view, 90-degree angle"],
    [/정면(\s*샷|\s*뷰)?/gi, "front view"],
    [/측면(\s*샷|\s*뷰)?/gi, "side profile view"],
    [/뒷모습|후면(\s*샷|\s*뷰)?/gi, "back view, from behind"],
    [/뒤돌아보는/gi, "looking back over shoulder"],
    [/오버더\s*숄더/gi, "over-the-shoulder shot"],
    [/바스트샷|가슴위/gi, "bust shot"],
    [/웨이스트샷|허리위/gi, "waist shot"],
    [/카우보이샷|무릎위/gi, "cowboy shot"],
    [/니샷/gi, "knee shot"],
    [/와이드샷|원경|파노라마/gi, "wide angle shot, panoramic view"],
    [/하이앵글|위에서|탑뷰|버드아이뷰/gi, "high angle, top-down bird-eye view, from above"],
    [/로우앵글|아래에서|웜아이뷰/gi, "low angle, worm-eye view, from below"],
    [/더치앵글|기울어진/gi, "dutch angle, tilted perspective"],
    [/아이레벨|눈높이/gi, "eye level view"],

    // 4. 의상 & 아이템
    [/웨딩드레스/gi, "wedding dress, white bridal gown"],
    [/이브닝드레스/gi, "evening dress, luxury gown"],
    [/원피스|드레스/gi, "dress, elegant outfit"],
    [/세일러복/gi, "sailor suit uniform"],
    [/교복/gi, "school uniform"],
    [/한복/gi, "hanbok, traditional korean dress"],
    [/기모노/gi, "kimono, traditional japanese outfit"],
    [/유카타/gi, "yukata"],
    [/치파오/gi, "cheongsam, qipao dress"],
    [/정장|수트/gi, "business suit, formal wear"],
    [/셔츠|와이셔츠/gi, "collared shirt"],
    [/블라우스/gi, "blouse"],
    [/후드티|후드/gi, "hoodie"],
    [/맨투맨/gi, "sweatshirt"],
    [/청바지/gi, "denim jeans"],
    [/미니스커트/gi, "miniskirt"],
    [/롱스커트/gi, "long skirt"],
    [/스커트|치마/gi, "skirt"],
    [/반바지|핫팬츠/gi, "shorts, hotpants"],
    [/수영복|비키니/gi, "swimsuit, bikini"],
    [/래시가드/gi, "rashguard"],
    [/메이드복/gi, "maid outfit, maid dress"],
    [/간호사복/gi, "nurse outfit"],
    [/갑옷|아머/gi, "armor, battle gear"],
    [/SF슈트|사이버슈트/gi, "sci-fi bodysuit, cyber armor"],
    [/코트|트렌치코트/gi, "trench coat, long coat"],
    [/자켓|재킷/gi, "jacket"],
    [/가디건/gi, "cardigan"],
    [/패딩/gi, "puffer jacket"],
    [/스타킹/gi, "stockings, pantyhose"],
    [/오버니삭스/gi, "over-knee socks"],
    [/하이힐/gi, "high heels"],
    [/부츠/gi, "boots"],
    [/스니커즈|운동화/gi, "sneakers"],
    [/안경/gi, "glasses"],
    [/선글라스/gi, "sunglasses"],
    [/모자/gi, "hat"],
    [/헤드폰/gi, "headphones"],
    [/초커/gi, "choker"],
    [/목걸이/gi, "necklace"],

    // 5. 표정 & 시선 & 제스처 & 자세 (얼굴 단일 단어 치환보다 먼저 매칭하여 복합 표현이 분리되지 않도록 처리)
    [/양손으로\s*볼(을)?\s*(양\s*옆으로\s*)?(잡아\s*당기[가-힣]*|꼬집[가-힣]*|늘리[가-힣]*)(\s*있는|\s*있음|\s*는|\s*며)?/gi, "pulling cheeks sideways with both hands, cheeks stretched"],
    [/볼(을)?\s*(양\s*옆으로\s*)?(잡아\s*당기[가-힣]*|꼬집[가-힣]*|늘리[가-힣]*)(\s*있는|\s*있음|\s*는|\s*며)?/gi, "pulling cheeks, cheeks stretched"],
    [/볼을\s*부풀린|볼\s*빵빵|뿌우/gi, "puffed cheeks, pouty face"],
    [/손가락을\s*입술에\s*댄|쉿\s*포즈/gi, "finger on lips, shh gesture"],
    [/입을\s*가린|손으로\s*입을\s*가린/gi, "covering mouth with hand"],
    [/머리를\s*쓸어넘기는/gi, "running fingers through hair"],
    [/안경을\s*고쳐쓰는|안경\s*올리는/gi, "adjusting glasses"],
    [/기도하는|두\s*손을\s*모은/gi, "praying hands, hands clasped"],
    [/양손을\s*허리에|허리에\s*손/gi, "hands on hips"],
    [/손하트|하트\s*포즈/gi, "finger heart, heart hands gesture"],
    [/양손으로|두\s*손으로/gi, "with both hands"],
    [/한손으로/gi, "with one hand"],
    [/활짝\s*웃는\s*얼굴|활짝\s*웃는|환한\s*미소/gi, "bright cheerful smile, laughing happily"],
    [/웃는\s*얼굴|미소짓는\s*얼굴|미소|웃음/gi, "smiling, gentle smile"],
    [/무표정한\s*얼굴|무표정|차분한|담담한/gi, "expressionless, calm face, neutral expression"],
    [/윙크/gi, "winking"],
    [/부끄러워하는|홍조|수줍은/gi, "blushing, shy expression"],
    [/놀란/gi, "surprised expression"],
    [/진지한|카리스마/gi, "serious charismatic gaze, intense expression"],
    [/슬픈|눈물/gi, "sad expression, tears"],
    [/눈을\s*감은|감은\s*눈/gi, "closed eyes"],
    [/눈을\s*반쯤\s*뜬/gi, "half-closed eyes"],
    [/카메라를\s*바라보는|바라보는|응시|시선/gi, "looking at viewer, eye contact"],
    [/시선\s*회피|먼곳을\s*바라보는/gi, "looking away, looking to the side"],
    [/서있는|서있음/gi, "standing pose"],
    [/앉아있는|앉음/gi, "sitting pose"],
    [/무릎\s*꿇은/gi, "kneeling pose"],
    [/누워있는|누움/gi, "lying down pose"],
    [/엎드린/gi, "lying on stomach"],
    [/기대어\s*있는|기댐/gi, "leaning against"],
    [/쪼그려\s*앉은|웅크린/gi, "squatting, crouching pose"],
    [/달리는|뜀/gi, "running"],
    [/걷는|걸어감/gi, "walking"],
    [/점프|도약/gi, "jumping"],
    [/춤추는|댄스/gi, "dancing"],
    [/손을\s*흔드는/gi, "waving hand"],
    [/팔짱\s*낀/gi, "arms crossed"],
    [/주머니에\s*손/gi, "hands in pockets"],
    [/턱을\s*괸/gi, "resting chin on hand"],
    [/손을\s*뻗은|손을\s*내미는/gi, "reaching out hand towards viewer"],
    [/브이(\s*포즈)?|V\s*포즈/gi, "peace sign, v gesture"],
    [/포즈|자세/gi, "pose"],

    // 6. 인체 부위 & 디테일 (헤어/표정 이후 매칭)
    [/얼굴/gi, "face, detailed face"],
    [/목선|쇄골/gi, "collarbone, graceful neck"],
    [/가슴|바스트/gi, "chest, bust"],
    [/허리/gi, "slender waist"],
    [/골반|엉덩이|힙/gi, "hips, buttocks"],
    [/허벅지/gi, "thighs"],
    [/다리|각선미/gi, "legs, beautiful slender legs"],
    [/발목|맨발|발/gi, "feet, ankles"],
    [/손|손가락/gi, "delicate hands, detailed fingers"],
    [/어깨/gi, "shoulders"],

    // 7. 배경 & 조명 & 환경
    [/백색\s*배경|흰색\s*배경|화이트\s*배경/gi, "clean solid pure white background, studio white backdrop"],
    [/검정\s*(색\s*)?실선\s*(격자)?|분할선|격자선/gi, "split-screen multi-panel layout, separated by thin black divider lines"],
    [/사이버펑크(\s*도시)?/gi, "cyberpunk neon city, glowing holographic lights"],
    [/미래\s*도시|SF\s*도시/gi, "futuristic sci-fi city, high-tech skyscrapers"],
    [/도시|빌딩숲|거리/gi, "modern cityscape, streets, skyscrapers"],
    [/골목길/gi, "narrow alleyway, cozy street"],
    [/카페/gi, "cafe, cozy coffee shop"],
    [/실내|방|침실/gi, "indoor room, cozy bedroom interior"],
    [/도서관/gi, "library, bookshelves"],
    [/교실|학교/gi, "classroom, school interior"],
    [/야외|자연/gi, "outdoors, nature"],
    [/숲|나무|밀림/gi, "lush forest, trees, dappled sunlight"],
    [/해변|바다|해안가/gi, "ocean, sandy beach, sea waves"],
    [/하늘|푸른\s*하늘/gi, "blue sky, fluffy white clouds"],
    [/밤하늘|은하수|우주/gi, "night sky, starry galaxy, nebula outer space"],
    [/노을|일몰|석양/gi, "sunset, golden hour, warm atmospheric glow"],
    [/야경|밤/gi, "night scene, dark atmospheric lighting"],
    [/비오는|비/gi, "rainy day, wet floor reflections"],
    [/눈오는|눈꽃|눈|설원/gi, "snowing, winter snowfall, snowfield, frost"],
    [/벚꽃|사쿠라/gi, "cherry blossoms, falling sakura petals"],
    [/단풍/gi, "autumn leaves, fall foliage"],
    [/배경/gi, "background"],

    // 8. 화풍 & 조명 & 퀄리티
    [/실사|사진|포토리얼/gi, "photorealistic, 8k photography, hyperrealistic"],
    [/애니|일러스트|만화/gi, "anime style, detailed illustration"],
    [/시네마틱/gi, "cinematic lighting, film still"],
    [/수채화/gi, "watercolor painting"],
    [/유화/gi, "oil painting"],
    [/역광|림라이트/gi, "backlighting, rim light"],
    [/네온|네온사인/gi, "neon glow, vibrant colors"],
    [/빛내림|틴들현상/gi, "volumetric god rays, sunbeams"],
    [/고화질|고품질|최고품질/gi, "masterpiece, best quality, ultra detailed"]
];

function translateToEnglish(text) {
    if (!text || typeof text !== "string") return "";
    let res = text.trim();
    if (!res) return "";

    const hasKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(res);
    if (!hasKorean) return res;

    for (const [regex, eng] of PROMPT_TRANSLATIONS) {
        res = res.replace(regex, eng);
    }

    res = res.replace(/(\s*이|가|을|를|의|에|에서|으로|로|과|와|하고|하며|있는|있음|한|된|인)\b/g, " ");
    res = res.replace(/\s{2,}/g, " ").trim();
    res = res.replace(/\s*,\s*/g, ", ");
    res = res.replace(/(,\s*){2,}/g, ", ");
    res = res.replace(/^,\s*|,\s*$/g, "");
    return res;
}

// 무료 실시간 번역 API 연동 (Google GTX + MyMemory + 로컬 사전 Fallback)
async function translateTextOnline(text) {
    if (!text || typeof text !== "string") return "";
    const clean = text.trim();
    if (!clean) return "";

    const hasKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(clean);
    if (!hasKorean) return clean;

    // 1차 시도: Google Translate GTX 무료 웹 클라이언트 엔드포인트
    try {
        const gUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=ko&tl=en&dt=t&q=${encodeURIComponent(clean)}`;
        const gRes = await fetch(gUrl);
        if (gRes.ok) {
            const gData = await gRes.json();
            if (gData && gData[0]) {
                const resText = gData[0].map(item => item[0]).join("").trim();
                if (resText) return resText;
            }
        }
    } catch (e) {}

    // 2차 시도: MyMemory 무료 번역 API (CORS 프리, 안정적)
    try {
        const mUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(clean)}&langpair=ko|en`;
        const mRes = await fetch(mUrl);
        if (mRes.ok) {
            const mData = await mRes.json();
            if (mData && mData.responseData && mData.responseData.translatedText) {
                const resText = mData.responseData.translatedText.trim();
                if (!resText.startsWith("MYMEMORY WARNING:") && !resText.startsWith("INVALID")) {
                    return resText;
                }
            }
        }
    } catch (e) {}

    // 3차 Fallback: 내부 정규식/사전 기반 변환
    return translateToEnglish(clean);
}

// 100% 자연어 공간 위치 서술어 생성 함수 (엄격한 분할 비율 및 퍼센트 바운더리 포함)
function getNaturalSpatialDescription(c1, c2, r1, r2, totalCols, totalRows) {
    const colSpan = (c2 - c1 + 1) / totalCols;
    const rowSpan = (r2 - r1 + 1) / totalRows;
    const colCenter = (c1 + c2 + 1) / (2.0 * totalCols);
    const rowCenter = (r1 + r2 + 1) / (2.0 * totalRows);

    const wPct = Math.round(colSpan * 100);
    const hPct = Math.round(rowSpan * 100);
    const x1Pct = Math.round((c1 / totalCols) * 100);
    const x2Pct = Math.round(((c2 + 1) / totalCols) * 100);
    const y1Pct = Math.round((r1 / totalRows) * 100);
    const y2Pct = Math.round(((r2 + 1) / totalRows) * 100);

    // 1. 전체 영역 (Full frame)
    if (colSpan >= 0.85 && rowSpan >= 0.85) {
        return "Across the entire frame (full 100% canvas)";
    }

    // 2. 전고 세로 띠 (Full-height vertical columns)
    if (rowSpan >= 0.85) {
        const colType = wPct >= 40 ? "wide vertical section" : (wPct <= 25 ? "narrow vertical strip" : "vertical panel");
        if (colCenter < 0.35) {
            return `Left ${colType} (occupying exactly ${wPct}% width from 0% to ${x2Pct}%, full 100% height)`;
        } else if (colCenter > 0.65) {
            return `Right ${colType} (occupying exactly ${wPct}% width from ${x1Pct}% to 100%, full 100% height)`;
        } else {
            return `Center ${colType} (occupying exactly ${wPct}% width from ${x1Pct}% to ${x2Pct}%, full 100% height)`;
        }
    }

    // 3. 전폭 가로 띠 (Full-width horizontal bands)
    if (colSpan >= 0.85) {
        const rowType = hPct >= 40 ? "wide horizontal band" : (hPct <= 25 ? "narrow horizontal strip" : "horizontal panel");
        if (rowCenter < 0.35) {
            return `Top ${rowType} (full 100% width, occupying exactly ${hPct}% height from 0% to ${y2Pct}%)`;
        } else if (rowCenter > 0.65) {
            return `Bottom ${rowType} (full 100% width, occupying exactly ${hPct}% height from ${y1Pct}% to 100%)`;
        } else {
            return `Middle ${rowType} (full 100% width, occupying exactly ${hPct}% height from ${y1Pct}% to ${y2Pct}%)`;
        }
    }

    // 4. 분할 사분면 / 그리드 패널 (Quadrants & multi-cells)
    let hPos = "center";
    if (colCenter < 0.35) hPos = "left";
    else if (colCenter > 0.65) hPos = "right";

    let vPos = "middle";
    if (rowCenter < 0.35) vPos = "top";
    else if (rowCenter > 0.65) vPos = "bottom";

    let panelName = "Center frame";
    if (hPos === "center" && vPos === "middle") panelName = "Center frame";
    else if (vPos === "middle") panelName = `${hPos.charAt(0).toUpperCase() + hPos.slice(1)} middle panel`;
    else if (hPos === "center") panelName = `${vPos.charAt(0).toUpperCase() + vPos.slice(1)} center panel`;
    else panelName = `${vPos.charAt(0).toUpperCase() + vPos.slice(1)}-${hPos} panel`;

    return `${panelName} (occupying exactly ${wPct}% width from ${x1Pct}% to ${x2Pct}%, ${hPct}% height from ${y1Pct}% to ${y2Pct}%)`;
}

// 구조화 태그 및 바운딩 박스용 상세 좌표/퍼센트 정보 생성 함수
function getSpatialDescription(c1, c2, r1, r2, totalCols, totalRows) {
    const colCenter = (c1 + c2 + 1) / (2.0 * totalCols);
    const rowCenter = (r1 + r2 + 1) / (2.0 * totalRows);
    const colSpan = (c2 - c1 + 1) / totalCols;
    const rowSpan = (r2 - r1 + 1) / totalRows;

    const pctLeft = Math.round((c1 / totalCols) * 100);
    const pctRight = Math.round(((c2 + 1) / totalCols) * 100);
    const pctTop = Math.round((r1 / totalRows) * 100);
    const pctBottom = Math.round(((r2 + 1) / totalRows) * 100);

    let dirName = "Center Frame";
    if (colSpan >= 0.85 && rowSpan >= 0.85) {
        dirName = "Full Background";
    } else if (colSpan >= 0.85) {
        if (rowCenter < 0.35) dirName = "Top Full-Width Section";
        else if (rowCenter > 0.65) dirName = "Bottom Foreground Strip";
        else dirName = "Middle Panorama Band";
    } else {
        let hDir = "Center";
        if (colCenter < 0.35) hDir = "Left";
        else if (colCenter > 0.65) hDir = "Right";

        let vDir = "Middle";
        if (rowCenter < 0.35) vDir = "Top";
        else if (rowCenter > 0.65) vDir = "Bottom";

        if (hDir === "Center" && vDir === "Middle") dirName = "Center Frame";
        else if (vDir === "Middle") dirName = `${hDir} Side`;
        else if (hDir === "Center") dirName = `${vDir} Center`;
        else dirName = `${vDir}-${hDir}`;
    }

    const gridInfo = `Cols ${c1 + 1}-${c2 + 1}/${totalCols}, Rows ${r1 + 1}-${r2 + 1}/${totalRows}`;
    const pctInfo = `${pctLeft}%-${pctRight}% W, ${pctTop}%-${pctBottom}% H`;

    return {
        direction: dirName,
        grid: gridInfo,
        percent: pctInfo,
        full: `${dirName} | ${gridInfo} | ${pctInfo}`
    };
}

// 캔버스 마우스 중간 버튼 드래그(Pan) 핸들러
function installMiddleMouseCanvasPan(root) {
    let activePanCleanup = null;
    root.addEventListener("pointerdown", (e) => {
        if (e.button !== 1) return; // 중간 버튼만 처리
        const canvas = app.canvas;
        if (!canvas?.ds?.offset) return;

        e.preventDefault();
        e.stopPropagation();

        let lastX = e.clientX;
        let lastY = e.clientY;
        let active = true;

        const cleanup = () => {
            if (!active) return;
            active = false;
            window.removeEventListener("pointermove", move, true);
            window.removeEventListener("pointerup", done, true);
            window.removeEventListener("pointercancel", done, true);
            if (activePanCleanup === cleanup) activePanCleanup = null;
        };

        const move = (ev) => {
            ev.preventDefault();
            ev.stopPropagation();

            const scale = canvas.ds.scale || 1;
            canvas.ds.offset[0] += (ev.clientX - lastX) / scale;
            canvas.ds.offset[1] += (ev.clientY - lastY) / scale;
            lastX = ev.clientX;
            lastY = ev.clientY;

            if (canvas.setDirty) canvas.setDirty(true, true);
            else app.graph?.setDirtyCanvas?.(true, true);
        };

        const done = (ev) => {
            ev?.preventDefault?.();
            ev?.stopPropagation?.();
            cleanup();
        };

        activePanCleanup?.();
        activePanCleanup = cleanup;
        window.addEventListener("pointermove", move, true);
        window.addEventListener("pointerup", done, true);
        window.addEventListener("pointercancel", done, true);
    }, true);

    root.addEventListener("auxclick", (e) => {
        if (e.button === 1) {
            e.preventDefault();
            e.stopPropagation();
        }
    }, true);

    return () => {
        activePanCleanup?.();
        activePanCleanup = null;
    };
}

app.registerExtension({
    name: "Comfy.VisualGridPrompt",
    async beforeRegisterNodeDef(nodeType, nodeData, app) {
        if (nodeData.name !== "VisualGridPrompt") return;

        const onNodeCreated = nodeType.prototype.onNodeCreated;
        nodeType.prototype.onNodeCreated = function () {
            if (onNodeCreated) onNodeCreated.apply(this, arguments);

            const node = this;
            let currentLang = "한국어";
            let currentRatio = "16:9";
            let currentFormat = "Natural Spatial (Krea/MiniMax/Gemini/GPT)";
            let cols = 6;
            let rows = 3;
            let areas = []; // [{id: 1, c1, c2, r1, r2, prompt: "", ko_prompt: ""}]
            let selectedAreaId = null;
            let prefixVal = "";
            let suffixVal = "";
            let whiteBg = false;
            let gridBorders = false;
            let charSheet = false;
            let customPreviewHeight = null;
            let customGridHeight = null;

            // 기본 LiteGraph 위젯 숨김 처리 함수 (상단 캔버스에 원시 JSON 등이 그려지는 것 원천 차단)
            function hideAllBackendWidgets(targetNode) {
                for (const w of targetNode.widgets || []) {
                    if (w.name !== "visual_grid_ui") {
                        w.type = "hidden";
                        w.hidden = true;
                        w.computeSize = () => [0, -4];
                        w.draw = () => {};
                    }
                }
            }

            // 초기 위젯 값 복원 및 숨김
            for (const w of node.widgets || []) {
                if (w.name === "grid_data" && w.value && w.value !== "{}") {
                    try {
                        const parsed = typeof w.value === "string" ? JSON.parse(w.value) : w.value;
                        if (parsed.cols) cols = parsed.cols;
                        if (parsed.rows) rows = parsed.rows;
                        if (parsed.aspect_ratio) currentRatio = parsed.aspect_ratio;
                        if (parsed.areas) areas = parsed.areas;
                        if (parsed.lang) currentLang = parsed.lang;
                        if (parsed.white_bg !== undefined) whiteBg = !!parsed.white_bg;
                        if (parsed.grid_borders !== undefined) gridBorders = !!parsed.grid_borders;
                        if (parsed.char_sheet !== undefined) charSheet = !!parsed.char_sheet;
                        if (parsed.custom_preview_height !== undefined) customPreviewHeight = parsed.custom_preview_height;
                        if (parsed.custom_grid_height !== undefined) customGridHeight = parsed.custom_grid_height;
                    } catch (e) {}
                }
                if (w.name === "prefix_prompt" && w.value) prefixVal = w.value;
                if (w.name === "suffix_prompt" && w.value) suffixVal = w.value;
                if (w.name === "format" && w.value) currentFormat = w.value;
            }
            hideAllBackendWidgets(node);

            // HTML 컨테이너 생성
            const container = document.createElement("div");
            container.className = "visual-grid-prompt-container";
            container.style.cssText = `
                width: 100%;
                background: #111217;
                border: 1px solid #262933;
                border-radius: 10px;
                padding: 12px;
                box-sizing: border-box;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                color: #e2e8f0;
                display: flex;
                flex-direction: column;
                gap: 10px;
                user-select: none;
            `;

            // 마우스 중간 버튼 드래그(Canvas Pan) 활성화
            const panCleanup = installMiddleMouseCanvasPan(container);

            // 마우스 휠 스크롤(Canvas Zoom) 활성화 (스크롤 가능한 텍스트창 내부 제외)
            container.addEventListener("wheel", (e) => {
                const target = e.target;
                if (target && (target.tagName === "TEXTAREA" || target.tagName === "INPUT")) {
                    const isScrollable = target.scrollHeight > target.clientHeight;
                    if (isScrollable) {
                        const atTop = target.scrollTop === 0 && e.deltaY < 0;
                        const atBottom = Math.abs(target.scrollHeight - target.clientHeight - target.scrollTop) < 1 && e.deltaY > 0;
                        if (!atTop && !atBottom) {
                            return; // 텍스트 영역 내부 스크롤 허용
                        }
                    }
                }

                const cv = app.canvas?.canvas;
                if (!cv) return;
                e.preventDefault();
                cv.dispatchEvent(new WheelEvent("wheel", {
                    deltaX: e.deltaX,
                    deltaY: e.deltaY,
                    deltaZ: e.deltaZ,
                    deltaMode: e.deltaMode,
                    clientX: e.clientX,
                    clientY: e.clientY,
                    screenX: e.screenX,
                    screenY: e.screenY,
                    ctrlKey: e.ctrlKey,
                    shiftKey: e.shiftKey,
                    altKey: e.altKey,
                    metaKey: e.metaKey,
                    bubbles: true,
                    cancelable: true,
                }));
            }, { passive: false });

            // 1. 상단 컨트롤 툴바
            const toolbar = document.createElement("div");
            toolbar.style.cssText = "display: flex; flex-wrap: wrap; align-items: center; gap: 8px; font-size: 12px;";

            // 비율
            const ratioBox = document.createElement("div");
            ratioBox.style.cssText = "display: flex; align-items: center; gap: 4px;";
            const ratioLabel = document.createElement("span");
            ratioLabel.style.cssText = "font-weight: 600; color: #94a3b8;";
            const ratioSelect = document.createElement("select");
            ratioSelect.style.cssText = "background: #1e212b; color: #f8fafc; border: 1px solid #3b4252; border-radius: 5px; padding: 4px 6px; cursor: pointer; font-size: 12px;";
            ["16:9", "9:16", "1:1", "4:3", "3:4", "3:2", "2:3", "21:9"].forEach(r => {
                const opt = document.createElement("option");
                opt.value = r;
                opt.textContent = r;
                if (r === currentRatio) opt.selected = true;
                ratioSelect.appendChild(opt);
            });
            ratioBox.appendChild(ratioLabel);
            ratioBox.appendChild(ratioSelect);

            // 가로 x 세로 칸수
            const gridBox = document.createElement("div");
            gridBox.style.cssText = "display: flex; align-items: center; gap: 4px;";
            const colsLabel = document.createElement("span");
            colsLabel.style.cssText = "font-weight: 600; color: #94a3b8;";
            const colsInput = document.createElement("input");
            colsInput.type = "number";
            colsInput.value = cols;
            colsInput.min = "1";
            colsInput.max = "20";
            colsInput.style.cssText = "width: 38px; background: #1e212b; color: #f8fafc; border: 1px solid #3b4252; border-radius: 5px; padding: 3px; text-align: center; font-size: 12px;";

            const rowsLabel = document.createElement("span");
            rowsLabel.style.cssText = "font-weight: 600; color: #94a3b8;";
            const rowsInput = document.createElement("input");
            rowsInput.type = "number";
            rowsInput.value = rows;
            rowsInput.min = "1";
            rowsInput.max = "20";
            rowsInput.style.cssText = "width: 38px; background: #1e212b; color: #f8fafc; border: 1px solid #3b4252; border-radius: 5px; padding: 3px; text-align: center; font-size: 12px;";

            const applyBtn = document.createElement("button");
            applyBtn.style.cssText = "background: #3b82f6; color: white; border: none; border-radius: 5px; padding: 4px 10px; font-weight: 600; cursor: pointer; font-size: 12px; transition: 0.15s;";
            applyBtn.onmouseenter = () => applyBtn.style.background = "#2563eb";
            applyBtn.onmouseleave = () => applyBtn.style.background = "#3b82f6";

            gridBox.appendChild(colsLabel);
            gridBox.appendChild(colsInput);
            gridBox.appendChild(rowsLabel);
            gridBox.appendChild(rowsInput);
            gridBox.appendChild(applyBtn);

            // 포맷 선택
            const formatBox = document.createElement("div");
            formatBox.style.cssText = "display: flex; align-items: center; gap: 4px; flex: 1; min-width: 170px;";
            const formatLabel = document.createElement("span");
            formatLabel.style.cssText = "font-weight: 600; color: #94a3b8;";
            const formatSelect = document.createElement("select");
            formatSelect.style.cssText = "flex: 1; background: #1e212b; color: #f8fafc; border: 1px solid #3b4252; border-radius: 5px; padding: 4px 6px; cursor: pointer; font-size: 12px;";
            [
                "Natural Spatial (Krea/MiniMax/Gemini/GPT)",
                "Structured Tags ([Area 1 - Left] ...)",
                "Coordinates & BoundingBox",
                "Comma-Separated List",
                "Raw JSON Data"
            ].forEach(f => {
                const opt = document.createElement("option");
                opt.value = f;
                opt.textContent = f;
                if (f === currentFormat) opt.selected = true;
                formatSelect.appendChild(opt);
            });
            formatBox.appendChild(formatLabel);
            formatBox.appendChild(formatSelect);

            // UI 언어 선택 (명확한 UI 라벨 박스)
            const langBox = document.createElement("div");
            langBox.style.cssText = "display: flex; align-items: center; gap: 4px; margin-left: auto;";
            const langLabel = document.createElement("span");
            langLabel.style.cssText = "font-weight: 700; color: #10b981; font-size: 11px; letter-spacing: 0.5px;";
            langLabel.textContent = "UI:";
            const langSelect = document.createElement("select");
            langSelect.style.cssText = "background: #1e212b; color: #f8fafc; border: 1px solid #3b4252; border-radius: 5px; padding: 4px 6px; cursor: pointer; font-size: 12px;";
            ["한국어", "English"].forEach(l => {
                const opt = document.createElement("option");
                opt.value = l;
                opt.textContent = l;
                if (l === currentLang) opt.selected = true;
                langSelect.appendChild(opt);
            });
            langBox.appendChild(langLabel);
            langBox.appendChild(langSelect);

            toolbar.appendChild(ratioBox);
            toolbar.appendChild(gridBox);
            toolbar.appendChild(formatBox);
            toolbar.appendChild(langBox);

            // 옵션 토글 바 (백색 배경, 검정 실선 격자, 캐릭터 시트 추천 효과)
            const optionsBar = document.createElement("div");
            optionsBar.style.cssText = "display: flex; gap: 8px; align-items: center; font-size: 11px;";

            const whiteBgBtn = document.createElement("button");
            whiteBgBtn.style.cssText = "flex: 1; padding: 6px 8px; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 11px; transition: all 0.15s; display: flex; align-items: center; justify-content: center; gap: 4px; white-space: nowrap;";

            const gridBorderBtn = document.createElement("button");
            gridBorderBtn.style.cssText = "flex: 1; padding: 6px 8px; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 11px; transition: all 0.15s; display: flex; align-items: center; justify-content: center; gap: 4px; white-space: nowrap;";

            const charSheetBtn = document.createElement("button");
            charSheetBtn.style.cssText = "flex: 1.25; padding: 6px 8px; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 11px; transition: all 0.15s; display: flex; align-items: center; justify-content: center; gap: 4px; white-space: nowrap;";

            function updateOptionButtons() {
                const dict = I18N[currentLang];
                whiteBgBtn.textContent = `${dict.whiteBg} [${whiteBg ? "ON" : "OFF"}]`;
                whiteBgBtn.title = dict.whiteBgTooltip;
                if (whiteBg) {
                    whiteBgBtn.style.background = "linear-gradient(135deg, #3730a3, #4f46e5)";
                    whiteBgBtn.style.border = "1.5px solid #818cf8";
                    whiteBgBtn.style.color = "#ffffff";
                    whiteBgBtn.style.boxShadow = "0 0 10px rgba(99, 102, 241, 0.45)";
                    whiteBgBtn.style.fontWeight = "700";
                } else {
                    whiteBgBtn.style.background = "#161822";
                    whiteBgBtn.style.border = "1px solid #2e3444";
                    whiteBgBtn.style.color = "#94a3b8";
                    whiteBgBtn.style.boxShadow = "none";
                    whiteBgBtn.style.fontWeight = "600";
                }

                gridBorderBtn.textContent = `${dict.blackGrid} [${gridBorders ? "ON" : "OFF"}]`;
                gridBorderBtn.title = dict.blackGridTooltip;
                if (gridBorders) {
                    gridBorderBtn.style.background = "linear-gradient(135deg, #3730a3, #4f46e5)";
                    gridBorderBtn.style.border = "1.5px solid #818cf8";
                    gridBorderBtn.style.color = "#ffffff";
                    gridBorderBtn.style.boxShadow = "0 0 10px rgba(99, 102, 241, 0.45)";
                    gridBorderBtn.style.fontWeight = "700";
                } else {
                    gridBorderBtn.style.background = "#161822";
                    gridBorderBtn.style.border = "1px solid #2e3444";
                    gridBorderBtn.style.color = "#94a3b8";
                    gridBorderBtn.style.boxShadow = "none";
                    gridBorderBtn.style.fontWeight = "600";
                }

                charSheetBtn.textContent = `${dict.charSheet} [${charSheet ? "ON" : "OFF"}]`;
                charSheetBtn.title = dict.charSheetTooltip;
                if (charSheet) {
                    charSheetBtn.style.background = "linear-gradient(135deg, #3730a3, #4f46e5)";
                    charSheetBtn.style.border = "1.5px solid #818cf8";
                    charSheetBtn.style.color = "#ffffff";
                    charSheetBtn.style.boxShadow = "0 0 10px rgba(99, 102, 241, 0.45)";
                    charSheetBtn.style.fontWeight = "700";
                } else {
                    charSheetBtn.style.background = "#161822";
                    charSheetBtn.style.border = "1px solid #2e3444";
                    charSheetBtn.style.color = "#94a3b8";
                    charSheetBtn.style.boxShadow = "none";
                    charSheetBtn.style.fontWeight = "600";
                }
            }

            whiteBgBtn.addEventListener("click", () => {
                whiteBg = !whiteBg;
                updateOptionButtons();
                syncToWidgets();
            });

            gridBorderBtn.addEventListener("click", () => {
                gridBorders = !gridBorders;
                updateOptionButtons();
                syncToWidgets();
            });

            charSheetBtn.addEventListener("click", () => {
                charSheet = !charSheet;
                const charPrefixTag = "character design model sheet, consistent character features, masterpiece, best quality";
                const charSuffixTag = "soft even studio lighting, crisp sharp focus across all panels, pristine artwork";

                if (charSheet) {
                    // ON: 접두사와 접미사에 캐릭터 시트 추천 효과 자동 삽입
                    if (!prefixVal.trim()) {
                        prefixVal = charPrefixTag;
                    } else if (!prefixVal.includes("character design model sheet")) {
                        prefixVal = prefixVal.trim() + ", " + charPrefixTag;
                    }
                    prefixInput.value = prefixVal;

                    if (!suffixVal.trim()) {
                        suffixVal = charSuffixTag;
                    } else if (!suffixVal.includes("soft even studio lighting")) {
                        suffixVal = suffixVal.trim() + ", " + charSuffixTag;
                    }
                    suffixInput.value = suffixVal;
                } else {
                    // OFF: 삽입되었던 캐릭터 시트 추천 태그 깔끔하게 제거
                    const pTags = [
                        "character design model sheet, consistent character features, masterpiece, best quality",
                        "character design model sheet, consistent character features",
                        "character design model sheet"
                    ];
                    for (const t of pTags) {
                        prefixVal = prefixVal.replace(t, "").replace(/,\s*,/g, ",").replace(/^,\s*|,\s*$/g, "").trim();
                    }
                    prefixInput.value = prefixVal;

                    const sTags = [
                        "soft even studio lighting, crisp sharp focus across all panels, pristine artwork",
                        "soft even studio lighting, crisp sharp focus across all panels",
                        "soft even studio lighting, crisp sharp focus"
                    ];
                    for (const t of sTags) {
                        suffixVal = suffixVal.replace(t, "").replace(/,\s*,/g, ",").replace(/^,\s*|,\s*$/g, "").trim();
                    }
                    suffixInput.value = suffixVal;
                }

                updateOptionButtons();
                syncToWidgets();
            });

            optionsBar.appendChild(whiteBgBtn);
            optionsBar.appendChild(gridBorderBtn);
            optionsBar.appendChild(charSheetBtn);

            // 2. 가이드 텍스트
            const guideBox = document.createElement("div");
            guideBox.style.cssText = "display: flex; flex-wrap: wrap; justify-content: space-between; font-size: 11px; color: #94a3b8; background: #181b22; padding: 6px 10px; border-radius: 6px; border-left: 3px solid #6366f1;";
            const g1 = document.createElement("span");
            const g2 = document.createElement("span");
            const g3 = document.createElement("span");
            guideBox.appendChild(g1);
            guideBox.appendChild(g2);
            guideBox.appendChild(g3);

            function updateTexts() {
                const dict = I18N[currentLang];
                ratioLabel.textContent = dict.aspectRatio;
                colsLabel.textContent = dict.cols;
                rowsLabel.textContent = dict.rows;
                applyBtn.textContent = dict.apply;
                formatLabel.textContent = dict.format;
                g1.textContent = dict.guide1;
                g2.textContent = dict.guide2;
                g3.textContent = dict.guide3;
                prefixLabel.textContent = dict.prefix;
                prefixInput.placeholder = dict.prefixPlaceholder;
                suffixLabel.textContent = dict.suffix;
                suffixInput.placeholder = dict.suffixPlaceholder;
                generateBtn.textContent = dict.generate;
                clearBtn.textContent = dict.clearAll;
                previewTitle.textContent = dict.previewTitle;
                previewArea.placeholder = dict.previewPlaceholder;
                copyBtn.textContent = dict.copyBtn;
                if (langLabel) langLabel.textContent = dict.lang || "UI:";
                updateOptionButtons();
                if (typeof populatePresetOptions === "function") populatePresetOptions();
            }

            // 3. 그리드 캔버스 영역 (모서리 드래그로 상하/확대 축소 조절 가능)
            const gridWrapper = document.createElement("div");
            gridWrapper.style.cssText = `
                position: relative;
                width: 100%;
                min-height: 160px;
                height: ${customGridHeight && customGridHeight >= 140 ? customGridHeight + "px" : "260px"};
                max-height: 900px;
                background: #090a0f;
                border: 1px solid #232733;
                border-radius: 8px;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 10px;
                box-sizing: border-box;
                overflow: hidden;
                resize: vertical;
            `;

            // 마우스 드래그로 그리드 캔버스 크기 조절 시 LiteGraph 노드 이동 간섭 방지 (중간 클릭 Pan은 통과)
            const stopGridWrapperDrag = (e) => {
                if (e.button === 1) return;
                // 클릭 위치가 gridContainer 내부가 아닌 gridWrapper의 패딩/모서리 리사이즈 핸들일 때 노드 이동 방지
                if (e.target === gridWrapper || !gridContainer.contains(e.target)) {
                    e.stopPropagation();
                }
            };
            gridWrapper.addEventListener("mousedown", stopGridWrapperDrag);
            gridWrapper.addEventListener("pointerdown", stopGridWrapperDrag);
            gridWrapper.addEventListener("touchstart", stopGridWrapperDrag);

            // 사용자가 모서리를 직접 드래그해서 크기를 지정했을 때 높이 저장 (새로고침/재렌더링 시에도 유지)
            const onGridUserResize = () => {
                const currentH = parseInt(gridWrapper.style.height, 10) || gridWrapper.clientHeight;
                if (currentH && currentH >= 140 && currentH !== customGridHeight) {
                    customGridHeight = currentH;
                    syncToWidgets();
                    renderGrid();
                }
            };
            gridWrapper.addEventListener("mouseup", onGridUserResize);
            gridWrapper.addEventListener("pointerup", onGridUserResize);

            // 그리드 래퍼 크기 변경 감지 시 그리드 자동 리사이징
            const gridResizeObserver = new ResizeObserver(() => {
                renderGrid();
            });
            gridResizeObserver.observe(gridWrapper);

            const gridContainer = document.createElement("div");
            gridContainer.style.cssText = `
                position: relative;
                max-width: 100%;
                max-height: 100%;
                display: grid;
                gap: 3px;
                background: #161822;
                border: 1px solid #2e3444;
                border-radius: 6px;
                padding: 4px;
                box-sizing: border-box;
                transition: width 0.08s ease, height 0.08s ease;
            `;

            // 4. 모달 프롬프트 설정창 (프리셋 선택 + 직접 입력 + 실시간 API 번역)
            const modal = document.createElement("div");
            modal.style.cssText = `
                display: none;
                flex-direction: column;
                gap: 8px;
                background: #161824;
                border: 1.5px solid #6366f1;
                border-radius: 8px;
                padding: 12px;
                box-sizing: border-box;
                font-size: 12px;
                box-shadow: 0 8px 28px rgba(0,0,0,0.7);
            `;

            const modalHeader = document.createElement("div");
            modalHeader.style.cssText = "display: flex; justify-content: space-between; font-weight: bold; color: #a5b4fc; font-size: 13px;";

            // 한글 입력 및 프리셋 선택 섹션 라벨 (2열)
            const inputLabelsRow = document.createElement("div");
            inputLabelsRow.style.cssText = "display: flex; justify-content: space-between; font-size: 11px; font-weight: 600;";
            
            const presetLabel = document.createElement("span");
            presetLabel.style.cssText = "color: #38bdf8; flex: 1;";
            
            const directInputLabel = document.createElement("span");
            directInputLabel.style.cssText = "color: #60a5fa; flex: 1;";

            inputLabelsRow.appendChild(presetLabel);
            inputLabelsRow.appendChild(directInputLabel);

            const inputControlsRow = document.createElement("div");
            inputControlsRow.style.cssText = "display: flex; gap: 8px; width: 100%; box-sizing: border-box;";

            // 1) 프리셋 선택 드롭다운 (엑셀 표 기반)
            const presetSelect = document.createElement("select");
            presetSelect.style.cssText = `
                flex: 1;
                background: #0f111a;
                color: #38bdf8;
                border: 1.2px solid #3b4252;
                border-radius: 5px;
                padding: 6px 8px;
                font-size: 11px;
                font-weight: 500;
                outline: none;
                cursor: pointer;
                text-overflow: ellipsis;
            `;

            function populatePresetOptions() {
                presetSelect.innerHTML = "";
                const defOpt = document.createElement("option");
                defOpt.value = "";
                defOpt.textContent = I18N[currentLang].presetDefault || "▼ ⚡ 프리셋 선택 (샷/구도)";
                presetSelect.appendChild(defOpt);

                PRESET_GROUPS.forEach(grp => {
                    const optGroup = document.createElement("optgroup");
                    optGroup.label = grp.group;
                    grp.items.forEach(item => {
                        const opt = document.createElement("option");
                        opt.value = JSON.stringify(item);
                        opt.textContent = item.label;
                        optGroup.appendChild(opt);
                    });
                    presetSelect.appendChild(optGroup);
                });
            }
            populatePresetOptions();

            // 2) 직접 한글 입력 필드
            const modalKoInput = document.createElement("input");
            modalKoInput.type = "text";
            modalKoInput.style.cssText = `
                flex: 1;
                background: #0f1117;
                color: #f8fafc;
                border: 1px solid #374151;
                border-radius: 5px;
                padding: 6px 8px;
                box-sizing: border-box;
                font-size: 12px;
                outline: none;
            `;

            inputControlsRow.appendChild(presetSelect);
            inputControlsRow.appendChild(modalKoInput);

            // 영문 자동 번역 결과 라벨 & 실시간 번역 뱃지
            const enLabelRow = document.createElement("div");
            enLabelRow.style.cssText = "display: flex; justify-content: space-between; align-items: center; font-size: 11px; font-weight: 600; color: #a78bfa; margin-top: 2px;";
            
            const enInputLabel = document.createElement("span");
            const transStatusBadge = document.createElement("span");
            transStatusBadge.style.cssText = "font-size: 10px; color: #10b981; font-weight: normal;";
            transStatusBadge.textContent = I18N[currentLang].apiBadgeReady;

            enLabelRow.appendChild(enInputLabel);
            enLabelRow.appendChild(transStatusBadge);

            const modalEnInput = document.createElement("textarea");
            modalEnInput.rows = 2;
            modalEnInput.style.cssText = `
                width: 100%;
                background: #090a0f;
                color: #e2e8f0;
                border: 1px solid #4f46e5;
                border-radius: 5px;
                padding: 7px 9px;
                box-sizing: border-box;
                font-family: inherit;
                font-size: 12px;
                resize: vertical;
                outline: none;
            `;

            // 프리셋 선택 이벤트 (선택 시 저장/적용 버튼을 누르지 않아도 즉시 해당 구역에 자동 적용)
            presetSelect.addEventListener("change", (e) => {
                if (e.target.value) {
                    try {
                        const item = JSON.parse(e.target.value);
                        modalKoInput.value = item.ko;
                        modalEnInput.value = item.en;
                        transStatusBadge.textContent = I18N[currentLang].apiBadgePreset;
                        transStatusBadge.style.color = "#38bdf8";

                        // 선택 즉시 해당 구역에 저장 및 모달 닫기
                        if (selectedAreaId !== null) {
                            const area = areas.find(a => a.id === selectedAreaId);
                            if (area) {
                                area.ko_prompt = item.ko;
                                area.prompt = item.en;
                                syncToWidgets();
                                renderGrid();
                            }
                        }
                        modal.style.display = "none";
                        selectedAreaId = null;
                    } catch (err) {}
                }
            });

            // 직접 입력 시 실시간 번역 API 연동 (디바운스 350ms)
            let debounceTimer = null;
            modalKoInput.addEventListener("input", (e) => {
                const koText = e.target.value.trim();
                presetSelect.value = ""; // 직접 입력 시 프리셋 초기화

                if (!koText) {
                    modalEnInput.value = "";
                    transStatusBadge.textContent = I18N[currentLang].apiBadgeReady;
                    transStatusBadge.style.color = "#94a3b8";
                    return;
                }

                // 1단계: 즉각적인 로컬 사전 번역 미리보기
                const quickTrans = translateToEnglish(koText);
                modalEnInput.value = quickTrans;

                // 2단계: 실시간 번역 API 호출
                transStatusBadge.textContent = I18N[currentLang].apiBadgeTranslating;
                transStatusBadge.style.color = "#f59e0b";

                if (debounceTimer) clearTimeout(debounceTimer);
                debounceTimer = setTimeout(async () => {
                    try {
                        const apiResult = await translateTextOnline(koText);
                        if (apiResult && modalKoInput.value.trim() === koText) {
                            modalEnInput.value = apiResult;
                            transStatusBadge.textContent = I18N[currentLang].apiBadgeDone;
                            transStatusBadge.style.color = "#10b981";
                        }
                    } catch (err) {
                        transStatusBadge.textContent = "⚡ 로컬 사전 번역 적용됨";
                        transStatusBadge.style.color = "#38bdf8";
                    }
                }, 350);
            });

            const modalActions = document.createElement("div");
            modalActions.style.cssText = "display: flex; gap: 8px; justify-content: flex-end; margin-top: 4px;";

            const modalSaveBtn = document.createElement("button");
            modalSaveBtn.style.cssText = "background: #6366f1; color: #fff; border: none; border-radius: 5px; padding: 6px 14px; font-weight: 600; cursor: pointer;";
            const modalDeleteBtn = document.createElement("button");
            modalDeleteBtn.style.cssText = "background: #ef4444; color: #fff; border: none; border-radius: 5px; padding: 6px 12px; font-weight: 600; cursor: pointer;";
            const modalCancelBtn = document.createElement("button");
            modalCancelBtn.style.cssText = "background: #374151; color: #d1d5db; border: none; border-radius: 5px; padding: 6px 12px; cursor: pointer;";

            modalActions.appendChild(modalDeleteBtn);
            modalActions.appendChild(modalCancelBtn);
            modalActions.appendChild(modalSaveBtn);

            modal.appendChild(modalHeader);
            modal.appendChild(inputLabelsRow);
            modal.appendChild(inputControlsRow);
            modal.appendChild(enLabelRow);
            modal.appendChild(modalEnInput);
            modal.appendChild(modalActions);

            // 5. Prefix / Suffix 입력 필드
            const promptInputsBox = document.createElement("div");
            promptInputsBox.style.cssText = "display: flex; flex-direction: column; gap: 6px;";

            const prefixBox = document.createElement("div");
            prefixBox.style.cssText = "display: flex; flex-direction: column; gap: 2px;";
            const prefixLabel = document.createElement("span");
            prefixLabel.style.cssText = "font-size: 11px; font-weight: 600; color: #94a3b8;";
            const prefixInput = document.createElement("input");
            prefixInput.type = "text";
            prefixInput.value = prefixVal;
            prefixInput.style.cssText = "width: 100%; background: #161822; color: #f8fafc; border: 1px solid #2e3444; border-radius: 5px; padding: 5px 8px; font-size: 11px; box-sizing: border-box;";
            prefixInput.addEventListener("input", (e) => {
                prefixVal = e.target.value;
                syncToWidgets();
            });
            prefixBox.appendChild(prefixLabel);
            prefixBox.appendChild(prefixInput);

            const suffixBox = document.createElement("div");
            suffixBox.style.cssText = "display: flex; flex-direction: column; gap: 2px;";
            const suffixLabel = document.createElement("span");
            suffixLabel.style.cssText = "font-size: 11px; font-weight: 600; color: #94a3b8;";
            const suffixInput = document.createElement("input");
            suffixInput.type = "text";
            suffixInput.value = suffixVal;
            suffixInput.style.cssText = "width: 100%; background: #161822; color: #f8fafc; border: 1px solid #2e3444; border-radius: 5px; padding: 5px 8px; font-size: 11px; box-sizing: border-box;";
            suffixInput.addEventListener("input", (e) => {
                suffixVal = e.target.value;
                syncToWidgets();
            });
            suffixBox.appendChild(suffixLabel);
            suffixBox.appendChild(suffixInput);

            promptInputsBox.appendChild(prefixBox);
            promptInputsBox.appendChild(suffixBox);

            // 6. 하단 버튼 바
            const bottomBar = document.createElement("div");
            bottomBar.style.cssText = "display: flex; gap: 8px; align-items: center;";

            const generateBtn = document.createElement("button");
            generateBtn.style.cssText = `
                flex: 1;
                background: linear-gradient(135deg, #4f46e5, #7c3aed);
                color: white;
                border: none;
                border-radius: 6px;
                padding: 10px 14px;
                font-weight: bold;
                font-size: 13px;
                cursor: pointer;
                box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
                transition: transform 0.1s, filter 0.2s;
            `;
            generateBtn.onmouseenter = () => generateBtn.style.filter = "brightness(1.15)";
            generateBtn.onmouseleave = () => generateBtn.style.filter = "brightness(1.0)";

            const clearBtn = document.createElement("button");
            clearBtn.style.cssText = "background: #27272a; color: #cbd5e1; border: 1px solid #3f3f46; border-radius: 6px; padding: 10px 14px; font-size: 12px; font-weight: 600; cursor: pointer; transition: 0.2s;";
            clearBtn.onmouseenter = () => clearBtn.style.background = "#3f3f46";
            clearBtn.onmouseleave = () => clearBtn.style.background = "#27272a";

            bottomBar.appendChild(generateBtn);
            bottomBar.appendChild(clearBtn);

            // 7. 실시간 출력 프롬프트 미리보기
            const previewWrapper = document.createElement("div");
            previewWrapper.style.cssText = "display: flex; flex-direction: column; gap: 4px;";

            const previewHeader = document.createElement("div");
            previewHeader.style.cssText = "display: flex; justify-content: space-between; align-items: center;";
            const previewTitle = document.createElement("span");
            previewTitle.style.cssText = "font-size: 11px; font-weight: 600; color: #818cf8;";

            const copyBtn = document.createElement("button");
            copyBtn.style.cssText = "background: #1e212b; color: #94a3b8; border: 1px solid #374151; border-radius: 4px; padding: 2px 8px; font-size: 11px; cursor: pointer;";
            copyBtn.onclick = () => {
                navigator.clipboard.writeText(previewArea.value);
                const originalText = copyBtn.textContent;
                copyBtn.textContent = I18N[currentLang].copied;
                setTimeout(() => copyBtn.textContent = originalText, 1500);
            };

            previewHeader.appendChild(previewTitle);
            previewHeader.appendChild(copyBtn);

            const previewArea = document.createElement("textarea");
            previewArea.readOnly = true;
            previewArea.rows = 4;
            previewArea.style.cssText = `
                width: 100%;
                min-height: 80px;
                background: #090a0f;
                color: #e2e8f0;
                border: 1px solid #232733;
                border-radius: 6px;
                padding: 8px;
                font-size: 11px;
                box-sizing: border-box;
                font-family: "Fira Code", Consolas, Monaco, monospace;
                line-height: 1.45;
                resize: vertical;
                overflow-y: auto;
                cursor: text;
                transition: height 0.12s ease;
            `;

            function adjustPreviewHeight() {
                if (customPreviewHeight && customPreviewHeight >= 60) {
                    previewArea.style.height = customPreviewHeight + "px";
                } else {
                    previewArea.style.height = "auto";
                    const scrollH = previewArea.scrollHeight;
                    // 내용 길이에 따라 80px ~ 280px 사이로 자동 신축 (초과 시 스크롤바 제공)
                    const targetH = Math.min(280, Math.max(80, scrollH + 6));
                    previewArea.style.height = targetH + "px";
                }
            }

            // 마우스 드래그로 텍스트창 크기 조절 시 LiteGraph 캔버스 노드 드래그 간섭 방지 (중간 클릭 Pan은 통과)
            const stopDrag = (e) => {
                if (e.button === 1) return;
                e.stopPropagation();
            };
            previewArea.addEventListener("mousedown", stopDrag);
            previewArea.addEventListener("pointerdown", stopDrag);
            previewArea.addEventListener("touchstart", stopDrag);

            // 사용자가 모서리를 직접 드래그해서 크기를 지정했을 때 높이 저장 (새로고침/재렌더링 시에도 유지)
            const onPreviewUserResize = () => {
                const currentH = parseInt(previewArea.style.height, 10);
                if (currentH && currentH >= 60) {
                    customPreviewHeight = currentH;
                    syncToWidgets();
                }
            };
            previewArea.addEventListener("mouseup", onPreviewUserResize);
            previewArea.addEventListener("pointerup", onPreviewUserResize);

            previewWrapper.appendChild(previewHeader);
            previewWrapper.appendChild(previewArea);

            // 컨테이너 조립
            container.appendChild(toolbar);
            container.appendChild(optionsBar);
            container.appendChild(guideBox);
            gridWrapper.appendChild(gridContainer);
            container.appendChild(gridWrapper);
            container.appendChild(modal);
            container.appendChild(promptInputsBox);
            container.appendChild(bottomBar);
            container.appendChild(previewWrapper);

            // 위젯 동기화 및 프롬프트 빌드
            function syncToWidgets() {
                const data = {
                    cols,
                    rows,
                    aspect_ratio: currentRatio,
                    lang: currentLang,
                    areas,
                    white_bg: whiteBg,
                    grid_borders: gridBorders,
                    char_sheet: charSheet,
                    custom_preview_height: customPreviewHeight,
                    custom_grid_height: customGridHeight
                };
                const jsonStr = JSON.stringify(data);

                const gridDataW = node.widgets?.find(w => w.name === "grid_data");
                if (gridDataW) gridDataW.value = jsonStr;

                const colsW = node.widgets?.find(w => w.name === "grid_cols");
                if (colsW) colsW.value = cols;

                const rowsW = node.widgets?.find(w => w.name === "grid_rows");
                if (rowsW) rowsW.value = rows;

                const ratioW = node.widgets?.find(w => w.name === "aspect_ratio");
                if (ratioW) ratioW.value = currentRatio;

                const langW = node.widgets?.find(w => w.name === "ui_language");
                if (langW) langW.value = currentLang;

                const formatW = node.widgets?.find(w => w.name === "format");
                if (formatW) formatW.value = currentFormat;

                const prefixW = node.widgets?.find(w => w.name === "prefix_prompt");
                if (prefixW) prefixW.value = prefixVal;

                const suffixW = node.widgets?.find(w => w.name === "suffix_prompt");
                if (suffixW) suffixW.value = suffixVal;

                buildOutputPrompt();
            }

            function buildOutputPrompt() {
                let finalPrompt = "";
                const validAreas = areas.slice().sort((a, b) => a.id - b.id).filter(a => (a.prompt || a.ko_prompt || "").trim().length > 0);

                if (validAreas.length > 0) {
                    if (currentFormat.startsWith("Natural")) {
                        const lines = [
                            `A high-definition ${currentRatio} multi-panel composition strictly partitioned into ${validAreas.length} proportional sections.`,
                            `[Spatial Layout & Exact Proportional Placement]:`
                        ];
                        validAreas.forEach(a => {
                            const rawPrompt = a.prompt || a.ko_prompt || "";
                            const engPrompt = translateToEnglish(rawPrompt);
                            const spatialName = getNaturalSpatialDescription(a.c1, a.c2, a.r1, a.r2, cols, rows);
                            lines.push(`- ${spatialName}: ${engPrompt}.`);
                        });
                        
                        if (gridBorders) {
                            lines.push(`[Multi-Panel Layout & Strict Proportional Scale]: Split-screen multi-panel collage layout strictly adhering to the exact percentage width and height boundaries specified above for each column and row without shifting, resizing, or distorting relative panel scales. Each panel is cleanly separated by crisp thin black divider lines, clean comic grid panels, pristine artwork without any text, labels, numbers, coordinates, or watermarks.`);
                        } else {
                            lines.push(`[Global Scene Coherence & Proportional Placement]: Seamlessly blended multi-region composition maintaining the exact spatial percentage boundaries and relative scale for each region, unified realistic lighting, cinematic perspective, and coherent environment bridging all regions, clean presentation without any text, labels, numbers, coordinates, or watermarks.`);
                        }
                        finalPrompt = lines.join("\n");
                    } else if (currentFormat.startsWith("Structured")) {
                        const lines = [`[Composition: ${currentRatio} Grid Layout (${cols}x${rows})]`];
                        validAreas.forEach(a => {
                            const rawPrompt = a.prompt || a.ko_prompt || "";
                            const engPrompt = translateToEnglish(rawPrompt);
                            const info = getSpatialDescription(a.c1, a.c2, a.r1, a.r2, cols, rows);
                            lines.push(`[Area ${a.id} | ${info.direction.toUpperCase()} (${info.percent})]: ${engPrompt}`);
                        });
                        finalPrompt = lines.join("\n");
                    } else if (currentFormat.startsWith("Coordinates")) {
                        const lines = [`[Canvas Layout: ${currentRatio} | Grid ${cols}x${rows}]`];
                        validAreas.forEach(a => {
                            const rawPrompt = a.prompt || a.ko_prompt || "";
                            const engPrompt = translateToEnglish(rawPrompt);
                            const x1 = ((a.c1 / cols)).toFixed(2);
                            const y1 = ((a.r1 / rows)).toFixed(2);
                            const x2 = (((a.c2 + 1) / cols)).toFixed(2);
                            const y2 = (((a.r2 + 1) / rows)).toFixed(2);
                            lines.push(`<area_${a.id} bbox="[${x1}, ${y1}, ${x2}, ${y2}]"> ${engPrompt} </area_${a.id}>`);
                        });
                        finalPrompt = lines.join("\n");
                    } else if (currentFormat.startsWith("Comma")) {
                        finalPrompt = validAreas.map(a => translateToEnglish(a.prompt || a.ko_prompt || "")).join(", ");
                    } else {
                        finalPrompt = JSON.stringify({ aspect_ratio: currentRatio, cols, rows, areas: validAreas, white_bg: whiteBg, grid_borders: gridBorders }, null, 2);
                    }
                }

                // Prefix & Suffix 결합
                const engPrefix = translateToEnglish(prefixVal.trim());
                const engSuffix = translateToEnglish(suffixVal.trim());

                const extraTags = [];
                if (whiteBg) {
                    extraTags.push("clean solid pure white background, studio white backdrop");
                }
                if (engSuffix) {
                    extraTags.push(engSuffix);
                }
                const combinedSuffix = extraTags.join(", ");

                const resultParts = [];
                if (engPrefix) resultParts.push(engPrefix);
                if (finalPrompt) resultParts.push(finalPrompt);
                if (combinedSuffix) resultParts.push(combinedSuffix);

                const fullOutput = currentFormat.startsWith("Comma") ? resultParts.join(", ") : resultParts.join("\n\n");
                previewArea.value = fullOutput;
                adjustPreviewHeight();

                const promptW = node.widgets?.find(w => w.name === "prompt_text");
                if (promptW) promptW.value = fullOutput;
            }

            // 정확한 마우스 좌표 계산 함수
            function getGridCoords(e) {
                const targetCell = (e.target && e.target.closest && e.target.closest(".grid-cell")) 
                    || (document.elementFromPoint(e.clientX, e.clientY)?.closest(".grid-cell"));
                if (targetCell && targetCell.dataset && targetCell.dataset.col !== undefined && targetCell.dataset.row !== undefined) {
                    return {
                        c: parseInt(targetCell.dataset.col, 10),
                        r: parseInt(targetCell.dataset.row, 10)
                    };
                }
                const rect = gridContainer.getBoundingClientRect();
                const x = Math.max(0, Math.min(rect.width - 1, e.clientX - rect.left));
                const y = Math.max(0, Math.min(rect.height - 1, e.clientY - rect.top));
                const c = Math.max(0, Math.min(cols - 1, Math.floor((x / rect.width) * cols)));
                const r = Math.max(0, Math.min(rows - 1, Math.floor((y / rect.height) * rows)));
                return { c, r };
            }

            // 드래그 상태
            let isDragging = false;
            let dragStart = null;
            let dragEnd = null;

            function updateDragHighlight() {
                if (!isDragging || !dragStart || !dragEnd) return;
                const c1 = Math.min(dragStart.c, dragEnd.c);
                const c2 = Math.max(dragStart.c, dragEnd.c);
                const r1 = Math.min(dragStart.r, dragEnd.r);
                const r2 = Math.max(dragStart.r, dragEnd.r);

                // 겹침 여부 확인
                let hasOverlap = false;
                for (const a of areas) {
                    if (!(c2 < a.c1 || c1 > a.c2 || r2 < a.r1 || r1 > a.r2)) {
                        hasOverlap = true;
                        break;
                    }
                }

                const cells = gridContainer.querySelectorAll(".grid-cell");
                cells.forEach(cell => {
                    const c = parseInt(cell.dataset.col, 10);
                    const r = parseInt(cell.dataset.row, 10);
                    const isSelected = (c >= c1 && c <= c2 && r >= r1 && r <= r2);
                    if (isSelected) {
                        cell.style.background = hasOverlap ? "rgba(239, 68, 68, 0.55)" : "rgba(99, 102, 241, 0.6)";
                        cell.style.borderColor = hasOverlap ? "#ef4444" : "#818cf8";
                    } else {
                        cell.style.background = "#10121a";
                        cell.style.borderColor = "#2d3345";
                    }
                });
            }

            function renderGrid() {
                const [rw, rh] = currentRatio.split(":").map(Number);
                const ratioVal = (rw && rh) ? (rw / rh) : (16 / 9);
                const paddingSpace = 20;
                const wrapperW = Math.max(60, (gridWrapper.clientWidth || 440) - paddingSpace);
                const wrapperH = Math.max(60, (gridWrapper.clientHeight || 260) - paddingSpace);
                const wrapperRatio = wrapperW / wrapperH;

                if (ratioVal > wrapperRatio) {
                    gridContainer.style.width = "100%";
                    gridContainer.style.height = "auto";
                } else {
                    gridContainer.style.height = "100%";
                    gridContainer.style.width = "auto";
                }
                gridContainer.style.aspectRatio = `${rw} / ${rh}`;
                gridContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
                gridContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
                gridContainer.innerHTML = "";

                // 빈 셀 생성 (정확한 CSS Grid 레이아웃 및 명시적 트랙 위치)
                for (let r = 0; r < rows; r++) {
                    for (let c = 0; c < cols; c++) {
                        const cell = document.createElement("div");
                        cell.className = "grid-cell";
                        cell.dataset.col = c;
                        cell.dataset.row = r;
                        cell.style.cssText = `
                            grid-column: ${c + 1};
                            grid-row: ${r + 1};
                            background: #10121a;
                            border: 1px dashed #2d3345;
                            border-radius: 3px;
                            box-sizing: border-box;
                            width: 100%;
                            height: 100%;
                            user-select: none;
                            cursor: crosshair;
                            transition: background 0.1s;
                        `;
                        gridContainer.appendChild(cell);
                    }
                }

                // 확정된 구역(Area) 오버레이 렌더링 (지정 영역에 100% 확장)
                areas.forEach((area) => {
                    const color = AREA_COLORS[(area.id - 1) % AREA_COLORS.length];
                    const overlay = document.createElement("div");
                    overlay.className = "grid-area-overlay";
                    overlay.dataset.areaId = area.id;
                    overlay.style.cssText = `
                        grid-column: ${area.c1 + 1} / ${area.c2 + 2};
                        grid-row: ${area.r1 + 1} / ${area.r2 + 2};
                        width: 100%;
                        height: 100%;
                        background: ${color.bg};
                        border: 2px solid ${color.border};
                        border-radius: 5px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        padding: 4px 6px;
                        box-sizing: border-box;
                        cursor: pointer;
                        z-index: 10;
                        transition: filter 0.15s;
                        backdrop-filter: blur(1px);
                        overflow: hidden;
                    `;
                    overlay.onmouseenter = () => overlay.style.filter = "brightness(1.25)";
                    overlay.onmouseleave = () => overlay.style.filter = "brightness(1.0)";

                    const topBar = document.createElement("div");
                    topBar.style.cssText = "display: flex; justify-content: space-between; align-items: center;";

                    const badge = document.createElement("div");
                    const circleNum = `①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮`[area.id - 1] || `(${area.id})`;
                    badge.textContent = `${circleNum} Area ${area.id}`;
                    badge.style.cssText = `
                        font-size: 13px;
                        font-weight: 900;
                        color: #ffffff;
                        text-shadow: 0 1px 4px rgba(0,0,0,0.9);
                    `;

                    const deleteBtn = document.createElement("span");
                    deleteBtn.textContent = "×";
                    deleteBtn.title = "Delete Area";
                    deleteBtn.style.cssText = `
                        font-size: 16px;
                        font-weight: bold;
                        color: #fca5a5;
                        padding: 0 4px;
                        border-radius: 3px;
                        cursor: pointer;
                        line-height: 1;
                    `;
                    deleteBtn.addEventListener("click", (e) => {
                        e.stopPropagation();
                        deleteArea(area.id);
                    });

                    topBar.appendChild(badge);
                    topBar.appendChild(deleteBtn);

                    const promptPreview = document.createElement("div");
                    const dispText = area.ko_prompt || area.prompt || "(클릭하여 프롬프트 입력)";
                    promptPreview.textContent = dispText;
                    promptPreview.style.cssText = `
                        font-size: 11px;
                        color: ${dispText !== "(클릭하여 프롬프트 입력)" ? "#ffffff" : "#cbd5e1cc"};
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        font-weight: ${dispText !== "(클릭하여 프롬프트 입력)" ? "600" : "normal"};
                        text-shadow: 0 1px 3px rgba(0,0,0,0.9);
                    `;

                    overlay.appendChild(topBar);
                    overlay.appendChild(promptPreview);

                    overlay.addEventListener("click", (e) => {
                        e.stopPropagation();
                        openPromptModal(area);
                    });

                    overlay.addEventListener("contextmenu", (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        deleteArea(area.id);
                    });

                    gridContainer.appendChild(overlay);
                });
            }

            // 마우스 드래그 이벤트 (부드럽고 완벽한 사각형 영역 지정)
            gridContainer.addEventListener("mousedown", (e) => {
                if (e.button === 0) { // 좌클릭
                    if (e.target.closest && e.target.closest(".grid-area-overlay")) {
                        return;
                    }
                    e.preventDefault();
                    e.stopPropagation();

                    isDragging = true;
                    const pos = getGridCoords(e);
                    dragStart = pos;
                    dragEnd = pos;
                    updateDragHighlight();
                }
            });

            const onMouseMove = (e) => {
                if (isDragging) {
                    e.preventDefault();
                    dragEnd = getGridCoords(e);
                    updateDragHighlight();
                }
            };

            const onMouseUp = (e) => {
                if (isDragging) {
                    isDragging = false;
                    if (!dragStart || !dragEnd) {
                        dragStart = null;
                        dragEnd = null;
                        renderGrid();
                        return;
                    }
                    const c1 = Math.min(dragStart.c, dragEnd.c);
                    const c2 = Math.max(dragStart.c, dragEnd.c);
                    const r1 = Math.min(dragStart.r, dragEnd.r);
                    const r2 = Math.max(dragStart.r, dragEnd.r);

                    // 기존 영역과 겹치는지 체크
                    let hasOverlap = false;
                    for (const a of areas) {
                        if (!(c2 < a.c1 || c1 > a.c2 || r2 < a.r1 || r1 > a.r2)) {
                            hasOverlap = true;
                            break;
                        }
                    }

                    if (!hasOverlap) {
                        const newId = areas.length > 0 ? Math.max(...areas.map(a => a.id)) + 1 : 1;
                        const newArea = {
                            id: newId,
                            c1, c2, r1, r2,
                            prompt: "",
                            ko_prompt: ""
                        };
                        areas.push(newArea);
                        syncToWidgets();
                        renderGrid();
                        // 영역 생성 후 즉시 프롬프트 입력창 열기
                        setTimeout(() => openPromptModal(newArea), 40);
                    } else {
                        renderGrid();
                    }

                    dragStart = null;
                    dragEnd = null;
                }
            };

            window.addEventListener("mousemove", onMouseMove);
            window.addEventListener("mouseup", onMouseUp);

            const onDestroy = node.onDestroy;
            node.onDestroy = function () {
                if (typeof panCleanup === "function") panCleanup();
                window.removeEventListener("mousemove", onMouseMove);
                window.removeEventListener("mouseup", onMouseUp);
                if (onDestroy) onDestroy.apply(this, arguments);
            };

            // 영역 삭제
            function deleteArea(areaId) {
                areas = areas.filter(a => a.id !== areaId);
                areas.sort((a, b) => (a.r1 - b.r1) || (a.c1 - b.c1));
                areas.forEach((a, idx) => a.id = idx + 1);

                if (selectedAreaId === areaId) {
                    modal.style.display = "none";
                    selectedAreaId = null;
                }
                syncToWidgets();
                renderGrid();
            }

            // 모달 열기
            function openPromptModal(area) {
                selectedAreaId = area.id;
                const info = getSpatialDescription(area.c1, area.c2, area.r1, area.r2, cols, rows);
                modalHeader.innerHTML = `<span>${I18N[currentLang].modalArea} ${area.id} (${info.full})</span>`;
                
                presetLabel.textContent = I18N[currentLang].presetLabel;
                directInputLabel.textContent = I18N[currentLang].directInputLabel;
                modalKoInput.placeholder = I18N[currentLang].directPlaceholder;
                modalKoInput.value = area.ko_prompt || "";

                enInputLabel.textContent = I18N[currentLang].modalEnLabel;
                modalEnInput.placeholder = I18N[currentLang].modalEnPlaceholder;
                modalEnInput.value = area.prompt || translateToEnglish(area.ko_prompt || "");

                // 매칭되는 프리셋이 있으면 드롭다운 값 자동 선택
                presetSelect.value = "";
                if (area.ko_prompt) {
                    for (const grp of PRESET_GROUPS) {
                        for (const item of grp.items) {
                            if (item.ko === area.ko_prompt || item.label === area.ko_prompt || item.label.startsWith(area.ko_prompt)) {
                                presetSelect.value = JSON.stringify(item);
                                break;
                            }
                        }
                    }
                }

                if (presetSelect.value) {
                    transStatusBadge.textContent = I18N[currentLang].apiBadgePreset;
                    transStatusBadge.style.color = "#38bdf8";
                } else if (modalKoInput.value.trim()) {
                    transStatusBadge.textContent = I18N[currentLang].apiBadgeDone;
                    transStatusBadge.style.color = "#10b981";
                } else {
                    transStatusBadge.textContent = I18N[currentLang].apiBadgeReady;
                    transStatusBadge.style.color = "#94a3b8";
                }

                modalSaveBtn.textContent = I18N[currentLang].modalSave;
                modalDeleteBtn.textContent = I18N[currentLang].modalDelete;
                modalCancelBtn.textContent = I18N[currentLang].modalCancel;

                modal.style.display = "flex";
                setTimeout(() => modalKoInput.focus(), 30);
            }

            // 모달 단축키 (Ctrl+Enter 저장, Esc 취소)
            const handleKeydown = (e) => {
                if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                    e.preventDefault();
                    modalSaveBtn.click();
                } else if (e.key === "Escape") {
                    e.preventDefault();
                    modalCancelBtn.click();
                }
            };
            modalKoInput.addEventListener("keydown", handleKeydown);
            modalEnInput.addEventListener("keydown", handleKeydown);

            modalSaveBtn.addEventListener("click", () => {
                if (selectedAreaId !== null) {
                    const area = areas.find(a => a.id === selectedAreaId);
                    if (area) {
                        area.ko_prompt = modalKoInput.value.trim();
                        // 영문 필드에 내용이 있으면 영문 필드 우선, 비어있으면 한글을 자동 번역
                        area.prompt = modalEnInput.value.trim() || translateToEnglish(area.ko_prompt);
                        syncToWidgets();
                        renderGrid();
                    }
                }
                modal.style.display = "none";
                selectedAreaId = null;
            });

            modalDeleteBtn.addEventListener("click", () => {
                if (selectedAreaId !== null) {
                    deleteArea(selectedAreaId);
                }
            });

            modalCancelBtn.addEventListener("click", () => {
                modal.style.display = "none";
                selectedAreaId = null;
            });

            // 툴바 리스너
            ratioSelect.addEventListener("change", (e) => {
                currentRatio = e.target.value;
                syncToWidgets();
                renderGrid();
            });

            formatSelect.addEventListener("change", (e) => {
                currentFormat = e.target.value;
                syncToWidgets();
            });

            applyBtn.addEventListener("click", () => {
                const newCols = parseInt(colsInput.value) || 6;
                const newRows = parseInt(rowsInput.value) || 3;
                cols = newCols;
                rows = newRows;
                areas = areas.filter(a => a.c2 < cols && a.r2 < rows);
                areas.forEach((a, idx) => a.id = idx + 1);
                syncToWidgets();
                renderGrid();
            });

            langSelect.addEventListener("change", (e) => {
                currentLang = e.target.value;
                updateTexts();
                syncToWidgets();
                renderGrid();
            });

            generateBtn.addEventListener("click", () => {
                syncToWidgets();
            });

            clearBtn.addEventListener("click", () => {
                if (confirm(currentLang === "한국어" ? "모든 영역을 초기화하시겠습니까?" : "Clear all areas?")) {
                    areas = [];
                    modal.style.display = "none";
                    selectedAreaId = null;
                    syncToWidgets();
                    renderGrid();
                }
            });

            // 워크플로우 로드 시 복원
            const onConfigure = node.onConfigure;
            node.onConfigure = function (info) {
                if (onConfigure) onConfigure.apply(this, arguments);
                const gridDataW = this.widgets?.find(w => w.name === "grid_data");
                if (gridDataW && gridDataW.value && gridDataW.value !== "{}") {
                    try {
                        const parsed = typeof gridDataW.value === "string" ? JSON.parse(gridDataW.value) : gridDataW.value;
                        if (parsed.cols) cols = parsed.cols;
                        if (parsed.rows) rows = parsed.rows;
                        if (parsed.aspect_ratio) currentRatio = parsed.aspect_ratio;
                        if (parsed.areas) areas = parsed.areas;
                        if (parsed.lang) currentLang = parsed.lang;
                        if (parsed.white_bg !== undefined) whiteBg = !!parsed.white_bg;
                        if (parsed.grid_borders !== undefined) gridBorders = !!parsed.grid_borders;
                        if (parsed.char_sheet !== undefined) charSheet = !!parsed.char_sheet;
                        if (parsed.custom_preview_height !== undefined) customPreviewHeight = parsed.custom_preview_height;
                        if (parsed.custom_grid_height !== undefined) {
                            customGridHeight = parsed.custom_grid_height;
                            if (customGridHeight && customGridHeight >= 140) {
                                gridWrapper.style.height = customGridHeight + "px";
                            }
                        }
                        colsInput.value = cols;
                        rowsInput.value = rows;
                        ratioSelect.value = currentRatio;
                        langSelect.value = currentLang;
                    } catch (e) {}
                }
                const prefixW = this.widgets?.find(w => w.name === "prefix_prompt");
                if (prefixW && prefixW.value) {
                    prefixVal = prefixW.value;
                    prefixInput.value = prefixVal;
                }
                const suffixW = this.widgets?.find(w => w.name === "suffix_prompt");
                if (suffixW && suffixW.value) {
                    suffixVal = suffixW.value;
                    suffixInput.value = suffixVal;
                }
                const formatW = this.widgets?.find(w => w.name === "format");
                if (formatW && formatW.value) {
                    currentFormat = formatW.value;
                    formatSelect.value = currentFormat;
                }

                updateTexts();
                renderGrid();
                buildOutputPrompt();
                adjustPreviewHeight();
                hideAllBackendWidgets(this);
            };

            const onDrawForeground = node.onDrawForeground;
            node.onDrawForeground = function (ctx) {
                hideAllBackendWidgets(this);
                if (onDrawForeground) onDrawForeground.apply(this, arguments);
            };

            // DOM Widget 부착
            node.addDOMWidget("visual_grid_ui", "custom", container, {
                getValue() {
                    return JSON.stringify({ cols, rows, aspect_ratio: currentRatio, areas, lang: currentLang, prefix: prefixVal, suffix: suffixVal, format: currentFormat, white_bg: whiteBg, grid_borders: gridBorders, char_sheet: charSheet, custom_preview_height: customPreviewHeight, custom_grid_height: customGridHeight });
                },
                setValue(v) {
                    if (v) {
                        try {
                            const parsed = typeof v === "string" ? JSON.parse(v) : v;
                            if (parsed.cols) cols = parsed.cols;
                            if (parsed.rows) rows = parsed.rows;
                            if (parsed.aspect_ratio) currentRatio = parsed.aspect_ratio;
                            if (parsed.areas) areas = parsed.areas;
                            if (parsed.lang) currentLang = parsed.lang;
                            if (parsed.white_bg !== undefined) whiteBg = !!parsed.white_bg;
                            if (parsed.grid_borders !== undefined) gridBorders = !!parsed.grid_borders;
                            if (parsed.char_sheet !== undefined) charSheet = !!parsed.char_sheet;
                            if (parsed.custom_preview_height !== undefined) customPreviewHeight = parsed.custom_preview_height;
                            if (parsed.custom_grid_height !== undefined) {
                                customGridHeight = parsed.custom_grid_height;
                                if (customGridHeight && customGridHeight >= 140) {
                                    gridWrapper.style.height = customGridHeight + "px";
                                }
                            }
                            if (parsed.prefix !== undefined) { prefixVal = parsed.prefix; prefixInput.value = prefixVal; }
                            if (parsed.suffix !== undefined) { suffixVal = parsed.suffix; suffixInput.value = suffixVal; }
                            if (parsed.format !== undefined) { currentFormat = parsed.format; formatSelect.value = currentFormat; }
                            colsInput.value = cols;
                            rowsInput.value = rows;
                            ratioSelect.value = currentRatio;
                            langSelect.value = currentLang;
                            updateTexts();
                            renderGrid();
                            buildOutputPrompt();
                            adjustPreviewHeight();
                        } catch (e) {}
                    }
                }
            });

            // 초기 실행
            updateTexts();
            renderGrid();
            buildOutputPrompt();
            node.setSize([480, 750]);
        };
    }
});
