"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

// ✅ Updated SVGs
const navItems = [
  {
    key: "dashboard",
    href: "/dashboard",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.8}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6"
        />
      </svg>
    ),
  },
  {
    key: "customers",
    href: "/customers",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.8}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 20h5v-2a6 6 0 00-5-5.91M12 4a4 4 0 110 8 4 4 0 010-8zm-6 16v-2a6 6 0 015-5.91M6 20h12"
        />
      </svg>
    ),
  },
  {
    key: "reminders",
    href: "/reminders",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.8}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6l4 2m6 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    key: "claims",
    href: "/claims",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.8}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 9.4L7 19l-4.5-4.5m9-2L22 4l-9.5 8.5z"
        />
      </svg>
    ),
  },
  {
    key: "compare policies",
    href: "/compare-policies",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.8}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 17v-4h12v4M9 7v4h12V7M3 5h3v14H3z"
        />
      </svg>
    ),
  },
  {
    key: "payments",
    href: "/payments",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.8}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 6.75A2.25 2.25 0 014.5 4.5h15a2.25 2.25 0 012.25 2.25v1.5H2.25v-1.5zm0 4.5h19.5v7.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25v-7.5zm12 3.75a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
        />
      </svg>
    ),
  },
];

const languageOptions = {
  en: "English",
  hi: "हिंदी",
  mr: "मराठी",
};

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { t, i18n } = useTranslation();

  const [activePath, setActivePath] = useState(pathname || "/dashboard");
  const [activeLanguage, setActiveLanguage] = useState(i18n.language || "en");

  const handleNavClick = (href: string) => {
    setActivePath(href);
    router.push(href);
  };

  const handleLanguageChange = (lng: string) => {
    setActiveLanguage(lng);
    i18n.changeLanguage(lng);
  };

  const handleSignOut = () => {
    router.push("/");
  };

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-md font-['Roboto'] text-sm">
      {/* Logo */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center bg-emerald-500 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2L3 7v10l9 5 9-5V7L12 2zm0 17.65L5 15.68V8.32L12 4.35l7 3.97v7.36l-7 3.97z" />
              <path d="M12 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </div>
          <span className="font-bold text-gray-900 text-lg text-[35px]">
            PoliSync
          </span>
        </div>
      </div>

      {/* Menu */}
      <div className="flex gap-1 items-center bg-gray-100 rounded-[24px] p-1">
        {navItems.map((item) => (
          <button
            key={item.key}
            onClick={() => handleNavClick(item.href)}
            className={`flex items-center gap-2 px-4 py-2 rounded-[24px] transition-colors duration-300
              ${
                activePath === item.href
                  ? "bg-[#78CC9B] text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
          >
            <span className="w-4 h-4">{item.icon}</span>
            <span className="font-medium">{t(item.key)}</span>
          </button>
        ))}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Profile */}
        <button
          onClick={() => router.push("/profile")}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-6 h-6"
          >
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </button>

        {/* Language Dropdown */}
        <div className="relative group">
          <button className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M20 5h-9.1l-.9-2H4c-1.1 0-2 .9-2 2v2h2V5h4.6l3.6 8H9.24L6 8l-1.8.9L7.48 15H11v2h2v-2h3.52L22 20l-2 2-4.48-4.48L12 10h8v2h2V7c0-1.1-.9-2-2-2z" />
            </svg>
          </button>
          <div className="absolute right-0 top-full mt-2 w-32 bg-white rounded-md shadow-lg py-1 z-50 invisible group-hover:visible transition-all duration-300 transform scale-95 group-hover:scale-100">
            {Object.keys(languageOptions).map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  activeLanguage === lang
                    ? "text-emerald-600 font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {languageOptions[lang as keyof typeof languageOptions]}
              </button>
            ))}
          </div>
        </div>

        {/* Sign Out */}
        <button
          onClick={handleSignOut}
          className="flex items-center justify-center w-10 h-10 rounded-full transform scale-x-[-1] bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-6 h-6"
          >
            <path d="M16 13v-2H7V8l-5 4 5 4v-3h9zm3-10H5c-1.1 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
