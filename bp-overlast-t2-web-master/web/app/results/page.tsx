'use client'
import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from 'react-router-dom';
import {Riskscore} from "@/types/db/Riskscore";

export default async function Results() {
    const getLocation = useLocation();
    // @ts-ignore
    const {municipality} = getLocation.state;
    const [userMunicipality, setMunicipality] = useState<Riskscore | null>(null);
    const [future, setFuture] = useState(null);

    useEffect(() => {
        const randomInt = Math.floor(Math.random() * 101);
        // @ts-ignore
        setFuture(randomInt);
    }, []);

    //@ts-ignore
    const totalScore = municipality.userScore.reduce((sum, score) => sum + score.risicoScore, 0);
    const maxPossibleScore = municipality.userScore.length * 100;
    const percentage = Math.round((totalScore / maxPossibleScore) * 100 * 100) / 100;

    const handleDelete = async (riskScoreId: any) => {
        try {
            const response = await fetch('/api/risk/', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    riskScoreId: riskScoreId,
                }),
            });

            if (response.status === 200) {
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
        <div className="flex min-h-screen flex -col items-center justify-between p-24 md:container md:mx-auto">
            <div className="resultspage-div flex">
                <div className="results p-4">
                    <h1 className={"text-2xl font-bold mb-2"}>Score</h1>
                    <div className={"currentresults"}>
                        <h3>Gemeentenaam: {municipality.Title}</h3>
                        <div>
                            <h3>score: {percentage.toFixed(2)} %</h3>
                        </div>
                    </div>
                    <div className={"mt-5"}>
                        <h3>Voorspelling:</h3>
                        <p>Toekomst: {future !== null ? future : 'laden...'}</p>
                    </div>
                    <div className={"mt-5"}>
                        <h3>Gebruikers:</h3>
                        <ul>
                            {/* @ts-ignore */}
                            {municipality.userScore.map((score, index) => (
                                <li key={index}>{score.gebruikersNaam}
                                    <button className={'ml-2'} key={index}
                                            onClick={() => handleDelete(score._id.toString())}>
                                        ❌
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <br/>
                    <p>Op "politieoverlast" gebruiken we een eenvoudig scoresysteem om de mate van overlast in
                        verschillende gemeenten aan te geven. We begrijpen dat duidelijkheid belangrijk is, dus hier is
                        een uitleg van onze scores, die variëren van 0 tot 100:</p>
                    <br/>
                    <p><b>0 tot 20:</b> Dit wordt beschouwd als een "Veilige" score. In gemeenten met een score in dit
                        bereik is er over het algemeen weinig tot geen overlast gerelateerd aan alcoholproblemen.
                        Bewoners kunnen zich hier over het algemeen veilig voelen.</p>
                    <br/>
                    <p><b>30 tot 60:</b> Dit wordt aangeduid als "Matige" overlast. Gemeenten met scores in dit bereik
                        kennen een gematigd niveau van alcoholgerelateerde problemen. Het is belangrijk om bewust te
                        zijn van mogelijke risico's, maar over het algemeen is er geen extreme alertheid nodig.</p>
                    <br/>
                    <p><b>60 tot 90:</b> Dit wordt beschouwd als "Gevaarlijke" overlast. In gemeenten met scores in dit
                        bereik zijn er aanzienlijke problemen met betrekking tot alcoholgerelateerde overlast. Bewoners
                        en bezoekers moeten voorzichtig zijn en maatregelen nemen om zichzelf te beschermen.</p>
                    <br/>
                    <p><b>90 tot 100:</b> Dit is "Heel Gevaarlijke" overlast. Gemeenten met scores in dit bereik worden
                        geconfronteerd met zeer ernstige problemen met betrekking tot alcoholoverlast. Wees uiterst
                        voorzichtig als u zich in deze gemeenten bevindt en zoek ondersteuning en begeleiding waar
                        mogelijk.</p>
                    <br/>
                    <div className={"btn-results p-4"}>
                        <button className={"btn btn-back"} type={"button"}><a href={"../"}>Terug</a></button>
                    </div>
                </div>
            </div>
        </div>
    )
}