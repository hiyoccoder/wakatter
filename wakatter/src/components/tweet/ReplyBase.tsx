interface ReplyBaseProps {
  avatar: { image: string, bgGradient: string }
  user: { name: string, handle: string }
  badge?: { text: string, color: string }  // オプショナルに変更
  timestamp: Date
  children: React.ReactNode
}

export default function ReplyBase({ avatar, user, badge, timestamp, children }: ReplyBaseProps) {
    return (
        <div className={`border-b border-gray-200 p-4`}>
            <div className="flex gap-3">
            <div className={`w-12 h-12 rounded-full bg-linear-to-br ${avatar.bgGradient} flex items-center justify-center`}>
                <span className="text-white font-bold"><img src={avatar.image} /></span>
            </div>
            <div className="flex-1">
                <div className="flex items-center mb-2 flex-wrap gap-0 sm:gap-2">
                <span className="font-bold text-black w-full sm:w-auto">{user.name}</span>
                <span className="text-gray-500">{user.handle}</span>
                {badge && (
                  <span className={`${badge.color} text-white text-xs px-2 py-0.5 rounded-full`}>{badge.text}</span>
                )}
                <span className="text-gray-500">·</span>
                <span className="text-gray-500 text-sm">{timestamp.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                {children}
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