/**
 * 한글 -> 영문 AI 프롬프트 사전 및 번역 모듈
 */

export const PROMPT_TRANSLATIONS = [
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

  // 2. 헤어 & 눈 & 캐릭터 외모
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
  [/코트|트렌치코트/gi, "trench coat"],
  [/패딩/gi, "puffer jacket"],
  [/가디건/gi, "cardigan"],
  [/니트|스웨터/gi, "knit sweater"],
  [/가죽\s*자켓/gi, "leather jacket"],
  [/안경/gi, "glasses, stylish spectacles"],
  [/선글라스/gi, "sunglasses"],
  [/마스크/gi, "face mask"],
  [/모자|캡/gi, "cap, stylish hat"],
  [/베레모/gi, "beret"],
  [/목걸이/gi, "necklace, fine jewelry"],
  [/귀걸이/gi, "earrings"],
  [/헤드폰|이어폰/gi, "headphones around neck"],
  [/검|칼/gi, "holding sword, katana"],
  [/총|권총/gi, "holding gun, pistol"],
  [/지팡이/gi, "magic staff"],
  [/스마트폰|핸드폰/gi, "holding smartphone"],
  [/책/gi, "holding book"],
  [/커피잔|음료/gi, "holding coffee cup"],

  // 5. 포즈 & 행동 & 표정
  [/웃는\s*얼굴|미소|웃음/gi, "smiling warmly, gentle smile"],
  [/활짝\s*웃는|환한\s*미소/gi, "bright radiant smile, open mouth laughing"],
  [/무표정|시크한/gi, "expressionless, cool stoic face"],
  [/윙크/gi, "winking, playful expression"],
  [/부끄러운|홍조|볼붉힘/gi, "blushing, shy embarrassed expression"],
  [/화난|분노|노려보는/gi, "angry glare, fierce expression"],
  [/슬픈|눈물/gi, "crying, tearful emotional face"],
  [/놀란/gi, "surprised, shocked wide eyes"],
  [/카리스마|진지한/gi, "intense serious charismatic gaze"],
  [/카메라를\s*바라보는|정면\s*응시/gi, "looking at viewer"],
  [/서있는|직립/gi, "standing pose"],
  [/앉아있는|앉은/gi, "sitting gracefully"],
  [/누워있는|누운/gi, "lying down pose"],
  [/걷는|걸어가는/gi, "walking dynamically"],
  [/달리는|뛰는/gi, "running dynamically"],
  [/점프|도약/gi, "jumping in mid-air"],
  [/손을\s*흔드는/gi, "waving hand cheerfully"],
  [/턱을\s*괴는/gi, "hand on chin, thoughtful pose"],
  [/손을\s*뻗는/gi, "reaching out toward camera"],
  [/다리를\s*꼬고\s*앉은/gi, "sitting with legs crossed"],
  [/주머니에\s*손을\s*넣은/gi, "hands in pockets"],
  [/전투\s*자세|액션\s*포즈/gi, "dynamic battle action pose"],

  // 6. 신체 부위
  [/손|손가락/gi, "detailed hands, perfect fingers"],
  [/다리|각선미/gi, "slender legs"],
  [/발/gi, "feet"],
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

/**
 * 사전 기반 빠른 오프라인 번역
 */
export function translateViaDictionary(text) {
  if (!text || typeof text !== 'string') return '';
  let res = text.trim();
  if (!res) return '';

  // 한글 포함 여부 확인
  if (!/[가-힣]/.test(res)) {
    return res;
  }

  for (const [pattern, eng] of PROMPT_TRANSLATIONS) {
    res = res.replace(pattern, eng);
  }

  // 조사 및 불필요 어미 정리
  res = res.replace(/(\s*이|가|을|를|의|에|에서|으로|로|과|와|하고|하며|있는|있음|한|된|인)\b/g, ' ');
  res = res.replace(/\s{2,}/g, ' ').trim();
  res = res.replace(/\s*,\s*/g, ', ');
  res = res.replace(/(,\s*){2,}/g, ', ');
  res = res.replace(/^,\s*|,\s*$/g, '');
  return res;
}

/**
 * Google Translate API를 활용한 실시간 번역 (실패 시 사전 번역 fallback)
 */
export async function translatePrompt(text) {
  if (!text || typeof text !== 'string') return '';
  const trimmed = text.trim();
  if (!trimmed) return '';

  // 영문만 있는 경우 그대로 반환
  if (!/[가-힣]/.test(trimmed)) {
    return trimmed;
  }

  // 1차: 사전으로 알려진 AI 표준 프롬프트 치환
  let dictTranslated = translateViaDictionary(trimmed);

  // 치환 후에도 한글이 남아있으면 Google Translate API 호출
  if (/[가-힣]/.test(dictTranslated)) {
    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=ko&tl=en&dt=t&q=${encodeURIComponent(dictTranslated)}`;
      const res = await fetch(url);
      if (res.ok) {
        const json = await res.json();
        if (json && json[0]) {
          const apiTranslated = json[0].map(item => item[0]).join('');
          return apiTranslated.trim();
        }
      }
    } catch (e) {
      console.warn('Google Translate API error, using dict fallback:', e);
    }
  }

  return dictTranslated;
}
