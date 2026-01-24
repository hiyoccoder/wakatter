import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";
import { summarizeInstruction, empathyInstruction } from "@/src/lib/prompt";

const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
);
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
    const { emotion } = await req.json();

    // 感情の要約
    const summarizeRes = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: summarizeInstruction,
            },
            {
                role: "user",
                content: `「${emotion}」`
            }
        ]
    });

    const summarized = summarizeRes.choices[0].message.content?.trim();

    // Embedding生成
    const embeddingRes = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: summarized!,
    });
    const queryEmbedding = embeddingRes.data[0].embedding;

    // 和歌検索
    const { data, error } = await supabase.rpc("match_wakas", {
        query_embedding: queryEmbedding,
        match_threshold: 0.3,
        match_count: 1,
    });
    
    if (error || !data?.length) {
        return NextResponse.json({ error: "和歌が見つかりませんでした。" });
    }
    
    const top = data[0];
    console.log('Supabaseから取得したデータ:', top); // デバッグ用

    // 共鳴ポイントの分析（口調を変更）
    const reasoningRes = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: empathyInstruction
            },
            {
                role: "user",
                content: `ユーザーの気持ち：「${summarized}」
                和歌：「${top.text}」
                現代語訳：「${top.modern}」
                ${top.waka_commentary ? `和歌の解説：「${top.waka_commentary}」` : ''}
                ${top.person_intro ? `歌人について：「${top.person_intro}」` : ''}

                あなたの感情とこの和歌が共鳴しているポイントを、分析的な口調で3〜4文で説明してください。
                - 和歌の解説や歌人の背景情報がある場合は、それを参考にしてより深い共鳴ポイントを見つける
                - ユーザーの感情を主語にして語る
                - 「〜という点で共鳴しています」「〜が呼応しています」などの表現を使用
                - 接続詞は自然に使い、「やはり」などの不要な言葉は避ける
                - 出力は引用符で囲まず、プレーンテキストで
                - 文章全体を「」で囲まない
                - 結論めいた締めくくりは避ける`
            }
        ]
    });
    const reasoning = reasoningRes.choices[0].message.content;

    const response = {
  match: {
    text: top.text,
    author: top.author,
    modern: top.modern,
    person_intro: top.person_intro,
    waka_commentary: top.waka_commentary
  },
  reasoning
};

console.log('返すレスポンス:', response); // デバッグ用

return NextResponse.json(response);
}