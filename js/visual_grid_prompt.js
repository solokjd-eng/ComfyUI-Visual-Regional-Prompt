import { app } from "../../scripts/app.js";

// =============================================================================
// I18N Localization Dictionary
// =============================================================================
const I18N = {
    "한국어": {
        aspectRatio: "화면비",
        cols: "가로",
        rows: "세로",
        apply: "적용",
        format: "출력 포맷",
        lang: "UI:",
        whiteBg: "⚪ 백색 배경",
        whiteBgTooltip: "배경을 깔끔한 순백색 스튜디오(White Studio Backdrop)로 설정 (화풍 전환 시에도 상태 유지)",
        blackGrid: "🔳 검정 실선 격자",
        blackGridTooltip: "각 구역을 얇은 검정색 실선(Black Divider Lines)으로 명확하게 분할",
        mockup: "🧍 실루엣 가이드",
        mockupTooltip: "구도 및 포즈에 맞춘 정밀 벡터 실루엣을 캔버스 영역에 동적 표시",
        charProfile: "👤 인물 공통 외모 묘사 (Character Profile)",
        charProfilePlaceholder: "예: 20대 한국 여성, 긴 흑발 포니테일, 검은 뿔테 안경...",
        applyProfile: "적용",
        saveProfile: "⭐ 저장",
        clearProfile: "비우기",
        prefix: "접두사 (Prefix):",
        prefixPlaceholder: "공통 스타일, 조명 등 (예: masterpiece, cinematic lighting)...",
        suffix: "접미사 (Suffix):",
        suffixPlaceholder: "공통 마감 태그 (예: 8k resolution, photorealistic)...",
        generate: "✨ 프롬프트 생성 & 동기화",
        clearAll: "전체 초기화",
        guide: "🖱️ 드래그: 영역 생성 | ✏️ 클릭: 프롬프트 편집 | ❌ 우클릭: 삭제",
        modalTitle: "구역 프롬프트 설정 (1:1 구도 교체 & 실시간 자동 번역)",
        modalArea: "구역",
        modalPos: "위치",
        presetTreeLabel: "📂 샷/구도 탐색기 (10대 캐릭터 시트 분류):",
        presetTreeDefault: "▼ 📂 샷/구도 선택 (탐색기 열기)",
        presetSearchPlaceholder: "🔍 구도 검색 (예: 쇄골, 발등, 워킹, 누운, 정면)...",
        customPresetSelectLabel: "⭐ 나만의 프리셋:",
        customPresetSelectDefault: "▼ ⭐ 나만의 프리셋 선택",
        toggleCustomDrawer: "⚙️ 커스텀 프리셋 관리 서랍",
        addCustomBtn: "➕ 새 프리셋",
        saveCurrentBtn: "💾 현재 입력 등록",
        modalKoLabel: "🇰🇷 한글 프롬프트 (프리셋 선택 시 1:1 교체):",
        modalKoPlaceholder: "예: 전신 45도 측면, 양손으로 볼을 당기는...",
        modalEnLabel: "🇺🇸 영문 자동 번역 (AI 전달용 / 직접 수정 가능):",
        modalEnPlaceholder: "full body, three-quarter view, 45-degree angle...",
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
        whiteBgTooltip: "Set clean pure solid white studio backdrop (persists across art style changes)",
        blackGrid: "🔳 Black Grid Lines",
        blackGridTooltip: "Demarcate each area with thin black border lines",
        mockup: "🧍 Silhouette Guide",
        mockupTooltip: "Render dynamic vector silhouette guides inside canvas areas",
        charProfile: "👤 Master Character Profile (Consistency)",
        charProfilePlaceholder: "e.g. 20yo Korean woman, long black ponytail, glasses...",
        applyProfile: "Apply",
        saveProfile: "⭐ Save",
        clearProfile: "Clear",
        prefix: "Prefix Prompt:",
        prefixPlaceholder: "Global style, lighting (e.g. masterpiece, cinematic lighting)...",
        suffix: "Suffix Prompt:",
        suffixPlaceholder: "Global suffix tags (e.g. 8k resolution, photorealistic)...",
        generate: "✨ Generate & Sync Prompt",
        clearAll: "Clear All",
        guide: "🖱️ Drag: Create Area | ✏️ Click: Edit Prompt | ❌ Right-click: Delete",
        modalTitle: "Area Prompt Editor (1:1 Replace & Auto-Translate)",
        modalArea: "Area",
        modalPos: "Position",
        presetTreeLabel: "📂 Shot & Angle Tree (10 Character Categories):",
        presetTreeDefault: "▼ 📂 Select Shot/Angle (Open Explorer)",
        presetSearchPlaceholder: "🔍 Search presets (e.g. collarbone, feet, walking, front)...",
        customPresetSelectLabel: "⭐ Custom Presets:",
        customPresetSelectDefault: "▼ ⭐ Select Custom Preset",
        toggleCustomDrawer: "⚙️ Custom Presets Drawer",
        addCustomBtn: "➕ New Preset",
        saveCurrentBtn: "💾 Save Current",
        modalKoLabel: "🇰🇷 Korean Prompt (1:1 Replaced on select):",
        modalKoPlaceholder: "e.g. full body, three-quarter view...",
        modalEnLabel: "🇺🇸 English Prompt (Sent to AI / Editable):",
        modalEnPlaceholder: "full body, three-quarter view, 45-degree angle...",
        modalSave: "Apply (Ctrl+Enter)",
        modalCancel: "Cancel (Esc)",
        modalDelete: "Delete Area",
        previewTitle: "Generated Output Prompt (100% English AI Optimized):",
        previewPlaceholder: "Create areas and enter prompts to see real-time output here.",
        copyBtn: "📋 Copy",
        copied: "Copied!"
    }
};

// =============================================================================
// 🎨 5 Art Styles Presets
// =============================================================================
const ART_STYLES = [
    {
        id: "photorealistic",
        name: "📷 극실사 사진 (Photorealistic RAW)",
        icon: "📷",
        prefix: "RAW candid photo, authentic portrait photography, shot on 50mm f/1.8 lens, natural human skin texture with subtle pores, soft daylight studio lighting, unretouched real person photography",
        suffix: "clean neutral background, true-to-life skin tones, natural shadows, sharp focus, 35mm film grain, high dynamic range",
        whiteBg: false,
        gridBorders: true
    },
    {
        id: "semi_realistic",
        name: "✨ 반실사 (Semi-Realistic / 2.5D)",
        icon: "✨",
        prefix: "semi-realistic 2.5D digital painting, refined facial features, smooth shading, aesthetic webtoon cover illustration style, intricate hair detailing, soft ambient lighting",
        suffix: "clean studio backdrop, luminous skin highlights, vibrant harmonious palette, crisp artwork, high resolution digital art",
        whiteBg: false,
        gridBorders: true
    },
    {
        id: "anime",
        name: "🎨 2D 애니 / 웹툰 (Anime & Manga)",
        icon: "🎨",
        prefix: "masterpiece anime illustration, crisp line art, vibrant cel shading, modern webtoon aesthetic, dynamic studio key visual, expressive features",
        suffix: "clean comic panel divider lines, rich saturated colors, sharp linework, high quality 2D art",
        whiteBg: false,
        gridBorders: true
    },
    {
        id: "concept_sheet",
        name: "📐 캐릭터 설정화 (Concept Art Sheet)",
        icon: "📐",
        prefix: "concept art character model sheet, character design turnaround reference, multiple views and poses of the same character, production design documentation",
        suffix: "clean pure white background, studio white backdrop, uniform neutral lighting, clean production artwork, sharp focus on all panels",
        whiteBg: true,
        gridBorders: true
    },
    {
        id: "cg_3d",
        name: "🎮 3D CG 캐릭터 (3D CGI / Unreal 5)",
        icon: "🎮",
        prefix: "3D character model render, Octane Render, Unreal Engine 5, Subsurface Scattering (SSS) realistic skin shader, ray tracing reflections, cinematic 3D lighting",
        suffix: "clean studio void backdrop, physically based rendering (PBR) materials, ambient occlusion, 8k textures, volumetric lighting",
        whiteBg: false,
        gridBorders: true
    },
    {
        id: "none",
        name: "🚫 없음 (None / Clean)",
        icon: "🚫",
        prefix: "",
        suffix: "",
        whiteBg: false,
        gridBorders: true
    }
];

// =============================================================================
// 📂 10-Category Character Sheet Presets Tree
// =============================================================================
const PRESET_GROUPS = [
    {
        group: "얼굴 (헤어부터 쇄골까지)",
        icon: "👤",
        items: [
            { label: "정면", ko: "얼굴 (헤어부터 쇄골까지): 정면", en: "portrait from hair to collarbone, front view, detailed face and hairstyle" },
            { label: "측면", ko: "얼굴 (헤어부터 쇄골까지): 측면", en: "portrait from hair to collarbone, side profile view" },
            { label: "45도 측면", ko: "얼굴 (헤어부터 쇄골까지): 45도 측면", en: "portrait from hair to collarbone, three-quarter view, 45-degree angle" },
            { label: "위에서 본", ko: "얼굴 (헤어부터 쇄골까지): 위에서 본 (하이앵글)", en: "portrait from hair to collarbone, high angle, from above" },
            { label: "아래에서 본", ko: "얼굴 (헤어부터 쇄골까지): 아래에서 본 (로우앵글)", en: "portrait from hair to collarbone, low angle, from below" },
            { label: "후면", ko: "얼굴 (헤어부터 쇄골까지): 후면 (뒷모습)", en: "back of head and hairstyle, back view, from behind, collarbone line" }
        ]
    },
    {
        group: "얼굴 초근접",
        icon: "👁️",
        items: [
            { label: "정면", ko: "얼굴 초근접: 정면", en: "extreme macro close-up of face, front view, macro eyes and lips detail" },
            { label: "측면", ko: "얼굴 초근접: 측면", en: "extreme macro close-up of face, side profile view" },
            { label: "45도 측면", ko: "얼굴 초근접: 45도 측면", en: "extreme macro close-up of face, three-quarter view, 45-degree angle" }
        ]
    },
    {
        group: "상반신 가슴까지",
        icon: "👚",
        items: [
            { label: "정면", ko: "상반신 가슴까지: 정면", en: "bust shot, upper body to chest, front view, neckline detail" },
            { label: "측면", ko: "상반신 가슴까지: 측면", en: "bust shot, upper body to chest, side profile view" },
            { label: "45도 측면", ko: "상반신 가슴까지: 45도 측면", en: "bust shot, upper body to chest, three-quarter view" },
            { label: "위에서 본", ko: "상반신 가슴까지: 위에서 본 (하이앵글)", en: "bust shot, upper body to chest, high angle, looking down" },
            { label: "아래에서 본", ko: "상반신 가슴까지: 아래에서 본 (로우앵글)", en: "bust shot, upper body to chest, low angle, looking up" }
        ]
    },
    {
        group: "상반신 허리까지",
        icon: "👗",
        items: [
            { label: "정면", ko: "상반신 허리까지: 정면", en: "waist shot, upper body to waist, front view, outfit detail" },
            { label: "측면", ko: "상반신 허리까지: 측면", en: "waist shot, upper body to waist, side profile view" },
            { label: "45도 측면", ko: "상반신 허리까지: 45도 측면", en: "waist shot, upper body to waist, three-quarter view" },
            { label: "위에서 본", ko: "상반신 허리까지: 위에서 본 (하이앵글)", en: "waist shot, upper body to waist, high angle, from above" },
            { label: "아래에서 본", ko: "상반신 허리까지: 아래에서 본 (로우앵글)", en: "waist shot, upper body to waist, low angle, from below" }
        ]
    },
    {
        group: "가슴 클로즈업",
        icon: "✨",
        items: [
            { label: "정면", ko: "가슴 클로즈업: 정면", en: "close-up shot focused on chest and neckline, front view, outfit detail" },
            { label: "측면", ko: "가슴 클로즈업: 측면", en: "close-up shot focused on chest, side profile view" },
            { label: "45도 측면", ko: "가슴 클로즈업: 45도 측면", en: "close-up shot focused on chest, three-quarter angle" },
            { label: "위에서 본", ko: "가슴 클로즈업: 위에서 본 (하이앵글)", en: "close-up shot focused on chest, high angle, top-down view" },
            { label: "아래에서 본", ko: "가슴 클로즈업: 아래에서 본 (로우앵글)", en: "close-up shot focused on chest, low angle, looking up" }
        ]
    },
    {
        group: "전신",
        icon: "🧍",
        items: [
            { label: "정면", ko: "전신: 정면", en: "full body shot, front view, standing pose" },
            { label: "측면", ko: "전신: 측면", en: "full body shot, side profile view, standing" },
            { label: "45도 측면", ko: "전신: 45도 측면", en: "full body shot, three-quarter view, 45-degree angle standing" },
            { label: "후면", ko: "전신: 후면 (뒷모습)", en: "full body shot from behind, back view, full outfit and hair details" },
            { label: "자연스러운 워킹 포즈", ko: "전신: 자연스러운 워킹 포즈", en: "full body shot, natural walking pose on runway, dynamic posture" }
        ]
    },
    {
        group: "하반신 엉덩이부터 다리까지 (각선미 강조)",
        icon: "🦵",
        items: [
            { label: "정면", ko: "하반신 엉덩이부터 다리까지: 정면", en: "lower body shot from hips to legs, legs focus, front view, slender leg lines" },
            { label: "측면", ko: "하반신 엉덩이부터 다리까지: 측면", en: "lower body shot from hips to legs, side profile view" },
            { label: "45도 측면", ko: "하반신 엉덩이부터 다리까지: 45도 측면", en: "lower body shot from hips to legs, three-quarter view" },
            { label: "후면", ko: "하반신 엉덩이부터 다리까지: 후면 (뒷모습)", en: "lower body shot from hips to legs, back view, hips and legs focus" },
            { label: "매혹적인 포즈", ko: "하반신 엉덩이부터 다리까지: 매혹적인 각선미 포즈", en: "lower body shot from hips to legs, graceful leg lines, seductive posture" }
        ]
    },
    {
        group: "엉덩이부",
        icon: "🍑",
        items: [
            { label: "정면", ko: "엉덩이부: 골반 정면", en: "pelvis and hip area focus shot, front view" },
            { label: "측면", ko: "엉덩이부: 엉덩이 측면", en: "hip and buttocks side profile shot" },
            { label: "후면", ko: "엉덩이부: 엉덩이 후면 (뒷모습)", en: "buttocks and rear hip focus shot, back view" },
            { label: "아래에서 본", ko: "엉덩이부: 아래에서 본 (로우앵글)", en: "hip and buttocks shot, low angle, looking up" }
        ]
    },
    {
        group: "손 클로즈업",
        icon: "🖐️",
        items: [
            { label: "손등", ko: "손 클로즈업: 손등", en: "detailed close-up of back of hand, elegant hand gesture, clean manicure" },
            { label: "손바닥", ko: "손 클로즈업: 손바닥", en: "detailed close-up of open palm, graceful hand gesture, finger detail" }
        ]
    },
    {
        group: "발 클로즈업",
        icon: "🦶",
        items: [
            { label: "발등", ko: "발 클로즈업: 발등 (맨발)", en: "detailed close-up of top of feet and toes, feet arch, bare feet" },
            { label: "발바닥", ko: "발 클로즈업: 발바닥", en: "detailed close-up of sole of bare foot, foot sole texture" },
            { label: "발 정면", ko: "발 클로즈업: 발 정면", en: "detailed close-up of feet front view, toes and ankle detail" },
            { label: "발 45도 측면", ko: "발 클로즈업: 발 45도 측면", en: "detailed close-up of feet three-quarter view, ankle line" },
            { label: "발 측면", ko: "발 클로즈업: 발 측면", en: "detailed close-up of feet side profile, ankle and heel line" }
        ]
    }
];

