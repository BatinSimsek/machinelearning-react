import {getCollection} from "@util/mongodb";
import {Riskscore} from "@/types/db/Riskscore";
import {ObjectId, PushOperator} from "mongodb";
import {NextResponse} from "next/server";
import {Neighborhood} from "@/types/db/Neighborhood";

export async function POST(request: Request) {
    try {
        if (request.method !== 'POST') {
            return NextResponse.json({
                status: 'Method Not Allowed'
            }, {status: 405});
        }

        if (!request || !request.body) {
            return NextResponse.json({
                status: 'No body'
            });
        }

        const body = await request.json();
        const {gebruikersNaam, risicoScore, neighborhoodId} = body;

        const collection = await getCollection<Riskscore>('bpoverlast_02', 'risicoscores');
        const result = await collection.insertOne({
            _id: new ObjectId,
            overlast: "E38",
            gebruikersNaam: gebruikersNaam,
            risicoScore: risicoScore,
            neighborhoodId: new ObjectId(neighborhoodId)
        });

        if (!result.insertedId) {
            return NextResponse.json({
                status: 'Database error'
            });
        }

        const insertedRiskscore = await collection.findOne({_id: result.insertedId});
        const neighborhoodCollection = await getCollection<Neighborhood>('bpoverlast_02', 'neighborhoods');
        const neighborhoodObjectId = new ObjectId(neighborhoodId);

        const updatedNeighborhood = await neighborhoodCollection.findOneAndUpdate(
            {_id: neighborhoodObjectId},
            {
                $push: {
                    userScore: insertedRiskscore,
                },
            } as unknown as PushOperator<Neighborhood>
        );

        const userScores = await collection.find({neighborhoodId: neighborhoodObjectId}).toArray();
        const sumOfUserScores = userScores.reduce((total, score) => total + score.risicoScore, 0);

        await neighborhoodCollection.updateOne(
            {_id: neighborhoodObjectId},
            {$set: {sumOfUserScores}}
        );


        return NextResponse.json({
            status: 'OK'
        });

    } catch (error) {
        return NextResponse.json({error: 'Internal Server Error' + error}, {status: 500})
    }
}

export async function DELETE(request: Request) {
    try {
        const body = await request.json();
        const {riskScoreId} = body;

        const collection = await getCollection<Riskscore>('bpoverlast_02', 'risicoscores');

        const deletedRiskScore = await collection.findOneAndDelete({
            _id: new ObjectId(riskScoreId)
        });

        const neighborhoodId = deletedRiskScore?.neighborhoodId;

        if (!neighborhoodId) {
            return NextResponse.json({
                status: 'Risk score not found'
            }, {status: 404});
        }

        const neighborhoodCollection = await getCollection<Neighborhood>('bpoverlast_02', 'neighborhoods');

        const updatedNeighborhood = await neighborhoodCollection.findOneAndUpdate(
            {_id: neighborhoodId},
            {
                $pull: {
                    userScore: {
                        _id: new ObjectId(riskScoreId)
                    }
                }
            } as unknown as PushOperator<Neighborhood>
        );

        return NextResponse.json({
            status: 'OK'
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({error: 'Internal Server Error' + error}, {status: 500});
    }
}

export async function PUT(request: Request) {
    try {
        if (request.method !== 'PUT') {
            return NextResponse.json({
                status: 'Method Not Allowed'
            }, { status: 405 });
        }

        if (!request || !request.body) {
            return NextResponse.json({
                status: 'No body'
            });
        }

        const body = await request.json();
        const { riskScoreId, newGebruikersNaam, newRisicoScore } = body;

        const collection = await getCollection<Riskscore>('bpoverlast_02', 'risicoscores');

        const updatedRiskScore = await collection.findOneAndUpdate(
            { _id: new ObjectId(riskScoreId) },
            {
                $set: {
                    gebruikersNaam: newGebruikersNaam,
                    risicoScore: newRisicoScore,
                },
            },
            { returnDocument: 'after' }
        );

        const neighborhoodId = updatedRiskScore?.neighborhoodId;

        const neighborhoodCollection = await getCollection<Neighborhood>('bpoverlast_02', 'neighborhoods');

        const userScores = await collection.find({ neighborhoodId: new ObjectId(neighborhoodId) }).toArray();

        // Update the userScore array with the modified Riskscore
        const updatedNeighborhood = await neighborhoodCollection.findOneAndUpdate(
            { _id: new ObjectId(neighborhoodId) },
            {
                $set: {
                    userScore: userScores,
                },
            },
            { returnDocument: 'after' }
        );

        const sumOfUserScores = userScores.reduce((total, score) => total + score.risicoScore, 0);

        await neighborhoodCollection.updateOne(
            { _id: new ObjectId(neighborhoodId) },
            { $set: { sumOfUserScores } }
        );

        return NextResponse.json({
            status: 'OK'
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' + error }, { status: 500 });
    }
}