import { HeroController } from "../../controllers/HeroController";
import { HeroPersistence } from "../../persistences/heroPersistence";

jest.mock("../../persistences/heroPersistence")

describe('HeroController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })

    it("should return list of heroes", async () => {

        const mockHeros = [
            { id: "1", name: "Hero1", image: "image1" },
            { id: "2", name: "Hero2", image: "image2" },
        ]
        const mockGetHeros = jest.fn().mockResolvedValue(mockHeros);

        HeroPersistence.getHeros = mockGetHeros;

        const result = await HeroController.getAllHeros()
        expect(result).toEqual({ heroes: mockHeros })

        expect(HeroPersistence.getHeros).toHaveBeenCalledTimes(1)
    })

    // describe('#getAllHeros')

})