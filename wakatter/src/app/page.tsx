"use client"

import type React from "react"

import { useState } from "react"
import Header from '@/src/components/layout/Header'
import Footer from '@/src/components/layout/Footer'
import Profile from '@/src/components/profile/Profile'
import TweetInput from '@/src/components/tweet/TweetInput'
import UserTweet from '@/src/components/tweet/UserTweet'
import WakatterReply from '@/src/components/tweet/WakatterReply'
import EmpathyReply from '@/src/components/tweet/EmpathyReply'
import ClassicGuideReply from '@/src/components/tweet/ClassicGuideReply'
import PoetIntroReply from '@/src/components/tweet/PoetIntroReply'
import SupportReply from '@/src/components/tweet/SupportReply'
import { isSuccessResult, isErrorResult } from '@/src/types'
import { useTweets } from '@/src/hooks/useTweets'

export default function Home() {
  const [emotion, setEmotion] = useState<string>("")
  const { tweets, loading, getFixedTip, handleSearch } = useTweets()

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await handleSearch(emotion)
    setEmotion("")
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
          isSuccessResult(tweet.result) ? (
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
          isErrorResult(tweet.result) ? (
            <div key={tweet.id} className="animate-fadeIn">
              <UserTweet emotion={tweet.emotion} timestamp={tweet.timestamp} />
              <SupportReply timestamp={tweet.timestamp} error={tweet.result.error} tip={tweet.result.tip || getFixedTip(tweet.id)} />
            </div>
          ) : null
        ))}

        <TweetInput emotion={emotion} setEmotion={setEmotion} loading={loading} onSubmit={handleSearchSubmit} />
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
