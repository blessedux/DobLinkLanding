"use client";

import { useState } from "react";
import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

// Mock token data
const TOKENS = [
  {
    symbol: "EHIVE",
    name: "E-Hive EV Charger",
    apy: 18.7,
    logo: "/Ehive-logo.png",
    isRWA: true,
  },
  {
    symbol: "BASE3",
    name: "BASE3 Data Center",
    apy: 14.2,
    logo: "https://img.icons8.com/color/96/000000/server.png",
    isRWA: true,
  },
];

export default function EmbeddableDemo() {
  const [amount, setAmount] = useState("100");
  const [selectedToken, setSelectedToken] = useState(TOKENS[0]);
  const [connected, setConnected] = useState(false);
  const [investing, setInvesting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleConnect = () => {
    setConnected(true);
  };

  const handleInvest = () => {
    if (!connected) {
      setConnected(true);
      return;
    }

    setInvesting(true);
    setTimeout(() => {
      setInvesting(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div
        className="swap-container rounded-2xl bg-white/70 border border-[#E3EAFD] shadow-lg p-8"
        style={{ boxShadow: "0 4px 24px 0 rgba(80, 112, 255, 0.08)" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left column: Invest in, Amount */}
          <div className="flex flex-col gap-8">
            {/* Invest in */}
            <div className="bg-white rounded-xl border border-[#E3EAFD] p-6">
              <div className="text-gray-700 text-base font-medium mb-4">
                Invest in
              </div>
              <div className="w-full relative">
                <select
                  className="appearance-none w-full px-4 py-3 bg-white/80 border border-[#B6C5F5] rounded-xl text-gray-700 text-lg font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B6C5F5] transition-all"
                  value={selectedToken.symbol}
                  onChange={(e) => {
                    const selected = TOKENS.find(
                      (t) => t.symbol === e.target.value,
                    );
                    if (selected) setSelectedToken(selected);
                  }}
                  style={{
                    WebkitAppearance: "none",
                    MozAppearance: "none",
                    appearance: "none",
                  }}
                >
                  {TOKENS.map((token) => (
                    <option
                      key={token.symbol}
                      value={token.symbol}
                      className="text-gray-700 bg-white"
                    >
                      {token.name}
                    </option>
                  ))}
                </select>
                {/* Custom dropdown arrow */}
                <div className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                    <path
                      d="M6 8l4 4 4-4"
                      stroke="#888"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Amount */}
            <div className="bg-white rounded-xl border border-[#E3EAFD] p-6">
              <div className="text-gray-700 text-base font-medium mb-4">
                Amount
              </div>
              <div className="flex items-center">
                <input
                  type="text"
                  value={amount}
                  onChange={(e) =>
                    setAmount(e.target.value.replace(/[^0-9.]/g, ""))
                  }
                  placeholder="0.0"
                  className="text-3xl bg-transparent outline-none w-full text-gray-700 placeholder-gray-400"
                />
                <span className="ml-2 text-gray-400 text-lg font-medium">
                  USD
                </span>
              </div>
            </div>
          </div>

          {/* Right column: Asset info and APY */}
          <div className="flex flex-col gap-8">
            <div className="bg-white rounded-xl border border-[#E3EAFD] p-6 flex flex-col gap-4 h-full justify-between">
              {/* Asset info */}
              <div className="flex items-center gap-2 mb-2">
                <img
                  src={selectedToken.logo}
                  alt={selectedToken.name}
                  className="w-6 h-6"
                />
                <span className="text-gray-700 font-medium">
                  {selectedToken.name}
                </span>
                <span
                  className="ml-1 text-[#597CE9] cursor-pointer"
                  title="About this asset"
                >
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="#597CE9"
                      strokeWidth="2"
                    />
                    <path
                      d="M12 16v-4"
                      stroke="#597CE9"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <circle cx="12" cy="8" r="1" fill="#597CE9" />
                  </svg>
                </span>
              </div>
              {/* APY/Return info */}
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-gray-800">
                    {selectedToken.apy}%
                  </span>
                  <span
                    className="ml-1 text-[#597CE9] cursor-pointer"
                    title="APY info"
                  >
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="#597CE9"
                        strokeWidth="2"
                      />
                      <path
                        d="M12 16v-4"
                        stroke="#597CE9"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <circle cx="12" cy="8" r="1" fill="#597CE9" />
                    </svg>
                  </span>
                </div>
                <div className="text-gray-400 text-sm">APY</div>
                <div className="text-lg font-medium text-gray-700 mt-2">
                  ${(parseFloat(amount) * (selectedToken.apy / 100)).toFixed(2)}{" "}
                  / yr
                </div>
                <div className="text-gray-400 text-sm">You receive</div>
              </div>
            </div>
          </div>
        </div>

        {/* Invest button */}
        <div className="mt-8">
          <Button
            className="w-full bg-[#597CE9] hover:bg-[#4A6CD4] text-white font-medium py-3 px-4 rounded-xl transition-colors"
            onClick={handleInvest}
            disabled={investing}
          >
            {investing ? "Processing..." : success ? "Success!" : "Invest Now"}
          </Button>
        </div>
      </div>
    </div>
  );
}
