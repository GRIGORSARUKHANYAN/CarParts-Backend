import express from "express";
import CarPartsController from "../controllers/carPart.controller.js";
const router = express.Router();
const carPartsController = new CarPartsController();

router.post("/carPart", carPartsController.createCarPart);
router.post("/searchCarPart", carPartsController.getCarPart);

export default router;
