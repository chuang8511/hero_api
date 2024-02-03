import * as cron from 'node-cron';
import { getHeros, getHeroProfile, getHero } from '../apis/hero_api';
import { HeroResponse } from '../apis/responses/heroResponse';
import { ProfileResponse } from '../apis/responses/profileResponse';
import { HeroPersistence } from '../persistences/heroPersistence';
import { initializeDataSource } from "../app-data-source";
import { initializeCache } from '../cache/redis';


const jobSchedule = '*/5 * * * * *';

const cronJob = cron.schedule(jobSchedule, async () => {
  try {
      const client = await initializeCache()
      const latest_hero_id = await client.get("latest_hero_id")

      if (latest_hero_id) {
        const allHeros: HeroResponse[] = await getHeros();

        const toBeSaveHeros: HeroResponse[] = []
        const toBeProfiles: ProfileResponse[] = []

        let maxHeroId = parseInt(latest_hero_id)
        for ( let i = 0; i < allHeros.length; i++ ) {
          if (parseInt(allHeros[i].id) > parseInt(latest_hero_id)) {
            toBeSaveHeros.push(allHeros[i])

            maxHeroId = Math.max(maxHeroId, parseInt(allHeros[i].id))

            const profile = await getHeroProfile(allHeros[i].id)
            toBeProfiles.push(profile)
          }
        }

        HeroPersistence.saveHerosAndProfiles(toBeSaveHeros, toBeProfiles)

        await client.set("latest_hero_id", maxHeroId)

      } else {
        const heros: HeroResponse[] = await getHeros();
      
        heros.sort((a, b) => a.id.localeCompare(b.id));
        
        const heroIds: string[] = heros.map(hero => hero.id);
        const profiles: ProfileResponse[] = await Promise.all(
          heroIds.map(heroId => getHeroProfile(heroId))
        );

        HeroPersistence.saveHerosAndProfiles(heros, profiles)

        await client.set("latest_hero_id", heros[heros.length - 1]["id"])
      }

      client.quit()
    } catch (error) {
      console.error('Error:', error);
    }
  }, {
    scheduled: false,
  });

initializeDataSource()
cronJob.start();