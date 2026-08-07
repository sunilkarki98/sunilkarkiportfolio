"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiHome } from "react-icons/fi";

import { styles } from "@/styles";
import { navLinks } from "@/constants";
import { logo, menu, close } from "@/assets";

const Navbar = ({ isReaderMode = false }) => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Minimal links for blog readers to stay focused
  const blogLinks = [
    { id: "/", title: "Home" },
    { id: "/writing", title: "Insights" },
    { id: "contact", title: "Contact" },
  ];

  const currentLinks = isReaderMode ? blogLinks : navLinks;

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          setScrolled(scrollTop > 100);
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
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-[100] transition-all duration-300 ${scrolled
        ? isReaderMode
          ? "bg-white/90 backdrop-blur-xl border-b border-gray-200 shadow-sm"
          : "bg-primary/80 backdrop-blur-xl border-b border-white/5 shadow-xl"
        : "bg-transparent"
        }`}
    >
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <Link
          href='/'
          className='flex items-center gap-2'
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <Image src={logo} alt='logo' className='w-9 h-9 object-contain' />
          <p className={`${isReaderMode ? "text-gray-900" : "text-white"} uppercase text-[18px] font-bold cursor-pointer flex`}>
            Sunil Karki
          </p>
        </Link>

        <ul className='list-none hidden sm:flex flex-row items-center gap-10'>
          {currentLinks.map((nav) => {
            // Home link as icon in reader mode
            if (isReaderMode && nav.id === '/') {
              return (
                <li key={nav.id} className="cursor-pointer">
                  <Link href="/" aria-label="Go Home" className="text-black hover:scale-110 transition-transform block">
                    <FiHome className="w-5 h-5" />
                  </Link>
                </li>
              );
            }

            // Contact link with background pill
            if (nav.id === 'contact') {
              return (
                <li key={nav.id} className="cursor-pointer">
                  <a
                    href="#contact"
                    aria-label="Navigate to Contact"
                    className={`px-5 py-2 rounded-full text-[16px] font-semibold transition-all duration-300 ${isReaderMode
                        ? 'bg-black text-white hover:bg-gray-800'
                        : 'bg-white text-primary hover:bg-gray-200'
                      }`}
                  >
                    Contact
                  </a>
                </li>
              );
            }

            return (
              <li
                key={nav.id}
                className={`${isReaderMode ? 'text-black opacity-80 hover:opacity-100' : 'text-white opacity-90 hover:opacity-100'
                  } ${active === nav.title ? "font-bold !opacity-100" : ""
                  } text-[18px] font-medium cursor-pointer transition-all duration-300`}
                onClick={() => setActive(nav.title)}
              >
                {nav.id.startsWith('/') ? (
                  <Link href={nav.id} aria-label={`Navigate to ${nav.title}`}>{nav.title}</Link>
                ) : (
                  <a href={`#${nav.id}`} aria-label={`Navigate to ${nav.title}`}>{nav.title}</a>
                )}
              </li>
            );
          })}
          {!isReaderMode && (
            <li className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-tertiary border border-white/10 shadow-sm cursor-default">
              <span className="relative flex h-3 w-3 hover:scale-110 transition-transform">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-white text-[14px] font-medium tracking-wide">Open to Work</span>
            </li>
          )}
        </ul>

        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <button
            type='button'
            aria-label={toggle ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={toggle}
            aria-controls='mobile-navigation'
            onClick={() => setToggle((isOpen) => !isOpen)}
            className='p-1'
          >
            <Image
              src={toggle ? close : menu}
              alt=''
              className='w-[28px] h-[28px] object-contain'
            />
          </button>

          <div
            id='mobile-navigation'
            className={`${!toggle ? "hidden" : "flex"} p-6 ${isReaderMode ? "bg-white border border-gray-200 shadow-xl" : "black-gradient"} absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
              {currentLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] transition-all duration-300 ${isReaderMode ? 'text-black opacity-80 hover:opacity-100' : 'text-white opacity-90 hover:opacity-100'
                    } ${active === nav.title ? "font-bold !opacity-100" : ""
                    }`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                >
                  {nav.id.startsWith('/') ? (
                    <Link href={nav.id} aria-label={`Navigate to ${nav.title}`}>{nav.title}</Link>
                  ) : (
                    <a href={`#${nav.id}`} aria-label={`Navigate to ${nav.title}`}>{nav.title}</a>
                  )}
                </li>
              ))}
              {!isReaderMode && (
                <li className="flex items-center gap-2 px-3 py-1.5 mt-2 rounded-full bg-tertiary border border-white/10 shadow-sm w-full">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  <span className="text-white text-[14px] font-medium">Open to Work</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
