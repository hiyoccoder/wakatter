import fs from "fs";
import wakas from "../data/wakas.json" assert { type: "json" };

// 定型文のキーワード
const MODERN_PLACEHOLDER = "情景や心情を詠んだ和歌です";
const PERSON_PLACEHOLDER = "詳細は不明ですが";
const COMMENT_PLACEHOLDER = "古今和歌集に見られる典型的な題材";

const filtered = wakas.filter(
  (w: any) =>
    w.modern?.includes(MODERN_PLACEHOLDER) ||
    w.person_intro?.includes(PERSON_PLACEHOLDER) ||
    w.waka_commentary?.includes(COMMENT_PLACEHOLDER)
);

fs.writeFileSync("./data/wakas_to_fix.json", JSON.stringify(filtered, null, 2), "utf-8");

console.log(`🪶 修正対象: ${filtered.length} 首を抽出しました！`);
console.log("📁 data/wakas_to_fix.json に出力されました。");