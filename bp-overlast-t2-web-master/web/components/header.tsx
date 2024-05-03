"use client"
import Image from "next/image";

export default function Header() {

    return(
        <header  className={'secondary-color pt-3 pb-3 shadow-md'}>
            <div className={'container-header'}>
                <div className={'flex justify-between items-center'}>
                    <a href="..">
                        <Image
                            src="/LogoBP5.svg"
                            alt="Vercel Logo"
                            width={80}
                            height={24}
                            priority
                        />
                    </a>
                    <nav className={'flex items-center'}>
                        <a className={'mr-4 text-white'} href="../contact">Contact</a>
                    </nav>
                </div>
            </div>
        </header>
    )
}
