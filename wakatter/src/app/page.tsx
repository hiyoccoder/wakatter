"use client"

import type React from "react"

import { useState } from "react"

export default function Home() {
  const [emotion, setEmotion] = useState("")
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const tips = [
    "この時どう思った？",
    "もう少し具体的に！",
    "その気持ちの奥にあるものは？",
    "どんなシーンを思い浮かべますか？",
    "心の声を聞かせて",
    "今日のできごとと一緒に教えて",
    "その感情の色は何色ですか？",
    "一言で表すと？"
  ]

  const getRandomTip = () => {
    return tips[Math.floor(Math.random() * tips.length)]
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!emotion.trim()) return

    setLoading(true)
    setResult(null)

    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emotion }),
      })

      const data = await res.json()
      setResult(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center relative overflow-hidden">
      {/* 波紋エフェクト背景 */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-white animate-ping"
          style={{ animationDuration: "3s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] rounded-full border border-white animate-ping"
          style={{ animationDuration: "4s", animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full border border-white animate-ping"
          style={{ animationDuration: "5s", animationDelay: "1s" }}
        ></div>
      </div>

      <div className="max-w-2xl w-full relative z-10">
        <h1 className="text-4xl font-bold mb-8 text-center tracking-wider">wakatter</h1>
        <p className="text-center text-gray-400 mb-8 text-sm">
          古今和歌集1000首から、<br></br>あなたの今の気持ちに共鳴する和歌を見つけます。
        </p>

        <form onSubmit={handleSearch} className="flex gap-3 mb-12">
          <input
            type="text"
            placeholder="今の気持ちを入力してください..."
            value={emotion}
            onChange={(e) => setEmotion(e.target.value)}
            className="flex-1 bg-gray-900 border border-gray-700 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent placeholder-gray-500 text-white"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-white text-black px-8 py-4 rounded-lg font-medium hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-black rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
                  <div className="w-1 h-1 bg-black rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  <div className="w-1 h-1 bg-black rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                </div>
                <span className="ml-1">共鳴中</span>
              </>
            ) : (
              "探す"
            )}
          </button>
        </form>

        {result && !result.error && (
          <div className="space-y-8 animate-fadeIn">
            <div className="waka-card bg-gradient-to-br from-gray-900 to-black border-gray-800 p-8 shadow-2xl">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-white animate-pulse"></div>
                <h2 className="text-gray-400 text-sm tracking-widest">共鳴した和歌</h2>
              </div>

              <div className="flex justify-center my-8">
                <p className="waka-vertical font-serif text-xl">{result.match.text}</p>
              </div>
              <p className="text-gray-400 mb-6 text-center">— {result.match.author}</p>
              <div className="border-t border-gray-800 pt-4">
                <p className="text-gray-300 text-sm leading-relaxed">{result.match.modern}</p>
              </div>
            </div>

            {/* 共鳴ポイント - メインハイライト */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm p-8">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-lg">✨</span>
                </div>
                <div>
                  <h3 className="text-white font-medium mb-4 tracking-wide">共鳴の分析</h3>
                  <p className="text-gray-200 leading-relaxed">{result.reasoning}</p>
                </div>
              </div>
            </div>

            {/* 和歌の解説 - 左側インデント */}
            {result.match.waka_commentary && (
              <div className="relative pl-8">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-white/30 to-transparent rounded-full"></div>
                <div className="bg-black/20 rounded-xl p-6 backdrop-blur-sm">
                  <h3 className="text-gray-400 text-sm mb-3 tracking-wide flex items-center gap-2">
                    <span>📖</span>
                    和歌の解説
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-sm">{result.match.waka_commentary}</p>
                </div>
              </div>
            )}

            {/* 歌人の解説 - 右側インデント */}
            {result.match.person_intro && (
              <div className="relative pr-8">
                <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-white/30 to-transparent rounded-full"></div>
                <div className="bg-black/20 rounded-xl p-6 backdrop-blur-sm ml-8">
                  <h3 className="text-gray-400 text-sm mb-3 tracking-wide flex items-center gap-2">
                    <span>👤</span>
                    歌人について
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-sm">{result.match.person_intro}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {result?.error && (
          <div className="text-center mt-8 animate-fadeIn">
            <div className="bg-gray-900/30 rounded-xl p-6 backdrop-blur-sm">
              <div className="mb-4">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-800 flex items-center justify-center">
                  <span className="text-2xl">🤔</span>
                </div>
                <p className="text-gray-300 mb-4">{result.error}</p>
              </div>
              
              <div className="border-t border-gray-800 pt-4">
                <p className="text-gray-400 text-sm mb-2">ヒント</p>
                <p className="text-white font-medium">{getRandomTip()}</p>
              </div>
              
              <button 
                onClick={() => setResult(null)}
                className="mt-4 text-gray-400 hover:text-white text-sm transition-colors"
              >
                もう一度試す
              </button>
            </div>
          </div>
        )}
      </div>

      <footer className="mt-16 text-gray-600 text-xs relative z-10">© 2025 wakatter | 感情と和歌をつなぐ</footer>

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
