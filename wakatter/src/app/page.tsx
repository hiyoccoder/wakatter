'use client';

import { useState,useEffect } from 'react';
import wakas from '../../data/wakas.json';

export default function Home(){
  const [emotion, setEmotion]=useState('');
  const [wakaList,setWakaList]=useState<any[]>([]);

  useEffect(()=>{
    setWakaList(wakas);
  },[]);

  const handleSubmit = (e:React.FormEvent)=>{
    e.preventDefault();
    console.log('入力された感情:', emotion);
    alert(`入力された感情: ${emotion}`);
  };

  return(
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-white to-blue-100 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        🌸 和歌マッチングアプリ「wakatter」 🌸
      </h1>

      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white/70 p-6 rounded-2xl shadow-md">
        <textarea
          value={emotion}
          onChange={(e) => setEmotion(e.target.value)}
          placeholder="例：寂しいけど前向きになりたい"
          className="w-full h-28 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
        />
        <button type="submit" className="mt-4 px-6 py-2 bg-pink-400 hover:bg-pink-500 text-white font-semibold rounded-lg transition">
          和歌を探す
        </button>
      </form>

      <div className="mt-8 w-full max-w-2xl">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">📜 データ確認</h2>
        <ul className="bg-white/60 rounded-lg p-4 shadow">
          {wakaList.slice(0, 3).map((waka) => (
            <li key={waka.id} className="border-b border-gray-300 py-2">
              <p className="font-medium text-gray-800">{waka.text}</p>
              <p className="text-sm text-gray-600">— {waka.author}</p>
              <p className="text-sm text-gray-500">{waka.modern}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}