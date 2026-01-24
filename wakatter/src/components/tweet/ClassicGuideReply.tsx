/* 和歌解説botのリプライ（条件付き） */
import ReplyBase from './ReplyBase'

interface ClassicGuideReplyProps {
    timestamp: Date
    wakaCommentary: string
}

export default function ClassicGuideReply({ timestamp, wakaCommentary }: ClassicGuideReplyProps) {
    return (
        <ReplyBase
            avatar={{ 
                image: "/img_guide.png", 
                bgGradient: "from-orange-500 to-red-500" 
            }}
            user={{ 
                name: "古典解説botさん", 
                handle: "@classic_guide" 
            }}
            badge={{ 
                text: "bot", 
                color: "bg-orange-500" 
            }}
            timestamp={timestamp}
            >
            <p className="text-black mb-3">📚 {wakaCommentary}</p>
        </ReplyBase>
    )
}