'use client'
import {WithId} from "mongodb";
import {Neighborhood} from "@/types/db/Neighborhood";
import React, {ChangeEvent, useState} from "react";
import {useNavigate} from 'react-router-dom';

interface FormProps {
    data: WithId<Neighborhood>[];
}
const Data: React.FC<FormProps> = ({data}) =>{
  const navigate = useNavigate();
  const [municipality, setMunicipality] = useState<Neighborhood | null>(null);
  const [error, setError] = useState(false)
  const handleDropdown = (selectedOption: ChangeEvent<HTMLSelectElement>) => {
      const select = selectedOption.target.value
      const selectData = data.find((neighborhood) => neighborhood._id.toString() === select)

      if (selectData){
          setMunicipality(selectData)
      }
  }

    const refresh = () => {
        window.location.reload();
    }

  const handleButton = () =>{
      try {
        if (municipality !== null){
            navigate('/results', {state: {municipality: municipality}});
            refresh();
        }else{
            console.error(setError)
        }
      } catch (error) {
          console.error(setError)
      }
  }



    return (
        <main className={"flex flex-row"}>
            <div className={"alcohol-alert flex flex-col items-startp-4"}>
                <button className={"btn btn-alcohol"} type={"button"}>
                    <a href={"../notification"}>Alcohol melding maken</a>
                </button>
                <select className={"alcohol-drop p-4"} onChange={handleDropdown}>
                    {data.map((neighborhood) => (
                        <option key={neighborhood._id.toString()} value={neighborhood._id.toString()}>
                            {neighborhood.Title}
                        </option>
                    ))}
                </select>
                <button className={"btn btn-alcohol"} onClick={handleButton}>
                Resultaat
                </button>
            </div>
        </main>
    )
}
export default Data
