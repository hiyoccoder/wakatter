/* 和歌botのリプライ */
import ReplyBase from './ReplyBase'
import { formatWaka } from '@/src/utils/formatters'

interface WakatterReplyProps {
  timestamp: Date
  wakaText: string
  author: string
  modern: string
}

export default function WakatterReply({ timestamp, wakaText, author, modern }: WakatterReplyProps) {
    return (
        <ReplyBase
        avatar={{ 
            image: "/img_wakatter.svg", 
            bgGradient: "from-pink-400 via-purple-500 to-blue-600" 
        }}
        user={{ 
            name: "wakatter", 
            handle: "@wakatter" 
        }}
        badge={{ 
            text: "bot", 
            color: "bg-blue-500" 
        }}
        timestamp={timestamp}
        >
        <div className="bg-gray-100 rounded-2xl p-6 mb-3">
            <div className="flex justify-center mb-4">
            <p className="waka-vertical font-serif text-xl text-center text-black whitespace-pre-line">
                {formatWaka(wakaText)}
            </p>
            </div>
            <p className="text-gray-600 text-center mb-2">— {author}</p>
            <div className="border-t border-gray-300 pt-3 mt-3">
            <p className="text-gray-700 text-sm">{modern}</p>
            </div>
        </div>
        </ReplyBase>
    )
}