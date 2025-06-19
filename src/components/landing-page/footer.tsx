import React from 'react';
import Image from 'next/image'
import { FaLinkedinIn, FaFacebookF, FaYoutube, FaPhoneAlt } from 'react-icons/fa';

const Footer: React.FC = () => {
    return (
        <footer className="w-full bg-white border-t border-gray-200 text-sm text-gray-600 px-6 py-6">
            <div className="mx-auto  px-6 pt-[1.5rem] pb-[2rem]"></div>
            {/* <div className="mx-auto max-w-[90rem] px-6 pt-[1.5rem] pb-[2rem]"></div> */}
            <div className="max-w-[90rem] px-6 mx-auto flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0">
                {/* Left Section */}
                <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                        <Image
                            src="/logo/logo.png"
                            alt="Katwiran logo"
                            width={100}           // required
                            height={40}           // required
                            className="h-[3rem] w-auto object-contain"
                        />
                        <span className="font-bold text-gray-800">Katwiran.AI</span>
                    </div>
                    <p>© 2025 Katwiran, Inc. All Rights Reserved.</p>
                    <p>The Katwiran name and logo are registered trademarks.</p>
                    <div className="flex items-center gap-6 text-orange-500 font-medium mt-2">
                        <a href="#" className="hover:underline">Privacy Policy</a>
                        <a href="#" className="hover:underline">Terms of Service</a>
                        <a href="tel:+18669349062" className="flex items-center space-x-2 hover:underline">
                            <FaPhoneAlt className="text-sm" />
                            <span>(+63) 0917 915-0014</span>
                        </a>
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex flex-col items-start md:items-end space-y-2">
                    <p className="text-gray-800 font-medium">Join the conversation.</p>
                    <div className="flex gap-3">
                        {[FaLinkedinIn, FaFacebookF, FaYoutube].map((Icon, i) => (
                            <a key={i} href="#" className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full">
                                <Icon className="h-4 w-4" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