// =============================================================================
// 🎨 Neon Pastel Area Palette
// =============================================================================
const COLOR_PALETTE = [
    { border: "#00f0ff", bg: "rgba(0, 240, 255, 0.22)", glow: "rgba(0, 240, 255, 0.6)", text: "#00f0ff" },
    { border: "#ff007f", bg: "rgba(255, 0, 127, 0.22)", glow: "rgba(255, 0, 127, 0.6)", text: "#ff007f" },
    { border: "#ffe600", bg: "rgba(255, 230, 0, 0.22)", glow: "rgba(255, 230, 0, 0.6)", text: "#ffe600" },
    { border: "#a100ff", bg: "rgba(161, 0, 255, 0.22)", glow: "rgba(161, 0, 255, 0.6)", text: "#a100ff" },
    { border: "#00ff66", bg: "rgba(0, 255, 102, 0.22)", glow: "rgba(0, 255, 102, 0.6)", text: "#00ff66" },
    { border: "#ff5e00", bg: "rgba(255, 94, 0, 0.22)", glow: "rgba(255, 94, 0, 0.6)", text: "#ff5e00" },
    { border: "#00e5ff", bg: "rgba(0, 229, 255, 0.22)", glow: "rgba(0, 229, 255, 0.6)", text: "#00e5ff" },
    { border: "#ff0055", bg: "rgba(255, 0, 85, 0.22)", glow: "rgba(255, 0, 85, 0.6)", text: "#ff0055" },
    { border: "#b8ff00", bg: "rgba(184, 255, 0, 0.22)", glow: "rgba(184, 255, 0, 0.6)", text: "#b8ff00" },
    { border: "#e056fd", bg: "rgba(224, 86, 253, 0.22)", glow: "rgba(224, 86, 253, 0.6)", text: "#e056fd" }
];

// =============================================================================
// 🔤 Comprehensive Translation Rules
// =============================================================================
const PROMPT_TRANSLATIONS = [
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

    [/은발/gi, "silver hair"],
    [/백발/gi, "white hair"],
    [/금발/gi, "blonde hair"],
    [/흑발|검은\s*머리/gi, "black hair"],
    [/갈색\s*머리|갈발/gi, "brown hair"],
    [/붉은\s*머리|적발/gi, "red hair"],
    [/파란\s*머리|청발/gi, "blue hair"],
    [/분홍\s*머리|핑크\s*(헤어|머리)/gi, "pink hair"],
    [/단발/gi, "short bob hair"],
    [/장발|긴\s*머리/gi, "long flowing hair"],
    [/숏컷/gi, "pixie cut, short hair"],
    [/포니테일/gi, "ponytail hair"],
    [/트윈테일|양갈래/gi, "twintails hair"],
    [/푸른\s*눈|파란\s*눈/gi, "blue eyes"],
    [/붉은\s*눈|빨간\s*눈/gi, "red eyes"],
    [/오드아이/gi, "heterochromia, odd eyes"],

    [/(\d+)\s*세/gi, "$1-year-old"],
    [/한국인|한국\s*(사람|여성|소녀|소년대)?/gi, "korean"],
    [/여고생|고등학교\s*여학생/gi, "high school girl, student"],
    [/여대생|대학생\s*여성/gi, "college girl, university student"],
    [/소녀|미소녀/gi, "1girl, beautiful girl"],
    [/여자|여성|미녀/gi, "1woman, beautiful woman"],
    [/소년|미소년/gi, "1boy, handsome boy"],
    [/남자|남성|미남/gi, "1man, handsome man"],

    [/45도(\s*측면|\s*각도|\s*뷰)?|반측면|쿼터뷰/gi, "three-quarter view, 45-degree angle"],
    [/90도(\s*측면|\s*각도|\s*프로필)?/gi, "side profile view, 90-degree angle"],
    [/정면(\s*샷|\s*뷰)?/gi, "front view"],
    [/측면(\s*샷|\s*뷰)?/gi, "side profile view"],
    [/뒷모습|후면(\s*샷|\s*뷰)?/gi, "back view, from behind"],
    [/하이앵글|위에서|탑뷰/gi, "high angle, from above"],
    [/로우앵글|아래에서/gi, "low angle, from below"],

    [/웨딩드레스/gi, "wedding dress, white bridal gown"],
    [/원피스|드레스/gi, "dress, elegant outfit"],
    [/교복/gi, "school uniform"],
    [/한복/gi, "hanbok, traditional korean dress"],
    [/정장|수트/gi, "business suit, formal wear"],
    [/셔츠|와이셔츠/gi, "collared shirt"],
    [/후드티|후드/gi, "hoodie"],
    [/청바지/gi, "denim jeans"],
    [/미니스커트/gi, "miniskirt"],
    [/스커트|치마/gi, "skirt"],
    [/수영복|비키니/gi, "swimsuit, bikini"],
    [/안경/gi, "glasses, stylish spectacles"],

    [/양손으로\s*볼(을)?\s*(양\s*옆으로\s*)?(잡아\s*당기[가-힣]*|꼬집[가-힣]*|늘리[가-힣]*)/gi, "pulling cheeks sideways with both hands, cheeks stretched"],
    [/볼을\s*부풀린|볼\s*빵빵|뿌우/gi, "puffed cheeks, pouty face"],
    [/손가락을\s*입술에\s*댄|쉿\s*포즈/gi, "finger on lips, shh gesture"],
    [/손하트|하트\s*포즈/gi, "finger heart, heart hands gesture"],
    [/활짝\s*웃는|환한\s*미소/gi, "bright cheerful smile, laughing happily"],
    [/웃는\s*얼굴|미소/gi, "smiling, gentle smile"],
    [/무표정|시크한/gi, "expressionless, calm face"],
    [/윙크/gi, "winking"],
    [/부끄러워하는|홍조/gi, "blushing, shy expression"],
    [/카메라를\s*바라보는|정면\s*응시/gi, "looking at viewer, eye contact"],

    [/서\s*있는|서있는|직립/gi, "standing pose"],
    [/앉아\s*있는|앉아있는|앉은|착석/gi, "sitting pose, seated gracefully"],
    [/무릎을\s*세우고\s*앉[가-힣]*|무릎\s*안고/gi, "sitting with knees bent and hugging knees with hands"],
    [/태아자세|웅크린\s*자세/gi, "lying in fetal position, curled up body"],
    [/누워\s*있는|누워있는|누운/gi, "lying down pose, relaxed on floor"],
    [/걷는|걸어가는|워킹/gi, "walking pose, dynamic stride"],

    [/발등\s*\(맨발\)|발등/gi, "top of feet and toes, feet arch, bare feet"],
    [/발바닥/gi, "sole of bare foot, foot sole texture"],
    [/손등/gi, "back of hand, elegant hand gesture, clean manicure"],
    [/손바닥/gi, "open palm, graceful hand gesture, finger detail"],
    [/엉덩이|골반/gi, "hips and buttocks, pelvis area"],
    [/가슴/gi, "chest and neckline"],
    [/쇄골/gi, "collarbone line"],
    [/손|손가락/gi, "detailed hands, perfect fingers"],
    [/발|발가락/gi, "feet, toes"],
    [/다리|각선미/gi, "slender legs, leg lines"],

    [/백색\s*배경|흰색\s*배경|화이트\s*배경/gi, "clean solid pure white background, studio white backdrop"],
    [/사이버펑크/gi, "cyberpunk neon city, glowing holographic lights"],
    [/자연|숲/gi, "lush forest, trees, dappled sunlight"],
    [/해변|바다/gi, "ocean, sandy beach, sea waves"],
    [/고화질|고품질|최고품질|마스터피스/gi, "masterpiece, best quality, ultra detailed"]
];

function translateToEnglish(text) {
    if (!text || typeof text !== "string") return "";
    let res = text.trim();
    if (!/[가-힣]/.test(res)) return res;

    for (const [pattern, eng] of PROMPT_TRANSLATIONS) {
        res = res.replace(pattern, eng);
    }

    res = res.replace(/(\s*이|가|을|를|의|에|에서|으로|로|과|와|하고|하며|있는|있음|한|된|인)\b/g, ' ');
    res = res.replace(/\s{2,}/g, ' ').trim();
    res = res.replace(/\s*,\s*/g, ', ');
    res = res.replace(/(,\s*){2,}/g, ', ');
    res = res.replace(/^,\s*|,\s*$/g, '');
    return res;
}

