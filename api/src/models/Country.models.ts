import mongoose from "mongoose";
import Country from "../interfaces/Country.interface";

const countrySchema = new mongoose.Schema<Country>({
    name: { type: String, required: [true, 'Missing name attribute'] }
});

export default mongoose.model<Country>('Country', countrySchema);