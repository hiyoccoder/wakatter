/* ユーザーの投稿 */
interface ErrorReplyProps {
    id: number
    timestamp: Date
    emotion: string
    error: string
    tip: string
}

export default function ErrorReply({ id, timestamp, emotion, error, tip }: ErrorReplyProps) {
    return (
        <div key={id} className="animate-fadeIn">
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
                <span className="text-gray-500 text-sm">{timestamp.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <p className="text-black mb-3">{emotion}</p>
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
                <span className="text-gray-500 text-sm">{timestamp.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <p className="text-black mb-2">{error}</p>
                <p className="text-gray-700 mb-3">💡 <strong>{tip}</strong></p>
                <div className="flex items-center gap-6 text-gray-500 text-sm mt-3">
                <button className="flex items-center gap-2">
                    <span><img src="/ico_balloon.svg" alt="" className="h-4" /></span>
                </button>
                </div>
            </div>
            </div>
        </div>
        </div>
    )
}