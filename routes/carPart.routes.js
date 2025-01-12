import express from "express";
import CarPartsController from "../controllers/carPart.controller.js";
const router = express.Router();
const carPartsController = new CarPartsController();

router.post("/carPart", carPartsController.createCarPart);
router.put("/carPart/:id", carPartsController.updateCarPart);
router.post("/searchCarPart", carPartsController.getCarPart);
router.get("/carPart/:id", carPartsController.getCarPartById);
router.delete("/carPart/:id", carPartsController.deleteCarPartById);



export default router;
