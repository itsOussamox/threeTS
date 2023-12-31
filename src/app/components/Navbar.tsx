import Link from "next/link";
import React from "react";
import { FaHome } from "react-icons/fa";
import { IoGameController } from "react-icons/io5";
import { HiInformationCircle } from "react-icons/hi";


export default function Navbar() {
    return (
        <div className = "top-0 right-[45%] flex flex-col h-[4vh] items-center fixed">
            <div className="w-[11vw] h-full border-2 rounded-lg border-[#4c52554d] bg-[#596063] flex flex-row items-center justify-center gap-[2vw]">
                <Link href={'/'} className="h-full w-[2vw]">
                    <FaHome className="h-full w-full" />
                </Link>
                <Link href={'/scene'} className="h-full w-[2vw]">
                    <IoGameController className="h-full w-full" />
                </Link>
                <Link href={'/trial'} className="h-full w-[2vw]">
                    <HiInformationCircle className="h-full w-full" />
                </Link>
            </div>
        </div>
    )
}