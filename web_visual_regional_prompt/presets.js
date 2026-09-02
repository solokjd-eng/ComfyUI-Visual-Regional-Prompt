/**
 * 원본 ComfyUI 노드 100% 동일 샷/구도 프리셋 및 레이아웃 템플릿, 화풍 스타일 프리셋
 */

// 🎨 화풍 & 아트 스타일 프리셋 (실사, 반실사, 2D애니, 설정화, 3D)
export const ART_STYLES = [
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
  }
];

// 엑셀 표 기반 체계적 샷/구도 프리셋 그룹 (한국어 + 영어)
export const PRESET_GROUPS = [
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

export const LAYOUT_TEMPLATES = [
  {
    id: "char_sheet_3",
    name: "👑 캐릭터 시트 (3분할 앙상블)",
    aspectRatio: "16:9",
    cols: 6,
    rows: 3,
    whiteBg: true,
    gridBorders: true,
    characterSheetStyle: true,
    prefixPrompt: "masterpiece, best quality, ultra detailed, 1girl, silver hair, glowing blue eyes, elegant design",
    suffixPrompt: "sharp focus, photorealistic 8k, uniform lighting",
    areas: [
      {
        id: 1,
        c1: 0, c2: 2, r1: 0, r2: 2,
        koPrompt: "전신 45도 측면, 완벽한 포즈와 의상 디테일",
        prompt: "full body, three-quarter view, 45-degree angle, complete outfit details"
      },
      {
        id: 2,
        c1: 3, c2: 5, r1: 0, r2: 0,
        koPrompt: "얼굴 초근접 정면, 아름다운 미소",
        prompt: "extreme close-up face, front view, macro detail, gentle warm smile"
      },
      {
        id: 3,
        c1: 3, c2: 5, r1: 1, r2: 2,
        koPrompt: "상반신 가슴 45도 측면, 의상 상체 디테일",
        prompt: "bust shot, upper body, three-quarter view, 45-degree angle"
      }
    ]
  },
  {
    id: "char_sheet_4",
    name: "📐 4컷 멀티 앵글 시트 (4-Panel Grid)",
    aspectRatio: "1:1",
    cols: 4,
    rows: 4,
    whiteBg: true,
    gridBorders: true,
    characterSheetStyle: true,
    prefixPrompt: "masterpiece, best quality, concept art character sheet, 1boy, handsome anime style",
    suffixPrompt: "clean lines, uniform studio lighting, high resolution",
    areas: [
      {
        id: 1,
        c1: 0, c2: 1, r1: 0, r2: 1,
        koPrompt: "얼굴 정면",
        prompt: "face, front view, detailed facial features"
      },
      {
        id: 2,
        c1: 2, c2: 3, r1: 0, r2: 1,
        koPrompt: "얼굴 측면",
        prompt: "face, side profile view"
      },
      {
        id: 3,
        c1: 0, c2: 1, r1: 2, r2: 3,
        koPrompt: "상반신 허리 정면",
        prompt: "waist shot, waist up, front view"
      },
      {
        id: 4,
        c1: 2, c2: 3, r1: 2, r2: 3,
        koPrompt: "전신 후면",
        prompt: "full body, back view, from behind"
      }
    ]
  },
  {
    id: "comic_strip",
    name: "💬 만화 컷 분할 (Comic Story Layout)",
    aspectRatio: "16:9",
    cols: 6,
    rows: 2,
    whiteBg: false,
    gridBorders: true,
    characterSheetStyle: false,
    prefixPrompt: "manga style, dynamic anime illustration, vivid cinematic colors",
    suffixPrompt: "high contrast, dramatic lighting",
    areas: [
      {
        id: 1,
        c1: 0, c2: 1, r1: 0, r2: 1,
        koPrompt: "얼굴 초근접 정면",
        prompt: "extreme close-up face, front view, macro detail"
      },
      {
        id: 2,
        c1: 2, c2: 3, r1: 0, r2: 1,
        koPrompt: "소품 오브젝트 (검을 쥔 손)",
        prompt: "detailed prop, focused object, hands gripping sword"
      },
      {
        id: 3,
        c1: 4, c2: 5, r1: 0, r2: 1,
        koPrompt: "전신 정면",
        prompt: "full body, front view"
      }
    ]
  },
  {
    id: "duo_faceoff",
    name: "⚔️ 2인 대치 샷 (Side-by-Side Duel)",
    aspectRatio: "16:9",
    cols: 6,
    rows: 3,
    whiteBg: false,
    gridBorders: false,
    characterSheetStyle: false,
    prefixPrompt: "masterpiece, highly detailed, dramatic rivalry, epic fantasy scene",
    suffixPrompt: "cinematic lighting, particle effects, 8k wallpaper",
    areas: [
      {
        id: 1,
        c1: 0, c2: 2, r1: 0, r2: 2,
        koPrompt: "상반신 가슴 45도 측면, 푸른 불꽃의 마법사",
        prompt: "bust shot, upper body, three-quarter view, glowing blue mage"
      },
      {
        id: 2,
        c1: 3, c2: 5, r1: 0, r2: 2,
        koPrompt: "상반신 가슴 45도 측면, 붉은 화염의 검사",
        prompt: "bust shot, upper body, three-quarter view, fierce flame warrior"
      }
    ]
  },
  {
    id: "vertical_story",
    name: "📱 9:16 숏폼 세로 3단 스토리 (Vertical Story)",
    aspectRatio: "9:16",
    cols: 3,
    rows: 6,
    whiteBg: false,
    gridBorders: true,
    characterSheetStyle: false,
    prefixPrompt: "aesthetic webtoon art, vertical composition, vibrant colors",
    suffixPrompt: "clean lines, beautiful background",
    areas: [
      {
        id: 1,
        c1: 0, c2: 2, r1: 0, r2: 1,
        koPrompt: "자연 숲 배경, 푸른 하늘",
        prompt: "lush forest, trees, dappled sunlight, blue sky"
      },
      {
        id: 2,
        c1: 0, c2: 2, r1: 2, r2: 3,
        koPrompt: "얼굴 초근접 45도 측면",
        prompt: "extreme close-up face, three-quarter view, 45-degree angle"
      },
      {
        id: 3,
        c1: 0, c2: 2, r1: 4, r2: 5,
        koPrompt: "소품 오브젝트 (맞잡은 두 손)",
        prompt: "detailed prop, focused object, two hands holding gently"
      }
    ]
  }
];

export const COLOR_PALETTE = [
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
