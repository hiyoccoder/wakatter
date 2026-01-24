import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function generateEmbedding(text: string): Promise<number[]> {
  const embeddingRes = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
  });
  
  return embeddingRes.data[0].embedding;
}