import {Document, ObjectId} from "mongodb";
export interface Crimes extends Document {
  _id: ObjectId
  ID: Number,
  SoortMisdrijf: String,
  RegioS: String,
  Title: String,
  Perioden: String,
  GeregistreerdeMisdrijven_1: Number,
  Aangiften_2: Number,
  Internetaangiften_3: Number
}