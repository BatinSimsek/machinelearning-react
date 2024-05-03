'use client'
import React, {FormEvent, useState} from "react";
import {Neighborhood} from "@/types/db/Neighborhood";
import {WithId} from "mongodb";
interface FormProps {
    data: WithId<Neighborhood>[];
}

const Form: React.FC<FormProps> = ({data}) => {
    const [rangeValue, setRangeValue] = React.useState<number>(50);
    const [gebruikersNaam, setGebruikersNaam] = useState('');
    const [selectedNeighborhood, setSelectedNeighborhood] = useState('');
    const giveRangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newRangeValue: number = parseInt(event.target.value, 10);
        setRangeValue(newRangeValue);
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/risk', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    overlast: "E38",
                    gebruikersNaam: gebruikersNaam,
                    risicoScore: rangeValue,
                    neighborhoodId: selectedNeighborhood
                }),
            });

            if (response.status === 200) {
                setGebruikersNaam('');
                setRangeValue(50);
                window.location.href = '../';
            } else {
                const errorMessage = await response.text();
                console.error(`Error: ${response.status} - ${errorMessage}`);
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

    return (
        <main className={"flex flex-row"}>
            <form onSubmit={handleSubmit}>
                <div className={"form-div space-y-4"}>
                    <div className={"alert flex items-center"}>
                        <select className={"alcohol-drop p-4"}
                                value={selectedNeighborhood}
                                onChange={(e) => setSelectedNeighborhood(e.target.value)}
                        >
                            {data.map((neighborhood) => (
                                <option key={neighborhood._id.toString()} value={neighborhood._id.toString()}>
                                    {neighborhood.Title}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={"alert flex flex-col items-start"}>
                        <label>
                            Naam
                        </label>
                        <input
                            className={'input'}
                            id="email"
                            value={gebruikersNaam}
                            type="text"
                            name="gebruikersNaam"
                            onChange={(e) =>
                                setGebruikersNaam(e.target.value)}/>
                    </div>
                    <div className="alert flex flex-row">
                        <input
                            id="range"
                            type={"range"}
                            min={0} max={100}
                            value={rangeValue}
                            onChange={giveRangeValue}>
                        </input>
                        <span className={"value"}>{rangeValue}</span>
                    </div>
                    <div className={"form-btns"}>
                        <button className={"btn mr-5"} type={"submit"}>Maak melding</button>
                        <button className={"btn btn-form ml-10"} type={"button"}><a href={"../"}>Terug</a>
                        </button>
                    </div>
                </div>
            </form>
        </main>
    )
}

export default Form