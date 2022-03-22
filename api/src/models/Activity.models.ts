import mongoose from "mongoose";
import Activity from "../interfaces/Activity.interface";


const activitySchema = new mongoose.Schema<Activity>({
    name: { type: String, required: [true, 'Missing name attribute'] },
    description: { type: String, required: [true, 'Missing description attribute'] },
    picture: { type: String, required: [true, 'Missing picture attribute'], unique: true, lowercase: true, trim: true },
    city: { type: String, required: [true, 'Missing city attribute'] },
    country: { type: String, required: [true, 'Missing country attribute'] },
    price_currency: { type: String, required: [true, 'Missing currency attribute']},
    price_amount: { type: String, required: [true, 'Missing amount attribute']}
});



export default mongoose.model<Activity>('Activity', activitySchema);