async function translateToEnglishAsync(text) {
    if (!text || typeof text !== "string") return "";
    const trimmed = text.trim();
    if (!trimmed) return "";
    if (!/[가-힣]/.test(trimmed)) return trimmed;

    // 1. ComfyUI 백엔드 파이썬 프록시 API 호출 (가장 신뢰도 높음, CORS 및 SSL 완전 해결)
    try {
        const resp = await fetch("/visual_grid_prompt/translate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: trimmed })
        });
        if (resp.ok) {
            const data = await resp.json();
            if (data && data.translated && data.translated.trim()) {
                const trans = data.translated.trim();
                if (!/[가-힣]/.test(trans)) {
                    return trans;
                }
            }
        }
    } catch (e) {
        console.warn("[VisualGridPrompt] Backend translate error, falling back to direct API:", e);
    }

    // 2. Google clients5 API (dict-chrome-ex)
    try {
        const url = `https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=ko&tl=en&q=${encodeURIComponent(trimmed)}`;
        const resp = await fetch(url);
        if (resp.ok) {
            const json = await resp.json();
            if (Array.isArray(json) && json.length > 0) {
                const res = Array.isArray(json[0]) ? json[0][0] : json[0];
                if (typeof res === "string" && res.trim() && !/[가-힣]/.test(res)) {
                    return res.trim();
                }
            }
        }
    } catch (e) {
        // continue
    }

    // 3. Google GTX API
    try {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=ko&tl=en&dt=t&q=${encodeURIComponent(trimmed)}`;
        const resp = await fetch(url);
        if (resp.ok) {
            const json = await resp.json();
            if (json && json[0]) {
                const apiTranslated = json[0].map(item => item[0]).join('');
                if (apiTranslated && apiTranslated.trim() && !/[가-힣]/.test(apiTranslated)) {
                    return apiTranslated.trim();
                }
            }
        }
    } catch (e) {
        // continue
    }

    // 4. Fallback: 빠른 규칙 사전 치환
    return translateToEnglish(trimmed);
}

// =============================================================================
// 🧍 Dynamic SVG Silhouette Vector Generator
// =============================================================================
function getMockupSvg(text = "") {
    const lower = (text || "").toLowerCase();

    // 1. 태아자세 / 누운 자세
    if (lower.includes("fetal") || lower.includes("lying") || lower.includes("누워") || lower.includes("태아") || lower.includes("누운") || lower.includes("sleeping")) {
        return `<svg viewBox="0 0 100 70" class="mockup-svg" fill="none" stroke="currentColor" preserveAspectRatio="xMidYMid meet">
            <ellipse cx="24" cy="38" rx="10" ry="13" stroke-width="2.4"/>
            <path d="M 34 26 Q 64 12 86 32 Q 94 44 88 58" stroke-width="2.6" stroke-linecap="round"/>
            <path d="M 88 58 L 56 64 L 42 48" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M 30 46 L 44 54 L 34 62" stroke-width="2.2" stroke-linecap="round"/>
            <line x1="6" y1="67" x2="94" y2="67" stroke-width="1.8" stroke-dasharray="4,4" opacity="0.45"/>
        </svg>`;
    }

    // 2. 앉은 자세 / 무릎 세운 자세
    if (lower.includes("sitting") || lower.includes("seated") || lower.includes("kneeling") || lower.includes("앉아") || lower.includes("앉은") || lower.includes("무릎")) {
        return `<svg viewBox="0 0 100 100" class="mockup-svg" fill="none" stroke="currentColor" preserveAspectRatio="xMidYMid meet">
            <ellipse cx="48" cy="16" rx="9" ry="12" stroke-width="2.4"/>
            <path d="M 40 28 L 56 28 L 52 60 L 36 60 Z" stroke-width="2.4" stroke-linecap="round"/>
            <path d="M 52 60 L 82 50 L 78 88 L 40 88" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M 36 60 L 24 88 L 40 88" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M 44 34 L 76 52 L 78 70" stroke-width="2.4" stroke-linecap="round"/>
            <line x1="10" y1="90" x2="90" y2="90" stroke-width="2" opacity="0.5"/>
        </svg>`;
    }

    // 3. 얼굴 초근접 / 매크로
    if (lower.includes("extreme close-up") || lower.includes("macro") || lower.includes("초근접") || lower.includes("눈") || lower.includes("eye")) {
        return `<svg viewBox="0 0 100 100" class="mockup-svg" fill="none" stroke="currentColor" preserveAspectRatio="xMidYMid slice">
            <path d="M 6 22 L 6 6 L 22 6 M 94 22 L 94 6 L 78 6 M 6 78 L 6 94 L 22 94 M 94 78 L 94 94 L 78 94" stroke-width="2.8" stroke-linecap="round"/>
            <path d="M 8 28 Q 50 14 92 28" stroke-width="3.2" stroke-linecap="round"/>
            <ellipse cx="50" cy="50" rx="38" ry="24" stroke-width="2.8"/>
            <circle cx="50" cy="50" r="16" fill="currentColor" opacity="0.25" stroke="currentColor" stroke-width="2.4"/>
            <circle cx="50" cy="50" r="7" fill="currentColor"/>
            <circle cx="54" cy="46" r="2.5" fill="#fff"/>
            <path d="M 24 84 Q 50 96 76 84" stroke-width="2.6" stroke-linecap="round"/>
        </svg>`;
    }

    // 4. 얼굴 45도 / 측면
    if ((lower.includes("three-quarter") && (lower.includes("face") || lower.includes("얼굴"))) || (lower.includes("45도") && (lower.includes("얼굴") || lower.includes("face"))) || lower.includes("profile") || (lower.includes("측면") && !lower.includes("전신"))) {
        return `<svg viewBox="0 0 100 100" class="mockup-svg" fill="none" stroke="currentColor" preserveAspectRatio="xMidYMid meet">
            <path d="M 40 8 Q 74 10 78 40 Q 80 66 58 78 L 40 78 Q 20 72 22 40 Z" stroke-width="2.4" stroke-linecap="round"/>
            <path d="M 34 78 L 28 98 M 58 78 L 68 98 M 8 99 Q 50 90 92 99" stroke-width="2.6" stroke-linecap="round"/>
            <path d="M 58 12 Q 68 42 56 74" stroke-width="1.4" stroke-dasharray="3,3" opacity="0.65"/>
            <circle cx="44" cy="38" r="3.5" fill="currentColor"/>
            <circle cx="66" cy="38" r="3.5" fill="currentColor"/>
            <path d="M 46 60 Q 54 66 62 60" stroke-width="2.2" stroke-linecap="round"/>
        </svg>`;
    }

    // 5. 얼굴 정면
    if (lower.includes("face") || lower.includes("얼굴") || lower.includes("portrait") || (lower.includes("정면") && !lower.includes("전신"))) {
        return `<svg viewBox="0 0 100 100" class="mockup-svg" fill="none" stroke="currentColor" preserveAspectRatio="xMidYMid meet">
            <ellipse cx="50" cy="40" rx="27" ry="34" stroke-width="2.4"/>
            <path d="M 23 30 Q 50 4 77 30" stroke-width="2.4" stroke-linecap="round"/>
            <path d="M 36 74 L 36 88 M 64 74 L 64 88 M 12 98 Q 50 88 88 98" stroke-width="2.6" stroke-linecap="round"/>
            <circle cx="39" cy="38" r="3.6" fill="currentColor"/>
            <circle cx="61" cy="38" r="3.6" fill="currentColor"/>
            <path d="M 41 64 Q 50 70 59 64" stroke-width="2.4" stroke-linecap="round"/>
        </svg>`;
    }

    // 6. 상반신 / 가슴 / 허리
    if (lower.includes("upper body") || lower.includes("bust") || lower.includes("waist") || lower.includes("상반신") || lower.includes("가슴") || lower.includes("허리")) {
        return `<svg viewBox="0 0 100 100" class="mockup-svg" fill="none" stroke="currentColor" preserveAspectRatio="xMidYMid meet">
            <ellipse cx="50" cy="18" rx="11" ry="14" stroke-width="2.4"/>
            <path d="M 14 48 Q 50 38 86 48 L 78 98 L 22 98 Z" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M 14 48 L 6 94 M 86 48 L 94 94" stroke-width="2.4" stroke-linecap="round"/>
        </svg>`;
    }

    // 7. 하반신 / 다리
    if (lower.includes("lower body") || lower.includes("legs") || lower.includes("하반신") || lower.includes("다리")) {
        return `<svg viewBox="0 0 100 100" class="mockup-svg" fill="none" stroke="currentColor" preserveAspectRatio="xMidYMid meet">
            <path d="M 30 14 L 70 14 L 62 38 L 38 38 Z" stroke-width="2.4"/>
            <path d="M 40 38 L 36 94 L 26 96 M 60 38 L 64 94 L 74 96" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>
            <line x1="50" y1="38" x2="50" y2="76" stroke-width="2"/>
        </svg>`;
    }

    // 8. 전신 (Full Body Standing)
    if (lower.includes("full body") || lower.includes("전신")) {
        return `<svg viewBox="0 0 46 100" class="mockup-svg" fill="none" stroke="currentColor" preserveAspectRatio="xMidYMid meet">
            <ellipse cx="23" cy="9" rx="5.5" ry="7.5" stroke-width="1.8"/>
            <path d="M 11 21 Q 23 18 35 21 L 31 39 Q 23 44 15 39 Z" stroke-width="1.8" stroke-linejoin="round"/>
            <path d="M 11 21 L 7 42 L 6 56 M 35 21 L 39 42 L 40 56" stroke-width="1.8" stroke-linecap="round"/>
            <path d="M 17 40 L 15 70 L 13 96 L 9 98" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M 29 40 L 31 70 L 33 96 L 37 98" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
    }

    // 9. 발 클로즈업
    if (lower.includes("feet") || lower.includes("foot") || lower.includes("toes") || lower.includes("발") || lower.includes("발등") || lower.includes("발바닥")) {
        return `<svg viewBox="0 0 100 100" class="mockup-svg" fill="none" stroke="currentColor" preserveAspectRatio="xMidYMid meet">
            <path d="M 38 12 L 36 48 Q 34 66 18 78 L 18 86 Q 44 86 64 82 Q 86 78 88 64 Q 88 52 74 46 L 52 42 L 52 12" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="24" cy="80" r="3" fill="currentColor"/>
            <circle cx="32" cy="80" r="2.5" fill="currentColor"/>
            <line x1="8" y1="92" x2="92" y2="92" stroke-width="2" stroke-dasharray="4,4" opacity="0.5"/>
        </svg>`;
    }

    // 10. 손 클로즈업
    if (lower.includes("hand") || lower.includes("finger") || lower.includes("손") || lower.includes("손등") || lower.includes("손바닥")) {
        return `<svg viewBox="0 0 100 100" class="mockup-svg" fill="none" stroke="currentColor" preserveAspectRatio="xMidYMid meet">
            <path d="M 32 94 L 32 64 L 20 54 L 24 44 L 36 50 L 38 24 L 46 24 L 46 48 L 48 18 L 56 18 L 56 48 L 58 24 L 66 24 L 66 52 L 68 34 L 76 36 L 74 64 Q 72 88 56 94 Z" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
    }

    return "";
}

// =============================================================================
// 📐 Spatial Formatting Helper
// =============================================================================
function getNaturalSpatialName(c1, c2, r1, r2, totalCols, totalRows) {
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

    if (colSpan >= 0.85 && rowSpan >= 0.85) return "Across the entire frame (full 100% canvas)";

    if (rowSpan >= 0.85) {
        const colType = wPct >= 40 ? "wide vertical section" : (wPct <= 25 ? "narrow vertical strip" : "vertical panel");
        if (colCenter < 0.35) return `Left ${colType} (occupying exactly ${wPct}% width from 0% to ${x2Pct}%, full 100% height)`;
        else if (colCenter > 0.65) return `Right ${colType} (occupying exactly ${wPct}% width from ${x1Pct}% to 100%, full 100% height)`;
        else return `Center ${colType} (occupying exactly ${wPct}% width from ${x1Pct}% to ${x2Pct}%, full 100% height)`;
    }

    if (colSpan >= 0.85) {
        const rowType = hPct >= 40 ? "wide horizontal band" : (hPct <= 25 ? "narrow horizontal strip" : "horizontal panel");
        if (rowCenter < 0.35) return `Top ${rowType} (full 100% width, occupying exactly ${hPct}% height from 0% to ${y2Pct}%)`;
        else if (rowCenter > 0.65) return `Bottom ${rowType} (full 100% width, occupying exactly ${hPct}% height from ${y1Pct}% to 100%)`;
        else return `Middle ${rowType} (full 100% width, occupying exactly ${hPct}% height from ${y1Pct}% to ${y2Pct}%)`;
    }

    let hPos = colCenter < 0.35 ? "left" : (colCenter > 0.65 ? "right" : "center");
    let vPos = rowCenter < 0.35 ? "top" : (rowCenter > 0.65 ? "bottom" : "middle");

    let panelName = "Center frame";
    if (hPos === "center" && vPos === "middle") panelName = "Center frame";
    else if (vPos === "middle") panelName = `${hPos.charAt(0).toUpperCase() + hPos.slice(1)} middle panel`;
    else if (hPos === "center") panelName = `${vPos.charAt(0).toUpperCase() + vPos.slice(1)} center panel`;
    else panelName = `${vPos.charAt(0).toUpperCase() + vPos.slice(1)}-${hPos} panel`;

    return `${panelName} (occupying exactly ${wPct}% width from ${x1Pct}% to ${x2Pct}%, ${hPct}% height from ${y1Pct}% to ${y2Pct}%)`;
}

// =============================================================================
// 🧩 ComfyUI Extension Registration
// =============================================================================
app.registerExtension({
    name: "ComfyUI.VisualRegionalPrompt",
    async beforeRegisterNodeDef(nodeType, nodeData, app) {
        if (nodeData.name !== "VisualGridPromptNode" && nodeData.name !== "VisualGridPrompt") return;

        const onNodeCreated = nodeType.prototype.onNodeCreated;
        nodeType.prototype.onNodeCreated = function () {
            const r = onNodeCreated ? onNodeCreated.apply(this, arguments) : undefined;
            const node = this;

            // Default State
            let cols = 6;
            let rows = 3;
            let currentRatio = "16:9";
            let currentLang = "한국어";
            let currentFormat = "Natural Spatial (Krea/MiniMax/Gemini/GPT)";
            let activeArtStyle = "photorealistic";
            let whiteBg = false;
            let gridBorders = true;
            let mockupEnabled = true;
            let characterProfile = "";
            let characterProfileKo = "";
            let charPresets = [
                { label: "20대 한국 여성", ko: "20대 한국 여성, 긴 흑발 포니테일, 검은 뿔테 안경, 자연스러운 메이크업", en: "Korean woman in her 20s, long black hair ponytail, black horn-rimmed glasses, natural makeup" },
                { label: "30대 비즈니스 남성", ko: "30대 한국 남성, 깔끔한 댄디컷 흑발, 네이비 정장 수트", en: "Korean man in his 30s, neat dandy cut black hair, navy business suit" },
                { label: "애니메이션 미소녀", ko: "은발 트윈테일, 푸른 눈동자, 세일러복 교복", en: "silver twin-tail hair, blue eyes, sailor school uniform" }
            ];
            try {
                const savedCharPresets = localStorage.getItem("comfyui_vg_char_presets");
                if (savedCharPresets) {
                    charPresets = JSON.parse(savedCharPresets);
                }
            } catch (e) {}
            let prefixVal = ART_STYLES[0].prefix;
            let suffixVal = ART_STYLES[0].suffix;
            let areas = [];
            let customPresets = [
                { id: "cp_1", label: "태아자세 누운 전신", ko: "태아자세로 누워 있는 전신", en: "Full body lying in fetal position" },
                { id: "cp_2", label: "무릎 안고 앉기", ko: "무릎을 세우고 앉아서 양손으로 자신의 무릎을 감싸고 있는 자세의 전신", en: "Full body sitting with knees bent and covering knees with hands" },
                { id: "cp_3", label: "핑크 바디슈트", ko: "핑크색 타이트한 운동 전신 슈트, 맨발, 핑크색 발톱", en: "pink tight exercise full body suit, bare feet, pink feet top" }
            ];

            // Drag selection state
            let isDragging = false;
            let dragStart = null;
            let dragCurrent = null;
            let selectedAreaId = null;
            let draggedPresetIndex = null;

            // Enforce strictly 1 output slot ("prompt") on the node (clean up legacy outputs from saved graphs)
            function enforceSingleOutput(n) {
                if (!n) return;
                if (n.outputs && n.outputs.length > 1) {
                    while (n.outputs.length > 1) {
                        n.removeOutput(n.outputs.length - 1);
                    }
                }
                if (n.outputs && n.outputs.length === 1) {
                    n.outputs[0].name = "prompt";
                    n.outputs[0].type = "STRING";
                }
                if (app && app.canvas) app.canvas.setDirty(true, true);
            }
            enforceSingleOutput(node);

            // Hide backend native widgets for clean UI
            function hideAllBackendWidgets(n) {
                if (!n.widgets) return;
                for (const w of n.widgets) {
                    if (w.name !== "visual_grid_ui") {
                        w.hidden = true;
                        w.type = "hidden";
                    }
                }
            }
            setTimeout(() => {
                hideAllBackendWidgets(node);
                enforceSingleOutput(node);
            }, 10);

            // Container Element
            const container = document.createElement("div");
            container.className = "visual-grid-container";
            container.style.cssText = `
                width: 100%;
                background: #111116;
                color: #e4e4e7;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
                padding: 8px;
                box-sizing: border-box;
                border-radius: 8px;
                display: flex;
                flex-direction: column;
                gap: 8px;
                user-select: none;
            `;

            // Forward Mouse Wheel (Canvas Zoom) & Middle-Click (Canvas Pan) to LiteGraph Canvas
            container.addEventListener("wheel", (e) => {
                const scrollable = e.target.closest(".vg-tree-drawer, .vg-drawer");
                if (scrollable && scrollable.scrollHeight > scrollable.clientHeight) {
                    return; // Allow internal drawer scrolling
                }
                if (app && app.canvas) {
                    if (app.canvas.ds) {
                        const zoomDelta = e.deltaY < 0 ? 1.1 : 0.9;
                        app.canvas.ds.changeDeltaScale(zoomDelta, [e.clientX, e.clientY]);
                        app.canvas.setDirty(true, true);
                    } else if (app.canvas.canvas) {
                        app.canvas.canvas.dispatchEvent(new WheelEvent("wheel", {
                            bubbles: true,
                            cancelable: true,
                            clientX: e.clientX,
                            clientY: e.clientY,
                            deltaX: e.deltaX,
                            deltaY: e.deltaY,
                            deltaZ: e.deltaZ,
                            deltaMode: e.deltaMode
                        }));
                    }
                    e.preventDefault();
                }
            }, { passive: false });

            container.addEventListener("pointerdown", (e) => {
                if (e.button === 1) { // Middle mouse click pan
                    if (app && app.canvas && app.canvas.processMouseDown) {
                        app.canvas.processMouseDown(e);
                        e.preventDefault();
                    }
                }
            });

            container.addEventListener("mousedown", (e) => {
                if (e.button === 1) { // Middle mouse click pan
                    if (app && app.canvas && app.canvas.processMouseDown) {
                        app.canvas.processMouseDown(e);
                        e.preventDefault();
                    }
                }
            });

            // Inject CSS Styles
            const styleTag = document.createElement("style");
            styleTag.textContent = `
                .vg-toolbar { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
                .vg-btn { background: #27272a; color: #f4f4f5; border: 1px solid #3f3f46; border-radius: 4px; padding: 4px 8px; font-size: 11px; cursor: pointer; transition: all 0.15s ease; }
                .vg-btn:hover { background: #3f3f46; border-color: #71717a; }
                .vg-btn.active { background: #4f46e5; border-color: #6366f1; color: #fff; font-weight: 600; box-shadow: 0 0 8px rgba(99, 102, 241, 0.4); }
                .vg-select { background: #18181b; color: #f4f4f5; border: 1px solid #3f3f46; border-radius: 4px; padding: 3px 6px; font-size: 11px; outline: none; }
                .vg-input { background: #18181b; color: #f4f4f5; border: 1px solid #3f3f46; border-radius: 4px; padding: 3px 6px; font-size: 11px; }
                .vg-textarea { background: #18181b; color: #f4f4f5; border: 1px solid #3f3f46; border-radius: 4px; padding: 5px 8px; font-size: 11px; line-height: 1.4; font-family: inherit; resize: vertical; min-height: 32px; box-sizing: border-box; width: 100%; outline: none; transition: border-color 0.2s ease, box-shadow 0.2s ease; }
                .vg-textarea:focus { border-color: #6366f1; box-shadow: 0 0 8px rgba(99, 102, 241, 0.4); }
                .vg-canvas-stage { width: 100%; height: 320px; min-height: 150px; max-height: 850px; background: #0d0d11; border: 1px solid #27272a; border-radius: 6px; padding: 6px; box-sizing: border-box; display: flex; justify-content: center; align-items: center; position: relative; overflow: hidden; user-select: none; }
                .vg-grid-wrapper { position: relative; background: #18181b; border: 1.5px solid #4f46e5; border-radius: 4px; overflow: hidden; box-sizing: border-box; flex-shrink: 0; box-shadow: 0 0 16px rgba(0,0,0,0.6); }
                .vg-stage-resize-handle { position: absolute; right: 3px; bottom: 3px; width: 18px; height: 18px; cursor: nwse-resize; color: #a1a1aa; font-size: 13px; font-weight: bold; display: flex; align-items: center; justify-content: center; z-index: 15; user-select: none; background: rgba(24,24,27,0.85); border-radius: 3px; border: 1px solid #3f3f46; transition: all 0.15s; }
                .vg-stage-resize-handle:hover { color: #ffffff; border-color: #6366f1; background: #4f46e5; }
                .vg-grid-cells { position: absolute; inset: 0; display: grid; pointer-events: none; }
                .vg-cell { border-right: 2px dashed rgba(255, 255, 255, 0.38); border-bottom: 2px dashed rgba(255, 255, 255, 0.38); box-sizing: border-box; }
                .vg-area-box { position: absolute; border: 2px solid; border-radius: 4px; display: flex; flex-direction: column; justify-content: space-between; padding: 3px; box-sizing: border-box; cursor: pointer; overflow: hidden; }
                .vg-area-box.selected { box-shadow: 0 0 16px var(--area-glow), inset 0 0 8px var(--area-glow); }
                .vg-area-header { display: flex; justify-content: space-between; align-items: center; width: 100%; z-index: 2; pointer-events: auto; }
                .vg-area-badge { font-weight: 700; font-size: 11px; line-height: 1; padding: 2px 4px; border-radius: 2px; background: rgba(0,0,0,0.65); color: #fff; }
                .vg-area-close { font-size: 13px; font-weight: 700; color: #d4d4d8; background: rgba(0,0,0,0.65); border: none; border-radius: 2px; width: 16px; height: 16px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.15s; line-height: 1; padding: 0; }
                .vg-area-close:hover { background: #ef4444; color: #fff; }
                .vg-area-prompt { font-size: 10px; font-weight: 500; text-shadow: 0 1px 2px rgba(0,0,0,0.8); line-height: 1.2; word-break: break-word; overflow: hidden; z-index: 2; }
                .mockup-svg { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0.28; pointer-events: none; }
                .vg-tree-drawer { background: #141418; border: 1px solid #4f46e5; border-radius: 6px; max-height: 240px; overflow-y: auto; display: flex; flex-direction: column; gap: 6px; padding: 8px; box-sizing: border-box; }
                .vg-tree-drawer.collapsed { display: none; }
                .tree-folder { font-size: 11.5px; font-weight: 600; color: #f4f4f5; background: #27272a; padding: 6px 8px; border-radius: 4px; cursor: pointer; display: flex; align-items: center; justify-content: space-between; }
                .tree-folder:hover { background: #3f3f46; color: #fff; }
                .tree-children { display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 4px; padding: 6px; background: rgba(0,0,0,0.3); border-radius: 4px; }
                .tree-children.collapsed { display: none; }
                .tree-item { font-size: 11px; color: #e4e4e7; background: #18181b; border: 1px solid #3f3f46; padding: 5px 6px; cursor: pointer; border-radius: 4px; text-align: center; line-height: 1.2; word-break: keep-all; }
                .tree-item:hover { background: #4f46e5; border-color: #6366f1; color: #fff; font-weight: 600; }
                .vg-drawer { background: #18181b; border: 1px solid #27272a; border-radius: 6px; padding: 6px; display: flex; flex-direction: column; gap: 6px; max-height: 180px; overflow-y: auto; box-sizing: border-box; }
                .vg-drawer.collapsed { display: none; }
                .vg-char-manager-drawer { background: #141418; border: 1px solid #6366f1; border-radius: 6px; padding: 8px; box-sizing: border-box; display: flex; flex-direction: column; gap: 6px; box-shadow: 0 4px 16px rgba(0,0,0,0.6); }
                .vg-char-item { background: #1c1c24; border: 1px solid #2e2e3a; border-radius: 4px; padding: 6px; display: flex; flex-direction: column; gap: 4px; }
                .custom-chip { display: flex; align-items: center; justify-content: space-between; background: #27272a; border: 1px solid #3f3f46; border-radius: 4px; padding: 3px 6px; font-size: 11px; cursor: grab; }
                .custom-chip.dragging { opacity: 0.4; }
                .custom-chip-del { color: #ef4444; font-weight: 700; cursor: pointer; padding: 0 4px; }
            `;
            container.appendChild(styleTag);

            // =========================================================================
            // UI Sections Build
            // =========================================================================
            
            // 1. Header Toolbar (Art Styles + UI Language Switcher)
            const artStyleBar = document.createElement("div");
            artStyleBar.className = "vg-toolbar";
            artStyleBar.style.cssText = "display:flex; justify-content:space-between; align-items:center; width:100%; flex-wrap:wrap; gap:4px;";

            const artBtnGroup = document.createElement("div");
            artBtnGroup.style.cssText = "display:flex; align-items:center; gap:4px; flex-wrap:wrap;";
            const artBarLabel = document.createElement("span");
            artBarLabel.style.cssText = "font-size:11px; font-weight:600; color:#a1a1aa;";
            artBarLabel.textContent = currentLang === "English" ? "🎨 Style:" : "🎨 화풍:";
            artBtnGroup.appendChild(artBarLabel);

            ART_STYLES.forEach(st => {
                const b = document.createElement("button");
                b.className = `vg-btn ${st.id === activeArtStyle ? "active" : ""}`;
                b.type = "button";
                b.dataset.styleId = st.id;
                b.textContent = `${st.icon} ${st.id === "none" ? (currentLang === "English" ? "None" : "없음") : (st.name.split(' ')[1] || st.name)}`;
                b.title = st.name;
                b.addEventListener("click", () => {
                    activeArtStyle = st.id;
                    prefixVal = st.prefix;
                    suffixVal = st.suffix;
                    prefixInput.value = prefixVal;
                    suffixInput.value = suffixVal;
                    artBtnGroup.querySelectorAll(".vg-btn").forEach(btn => btn.classList.remove("active"));
                    b.classList.add("active");
                    syncToWidgets();
                });
                artBtnGroup.appendChild(b);
            });

            // UI Language Switcher (한국어 / English)
            const langSelect = document.createElement("select");
            langSelect.className = "vg-select";
            langSelect.style.cssText = "padding:2px 6px; font-size:10.5px; border-color:#6366f1; background:#1e1e2e; color:#c7d2fe; font-weight:600; cursor:pointer;";
            ["한국어", "English"].forEach(lang => {
                const opt = document.createElement("option");
                opt.value = lang;
                opt.textContent = `🌐 ${lang}`;
                if (lang === currentLang) opt.selected = true;
                langSelect.appendChild(opt);
            });
            langSelect.addEventListener("change", (e) => {
                currentLang = e.target.value;
                updateAllUILanguage();
                syncToWidgets();
            });

            artStyleBar.appendChild(artBtnGroup);
            artStyleBar.appendChild(langSelect);
            container.appendChild(artStyleBar);

            // 2. Toggles & Ratio Bar
            const toggleBar = document.createElement("div");
            toggleBar.className = "vg-toolbar";
            
            // Ratio
            const ratioSelect = document.createElement("select");
            ratioSelect.className = "vg-select";
            ["16:9", "9:16", "1:1", "4:3", "3:4", "3:2", "2:3", "21:9"].forEach(r => {
                const opt = document.createElement("option");
                opt.value = r;
                opt.textContent = r;
                if (r === currentRatio) opt.selected = true;
                ratioSelect.appendChild(opt);
            });
            ratioSelect.addEventListener("change", (e) => {
                currentRatio = e.target.value;
                updateCanvasDimensions();
                syncToWidgets();
            });

            // Grid Steppers
            const colsInput = document.createElement("input");
            colsInput.type = "number";
            colsInput.className = "vg-input";
            colsInput.style.width = "36px";
            colsInput.value = cols;
            colsInput.min = 1; colsInput.max = 20;
            colsInput.addEventListener("change", () => {
                cols = parseInt(colsInput.value) || 6;
                areas = areas.filter(a => a.c2 < cols);
                renderGrid();
                syncToWidgets();
            });

            const rowsInput = document.createElement("input");
            rowsInput.type = "number";
            rowsInput.className = "vg-input";
            rowsInput.style.width = "36px";
            rowsInput.value = rows;
            rowsInput.min = 1; rowsInput.max = 20;
            rowsInput.addEventListener("change", () => {
                rows = parseInt(rowsInput.value) || 3;
                areas = areas.filter(a => a.r2 < rows);
                renderGrid();
                syncToWidgets();
            });

            // White BG toggle
            const whiteBgLabel = document.createElement("label");
            whiteBgLabel.style.cssText = "font-size:11px; display:flex; align-items:center; gap:3px; cursor:pointer;";
            const whiteBgCheck = document.createElement("input");
            whiteBgCheck.type = "checkbox";
            whiteBgCheck.checked = whiteBg;
            whiteBgCheck.addEventListener("change", () => {
                whiteBg = whiteBgCheck.checked;
                syncToWidgets();
            });
            const whiteBgSpan = document.createElement("span");
            whiteBgSpan.textContent = currentLang === "English" ? " White BG" : " 백색 배경";
            whiteBgLabel.appendChild(whiteBgCheck);
            whiteBgLabel.appendChild(whiteBgSpan);

            // Grid Borders toggle
            const gridBorderLabel = document.createElement("label");
            gridBorderLabel.style.cssText = "font-size:11px; display:flex; align-items:center; gap:3px; cursor:pointer;";
            const gridBorderCheck = document.createElement("input");
            gridBorderCheck.type = "checkbox";
            gridBorderCheck.checked = gridBorders;
            gridBorderCheck.addEventListener("change", () => {
                gridBorders = gridBorderCheck.checked;
                syncToWidgets();
            });
            const gridBorderSpan = document.createElement("span");
            gridBorderSpan.textContent = currentLang === "English" ? " Grid Borders" : " 격자 실선";
            gridBorderLabel.appendChild(gridBorderCheck);
            gridBorderLabel.appendChild(gridBorderSpan);

            // Silhouette toggle
            const mockupLabel = document.createElement("label");
            mockupLabel.style.cssText = "font-size:11px; display:flex; align-items:center; gap:3px; cursor:pointer;";
            const mockupCheck = document.createElement("input");
            mockupCheck.type = "checkbox";
            mockupCheck.checked = mockupEnabled;
            mockupCheck.addEventListener("change", () => {
                mockupEnabled = mockupCheck.checked;
                renderGrid();
            });
            const mockupSpan = document.createElement("span");
            mockupSpan.textContent = currentLang === "English" ? " Silhouette" : " 실루엣";
            mockupLabel.appendChild(mockupCheck);
            mockupLabel.appendChild(mockupSpan);

            toggleBar.appendChild(ratioSelect);
            toggleBar.appendChild(document.createTextNode("📐"));
            toggleBar.appendChild(colsInput);
            toggleBar.appendChild(document.createTextNode("x"));
            toggleBar.appendChild(rowsInput);
            toggleBar.appendChild(whiteBgLabel);
            toggleBar.appendChild(gridBorderLabel);
            toggleBar.appendChild(mockupLabel);
            container.appendChild(toggleBar);

            // 3. Character Profile Master Section (Presets, Ko/En Inputs & Live Auto-Translate)
            const charCard = document.createElement("div");
            charCard.className = "vg-char-card";
            charCard.style.cssText = "background:#18181b; border:1px solid #27272a; border-radius:6px; padding:6px; display:flex; flex-direction:column; gap:5px;";

            const charHeader = document.createElement("div");
            charHeader.style.cssText = "display:flex; justify-content:space-between; align-items:center; width:100%; gap:8px;";

            const charTitle = document.createElement("div");
            charTitle.style.cssText = "font-size:11px; font-weight:700; color:#a1a1aa; display:flex; align-items:center; gap:4px; white-space:nowrap;";
            charTitle.innerHTML = `<span>👤 인물 공통 외모</span>`;

            const charPresetsBar = document.createElement("div");
            charPresetsBar.style.cssText = "display:flex; gap:6px; align-items:center; flex:1; justify-content:flex-end;";

            const charSelect = document.createElement("select");
            charSelect.className = "vg-select";
            charSelect.style.cssText = "padding:2px 6px; font-size:10.5px; flex:1; min-width:160px; max-width:260px; text-overflow:ellipsis; overflow:hidden;";
            
            function renderCharPresetsDropdown() {
                charSelect.innerHTML = `<option value="">▼ 👤 외모 프리셋 (${charPresets.length}개)</option>`;
                charPresets.forEach((cp, idx) => {
                    const opt = document.createElement("option");
                    opt.value = idx;
                    const displayTxt = cp.label ? cp.label : (cp.ko ? cp.ko.slice(0, 30) : cp.en.slice(0, 30));
                    opt.textContent = `👤 ${displayTxt}`;
                    charSelect.appendChild(opt);
                });
            }
            renderCharPresetsDropdown();

            charSelect.addEventListener("change", (e) => {
                const idx = e.target.value;
                if (idx !== "" && charPresets[idx]) {
                    const cp = charPresets[idx];
                    charKoInput.value = cp.ko || "";
                    charEnInput.value = cp.en || "";
                    characterProfileKo = charKoInput.value;
                    characterProfile = charEnInput.value || charKoInput.value;
                    syncToWidgets();
                    e.target.value = "";
                }
            });

            // Preset Manager Settings Button
            const btnOpenCharManager = document.createElement("button");
            btnOpenCharManager.className = "vg-btn";
            btnOpenCharManager.type = "button";
            btnOpenCharManager.style.cssText = "padding:2px 8px; font-size:10.5px; border-color:#6366f1; background:#1e1e2e; color:#c7d2fe; white-space:nowrap;";
            btnOpenCharManager.textContent = currentLang === "English" ? "⚙️ Preset Settings" : "인물 공통 프리셋 설정";
            btnOpenCharManager.title = "인물 외모 프리셋 관리 (추가, 수정, 삭제, 순서 변경)";

            charPresetsBar.appendChild(charSelect);
            charPresetsBar.appendChild(btnOpenCharManager);

            charHeader.appendChild(charTitle);
            charHeader.appendChild(charPresetsBar);
            charCard.appendChild(charHeader);

            // 2-Column Body Grid (Left: Textareas, Right: Action Buttons)
            const charBodyRow = document.createElement("div");
            charBodyRow.style.cssText = "display:flex; gap:6px; align-items:stretch; width:100%; box-sizing:border-box;";

            const charInputsCol = document.createElement("div");
            charInputsCol.style.cssText = "flex:1; display:flex; flex-direction:column; gap:4px; min-width:0;";

            // Korean Profile Input
            const charKoInput = document.createElement("textarea");
            charKoInput.className = "vg-textarea";
            charKoInput.rows = 1;
            charKoInput.style.cssText = "min-height:26px; resize:vertical; font-size:11px; padding:4px 6px; width:100%; box-sizing:border-box;";
            charKoInput.placeholder = "KR: 한글 인물 공통 외모 (예: 한국인, 남성, 30살, 배불뚝이...)";
            charKoInput.value = characterProfileKo || (/[가-힣]/.test(characterProfile) ? characterProfile : "");

            // English Profile Input
            const charEnInput = document.createElement("textarea");
            charEnInput.className = "vg-textarea";
            charEnInput.rows = 1;
            charEnInput.style.cssText = "min-height:26px; resize:vertical; font-size:11px; padding:4px 6px; border-color:#3f3f46; color:#d4d4d8; width:100%; box-sizing:border-box;";
            charEnInput.placeholder = "US: 영문 인물 공통 외모 (AI 최종 전달용 / 한글 입력 시 실시간 자동 번역)";
            charEnInput.value = !/[가-힣]/.test(characterProfile) ? characterProfile : "";

            // Auto translation debouncer for charKoInput
            let charTransTimer = null;
            charKoInput.addEventListener("input", () => {
                characterProfileKo = charKoInput.value.trim();
                const fastEn = translateToEnglish(characterProfileKo);
                if (fastEn && fastEn !== characterProfileKo) {
                    charEnInput.value = fastEn;
                    characterProfile = fastEn;
                    syncToWidgets();
                }

                clearTimeout(charTransTimer);
                if (characterProfileKo) {
                    charTransTimer = setTimeout(async () => {
                        charEnInput.placeholder = "🌐 번역 중...";
                        const translated = await translateToEnglishAsync(charKoInput.value.trim());
                        if (translated) {
                            charEnInput.value = translated;
                            characterProfile = translated;
                            syncToWidgets();
                        }
                    }, 250);
                } else {
                    charEnInput.value = "";
                    characterProfile = "";
                    syncToWidgets();
                }
            });

            charEnInput.addEventListener("input", () => {
                characterProfile = charEnInput.value.trim();
                syncToWidgets();
            });

            // If initial charEnInput is empty and charKoInput has Korean, auto-translate immediately!
            if (charKoInput.value.trim() && (!charEnInput.value.trim() || /[가-힣]/.test(charEnInput.value))) {
                const fast = translateToEnglish(charKoInput.value.trim());
                if (fast && fast !== charKoInput.value.trim()) {
                    charEnInput.value = fast;
                    characterProfile = fast;
                }
                translateToEnglishAsync(charKoInput.value.trim()).then(res => {
                    if (res) {
                        charEnInput.value = res;
                        characterProfile = res;
                        syncToWidgets();
                    }
                });
            }

            charInputsCol.appendChild(charKoInput);
            charInputsCol.appendChild(charEnInput);

            // Right Action Column
            const charActionsCol = document.createElement("div");
            charActionsCol.style.cssText = "width:52px; display:flex; flex-direction:column; gap:4px; justify-content:space-between; flex-shrink:0;";

            const btnQuickSave = document.createElement("button");
            btnQuickSave.className = "vg-btn";
            btnQuickSave.type = "button";
            btnQuickSave.style.cssText = "flex:1; padding:2px 4px; font-size:10.5px; font-weight:600; display:flex; align-items:center; justify-content:center; gap:2px; background:#22222a; border-color:#eab308; color:#fef08a;";
            btnQuickSave.innerHTML = `<span>⭐ 저장</span>`;
            btnQuickSave.title = "현재 입력된 외모를 새 프리셋으로 빠른 추가";

            btnQuickSave.addEventListener("click", () => {
                const ko = charKoInput.value.trim();
                const en = charEnInput.value.trim();
                if (!ko && !en) {
                    alert("저장할 인물 외모 묘사를 먼저 입력해주세요.");
                    return;
                }
                const defaultLabel = ko.slice(0, 14) || en.slice(0, 14);
                const label = prompt("새 인물 외모 프리셋 이름:", defaultLabel);
                if (label) {
                    charPresets.push({ label: label.trim(), ko, en: en || ko });
                    try { localStorage.setItem("comfyui_vg_char_presets", JSON.stringify(charPresets)); } catch (e) {}
                    renderCharPresetsDropdown();
                    btnQuickSave.innerHTML = `<span>✅ 완료</span>`;
                    setTimeout(() => { btnQuickSave.innerHTML = `<span>⭐ 저장</span>`; }, 1200);
                }
            });

            const btnClearChar = document.createElement("button");
            btnClearChar.className = "vg-btn";
            btnClearChar.type = "button";
            btnClearChar.style.cssText = "flex:1; padding:2px 4px; font-size:10.5px; display:flex; align-items:center; justify-content:center; background:#22222a; color:#a1a1aa;";
            btnClearChar.textContent = "비우기";
            btnClearChar.addEventListener("click", () => {
                charKoInput.value = "";
                charEnInput.value = "";
                characterProfileKo = "";
                characterProfile = "";
                syncToWidgets();
            });

            charActionsCol.appendChild(btnQuickSave);
            charActionsCol.appendChild(btnClearChar);

            charBodyRow.appendChild(charInputsCol);
            charBodyRow.appendChild(charActionsCol);
            charCard.appendChild(charBodyRow);
            container.appendChild(charCard);

            // 3-B. Dedicated Character Preset Management Modal / Drawer
            const charManagerDrawer = document.createElement("div");
            charManagerDrawer.className = "vg-char-manager-drawer";
            charManagerDrawer.style.display = "none";

            function renderCharManagerList() {
                charManagerDrawer.innerHTML = "";
                
                // Header
                const mHeader = document.createElement("div");
                mHeader.style.cssText = "display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #3f3f46; padding-bottom:4px;";
                mHeader.innerHTML = `<div style="font-size:11.5px; font-weight:700; color:#c7d2fe; display:flex; align-items:center; gap:4px;">⚙️ ${currentLang === "English" ? "Character Presets Manager" : "인물 외모 프리셋 관리"} <span style="font-size:10px; color:#a1a1aa;">(${charPresets.length})</span></div>`;

                const btnCloseM = document.createElement("button");
                btnCloseM.className = "vg-btn";
                btnCloseM.type = "button";
                btnCloseM.style.cssText = "padding:1px 6px; font-size:12px; line-height:1;";
                btnCloseM.textContent = "×";
                btnCloseM.addEventListener("click", () => {
                    charManagerDrawer.style.display = "none";
                    setTimeout(updateHeightOnDrawerToggle, 30);
                });
                mHeader.appendChild(btnCloseM);
                charManagerDrawer.appendChild(mHeader);

                // List Container
                const listContainer = document.createElement("div");
                listContainer.style.cssText = "max-height:220px; overflow-y:auto; display:flex; flex-direction:column; gap:5px; padding-right:2px;";

                charPresets.forEach((cp, idx) => {
                    const item = document.createElement("div");
                    item.className = "vg-char-item";

                    const itemTop = document.createElement("div");
                    itemTop.style.cssText = "display:flex; gap:4px; align-items:center;";

                    // Move Up / Down
                    const btnUp = document.createElement("button");
                    btnUp.className = "vg-btn";
                    btnUp.type = "button";
                    btnUp.style.cssText = "padding:1px 4px; font-size:9.5px;";
                    btnUp.textContent = "▲";
                    btnUp.disabled = idx === 0;
                    btnUp.addEventListener("click", () => {
                        if (idx > 0) {
                            const tmp = charPresets[idx];
                            charPresets[idx] = charPresets[idx - 1];
                            charPresets[idx - 1] = tmp;
                            saveAndRefreshPresets();
                        }
                    });

                    const btnDown = document.createElement("button");
                    btnDown.className = "vg-btn";
                    btnDown.type = "button";
                    btnDown.style.cssText = "padding:1px 4px; font-size:9.5px;";
                    btnDown.textContent = "▼";
                    btnDown.disabled = idx === charPresets.length - 1;
                    btnDown.addEventListener("click", () => {
                        if (idx < charPresets.length - 1) {
                            const tmp = charPresets[idx];
                            charPresets[idx] = charPresets[idx + 1];
                            charPresets[idx + 1] = tmp;
                            saveAndRefreshPresets();
                        }
                    });

                    // Preset Title input
                    const inputTitle = document.createElement("input");
                    inputTitle.className = "vg-input";
                    inputTitle.type = "text";
                    inputTitle.style.cssText = "flex:1; font-weight:700; font-size:11px; padding:2px 5px;";
                    inputTitle.value = cp.label || "";
                    inputTitle.placeholder = "프리셋 이름";
                    inputTitle.addEventListener("input", () => {
                        cp.label = inputTitle.value;
                        try { localStorage.setItem("comfyui_vg_char_presets", JSON.stringify(charPresets)); } catch (e) {}
                        renderCharPresetsDropdown();
                    });

                    // Delete button
                    const btnDel = document.createElement("button");
                    btnDel.className = "vg-btn";
                    btnDel.type = "button";
                    btnDel.style.cssText = "padding:1px 5px; font-size:10px; color:#f87171; border-color:#7f1d1d;";
                    btnDel.textContent = "🗑️";
                    btnDel.title = "프리셋 삭제";
                    btnDel.addEventListener("click", () => {
                        if (confirm(`'${cp.label}' 프리셋을 삭제하시겠습니까?`)) {
                            charPresets.splice(idx, 1);
                            saveAndRefreshPresets();
                        }
                    });

                    itemTop.appendChild(btnUp);
                    itemTop.appendChild(btnDown);
                    itemTop.appendChild(inputTitle);
                    itemTop.appendChild(btnDel);
                    item.appendChild(itemTop);

                    // Korean / English Textareas with auto-trans
                    const inputKo = document.createElement("textarea");
                    inputKo.className = "vg-textarea";
                    inputKo.rows = 1;
                    inputKo.style.cssText = "min-height:22px; font-size:10.5px; padding:2px 4px;";
                    inputKo.value = cp.ko || "";
                    inputKo.placeholder = "KR: 한글 인물 외모";
                    inputKo.addEventListener("input", () => {
                        cp.ko = inputKo.value;
                        try { localStorage.setItem("comfyui_vg_char_presets", JSON.stringify(charPresets)); } catch (e) {}
                    });

                    const inputEn = document.createElement("textarea");
                    inputEn.className = "vg-textarea";
                    inputEn.rows = 1;
                    inputEn.style.cssText = "min-height:22px; font-size:10.5px; padding:2px 4px; border-color:#3f3f46; color:#d4d4d8;";
                    inputEn.value = cp.en || "";
                    inputEn.placeholder = "US: 영문 인물 외모";
                    inputEn.addEventListener("input", () => {
                        cp.en = inputEn.value;
                        try { localStorage.setItem("comfyui_vg_char_presets", JSON.stringify(charPresets)); } catch (e) {}
                    });

                    // Inline translate for this preset
                    inputKo.addEventListener("blur", async () => {
                        if (inputKo.value.trim() && (!inputEn.value.trim() || /[가-힣]/.test(inputEn.value))) {
                            const fast = translateToEnglish(inputKo.value.trim());
                            if (fast) { inputEn.value = fast; cp.en = fast; }
                            const res = await translateToEnglishAsync(inputKo.value.trim());
                            if (res) {
                                inputEn.value = res;
                                cp.en = res;
                                try { localStorage.setItem("comfyui_vg_char_presets", JSON.stringify(charPresets)); } catch (e) {}
                            }
                        }
                    });

                    item.appendChild(inputKo);
                    item.appendChild(inputEn);
                    listContainer.appendChild(item);
                });

                charManagerDrawer.appendChild(listContainer);

                // Footer Bar (Add New, Reset Default, Save & Close)
                const mFooter = document.createElement("div");
                mFooter.style.cssText = "display:flex; justify-content:space-between; align-items:center; gap:4px; padding-top:4px; border-top:1px solid #3f3f46;";

                const btnAddRow = document.createElement("button");
                btnAddRow.className = "vg-btn";
                btnAddRow.type = "button";
                btnAddRow.style.cssText = "padding:3px 7px; font-size:10.5px; background:#4f46e5; border-color:#6366f1; color:#fff;";
                btnAddRow.textContent = "➕ 새 프리셋 추가";
                btnAddRow.addEventListener("click", () => {
                    charPresets.unshift({ label: "새 인물 외모", ko: "", en: "" });
                    saveAndRefreshPresets();
                });

                const btnResetDefaults = document.createElement("button");
                btnResetDefaults.className = "vg-btn";
                btnResetDefaults.type = "button";
                btnResetDefaults.style.cssText = "padding:3px 6px; font-size:10.5px;";
                btnResetDefaults.textContent = "🔄 초기화";
                btnResetDefaults.title = "기본 프리셋으로 초기화";
                btnResetDefaults.addEventListener("click", () => {
                    if (confirm("모든 외모 프리셋을 기본값으로 초기화하시겠습니까?")) {
                        charPresets = [
                            { label: "20대 한국 여성", ko: "20대 한국 여성, 긴 흑발 포니테일, 검은 뿔테 안경, 자연스러운 메이크업", en: "Korean woman in her 20s, long black hair ponytail, black horn-rimmed glasses, natural makeup" },
                            { label: "30대 비즈니스 남성", ko: "30대 한국 남성, 깔끔한 쉼표머리 헤어스타일, 네이비 정장 수트, 지적인 인상", en: "Korean man in his 30s, neat comma hairstyle, navy business suit, intellectual look" },
                            { label: "애니메이션 미소녀", ko: "밝은 은발 트윈테일, 에메랄드 보석 눈동자, 고양이 귀, 귀여운 후드티", en: "bright silver twintail hair, emerald jewel eyes, cat ears, cute oversized hoodie" },
                            { label: "40대 여성 파마머리", ko: "한국인, 40대, 여성, 뽀글뽀글 파마머리, 갈색 머리, 검정색 뿔테 안경, 큰키, 글래머", en: "Korean, 40s, female, permed hair, brown hair, black horn-rimmed glasses, tall, glamorous" }
                        ];
                        saveAndRefreshPresets();
                    }
                });

                const btnCloseFooter = document.createElement("button");
                btnCloseFooter.className = "vg-btn";
                btnCloseFooter.type = "button";
                btnCloseFooter.style.cssText = "padding:3px 8px; font-size:10.5px; background:#10b981; border-color:#34d399; color:#fff; font-weight:700;";
                btnCloseFooter.textContent = "💾 완료";
                btnCloseFooter.addEventListener("click", () => {
                    charManagerDrawer.style.display = "none";
                    setTimeout(updateHeightOnDrawerToggle, 30);
                });

                mFooter.appendChild(btnAddRow);
                mFooter.appendChild(btnResetDefaults);
                mFooter.appendChild(btnCloseFooter);
                charManagerDrawer.appendChild(mFooter);
            }

            function saveAndRefreshPresets() {
                try { localStorage.setItem("comfyui_vg_char_presets", JSON.stringify(charPresets)); } catch (e) {}
                renderCharPresetsDropdown();
                renderCharManagerList();
            }

            btnOpenCharManager.addEventListener("click", () => {
                if (charManagerDrawer.style.display === "none") {
                    renderCharManagerList();
                    charManagerDrawer.style.display = "flex";
                } else {
                    charManagerDrawer.style.display = "none";
                }
                setTimeout(updateHeightOnDrawerToggle, 30);
            });

            container.appendChild(charManagerDrawer);

            // 4. Interactive Grid Canvas Viewport (Stage with Corner Drag Resizing & Locked True Aspect Ratio)
            const canvasStage = document.createElement("div");
            canvasStage.className = "vg-canvas-stage";

            const canvasWrapper = document.createElement("div");
            canvasWrapper.className = "vg-grid-wrapper";

            const gridCellsContainer = document.createElement("div");
            gridCellsContainer.className = "vg-grid-cells";
            canvasWrapper.appendChild(gridCellsContainer);

            const areasLayer = document.createElement("div");
            areasLayer.style.cssText = "position:absolute; inset:0;";
            canvasWrapper.appendChild(areasLayer);

            const selectionBox = document.createElement("div");
            selectionBox.style.cssText = "position:absolute; border:2px dashed #6366f1; background:rgba(99,102,241,0.25); pointer-events:none; display:none;";
            canvasWrapper.appendChild(selectionBox);

            // Bottom-Right Corner Drag Resize Handle for Canvas Stage
            const stageResizeHandle = document.createElement("div");
            stageResizeHandle.className = "vg-stage-resize-handle";
            stageResizeHandle.innerHTML = `⇲`;
            stageResizeHandle.title = currentLang === "English" ? "Drag to resize canvas area" : "드래그하여 격자 영역 크기 조절";

            // Interactive Drag Resizing on Stage
            let isStageResizing = false;
            let startStageY = 0;
            let startStageH = 320;

            stageResizeHandle.addEventListener("mousedown", (e) => {
                e.preventDefault();
                e.stopPropagation();
                isStageResizing = true;
                startStageY = e.clientY;
                startStageH = canvasStage.offsetHeight || 320;

                const onMouseMove = (moveEvent) => {
                    if (!isStageResizing) return;
                    const deltaY = moveEvent.clientY - startStageY;
                    const newHeight = Math.min(Math.max(startStageH + deltaY, 150), 850);
                    canvasStage.style.height = `${newHeight}px`;
                    stageMaxHeight = newHeight;
                    updateCanvasDimensions();
                };

                const onMouseUp = () => {
                    if (isStageResizing) {
                        isStageResizing = false;
                        window.removeEventListener("mousemove", onMouseMove);
                        window.removeEventListener("mouseup", onMouseUp);
                        syncToWidgets();
                    }
                };

                window.addEventListener("mousemove", onMouseMove);
                window.addEventListener("mouseup", onMouseUp);
            });

            canvasStage.appendChild(canvasWrapper);
            canvasStage.appendChild(stageResizeHandle);
            container.appendChild(canvasStage);

            // Guide text
            const guideEl = document.createElement("div");
            guideEl.style.cssText = "font-size:10px; color:#a1a1aa; text-align:center;";
            guideEl.textContent = "🖱️ 드래그: 영역 생성 | ✏️ 클릭: 구도 편집 | ❌ [×]버튼 또는 우클릭: 삭제";
            container.appendChild(guideEl);

            // =========================================================================
            // 5. Area Prompt Editor & Explorer Tree Selector Modal / Drawer
            // =========================================================================
            const editorCard = document.createElement("div");
            editorCard.style.cssText = "background:#18181b; border:1px solid #27272a; border-radius:6px; padding:8px; display:flex; flex-direction:column; gap:6px;";
            
            // Header: Active area badge
            const editorHeader = document.createElement("div");
            editorHeader.style.cssText = "display:flex; justify-content:space-between; align-items:center; padding-bottom:2px;";
            
            const activeAreaTitle = document.createElement("span");
            activeAreaTitle.style.cssText = "font-size:11.5px; font-weight:700; color:#818cf8; word-break:break-all;";
            activeAreaTitle.textContent = "📍 편집할 영역을 선택하세요";
            editorHeader.appendChild(activeAreaTitle);
            editorCard.appendChild(editorHeader);

            // Full-Width 10-Category Tree Explorer Button
            const treeBtn = document.createElement("button");
            treeBtn.className = "vg-btn";
            treeBtn.type = "button";
            treeBtn.style.cssText = "width:100%; display:flex; justify-content:space-between; align-items:center; padding:6px 10px; font-weight:600; background:#27272a; border:1px solid #4f46e5; border-radius:4px; color:#fff; cursor:pointer;";
            treeBtn.innerHTML = `<span>📂 10대 캐릭터 시트 구도 탐색기</span><span>▼</span>`;
            
            const treeDrawer = document.createElement("div");
            treeDrawer.className = "vg-tree-drawer collapsed";

            const treeSearch = document.createElement("input");
            treeSearch.className = "vg-input";
            treeSearch.style.width = "100%";
            treeSearch.placeholder = "🔍 구도 검색 (쇄골, 발등, 워킹, 누운, 정면)...";
            treeDrawer.appendChild(treeSearch);

            const treeList = document.createElement("div");
            treeList.style.cssText = "display:flex; flex-direction:column; gap:6px;";
            treeDrawer.appendChild(treeList);

            // Render Explorer Tree
            PRESET_GROUPS.forEach(grp => {
                const fWrap = document.createElement("div");
                fWrap.style.cssText = "display:flex; flex-direction:column; gap:4px;";

                const fHead = document.createElement("div");
                fHead.className = "tree-folder";
                fHead.innerHTML = `<span>${grp.icon} ${grp.group}</span> <span style="font-size:10px; color:#a1a1aa;">(${grp.items.length}) ▶</span>`;
                
                const fChildren = document.createElement("div");
                fChildren.className = "tree-children collapsed";

                grp.items.forEach(it => {
                    const itEl = document.createElement("div");
                    itEl.className = "tree-item";
                    itEl.dataset.label = it.label;
                    itEl.dataset.ko = it.ko;
                    itEl.dataset.en = it.en;
                    itEl.textContent = `📄 ${it.label}`;
                    itEl.title = `${it.ko}\n(${it.en})`;
                    itEl.addEventListener("click", () => {
                        applyPresetToActiveArea({ ko: it.ko, en: it.en });
                        treeDrawer.classList.add("collapsed");
                    });
                    fChildren.appendChild(itEl);
                });

                fHead.addEventListener("click", () => {
                    const isOpen = !fChildren.classList.contains("collapsed");
                    fChildren.classList.toggle("collapsed", isOpen);
                    fHead.querySelector("span:last-child").textContent = `(${grp.items.length}) ${isOpen ? "▶" : "▼"}`;
                    updateHeightOnDrawerToggle();
                });

                fWrap.appendChild(fHead);
                fWrap.appendChild(fChildren);
                treeList.appendChild(fWrap);
            });

            treeSearch.addEventListener("input", () => {
                const q = treeSearch.value.trim().toLowerCase();
                treeList.querySelectorAll(".tree-children").forEach(c => {
                    let has = false;
                    c.querySelectorAll(".tree-item").forEach(it => {
                        const m = !q || (it.dataset.label + it.dataset.ko + it.dataset.en).toLowerCase().includes(q);
                        it.style.display = m ? "block" : "none";
                        if (m) has = true;
                    });
                    if (q) c.classList.toggle("collapsed", !has);
                });
            });

            treeBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                treeDrawer.classList.toggle("collapsed");
                updateHeightOnDrawerToggle();
            });

            editorCard.appendChild(treeBtn);
            editorCard.appendChild(treeDrawer);

            // 6. Custom Presets 2nd Dropdown & Drawer Toggle
            const customPresetsBar = document.createElement("div");
            customPresetsBar.style.cssText = "display:flex; gap:4px; align-items:center;";

            const customSelect = document.createElement("select");
            customSelect.className = "vg-select";
            customSelect.style.flex = "1";
            
            function updateCustomSelect() {
                customSelect.innerHTML = `<option value="">▼ ⭐ 나만의 프리셋 (${customPresets.length}개)</option>`;
                customPresets.forEach(cp => {
                    const opt = document.createElement("option");
                    opt.value = cp.en || cp.ko;
                    opt.textContent = `⭐ ${cp.label || cp.ko}`;
                    opt.dataset.ko = cp.ko;
                    opt.dataset.en = cp.en || cp.ko;
                    customSelect.appendChild(opt);
                });
            }
            updateCustomSelect();

            customSelect.addEventListener("change", (e) => {
                const opt = e.target.selectedOptions[0];
                if (opt && opt.value) {
                    applyPresetToActiveArea({ ko: opt.dataset.ko, en: opt.dataset.en });
                    e.target.value = "";
                }
            });

            const btnToggleDrawer = document.createElement("button");
            btnToggleDrawer.className = "vg-btn";
            btnToggleDrawer.type = "button";
            btnToggleDrawer.textContent = "⚙️ 관리";
            btnToggleDrawer.addEventListener("click", (e) => {
                e.stopPropagation();
                customDrawer.classList.toggle("collapsed");
                updateHeightOnDrawerToggle();
            });
            
            customPresetsBar.appendChild(customSelect);
            customPresetsBar.appendChild(btnToggleDrawer);
            editorCard.appendChild(customPresetsBar);

            // Collapsible Custom Drawer
            const customDrawer = document.createElement("div");
            customDrawer.className = "vg-drawer collapsed";
            
            const drawerChipsContainer = document.createElement("div");
            drawerChipsContainer.style.cssText = "display:flex; flex-direction:column; gap:4px; max-height:120px; overflow-y:auto;";
            
            function renderCustomDrawer() {
                updateCustomSelect();
                drawerChipsContainer.innerHTML = "";
                customPresets.forEach((cp, idx) => {
                    const chip = document.createElement("div");
                    chip.className = "custom-chip";
                    chip.draggable = true;
                    chip.innerHTML = `<span>⠿ ${cp.label || cp.ko}</span>`;
                    
                    const del = document.createElement("span");
                    del.className = "custom-chip-del";
                    del.textContent = "×";
                    del.addEventListener("click", (e) => {
                        e.stopPropagation();
                        customPresets.splice(idx, 1);
                        renderCustomDrawer();
                    });
                    
                    chip.appendChild(del);
                    chip.addEventListener("click", () => {
                        applyPresetToActiveArea({ ko: cp.ko, en: cp.en });
                    });

                    // Reorder drag & drop
                    chip.addEventListener("dragstart", () => { draggedPresetIndex = idx; chip.classList.add("dragging"); });
                    chip.addEventListener("dragover", (e) => { e.preventDefault(); });
                    chip.addEventListener("drop", (e) => {
                        e.preventDefault();
                        if (draggedPresetIndex !== null && draggedPresetIndex !== idx) {
                            const [moved] = customPresets.splice(draggedPresetIndex, 1);
                            customPresets.splice(idx, 0, moved);
                            renderCustomDrawer();
                        }
                    });
                    chip.addEventListener("dragend", () => { draggedPresetIndex = null; chip.classList.remove("dragging"); });

                    drawerChipsContainer.appendChild(chip);
                });
            }
            renderCustomDrawer();

            const btnSaveCurrent = document.createElement("button");
            btnSaveCurrent.className = "vg-btn";
            btnSaveCurrent.type = "button";
            btnSaveCurrent.textContent = "💾 현재 구도를 새 프리셋으로 등록";
            btnSaveCurrent.addEventListener("click", () => {
                const ko = areaKoInput.value.trim();
                const en = areaEnInput.value.trim();
                if (!ko && !en) return;
                const newPreset = {
                    id: "cp_" + Date.now(),
                    label: ko ? ko.slice(0, 15) : en.slice(0, 15),
                    ko: ko || en,
                    en: en || translateToEnglish(ko)
                };
                customPresets.push(newPreset);
                renderCustomDrawer();
            });

            customDrawer.appendChild(drawerChipsContainer);
            customDrawer.appendChild(btnSaveCurrent);
            editorCard.appendChild(customDrawer);

            btnToggleDrawer.addEventListener("click", () => {
                customDrawer.classList.toggle("collapsed");
            });

            // 7. Area Prompts Inputs (Korean + English)
            const areaKoInput = document.createElement("textarea");
            areaKoInput.className = "vg-textarea";
            areaKoInput.rows = 2;
            areaKoInput.placeholder = "🇰🇷 한글 프롬프트 (프리셋 선택 시 1:1 교체, 한글 입력 시 실시간 자동 번역)";
            
            let autoTranslateTimer = null;
            areaKoInput.addEventListener("input", () => {
                const area = getSelectedArea();
                if (area) {
                    area.ko_prompt = areaKoInput.value;

                    // 1차: 즉각적인 사전 번역 반영
                    const fastEn = translateToEnglish(area.ko_prompt);
                    area.prompt = fastEn;
                    areaEnInput.value = fastEn;
                    renderGrid();
                    syncToWidgets();

                    // 2차: 한글이 포함된 경우 실시간 구글 번역 호출 (300ms 디바운스)
                    clearTimeout(autoTranslateTimer);
                    if (/[가-힣]/.test(area.ko_prompt)) {
                        autoTranslateTimer = setTimeout(async () => {
                            const curArea = getSelectedArea();
                            if (curArea && curArea.id === area.id && areaKoInput.value.trim()) {
                                const googleEn = await translateToEnglishAsync(areaKoInput.value);
                                if (googleEn && googleEn.trim()) {
                                    curArea.prompt = googleEn.trim();
                                    areaEnInput.value = googleEn.trim();
                                    renderGrid();
                                    syncToWidgets();
                                }
                            }
                        }, 300);
                    }
                }
            });

            const areaEnInput = document.createElement("textarea");
            areaEnInput.className = "vg-textarea";
            areaEnInput.rows = 2;
            areaEnInput.placeholder = "🇺🇸 영문 프롬프트 (AI 최종 전달용 / 직접 수정 가능)";
            areaEnInput.addEventListener("input", () => {
                const area = getSelectedArea();
                if (area) {
                    area.prompt = areaEnInput.value;
                    renderGrid();
                    syncToWidgets();
                }
            });

            // 7-2. Apply & Translate Action Button
            const btnApplyPrompt = document.createElement("button");
            btnApplyPrompt.className = "vg-btn";
            btnApplyPrompt.type = "button";
            btnApplyPrompt.style.cssText = "width:100%; padding:6px 12px; font-weight:700; font-size:12px; background:#4f46e5; border:1px solid #6366f1; color:#fff; border-radius:4px; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:6px; box-shadow:0 0 10px rgba(99,102,241,0.35); transition:all 0.15s ease;";
            btnApplyPrompt.innerHTML = `<span>적용 (Ctrl+Enter)</span>`;

            async function triggerApplyAndTranslate() {
                const area = getSelectedArea();
                if (!area) return;
                btnApplyPrompt.innerHTML = `<span>⏳ 번역 및 적용 중...</span>`;
                btnApplyPrompt.style.opacity = "0.7";
                
                area.ko_prompt = areaKoInput.value.trim();
                if (area.ko_prompt) {
                    const translated = await translateToEnglishAsync(area.ko_prompt);
                    if (translated) {
                        area.prompt = translated;
                        areaEnInput.value = translated;
                    } else {
                        area.prompt = areaEnInput.value.trim();
                    }
                } else {
                    area.prompt = areaEnInput.value.trim();
                }

                renderGrid();
                syncToWidgets();

                btnApplyPrompt.innerHTML = `<span>✅ 적용 완료!</span>`;
                btnApplyPrompt.style.opacity = "1";
                setTimeout(() => {
                    btnApplyPrompt.innerHTML = `<span>적용 (Ctrl+Enter)</span>`;
                }, 1000);
            }

            btnApplyPrompt.addEventListener("click", (e) => {
                e.stopPropagation();
                triggerApplyAndTranslate();
            });

            // Shortcut Ctrl+Enter on both textareas
            areaKoInput.addEventListener("keydown", (e) => {
                if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                    e.preventDefault();
                    triggerApplyAndTranslate();
                }
            });

            areaEnInput.addEventListener("keydown", (e) => {
                if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                    e.preventDefault();
                    triggerApplyAndTranslate();
                }
            });

            editorCard.appendChild(areaKoInput);
            editorCard.appendChild(areaEnInput);
            editorCard.appendChild(btnApplyPrompt);
            container.appendChild(editorCard);

            // 8. Global Prefix / Suffix & Format
            const globalCard = document.createElement("div");
            globalCard.style.cssText = "display:flex; flex-direction:column; gap:4px;";
            
            const prefixInput = document.createElement("textarea");
            prefixInput.className = "vg-textarea";
            prefixInput.rows = 2;
            prefixInput.placeholder = "접두사 (Prefix: Masterpiece, Photorealistic)...";
            prefixInput.value = prefixVal;
            prefixInput.addEventListener("input", () => { prefixVal = prefixInput.value; syncToWidgets(); });

            const suffixInput = document.createElement("textarea");
            suffixInput.className = "vg-textarea";
            suffixInput.rows = 2;
            suffixInput.placeholder = "접미사 (Suffix: 8k resolution, cinematic lighting)...";
            suffixInput.value = suffixVal;
            suffixInput.addEventListener("input", () => { suffixVal = suffixInput.value; syncToWidgets(); });

            globalCard.appendChild(prefixInput);
            globalCard.appendChild(suffixInput);
            container.appendChild(globalCard);

            // 9. Output Format Selector & Sync Button
            const formatBar = document.createElement("div");
            formatBar.className = "vg-toolbar";
            
            const formatSelect = document.createElement("select");
            formatSelect.className = "vg-select";
            formatSelect.style.flex = "1";
            [
                "Natural Spatial (Krea/MiniMax/Gemini/GPT)",
                "ComfyUI / SD Regional Prompt (BREAK Syntax)",
                "Structured Tags ([Area 1 | LEFT])",
                "Coordinates Bounding Box (<area_1 bbox=...>)",
                "Comma-Separated List",
                "Raw JSON"
            ].forEach(f => {
                const opt = document.createElement("option");
                opt.value = f;
                opt.textContent = f;
                if (f === currentFormat) opt.selected = true;
                formatSelect.appendChild(opt);
            });
            formatSelect.addEventListener("change", (e) => {
                currentFormat = e.target.value;
                syncToWidgets();
            });

            const btnClear = document.createElement("button");
            btnClear.className = "vg-btn";
            btnClear.type = "button";
            btnClear.textContent = "🗑️ 초기화";
            btnClear.addEventListener("click", () => {
                areas = [];
                selectedAreaId = null;
                renderGrid();
                syncToWidgets();
            });

            formatBar.appendChild(formatSelect);
            formatBar.appendChild(btnClear);
            container.appendChild(formatBar);

            // 10. Live Final Prompt Preview & 1-Click Copy Card
            const promptPreviewCard = document.createElement("div");
            promptPreviewCard.className = "vg-prompt-preview-card";
            promptPreviewCard.style.cssText = "background:#141418; border:1px solid #3f3f46; border-radius:6px; padding:8px; display:flex; flex-direction:column; gap:6px; box-sizing:border-box;";

            const previewHeader = document.createElement("div");
            previewHeader.style.cssText = "display:flex; justify-content:space-between; align-items:center; width:100%;";
            
            const previewTitle = document.createElement("div");
            previewTitle.style.cssText = "font-size:11.5px; font-weight:700; color:#f4f4f5; display:flex; align-items:center; gap:6px;";
            previewTitle.innerHTML = `<span>📋 최종 프롬프트 미리보기</span>`;

            const btnCopyFullPrompt = document.createElement("button");
            btnCopyFullPrompt.className = "vg-btn";
            btnCopyFullPrompt.type = "button";
            btnCopyFullPrompt.style.cssText = "padding:4px 10px; font-size:11px; font-weight:700; background:#4f46e5; border-color:#6366f1; color:#fff; display:flex; align-items:center; gap:4px; box-shadow:0 0 8px rgba(99,102,241,0.3);";
            btnCopyFullPrompt.innerHTML = `<span>📋 복사 (Copy)</span>`;

            btnCopyFullPrompt.addEventListener("click", (e) => {
                e.stopPropagation();
                const textToCopy = fullPromptTextarea.value;
                if (!textToCopy) return;

                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(textToCopy);
                } else {
                    fullPromptTextarea.select();
                    document.execCommand("copy");
                }

                btnCopyFullPrompt.innerHTML = `<span>✅ 복사 완료!</span>`;
                btnCopyFullPrompt.style.background = "#10b981";
                btnCopyFullPrompt.style.borderColor = "#34d399";
                setTimeout(() => {
                    btnCopyFullPrompt.innerHTML = `<span>📋 복사 (Copy)</span>`;
                    btnCopyFullPrompt.style.background = "#4f46e5";
                    btnCopyFullPrompt.style.borderColor = "#6366f1";
                }, 1500);
            });

            previewHeader.appendChild(previewTitle);
            previewHeader.appendChild(btnCopyFullPrompt);

            const fullPromptTextarea = document.createElement("textarea");
            fullPromptTextarea.className = "vg-textarea";
            fullPromptTextarea.rows = 4;
            fullPromptTextarea.style.cssText = "min-height:85px; resize:vertical; font-family:Consolas, Monaco, monospace; font-size:11px; line-height:1.45; background:#0c0c10; border-color:#27272a; color:#e4e4e7; width:100%; box-sizing:border-box;";
            fullPromptTextarea.placeholder = "생성된 최종 프롬프트가 실시간으로 여기에 표시됩니다...";
            
            fullPromptTextarea.addEventListener("input", () => {
                const wPrompt = node.widgets?.find(w => w.name === "prompt_text");
                if (wPrompt) wPrompt.value = fullPromptTextarea.value;
            });

            promptPreviewCard.appendChild(previewHeader);
            promptPreviewCard.appendChild(fullPromptTextarea);
            container.appendChild(promptPreviewCard);

            function generateFullPromptString() {
                const parts = [];
                if (prefixVal && prefixVal.trim()) {
                    parts.push(prefixVal.trim());
                }

                let charProfileClean = (characterProfile || "").trim();
                if (!charProfileClean && characterProfileKo) {
                    charProfileClean = translateToEnglish(characterProfileKo);
                } else if (/[가-힣]/.test(charProfileClean)) {
                    charProfileClean = translateToEnglish(charProfileClean);
                }

                function getCleanAreaPrompt(a) {
                    let p = (a.prompt || "").trim();
                    if (!p || /[가-힣]/.test(p)) {
                        p = translateToEnglish(a.ko_prompt || a.koPrompt || p);
                    }
                    return p.trim();
                }

                if (currentFormat === "ComfyUI / SD Regional Prompt (BREAK Syntax)") {
                    const breakParts = [];
                    if (charProfileClean) {
                        breakParts.push(`(${charProfileClean}:1.15)`);
                    }
                    areas.forEach(a => {
                        const p = getCleanAreaPrompt(a);
                        if (p) {
                            breakParts.push(`(${p}:1.1)`);
                        }
                    });
                    if (breakParts.length > 0) {
                        parts.push(breakParts.join(" BREAK\n"));
                    }
                } else if (currentFormat === "Structured Tags ([Area 1 | LEFT])") {
                    const lines = [`[Composition: ${currentRatio} Grid Layout (${cols}x${rows})]`];
                    if (charProfileClean) {
                        lines.push(`[Character Profile]: ${charProfileClean}`);
                    }
                    areas.forEach(a => {
                        const p = getCleanAreaPrompt(a);
                        const spatial = getNaturalSpatialName(a.c1, a.c2, a.r1, a.r2, cols, rows);
                        lines.push(`[Area ${a.id} | ${spatial.toUpperCase()}]: ${p}`);
                    });
                    parts.push(lines.join("\n"));
                } else if (currentFormat === "Coordinates Bounding Box (<area_1 bbox=...>)") {
                    const lines = [`[Canvas Layout: ${currentRatio} | Grid ${cols}x${rows}]`];
                    if (charProfileClean) {
                        lines.push(`<character_profile>${charProfileClean}</character_profile>`);
                    }
                    areas.forEach(a => {
                        const xmin = (a.c1 / cols).toFixed(2);
                        const ymin = (a.r1 / rows).toFixed(2);
                        const xmax = ((a.c2 + 1) / cols).toFixed(2);
                        const ymax = ((a.r2 + 1) / rows).toFixed(2);
                        const p = getCleanAreaPrompt(a);
                        lines.push(`<area_${a.id} bbox="[${xmin}, ${ymin}, ${xmax}, ${ymax}]"> ${p} </area_${a.id}>`);
                    });
                    parts.push(lines.join("\n"));
                } else if (currentFormat === "Comma-Separated List") {
                    const tags = [];
                    if (charProfileClean) tags.push(charProfileClean);
                    areas.forEach(a => {
                        const p = getCleanAreaPrompt(a);
                        if (p) tags.push(p);
                    });
                    if (tags.length > 0) parts.push(tags.join(", "));
                } else if (currentFormat === "Raw JSON") {
                    const jsonObj = {
                        cols, rows, aspect_ratio: currentRatio,
                        white_bg: whiteBg, grid_borders: gridBorders,
                        character_profile: charProfileClean,
                        areas: areas.map(a => ({
                            id: a.id, c1: a.c1, c2: a.c2, r1: a.r1, r2: a.r2,
                            ko_prompt: a.ko_prompt, prompt: getCleanAreaPrompt(a)
                        }))
                    };
                    parts.push(JSON.stringify(jsonObj, null, 2));
                } else {
                    // Natural Spatial (Krea/MiniMax/Gemini/GPT)
                    const lines = [];
                    lines.push(`A high-definition ${currentRatio} multi-panel composition strictly partitioned into ${areas.length} proportional sections.`);
                    if (charProfileClean) {
                        lines.push(`[Subject / Character Profile & Visual Consistency]: ${charProfileClean}, identical character features and costume maintained across all panels.`);
                    }
                    lines.push(`[Spatial Layout & Exact Proportional Placement]:`);
                    areas.forEach(a => {
                        const spatial = getNaturalSpatialName(a.c1, a.c2, a.r1, a.r2, cols, rows);
                        const p = getCleanAreaPrompt(a);
                        lines.push(`- ${spatial}: ${p}.`);
                    });
                    if (gridBorders) {
                        lines.push(`[Multi-Panel Layout & Strict Proportional Scale]: Split-screen multi-panel collage layout strictly adhering to the exact percentage width and height boundaries specified above for each column and row without shifting, resizing, or distorting relative panel scales. Each panel is cleanly separated by crisp thin black divider lines, clean comic grid panels, pristine artwork without any text, labels, numbers, coordinates, or watermarks.`);
                    } else {
                        lines.push(`[Multi-Panel Layout & Strict Proportional Scale]: Split-screen multi-panel collage layout seamlessly blending adjoining sections according to the exact spatial proportions specified above without watermarks or text.`);
                    }
                    parts.push(lines.join("\n"));
                }

                if (suffixVal && suffixVal.trim()) {
                    parts.push(suffixVal.trim());
                }

                return parts.join("\n\n");
            }

            // =========================================================================
            // Core Application Logic & Helpers
            // =========================================================================
            function getSelectedArea() {
                return areas.find(a => a.id === selectedAreaId) || null;
            }

            function selectArea(id) {
                selectedAreaId = id;
                const area = getSelectedArea();
                if (area) {
                    const areaIndex = areas.findIndex(a => a.id === area.id);
                    const palette = COLOR_PALETTE[areaIndex >= 0 ? areaIndex % COLOR_PALETTE.length : 0];

                    // Dynamic Color Theme Synchronization with Selected Area
                    editorCard.style.borderColor = palette.border;
                    editorCard.style.boxShadow = `0 0 16px ${palette.glow}, inset 0 0 10px ${palette.bg}`;
                    editorCard.style.transition = "border-color 0.2s ease, box-shadow 0.2s ease";

                    activeAreaTitle.innerHTML = `<span style="display:inline-flex; align-items:center; gap:6px; flex-wrap:wrap;">
                        <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:${palette.border}; box-shadow:0 0 8px ${palette.border}; flex-shrink:0;"></span>
                        <span style="color:${palette.border}; font-weight:800;">영역 [${area.id}] 프롬프트 설정</span>
                        <span style="font-size:10px; background:${palette.border}; color:#000; padding:1px 6px; border-radius:8px; font-weight:800; box-shadow:0 0 6px ${palette.glow};">선택됨 (ACTIVE)</span>
                        <span style="font-size:10px; color:#a1a1aa; font-weight:500;">(${getNaturalSpatialName(area.c1, area.c2, area.r1, area.r2, cols, rows)})</span>
                    </span>`;

                    treeBtn.style.borderColor = palette.border;
                    treeBtn.style.boxShadow = `0 0 8px ${palette.glow}`;

                    btnApplyPrompt.style.background = palette.border;
                    btnApplyPrompt.style.borderColor = palette.border;
                    btnApplyPrompt.style.boxShadow = `0 0 10px ${palette.glow}`;
                    btnApplyPrompt.style.color = "#000";

                    areaKoInput.placeholder = `👉 [영역 ${area.id}] 한글 프롬프트 (프리셋 선택 시 1:1 교체)`;
                    areaKoInput.style.borderColor = palette.border;
                    areaKoInput.value = area.ko_prompt || "";

                    areaEnInput.placeholder = `👉 [Area ${area.id}] AI 영문 프롬프트 (자동 번역 또는 직접 수정)`;
                    areaEnInput.style.borderColor = palette.border;
                    areaEnInput.value = area.prompt || "";
                } else {
                    editorCard.style.borderColor = "#27272a";
                    editorCard.style.boxShadow = "none";
                    activeAreaTitle.innerHTML = `<span style="color:#71717a;">📍 편집할 영역을 선택하세요 (또는 캔버스에서 드래그)</span>`;
                    treeBtn.style.borderColor = "#4f46e5";
                    treeBtn.style.boxShadow = "none";
                    btnApplyPrompt.style.background = "#4f46e5";
                    btnApplyPrompt.style.borderColor = "#6366f1";
                    btnApplyPrompt.style.boxShadow = "none";
                    btnApplyPrompt.style.color = "#fff";
                    areaKoInput.placeholder = "🇰🇷 한글 프롬프트 (프리셋 선택 시 1:1 교체)";
                    areaKoInput.style.borderColor = "#3f3f46";
                    areaKoInput.value = "";
                    areaEnInput.placeholder = "🇺🇸 영문 프롬프트 (AI 최종 전달용 / 직접 수정 가능)";
                    areaEnInput.style.borderColor = "#3f3f46";
                    areaEnInput.value = "";
                }
                renderGrid();
            }

            async function applyPresetToActiveArea({ ko, en }) {
                const area = getSelectedArea();
                if (!area) return;
                // 1:1 구도 교체 (Replace)
                area.ko_prompt = ko || "";
                if (en) {
                    area.prompt = en;
                } else {
                    area.prompt = await translateToEnglishAsync(ko);
                }
                areaKoInput.value = area.ko_prompt;
                areaEnInput.value = area.prompt;
                renderGrid();
                syncToWidgets();
            }

            function deleteArea(id) {
                areas = areas.filter(a => a.id !== id);
                areas.forEach((a, idx) => a.id = idx + 1);
                if (selectedAreaId === id) {
                    selectedAreaId = areas.length > 0 ? areas[0].id : null;
                }
                selectArea(selectedAreaId);
                renderGrid();
                syncToWidgets();
            }

            function updateHeightOnDrawerToggle() {
                if (!node || !node.size) return;
                const isTreeOpen = treeDrawer && !treeDrawer.classList.contains("collapsed");
                const isCustomOpen = customDrawer && !customDrawer.classList.contains("collapsed");
                let targetH = 880;
                if (isTreeOpen) targetH += 220;
                if (isCustomOpen) targetH += 140;
                if (node.size[1] < targetH) {
                    node.size[1] = targetH;
                    if (app && app.canvas) app.canvas.setDirty(true, true);
                }
            }

            let stageMaxHeight = 320;

            function updateCanvasDimensions() {
                const ratioParts = currentRatio.split(":");
                const w = parseFloat(ratioParts[0]) || 16;
                const h = parseFloat(ratioParts[1]) || 9;
                const ratio = w / h;

                const stageWidth = (canvasStage && canvasStage.clientWidth) ? (canvasStage.clientWidth - 16) : ((container && container.clientWidth) ? container.clientWidth - 28 : 460);
                const stageHeight = (canvasStage && canvasStage.clientHeight) ? (canvasStage.clientHeight - 16) : stageMaxHeight;

                let canvasW = stageWidth;
                let canvasH = stageWidth / ratio;

                if (canvasH > stageHeight) {
                    canvasH = stageHeight;
                    canvasW = canvasH * ratio;
                }

                if (canvasW > stageWidth) {
                    canvasW = stageWidth;
                    canvasH = canvasW / ratio;
                }

                if (canvasW < 80) {
                    canvasW = 80;
                    canvasH = canvasW / ratio;
                }

                canvasWrapper.style.width = `${Math.round(canvasW)}px`;
                canvasWrapper.style.height = `${Math.round(canvasH)}px`;
                canvasWrapper.style.aspectRatio = `${w} / ${h}`;

                renderGrid();
            }

            function updateAllUILanguage() {
                const isEn = currentLang === "English";
                if (artBarLabel) artBarLabel.textContent = isEn ? "🎨 Style:" : "🎨 화풍:";
                if (artBtnGroup) {
                    artBtnGroup.querySelectorAll(".vg-btn").forEach(btn => {
                        const sid = btn.dataset.styleId;
                        const st = ART_STYLES.find(s => s.id === sid);
                        if (st) {
                            btn.textContent = `${st.icon} ${st.id === "none" ? (isEn ? "None" : "없음") : (st.name.split(' ')[1] || st.name)}`;
                        }
                    });
                }
                if (whiteBgSpan) whiteBgSpan.textContent = isEn ? " White BG" : " 백색 배경";
                if (gridBorderSpan) gridBorderSpan.textContent = isEn ? " Grid Borders" : " 격자 실선";
                if (mockupSpan) mockupSpan.textContent = isEn ? " Silhouette" : " 실루엣";
                if (charTitle) charTitle.innerHTML = isEn ? `<span>👤 Character Profile</span>` : `<span>👤 인물 공통 외모</span>`;
                if (btnOpenCharManager) btnOpenCharManager.textContent = isEn ? "⚙️ Preset Settings" : "인물 공통 프리셋 설정";
                if (typeof renderCharPresetsDropdown === "function") renderCharPresetsDropdown();
                if (btnQuickSave) btnQuickSave.innerHTML = `<span>${isEn ? "⭐ Save" : "⭐ 저장"}</span>`;
                if (btnClearChar) btnClearChar.textContent = isEn ? "Clear" : "비우기";
                if (charKoInput) charKoInput.placeholder = isEn ? "KR: Korean character profile (Auto-translated to English)" : "KR: 한글 인물 공통 외모 (예: 한국인, 40대, 여성, 갈색 파마머리, 뿔테 안경...)";
                if (charEnInput) charEnInput.placeholder = isEn ? "US: English character profile (Sent to AI)" : "US: 영문 인물 공통 외모 (AI 최종 전달용 / 한글 입력 시 실시간 자동 번역)";
                if (stageResizeHandle) stageResizeHandle.title = isEn ? "Drag to resize canvas area" : "드래그하여 격자 캔버스 영역 크기 조절";
                if (guideEl) guideEl.textContent = isEn ? "🖱️ Drag: Create Area | ✏️ Click: Edit | ❌ Right-click or [×]: Delete" : "🖱️ 드래그: 영역 생성 | ✏️ 클릭: 구도 편집 | ❌ [×]버튼 또는 우클릭: 삭제";
                if (treeBtn) treeBtn.querySelector("span:first-child").textContent = isEn ? "📂 10 Category Shot & Angle Explorer" : "📂 10대 캐릭터 시트 구도 탐색기";
                if (btnSaveCurrent) btnSaveCurrent.textContent = isEn ? "💾 Save Current Preset" : "💾 현재 구도를 새 프리셋으로 등록";
                if (btnToggleDrawer) btnToggleDrawer.textContent = isEn ? "⚙️ Manage" : "⚙️ 관리";
                if (btnApplyPrompt) btnApplyPrompt.innerHTML = `<span>${isEn ? "Apply (Ctrl+Enter)" : "적용 (Ctrl+Enter)"}</span>`;
                if (previewTitle) previewTitle.innerHTML = isEn ? `<span>📋 Final Output Prompt Preview</span>` : `<span>📋 최종 프롬프트 미리보기</span>`;
                if (btnCopyFullPrompt) btnCopyFullPrompt.innerHTML = isEn ? `<span>📋 Copy</span>` : `<span>📋 복사 (Copy)</span>`;
                if (btnClear) btnClear.textContent = isEn ? "🗑️ Reset" : "🗑️ 초기화";
                if (activeAreaTitle && !selectedAreaId) {
                    activeAreaTitle.textContent = isEn ? "📍 Select an area to edit" : "📍 편집할 영역을 선택하세요";
                }
            }

            function renderGrid() {
                gridCellsContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
                gridCellsContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
                gridCellsContainer.innerHTML = "";
                for (let r = 0; r < rows; r++) {
                    for (let c = 0; c < cols; c++) {
                        const cell = document.createElement("div");
                        cell.className = "vg-cell";
                        gridCellsContainer.appendChild(cell);
                    }
                }

                areasLayer.innerHTML = "";
                areas.forEach((area, idx) => {
                    const palette = COLOR_PALETTE[idx % COLOR_PALETTE.length];
                    const isSelected = area.id === selectedAreaId;
                    
                    const leftPct = (area.c1 / cols) * 100;
                    const topPct = (area.r1 / rows) * 100;
                    const widthPct = ((area.c2 - area.c1 + 1) / cols) * 100;
                    const heightPct = ((area.r2 - area.r1 + 1) / rows) * 100;

                    const box = document.createElement("div");
                    box.className = `vg-area-box ${isSelected ? "selected" : ""}`;
                    box.style.left = `${leftPct}%`;
                    box.style.top = `${topPct}%`;
                    box.style.width = `${widthPct}%`;
                    box.style.height = `${heightPct}%`;
                    box.style.borderColor = palette.border;
                    box.style.backgroundColor = palette.bg;
                    box.style.color = palette.border;
                    box.style.setProperty("--area-glow", palette.glow);

                    // Header badge & close button
                    const header = document.createElement("div");
                    header.className = "vg-area-header";

                    const badge = document.createElement("div");
                    badge.className = "vg-area-badge";
                    badge.textContent = `[${area.id}]`;

                    const closeBtn = document.createElement("button");
                    closeBtn.className = "vg-area-close";
                    closeBtn.type = "button";
                    closeBtn.innerHTML = "×";
                    closeBtn.title = "영역 삭제 (클릭 또는 우클릭)";
                    closeBtn.addEventListener("click", (e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        deleteArea(area.id);
                    });
                    closeBtn.addEventListener("mousedown", (e) => {
                        e.stopPropagation();
                        e.preventDefault();
                    });

                    header.appendChild(badge);
                    header.appendChild(closeBtn);
                    box.appendChild(header);

                    // Mockup SVG
                    if (mockupEnabled) {
                        const svgWrap = document.createElement("div");
                        svgWrap.innerHTML = getMockupSvg(`${area.ko_prompt || ""} ${area.prompt || ""}`);
                        box.appendChild(svgWrap);
                    }

                    // Prompt label
                    const label = document.createElement("div");
                    label.className = "vg-area-prompt";
                    label.textContent = area.ko_prompt || area.prompt || "✏️ 작성";
                    box.appendChild(label);

                    // Events
                    box.addEventListener("mousedown", (e) => {
                        if (e.button === 0) {
                            e.stopPropagation();
                            selectArea(area.id);
                        } else if (e.button === 2) {
                            e.preventDefault();
                            e.stopPropagation();
                        }
                    });

                    box.addEventListener("mouseup", (e) => {
                        if (e.button === 2) {
                            e.preventDefault();
                            e.stopPropagation();
                        }
                    });

                    box.addEventListener("contextmenu", (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        deleteArea(area.id);
                    });

                    areasLayer.appendChild(box);
                });
            }

            // Suppress browser context menu on canvas
            canvasWrapper.addEventListener("contextmenu", (e) => {
                e.preventDefault();
                e.stopPropagation();
            });

            // Mouse Drag Area Creation
            canvasWrapper.addEventListener("mousedown", (e) => {
                if (e.button !== 0) return;
                const rect = canvasWrapper.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const cellW = rect.width / cols;
                const cellH = rect.height / rows;

                const c = Math.min(cols - 1, Math.max(0, Math.floor(x / cellW)));
                const r = Math.min(rows - 1, Math.max(0, Math.floor(y / cellH)));

                isDragging = true;
                dragStart = { c, r };
                dragCurrent = { c, r };
                updateSelectionBox(rect, cellW, cellH);
            });

            window.addEventListener("mousemove", (e) => {
                if (!isDragging || !dragStart) return;
                const rect = canvasWrapper.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const cellW = rect.width / cols;
                const cellH = rect.height / rows;

                const c = Math.min(cols - 1, Math.max(0, Math.floor(x / cellW)));
                const r = Math.min(rows - 1, Math.max(0, Math.floor(y / cellH)));
                dragCurrent = { c, r };
                updateSelectionBox(rect, cellW, cellH);
            });

            window.addEventListener("mouseup", () => {
                if (!isDragging || !dragStart || !dragCurrent) return;
                isDragging = false;
                selectionBox.style.display = "none";

                const c1 = Math.min(dragStart.c, dragCurrent.c);
                const c2 = Math.max(dragStart.c, dragCurrent.c);
                const r1 = Math.min(dragStart.r, dragCurrent.r);
                const r2 = Math.max(dragStart.r, dragCurrent.r);

                const newArea = {
                    id: areas.length + 1,
                    c1, c2, r1, r2,
                    ko_prompt: "",
                    prompt: ""
                };
                areas.push(newArea);
                selectArea(newArea.id);
                syncToWidgets();
                dragStart = null;
                dragCurrent = null;
            });

            function updateSelectionBox(rect, cellW, cellH) {
                const c1 = Math.min(dragStart.c, dragCurrent.c);
                const c2 = Math.max(dragStart.c, dragCurrent.c);
                const r1 = Math.min(dragStart.r, dragCurrent.r);
                const r2 = Math.max(dragStart.r, dragCurrent.r);

                selectionBox.style.display = "block";
                selectionBox.style.left = `${(c1 / cols) * 100}%`;
                selectionBox.style.top = `${(r1 / rows) * 100}%`;
                selectionBox.style.width = `${((c2 - c1 + 1) / cols) * 100}%`;
                selectionBox.style.height = `${((r2 - r1 + 1) / rows) * 100}%`;
            }

            // =========================================================================
            // Sync with ComfyUI Backend Widgets
            // =========================================================================
            function syncToWidgets() {
                const gridDataObj = {
                    cols,
                    rows,
                    aspect_ratio: currentRatio,
                    aspectRatio: currentRatio,
                    white_bg: whiteBg,
                    whiteBg,
                    grid_borders: gridBorders,
                    gridBorders,
                    active_art_style: activeArtStyle,
                    character_profile: characterProfile,
                    character_profile_ko: characterProfileKo,
                    characterProfile,
                    characterProfileKo,
                    areas: areas.map(a => ({
                        id: a.id,
                        c1: a.c1, c2: a.c2, r1: a.r1, r2: a.r2,
                        ko_prompt: a.ko_prompt,
                        koPrompt: a.ko_prompt,
                        prompt: a.prompt,
                        spatial: getNaturalSpatialName(a.c1, a.c2, a.r1, a.r2, cols, rows)
                    }))
                };

                const gridDataStr = JSON.stringify(gridDataObj);

                const wGrid = node.widgets?.find(w => w.name === "grid_data");
                if (wGrid) wGrid.value = gridDataStr;

                const wFormat = node.widgets?.find(w => w.name === "format");
                if (wFormat) wFormat.value = currentFormat;

                const wRatio = node.widgets?.find(w => w.name === "aspect_ratio");
                if (wRatio) wRatio.value = currentRatio;

                const wCols = node.widgets?.find(w => w.name === "grid_cols");
                if (wCols) wCols.value = cols;

                const wRows = node.widgets?.find(w => w.name === "grid_rows");
                if (wRows) wRows.value = rows;

                const wPrefix = node.widgets?.find(w => w.name === "prefix_prompt");
                if (wPrefix) wPrefix.value = prefixVal;

                const wSuffix = node.widgets?.find(w => w.name === "suffix_prompt");
                if (wSuffix) wSuffix.value = suffixVal;

                const wLang = node.widgets?.find(w => w.name === "ui_language");
                if (wLang) wLang.value = currentLang;

                const finalPromptStr = generateFullPromptString();
                if (fullPromptTextarea) {
                    fullPromptTextarea.value = finalPromptStr;
                }

                const wPrompt = node.widgets?.find(w => w.name === "prompt_text");
                if (wPrompt) wPrompt.value = finalPromptStr;
            }

            // Workflow Restore / onConfigure
            const onConfigure = node.onConfigure;
            node.onConfigure = function (info) {
                if (onConfigure) onConfigure.apply(this, arguments);
                const gridDataW = this.widgets?.find(w => w.name === "grid_data");
                if (gridDataW && gridDataW.value && gridDataW.value !== "{}") {
                    try {
                        const parsed = typeof gridDataW.value === "string" ? JSON.parse(gridDataW.value) : gridDataW.value;
                        if (parsed.cols) cols = parsed.cols;
                        if (parsed.rows) rows = parsed.rows;
                        if (parsed.aspect_ratio || parsed.aspectRatio) currentRatio = parsed.aspect_ratio || parsed.aspectRatio;
                        if (parsed.white_bg !== undefined || parsed.whiteBg !== undefined) whiteBg = !!(parsed.white_bg ?? parsed.whiteBg);
                        if (parsed.grid_borders !== undefined || parsed.gridBorders !== undefined) gridBorders = !!(parsed.grid_borders ?? parsed.gridBorders);
                        if (parsed.character_profile_ko || parsed.characterProfileKo) characterProfileKo = parsed.character_profile_ko || parsed.characterProfileKo;
                        if (parsed.character_profile || parsed.characterProfile) characterProfile = parsed.character_profile || parsed.characterProfile;
                        if (parsed.areas) areas = parsed.areas;
                        if (parsed.ui_language || parsed.uiLanguage) {
                            currentLang = parsed.ui_language || parsed.uiLanguage;
                            if (langSelect) langSelect.value = currentLang;
                        }
                        if (parsed.stage_height || parsed.stageHeight) {
                            stageMaxHeight = parsed.stage_height || parsed.stageHeight;
                            if (canvasStage) canvasStage.style.height = `${stageMaxHeight}px`;
                        }
                        
                        colsInput.value = cols;
                        rowsInput.value = rows;
                        ratioSelect.value = currentRatio;
                        whiteBgCheck.checked = whiteBg;
                        gridBorderCheck.checked = gridBorders;
                        if (charKoInput) charKoInput.value = characterProfileKo || characterProfile;
                        if (charEnInput) charEnInput.value = characterProfile;
                    } catch (e) {}
                }
                const prefixW = this.widgets?.find(w => w.name === "prefix_prompt");
                if (prefixW && prefixW.value) { prefixVal = prefixW.value; prefixInput.value = prefixVal; }

                const suffixW = this.widgets?.find(w => w.name === "suffix_prompt");
                if (suffixW && suffixW.value) { suffixVal = suffixW.value; suffixInput.value = suffixVal; }

                const formatW = this.widgets?.find(w => w.name === "format");
                if (formatW && formatW.value) { currentFormat = formatW.value; formatSelect.value = currentFormat; }

                const langW = this.widgets?.find(w => w.name === "ui_language");
                if (langW && langW.value) {
                    currentLang = langW.value;
                    if (langSelect) langSelect.value = currentLang;
                }

                updateAllUILanguage();
                updateCanvasDimensions();
                renderGrid();
                syncToWidgets();
                setTimeout(updateHeightOnDrawerToggle, 50);
                hideAllBackendWidgets(this);
                enforceSingleOutput(this);
            };

            const onDrawForeground = node.onDrawForeground;
            node.onDrawForeground = function (ctx) {
                hideAllBackendWidgets(this);
                enforceSingleOutput(this);
                if (onDrawForeground) onDrawForeground.apply(this, arguments);
            };

            // Add DOM Widget
            const domWidget = node.addDOMWidget("visual_grid_ui", "custom", container, {
                serialize: false,
                hideOnZoom: false,
                getValue() {
                    return JSON.stringify({ cols, rows, aspect_ratio: currentRatio, white_bg: whiteBg, grid_borders: gridBorders, character_profile: characterProfile, character_profile_ko: characterProfileKo, areas, prefix: prefixVal, suffix: suffixVal, format: currentFormat, ui_language: currentLang, stage_height: stageMaxHeight });
                },
                setValue(v) {
                    if (v) {
                        try {
                            const parsed = typeof v === "string" ? JSON.parse(v) : v;
                            if (parsed.cols) cols = parsed.cols;
                            if (parsed.rows) rows = parsed.rows;
                            if (parsed.aspect_ratio) currentRatio = parsed.aspect_ratio;
                            if (parsed.white_bg !== undefined) whiteBg = !!parsed.white_bg;
                            if (parsed.grid_borders !== undefined) gridBorders = !!parsed.grid_borders;
                            if (parsed.character_profile_ko !== undefined) characterProfileKo = parsed.character_profile_ko;
                            if (parsed.character_profile !== undefined) characterProfile = parsed.character_profile;
                            if (parsed.areas) areas = parsed.areas;
                            if (parsed.prefix !== undefined) { prefixVal = parsed.prefix; prefixInput.value = prefixVal; }
                            if (parsed.suffix !== undefined) { suffixVal = parsed.suffix; suffixInput.value = suffixVal; }
                            if (parsed.format !== undefined) { currentFormat = parsed.format; formatSelect.value = currentFormat; }
                            if (parsed.ui_language !== undefined) {
                                currentLang = parsed.ui_language;
                                if (langSelect) langSelect.value = currentLang;
                            }
                            if (parsed.stage_height !== undefined) {
                                stageMaxHeight = parsed.stage_height;
                                if (canvasStage) canvasStage.style.height = `${stageMaxHeight}px`;
                            }
                            colsInput.value = cols;
                            rowsInput.value = rows;
                            ratioSelect.value = currentRatio;
                            whiteBgCheck.checked = whiteBg;
                            gridBorderCheck.checked = gridBorders;
                            if (charKoInput) charKoInput.value = characterProfileKo || characterProfile;
                            if (charEnInput) charEnInput.value = characterProfile;
                            updateAllUILanguage();
                            updateCanvasDimensions();
                            renderGrid();
                        } catch (e) {}
                    }
                }
            });

            // Initial Sizing & Setup
            updateCanvasDimensions();
            renderGrid();
            syncToWidgets();
            node.setSize([510, 880]);

            // LiteGraph Manual Resize Hook (Allows freely shrinking/expanding width & expanding height)
            const origOnResize = node.onResize;
            node.onResize = function (size) {
                if (origOnResize) origOnResize.apply(this, arguments);
                if (size[0] < 360) size[0] = 360;
                if (size[1] < 450) size[1] = 450;
                updateCanvasDimensions();
            };
        };
    }
});
