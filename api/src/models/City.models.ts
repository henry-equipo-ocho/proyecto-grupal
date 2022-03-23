import mongoose from "mongoose";
import City from "../interfaces/City.interface";

const citySchema = new mongoose.Schema<City>({
    name: { type: String, required: [true, 'Missing name attribute'] },
    code: { type: String, required: [true, 'Missing code attribute'] },
    country: { type: String, required: [true, 'Missing country attribute'] },
    lat: { type: String, required: [true, 'Missing lat attribute'] },
    lon: { type: String, required: [true, 'Missing lon attribute'] }
});

export default mongoose.model<City>('City', citySchema);