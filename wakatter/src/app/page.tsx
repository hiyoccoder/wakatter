"use client"

import type React from "react"

import { useState, useRef } from "react"
import Header from '@/src/components/layout/Header'
import Footer from '@/src/components/layout/Footer'
import { formatWaka } from '@/src/utils/formatters'
import { tips } from '@/src/utils/constants'
import Profile from '@/src/components/profile/Profile'

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
            {/* ユーザーの投稿ツイート */}
            <div className="border-b border-gray-200 p-4">
              <div className="flex gap-3">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                  <span className="text-white font-bold"><img src="/img_user.png" /></span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-2 flex-wrap gap-0 sm:gap-2">
                    <span className="font-bold text-black w-full sm:w-auto">あなた</span>
                    <span className="text-gray-500">@user</span>
                    <span className="text-gray-500">·</span>
                    <span className="text-gray-500 text-sm">{tweet.timestamp.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <p className="text-black mb-3">{tweet.emotion}</p>
                  <div className="flex items-center gap-6 text-gray-500 text-sm">
                    <button className="flex items-center gap-2">
                      <span><img src="/ico_balloon.svg" alt="" className="h-4" /></span>
                      <span>3</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 和歌botのリプライ */}
            <div className="border-b border-gray-200 p-4 bg-gray-50/50">
              <div className="flex gap-3">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-pink-400 via-purple-500 to-blue-600 flex items-center justify-center">
                  <span className="text-white font-bold"><img src="/img_wakatter.svg" /></span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-2 flex-wrap gap-0 sm:gap-2">
                    <span className="font-bold text-black w-full sm:w-auto">wakatter</span>
                    <span className="text-gray-500">@wakatter</span>
                    <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">bot</span>
                    <span className="text-gray-500">·</span>
                    <span className="text-gray-500 text-sm">{tweet.timestamp.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <div className="bg-gray-100 rounded-2xl p-6 mb-3">
                    <div className="flex justify-center mb-4">
                      <p className="waka-vertical font-serif text-xl text-center text-black whitespace-pre-line">{formatWaka(tweet.result.match.text)}</p>
                    </div>
                    <p className="text-gray-600 text-center mb-2">— {tweet.result.match.author}</p>
                    <div className="border-t border-gray-300 pt-3 mt-3">
                      <p className="text-gray-700 text-sm">{tweet.result.match.modern}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-gray-500 text-sm">
                    <button className="flex items-center gap-2">
                      <span><img src="/ico_balloon.svg" alt="" className="h-4" /></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* AI解析botのリプライ */}
            <div className="border-b border-gray-200 p-4">
              <div className="flex gap-3">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-green-500 to-blue-500 flex items-center justify-center">
                  <span className="text-white font-bold"><img src="/img_empathy.png" /></span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-2 flex-wrap gap-0 sm:gap-2">
                    <span className="font-bold text-black w-full sm:w-auto">共通点発見AIさん</span>
                    <span className="text-gray-500">@empathy_ai</span>
                    <span className="bg-purple-500 text-white text-xs px-2 py-0.5 rounded-full">bot</span>
                    <span className="text-gray-500">·</span>
                    <span className="text-gray-500 text-sm">{tweet.timestamp.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <p className="text-black mb-3">🎤 {formatWaka(tweet.result.match.text)}</p>
                  <p className="text-black mb-3">✨ {tweet.result.reasoning}</p>
                  <div className="flex items-center gap-6 text-gray-500 text-sm">
                    <button className="flex items-center gap-2">
                      <span><img src="/ico_balloon.svg" alt="" className="h-4" /></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 和歌解説botのリプライ（条件付き） */}
            {tweet.result.match.waka_commentary && (
              <div className="border-b border-gray-200 p-4 bg-gray-50/30">
                <div className="flex gap-3">
                  <div className="w-12 h-12 rounded-full bg-linear-to-br from-orange-500 to-red-500 flex items-center justify-center">
                    <span className="text-white font-bold"><img src="/img_guide.png" /></span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-2 flex-wrap gap-0 sm:gap-2">
                    <span className="font-bold text-black w-full sm:w-auto">古典解説botさん</span>
                      <span className="text-gray-500">@classic_guide</span>
                      <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">bot</span>
                      <span className="text-gray-500">·</span>
                      <span className="text-gray-500 text-sm">{tweet.timestamp.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <p className="text-black mb-3">📚 {tweet.result.match.waka_commentary}</p>
                    <div className="flex items-center gap-6 text-gray-500 text-sm">
                      <button className="flex items-center gap-2">
                        <span><img src="/ico_balloon.svg" alt="" className="h-4" /></span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 歌人紹介botのリプライ（条件付き） */}
            {tweet.result.match.person_intro && (
              <div className="border-b border-gray-200 p-4">
                <div className="flex gap-3">
                  <div className="w-12 h-12 rounded-full bg-linear-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                    <span className="text-white font-bold"><img src="/img_poet.png" /></span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-2 flex-wrap gap-0 sm:gap-2">
                    <span className="font-bold text-black w-full sm:w-auto">通りすがりの歌人解説者さん</span>
                      <span className="text-gray-500">@poet_db</span>
                      <span className="bg-indigo-500 text-white text-xs px-2 py-0.5 rounded-full">bot</span>
                      <span className="text-gray-500">・</span>
                      <span className="text-gray-500 text-sm">{tweet.timestamp.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <p className="text-black mb-3">🏛️ {tweet.result.match.person_intro}</p>
                    <div className="flex items-center gap-6 text-gray-500 text-sm">
                      <button className="flex items-center gap-2">
                        <span><img src="/ico_balloon.svg" alt="" className="h-4" /></span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          ) : null
        )}
        
        {/* エラーツイート表示 */}
        {tweets.map((tweet) => (
          tweet.result && tweet.result.error ? (
          <div key={tweet.id} className="animate-fadeIn">
            {/* ユーザーの投稿 */}
            <div className="border-b border-gray-200 p-4">
              <div className="flex gap-3">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                  <span className="text-white font-bold"><img src="/img_user.png" /></span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-black">あなた</span>
                    <span className="text-gray-500">@user</span>
                    <span className="text-gray-500">·</span>
                    <span className="text-gray-500 text-sm">{tweet.timestamp.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <p className="text-black mb-3">{tweet.emotion}</p>
                  <div className="flex items-center gap-6 text-gray-500 text-sm">
                    <button className="flex items-center gap-2">
                      <span><img src="/ico_balloon.svg" alt="" className="h-4" /></span>
                      <span>1</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* wakatterサポートのリプライ */}
            <div className="border-b border-gray-200 p-4 bg-gray-50/30">
              <div className="flex gap-3">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                  <span className="text-white font-bold">🤔</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-black">wakatterサポート</span>
                    <span className="text-gray-500">@wakatter_help</span>
                    <span className="bg-yellow-600 text-white text-xs px-2 py-0.5 rounded-full">サポート</span>
                    <span className="text-gray-500">·</span>
                    <span className="text-gray-500 text-sm">{tweet.timestamp.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <p className="text-black mb-2">{tweet.result.error}</p>
                  <p className="text-gray-700 mb-3">💡 <strong>{tweet.result.tip || getFixedTip(tweet.id)}</strong></p>
                  <div className="flex items-center gap-6 text-gray-500 text-sm mt-3">
                    <button className="flex items-center gap-2">
                      <span><img src="/ico_balloon.svg" alt="" className="h-4" /></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          ) : null
        ))}
        
        {/* 呟き投稿エリア */}
        <div className="bg-white border border-gray-200">
          <div className="flex px-4 py-4">
            <div className="shrink-0 mr-3">
              <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                <span className="text-white text-sm font-bold"><img src="/img_user.png" /></span>
              </div>
            </div>
            <form onSubmit={handleSearch} className="flex-1">
              <textarea
                className="w-full text-xl placeholder-gray-500 resize-none border-none outline-none bg-transparent text-black"
                placeholder="今どんな気持ち？"
                value={emotion}
                onChange={(e) => setEmotion(e.target.value)}
                rows={3}
              />
              <div className="flex justify-end items-center mt-3 pt-3 border-t border-gray-100">
                <button
                  type="submit"
                  disabled={!emotion.trim() || loading}
                  className="bg-blue-500 text-white px-6 py-2 rounded-full font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
                >
                  {loading ? "投稿中..." : "ひとりごつ"}
                </button>
              </div>
            </form>
          </div>
        </div>
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
