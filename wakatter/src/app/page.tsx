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
    <main className="min-h-screen bg-white text-black">
      {/* Twitter風ヘッダー */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200 p-4 z-50">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <img src="/ico_wakatter.svg" alt="wakatter" className="h-6" />
          <div className="text-xs text-gray-600">古今和歌集から今の感情にぴったりな和歌を発見</div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto">
        {/* ヘッダー画像セクション */}
        <div className="relative h-48 bg-gradient-to-r from-pink-100 via-blue-100 to-purple-100 overflow-hidden">
          {/* 背景パターン */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-16.569 13.431-30 30-30v60c-16.569 0-30-13.431-30-30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>
          
          {/* 和歌的な装飾要素 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-gray-700/70 text-6xl font-serif mb-2">桜</div>
              <div className="text-gray-600/80 text-sm tracking-wider">古今和歌集</div>
            </div>
          </div>
          
          {/* 右下の装飾 */}
          <div className="absolute bottom-4 right-4 text-gray-400/50 text-2xl">
            🌸
          </div>
          
          {/* 左上の装飾 */}
          <div className="absolute top-4 left-4 text-gray-400/50 text-xl">
            📜
          </div>
          
          {/* グラデーションオーバーレイ */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-white/20"></div>
        </div>

        {/* wakatter紹介セクション */}
        <div className="border-b border-gray-200 p-6 bg-gray-50/30 relative">
          <div className="flex gap-4">
            {/* wakatterアイコン - ヘッダー画像に半円オーバーラップ */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 via-purple-500 to-blue-600 flex items-center justify-center flex-shrink-0 border-4 border-white relative z-10 -mt-8">
              <span className="text-white font-bold text-xl">歌</span>
            </div>
            
            {/* プロフィール情報 */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-xl font-bold text-black">wakatter</h2>
                <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">公式</div>
              </div>
              <p className="text-gray-600 text-sm mb-1">@wakatter_official</p>
              
              <div className="mb-4">
                <p className="text-black leading-relaxed mb-2">
                  感情と古今和歌集をつなぐソーシャルプラットフォーム 🌸
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  あなたの今の気持ちに共鳴する千年前の和歌を見つけます。AI が古今和歌集1000首の中から、心の琴線に触れる一首を選んでお届け。
                </p>
              </div>
              
              <div className="flex items-center gap-6 text-gray-600 text-sm">
                <div className="flex items-center gap-1">
                  <span>📍</span>
                  <span>平安時代〜現代</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>🎌</span>
                  <span>古今和歌集</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>🤖</span>
                  <span>AI搭載</span>
                </div>
              </div>
              
              <div className="flex items-center gap-6 text-sm mt-3">
                <div>
                  <span className="font-bold text-black">1,000</span>
                  <span className="text-gray-600 ml-1">和歌</span>
                </div>
                <div>
                  <span className="font-bold text-black">∞</span>
                  <span className="text-gray-600 ml-1">共鳴</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* 使い方のヒント */}
          <div className="mt-4 p-4 bg-blue-100/50 rounded-xl border border-blue-200/50">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs">💡</span>
              </div>
              <div>
                <p className="text-blue-700 font-medium text-sm mb-1">使い方</p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  「悲しい」「嬉しい」「切ない」など、今の気持ちを自由につぶやいてみてください。
                  AIが古今和歌集から、あなたの心に響く一首を見つけてお返しします。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ツイート投稿エリア */}
        <div className="border-b border-gray-200 p-4">
          <div className="flex gap-3">
            {/* ユーザーアバター */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold">あ</span>
            </div>
            
            {/* ツイート入力エリア */}
            <div className="flex-1">
              <form onSubmit={handleSearch} className="space-y-4">
                <textarea
                  placeholder="今の気持ちをつぶやいてみて..."
                  value={emotion}
                  onChange={(e) => setEmotion(e.target.value)}
                  className="w-full bg-transparent text-xl placeholder-gray-500 resize-none border-none outline-none min-h-[120px] text-black"
                  rows={3}
                />
                
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <div className="flex items-center gap-4 text-blue-400">
                    <span className="text-sm">🎌</span>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading || !emotion.trim()}
                    className="bg-blue-500 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="flex gap-1">
                          <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
                          <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                          <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                        </div>
                        <span>投稿中</span>
                      </>
                    ) : (
                      "ツイート"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* ツイートスレッド表示 */}
        {result && !result.error && (
          <div className="animate-fadeIn">
            {/* ユーザーの投稿ツイート */}
            <div className="border-b border-gray-200 p-4">
              <div className="flex gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                  <span className="text-white font-bold">あ</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-black">あなた</span>
                    <span className="text-gray-500">@user</span>
                    <span className="text-gray-500">·</span>
                    <span className="text-gray-500 text-sm">今</span>
                  </div>
                  <p className="text-black mb-3">{emotion}</p>
                  <div className="flex items-center gap-6 text-gray-500 text-sm">
                    <button className="flex items-center gap-2 hover:text-blue-400 transition">
                      <span>💬</span>
                      <span>3</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-green-400 transition">
                      <span>🔄</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-red-400 transition">
                      <span>❤️</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-blue-400 transition">
                      <span>📤</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 和歌botのリプライ */}
            <div className="border-b border-gray-200 p-4 bg-gray-50/50">
              <div className="flex gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center">
                  <span className="text-white font-bold">歌</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-black">和歌bot</span>
                    <span className="text-gray-500">@wakabot</span>
                    <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">bot</span>
                    <span className="text-gray-500">·</span>
                    <span className="text-gray-500 text-sm">今</span>
                  </div>
                  <div className="bg-gray-100 rounded-2xl p-6 mb-3">
                    <div className="flex justify-center mb-4">
                      <p className="waka-vertical font-serif text-xl text-center text-black">{result.match.text}</p>
                    </div>
                    <p className="text-gray-600 text-center mb-2">— {result.match.author}</p>
                    <div className="border-t border-gray-300 pt-3 mt-3">
                      <p className="text-gray-700 text-sm">{result.match.modern}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-gray-500 text-sm">
                    <button className="flex items-center gap-2 hover:text-blue-400 transition">
                      <span>💬</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-green-400 transition">
                      <span>🔄</span>
                      <span>12</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-red-400 transition">
                      <span>❤️</span>
                      <span>28</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-blue-400 transition">
                      <span>📤</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* AI解析botのリプライ */}
            <div className="border-b border-gray-200 p-4">
              <div className="flex gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center">
                  <span className="text-white font-bold">解</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-black">共鳴分析AI</span>
                    <span className="text-gray-500">@empathy_ai</span>
                    <span className="bg-purple-500 text-white text-xs px-2 py-0.5 rounded-full">AI</span>
                    <span className="text-gray-500">·</span>
                    <span className="text-gray-500 text-sm">今</span>
                  </div>
                  <p className="text-black mb-3">✨ {result.reasoning}</p>
                  <div className="flex items-center gap-6 text-gray-500 text-sm">
                    <button className="flex items-center gap-2 hover:text-blue-400 transition">
                      <span>💬</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-green-400 transition">
                      <span>🔄</span>
                      <span>5</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-red-400 transition">
                      <span>❤️</span>
                      <span>15</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-blue-400 transition">
                      <span>📤</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 和歌解説botのリプライ（条件付き） */}
            {result.match.waka_commentary && (
              <div className="border-b border-gray-200 p-4 bg-gray-50/30">
                <div className="flex gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                    <span className="text-white font-bold">📖</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-bold text-black">古典解説bot</span>
                      <span className="text-gray-500">@classic_guide</span>
                      <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">bot</span>
                      <span className="text-gray-500">·</span>
                      <span className="text-gray-500 text-sm">今</span>
                    </div>
                    <p className="text-black mb-3">📚 {result.match.waka_commentary}</p>
                    <div className="flex items-center gap-6 text-gray-500 text-sm">
                      <button className="flex items-center gap-2 hover:text-blue-400 transition">
                        <span>💬</span>
                      </button>
                      <button className="flex items-center gap-2 hover:text-green-400 transition">
                        <span>�</span>
                        <span>3</span>
                      </button>
                      <button className="flex items-center gap-2 hover:text-red-400 transition">
                        <span>❤️</span>
                        <span>8</span>
                      </button>
                      <button className="flex items-center gap-2 hover:text-blue-400 transition">
                        <span>📤</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 歌人紹介botのリプライ（条件付き） */}
            {result.match.person_intro && (
              <div className="border-b border-gray-200 p-4">
                <div className="flex gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                    <span className="text-white font-bold">👤</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-bold text-black">歌人データベース</span>
                      <span className="text-gray-500">@poet_db</span>
                      <span className="bg-indigo-500 text-white text-xs px-2 py-0.5 rounded-full">bot</span>
                      <span className="text-gray-500">·</span>
                      <span className="text-gray-500 text-sm">今</span>
                    </div>
                    <p className="text-black mb-3">🏛️ {result.match.person_intro}</p>
                    <div className="flex items-center gap-6 text-gray-500 text-sm">
                      <button className="flex items-center gap-2 hover:text-blue-400 transition">
                        <span>💬</span>
                      </button>
                      <button className="flex items-center gap-2 hover:text-green-400 transition">
                        <span>�</span>
                        <span>7</span>
                      </button>
                      <button className="flex items-center gap-2 hover:text-red-400 transition">
                        <span>❤️</span>
                        <span>18</span>
                      </button>
                      <button className="flex items-center gap-2 hover:text-blue-400 transition">
                        <span>📤</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {result?.error && (
          <div className="animate-fadeIn">
            {/* ユーザーの投稿 */}
            <div className="border-b border-gray-200 p-4">
              <div className="flex gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                  <span className="text-white font-bold">あ</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-black">あなた</span>
                    <span className="text-gray-500">@user</span>
                    <span className="text-gray-500">·</span>
                    <span className="text-gray-500 text-sm">今</span>
                  </div>
                  <p className="text-black mb-3">{emotion}</p>
                  <div className="flex items-center gap-6 text-gray-500 text-sm">
                    <button className="flex items-center gap-2 hover:text-blue-400 transition">
                      <span>💬</span>
                      <span>1</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-green-400 transition">
                      <span>🔄</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-red-400 transition">
                      <span>❤️</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-blue-400 transition">
                      <span>📤</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* wakatterサポートのリプライ */}
            <div className="border-b border-gray-200 p-4 bg-gray-50/30">
              <div className="flex gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                  <span className="text-white font-bold">🤔</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-black">wakatterサポート</span>
                    <span className="text-gray-500">@wakatter_help</span>
                    <span className="bg-yellow-600 text-white text-xs px-2 py-0.5 rounded-full">サポート</span>
                    <span className="text-gray-500">·</span>
                    <span className="text-gray-500 text-sm">今</span>
                  </div>
                  <p className="text-black mb-2">{result.error}</p>
                  <p className="text-gray-700 mb-3">💡 <strong>{getRandomTip()}</strong></p>
                  <button 
                    onClick={() => setResult(null)}
                    className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
                  >
                    もう一度投稿してみる →
                  </button>
                  <div className="flex items-center gap-6 text-gray-500 text-sm mt-3">
                    <button className="flex items-center gap-2 hover:text-blue-400 transition">
                      <span>💬</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-green-400 transition">
                      <span>🔄</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-red-400 transition">
                      <span>❤️</span>
                      <span>3</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-blue-400 transition">
                      <span>📤</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Twitter風フッター */}
      <footer className="border-t border-gray-200 p-4 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-gray-500 text-sm">© 2025 wakatter | 感情と和歌をつなぐSNS</p>
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
