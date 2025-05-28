import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ReactNode } from "react"
import type { Metadata } from "next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DOB Protocol - DePIN Token Integration",
  description: "Seamlessly integrate verified DePIN tokens into any platform. Built on DOB Protocol, verified by TRUFA.",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
