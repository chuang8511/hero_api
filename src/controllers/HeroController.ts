import { HeroPersistence } from "../persistences/heroPersistence"
import { AuthenticatePersistence } from "../persistences/authenticatePersistence";

export class HeroController {
    static getAllHeros = async () => {
        const heros = await HeroPersistence.getHeros()
        return { "heros": heros }
    }

    static getHero = async (id: number) => {
        return await HeroPersistence.getHero(id)
    }

    static getAuthenticatedHeros = async (username: string, password: string) => {
        const result = await AuthenticatePersistence.comparePassword(username, password)
        if (result == "succeed") {
            const data = await HeroPersistence.getHerosAndProfiles()
            const res = []
            for (let i = 0; i < data.length; i++) {
                const d = data[i]
                const formatData = HeroController.buildJsonFormat(d)
                res.push(formatData)
            }
            return { "heroes": res }
        } else {
            const heros = await HeroPersistence.getHeros()
            return { "heros": heros }
        }
    }

    static getAuthenticatedHero = async (username: string, password: string, id: string) => {
        const result = await AuthenticatePersistence.comparePassword(username, password)

        if (result == "succeed") {
            const data = await HeroPersistence.getHeroAndProfile(id)
            return HeroController.buildJsonFormat(data)
        } else {
            const heros = await HeroPersistence.getHeros()
            return { "heros": heros }
        }
    }

    private static buildJsonFormat = (data: any) => {
    
        return {
            "id": data.id_from_external.toString(),
            "name": data.name,
            "image": data.image,
            "profile": {
                "str": data.str,
                "int": data.int,
                "agi": data.agi,
                "luk": data.luk
            }
        }
    }
    
}