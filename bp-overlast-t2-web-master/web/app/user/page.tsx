'use client'
import React, { useState, FormEvent } from 'react';
import { useLocation } from 'react-router-dom';

export default function InformationPage() {
    const location = useLocation();
    // @ts-ignore
    const { municipality } = location.state || {};
    const [newGebruikersNaam, setNewGebruikersNaam] = useState('');
    const [rangeValue, setRangeValue] = React.useState<number>(50);

    const giveRangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newRangeValue: number = parseInt(event.target.value, 10);
        setRangeValue(newRangeValue);
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            console.log(newGebruikersNaam)
            console.log(rangeValue)

            if (municipality && municipality._id) {
                const response = await fetch('/api/risk', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        riskScoreId: municipality._id,
                        newGebruikersNaam: newGebruikersNaam,
                        newRisicoScore: Number(rangeValue),
                    }),
                });

                if (response.status === 200) {
                    window.location.href = '../';
                } else {
                    const errorMessage = await response.text();
                    console.error(`Error: ${response.status} - ${errorMessage}`);
                }
            } else {
                console.error('Invalid municipality object or missing _id');
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };


    return (
        <main className={"flex min-h-screen flex-col p-24 md:container md:mx-auto"}>
            <div className={"infopage-div"}>
                <h1 className={"text-2xl font-bold mb-2"}>Gebruiker update</h1>
                {municipality && (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <p>Gebruiker informatie:</p>
                            <p>ID: {municipality._id}</p>
                            <p>Gebruiksnaam: {municipality.gebruikersNaam}</p>
                            <p>Riscoscore: {municipality.risicoScore}</p>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="gebruikersNaam">New GebruikersNaam:</label>
                            <input
                                className={'input'}
                                type="text"
                                id="gebruikersNaam"
                                value={newGebruikersNaam}
                                onChange={(e) => setNewGebruikersNaam(e.target.value)}
                            />
                        </div>
                        <div className="alert flex flex-row mt-4">
                            <input
                                id="range"
                                type={"range"}
                                min={0} max={100}
                                value={rangeValue}
                                onChange={giveRangeValue}>
                            </input>
                            <span className={"value"}>{rangeValue}</span>
                        </div>
                        <div className={"form-btns mt-4"}>
                            <button className={"btn mr-5"} type={"submit"}>Maak melding</button>
                            <button className={"btn btn-form ml-10"} type={"button"}><a href={"../"}>Terug</a>
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </main>
    );
}
