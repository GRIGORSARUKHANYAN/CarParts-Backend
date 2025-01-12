import { Schema, model } from 'mongoose';

const CarPartSchema = new Schema({
  make: { type: String, default: "" },
  model: { type: String, default: "" },
  partName: { type: String, default: "" },
  position: { type: String, default: "" },
  color: { type: String, default: "" },
  isOriginal:{ type: Boolean, default: false },
  location: { type: String, default: "" },
  noth: { type: String, default: "" },
  count:{ type: Number, default: 1 },
  price: { type: Number, default: 0 }
});

const CarPartModel = model('CarParts', CarPartSchema);

export default CarPartModel;
