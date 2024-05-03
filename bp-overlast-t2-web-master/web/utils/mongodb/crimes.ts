import type {Crimes} from '@/types/db/Crimes';
import {cache} from "react";
import {getCollection} from "@util/mongodb/index";
import {Filter} from "mongodb";

export const revalidate = 3600 // revalidate the data at most every hour

export const getCrimes = cache(async (
    filter: Filter<Crimes> = {}
) => {
    const collection = await getCollection<Crimes>(
        'bpoverlast_02',
        'crimesperneighborhood'
    )

    return collection.find(filter)
})
