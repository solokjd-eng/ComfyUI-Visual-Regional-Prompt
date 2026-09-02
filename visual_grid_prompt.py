import json
import re

PROMPT_TRANSLATIONS = [
    # 1. 복합 샷 & 부위 & 각도 (가장 긴 복합 패턴 우선 매칭)
    (re.compile(r'(얼굴\s*)?클로즈업\s*(45도(\s*측면|\s*각도)?|반측면|쿼터뷰)', re.IGNORECASE), "close-up shot, detailed face, three-quarter view, 45-degree angle"),
    (re.compile(r'(얼굴\s*)?클로즈업\s*측면', re.IGNORECASE), "close-up shot, detailed face, side profile view"),
    (re.compile(r'(얼굴\s*)?클로즈업\s*정면', re.IGNORECASE), "close-up shot, detailed face, front view"),
    (re.compile(r'얼굴\s*클로즈업', re.IGNORECASE), "close-up shot, detailed face"),
    (re.compile(r'얼굴\s*정면|정면\s*얼굴', re.IGNORECASE), "detailed face, front view"),
    (re.compile(r'얼굴\s*측면|측면\s*얼굴', re.IGNORECASE), "detailed face, side profile view"),
    (re.compile(r'익스트림\s*클로즈업|초근접', re.IGNORECASE), "extreme close-up shot, macro detail"),
    (re.compile(r'클로즈업', re.IGNORECASE), "close-up shot"),

    (re.compile(r'전신\s*(45도(\s*측면|\s*각도)?|반측면|쿼터뷰)', re.IGNORECASE), "full body, three-quarter view, 45-degree angle"),
    (re.compile(r'전신\s*정면', re.IGNORECASE), "full body, front view"),
    (re.compile(r'전신\s*측면', re.IGNORECASE), "full body, side profile view"),
    (re.compile(r'전신\s*(후면|뒷모습)', re.IGNORECASE), "full body, back view"),
    (re.compile(r'전신', re.IGNORECASE), "full body"),

    (re.compile(r'상반신\s*(45도(\s*측면|\s*각도)?|반측면|쿼터뷰)', re.IGNORECASE), "upper body, three-quarter view, 45-degree angle"),
    (re.compile(r'상반신\s*정면', re.IGNORECASE), "upper body, front view"),
    (re.compile(r'상반신\s*측면', re.IGNORECASE), "upper body, side profile view"),
    (re.compile(r'상반신\s*(후면|뒷모습)', re.IGNORECASE), "upper body, back view"),
    (re.compile(r'상반신', re.IGNORECASE), "upper body, waist up"),

    (re.compile(r'하반신\s*(45도(\s*측면|\s*각도)?|반측면|쿼터뷰)', re.IGNORECASE), "lower body, legs, three-quarter view, 45-degree angle"),
    (re.compile(r'하반신\s*정면', re.IGNORECASE), "lower body, legs, front view"),
    (re.compile(r'하반신\s*측면', re.IGNORECASE), "lower body, legs, side profile view"),
    (re.compile(r'하반신\s*(후면|뒷모습)', re.IGNORECASE), "lower body, legs, back view"),
    (re.compile(r'하반신', re.IGNORECASE), "lower body, legs"),

    # 2. 헤어 & 눈 & 캐릭터 외모 (단일 음절 신체 부위보다 먼저 매칭)
    (re.compile(r'은발', re.IGNORECASE), "silver hair"),
    (re.compile(r'백발', re.IGNORECASE), "white hair"),
    (re.compile(r'금발', re.IGNORECASE), "blonde hair"),
    (re.compile(r'흑발|검은\s*머리', re.IGNORECASE), "black hair"),
    (re.compile(r'갈색\s*머리|갈발', re.IGNORECASE), "brown hair"),
    (re.compile(r'붉은\s*머리|적발', re.IGNORECASE), "red hair"),
    (re.compile(r'파란\s*머리|청발', re.IGNORECASE), "blue hair"),
    (re.compile(r'분홍\s*머리|핑크\s*(헤어|머리)', re.IGNORECASE), "pink hair"),
    (re.compile(r'보라색\s*머리', re.IGNORECASE), "purple hair"),
    (re.compile(r'녹색\s*머리|초록\s*머리', re.IGNORECASE), "green hair"),
    (re.compile(r'단발', re.IGNORECASE), "short bob hair"),
    (re.compile(r'장발|긴\s*머리', re.IGNORECASE), "long flowing hair"),
    (re.compile(r'숏컷', re.IGNORECASE), "pixie cut, short hair"),
    (re.compile(r'포니테일', re.IGNORECASE), "ponytail hair"),
    (re.compile(r'트윈테일|양갈래', re.IGNORECASE), "twintails hair"),
    (re.compile(r'땋은\s*머리', re.IGNORECASE), "braided hair"),
    (re.compile(r'웨이브\s*머리|곱슬머리', re.IGNORECASE), "wavy curly hair"),
    (re.compile(r'생머리', re.IGNORECASE), "straight hair"),
    (re.compile(r'푸른\s*눈|파란\s*눈', re.IGNORECASE), "blue eyes"),
    (re.compile(r'붉은\s*눈|빨간\s*눈', re.IGNORECASE), "red eyes"),
    (re.compile(r'녹색\s*눈|초록\s*눈', re.IGNORECASE), "green eyes"),
    (re.compile(r'보라색\s*눈', re.IGNORECASE), "purple eyes"),
    (re.compile(r'금안|노란\s*눈', re.IGNORECASE), "golden eyes"),
    (re.compile(r'오드아이', re.IGNORECASE), "heterochromia, odd eyes"),

    (re.compile(r'(\d+)\s*세', re.IGNORECASE), r'\1-year-old'),
    (re.compile(r'한국인|한국\s*(사람|여성|소녀|소년대)?', re.IGNORECASE), "korean"),
    (re.compile(r'여고생|고등학교\s*여학생', re.IGNORECASE), "high school girl, student"),
    (re.compile(r'남고생|고등학교\s*남학생', re.IGNORECASE), "high school boy, student"),
    (re.compile(r'여대생|대학생\s*여성', re.IGNORECASE), "college girl, university student"),
    (re.compile(r'어여쁜\s*소녀|예쁜\s*소녀|소녀|미소녀', re.IGNORECASE), "1girl, beautiful girl"),
    (re.compile(r'여자|여성|미녀', re.IGNORECASE), "1woman, beautiful woman"),
    (re.compile(r'소년|미소년', re.IGNORECASE), "1boy, handsome boy"),
    (re.compile(r'남자|남성|미남', re.IGNORECASE), "1man, handsome man"),
    (re.compile(r'어린이|아이', re.IGNORECASE), "child, cute kid"),
    (re.compile(r'여우귀', re.IGNORECASE), "fox ears, fennec ears"),
    (re.compile(r'고양이귀', re.IGNORECASE), "cat ears"),
    (re.compile(r'토끼귀', re.IGNORECASE), "rabbit ears"),
    (re.compile(r'엘프귀', re.IGNORECASE), "elf ears"),
    (re.compile(r'날개|천사\s*날개', re.IGNORECASE), "angel wings, feathered wings"),
    (re.compile(r'악마\s*날개', re.IGNORECASE), "demon wings, bat wings"),
    (re.compile(r'꼬리', re.IGNORECASE), "fluffy tail"),

    # 3. 앵글 & 시점 & 구도
    (re.compile(r'45도(\s*측면|\s*각도|\s*뷰)?|반측면|쿼터뷰', re.IGNORECASE), "three-quarter view, 45-degree angle"),
    (re.compile(r'90도(\s*측면|\s*각도|\s*프로필)?', re.IGNORECASE), "side profile view, 90-degree angle"),
    (re.compile(r'정면(\s*샷|\s*뷰)?', re.IGNORECASE), "front view"),
    (re.compile(r'측면(\s*샷|\s*뷰)?', re.IGNORECASE), "side profile view"),
    (re.compile(r'뒷모습|후면(\s*샷|\s*뷰)?', re.IGNORECASE), "back view, from behind"),
    (re.compile(r'뒤돌아보는', re.IGNORECASE), "looking back over shoulder"),
    (re.compile(r'오버더\s*숄더', re.IGNORECASE), "over-the-shoulder shot"),
    (re.compile(r'바스트샷|가슴위', re.IGNORECASE), "bust shot"),
    (re.compile(r'웨이스트샷|허리위', re.IGNORECASE), "waist shot"),
    (re.compile(r'카우보이샷|무릎위', re.IGNORECASE), "cowboy shot"),
    (re.compile(r'니샷', re.IGNORECASE), "knee shot"),
    (re.compile(r'와이드샷|원경|파노라마', re.IGNORECASE), "wide angle shot, panoramic view"),
    (re.compile(r'하이앵글|위에서|탑뷰|버드아이뷰', re.IGNORECASE), "high angle, top-down bird-eye view, from above"),
    (re.compile(r'로우앵글|아래에서|웜아이뷰', re.IGNORECASE), "low angle, worm-eye view, from below"),
    (re.compile(r'더치앵글|기울어진', re.IGNORECASE), "dutch angle, tilted perspective"),
    (re.compile(r'아이레벨|눈높이', re.IGNORECASE), "eye level view"),

    # 4. 의상 & 아이템
    (re.compile(r'웨딩드레스', re.IGNORECASE), "wedding dress, white bridal gown"),
    (re.compile(r'이브닝드레스', re.IGNORECASE), "evening dress, luxury gown"),
    (re.compile(r'원피스|드레스', re.IGNORECASE), "dress, elegant outfit"),
    (re.compile(r'세일러복', re.IGNORECASE), "sailor suit uniform"),
    (re.compile(r'교복', re.IGNORECASE), "school uniform"),
    (re.compile(r'한복', re.IGNORECASE), "hanbok, traditional korean dress"),
    (re.compile(r'기모노', re.IGNORECASE), "kimono, traditional japanese outfit"),
    (re.compile(r'유카타', re.IGNORECASE), "yukata"),
    (re.compile(r'치파오', re.IGNORECASE), "cheongsam, qipao dress"),
    (re.compile(r'정장|수트', re.IGNORECASE), "business suit, formal wear"),
    (re.compile(r'셔츠|와이셔츠', re.IGNORECASE), "collared shirt"),
    (re.compile(r'블라우스', re.IGNORECASE), "blouse"),
    (re.compile(r'후드티|후드', re.IGNORECASE), "hoodie"),
    (re.compile(r'맨투맨', re.IGNORECASE), "sweatshirt"),
    (re.compile(r'청바지', re.IGNORECASE), "denim jeans"),
    (re.compile(r'미니스커트', re.IGNORECASE), "miniskirt"),
    (re.compile(r'롱스커트', re.IGNORECASE), "long skirt"),
    (re.compile(r'스커트|치마', re.IGNORECASE), "skirt"),
    (re.compile(r'반바지|핫팬츠', re.IGNORECASE), "shorts, hotpants"),
    (re.compile(r'수영복|비키니', re.IGNORECASE), "swimsuit, bikini"),
    (re.compile(r'래시가드', re.IGNORECASE), "rashguard"),
    (re.compile(r'메이드복', re.IGNORECASE), "maid outfit, maid dress"),
    (re.compile(r'간호사복', re.IGNORECASE), "nurse outfit"),
    (re.compile(r'갑옷|아머', re.IGNORECASE), "armor, battle gear"),
    (re.compile(r'SF슈트|사이버슈트', re.IGNORECASE), "sci-fi bodysuit, cyber armor"),
    (re.compile(r'코트|트렌치코트', re.IGNORECASE), "trench coat, long coat"),
    (re.compile(r'자켓|재킷', re.IGNORECASE), "jacket"),
    (re.compile(r'가디건', re.IGNORECASE), "cardigan"),
    (re.compile(r'패딩', re.IGNORECASE), "puffer jacket"),
    (re.compile(r'스타킹', re.IGNORECASE), "stockings, pantyhose"),
    (re.compile(r'오버니삭스', re.IGNORECASE), "over-knee socks"),
    (re.compile(r'하이힐', re.IGNORECASE), "high heels"),
    (re.compile(r'부츠', re.IGNORECASE), "boots"),
    (re.compile(r'스니커즈|운동화', re.IGNORECASE), "sneakers"),
    (re.compile(r'안경', re.IGNORECASE), "glasses, stylish spectacles"),
    (re.compile(r'선글라스', re.IGNORECASE), "sunglasses"),
    (re.compile(r'모자', re.IGNORECASE), "hat"),
    (re.compile(r'헤드폰', re.IGNORECASE), "headphones"),
    (re.compile(r'초커', re.IGNORECASE), "choker"),
    (re.compile(r'목걸이', re.IGNORECASE), "necklace"),

    # 5. 표정 & 시선 & 제스처 & 자세
    (re.compile(r'양손으로\s*볼(을)?\s*(양\s*옆으로\s*)?(잡아\s*당기[가-힣]*|꼬집[가-힣]*|늘리[가-힣]*)(\s*있는|\s*있음|\s*는|\s*며)?', re.IGNORECASE), "pulling cheeks sideways with both hands, cheeks stretched"),
    (re.compile(r'볼(을)?\s*(양\s*옆으로\s*)?(잡아\s*당기[가-힣]*|꼬집[가-힣]*|늘리[가-힣]*)(\s*있는|\s*있음|\s*는|\s*며)?', re.IGNORECASE), "pulling cheeks, cheeks stretched"),
    (re.compile(r'볼을\s*부풀린|볼\s*빵빵|뿌우', re.IGNORECASE), "puffed cheeks, pouty face"),
    (re.compile(r'손가락을\s*입술에\s*댄|쉿\s*포즈', re.IGNORECASE), "finger on lips, shh gesture"),
    (re.compile(r'입을\s*가린|손으로\s*입을\s*가린', re.IGNORECASE), "covering mouth with hand"),
    (re.compile(r'머리를\s*쓸어넘기는', re.IGNORECASE), "running fingers through hair"),
    (re.compile(r'안경을\s*고쳐쓰는|안경\s*올리는', re.IGNORECASE), "adjusting glasses"),
    (re.compile(r'기도하는|두\s*손을\s*모은', re.IGNORECASE), "praying hands, hands clasped"),
    (re.compile(r'양손을\s*허리에|허리에\s*손', re.IGNORECASE), "hands on hips"),
    (re.compile(r'손하트|하트\s*포즈', re.IGNORECASE), "finger heart, heart hands gesture"),
    (re.compile(r'양손으로|두\s*손으로', re.IGNORECASE), "with both hands"),
    (re.compile(r'한손으로', re.IGNORECASE), "with one hand"),
    (re.compile(r'활짝\s*웃는\s*얼굴|활짝\s*웃는|환한\s*미소', re.IGNORECASE), "bright cheerful smile, laughing happily"),
    (re.compile(r'웃는\s*얼굴|미소짓는\s*얼굴|미소|웃음', re.IGNORECASE), "smiling, gentle smile"),
    (re.compile(r'무표정한\s*얼굴|무표정|차분한|담담한', re.IGNORECASE), "expressionless, calm face, neutral expression"),
    (re.compile(r'윙크', re.IGNORECASE), "winking"),
    (re.compile(r'부끄러워하는|홍조|수줍은', re.IGNORECASE), "blushing, shy expression"),
    (re.compile(r'놀란', re.IGNORECASE), "surprised expression"),
    (re.compile(r'진지한|카리스마', re.IGNORECASE), "serious charismatic gaze, intense expression"),
    (re.compile(r'슬픈|눈물', re.IGNORECASE), "sad expression, tears"),
    (re.compile(r'눈을\s*감은|감은\s*눈', re.IGNORECASE), "closed eyes"),
    (re.compile(r'눈을\s*반쯤\s*뜬', re.IGNORECASE), "half-closed eyes"),
    (re.compile(r'카메라를\s*바라보는|바라보는|응시|시선', re.IGNORECASE), "looking at viewer, eye contact"),

    (re.compile(r'서\s*있는|서있는|직립', re.IGNORECASE), "standing pose"),
    (re.compile(r'앉아\s*있는|앉아있는|앉은|착석', re.IGNORECASE), "sitting pose, seated gracefully"),
    (re.compile(r'무릎을\s*세우고\s*앉[가-힣]*|무릎\s*안고', re.IGNORECASE), "sitting with knees bent and hugging knees with hands"),
    (re.compile(r'태아자세|웅크린\s*자세', re.IGNORECASE), "lying in fetal position, curled up body"),
    (re.compile(r'누워\s*있는|누워있는|누운', re.IGNORECASE), "lying down pose, relaxed on floor"),
    (re.compile(r'걷는|걸어가는|워킹', re.IGNORECASE), "walking pose, dynamic stride"),
    (re.compile(r'달리는|뛰는|러닝', re.IGNORECASE), "running pose, dynamic movement"),
    (re.compile(r'점프|도약', re.IGNORECASE), "jumping in mid-air"),
    (re.compile(r'다리를\s*꼬고\s*앉[가-힣]*', re.IGNORECASE), "sitting with legs crossed"),

    # 6. 신체 부위 및 클로즈업 상세
    (re.compile(r'발등\s*\(맨발\)|발등', re.IGNORECASE), "top of feet and toes, feet arch, bare feet"),
    (re.compile(r'발바닥', re.IGNORECASE), "sole of bare foot, foot sole texture"),
    (re.compile(r'손등', re.IGNORECASE), "back of hand, elegant hand gesture, clean manicure"),
    (re.compile(r'손바닥', re.IGNORECASE), "open palm, graceful hand gesture, finger detail"),
    (re.compile(r'엉덩이|골반', re.IGNORECASE), "hips and buttocks, pelvis area"),
    (re.compile(r'가슴', re.IGNORECASE), "chest and neckline"),
    (re.compile(r'쇄골', re.IGNORECASE), "collarbone line"),
    (re.compile(r'손|손가락', re.IGNORECASE), "detailed hands, perfect fingers"),
    (re.compile(r'발|발가락', re.IGNORECASE), "feet, toes"),
    (re.compile(r'다리|각선미', re.IGNORECASE), "slender legs, leg lines"),

    # 7. 배경 & 조명 & 환경
    (re.compile(r'백색\s*배경|흰색\s*배경|화이트\s*배경', re.IGNORECASE), "clean solid pure white background, studio white backdrop"),
    (re.compile(r'사이버펑크(\s*도시)?', re.IGNORECASE), "cyberpunk neon city, glowing holographic lights"),
    (re.compile(r'자연|숲|밀림', re.IGNORECASE), "lush forest, trees, dappled sunlight"),
    (re.compile(r'해변|바다|해안가', re.IGNORECASE), "ocean, sandy beach, sea waves"),
    (re.compile(r'하늘|푸른\s*하늘', re.IGNORECASE), "blue sky, fluffy white clouds"),
    (re.compile(r'밤하늘|은하수|우주', re.IGNORECASE), "night sky, starry galaxy, nebula space"),
    (re.compile(r'노을|일몰|석양', re.IGNORECASE), "sunset, golden hour, warm atmospheric glow"),
    (re.compile(r'야경|밤', re.IGNORECASE), "night scene, dark atmospheric lighting"),
    (re.compile(r'비오는|비', re.IGNORECASE), "rainy day, wet floor reflections"),
    (re.compile(r'눈오는|눈꽃|눈|설원', re.IGNORECASE), "snowing, winter snowfall, snowfield"),
    (re.compile(r'벚꽃|사쿠라', re.IGNORECASE), "cherry blossoms, falling sakura petals"),
    (re.compile(r'실내|방|침실', re.IGNORECASE), "indoor room, cozy interior"),

    # 8. 퀄리티 & 마감
    (re.compile(r'고화질|고품질|최고품질|마스터피스', re.IGNORECASE), "masterpiece, best quality, ultra detailed"),
    (re.compile(r'시네마틱', re.IGNORECASE), "cinematic lighting, film still"),
]


