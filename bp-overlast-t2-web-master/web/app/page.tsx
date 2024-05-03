import {getNeighborhoods} from '@util/mongodb/neighborhood';
import Data from './data'
import CrimeData from './crimeData'
import { getCrimes } from '@/utils/mongodb/crimes';
import { getRiskscore } from '@/utils/mongodb/riskscore';
import User from './user'


export default async function Home() {
    const neighborhoodData = await getNeighborhoods()
    const data = await neighborhoodData.toArray()
    const crimesData = await getCrimes()
    const crimesD = await crimesData.toArray()
    const userData = await getRiskscore()
    const user = await userData.toArray()

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 md:container md:mx-auto">
            <div className="homepage-div flex">
                <div className="home p-4">
                    <h1 className={"text-2xl font-bold mb-2"}>Politieoverlast</h1>
                    <p className={"text-gray-700"}>Welkom bij "politieoverlast," jouw online bron voor het verkennen van
                        maatschappelijke uitdagingen en het bevorderen van bewustwording. Onze missie is om een dieper
                        begrip te creëren van problemen die onze samenleving beïnvloeden, en we beginnen met twee
                        cruciale datasets: alcoholoverlast en het mysterieuze "xxx."</p>
                    <br/>
                    <p className={"text-gray-700"}><b>Overlastscores voor Alcoholoverlast:</b> Dit is een probleem dat
                        vele gemeenschappen wereldwijd treft. Het overmatige gebruik van alcohol kan leiden tot ernstige
                        gevolgen, waaronder gezondheidsproblemen, sociale conflicten en veiligheidsrisico's. Op
                        "politieoverlast" hebben we overlastscores verzameld en geanalyseerd om te laten zien welke
                        gemeenten het meest getroffen zijn door alcoholgerelateerde problemen. We presenteren deze
                        scores op een schaal van 1 tot 100 om de ernst van de situatie duidelijk te maken.</p>
                    <div className={"home-btns flex flex-row "}>
                        <Data data={data}/>
                        <CrimeData data={crimesD}/>
                    </div>
                    <div>
                        <h2>Gebruiker update</h2>
                        <User data={user} />
                    </div>
                </div>
            </div>
        </main>
    )
}