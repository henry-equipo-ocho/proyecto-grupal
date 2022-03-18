import { Document } from 'mongoose';


export default interface Activity extends Document {
    name: string,
    description: string,
    picture: string,
    city: string,
    country: string,
    price_currency: string,
    price_amount: string
}