"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

type MenuItem = {
  label: string;
  icons: string;
  href: string;
};

export default function NavBar(): React.ReactElement {
  const [sessiesOpen, setSessiesOpen] = useState<boolean>(false);
  const [accountOpen, setAccountOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();

  // Close all menus
  const closeAllMenus = () => {
    setSessiesOpen(false);
    setAccountOpen(false);
    setMobileMenuOpen(false);
  };

  // Reset all menus on resize (breakpoint change)
  useEffect(() => {
    let prevIsLarge = window.innerWidth >= 1024;

    function handleResize() {
      const isLarge = window.innerWidth >= 1024;
      if (isLarge !== prevIsLarge) {
        closeAllMenus();
        prevIsLarge = isLarge;
      }
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Helper for main menu (partial match)
  const isActiveMenu = (path: string): boolean =>
    pathname === path || pathname.startsWith(path + "/");

  //  for dropdown (exact match)
  const isActiveDropdown = (path: string): boolean => pathname === path;

  // Active Menu
  const isActiveRoute = (path: string): boolean => {
    if (path === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(path);
  };

  // sessies Menu
  const sessies: MenuItem[] = [
    {
      label: "nieuwe sessie",
      icons: "/icons/plusIcon.svg",
      href: "/dashboard/sessies",
    },
    {
      label: "afgelopen sessies",
      icons: "/icons/past-session.svg",
      href: "/dashboard/sessies/pastsessies",
    },
    {
      label: "kamers",
      icons: "/icons/home-ic.svg",
      href: "/dashboard/sessies",
    },
  ];

  // accounts Menu
  const accounts: MenuItem[] = [
    {
      label: "mijn profiel",
      icons: "/icons/profile.svg",
      href: "#",
    },
    {
      label: "edit widgets",
      icons: "/icons/grid-ic.svg",
      href: "#",
    },
    {
      label: "taal",
      icons: "/icons/globe-ic.svg",
      href: "#",
    },
  ];

  // Handle dropdown open/close for desktop
  const handleSessiesToggle = (): void => {
    setSessiesOpen((open) => {
      if (!open) setAccountOpen(false);
      return !open;
    });
  };
  const handleAccountToggle = (): void => {
    setAccountOpen((open) => {
      if (!open) setSessiesOpen(false);
      return !open;
    });
  };

  // Handle blur for desktop dropdowns
  const handleBlur = (cb: () => void): void => {
    setTimeout(cb, 150);
  };

  // Handle mobile menu item click
  const handleMobileMenuItemClick = (): void => closeAllMenus();

  return (
    <>
      {/* Top Bar */}
      <nav className="w-full bg-transparent py-2 grid grid-cols-2 lg:grid-cols-[20%_80%] xl:grid-cols-[30%_70%] justify-between gap-5 relative z-20 ">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/dashboard">
            <Image
              src="/icons/logo.svg"
              width={160}
              height={40}
              className="block"
              alt="Logo"
            ></Image>
          </Link>
        </div>
        {/* Desktop Nav Links */}
        <div className="hidden lg:flex justify-between items-center gap-8 text-lg text-primary-beige">
          <Link
            href="/dashboard"
            className={`hover:text-green4 transition-colors ${
              isActiveRoute("/dashboard") && pathname === "/dashboard"
                ? "text-green4"
                : ""
            }`}
          >
            dashboard
          </Link>
          {/* Sessies Dropdown */}
          <div className="relative">
            <button
              className={`cursor-pointer hover:text-green4 flex items-center gap-2 transition-colors ${
                isActiveMenu("/dashboard/sessies") ? "text-green4" : ""
              }`}
              onClick={handleSessiesToggle}
              onBlur={() => handleBlur(() => setSessiesOpen(false))}
            >
               <span>sessies</span>
              <Image src='./icons/downArrow.svg' width={10} height={10}  alt="Down Arrow"></Image>
            </button>
            {sessiesOpen && (
              <div className="absolute -left-5 mt-1 w-[220px] gap-1 bg-green1 rounded-lg shadow-lg py-2 flex flex-col text-left animate-fade-in z-30 ">
                {sessies.map((sessie, idx) => (
                  <Link
                    key={idx}
                    href={sessie.href}
                    className={`px-4 py-2 hover:bg-[#3c4d4654] flex items-center justify-between text-lg font-normal transition-colors ${
                      isActiveDropdown(sessie.href)
                        ? "text-green4 font-bold"
                        : ""
                    }`}
                    onClick={closeAllMenus}
                  >
                    <span>{sessie.label}</span>
                    <Image
                      src={sessie.icons}
                      width={20}
                      height={20}
                      alt={sessie.label}
                      priority
                    />
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link
            href="/dashboard/agenda"
            className={`hover:text-green4 transition-colors ${
              isActiveRoute("/dashboard/agenda") ? "text-green4" : ""
            }`}
          >
            agenda
          </Link>
          <Link
            href="#"
            className={`hover:text-green4 transition-colors ${
              isActiveRoute("/dashboard/clientenbase") ? "text-green4" : ""
            }`}
          >
            clientenbase
          </Link>
          {/* Account Dropdown */}
          <div className="relative">
            <button
              className={`cursor-pointer hover:text-green4 flex items-center gap-2 transition-colors ${
                isActiveRoute("/dashboard/account") ? "text-green4" : ""
              }`}
              onClick={handleAccountToggle}
              onBlur={() => handleBlur(() => setAccountOpen(false))}
            >
              <span>account</span>
              <Image src='./icons/downArrow.svg' width={10} height={10}  alt="Down Arrow"></Image>
            </button>
            {accountOpen && (
              <div className="absolute -right-5 mt-1 w-[220px] gap-1 bg-green1 rounded-lg shadow-lg py-2 flex flex-col text-left animate-fade-in z-30 ">
                {accounts.map((account, idx) => (
                  <Link
                    key={idx}
                    href={account.href}
                    className={`px-4 py-2 hover:bg-[#3c4d4654] flex items-center justify-between text-lg font-normal transition-colors ${
                      isActiveRoute(account.href) ? "text-green-400" : ""
                    }`}
                    onClick={closeAllMenus}
                  >
                    <span>{account.label}</span>
                    <Image
                      src={account.icons}
                      width={20}
                      height={20}
                      alt={account.label}
                      priority
                    />
                  </Link>
                ))}
                <div className="px-4">
                  <div className="h-[1px] w-full bg-[#FFFFFF80]"></div>
                </div>
                <Link
                  href="/auth"
                  className="px-4 py-2 hover:bg-[#3c4d4654] flex items-center justify-between text-lg font-normal"
                  onClick={closeAllMenus}
                >
                  <span className="text-primary-beige">logout</span>
                  <Image
                    src="/icons/logout-ic.svg"
                    width={20}
                    height={20}
                    alt="Logout"
                    priority
                  />
                </Link>
              </div>
            )}
          </div>
        </div>
        {/* Hamburger for Mobile */}
        <button
          className="cursor-pointer lg:hidden flex items-center justify-end text-white focus:outline-none"
          onClick={() => setMobileMenuOpen((v) => !v)}
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-[#191C1F] flex flex-col gap-2 py-4 px-4 lg:hidden animate-fade-in z-40">
            <Link
              href="/dashboard"
              className={`py-2 hover:text-green4 transition-colors ${
                isActiveRoute("/dashboard") && pathname === "/dashboard"
                  ? "text-green4"
                  : "text-primary-beige"
              }`}
              onClick={handleMobileMenuItemClick}
            >
              dashboard
            </Link>
            <div className="relative">
              <button
                className={`cursor-pointer flex items-center gap-1 transition-colors ${
                  isActiveMenu("/dashboard/sessies")
                    ? "text-green4"
                    : "text-primary-beige"
                }`}
                onClick={() => setSessiesOpen((v) => !v)}
              >
                sessies
                <svg
                  className="w-3 h-3 ml-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {sessiesOpen && (
                <div className="ml-2 mt-1 flex flex-col rounded-lg shadow-lg py-2 bg-green1">
                  {sessies.map((sessie, idx) => (
                    <Link
                      key={idx}
                      href={sessie.href}
                      className={`px-4 py-2 hover:bg-[#3c4d4654] flex items-center justify-between text-lg font-normal transition-colors ${
                        isActiveDropdown(sessie.href)
                          ? "text-green4 font-bold"
                          : "text-primary-beige"
                      }`}
                      onClick={handleMobileMenuItemClick}
                    >
                      <span>{sessie.label}</span>
                      <Image
                        src={sessie.icons}
                        width={20}
                        height={20}
                        alt={sessie.label}
                        priority
                      />
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link
              href="/dashboard/agenda"
              className={`py-2 hover:green4 transition-colors ${
                isActiveRoute("/dashboard/agenda")
                  ? "text-green4"
                  : "text-white"
              }`}
              onClick={handleMobileMenuItemClick}
            >
              agenda
            </Link>
            <Link
              href="#"
              className={`py-2 hover:text-green4 transition-colors ${
                isActiveRoute("/dashboard/clientenbase")
                  ? "text-green4"
                  : "text-white"
              }`}
              onClick={handleMobileMenuItemClick}
            >
              clientenbase
            </Link>
            <div className="relative">
              <button
                className={`cursor-pointer  flex items-center gap-1 transition-colors ${
                  isActiveRoute("/dashboard/account")
                    ? "text-green4"
                    : "text-white"
                }`}
                onClick={() => setAccountOpen((v) => !v)}
              >
                account
                <svg
                  className="w-3 h-3 ml-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {accountOpen && (
                <div className="ml-2 mt-1 flex flex-col rounded-lg shadow-lg py-2 bg-green1">
                  {accounts.map((account, idx) => (
                    <Link
                      key={idx}
                      href={account.href}
                      className={`px-4 py-2 hover:bg-[#3c4d4654] flex items-center justify-between text-lg font-normal transition-colors ${
                        isActiveRoute(account.href)
                          ? "text-green4"
                          : "text-primary-beige"
                      }`}
                      onClick={handleMobileMenuItemClick}
                    >
                      <span>{account.label}</span>
                      <Image
                        src={account.icons}
                        width={20}
                        height={20}
                        alt={account.label}
                        priority
                      />
                    </Link>
                  ))}
                  <div className="px-4">
                    <div className="h-[1px] w-full bg-[#FFFFFF80]"></div>
                  </div>
                  <Link
                    href="/auth"
                    className="px-4 py-2 hover:bg-[#3c4d4654] flex items-center justify-between text-lg font-normal"
                    onClick={handleMobileMenuItemClick}
                  >
                    <span className="text-primary-beige">logout</span>
                    <Image
                      src="/icons/logout-ic.svg"
                      width={20}
                      height={20}
                      alt="Logout"
                      priority
                    />
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
