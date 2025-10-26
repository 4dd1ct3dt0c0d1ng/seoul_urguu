// Navbar.jsx
import React, { useEffect, useRef, useState } from 'react';
import '../index.css';
import { FaFacebookF, FaPhoneAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [open, setOpen] = useState(false);
    const lastYRef = useRef(0);

    useEffect(() => {
        const thresholdDown = 80;
        const thresholdUp = 40;
        const handleScroll = () => {
            const currentY = window.scrollY;
            const delta = currentY - lastYRef.current;
            if (delta > thresholdDown) setCollapsed(true);
            else if (delta < -thresholdUp) setCollapsed(false);
            lastYRef.current = currentY;
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // ✅ drawer нээгдсэн үед body-г түгжих
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "auto";
    }, [open]);

    const closeMenu = () => setOpen(false);

    return (
        <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${collapsed ? 'nav-collapsed' : ''}`}>
            <nav className="container mx-auto flex justify-between items-center px-5 2xl:px-0 h-[72px]">
                <a href="/" className="flex items-center gap-2">
                    <img src="/logo.svg" alt="logo" className="logo h-16 w-auto cursor-pointer hover:scale-105 transition-transform duration-300" />
                </a>

                <ul className="nav-links hidden md:flex items-center gap-8">
                    <li><a className="nav-ink" href="/">Нүүр</a></li>
                    <li><a className="nav-ink" href="/apartments">Орон сууц</a></li>
                    <li><Link className="nav-ink" to="/#about-4">Холбоо барих</Link></li>
                </ul>


                <div className="hidden md:flex items-center gap-4">
                    <a href="https://www.facebook.com/profile.php?id=61576541055585" target="_blank" rel="noopener noreferrer"
                       className="p-2 rounded-full border border-[#D89B1C] text-[#D89B1C] hover:bg-[#D89B1C] hover:text-white transition-all duration-300" aria-label="Facebook">
                        <FaFacebookF size={18} />
                    </a>
                    <a href="tel:+97689995264"
                       className="p-2 rounded-full border border-[#D89B1C] text-[#D89B1C] hover:bg-[#D89B1C] hover:text-white transition-all duration-300" aria-label="Call">
                        <FaPhoneAlt size={18} />
                    </a>
                </div>

                <button
                    className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[#D89B1C]/50 text-[#D89B1C]"
                    aria-label="Toggle menu" onClick={() => setOpen(true)}>
                    <span className="sr-only">Open menu</span>
                    <span className="block w-5 h-[2px] bg-current"></span>
                    <span className="block w-5 h-[2px] bg-current mt-[5px]"></span>
                    <span className="block w-5 h-[2px] bg-current mt-[5px]"></span>
                </button>
            </nav>

            {/* Mobile */}
            <div className={`md:hidden fixed inset-0 z-40 transition-opacity ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={closeMenu}>
                <div className="absolute inset-0 bg-black/40" />
                <aside className={`absolute right-0 top-0 h-full w-4/5 max-w-[360px] bg-white text-[#0C6B73] shadow-2xl p-6 transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`} onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-between mb-6">
                        <img src="/logo.svg" alt="logo" className="h-10" />
                        <button className="w-9 h-9 rounded-lg border border-[#D89B1C]/50 text-[#D89B1C]" onClick={closeMenu} aria-label="Close menu">✕</button>
                    </div>

                    <nav className="flex flex-col gap-4">
                        <a className="mobile-link" href="/" onClick={closeMenu}>Нүүр</a>
                        <a className="mobile-link" href="/Apartments" onClick={closeMenu}>Орон сууц</a>
                        <a className="mobile-link" href="#about-4" onClick={closeMenu}>Холбоо барих</a>
                    </nav>

                    <div className="mt-6 flex items-center gap-3">
                        <a href="https://www.facebook.com/profile.php?id=61576541055585" target="_blank" rel="noopener noreferrer"
                           className="p-2 rounded-full border border-[#D89B1C] text-[#D89B1C]" aria-label="Facebook">
                            <FaFacebookF size={18} />
                        </a>
                        <a href="tel:+97689995264" className="p-2 rounded-full border border-[#D89B1C] text-[#D89B1C]" aria-label="Call">
                            <FaPhoneAlt size={18} />
                        </a>
                    </div>
                </aside>
            </div>
        </header>
    );
};

export default Navbar;
