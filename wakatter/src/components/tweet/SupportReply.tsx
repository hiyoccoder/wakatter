/* wakatterサポートのリプライ */
import ReplyBase from "./ReplyBase"
interface ErrorReplyProps {
    timestamp: Date
    error: string
    tip: string
}

export default function ErrorReply({ timestamp, error, tip }: ErrorReplyProps) {
    return (
        <ReplyBase
            avatar={{ 
                image: "/img_wakatter.svg", 
                bgGradient: "from-yellow-500 to-orange-500"
            }}
            user={{ 
                name: "wakatterサポート", 
                handle: "@wakatter_help"
            }}
            badge={{ 
                text: "サポート", 
                color: "bg-yellow-600" 
            }}
            timestamp={timestamp}
            >
            <p className="text-black mb-2">{error}</p>
            <p className="text-gray-700 mb-3">💡 <strong>{tip}</strong></p>
        </ReplyBase>
    )
}