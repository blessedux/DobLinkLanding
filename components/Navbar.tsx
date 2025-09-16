'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [blurAmount, setBlurAmount] = useState(0);

  // Delay navbar appearance
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setBlurAmount(12); // Set initial blur amount
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  // Track scroll position for background and shadow effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };
    
    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const dobDropdownItems = [
    { label: 'Roadmap', href: 'https://dobprotocol.notion.site/Dobprotocol-Roadmap-17beffc346f18122affcefebb73fa03c', target: '_blank' },
    { label: 'Team', href: 'https://dobprotocol.notion.site/Team-17beffc346f18122affcefebb73fa03c', target: '_blank' },
    { label: 'Validator', href: 'https://dobprotocol.notion.site/Dob-Validator-17beffc346f18122affcefebb73fa03c', target: '_blank' },
    { label: 'Tokenize', href: 'https://dobprotocol.notion.site/Tokenize-17beffc346f18122affcefebb73fa03c', target: '_blank' },
  ];

  const docsDropdownItems = [
    { label: 'FAQ', href: 'https://dobprotocol.notion.site/Dobprotocol-FAQ-17beffc346f180f995f2e1a15c62bf46', target: '_blank' },
    { label: 'Wiki', href: 'https://wiki.dobprotocol.com', target: '_blank' },
    { label: 'Blog', href: 'https://dobprotocol.notion.site/Blog-17beffc346f18122affcefebb73fa03c', target: '_blank' },
  ];


  return (
    <>
      {/* Full-screen mobile menu background */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, borderRadius: "50%", width: "30px", height: "30px", top: "40px", right: "20px" }}
            animate={{ opacity: 1, borderRadius: 0, width: "100vw", height: "100vh", top: 0, right: 0 }}
            exit={{ opacity: 0, borderRadius: "50%", width: "30px", height: "30px", top: "40px", right: "20px" }}
            transition={{ duration: 0.75, ease: [0.215, 0.61, 0.355, 1] }}
            className="fixed bg-gradient-to-br from-indigo-900 to-purple-800 z-40"
            style={{ 
              transformOrigin: "top right",
              boxShadow: "0 2px 30px 0 rgba(0,0,0,0.3)",
              backdropFilter: "blur(10px)",
              backgroundColor: "rgba(255, 255, 255, 0.1)"
            }}
          />
        )}
      </AnimatePresence>

      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center px-4 mt-4 md:mt-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: isVisible ? 1 : 0
          }}
          transition={{ 
            opacity: { duration: 1.2, ease: "easeOut" }
          }}
          className="flex justify-center w-full max-w-3xl"
        >
          <motion.nav 
            initial={{ borderRadius: "9999px" }}
            animate={{ 
              borderRadius: mobileMenuOpen ? "16px" : "9999px",
              opacity: mobileMenuOpen ? 0 : 1
            }}
            transition={{ 
              borderRadius: { duration: 0.5 },
              opacity: { duration: 0.3 }
            }}
            className="relative px-5 py-0 overflow-visible w-full"
            style={{
              backdropFilter: `blur(${blurAmount}px)`,
              backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.7)' : 'transparent',
              boxShadow: isScrolled ? '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' : 'none',
              transition: `backdrop-filter 0.5s ease-in-out, 
                          background-color 0.5s ease-in-out, 
                          box-shadow 0.5s ease-in-out`
            }}
          >
            {/* Main navbar content */}
            <div className="flex justify-between items-center h-16 relative w-full">
              {/* Logo */}
              <div className="flex-shrink-0">
                <Image 
                  src="/dob_imagotipo.svg" 
                  alt="DOB Protocol" 
                  width={320} 
                  height={320} 
                  className="h-24 w-auto"
                />
              </div>

              {/* Hamburger Menu Button */}
              <div className="md:hidden ml-20 flex items-center justify-center z-50">
                <button 
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className={`p-2 rounded-full ${mobileMenuOpen ? 'bg-white bg-opacity-10 text-white' : 'text-gray-700 hover:text-gray-900'}`}
                  aria-label="Toggle mobile menu"
                >
                  {mobileMenuOpen ? (
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>

              {/* Navigation Links - Desktop */}
              <div className="hidden md:flex items-center justify-end flex-1 ml-6 space-x-4">
                {/* DOB Dropdown */}
                <div className="relative group">
                  <button className="flex items-center space-x-1 text-gray-700 hover:text-[#597CE9] font-medium px-3 py-1.5">
                    <span>DOB</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute left-0 pt-2 w-48 hidden group-hover:block z-50">
                    <div className="bg-white border border-gray-200 rounded-md shadow-lg py-1">
                      {dobDropdownItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          target={item.target}
                          rel={item.target === '_blank' ? "noopener noreferrer" : undefined}
                          className="block px-4 py-2 text-sm text-gray-700 hover:text-[#597CE9] hover:bg-gray-50 transition-colors duration-200"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>


                {/* Docs Dropdown */}
                <div className="relative group">
                  <button className="flex items-center space-x-1 text-gray-700 hover:text-[#597CE9] font-medium px-3 py-1.5">
                    <span>Docs</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute left-0 pt-2 w-48 hidden group-hover:block z-50">
                    <div className="bg-white border border-gray-200 rounded-md shadow-lg py-1">
                      {docsDropdownItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          target={item.target}
                          rel={item.target === '_blank' ? "noopener noreferrer" : undefined}
                          className="block px-4 py-2 text-sm text-gray-700 hover:text-[#597CE9] hover:bg-gray-50 transition-colors duration-200"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Empty space for mobile menu button - Placeholder only */}
              <div className="md:hidden w-6"></div>
            </div>
          </motion.nav>
        </motion.div>
      </div>
      
      {/* Mobile Menu Content */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:hidden fixed inset-0 z-50 flex flex-col items-center pt-32"
          >
            <div className="w-full max-w-md px-6 overflow-y-auto max-h-[calc(100vh-8rem)] pb-20">
              <motion.div 
                className="space-y-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                {/* DOB Section */}
                <div>
                  <motion.p 
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="text-sm font-medium text-indigo-300 uppercase tracking-wider px-4 mb-3"
                  >
                    DOB
                  </motion.p>
                  <div className="mt-2 space-y-2">
                    {dobDropdownItems.map((item, index) => (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.7 + (index * 0.1) }}
                      >
                        <Link
                          href={item.href}
                          target={item.target}
                          rel={item.target === '_blank' ? "noopener noreferrer" : undefined}
                          className="block px-4 py-2.5 text-lg text-white hover:text-[#597CE9] font-medium"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>


                {/* Docs Section */}
                <div>
                  <motion.p 
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.4 }}
                    className="text-sm font-medium text-indigo-300 uppercase tracking-wider px-4 mb-3"
                  >
                    Docs
                  </motion.p>
                  <div className="mt-2 space-y-2">
                    {docsDropdownItems.map((item, index) => (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 1.5 + index * 0.1 }}
                      >
                        <Link
                          href={item.href}
                          target={item.target}
                          rel={item.target === '_blank' ? "noopener noreferrer" : undefined}
                          className="block py-2.5 text-lg text-white font-medium hover:text-[#597CE9] px-4"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;