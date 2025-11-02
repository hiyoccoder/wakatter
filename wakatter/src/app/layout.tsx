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
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.app",
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
