export const HEROES_API_URL = 'https://hahow-recruit.herokuapp.com/heroes';
export const SINGEL_HEROES_API_URL = (heroId: string) => `https://hahow-recruit.herokuapp.com/heroes/${heroId}`
export const HERO_PROFILE_API_URL = (heroId: string) => `https://hahow-recruit.herokuapp.com/heroes/${heroId}/profile`;