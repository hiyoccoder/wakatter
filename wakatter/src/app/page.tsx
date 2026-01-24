"use client"

import type React from "react"

import { useState, useRef } from "react"
import Header from '@/src/components/layout/Header'
import Footer from '@/src/components/layout/Footer'
import { tips } from '@/src/utils/constants'
import Profile from '@/src/components/profile/Profile'
import TweetInput from '@/src/components/tweet/TweetInput'
import UserTweet from '@/src/components/tweet/UserTweet'
import WakatterReply from '@/src/components/tweet/WakatterReply'
import EmpathyReply from '@/src/components/tweet/EmpathyReply'
import ClassicGuideReply from '@/src/components/tweet/ClassicGuideReply'
import PoetIntroReply from '@/src/components/tweet/PoetIntroReply'
import ErrorReply from '@/src/components/tweet/ErrorReply'

export default function Home() {
  const [emotion, setEmotion] = useState("")
  const [tweets, setTweets] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  
  // 一度決定されたヒントを永続的に保存するRef
  const fixedTipsRef = useRef<{ [key: number]: string }>({})

  const getRandomTip = () => {
    return tips[Math.floor(Math.random() * tips.length)]
  }

  // エラーツイート用の固定ヒントを取得（一度決定されたら変更されない）
  const getFixedTip = (tweetId: number) => {
    if (!fixedTipsRef.current[tweetId]) {
      fixedTipsRef.current[tweetId] = getRandomTip()
    }
    return fixedTipsRef.current[tweetId]
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
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
      setEmotion("") // 入力欄をクリア
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
      setEmotion("")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-white text-black">
      {/* Twitter風ヘッダー */}

      <div className="max-w-2xl mx-auto">
        <Header />
        <div className="relative h-48 bg-linear-to-r from-pink-100 via-blue-100 to-purple-100 overflow-hidden">
          {/* 背景 */}
          <img src="/bg_header.jpg" />
        </div>

        <Profile />

        {/* ツイートスレッド表示 */}
        {tweets.map((tweet) => 
          tweet.result && !tweet.result.error ? (
          <div key={tweet.id} className="animate-fadeIn">

            <UserTweet emotion={tweet.emotion} timestamp={tweet.timestamp} />

            <WakatterReply timestamp={tweet.timestamp} wakaText={tweet.result.match.text} author={tweet.result.match.author} modern={tweet.result.match.modern} />

            <EmpathyReply timestamp={tweet.timestamp} wakaText={tweet.result.match.text} reasoning={tweet.result.reasoning} />

            {tweet.result.match.waka_commentary && (
            <ClassicGuideReply timestamp={tweet.timestamp} wakaCommentary={tweet.result.match.waka_commentary} />
            )}

            {tweet.result.match.person_intro && (
              <PoetIntroReply timestamp={tweet.timestamp} wakaCommentary={tweet.result.match.person_intro} />
            )}
          </div>
          ) : null
        )}
        
        {/* エラーツイート表示 */}
        {tweets.map((tweet) => (
          tweet.result && tweet.result.error ? (
            <ErrorReply id={tweet.id} timestamp={tweet.timestamp} emotion={tweet.emotion} error={tweet.result.error} tip={tweet.result.tip || getFixedTip(tweet.id)} />
          ) : null
        ))}

        <TweetInput emotion={emotion} setEmotion={setEmotion} loading={loading} onSubmit={handleSearch} />
      </div>
      <Footer />
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </main>
  )
}
