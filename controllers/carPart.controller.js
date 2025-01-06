import CarPartService from '../services/carPart.service.js';

class CarPartsController {
  constructor() {
    this.carPartService = new CarPartService();
  }

  createCarPart = async (req, res, next) => {
    try {
      const data = req.body;
      
      const result = await this.carPartService.createCarPart(
        data
      );
      res.status(201).json({ result });
    } catch (error) {
      next(error);
    }
  };



  getCarPart = async (req, res, next) => {
    try {
      const data = req.body;
      console.log(data);
      
      
      const result = await this.carPartService.getCarPart(
        data
      );
      res.status(201).json({ result });
    } catch (error) {
      next(error);
    }
  };
}

export default CarPartsController;
