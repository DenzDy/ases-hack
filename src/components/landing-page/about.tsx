"use client";

import React from "react";
import Image from "next/image";

import Calculator from "./calculator"

const companyIntegration2 = "/images/partners/company-2.png";
const companyIntegration4 = "/images/partners/company-4.png";
const companyIntegration5 = "/images/partners/company-5.png";
const companyIntegration7 = "/images/partners/company-7.png";
const companyIntegration8 = "/images/partners/company-8.png";
const companyIntegration9 = "/images/partners/company-9.png";
const companyIntegration10 = "/images/partners/company-10.png";

export default function About() {
    return (
        <section className="relative min-h-[100vh] bg-gradient-to-br from-indigo-600 via-indigo-500 to-indigo-400 text-white">


            {/* Section A — Integrations */}
            <div className="mx-auto max-w-[84rem] px-6 pt-[6rem] pb-[3rem] text-center">
                <h2 className="font-serif text-4xl md:text-5xl font-extrabold">
                    A platform tailored around your firm
                </h2>
                <p className="mt-4 text-lg md:text-xl text-white/90">
                    Level up your firm with commonly used technologies in the Philippines.
                </p>

                {/* white-only logos */}
                <ul className="mt-14 flex flex-wrap justify-center gap-x-10 gap-y-12">
                    {[
                        companyIntegration2,
                        companyIntegration4,
                        companyIntegration5,
                        companyIntegration7,
                        companyIntegration8,
                        companyIntegration9,
                        companyIntegration10,
                    ].map((src) => (
                        <li key={src}>
                            <Image
                                src={src}
                                alt="Integration logo"
                                height={500}
                                width={500}
                                className="h-12 w-auto object-contain filter brightness-0 invert"
                            />
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mx-auto max-w-7xl px-6 py-[1.5rem] text-center">
                <div className="my-[3rem] md:my-[7rem] flex items-center gap-4 text-center">
                    {/* left line */}
                    <span className="flex-1 h-px bg-white/70" />
                    {/* label */}
                    <span className="text-xl md:text-2xl font-light text-white/70 ">
                        Looking for something different?
                    </span>
                    {/* right line */}
                    <span className="flex-1 h-px bg-white/70" />
                </div>

            </div>

            {/* Section B — See what we can do for you */}
            <div className="mx-auto max-w-[84rem] px-6 pt-[3rem] pb-[6rem] text-center">
                <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-12">

                    {/* Left */}
                    <div className="md:w-1/2 text-center md:text-left">
                        <h2 className="text-4xl md:text-4xl font-black text-white">
                            See what we can do for you
                        </h2>
                        <p className="mt-4 text-lg md:text-xl text-white/90">
                            Use this calculator to determine your long term growth with us
                        </p>
                    </div>

                    {/* Right */}
                    <Calculator />
                </div>
            </div>
        </section>


    );
}