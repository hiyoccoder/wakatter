/* 和歌解説botのリプライ（条件付き） */
interface ClassicGuideReplyProps {
    timestamp: Date
    wakaCommentary: string
}

export default function ClassicGuideReply({ timestamp, wakaCommentary }: ClassicGuideReplyProps) {
    if (!wakaCommentary) {
        return null
    }

    return (
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
                <span className="text-gray-500 text-sm">{timestamp.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <p className="text-black mb-3">📚 {wakaCommentary}</p>
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