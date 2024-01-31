import { myDataSource } from "../app-data-source";
import { Hero } from "../entity/hero.entity";
import { Profile } from "../entity/profile.entity";
import { HeroResponse } from '../apis/responses/heroResponse';
import { ProfileResponse } from '../apis/responses/profileResponse';

export class HeroPersistence {

    static saveHerosAndProfiles = async (heros: HeroResponse[], profiles: ProfileResponse[]) => {
        
        HeroPersistence.checkAndSaveData(heros, 
            Hero, 
            "id_from_external", 
            "id", 
            { "id_from_external": "id", "name": "name", "image": "image" }
            )

        HeroPersistence.checkAndSaveData(profiles, 
            Profile, 
            "hero_id", 
            "hero_id", 
            { "hero_id": "hero_id", "str": "str", "int": "int", "agi": "agi", "luk": "luk" }
            )

    }

    static getHeros = async () => {
        const heros = await myDataSource.getRepository(Hero).find()
        let heroResponse = []
        for (let i = 0; i < heros.length; i++) {
            let hero = heros[i]
            heroResponse.push({
                "id": hero.id_from_external,
                "name": hero.name,
                "image": hero.image
            })
        }
        return heroResponse
    }

    static getHero = async (id: number) => {
        const hero = await myDataSource.getRepository(Hero).findOne({
            where: {
                id_from_external: id
            }
        })
        return { "id": hero?.id_from_external, "name": hero?.name, "image": hero?.image  }
    }

    private static checkAndSaveData = async (responses: any[], orm: any, searchKey: string, searchVal: string, dataHash: { [key: string]: string }) => {
        for (let i = 0; i < responses.length; i++) {
            let res = responses[i]
            
            const dataOrm = await myDataSource.getRepository(orm).findOne({
                where: {
                    [searchKey]: res[searchVal]
                }
            })
            if (dataOrm === null) {
                const dataEntity = new orm
                for (const key of Object.keys(dataHash)) {
                    const val = dataHash[key];
                    dataEntity[key] = res[val];
                }
                await myDataSource.getRepository(orm).save(dataEntity)
            }
        }
    }
}



