/* 呟き投稿エリア */
interface TweetInputProps {
  emotion: string
  setEmotion: (value: string) => void
  loading: boolean
  onSubmit: (e: React.FormEvent) => void
}

export default function TweetInput({ emotion, setEmotion, loading, onSubmit }: TweetInputProps) {
    return (
        <div className="bg-white border border-gray-200">
        <div className="flex px-4 py-4">
        <div className="shrink-0 mr-3">
            <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-400 to-purple-500 flex items-center justify-center">
            <span className="text-white text-sm font-bold"><img src="/img_user.png" /></span>
            </div>
        </div>
        <form onSubmit={onSubmit} className="flex-1">
            <textarea
            className="w-full text-xl placeholder-gray-500 resize-none border-none outline-none bg-transparent text-black"
            placeholder="今どんな気持ち？"
            value={emotion}
            onChange={(e) => setEmotion(e.target.value)}
            rows={3}
            />
            <div className="flex justify-end items-center mt-3 pt-3 border-t border-gray-100">
            <button
                type="submit"
                disabled={!emotion.trim() || loading}
                className="bg-blue-500 text-white px-6 py-2 rounded-full font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
            >
                {loading ? "投稿中..." : "ひとりごつ"}
            </button>
            </div>
        </form>
        </div>
    </div>
    )
}