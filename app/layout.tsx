import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/context/ThemeContext"
import Navbar from "@/components/Navbar"
import { ReactNode } from "react"
import type { Metadata } from "next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Dob Link - Your Gateway to DePIN",
  description: "Seamlessly integrate verified DePIN tokens into any platform. Built on DOB Protocol, verified by TRUFA.",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
