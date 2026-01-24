/* 和歌botのリプライ */
import { formatWaka } from '@/src/utils/formatters'

interface WakatterReplyProps {
  timestamp: Date
  wakaText: string
  author: string
  modern: string
}

export default function WakatterReply({ timestamp, wakaText, author, modern }: WakatterReplyProps) {
    return (
        <div className="border-b border-gray-200 p-4 bg-gray-50/50">
            <div className="flex gap-3">
            <div className="w-12 h-12 rounded-full bg-linear-to-br from-pink-400 via-purple-500 to-blue-600 flex items-center justify-center">
                <span className="text-white font-bold"><img src="/img_wakatter.svg" /></span>
            </div>
            <div className="flex-1">
                <div className="flex items-center mb-2 flex-wrap gap-0 sm:gap-2">
                <span className="font-bold text-black w-full sm:w-auto">wakatter</span>
                <span className="text-gray-500">@wakatter</span>
                <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">bot</span>
                <span className="text-gray-500">·</span>
                <span className="text-gray-500 text-sm">{timestamp.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="bg-gray-100 rounded-2xl p-6 mb-3">
                <div className="flex justify-center mb-4">
                    <p className="waka-vertical font-serif text-xl text-center text-black whitespace-pre-line">{formatWaka(wakaText)}</p>
                </div>
                <p className="text-gray-600 text-center mb-2">— {author}</p>
                <div className="border-t border-gray-300 pt-3 mt-3">
                    <p className="text-gray-700 text-sm">{modern}</p>
                </div>
                </div>
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