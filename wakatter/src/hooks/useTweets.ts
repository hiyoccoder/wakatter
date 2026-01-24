import { useState, useRef } from 'react'
import { Tweet } from '@/src/types'
import { tips } from '@/src/utils/constants'

export const useTweets = () => {
    // 状態管理
    const [tweets, setTweets] = useState<Tweet[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const fixedTipsRef = useRef<{ [key: number]: string }>({})

    // ヘルパー関数
    const getRandomTip = () => {
        return tips[Math.floor(Math.random() * tips.length)]
    }

    const getFixedTip = (tweetId: number) => {
        if (!fixedTipsRef.current[tweetId]) {
        fixedTipsRef.current[tweetId] = getRandomTip()
        }
        return fixedTipsRef.current[tweetId]
    }

    const handleSearch = async (emotion: string) => {
        if (!emotion.trim()) return

        setLoading(true)

        try {
        const res = await fetch("/api/search", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ emotion }),
        })

        const data = await res.json()
        
        // 新しいツイートを配列の末尾に追加
        const newTweet = {
            id: Date.now(),
            emotion: emotion,
            result: data,
            timestamp: new Date()
        }
        setTweets(prev => [...prev, newTweet])
        } catch (err) {
        console.error(err)
        // エラーの場合もツイートとして追加
        const errorTweet = {
            id: Date.now(),
            emotion: emotion,
            result: { 
            error: "エラーが発生しました。もう一度お試しください。",
            tip: getRandomTip() // エラー発生時にヒントを固定
            },
            timestamp: new Date()
        }
        setTweets(prev => [...prev, errorTweet])
        } finally {
        setLoading(false)
        }
    }

    // 外部から使えるように返す
    return {
        tweets,
        loading,
        getFixedTip,
        handleSearch
    }
}