import { NextResponse } from "next/server";
import {createClient} from "@supabase/supabase-js";
import OpenAI from "openai";
import { summarizeInstruction, empathyInstruction } from "@/lib/prompt";

const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
);
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request){
    const { emotion } = await req.json();

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

    const embeddingRes = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: summarized!,
    });
    const queryEmbedding = embeddingRes.data[0].embedding;

    const {data,error}=await supabase.rpc("match_wakas",{
        query_embedding:queryEmbedding,
        match_threshold:0.3,
        match_count:3
    });
    if (error || !data?.length) {
        return NextResponse.json({ error: "和歌が見つかりませんでした。" });
    }
    const top = data[0];

    const reasoningRes = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: empathyInstruction
            },
            {
                role: "user",
                content: `ユーザーの気持ち：「${summarized}」\n和歌：「${top.text}」\n現代語訳：「${top.modern}」\nこの気持ちと和歌の共通点を、自然でやさしい日本語で3文くらいで説明して。`
            }
        ]
    });

    const reasoning = reasoningRes.choices[0].message.content;

    return NextResponse.json({
        emotion_summary: summarized,
        match: top,
        reasoning
    });
}