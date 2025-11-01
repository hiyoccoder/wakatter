import fs from "fs";
import path from "path";

const wakaPath = path.resolve("./data/wakas_src.json");
const fixedPath = path.resolve("./data/wakas_filter_retouch.json"); // ChatGPT修正版を保存

const original: any[] = JSON.parse(fs.readFileSync(wakaPath, "utf-8"));
const fixed: any[] = JSON.parse(fs.readFileSync(fixedPath, "utf-8"));

// id をキーにして置き換え
const fixedMap = new Map<number, any>(fixed.map((w) => [w.id, w]));

const merged = original.map((w) => {
  const f = fixedMap.get(w.id);
  if (f) {
    return {
      ...w,
      modern: f.modern,
      person_intro: f.person_intro,
      waka_commentary: f.waka_commentary,
    };
  }
  return w;
});

const outPath = "./data/wakas_fix.json";
fs.writeFileSync(outPath, JSON.stringify(merged, null, 2), "utf-8");

console.log(`✅ 修正版 ${fixed.length} 首を統合しました！`);
console.log(`📄 出力ファイル: ${outPath}`);