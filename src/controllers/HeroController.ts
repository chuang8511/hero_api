import { HeroPersistence } from "../persistences/heroPersistence"

export class HeroController {
    static getAllHeros = async () => {
        const heros = await HeroPersistence.getHeros()
        return { "heros": heros }
    }

    static getHero = async (id: number) => {
        return await HeroPersistence.getHero(id)
    }
}