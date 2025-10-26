import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const heroRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // 1️⃣ Background зөөлөн zoom-in + pan
            gsap.fromTo(
                ".hero-bg",
                { scale: 1, yPercent: 0 },
                {
                    scale: 1.15,
                    yPercent: 8,
                    ease: "power2.out",
                    duration: 6,
                }
            );

            // 2️⃣ Текст fade-up
            gsap.from(".hero-copy", {
                y: 40,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out",
            });
        }, heroRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            id="home"
            ref={heroRef}
            className="panel hero relative flex items-center justify-center min-h-[100svh] w-full overflow-hidden"
        >
            {/* BACKGROUND LAYER */}
            <div className="hero-bg absolute inset-0 bg-cover bg-center will-change-transform"
                 style={{ backgroundImage: "url('/render-6.png')" }}></div>

            {/* OVERLAY GRADIENT */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/45 to-black/35" />

            {/* CONTENT */}
            <div className="relative z-10 container mx-auto px-5 2xl:px-0 grid md:grid-cols-2 gap-10 items-center">
                <div className="hero-copy max-w-3xl text-center md:text-left">
                    <h1 className="headline-underline text-5xl md:text-6xl font-bold about-heading-gold leading-tight">
                        Сөүл Өргөө
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 mt-5 max-w-2xl mx-auto md:mx-0">
                        Ховор боломж, хязгааргүй тав тух.
                    </p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-7">
                        <a href="#about-1" className="btn-primary">Дэлгэрэнгүй</a>
                        <a href="tel:+97689995264" className="btn-ghost">Залгах</a>
                    </div>
                </div>
            </div>
        </section>
    );
}
