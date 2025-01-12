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

  updateCarPart = async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = req.body;
      
      const result = await this.carPartService.updateCarPart(
        data,id
      );
      res.status(201).json({ result });
    } catch (error) {
      next(error);
    }
  };

  getCarPartById = async (req, res, next) => {
    try {
      const id = req.params.id;

      
      const result = await this.carPartService.getCarPartById(
        id
      );
      res.status(201).json({ result });
    } catch (error) {
      next(error);
    }
  };
  deleteCarPartById = async (req, res, next) => {
    try {
      const id = req.params.id;

      
      const result = await this.carPartService.deleteCarPartById(
        id
      );
      res.status(201).json({ result });
    } catch (error) {
      next(error);
    }
  };


  getCarPart = async (req, res, next) => {
    try {
      const data = req.body;
      
      
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
