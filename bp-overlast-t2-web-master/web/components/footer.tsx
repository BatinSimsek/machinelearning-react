"use client"

import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faInstagram, faFacebook, faTwitter, faLinkedin} from '@fortawesome/free-brands-svg-icons';
import {Inter} from 'next/font/google'

const inter = Inter({subsets: ['latin']})

export default function Footer() {
    const [state, setState] = useState<string>();

    async function handleOnSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault()
        console.log('Form submitted'); // Log something when the form is submitted
        setState('loading');
        await fetch('/api/email', {
            method: 'POST',
        })
        setState('ready');
        console.log('Form submitted');
    }

    return (
        <footer className="secondary-color text-white flex items-center">
            <div className="container mx-auto py-6 text-center">
                <div className="mb-6 flex justify-center">
                    <span className="mr-4 border spanborder">Nieuwsbrief</span>
                </div>
                <form className="mt-4 mb-5 flex justify-center" onSubmit={handleOnSubmit}>
                    <input
                        type="email"
                        id="email"
                        placeholder="Email address"
                        className="bg-gray-200 rounded px-3 py-2 focus:outline-none mr-5 focus:bg-white"
                    />
                    <button className="btn" type="submit">Inschrijven</button>
                </form>
                <div className="mb-4 flex justify-center">
                    <a href="https://www.instagram.com/politie/" className="text-white">
                        <FontAwesomeIcon icon={faInstagram} className="mr-2 icon"/>
                    </a>
                    <a href="https://www.facebook.com/politie/" className="text-white">
                        <FontAwesomeIcon icon={faFacebook} className="mr-2 icon"/>
                    </a>
                    <a href="https://twitter.com/Politie?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
                       className="text-white">
                        <FontAwesomeIcon icon={faTwitter} className="mr-2 icon"/>
                    </a>
                    <a href="https://www.linkedin.com/company/politie-nederland/?originalSubdomain=nl"
                       className="text-white">
                        <FontAwesomeIcon icon={faLinkedin} className="mr-2 icon"/>
                    </a>
                </div>
                <div className="w-full p-4 bg-opacity-20">
                    © 2023 Copyright:
                    <a className="text-white" href="..">
                        Overlast
                    </a>
                </div>
            </div>
        </footer>
    )
}