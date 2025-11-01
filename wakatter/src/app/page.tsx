'use client';

import { useState } from 'react';

export default function Home(){
  const [emotion, setEmotion]=useState('');
  const [result, setResult]=useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e:React.FormEvent)=>{
    e.preventDefault();
    if (!emotion.trim()) return;

    setLoading(true);
    setResult(null);

    try{
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emotion }),
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center relative overflow-hidden">
      {/* 波紋エフェクト背景 */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-white animate-ping" style={{animationDuration: '3s'}}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] rounded-full border border-white animate-ping" style={{animationDuration: '4s', animationDelay: '0.5s'}}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full border border-white animate-ping" style={{animationDuration: '5s', animationDelay: '1s'}}></div>
      </div>

      <div className="max-w-2xl w-full relative z-10">
        <h1 className="text-4xl font-bold mb-8 text-center tracking-wider">
          wakatter
        </h1>
        <p className="text-center text-gray-400 mb-8 text-sm">
          あなたの心に共鳴する和歌を見つけます
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
            className="bg-white text-black px-8 py-4 rounded-lg font-medium hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "共鳴中..." : "探す"}
          </button>
        </form>

        {result && !result.error && (
          <div className="space-y-8 animate-fadeIn">
            {/* 和歌カード */}
            <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-white animate-pulse"></div>
                <h2 className="text-gray-400 text-sm tracking-widest">共鳴した和歌</h2>
              </div>
              
              <p className="text-2xl font-medium mb-4 leading-relaxed">
                {result.match.text}
              </p>
              <p className="text-gray-400 mb-6">— {result.match.author}</p>
              <div className="border-t border-gray-800 pt-4">
                <p className="text-gray-300 text-sm leading-relaxed">{result.match.modern}</p>
              </div>
            </div>

            {/* 共鳴ポイント */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <h3 className="text-gray-400 text-sm mb-3 tracking-wide">共鳴の分析</h3>
              <p className="text-gray-200 leading-relaxed">{result.reasoning}</p>
            </div>

            {/* 歌人の解説 */}
            {result.match.person_intro && (
              <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6">
                <h3 className="text-gray-400 text-sm mb-3 tracking-wide">歌人について</h3>
                <p className="text-gray-300 leading-relaxed text-sm">{result.match.person_intro}</p>
              </div>
            )}

            {/* 和歌の解説 */}
            {result.match.waka_commentary && (
              <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6">
                <h3 className="text-gray-400 text-sm mb-3 tracking-wide">和歌の解説</h3>
                <p className="text-gray-300 leading-relaxed text-sm">{result.match.waka_commentary}</p>
              </div>
            )}
          </div>
        )}

        {result?.error && (
          <p className="text-center text-red-400 mt-4">{result.error}</p>
        )}
      </div>

      <footer className="mt-16 text-gray-600 text-xs relative z-10">
        © 2025 wakatter | 感情と和歌をつなぐ
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
  );
}