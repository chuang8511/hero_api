import express from "express";
const router = express.Router();


router.get('/example', (req, res) => {
    res.send({ "test": "tests123" });
});

export default router;