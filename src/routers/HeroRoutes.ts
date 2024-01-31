import { Router, Request, Response } from "express"
import { HeroController } from "../controllers/HeroController";


class HeroRoutes {
    router = Router()

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get('/', async (req: Request, res: Response) => {

            const { headers } = req;
            const username = headers["name"] as string
            const password = headers["password"] as string
            if (username && password) {
                const result = await HeroController.getAuthenticatedHeros(username, password)
                return res.json(result)
            } else {
                const result = await HeroController.getAllHeros();            
                return res.json(result);
            }
        })

        this.router.get('/:id', async (req: Request, res: Response) => {

            const { headers } = req;
            const username = headers["Name"] as string
            const password = headers["Password"] as string

            if (username && password) {
                const result = await HeroController.getAuthenticatedHero(username, password, req.params.id)
                return res.json(result)
            } else {
                const result = await HeroController.getHero(parseInt(req.params.id));
                return res.json(result)
            }
        })

    }
}

export default new HeroRoutes().router
