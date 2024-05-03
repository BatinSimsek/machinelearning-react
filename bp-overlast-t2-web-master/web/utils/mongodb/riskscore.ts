import type {Riskscore} from '@/types/db/Riskscore';
import {cache} from "react";
import {getCollection} from "@util/mongodb/index";
import {Filter} from "mongodb";


export const getRiskscore = cache(async (
    filter: Filter<Riskscore> = {}
) => {
    const collection = await getCollection<Riskscore>(
        'bpoverlast_02',
        'risicoscores'
    )

    return collection.find(filter)
})