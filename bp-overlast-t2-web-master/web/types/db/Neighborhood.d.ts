import {Document, ObjectId} from "mongodb";
import {Riskscore} from "@/types/db/Riskscore";
export interface Neighborhood extends Document {
    _id: ObjectId
    apiLink: string
    Key: string
    Title: string
    riscoscore: number
    sumOfGeregistreerdeOverlast: number
    sumOfUserScores: number
    userScore: Riskscore[]
}