def translate_prompt_to_english(text: str) -> str:
    """
    한글 프롬프트를 영어 프롬프트로 규칙 기반 자동 변환
    """
    if not text or not text.strip():
        return ""

    res = text.strip()

    # 한글이 포함되어 있지 않으면 원본 반환
    if not re.search(r'[가-힣]', res):
        return res

    for pattern, eng in PROMPT_TRANSLATIONS:
        res = pattern.sub(eng, res)

    # 잔여 한국어 조사 및 불필요 어미 정리
    res = re.sub(r'(\s*이|가|을|를|의|에|에서|으로|로|과|와|하고|하며|있는|있음|한|된|인)\b', ' ', res)
    res = re.sub(r'\s{2,}', ' ', res).strip()
    res = re.sub(r'\s*,\s*', ', ', res)
    res = re.sub(r'(,\s*){2,}', ', ', res)
    res = re.sub(r'^,\s*|,\s*$', '', res)

    return res


def get_natural_spatial_name(c1: int, c2: int, r1: int, r2: int, total_cols: int, total_rows: int) -> str:
    """
    최신 AI(Krea, Midjourney, Flux, SD3, GPT, Gemini)가 아티팩트 없이 이해하도록
    인터랙티브 웹 버전과 100% 동일한 정밀 퍼센트 기반 자연어 공간 서술어 반환
    """
    col_span = (c2 - c1 + 1) / total_cols
    row_span = (r2 - r1 + 1) / total_rows
    col_center = (c1 + c2 + 1) / (2.0 * total_cols)
    row_center = (r1 + r2 + 1) / (2.0 * total_rows)

    w_pct = round(col_span * 100)
    h_pct = round(row_span * 100)
    x1_pct = round((c1 / total_cols) * 100)
    x2_pct = round(((c2 + 1) / total_cols) * 100)
    y1_pct = round((r1 / total_rows) * 100)
    y2_pct = round(((r2 + 1) / total_rows) * 100)

    # 1. 전체 영역 (Full frame)
    if col_span >= 0.85 and row_span >= 0.85:
        return "Across the entire frame (full 100% canvas)"

    # 2. 전고 세로 띠 (Full-height vertical columns)
    if row_span >= 0.85:
        col_type = "wide vertical section" if w_pct >= 40 else ("narrow vertical strip" if w_pct <= 25 else "vertical panel")
        if col_center < 0.35:
            return f"Left {col_type} (occupying exactly {w_pct}% width from 0% to {x2_pct}%, full 100% height)"
        elif col_center > 0.65:
            return f"Right {col_type} (occupying exactly {w_pct}% width from {x1_pct}% to 100%, full 100% height)"
        else:
            return f"Center {col_type} (occupying exactly {w_pct}% width from {x1_pct}% to {x2_pct}%, full 100% height)"

    # 3. 전폭 가로 띠 (Full-width horizontal bands)
    if col_span >= 0.85:
        row_type = "wide horizontal band" if h_pct >= 40 else ("narrow horizontal strip" if h_pct <= 25 else "horizontal panel")
        if row_center < 0.35:
            return f"Top {row_type} (full 100% width, occupying exactly {h_pct}% height from 0% to {y2_pct}%)"
        elif row_center > 0.65:
            return f"Bottom {row_type} (full 100% width, occupying exactly {h_pct}% height from {y1_pct}% to 100%)"
        else:
            return f"Middle {row_type} (full 100% width, occupying exactly {h_pct}% height from {y1_pct}% to {y2_pct}%)"

    # 4. 분할 사분면 / 그리드 패널 (Quadrants & multi-cells)
    h_pos = "left" if col_center < 0.35 else ("right" if col_center > 0.65 else "center")
    v_pos = "top" if row_center < 0.35 else ("bottom" if row_center > 0.65 else "middle")

    if h_pos == "center" and v_pos == "middle":
        panel_name = "Center frame"
    elif v_pos == "middle":
        panel_name = f"{h_pos.capitalize()} middle panel"
    elif h_pos == "center":
        panel_name = f"{v_pos.capitalize()} center panel"
    else:
        panel_name = f"{v_pos.capitalize()}-{h_pos} panel"

    return f"{panel_name} (occupying exactly {w_pct}% width from {x1_pct}% to {x2_pct}%, {h_pct}% height from {y1_pct}% to {y2_pct}%)"


