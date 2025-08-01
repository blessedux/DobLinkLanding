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
  const [investmentStep, setInvestmentStep] = useState(0);
  const [showInvestmentFlow, setShowInvestmentFlow] = useState(false);
  const [isFlowFadingOut, setIsFlowFadingOut] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const tooltipTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  // Cleanup tooltip timeout on unmount
  useEffect(() => {
    return () => {
      if (tooltipTimeoutRef.current) {
        clearTimeout(tooltipTimeoutRef.current);
      }
    };
  }, []);

  const handleInvest = () => {
    if (!connected) {
      setConnected(true);
      return;
    }

    setShowInvestmentFlow(true);
    setInvestmentStep(1);
    setInvesting(true);

    // Step 1: Wallet Connection Verification
    setTimeout(() => {
      setInvestmentStep(2);
    }, 1000);

    // Step 2: Transaction Preparation
    setTimeout(() => {
      setInvestmentStep(3);
    }, 2500);

    // Step 3: Smart Contract Interaction
    setTimeout(() => {
      setInvestmentStep(4);
    }, 4000);

    // Step 4: Token Allocation
    setTimeout(() => {
      setInvestmentStep(5);
    }, 5500);

    // Step 5: Success & Confirmation
    setTimeout(() => {
      setInvesting(false);
      setSuccess(true);
      setInvestmentStep(6);
      setTimeout(() => {
        setSuccess(false);
        setIsFlowFadingOut(true);
        setTimeout(() => {
          setShowInvestmentFlow(false);
          setInvestmentStep(0);
          setIsFlowFadingOut(false);
        }, 800);
      }, 4000);
    }, 7000);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div
        className={`swap-container rounded-2xl bg-white/70 border border-[#E3EAFD] shadow-lg p-8 relative transition-all duration-500 ease-out ${showInvestmentFlow ? "transform scale-[1.02]" : "transform scale-100"}`}
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
                <img
                  src={selectedToken.logo}
                  alt={selectedToken.name}
                  className="w-6 h-6"
                />
                <span className="text-gray-700 font-medium">
                  {selectedToken.name}
                </span>
                <div
                  className="relative"
                  onMouseEnter={() => {
                    if (tooltipTimeoutRef.current) {
                      clearTimeout(tooltipTimeoutRef.current);
                    }
                    setShowLogoTooltip(true);
                  }}
                  onMouseLeave={() => {
                    tooltipTimeoutRef.current = setTimeout(() => {
                      setShowLogoTooltip(false);
                    }, 800);
                  }}
                >
                  <span className="ml-1 text-[#597CE9] cursor-pointer hover:text-[#4A6CD4] transition-colors">
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
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
                  {/* EHive Info Tooltip */}
                  {showLogoTooltip && selectedToken.symbol === "EHIVE" && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-4 bg-white border-2 border-[#B6C5F5] rounded-xl shadow-2xl z-30 transition-all duration-300 ease-out animate-in fade-in slide-in-from-bottom-2">
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

        {/* Investment Flow Simulation */}
        {showInvestmentFlow && (
          <div
            className={`mt-8 mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-[#B6C5F5] transition-all duration-500 ease-out ${isFlowFadingOut ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Investment Progress
              </h3>
              <div className="text-sm text-gray-600">{investmentStep}/6</div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div
                className="bg-gradient-to-r from-[#597CE9] to-[#4A6CD4] h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(investmentStep / 6) * 100}%` }}
              ></div>
            </div>

            {/* Step Content */}
            <div className="space-y-3">
              {investmentStep >= 1 && (
                <div
                  className={`flex items-center gap-3 ${investmentStep === 1 ? "text-[#597CE9]" : "text-green-600"}`}
                >
                  {investmentStep === 1 ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#597CE9] border-t-transparent"></div>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  <span className="font-medium">
                    Verifying wallet connection
                  </span>
                </div>
              )}

              {investmentStep >= 2 && (
                <div
                  className={`flex items-center gap-3 ${investmentStep === 2 ? "text-[#597CE9]" : "text-green-600"}`}
                >
                  {investmentStep === 2 ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#597CE9] border-t-transparent"></div>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  <span className="font-medium">
                    Preparing transaction for ${amount} USD
                  </span>
                </div>
              )}

              {investmentStep >= 3 && (
                <div
                  className={`flex items-center gap-3 ${investmentStep === 3 ? "text-[#597CE9]" : "text-green-600"}`}
                >
                  {investmentStep === 3 ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#597CE9] border-t-transparent"></div>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  <span className="font-medium">
                    Interacting with {selectedToken.name} smart contract
                  </span>
                </div>
              )}

              {investmentStep >= 4 && (
                <div
                  className={`flex items-center gap-3 ${investmentStep === 4 ? "text-[#597CE9]" : "text-green-600"}`}
                >
                  {investmentStep === 4 ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#597CE9] border-t-transparent"></div>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  <span className="font-medium">
                    Allocating tokens to your portfolio
                  </span>
                </div>
              )}

              {investmentStep >= 5 && (
                <div
                  className={`flex items-center gap-3 ${investmentStep === 5 ? "text-[#597CE9]" : "text-green-600"}`}
                >
                  {investmentStep === 5 ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#597CE9] border-t-transparent"></div>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  <span className="font-medium">
                    Finalizing investment record
                  </span>
                </div>
              )}

              {investmentStep >= 6 && (
                <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 text-green-700 font-semibold mb-2">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Investment Successful!
                  </div>
                  <div className="text-sm text-green-600">
                    You have successfully invested ${amount} in{" "}
                    {selectedToken.name}. Expected annual return: $
                    {(parseFloat(amount) * (selectedToken.apy / 100)).toFixed(
                      2,
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Invest button */}
        <div className="mt-8">
          <Button
            className="w-full bg-[#597CE9] hover:bg-[#4A6CD4] text-white font-medium py-3 px-4 rounded-xl transition-colors"
            onClick={handleInvest}
            disabled={investing}
          >
            {investing
              ? "Processing Investment..."
              : success
                ? "Investment Complete!"
                : "Invest Now"}
          </Button>
        </div>
      </div>
    </div>
  );
}
