'use client'
import {WithId} from "mongodb";
import React, {ChangeEvent, FormEvent, useState} from "react";
import {useNavigate} from 'react-router-dom';
import {Riskscore} from "@/types/db/Riskscore";

interface FormProps {
    data: WithId<Riskscore>[];
}
const User: React.FC<FormProps> = ({data}) =>{
    const navigate = useNavigate();
    const [municipality, setMunicipality] = useState<Riskscore | null>(data.length > 0 ? data[0] : null);
    const [error, setError] = useState(false)
    const handleDropdown = (selectedOption: ChangeEvent<HTMLSelectElement>) => {
        const select = selectedOption.target.value
        const selectData = data.find((riskscore) => riskscore._id.toString() === select)

        if (selectData){
            setMunicipality(selectData)
        }
    }

    const reload = () => {
        window.location.reload();
    }

    const handleButton = () =>{
        try {
            if (municipality !== null){
                navigate('/user', {state: {municipality: municipality}});
                reload();
            }else{
                console.error(setError)
            }
        } catch (error) {
            console.error(setError)
        }
    }

    return (
        <main className={"flex flex-row"}>
            <div className={"dropdown flex flex-col items-start-4"}>
                <select className={"other-drop p-4"} onChange={(e) => handleDropdown(e)}>
                    {data.map((riskscore) => (
                        <option key={riskscore._id.toString()} value={riskscore._id.toString()}>
                            {riskscore.gebruikersNaam}
                        </option>
                    ))}
                </select>
                <button
                    className={"btn btn-other"}
                    onClick={handleButton}
                    disabled={!municipality}
                >
                    Update gebruiker
                </button>
            </div>
        </main>
    )
}
export default User
