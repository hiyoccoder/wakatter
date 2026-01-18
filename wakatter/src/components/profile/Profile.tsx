{/* wakatter紹介セクション */}
export default function Profile() {
    return (
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
    )
}