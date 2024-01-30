import * as cron from 'node-cron';
import { getHeros, getHeroProfile } from '../apis/hero_api';
import { HeroResponse } from '../apis/responses/heroResponse';
import { ProfileResponse } from '../apis/responses/profileResponse';
import { HeroPersistence } from '../persistences/heroPersistence';
import { initializeDataSource } from "../app-data-source";


const jobSchedule = '*/3 * * * * *';

const cronJob = cron.schedule(jobSchedule, async () => {
  try {
      const heros: HeroResponse[] = await getHeros();
      const heroIds: number[] = heros.map(hero => parseInt(hero.id));
      const profiles: ProfileResponse[] = await Promise.all(
        heroIds.map(heroId => getHeroProfile(heroId))
      );

      HeroPersistence.saveHerosAndProfiles(heros, profiles)
  
    } catch (error) {
      console.error('Error:', error);
    }
  }, {
    scheduled: false,
  });

initializeDataSource()
cronJob.start();


cronJob.on('start', () => {
    console.log("Job has been started")
})

cronJob.on('stop', () => {
    console.log('Cron job stopped');
});

cronJob.on('complete', () => {
console.log('Cron job completed');
});

cronJob.on('interrupt', () => {
console.log('Cron job interrupted');
});