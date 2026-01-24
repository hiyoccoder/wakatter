import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { createClient } from "@supabase/supabase-js";
import wakas from "../data/wakas.json" assert {type: "json"};
import { generateEmbedding } from "@/src/services/openai";

const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

(async () => {
    console.log(`🪶 ${wakas.length} 首のEmbeddingを生成します...\n`);

    for (const waka of wakas) {
        const input = `${waka.text} ${waka.modern}`;

        const embedding = await generateEmbedding(input);

        const { error } = await supabase.from("wakas").upsert({
            id: waka.id,
            category: waka.category,
            subcategory: waka.subcategory,
            text: waka.text,
            author: waka.author,
            modern: waka.modern,
            person_intro: waka.person_intro,
            waka_commentary: waka.waka_commentary,
            embedding,
        });
        
        if (error) console.error(`❌ ${waka.id}: ${error.message}`);
        else console.log(`✅ 登録完了: ${waka.id}「${waka.text.slice(0, 10)}...」`);

        // 💡 OpenAIのRateLimit防止
        await new Promise((r) => setTimeout(r, 1000));
    }
    console.log("\n🎉 すべての和歌がSupabaseに登録されました！");
})();
