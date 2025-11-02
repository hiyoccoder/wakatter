"use client"

import type React from "react"

import { useState } from "react"

export default function Home() {
  const [emotion, setEmotion] = useState("")
  const [tweets, setTweets] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const tips = [
    "もう少し具体的に！",
    "その気持ちの奥にあるものは？",
    "どんなシーンを思い浮かべますか？",
    "今日のできごとと一緒に教えて",
    "その感情の色は何色ですか？",
  ]

  const getRandomTip = () => {
    return tips[Math.floor(Math.random() * tips.length)]
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
        result: { error: "エラーが発生しました。もう一度お試しください。" },
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
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200 p-4 z-50">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
          <img src="/ico_wakatter.svg" alt="wakatter" className="h-6" />
        </div>
      </header>

      <div className="max-w-2xl mx-auto">
        {/* ヘッダー画像セクション */}
        <div className="relative h-48 bg-linear-to-r from-pink-100 via-blue-100 to-purple-100 overflow-hidden">
          {/* 背景 */}
          <img src="/bg_header.jpg" />
        </div>

        {/* wakatter紹介セクション */}
        <div className="border-b border-gray-200 px-6 py-4 bg-gray-50/30 relative">
          <div className="flex gap-4">
            {/* wakatterアイコン - ヘッダー画像に半円オーバーラップ */}
            <div className="w-16 h-16 rounded-full bg-linear-to-br from-pink-400 via-purple-500 to-blue-600 flex items-center justify-center shrink-0 border-4 border-white relative z-10 -mt-8">
              <span className="text-white font-bold text-xl"><img src="/img_wakatter.svg" /></span>
            </div>
            
            {/* プロフィール情報 */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-bold text-black">wakatter</h2>
              </div>
              <p className="text-gray-600 text-sm mb-4">@wakatter_official</p>
              
              <div className="mb-4">
                <p className="text-black leading-relaxed mb-2">
                  1000年前の誰かが"わかってくれる"
                </p>
                <p className="text-gray-700 text-sm leading-relaxed mb-2">
                  あなたの今の気持ちに共鳴する千年前の和歌を見つけます。<br></br>古今和歌集1000首の中から、心に寄り添う一首をお届けします。
                </p>
                <p className="text-gray-600 text-xs leading-relaxed relative pl-4">
                  <span className="absolute left-0">※</span>
                  現代語訳・解説はChatGPTによる自動生成を使用しています。
                  大きな誤りがないか確認していますが、人による目視確認のため完璧ではない場合があります。
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-gray-600 text-sm">
                <div className="flex items-center gap-1">
                  <span><img src="/ico_era.svg" alt="" className="h-4" /></span>
                  <span>平安時代〜現代</span>
                </div>
                <div className="flex items-center gap-1">
                  <span><img src="/ico_src.svg" alt="" className="h-4" /></span>
                  <span><a href="https://www.waka-chokusen.org/" target="_blank" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200">和歌データベース</a></span>
                </div>
                <div className="flex items-center gap-1">
                  <span><img src="/ico_ai.svg" alt="" className="h-4" /></span>
                  <span>OpenAI搭載</span>
                </div>
              </div>
              
              <div className="flex items-center gap-6 text-sm mt-3">
                <div>
                  <span className="font-bold text-black">1,000</span>
                  <span className="text-gray-600 ml-1">和歌</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* 使い方のヒント */}
          <div className="mt-4 p-4 bg-blue-100/50 rounded-xl border border-blue-200/50">
            <div className="flex items-center gap-0.5 mb-2">
              <div className="w-6 h-6 flex items-center justify-center shrink-0">
                <span><img src="/ico_hint.svg" alt="" className="h-4" /></span>
              </div>
              <p className="text-blue-700 font-bold text-sm">使い方のヒント</p>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              「悲しい」「嬉しい」「切ない」など、今の気持ちを自由につぶやいてみてください。<br></br>
              AIさんが古今和歌集から、あなたの心に響く一首を見つけてお返しします。
            </p>
          </div>
        </div>



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
                      <p className="waka-vertical font-serif text-xl text-center text-black">{tweet.result.match.text}</p>
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
                  <p className="text-black mb-3">🎤 {tweet.result.match.text}</p>
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
                  <p className="text-gray-700 mb-3">💡 <strong>{getRandomTip()}</strong></p>
                  <button 
                    onClick={() => setTweets(prev => prev.filter(t => t.id !== tweet.id))}
                    className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
                  >
                    もう一度投稿してみる →
                  </button>
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

      {/* Twitter風フッター */}
      <footer className=" p-4 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-gray-500 text-sm">copyright &copy; 2025 hiyoccoder All rights reserved.</p>
        </div>
      </footer>
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
