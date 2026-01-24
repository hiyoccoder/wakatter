/* ユーザーの投稿ツイート */
import ReplyBase from "./ReplyBase"

interface UserTweetProps {
  emotion: string
  timestamp: Date
}

export default function UserTweet({ emotion, timestamp }: UserTweetProps) {
    return (
        <ReplyBase
            avatar={{ 
                image: "/img_user.png", 
                bgGradient: "from-blue-400 to-purple-500" 
            }}
            user={{ 
                name: "あなた", 
                handle: "@user" 
            }}
            timestamp={timestamp}
            >
            <p className="text-black mb-3">{emotion}</p>
        </ReplyBase>
    )
}