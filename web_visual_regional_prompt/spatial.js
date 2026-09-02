/**
 * 공간 위치 명명 및 다중 AI 포맷 생성 모듈
 */

/**
 * 최신 AI(Krea, Midjourney, Flux, SD3, GPT)가 숫자/기호 아티팩트를 출력하지 않도록 순수 자연어 공간 위치 서술어 반환
 */
export function getNaturalSpatialName(c1, c2, r1, r2, totalCols, totalRows) {
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

/**
 * 구조화 태그 및 바운딩 박스용 상세 좌표/퍼센트 정보 생성 함수
 */
export function getSpatialDescription(c1, c2, r1, r2, totalCols, totalRows) {
  const colSpan = (c2 - c1 + 1) / totalCols;
  const rowSpan = (r2 - r1 + 1) / totalRows;
  const colCenter = (c1 + c2 + 1) / (2.0 * totalCols);
  const rowCenter = (r1 + r2 + 1) / (2.0 * totalRows);

  const pctLeft = Math.round((c1 / totalCols) * 100);
  const pctRight = Math.round(((c2 + 1) / totalCols) * 100);
  const pctTop = Math.round((r1 / totalRows) * 100);
  const pctBottom = Math.round(((r2 + 1) / totalRows) * 100);

  let dirName = "Center";
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
    pctLeft,
    pctRight,
    pctTop,
    pctBottom,
    bbox: [
      Number((c1 / totalCols).toFixed(2)),
      Number((r1 / totalRows).toFixed(2)),
      Number(((c2 + 1) / totalCols).toFixed(2)),
      Number(((r2 + 1) / totalRows).toFixed(2))
    ]
  };
}

/**
 * 다양한 AI 엔진 및 포맷별 최종 프롬프트 조합기
 */
