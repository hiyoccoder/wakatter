/* ユーザーの投稿ツイート */
interface UserTweetProps {
  emotion: string
  timestamp: Date
}

export default function UserTweet({ emotion, timestamp }: UserTweetProps) {
    return (
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
                <span className="text-gray-500 text-sm">{timestamp.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <p className="text-black mb-3">{emotion}</p>
                <div className="flex items-center gap-6 text-gray-500 text-sm">
                <button className="flex items-center gap-2">
                    <span><img src="/ico_balloon.svg" alt="" className="h-4" /></span>
                    <span>3</span>
                </button>
                </div>
            </div>
            </div>
        </div>
    )
}