import mongoose from "mongoose";
import Activity from "../interfaces/ActivityCopy.interface";

const activitySchema = new mongoose.Schema<Activity>({
    name: { type: String, required: [true, 'Missing name attribute'] },
    description: { type: String, required: [true, 'Missing description attribute'] },
    picture: { type: String, required: [true, 'Missing picture attribute']},
    city: { type: String, required: [true, 'Missing city attribute'] },
    country: { type: String, required: [true, 'Missing country attribute'] },
    price_currency: { type: String, required: [true, 'Missing currency attribute']},
    price_amount: { type: String, required: [true, 'Missing amount attribute']},
    booking: { type: String, required: [true, 'Missing booking atribute']},
    watchedTimes: { type: Number, default: 0 },
    bookedTimes: { type: Number, default: 0 },
    created: { type: Boolean, default: false },
    ownerId: {  type: String }
});

export default mongoose.model<Activity>('ActivityCopy', activitySchema);