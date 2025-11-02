import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Noto_Sans_JP, Noto_Serif_JP } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const _notoSansJP = Noto_Sans_JP({ subsets: ["latin"], weight: ["400", "500", "700"] })
const notoSerifJP = Noto_Serif_JP({ 
  subsets: ["latin"], 
  weight: ["400", "500", "700"],
  variable: "--font-serif"
})

export const metadata: Metadata = {
  title: "wakatter - 1000年前の誰かが「わかってくれる」",
  description: "あなたの今の気持ちに共鳴する千年前の和歌を見つけます。古今和歌集1000首の中から、心に寄り添う一首をお届けします。あなたの今の気持ちに共鳴する千年前の和歌を見つけます。古今和歌集1000首の中から、心の琴線に触れる一首を選んでお届け。",
  generator: "Next.js",
  openGraph: {
    title: "wakatter - 1000年前の誰かが「わかってくれる」",
    description: "あなたの今の気持ちに共鳴する千年前の和歌を見つけます。古今和歌集1000首の中から、心に寄り添う一首をお届けします。あなたの今の気持ちに共鳴する千年前の和歌を見つけます。古今和歌集1000首の中から、心の琴線に触れる一首を選んでお届け。",
    images: [
      {
        url: "/ogp.jpg",
        width: 1200,
        height: 630,
        alt: "wakatter - 1000年前の誰かが「わかってくれる」",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "wakatter - 1000年前の誰かが「わかってくれる」",
    description: "あなたの今の気持ちに共鳴する千年前の和歌を見つけます。古今和歌集1000首の中から、心に寄り添う一首をお届けします。あなたの今の気持ちに共鳴する千年前の和歌を見つけます。古今和歌集1000首の中から、心の琴線に触れる一首を選んでお届け。",
    images: ["/ogp.jpg"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className={`font-sans antialiased ${notoSerifJP.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
