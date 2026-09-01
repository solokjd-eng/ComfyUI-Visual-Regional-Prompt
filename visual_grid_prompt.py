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

    # 2. 헤어 & 눈 & 캐릭터 외모 (단일 음절 신체 부위보다 먼저 매칭하여 '은발'이 '은+feet'로 오치환되는 것 방지)
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

    (re.compile(r'어여쁜\s*소녀|예쁜\s*소녀|소녀|미소녀', re.IGNORECASE), "1girl, beautiful anime girl"),
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
    (re.compile(r'안경', re.IGNORECASE), "glasses"),
    (re.compile(r'선글라스', re.IGNORECASE), "sunglasses"),
    (re.compile(r'모자', re.IGNORECASE), "hat"),
    (re.compile(r'헤드폰', re.IGNORECASE), "headphones"),
    (re.compile(r'초커', re.IGNORECASE), "choker"),
    (re.compile(r'목걸이', re.IGNORECASE), "necklace"),

    # 5. 표정 & 시선 & 제스처 & 자세 (얼굴 단일 단어 치환보다 먼저 매칭하여 복합 표현이 분리되지 않도록 처리)
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
    (re.compile(r'시선\s*회피|먼곳을\s*바라보는', re.IGNORECASE), "looking away, looking to the side"),
    (re.compile(r'서있는|서있음', re.IGNORECASE), "standing pose"),
    (re.compile(r'앉아있는|앉음', re.IGNORECASE), "sitting pose"),
    (re.compile(r'무릎\s*꿇은', re.IGNORECASE), "kneeling pose"),
    (re.compile(r'누워있는|누움', re.IGNORECASE), "lying down pose"),
    (re.compile(r'엎드린', re.IGNORECASE), "lying on stomach"),
    (re.compile(r'기대어\s*있는|기댐', re.IGNORECASE), "leaning against"),
    (re.compile(r'쪼그려\s*앉은|웅크린', re.IGNORECASE), "squatting, crouching pose"),
    (re.compile(r'달리는|뜀', re.IGNORECASE), "running"),
    (re.compile(r'걷는|걸어감', re.IGNORECASE), "walking"),
    (re.compile(r'점프|도약', re.IGNORECASE), "jumping"),
    (re.compile(r'춤추는|댄스', re.IGNORECASE), "dancing"),
    (re.compile(r'손을\s*흔드는', re.IGNORECASE), "waving hand"),
    (re.compile(r'팔짱\s*낀', re.IGNORECASE), "arms crossed"),
    (re.compile(r'주머니에\s*손', re.IGNORECASE), "hands in pockets"),
    (re.compile(r'턱을\s*괸', re.IGNORECASE), "resting chin on hand"),
    (re.compile(r'손을\s*뻗은|손을\s*내미는', re.IGNORECASE), "reaching out hand towards viewer"),
    (re.compile(r'브이|V포즈', re.IGNORECASE), "peace sign, v gesture"),

    # 6. 인체 부위 & 디테일 (헤어/표정 이후 매칭)
    (re.compile(r'얼굴', re.IGNORECASE), "face, detailed face"),
    (re.compile(r'목선|쇄골', re.IGNORECASE), "collarbone, graceful neck"),
    (re.compile(r'가슴|바스트', re.IGNORECASE), "chest, bust"),
    (re.compile(r'허리', re.IGNORECASE), "slender waist"),
    (re.compile(r'골반|엉덩이|힙', re.IGNORECASE), "hips, buttocks"),
    (re.compile(r'허벅지', re.IGNORECASE), "thighs"),
    (re.compile(r'다리|각선미', re.IGNORECASE), "legs, beautiful slender legs"),
    (re.compile(r'발목|맨발|발', re.IGNORECASE), "feet, ankles"),
    (re.compile(r'손|손가락', re.IGNORECASE), "delicate hands, detailed fingers"),
    (re.compile(r'어깨', re.IGNORECASE), "shoulders"),

    # 7. 배경 & 조명 & 환경
    (re.compile(r'사이버펑크(\s*도시)?', re.IGNORECASE), "cyberpunk neon city, glowing holographic lights"),
    (re.compile(r'미래\s*도시|SF\s*도시', re.IGNORECASE), "futuristic sci-fi city, high-tech skyscrapers"),
    (re.compile(r'도시|빌딩숲|거리', re.IGNORECASE), "modern cityscape, streets, skyscrapers"),
    (re.compile(r'골목길', re.IGNORECASE), "narrow alleyway, cozy street"),
    (re.compile(r'카페', re.IGNORECASE), "cafe, cozy coffee shop"),
    (re.compile(r'실내|방|침실', re.IGNORECASE), "indoor room, cozy bedroom interior"),
    (re.compile(r'도서관', re.IGNORECASE), "library, bookshelves"),
    (re.compile(r'교실|학교', re.IGNORECASE), "classroom, school interior"),
    (re.compile(r'야외|자연', re.IGNORECASE), "outdoors, nature"),
    (re.compile(r'숲|나무|밀림', re.IGNORECASE), "lush forest, trees, dappled sunlight"),
    (re.compile(r'해변|바다|해안가', re.IGNORECASE), "ocean, sandy beach, sea waves"),
    (re.compile(r'하늘|푸른\s*하늘', re.IGNORECASE), "blue sky, fluffy white clouds"),
    (re.compile(r'밤하늘|은하수|우주', re.IGNORECASE), "night sky, starry galaxy, nebula outer space"),
    (re.compile(r'노을|일몰|석양', re.IGNORECASE), "sunset, golden hour, warm atmospheric glow"),
    (re.compile(r'야경|밤', re.IGNORECASE), "night scene, dark atmospheric lighting"),
    (re.compile(r'비오는|비', re.IGNORECASE), "rainy day, wet floor reflections"),
    (re.compile(r'눈오는|눈꽃|눈|설원', re.IGNORECASE), "snowing, winter snowfall, snowfield, frost"),
    (re.compile(r'벚꽃|사쿠라', re.IGNORECASE), "cherry blossoms, falling sakura petals"),
    (re.compile(r'단풍', re.IGNORECASE), "autumn leaves, fall foliage"),
    (re.compile(r'배경', re.IGNORECASE), "background"),

    # 8. 화풍 & 조명 & 퀄리티
    (re.compile(r'실사|사진|포토리얼', re.IGNORECASE), "photorealistic, 8k photography, hyperrealistic"),
    (re.compile(r'애니|일러스트|만화', re.IGNORECASE), "anime style, detailed illustration"),
    (re.compile(r'시네마틱', re.IGNORECASE), "cinematic lighting, film still"),
    (re.compile(r'수채화', re.IGNORECASE), "watercolor painting"),
    (re.compile(r'유화', re.IGNORECASE), "oil painting"),
    (re.compile(r'역광|림라이트', re.IGNORECASE), "backlighting, rim light"),
    (re.compile(r'네온|네온사인', re.IGNORECASE), "neon glow, vibrant colors"),
    (re.compile(r'빛내림|틴들현상', re.IGNORECASE), "volumetric god rays, sunbeams"),
    (re.compile(r'고화질|고품질|최고품질', re.IGNORECASE), "masterpiece, best quality, ultra detailed")
]

