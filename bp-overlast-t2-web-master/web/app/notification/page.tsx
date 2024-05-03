import {getNeighborhoods} from "@util/mongodb/neighborhood";
import Form from "./form"
import React from "react";


export default async function InformationPage() {

    const neighborhood = await getNeighborhoods();
    const data = await neighborhood.toArray();

    return (
        <main className={"flex min-h-screen flex-col p-24 md:container md:mx-auto"}>
            <div className={"infopage-div"}>
                <h1 className={"text-2xl fo" +
                    "nt-bold mb-2"}>Alcoholmelding</h1>
                <Form data={data}/>
            </div>
        </main>
    )
}