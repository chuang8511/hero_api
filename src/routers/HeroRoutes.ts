import { Router, Request, Response } from "express"
import { HeroController } from "../controllers/HeroController";


class HeroRoutes {
    router = Router()

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get('/', async (req: Request, res: Response) => {
            const result = await HeroController.getAllHeros();            
            return res.json(result);
        })

        this.router.get('/:id', async (req: Request, res: Response) => {
            const result = await HeroController.getHero(parseInt(req.params.id));
            return res.json(result)
        })

    }
}

export default new HeroRoutes().router
