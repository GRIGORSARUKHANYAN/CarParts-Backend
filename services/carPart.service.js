import CarPartModel from '../models/carPartModel.js'
import HttpException from '../exceptions/HttpException.js'
import { ObjectId } from "mongodb";

class CarPartService {
   carPart = CarPartModel;


   async updateCarPart(data,id) {
    
    if (!ObjectId.isValid(id)) {
      throw new HttpException(400, "is not a valid ObjectID");
    }
    if (! data) {
      // return {data :false ,message:"data is not valid"}
      throw new HttpException(400, "data is not valid");
    }

        const findPart = await this.carPart.findOne({_id:id});
    
    if (!findPart) {
      throw new HttpException(400, "part is not difaind");
    }
      findPart?.set(data);
      
      let updatedData =await this.carPart.findOneAndUpdate({ _id: id }, findPart);
    
      return findPart
    // throw new HttpException(409, "Part not found");
    
  }


   async getCarPartById(id) {
    
    if (!ObjectId.isValid(id)) {
      throw new HttpException(400, "is not a valid ObjectID");
    }
    const findPart = await this.carPart.find({_id:id});
    if (!findPart) {
      throw new HttpException(409, "Part not found");
    }
  
    return findPart;
  }
  async deleteCarPartById(id) {
    if (!ObjectId.isValid(id)) {
      throw new HttpException(400, "is not a valid ObjectID");
    }
    const findPart = await this.carPart.findByIdAndDelete(id);
    
    if (!findPart) {
      throw new HttpException(409, "Part not found");
    }
  
    return "Part deleted";
  }

  async createCarPart(data) {
    if (! await this.validationCarPart(data)) {
      // return {data :false ,message:"data is not valid"}
      throw new HttpException(400, "data is not valid");

    }
  let recurringData={
    make:data.make,
    model:data.model,
    partName:data.partName,
    position:data.position,
    color:data.color,
    isOriginal:data.isOriginal,
    price:data.price
  }
        const findPart = await this.carPart.find(recurringData);
  
    if (findPart[0]) {
      findPart[0]?.set({count:Number(findPart[0].count)+Number(data.count)});
      
      let updatedData =await this.carPart.findOneAndUpdate({ _id: findPart[0]._id }, findPart[0]);
    
      return findPart[0]
    // throw new HttpException(409, "Part not found");
    }else{
      const carPart = new CarPartModel(data);
      let mycarPart= await carPart.save() 
    return mycarPart
    }
  }

  async getCarPart(data) {
  
    const findParts = await this.carPart.find(data);
    if (!findParts) {
      throw new HttpException(409, "Part not found");
    }
    
  
    return findParts;
  }

  async validationCarPart(data) {

    if (!data || !data.make || !data.model || !data.partName   || !data.count || !data.price) {
      return false
    }

  return true
  }

}

export default CarPartService;
[1,2,3,5]