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
    <main className="min-h-screen bg-gradient-to-br from-rose-50 to-blue-50 p-6 flex flex-col items-center">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">
          wakatter 🌸
        </h1>

        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="今の気持ちを入力してみて..."
            value={emotion}
            onChange={(e) => setEmotion(e.target.value)}
            className="flex-1 border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-pink-400 text-white px-5 py-3 rounded-xl font-medium hover:bg-pink-500 transition disabled:opacity-50"
          >
            {loading ? "検索中..." : "検索"}
          </button>
        </form>

        {result && !result.error && (
          <div className="space-y-6">
            <div className="bg-pink-50 p-4 rounded-xl">
              <h2 className="text-gray-600 font-medium mb-1">あなたの気持ち</h2>
              <p className="text-lg text-gray-800">{result.emotion_summary}</p>
            </div>

            <div className="bg-blue-50 p-4 rounded-xl">
              <h2 className="text-gray-600 font-medium mb-1">共鳴した和歌</h2>
              <p className="text-lg font-medium text-gray-900">{result.match.text}</p>
              <p className="text-gray-700 mt-1">— {result.match.author}</p>
              <p className="text-gray-600 text-sm mt-2">{result.match.modern}</p>
            </div>

            <div className="bg-amber-50 p-4 rounded-xl">
              <h2 className="text-gray-600 font-medium mb-1">AIの共感コメント</h2>
              <p className="text-gray-800">{result.reasoning}</p>
            </div>
          </div>
        )}

        {result?.error && (
          <p className="text-center text-red-500 mt-4">{result.error}</p>
        )}
      </div>

      <footer className="mt-10 text-gray-400 text-sm">
        © 2025 wakatter | 感情と和歌をつなぐアプリ
      </footer>
    </main>
  );
}