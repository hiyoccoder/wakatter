/* AI解析botのリプライ */
import { formatWaka } from '@/src/utils/formatters'
import ReplyBase from './ReplyBase'

interface EmpathyReplyProps {
    timestamp: Date
    wakaText: string
    reasoning: string
}

export default function EmpathyReply({ timestamp, wakaText, reasoning }: EmpathyReplyProps) {
    return (
        <ReplyBase
            avatar={{ 
                image: "/img_empathy.png", 
                bgGradient: "from-green-500 to-blue-500" 
            }}
            user={{ 
                name: "共通点発見AIさん", 
                handle: "@empathy_ai" 
            }}
            badge={{ 
                text: "bot", 
                color: "bg-purple-500" 
            }}
            timestamp={timestamp}
            >
            <p className="text-black mb-3">🎤 {formatWaka(wakaText)}</p>
            <p className="text-black mb-3">✨ {reasoning}</p>
        </ReplyBase>
    )
}