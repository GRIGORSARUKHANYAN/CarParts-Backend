import CarPartService from '../services/carPart.service.js';
import ExcelJS from 'exceljs'

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





  getReport = async (req, res, next) => {

    try {
      // Create a new workbook
      const workbook = new ExcelJS.Workbook();

      // Add a worksheet
      const worksheet = workbook.addWorksheet('My Sheet');

      const result = await this.carPartService.getCarPart(
      );
      // Define columns
      worksheet.columns = [
          {  key: 'id', width: 50 },
      ];

      // Add rows
      for (let i = 0; i < result.length; i++) {
        let text=`${result[i].make} ${result[i].model} ${result[i].partName} ${result[i].position}}`
        worksheet.addRow({ id: text, });
  
        
      }
      // worksheet.addRow({ id: 1, name: 'John Doe', age: 25 });
      // worksheet.addRow({ id: 2, name: 'Jane Smith', age: 30 });

      // Set the response headers for file download
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=myExcelFile.xlsx');

      // Write the workbook to the response
      await workbook.xlsx.write(res);

      // End the response
      res.end();
  } catch (err) {
      console.error('Error generating Excel file:', err);
      res.status(500).send('Failed to generate Excel file');
  }
  };
}

export default CarPartsController;
