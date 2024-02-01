import { HeroController } from "../../controllers/HeroController";
import { HeroPersistence } from "../../persistences/heroPersistence";
import { AuthenticatePersistence } from "../../persistences/authenticatePersistence";

jest.mock("../../persistences/heroPersistence")

describe('HeroController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })

    const getHerosMock = (data: Object) => {

        const mockGetHeros = jest.fn().mockResolvedValue(data);
    
        HeroPersistence.getHeros = mockGetHeros;
    };

    const getHeromock = (data: Object) => {
        const mockGetHero = jest.fn().mockResolvedValue(data)
        HeroPersistence.getHero = mockGetHero
    }



    describe("#getAllHeros", () => {
        beforeEach(() => {
            const mockHeros = [
                { id: "1", name: "fake_h_1", image: "fake_i_1" },
                { id: "2", name: "fake_h_1", image: "fake_i_2" },
            ]
            getHerosMock(mockHeros)
        })
        it("should return list of heroes", async () => {
            const result = await HeroController.getAllHeros()
            expect(result).toEqual({ heroes: [
                { id: "1", name: "fake_h_1", image: "fake_i_1" },
                { id: "2", name: "fake_h_1", image: "fake_i_2" },
            ] })
    
            expect(HeroPersistence.getHeros).toHaveBeenCalledTimes(1)
        })
    })

    describe('#getHero', () => {
        beforeEach(() => {
            const mockHero = {
                id: "1", name: "fake_h_1", image: "fake_i_1"
            }
            getHeromock(mockHero)
        })
        it("should return a hero", async () => {

            const fakeHeroId = 1
            const result = await HeroController.getHero(fakeHeroId)
            
            expect(result).toEqual({
                id: "1", name: "fake_h_1", image: "fake_i_1"
            })
            expect(HeroPersistence.getHero).toHaveBeenCalledWith(fakeHeroId)

        })
    })


    const setAuthenticationMock = (result: string) => {
        const mockComparePassword = jest.fn().mockResolvedValue(result);
        AuthenticatePersistence.comparePassword = mockComparePassword;
    };

    const mockGetHerosAndProfiles = (data: Array<Object>) => {
        const mockGetHerosAndProfiles = jest.fn().mockResolvedValue(data);
        HeroPersistence.getHerosAndProfiles = mockGetHerosAndProfiles
    }

    describe("#getAuthenticatedHeros", () => {

        describe("Context1: password is correct", () => {
            beforeEach(() => {
                setAuthenticationMock("succeed")
                mockGetHerosAndProfiles([
                    { id_from_external: 1, name: "fake_h_1", image: "fake_i_1", str: 2, int: 7, agi: 9, luk: 7 } ])})
            it("will get heroes and profiles", async () => {
                const result = await HeroController.getAuthenticatedHeros("fake_name", "fake_password")

                expect(result).toEqual({ 
                    heroes : [ 
                        { id: "1", 
                        name: "fake_h_1", 
                        image: "fake_i_1", 
                        profile: {
                            "str": 2,
                            "int": 7,
                            "agi": 9,
                            "luk": 7
                        }}] }
                  )
                expect(HeroPersistence.getHerosAndProfiles).toHaveBeenCalledTimes(1)
                expect(AuthenticatePersistence.comparePassword).toHaveBeenCalledWith("fake_name", "fake_password")

            })

        })

        describe("Context2: password is NOT correct", () => {
            beforeEach(() => {
                setAuthenticationMock("no username")
                getHerosMock([{ id: "1", name: "fake_h_1", image: "fake_i_1" }])
            })
            it("will get hero only", async () => {
                const result = await HeroController.getAuthenticatedHeros("fake_name", "fake_password")
                
                expect(result).toEqual( { heroes: [{ id: "1", name: "fake_h_1", image: "fake_i_1" }] })
                expect(HeroPersistence.getHeros).toHaveBeenCalledTimes(1)
                expect(AuthenticatePersistence.comparePassword).toHaveBeenCalledWith("fake_name", "fake_password")

            })
            
        })
        
    })

    const mockGetHeroAndProfile = (data: Object) => {
        const mockGetHeroAndProfile = jest.fn().mockResolvedValue(data)
        HeroPersistence.getHeroAndProfile = mockGetHeroAndProfile

    }
    describe("#getAuthenticatedHero", () => {
        describe("Context 1: password is correct", () => {
            beforeEach(() => {
                setAuthenticationMock("succeed")
                mockGetHeroAndProfile({ id_from_external: 1, name: "fake_h_1", image: "fake_i_1", str: 2, int: 7, agi: 9, luk: 7 })
            })
            it("will get hero and profile", async () => {
                const result = await HeroController.getAuthenticatedHero("fake_user", "fake_password", "1")
    
                expect(result).toEqual({ id: "1", 
                            name: "fake_h_1", 
                            image: "fake_i_1", 
                            profile: {
                                "str": 2,
                                "int": 7,
                                "agi": 9,
                                "luk": 7 }
                            })

                expect(AuthenticatePersistence.comparePassword).toHaveBeenCalledWith("fake_user", "fake_password")
                expect(HeroPersistence.getHeroAndProfile).toHaveBeenCalledWith("1")
            })
        })
        


        describe("Context 2: password is NOT correct", () => {
            beforeEach(() => {
                setAuthenticationMock("Password is wrong")
                getHeromock({ id: "1", name: "fake_h_1", image: "fake_i_1"})
            })
            it("will get hero and profile", async () => {
                const result = await HeroController.getAuthenticatedHero("fake_user", "fake_password", "1")
    
                expect(result).toEqual({ id: "1", 
                            name: "fake_h_1", 
                            image: "fake_i_1"})

                expect(AuthenticatePersistence.comparePassword).toHaveBeenCalledWith("fake_user", "fake_password")
                expect(HeroPersistence.getHero).toHaveBeenCalledWith(1)
    
            })
        })

    })

})