def get_spatial_description(c1: int, c2: int, r1: int, r2: int, total_cols: int, total_rows: int) -> dict:
    col_span = (c2 - c1 + 1) / total_cols
    row_span = (r2 - r1 + 1) / total_rows
    col_center = (c1 + c2 + 1) / (2.0 * total_cols)
    row_center = (r1 + r2 + 1) / (2.0 * total_rows)

    pct_left = round((c1 / total_cols) * 100)
    pct_right = round(((c2 + 1) / total_cols) * 100)
    pct_top = round((r1 / total_rows) * 100)
    pct_bottom = round(((r2 + 1) / total_rows) * 100)

    if col_span >= 0.85 and row_span >= 0.85:
        dir_name = "Full Background"
    elif col_span >= 0.85:
        if row_center < 0.35:
            dir_name = "Top Full-Width Section"
        elif row_center > 0.65:
            dir_name = "Bottom Foreground Strip"
        else:
            dir_name = "Middle Panorama Band"
    else:
        h_dir = "Left" if col_center < 0.35 else ("Right" if col_center > 0.65 else "Center")
        v_dir = "Top" if row_center < 0.35 else ("Bottom" if row_center > 0.65 else "Middle")

        if h_dir == "Center" and v_dir == "Middle":
            dir_name = "Center Frame"
        elif v_dir == "Middle":
            dir_name = f"{h_dir} Side"
        elif h_dir == "Center":
            dir_name = f"{v_dir} Center"
        else:
            dir_name = f"{v_dir}-{h_dir}"

    grid_info = f"Cols {c1+1}-{c2+1}/{total_cols}, Rows {r1+1}-{r2+1}/{total_rows}"
    pct_info = f"{pct_left}%-{pct_right}% W, {pct_top}%-{pct_bottom}% H"
    
    return {
        "direction": dir_name,
        "grid": grid_info,
        "percent": pct_info,
        "bbox": [
            round(c1 / total_cols, 2),
            round(r1 / total_rows, 2),
            round((c2 + 1) / total_cols, 2),
            round((r2 + 1) / total_rows, 2)
        ]
    }


