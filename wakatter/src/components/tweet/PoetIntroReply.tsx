/* 歌人紹介botのリプライ（条件付き） */
import ReplyBase from './ReplyBase'

interface PoetIntroReplyProps {
    timestamp: Date
    wakaCommentary: string
}

export default function PoetIntroReply({ timestamp, wakaCommentary }: PoetIntroReplyProps) {
    return (
        <ReplyBase
            avatar={{ 
                image: "/img_poet.png", 
                bgGradient: "from-indigo-500 to-purple-500" 
            }}
            user={{ 
                name: "通りすがりの歌人解説者さん", 
                handle: "@poet_db" 
            }}
            badge={{ 
                text: "bot", 
                color: "bg-indigo-500" 
            }}
            timestamp={timestamp}
            >
            <p className="text-black mb-3">🏛️ {wakaCommentary}</p>
        </ReplyBase>
    )
}