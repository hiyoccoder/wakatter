export interface Tweet {
  id: number
  emotion: string
  timestamp: Date
  result: SuccessResult | ErrorResult  // 成功かエラーのどちらか
}

export interface SuccessResult {
  match: {
    text: string
    author: string
    modern: string
    waka_commentary?: string  // オプショナル
    person_intro?: string     // オプショナル
  }
  reasoning: string
}

export interface ErrorResult {
  error: string
  tip?: string  // オプショナル
}

// 型ガード関数
export const isSuccessResult = (result: SuccessResult | ErrorResult): result is SuccessResult => {
  return 'match' in result
}

export const isErrorResult = (result: SuccessResult | ErrorResult): result is ErrorResult => {
  return 'error' in result
}  