export function buildFinalPrompt({
  areas,
  cols,
  rows,
  aspectRatio,
  format,
  whiteBg,
  gridBorders,
  characterSheetStyle,
  prefixPrompt,
  suffixPrompt,
  characterProfile
}) {
  const validAreas = areas.filter(a => (a.prompt || a.koPrompt || '').trim().length > 0);
  const sortedAreas = [...validAreas].sort((a, b) => a.id - b.id);
  const charProfileTrimmed = (characterProfile || "").trim();

  let bodyPrompt = "";

  if (sortedAreas.length === 0) {
    // 영역이 없을 때 prefix + characterProfile + suffix
    const parts = [prefixPrompt, charProfileTrimmed, suffixPrompt].filter(Boolean);
    return parts.join(", ");
  }

  switch (format) {
    case "natural": {
      // Natural Spatial (Krea 2, MiniMax, Midjourney, SD3, GPT-4o, Gemini)
      const lines = [];
      lines.push(`A high-definition ${aspectRatio} multi-panel composition strictly partitioned into ${sortedAreas.length} proportional sections.`);
      
      // 인물/피사체 공통 묘사가 있을 때 최상단 앵커링 주입
      if (charProfileTrimmed) {
        lines.push(`[Subject / Character Profile & Visual Consistency]: ${charProfileTrimmed}, identical character features and costume maintained across all panels.`);
      }

      lines.push(`[Spatial Layout & Exact Proportional Placement]:`);

      for (const area of sortedAreas) {
        const desc = area.prompt.trim();
        const spatial = getNaturalSpatialName(area.c1, area.c2, area.r1, area.r2, cols, rows);
        lines.push(`- ${spatial}: ${desc}.`);
      }

      if (gridBorders) {
        lines.push(`[Multi-Panel Layout & Strict Proportional Scale]: Split-screen multi-panel collage layout strictly adhering to the exact percentage width and height boundaries specified above for each column and row without shifting, resizing, or distorting relative panel scales. Each panel is cleanly separated by crisp thin black divider lines, clean comic grid panels, pristine artwork without any text, labels, numbers, coordinates, or watermarks.`);
      } else {
        lines.push(`[Global Scene Coherence & Proportional Placement]: Seamlessly blended multi-region composition maintaining the exact spatial percentage boundaries and relative scale for each region, unified realistic lighting, cinematic perspective, and coherent environment bridging all regions, clean presentation without any text, labels, numbers, coordinates, or watermarks.`);
      }

      bodyPrompt = lines.join("\n");
      break;
    }

    case "comfyui_break": {
      // ComfyUI / SD Regional Prompting (BREAK syntax)
      const parts = [];
      if (charProfileTrimmed) {
        parts.push(`(${charProfileTrimmed}:1.15)`);
      }
      for (const area of sortedAreas) {
        const desc = area.prompt.trim();
        parts.push(`(${desc}:1.1)`);
      }
      bodyPrompt = parts.join(" BREAK\n");
      break;
    }

    case "structured": {
      // Structured Tags
      const lines = [];
      lines.push(`[Composition: ${aspectRatio} Grid Layout (${cols}x${rows})]`);
      if (charProfileTrimmed) {
        lines.push(`[Character Profile]: ${charProfileTrimmed}`);
      }
      for (const area of sortedAreas) {
        const desc = area.prompt.trim();
        const info = getSpatialDescription(area.c1, area.c2, area.r1, area.r2, cols, rows);
        lines.push(`[Area ${area.id} | ${info.direction.toUpperCase()} (${info.percent})]: ${desc}`);
      }
      bodyPrompt = lines.join("\n");
      break;
    }

    case "coordinates": {
      // Bounding Box Coordinates
      const lines = [];
      lines.push(`[Canvas Layout: ${aspectRatio} | Grid ${cols}x${rows}]`);
      if (charProfileTrimmed) {
        lines.push(`<character_profile>${charProfileTrimmed}</character_profile>`);
      }
      for (const area of sortedAreas) {
        const desc = area.prompt.trim();
        const info = getSpatialDescription(area.c1, area.c2, area.r1, area.r2, cols, rows);
        lines.push(`<area_${area.id} bbox="[${info.bbox.join(', ')}]"> ${desc} </area_${area.id}>`);
      }
      bodyPrompt = lines.join("\n");
      break;
    }

    case "comma": {
      // Comma-Separated List
      const descs = [];
      if (charProfileTrimmed) descs.push(charProfileTrimmed);
      sortedAreas.forEach(a => descs.push(a.prompt.trim()));
      bodyPrompt = descs.join(", ");
      break;
    }

    case "json": {
      // Raw JSON
      const jsonPayload = {
        aspectRatio,
        cols,
        rows,
        characterProfile: charProfileTrimmed || undefined,
        whiteBg,
        gridBorders,
        characterSheetStyle,
        prefixPrompt,
        suffixPrompt,
        areas: sortedAreas.map(a => ({
          id: a.id,
          grid: { c1: a.c1, c2: a.c2, r1: a.r1, r2: a.r2 },
          spatial: getNaturalSpatialName(a.c1, a.c2, a.r1, a.r2, cols, rows),
          prompt: a.prompt,
          koPrompt: a.koPrompt
        }))
      };
      return JSON.stringify(jsonPayload, null, 2);
    }
  }

  // 옵션 및 Prefix / Suffix 조합
  const extraTags = [];
  if (whiteBg) {
    extraTags.push("clean solid pure white background, studio white backdrop");
  }
  if (suffixPrompt && suffixPrompt.trim()) {
    extraTags.push(suffixPrompt.trim());
  }

  const combinedSuffix = extraTags.join(", ");

  const finalParts = [];
  if (prefixPrompt && prefixPrompt.trim()) {
    finalParts.push(prefixPrompt.trim());
  }
  if (bodyPrompt) {
    finalParts.push(bodyPrompt);
  }
  if (combinedSuffix) {
    finalParts.push(combinedSuffix);
  }

  const separator = (format === "comma") ? ", " : "\n\n";
  return finalParts.join(separator);
}

/**
 * 네거티브 프롬프트 자동 생성기 (글자/숫자 및 기형 방지)
 */
export function buildNegativePrompt({ gridBorders }) {
  const baseNegative = [
    "text",
    "watermark",
    "signature",
    "letters",
    "numbers",
    "labels",
    "captions",
    "bad anatomy",
    "bad hands",
    "missing fingers",
    "extra limbs",
    "blurry",
    "low quality",
    "worst quality",
    "distorted face",
    "deformed"
  ];

  if (!gridBorders) {
    baseNegative.push("unwanted frames", "ugly borders", "unwanted split screen");
  }

  return baseNegative.join(", ");
}
