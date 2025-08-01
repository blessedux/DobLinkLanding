"use client";

import { useState, useEffect, useRef } from "react";
import { Wallet, ChevronDown } from "lucide-react";
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showAPYTooltip, setShowAPYTooltip] = useState(false);
  const [showLogoTooltip, setShowLogoTooltip] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleConnect = () => {
    setConnected(true);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
        className="swap-container rounded-2xl bg-white/70 border border-[#E3EAFD] shadow-lg p-8 relative"
        style={{ boxShadow: "0 4px 24px 0 rgba(80, 112, 255, 0.08)" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left column: Invest in, Amount */}
          <div className="flex flex-col gap-8">
            {/* Invest in */}
            <div className="bg-white rounded-xl border border-[#E3EAFD] p-6 relative z-20">
              <div className="text-gray-700 text-base font-medium mb-4">
                Invest in
              </div>
              <div className="w-full relative" ref={dropdownRef}>
                {/* Custom Dropdown */}
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full px-4 py-3 bg-white/80 border border-[#B6C5F5] rounded-xl text-gray-700 text-lg font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B6C5F5] transition-all hover:bg-white hover:border-[#597CE9] flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedToken.logo}
                      alt={selectedToken.name}
                      className="w-5 h-5 rounded-full"
                    />
                    <span>{selectedToken.name}</span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div
                    className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-[#B6C5F5] rounded-xl shadow-2xl z-[100] overflow-hidden transition-all duration-150 ease-out animate-in fade-in slide-in-from-top-2"
                    style={{
                      boxShadow:
                        "0 10px 40px rgba(0, 0, 0, 0.15), 0 4px 20px rgba(89, 124, 233, 0.1)",
                    }}
                  >
                    {TOKENS.map((token) => (
                      <button
                        key={token.symbol}
                        onClick={() => {
                          setSelectedToken(token);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors ${
                          selectedToken.symbol === token.symbol
                            ? "bg-blue-50 border-l-4 border-[#597CE9]"
                            : ""
                        }`}
                      >
                        <img
                          src={token.logo}
                          alt={token.name}
                          className="w-5 h-5 rounded-full"
                        />
                        <div className="flex flex-col">
                          <span className="text-gray-700 font-medium">
                            {token.name}
                          </span>
                          <span className="text-sm text-gray-500">
                            {token.apy}% APY
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
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
                <div
                  className="relative"
                  onMouseEnter={() => setShowLogoTooltip(true)}
                  onMouseLeave={() => setShowLogoTooltip(false)}
                >
                  <img
                    src={selectedToken.logo}
                    alt={selectedToken.name}
                    className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform"
                  />
                  {/* EHive Logo Tooltip */}
                  {showLogoTooltip && selectedToken.symbol === "EHIVE" && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-4 bg-white border-2 border-[#B6C5F5] rounded-xl shadow-2xl z-30 transition-all duration-150 ease-out">
                      <div className="text-sm">
                        <div className="font-semibold text-gray-800 mb-2">
                          E-Hive EV Charger Network
                        </div>
                        <div className="text-gray-600 mb-3">
                          Tokenized electric vehicle charging infrastructure
                          providing sustainable energy solutions and passive
                          income opportunities.
                        </div>
                        <a
                          href="https://home.dobprotocol.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[#597CE9] hover:text-[#4A6CD4] font-medium text-sm"
                        >
                          Learn more
                          <svg
                            width="12"
                            height="12"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M7 17L17 7M17 7H7M17 7V17"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </a>
                      </div>
                      {/* Tooltip arrow */}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-[#B6C5F5]"></div>
                    </div>
                  )}
                </div>
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
                  <div className="relative">
                    <span
                      className="ml-1 text-[#597CE9] cursor-pointer hover:text-[#4A6CD4] transition-colors"
                      onMouseEnter={() => setShowAPYTooltip(true)}
                      onMouseLeave={() => setShowAPYTooltip(false)}
                    >
                      <svg
                        width="16"
                        height="16"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <path
                          d="M12 16v-4"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <circle cx="12" cy="8" r="1" fill="currentColor" />
                      </svg>
                    </span>
                    {/* APY Tooltip */}
                    {showAPYTooltip && (
                      <div className="absolute bottom-full right-0 mb-2 w-72 p-4 bg-white border-2 border-[#B6C5F5] rounded-xl shadow-2xl z-30 transition-all duration-150 ease-out">
                        <div className="text-sm">
                          <div className="font-semibold text-gray-800 mb-2">
                            Annual Percentage Yield (APY)
                          </div>
                          <div className="space-y-2 text-gray-600">
                            <div className="flex justify-between">
                              <span>Distribution Frequency:</span>
                              <span className="font-medium">Monthly</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Platform Fee:</span>
                              <span className="font-medium">2.5%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Network Fee:</span>
                              <span className="font-medium">~$5-15</span>
                            </div>
                            <div className="pt-2 mt-2 border-t border-gray-200">
                              <div className="text-xs text-gray-500">
                                Yields are estimated based on historical
                                performance and may vary. Fees are deducted from
                                rewards.
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Tooltip arrow */}
                        <div className="absolute top-full right-4 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-[#B6C5F5]"></div>
                      </div>
                    )}
                  </div>
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