class VisualGridPromptNode:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "prompt_text": ("STRING", {"multiline": True, "dynamicPrompts": False, "default": ""}),
                "format": ([
                    "Natural Spatial (Krea/MiniMax/Gemini/GPT)",
                    "ComfyUI / SD Regional Prompt (BREAK Syntax)",
                    "Structured Tags ([Area 1 | LEFT])",
                    "Coordinates Bounding Box (<area_1 bbox=...>)",
                    "Comma-Separated List",
                    "Raw JSON"
                ], {"default": "Natural Spatial (Krea/MiniMax/Gemini/GPT)"}),
                "aspect_ratio": ([
                    "16:9", "9:16", "1:1", "4:3", "3:4", "3:2", "2:3", "21:9"
                ], {"default": "16:9"}),
                "grid_cols": ("INT", {"default": 6, "min": 1, "max": 20, "step": 1}),
                "grid_rows": ("INT", {"default": 3, "min": 1, "max": 20, "step": 1}),
                "ui_language": (["한국어", "English"], {"default": "한국어"}),
            },
            "optional": {
                "grid_data": ("STRING", {"default": "{}"}),
                "prefix_prompt": ("STRING", {"multiline": True, "default": "", "placeholder": "Global Prefix (Style, Quality, Lighting)..."}),
                "suffix_prompt": ("STRING", {"multiline": True, "default": "", "placeholder": "Global Suffix (Atmosphere, Details)..."}),
            }
        }

    RETURN_TYPES = ("STRING", "STRING", "STRING")
    RETURN_NAMES = ("prompt", "aspect_ratio", "raw_json")
    FUNCTION = "generate"
    CATEGORY = "utils/prompt"

    def generate(self, prompt_text, format, aspect_ratio, grid_cols, grid_rows, ui_language, grid_data="{}", prefix_prompt="", suffix_prompt=""):
        final_prompt = ""
        has_parsed_areas = False
        white_bg = False
        grid_borders = False
        char_profile = ""
        
        # grid_data 파싱 및 포맷별 영문 공간 프롬프트 구성
        if grid_data and grid_data != "{}":
            try:
                data = json.loads(grid_data) if isinstance(grid_data, str) else grid_data
                areas = data.get("areas", [])
                total_cols = data.get("cols", grid_cols)
                total_rows = data.get("rows", grid_rows)
                white_bg = bool(data.get("white_bg", data.get("whiteBg", False)))
                grid_borders = bool(data.get("grid_borders", data.get("gridBorders", False)))
                raw_profile = data.get("character_profile", data.get("characterProfile", ""))
                char_profile = translate_prompt_to_english(raw_profile).strip()
                
                valid_areas = [a for a in areas if a.get("prompt", "").strip() or a.get("ko_prompt", "").strip() or a.get("koPrompt", "").strip()]
                if valid_areas:
                    has_parsed_areas = True
                    sorted_areas = sorted(valid_areas, key=lambda x: x.get("id", 0))
                    
                    if format.startswith("Natural"):
                        formatted_parts = []
                        formatted_parts.append(f"A high-definition {aspect_ratio} multi-panel composition strictly partitioned into {len(sorted_areas)} proportional sections.")
                        
                        if char_profile:
                            formatted_parts.append(f"[Subject / Character Profile & Visual Consistency]: {char_profile}, identical character features and costume maintained across all panels.")

                        formatted_parts.append("[Spatial Layout & Exact Proportional Placement]:")
                        for area in sorted_areas:
                            raw_desc = area.get("prompt", "").strip() or area.get("ko_prompt", "").strip() or area.get("koPrompt", "").strip()
                            desc = translate_prompt_to_english(raw_desc)
                            spatial_name = get_natural_spatial_name(
                                area.get("c1", 0), area.get("c2", 0),
                                area.get("r1", 0), area.get("r2", 0),
                                total_cols, total_rows
                            )
                            formatted_parts.append(f"- {spatial_name}: {desc}.")
                        
                        if grid_borders:
                            formatted_parts.append("[Multi-Panel Layout & Strict Proportional Scale]: Split-screen multi-panel collage layout strictly adhering to the exact percentage width and height boundaries specified above for each column and row without shifting, resizing, or distorting relative panel scales. Each panel is cleanly separated by crisp thin black divider lines, clean comic grid panels, pristine artwork without any text, labels, numbers, coordinates, or watermarks.")
                        else:
                            formatted_parts.append("[Global Scene Coherence & Proportional Placement]: Seamlessly blended multi-region composition maintaining the exact spatial percentage boundaries and relative scale for each region, unified realistic lighting, cinematic perspective, and coherent environment bridging all regions, clean presentation without any text, labels, numbers, coordinates, or watermarks.")
                        final_prompt = "\n".join(formatted_parts)

                    elif "BREAK" in format or format.startswith("ComfyUI"):
                        parts = []
                        if char_profile:
                            parts.append(f"({char_profile}:1.15)")
                        for area in sorted_areas:
                            raw_desc = area.get("prompt", "").strip() or area.get("ko_prompt", "").strip() or area.get("koPrompt", "").strip()
                            desc = translate_prompt_to_english(raw_desc)
                            parts.append(f"({desc}:1.1)")
                        final_prompt = " BREAK\n".join(parts)
                        
                    elif format.startswith("Structured"):
                        formatted_parts = [f"[Composition: {aspect_ratio} Grid Layout ({total_cols}x{total_rows})]"]
                        if char_profile:
                            formatted_parts.append(f"[Character Profile]: {char_profile}")
                        for area in sorted_areas:
                            idx = area.get("id", 1)
                            raw_desc = area.get("prompt", "").strip() or area.get("ko_prompt", "").strip() or area.get("koPrompt", "").strip()
                            desc = translate_prompt_to_english(raw_desc)
                            info = get_spatial_description(
                                area.get("c1", 0), area.get("c2", 0),
                                area.get("r1", 0), area.get("r2", 0),
                                total_cols, total_rows
                            )
                            formatted_parts.append(f"[Area {idx} | {info['direction'].upper()} ({info['percent']})]: {desc}")
                        final_prompt = "\n".join(formatted_parts)

                    elif format.startswith("Coordinates"):
                        formatted_parts = [f"[Canvas Layout: {aspect_ratio} | Grid {total_cols}x{total_rows}]"]
                        if char_profile:
                            formatted_parts.append(f"<character_profile>{char_profile}</character_profile>")
                        for area in sorted_areas:
                            idx = area.get("id", 1)
                            raw_desc = area.get("prompt", "").strip() or area.get("ko_prompt", "").strip() or area.get("koPrompt", "").strip()
                            desc = translate_prompt_to_english(raw_desc)
                            info = get_spatial_description(
                                area.get("c1", 0), area.get("c2", 0),
                                area.get("r1", 0), area.get("r2", 0),
                                total_cols, total_rows
                            )
                            formatted_parts.append(f"<area_{idx} bbox=\"{info['bbox']}\"> {desc} </area_{idx}>")
                        final_prompt = "\n".join(formatted_parts)
                        
                    elif format.startswith("Comma"):
                        prompts = []
                        if char_profile:
                            prompts.append(char_profile)
                        for a in sorted_areas:
                            raw_desc = a.get("prompt", "").strip() or a.get("ko_prompt", "").strip() or a.get("koPrompt", "").strip()
                            prompts.append(translate_prompt_to_english(raw_desc))
                        final_prompt = ", ".join(prompts)
                        
                    elif format.startswith("Raw JSON"):
                        final_prompt = json.dumps(data, ensure_ascii=False, indent=2)
            except Exception as e:
                print(f"[VisualGridPrompt] Error parsing grid_data: {e}")

        # 영역이 없지만 사용자가 prompt_text에 직접 작성한 경우 fallback (한글 자동 번역)
        if not has_parsed_areas:
            final_prompt = translate_prompt_to_english(prompt_text.strip())
            if not final_prompt and char_profile:
                final_prompt = char_profile

        # 백색 배경 & 접두사/접미사 처리
        eng_prefix = translate_prompt_to_english(prefix_prompt.strip())
        eng_suffix = translate_prompt_to_english(suffix_prompt.strip())

        extra_tags = []
        if white_bg:
            extra_tags.append("clean solid pure white background, studio white backdrop")

        if eng_suffix:
            extra_tags.append(eng_suffix)

        combined_suffix = ", ".join(extra_tags) if extra_tags else ""

        result_parts = []
        if eng_prefix:
            result_parts.append(eng_prefix)
        if final_prompt:
            result_parts.append(final_prompt)
        if combined_suffix:
            result_parts.append(combined_suffix)

        separator = ", " if format.startswith("Comma") else "\n\n"
        full_output = separator.join(result_parts)
        
        raw_json_str = grid_data if isinstance(grid_data, str) else json.dumps(grid_data, ensure_ascii=False)
        return (full_output, aspect_ratio, raw_json_str)


NODE_CLASS_MAPPINGS = {
    "VisualGridPromptNode": VisualGridPromptNode
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "VisualGridPromptNode": "📐 Visual Grid Regional Prompt (Web Pro)"
}
