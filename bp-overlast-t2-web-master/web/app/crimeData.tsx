'use client'
import {WithId} from "mongodb";
import {Crimes} from "@/types/db/Crimes";
import React, {ChangeEvent, FormEvent, useState} from "react";
import {useNavigate} from 'react-router-dom';

interface FormProps {
    data: WithId<Crimes>[];
}

const Data: React.FC<FormProps> = ({data}) => {
    const navigate = useNavigate();
    const [municipality, setMunicipality] = useState<Crimes | null>(null);
    const [error, setError] = useState(false)
    const handleDropdown = (selectedOption: ChangeEvent<HTMLSelectElement>) => {
        const select = selectedOption.target.value
        const selectData = data.find((crime) => crime._id.toString() === select)

        if (selectData) {
            setMunicipality(selectData)
        }
    }

    const reload = () => {
        window.location.reload();
    }

    const handleButton = () => {
        try {
            if (municipality !== null) {
                navigate('/crimes', {state: {municipality: municipality}});
                reload();
            } else {
                console.error(setError)
            }
        } catch (error) {
            console.error(setError)
        }
    }

    return (
        <main className={"flex flex-row"}>
            <div className={"dropdown flex flex-col items-start-4"}>
                <h2 className={'ml-5 font-bold'}>Crimineel dataset</h2>
                <select className={"other-drop p-4"} onChange={handleDropdown}>
                    {data.map((crimes) => (
                        <option key={crimes._id.toString()} value={crimes._id.toString()}>
                            {crimes.Title}
                        </option>
                    ))}
                </select>
                <button className={"btn btn-other"} onClick={handleButton}>
                    Resultaat
                </button>
            </div>
        </main>
    )
}
export default Data
