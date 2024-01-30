import axios from 'axios';
import * as apiUrls from './apiUrls';
import { HeroResponse } from './responses/heroResponse';
import { ProfileResponse } from './responses/profileResponse';

export async function getHeros(): Promise<HeroResponse[]> {
    try {
        const { data, status } = await axios.get(
            apiUrls.HEROES_API_URL,
            {
                headers: {
                    "Accept": 'application/json',
                    "Content-Type": 'application/json'
                }
            }
        )
        return data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return Promise.reject(error);
        } else {
            return Promise.reject('An unexpected error occurred');
        }
    }
}

export async function getHeroProfile(heroId: number): Promise<ProfileResponse> {
    try {
        const { data, status } = await axios.get(
            apiUrls.HERO_PROFILE_API_URL(heroId),
            {
                headers: {
                    "Accept": 'application/json',
                    "Content-Type": 'application/json'
                }                
            }
        )
        return data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return Promise.reject(error);
        } else {
            return Promise.reject('An unexpected error occurred');
        }
    }
}

