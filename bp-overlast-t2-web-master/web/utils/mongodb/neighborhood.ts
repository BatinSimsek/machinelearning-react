import type {Neighborhood} from '@/types/db/Neighborhood';
import {cache} from "react";
import {getCollection} from "@util/mongodb/index";
import {Filter} from "mongodb";

export const revalidate = 3600 // revalidate the data at most every hour

export const getNeighborhoods = cache(async (
    filter: Filter<Neighborhood> = {}
) => {
    const collection = await getCollection<Neighborhood>(
        'bpoverlast_02',
        'neighborhoods'
    )

    return collection.find(filter)
})