def translate_prompt_to_english(text):
    """한글 프롬프트를 AI 표준 영문 키워드로 자동 번역 및 치환"""
    if not text or not isinstance(text, str):
        return ""
    res = text.strip()
    if not res:
        return ""
    
    # 한글 포함 여부 확인
    if not re.search(r'[가-힣]', res):
        return res
        
    for pattern, eng in PROMPT_TRANSLATIONS:
        res = pattern.sub(eng, res)
        
    # 조사 및 잉여 어미 정리
    res = re.sub(r'(\s*이|가|을|를|의|에|에서|으로|로|과|와|하고|하며|있는|있음|한|된|인)\b', ' ', res)
    res = re.sub(r'\s{2,}', ' ', res).strip()
    res = re.sub(r',\s*,', ',', res)
    res = re.sub(r'^,\s*|,\s*$', '', res)
    return res


def get_spatial_description(col_start, col_end, row_start, row_end, total_cols, total_rows):
    """
    최신 AI(Krea 2, Gemini, MiniMax, Sora, FLUX, ChatGPT 등)가 완벽하게 이해할 수 있도록
    자연어 공간 방향 + 상세 격자 좌표(Columns/Rows) + 백분율(%) 범위를 함께 제공합니다.
    """
    c1, c2 = col_start, col_end
    r1, r2 = row_start, row_end
    
    col_center = (c1 + c2 + 1) / (2.0 * total_cols)
    row_center = (r1 + r2 + 1) / (2.0 * total_rows)
    col_span = (c2 - c1 + 1) / total_cols
    row_span = (r2 - r1 + 1) / total_rows
    
    pct_left = int(round((c1 / total_cols) * 100))
    pct_right = int(round(((c2 + 1) / total_cols) * 100))
    pct_top = int(round((r1 / total_rows) * 100))
    pct_bottom = int(round(((r2 + 1) / total_rows) * 100))

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
        if col_center < 0.35:
            h_dir = "Left"
        elif col_center > 0.65:
            h_dir = "Right"
        else:
            h_dir = "Center"

        if row_center < 0.35:
            v_dir = "Top"
        elif row_center > 0.65:
            v_dir = "Bottom"
        else:
            v_dir = "Middle"

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
        "full": f"{dir_name} | {grid_info} | {pct_info}"
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
                    "Structured Tags ([Area 1 - Left] ...)",
                    "Coordinates & BoundingBox",
                    "Comma-Separated List",
                    "Raw JSON Data"
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
        
        # grid_data 파싱 및 포맷별 영문 공간 프롬프트 구성
        if grid_data and grid_data != "{}":
            try:
                data = json.loads(grid_data) if isinstance(grid_data, str) else grid_data
                areas = data.get("areas", [])
                total_cols = data.get("cols", grid_cols)
                total_rows = data.get("rows", grid_rows)
                
                valid_areas = [a for a in areas if a.get("prompt", "").strip() or a.get("ko_prompt", "").strip()]
                if valid_areas:
                    has_parsed_areas = True
                    formatted_parts = []
                    
                    if format.startswith("Natural"):
                        formatted_parts.append(f"A high-definition {aspect_ratio} multi-region composition.")
                        formatted_parts.append("[Spatial Layout & Regional Placement]:")
                        for area in sorted(valid_areas, key=lambda x: x.get("id", 0)):
                            idx = area.get("id", 1)
                            raw_desc = area.get("prompt", "").strip() or area.get("ko_prompt", "").strip()
                            # 한글인 경우 자동 영문 번역 적용
                            desc = translate_prompt_to_english(raw_desc)
                            info = get_spatial_description(
                                area.get("c1", 0), area.get("c2", 0),
                                area.get("r1", 0), area.get("r2", 0),
                                total_cols, total_rows
                            )
                            formatted_parts.append(f"- Area {idx} [{info['full']}]: {desc}.")
                        formatted_parts.append("[Global Scene Coherence]: Seamlessly blended depth of field, unified realistic lighting, cinematic perspective, and coherent environment bridging all regions.")
                        final_prompt = "\n".join(formatted_parts)
                        
                    elif format.startswith("Structured"):
                        formatted_parts.append(f"[Composition: {aspect_ratio} Grid Layout ({total_cols}x{total_rows})]")
                        for area in sorted(valid_areas, key=lambda x: x.get("id", 0)):
                            idx = area.get("id", 1)
                            raw_desc = area.get("prompt", "").strip() or area.get("ko_prompt", "").strip()
                            desc = translate_prompt_to_english(raw_desc)
                            info = get_spatial_description(
                                area.get("c1", 0), area.get("c2", 0),
                                area.get("r1", 0), area.get("r2", 0),
                                total_cols, total_rows
                            )
                            formatted_parts.append(f"[Area {idx} | {info['direction'].upper()} ({info['percent']})]: {desc}")
                        final_prompt = "\n".join(formatted_parts)

                    elif format.startswith("Coordinates"):
                        formatted_parts.append(f"[Canvas Layout: {aspect_ratio} | Grid {total_cols}x{total_rows}]")
                        for area in sorted(valid_areas, key=lambda x: x.get("id", 0)):
                            idx = area.get("id", 1)
                            raw_desc = area.get("prompt", "").strip() or area.get("ko_prompt", "").strip()
                            desc = translate_prompt_to_english(raw_desc)
                            c1, c2 = area.get("c1", 0), area.get("c2", 0)
                            r1, r2 = area.get("r1", 0), area.get("r2", 0)
                            x1, y1 = round(c1 / total_cols, 2), round(r1 / total_rows, 2)
                            x2, y2 = round((c2 + 1) / total_cols, 2), round((r2 + 1) / total_rows, 2)
                            formatted_parts.append(f"<area_{idx} bbox=\"[{x1}, {y1}, {x2}, {y2}]\"> {desc} </area_{idx}>")
                        final_prompt = "\n".join(formatted_parts)
                        
                    elif format.startswith("Comma"):
                        prompts = [translate_prompt_to_english(a.get("prompt", "").strip() or a.get("ko_prompt", "").strip()) for a in sorted(valid_areas, key=lambda x: x.get("id", 0))]
                        final_prompt = ", ".join(prompts)
                        
                    elif format.startswith("Raw JSON"):
                        final_prompt = json.dumps(data, ensure_ascii=False, indent=2)
            except Exception as e:
                print(f"[VisualGridPrompt] Error parsing grid_data: {e}")

        # 영역이 없지만 사용자가 prompt_text에 직접 작성한 경우 fallback (한글 자동 번역)
        if not has_parsed_areas:
            final_prompt = translate_prompt_to_english(prompt_text.strip())
            if final_prompt:
                return (final_prompt, aspect_ratio, grid_data if isinstance(grid_data, str) else json.dumps(grid_data))

        # Prefix 및 Suffix 조합 (Prefix/Suffix도 한글인 경우 자동 번역)
        eng_prefix = translate_prompt_to_english(prefix_prompt.strip())
        eng_suffix = translate_prompt_to_english(suffix_prompt.strip())

        result_parts = []
        if eng_prefix:
            result_parts.append(eng_prefix)
        if final_prompt:
            result_parts.append(final_prompt)
        if eng_suffix:
            result_parts.append(eng_suffix)

        separator = ", " if format.startswith("Comma") else "\n\n"
        full_output = separator.join(result_parts)
        
        raw_json_str = grid_data if isinstance(grid_data, str) else json.dumps(grid_data, ensure_ascii=False)
        return (full_output, aspect_ratio, raw_json_str)
