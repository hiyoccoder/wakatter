// 和歌を上の句と下の句に分ける（3つ目の空白で改行）
const formatWaka = (wakaText: string) => {
    const parts = wakaText.split(/\s+/)
    if (parts.length >= 3) {
        const kamiNoKu = parts.slice(0, 3).join('　')  // 上の句（最初の3つ）
        const shimoNoKu = parts.slice(3).join('　')    // 下の句（残り）
        return `${kamiNoKu}\n${shimoNoKu}`
    }
    return wakaText  // 3つ未満の場合はそのまま返す
}

export { formatWaka }