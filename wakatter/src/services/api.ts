import { SuccessResult, ErrorResult } from '@/src/types'

export const fetchWakaForEmotion = async (emotion: string): Promise<SuccessResult | ErrorResult> => {
    const res = await fetch("/api/search", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ emotion }),
    })

    const data = await res.json();
    return data
}