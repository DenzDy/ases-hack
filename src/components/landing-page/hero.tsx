"use client";

import React from "react";
import Image from "next/image";

import {
    faUser,
    faPenNib,
    faCalendarAlt,
    faFileAlt,
    faClock,
    faCommentDots,
    faCreditCard,
    faCheckCircle
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function Hero() {
    return (
        <section className="relative min-h-[100vh] bg-zinc-100">

            {/* Section 0 — Announcement bar */}
            <div className="w-full bg-gradient-to-r from-orange-500 via-indigo-500 to-cyan-400 py-2 px-4 text-center text-sm text-white">
                <span className="font-medium">
                    Lexora is launching this July in <span className="font-semibold">Metro Manila</span> — early sign-ups get <span className="font-semibold">free AI legal tools</span> for 30 days.
                </span>

                <a
                    href="#"
                    className="ml-4 inline-flex items-center gap-1 font-semibold underline underline-offset-2"
                >
                    Join the Waitlist
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </a>
            </div>


            {/* Section A - Static bar */}
            <div className="mx-auto max-w-[90rem] px-6 pt-[1.5rem] pb-[2rem]">
                <nav className="flex h-[72px] w-full items-center justify-between rounded-2xl border border-zinc-200 bg-white px-8 shadow-sm">
                    {/* left: logo + main nav */}
                    <div className="flex items-center gap-10">
                        <Image
                            src="/logo/logo.png"
                            alt="Lexora logo"
                            width={200}
                            height={200}
                            className="h-[3rem] w-auto object-contain"
                        />


                        <div className="hidden gap-7 text-base font-medium text-black md:flex">
                            <a href="#">Products <span className="text-xs">▾</span></a>
                            <a href="#">Firm Type <span className="text-xs">▾</span></a>
                            <a href="#">Pricing</a>
                            <a href="#">Partner Network <span className="text-xs">▾</span></a>
                            <a href="#">Use Cases</a>
                            <a href="#">Resources <span className="text-xs">▾</span></a>
                        </div>
                    </div>

                    {/* right: CTA buttons */}
                    <div className="flex items-center gap-6 text-base">
                        <a href="/login" className="font-medium text-orange-600">
                            Log in
                        </a>
                        <a
                            href="#"
                            className="rounded-md bg-orange-600 px-6 py-2.5 font-semibold text-white hover:bg-orange-700"
                        >
                            Get a Quote
                        </a>
                    </div>
                </nav>
            </div>


            {/* Section B */}
            <div className="mx-auto flex h-full max-w-[84rem] flex-col items-center justify-center px-6 md:flex-row py-[2rem]">
                {/* ───────────────────── LEFT ───────────────────── */}
                <div className="md:w-1/2 space-y-8">
                    <h1 className="font-serif text-3xl font-bold text-slate-950 md:text-5xl leading-none">
                        Industry-Leading Legal Case Management.   <span className="bg-gradient-to-r from-orange-500 via-indigo-500 to-cyan-400 bg-clip-text text-transparent">
                            Powered by AI
                        </span>
                    </h1>

                    {/* feature list */}
                    <ul className="space-y-5">
                        {[
                            {
                                title: "Case Management",
                                desc: "keep all of your case details and documents in one location.",
                            },
                            {
                                title: "Client Communication",
                                desc: "real-time updates, messaging, document sharing, and task management.",
                            },
                            {
                                title: "Billing and Payments",
                                desc: "track time, generate invoices, and accept payments.",
                            },
                        ].map(({ title, desc }) => (
                            <li key={title} className="flex items-start gap-3">
                                <FontAwesomeIcon
                                    icon={faCheckCircle}
                                    className="mt-1 h-5 w-5 text-indigo-500"
                                />
                                <p className="text-lg leading-snug">
                                    <span className="font-semibold">{title}</span> – {desc}
                                </p>
                            </li>
                        ))}
                    </ul>

                    {/* email capture */}
                    <form
                        onSubmit={(e) => e.preventDefault()}
                        className="mt-10 flex w-full max-w-md flex-col gap-3 sm:flex-row"
                    >
                        <input
                            type="email"
                            required
                            placeholder="Email address"
                            className="flex-1 rounded-md border border-zinc-300 bg-white px-4 py-3 text-base outline-none placeholder-zinc-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                        />
                        <button
                            type="submit"
                            className="rounded-md bg-orange-600 px-6 py-3 text-base font-semibold text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-300"
                        >
                            Get Started
                        </button>
                    </form>
                </div>

                {/* ───────────────────── RIGHT ───────────────────── */}
                <div className="relative mt-14 md:mt-0 hidden md:block md:w-1/2 md:pl-12">
                    {/* Base wrapper */}
                    <div className="relative w-full h-[32rem]">
                        {/* Card 1 - top left */}
                        <div className="absolute top-0 left-0 w-[60%] rounded-xl border border-zinc-200 bg-white shadow-md overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1589994965851-a8f479c573a9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Lady Justice"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Card 2 - top right */}
                        <div className="absolute top-4 right-0 w-[45%] rounded-xl border border-zinc-200 bg-white shadow-md overflow-hidden z-10">
                            <img
                                src="https://images.unsplash.com/photo-1505664063603-28e48ca204eb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Lady Justice"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Card 3 - bottom left */}
                        <div className="absolute bottom-0 left-4 w-[48%] rounded-xl border border-zinc-200 bg-white shadow-md overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1423592707957-3b212afa6733?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxhd3xlbnwwfHwwfHx8MA%3D%3D"
                                alt="Lady Justice"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Card 4 - bottom right */}
                        <div className="absolute bottom-8 right-15 w-[45%] h-[300px] rounded-xl border border-zinc-200 bg-white shadow-md overflow-hidden">
                            <img
                                src="https://plus.unsplash.com/premium_photo-1694819426904-79debe3c91c6?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGVjaCUyMGxhd3xlbnwwfHwwfHx8MA%3D%3D"
                                alt="Lady Justice"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>


            <div className="mx-auto flex h-full max-w-[84rem] flex-col items-center justify-center px-6 md:flex-row py-[2rem]"></div>

            {/* Section C — Feature Cards */}
            <div className="mx-auto max-w-[84rem] px-6 py-[2rem]">
                {/* keep cards on a single row on lg, wrap on smaller */}
                <ul className="flex flex-wrap justify-center gap-3">
                    {[
                        { icon: faUser, label: "Client Intake Forms" },
                        { icon: faPenNib, label: "eSignature" },
                        { icon: faCalendarAlt, label: "Calendaring" },
                        { icon: faFileAlt, label: "Document Management" },
                        { icon: faClock, label: "Time & Expense Tracking" },
                        { icon: faCommentDots, label: "Text Messaging" },
                        { icon: faCreditCard, label: "Billing & Payments" },
                    ].map(({ icon, label }) => (
                        <li
                            key={label}
                            className="relative w-40 rounded-2xl bg-zinc-50 p-5 text-center shadow-md ring-1 ring-zinc-200"
                        >
                            {/* info badge */}
                            <span className="absolute right-2 top-2 inline-flex h-5 w-5 items-center justify-center rounded-full border border-zinc-400 bg-white text-[11px] font-bold text-zinc-800">
                                i
                            </span>

                            {/* icon */}
                            <FontAwesomeIcon
                                icon={icon}
                                className="text-indigo-500 text-3xl mb-4"
                            />

                            {/* label */}
                            <p className="text-[14px] font-semibold leading-snug text-zinc-900">
                                {label}
                            </p>
                        </li>

                    ))}
                </ul>
            </div>



        </section>
    );
}
