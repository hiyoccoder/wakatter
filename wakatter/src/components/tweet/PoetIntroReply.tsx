/* 歌人紹介botのリプライ（条件付き） */
interface PoetIntroReplyProps {
    timestamp: Date
    wakaCommentary: string
}

export default function PoetIntroReply({ timestamp, wakaCommentary }: PoetIntroReplyProps) {
    return (
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
                <span className="text-gray-500 text-sm">{timestamp.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <p className="text-black mb-3">🏛️ {wakaCommentary}</p>
            <div className="flex items-center gap-6 text-gray-500 text-sm">
                <button className="flex items-center gap-2">
                <span><img src="/ico_balloon.svg" alt="" className="h-4" /></span>
                </button>
            </div>
            </div>
        </div>
        </div>
    )
}