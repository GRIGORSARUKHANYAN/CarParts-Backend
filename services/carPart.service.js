import CarPartModel from '../models/carPartModel.js'
import HttpException from '../exceptions/HttpException.js'
import { ObjectId } from "mongodb";

class CarPartService {
   carPart = CarPartModel;

  async createCarPart(data) {
    if (! await this.validationCarPart(data)) {
      // return {data :false ,message:"data is not valid"}
      throw new HttpException(400, "data is not valid");

    }
      //  make: { type: String, default: "" },
  //  model: { type: String, default: "" },
  //  partName: { type: String, default: "" },
  //  position: { type: String, default: "" },
  //  color: { type: String, default: "" },
  //  isOriginal:{ type: Boolean, default: true },
  //  location: { type: String, default: "" },
  //  Noth: { type: String, default: "" },
  //  count:{ type: Number, default: 1 },
  //  price: { type: Number, default: 0 }
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
  // console.log(findPart);
  
    if (findPart[0]) {
      findPart[0]?.set({count:Number(findPart[0].count)+Number(data.count)});
      // console.log("mtav",findPart);
      
      let updatedData =await this.carPart.findOneAndUpdate({ _id: findPart[0]._id }, findPart[0]);
    console.log(updatedData);
    
      return findPart[0]
    // throw new HttpException(409, "Post not found");
    }else{
      const carPart = new CarPartModel(data);
      let mycarPart= await carPart.save() 
    return mycarPart
    }
  }

  async getCarPart(data) {
    // console.log("xasav");
    // // return
    // if (!ObjectId.isValid("676ff36daf9b24dc2413fce4")) {
    //   throw new HttpException(400, "is not a valid ObjectID");
    // }
  
    const findPost = await this.carPart.find(data);
    if (!findPost) {
      throw new HttpException(409, "Post not found");
    }
  
    return findPost;
  //   if (! await this.validationCarPart(data)) {
  //     return {data :false ,message:"data is not valid"}
  //   }
  //   const carPart = new CarPartModel(data);
  //   let mycarPart= await carPart.save() 
  // return mycarPart
  }

  async validationCarPart(data) {

    if (!data || !data.make || !data.model || !data.partName || !data.position || !data.isOriginal || !data.count || !data.price) {
      return false
    }

  return true
  }

}

export default CarPartService;
[1,2,3,5]