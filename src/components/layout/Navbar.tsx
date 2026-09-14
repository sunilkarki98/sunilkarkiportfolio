"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FiHome, FiArrowUpRight } from "react-icons/fi";
import { menu, close } from "@/assets";
import Image from "next/image";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { Container } from "@/components/ui/Container";
import { styles } from "@/styles";
import { navLinks, blogLinks } from "@/constants/navigation";

const Navbar = ({ isReaderMode = false }) => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const currentLinks = isReaderMode ? blogLinks : navLinks;

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 100);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`w-full flex items-center py-4 fixed top-0 z-[100] transition-all duration-300 ${scrolled
        ? isReaderMode
          ? "bg-white/90 backdrop-blur-xl border-b border-gray-200 shadow-sm"
          : "bg-bg/80 backdrop-blur-xl shadow-xl"
        : "bg-transparent pt-6"
        }`}
    >
      <Container className={`${styles.paddingX} flex justify-between items-center`}>
        
        {/* Left: Status Pill */}
        <div className="w-[280px] flex justify-start items-center shrink-0">
          <Link href="/" onClick={() => { setActive(""); window.scrollTo(0, 0); }}>
            <div className={`inline-flex items-center gap-3 px-4 py-2 sm:py-2.5 rounded-none border transition-all duration-300 ${isReaderMode ? 'bg-white border-gray-200 text-gray-900 shadow-sm hover:shadow-md' : 'bg-surface/50 border-border text-text-primary hover:bg-surface'}`}>
              <div className="relative flex justify-center items-center w-2 h-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-500/50 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </div>
              <span className="text-sm sm:text-base font-medium tracking-tight whitespace-nowrap">Available for Work</span>
            </div>
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <ul className='list-none hidden lg:flex flex-row items-center justify-between w-full max-w-2xl px-8'>
          {currentLinks.map((nav) => {
            if (isReaderMode && nav.id === '/') {
              return (
                <li key={nav.id} className="cursor-pointer">
                  <Link href="/" aria-label="Go Home" className="text-black hover:scale-110 transition-transform block">
                    <FiHome className="w-5 h-5" />
                  </Link>
                </li>
              );
            }
            return (
              <li
                key={nav.id}
                className={`${isReaderMode ? 'text-black opacity-80 hover:opacity-100' : 'text-text-primary opacity-80 hover:opacity-100'} 
                  ${active === nav.title ? "font-bold !opacity-100" : "font-medium"} 
                  cursor-pointer transition-all duration-300 group flex items-start antialiased shrink-0`}
                onClick={() => setActive(nav.title)}
              >
                {nav.id.startsWith('/') ? (
                  <Link href={nav.id} className="text-[16px] tracking-tight">{nav.title}</Link>
                ) : (
                  <a href={`#${nav.id}`} className="text-[16px] tracking-tight flex items-start">
                    {nav.title}
                    {nav.count && (
                      <span className={`text-xs ml-1.5 mt-0.5 opacity-60 group-hover:opacity-100 font-mono transition-opacity`}>
                        [{nav.count}]
                      </span>
                    )}
                  </a>
                )}
              </li>
            );
          })}
        </ul>

        {/* Right: CTA & Theme */}
        <div className="w-[280px] flex justify-end items-center gap-5 shrink-0">
          <ThemeToggle />
          
          <a
            href="#contact"
            className={`hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-none text-sm font-semibold transition-all duration-300 shadow-md hover:scale-[1.02] ${isReaderMode
                ? 'bg-black text-white hover:bg-gray-800 hover:shadow-lg'
                : 'bg-text-primary text-bg hover:opacity-90 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]'
              }`}
          >
            Let&apos;s Talk <FiArrowUpRight className="w-4 h-4" />
          </a>

          {/* Mobile Menu Toggle */}
          <div className='lg:hidden flex justify-end items-center'>
            <button
              type='button'
              onClick={() => setToggle(!toggle)}
              className='p-2'
            >
              <Image src={toggle ? close : menu} alt='menu' className='w-6 h-6 object-contain dark:invert' />
            </button>

            <div className={`${!toggle ? "hidden" : "flex"} p-6 ${isReaderMode ? "bg-white border border-gray-200 shadow-xl" : "bg-surface border border-border shadow-xl"} absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}>
              <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
                {currentLinks.map((nav) => (
                  <li
                    key={nav.id}
                    className={`font-medium cursor-pointer text-[16px] transition-all duration-300 ${isReaderMode ? 'text-black opacity-80' : 'text-text-primary opacity-90'}`}
                    onClick={() => { setToggle(!toggle); setActive(nav.title); }}
                  >
                    {nav.id.startsWith('/') ? (
                      <Link href={nav.id}>{nav.title}</Link>
                    ) : (
                      <a href={`#${nav.id}`}>
                        {nav.title} {nav.count && <span className="text-xs opacity-50 font-mono">[{nav.count}]</span>}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </Container>
    </nav>
  );
};

export default Navbar;
