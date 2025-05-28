"use client"

import { useState } from "react"
import { Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

export default function EmbeddableDemo() {
  const [amount, setAmount] = useState("100")
  const [token, setToken] = useState("DOB")
  const [connected, setConnected] = useState(false)
  const [investing, setInvesting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleConnect = () => {
    setConnected(true)
  }

  const handleInvest = () => {
    if (!connected) {
      setConnected(true)
      return
    }

    setInvesting(true)
    setTimeout(() => {
      setInvesting(false)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    }, 1500)
  }

  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Invest in DePIN</h3>
          {connected ? (
            <div className="flex items-center gap-1 text-xs text-green-600">
              <div className="w-2 h-2 rounded-full bg-green-600"></div>
              Connected
            </div>
          ) : (
            <Button variant="outline" size="sm" className="text-xs" onClick={handleConnect}>
              <Wallet className="h-3 w-3 mr-1" /> Connect
            </Button>
          )}
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="token" className="text-sm font-medium">
              Select Token
            </label>
            <Select value={token} onValueChange={setToken}>
              <SelectTrigger id="token">
                <SelectValue placeholder="Select token" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DOB">DOB - DOB Protocol</SelectItem>
                <SelectItem value="HELIUM">HELIUM - Helium Network</SelectItem>
                <SelectItem value="RENDER">RENDER - Render Network</SelectItem>
                <SelectItem value="FILECOIN">FILECOIN - Filecoin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="amount" className="text-sm font-medium">
              Amount
            </label>
            <div className="relative">
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pr-12"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-sm text-gray-500">
                USD
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Button className="w-full" onClick={handleInvest} disabled={investing}>
              {investing ? "Processing..." : success ? "Success!" : connected ? "Invest Now" : "Connect Wallet"}
            </Button>
          </div>

          <div className="text-xs text-center text-gray-500">Powered by DOB Protocol</div>
        </div>
      </div>
    </div>
  )
}
