import { Document } from 'mongoose';
import Payment from './Payment.interface';

export enum UserRoles {
    Client,
    Business,
    Helper,
    Admin
}

export interface Itinerary {
    _id?: string,
    name: string;
    activities: Array<string>
}
export default interface User extends Document {
    _id: string,
    name: string,
    surname: string,
    email: string,
    country: string,
    password: string,
    role: UserRoles,
    favActivities: Array<Itinerary>,
    payments: Array<Payment>,
    activeSubscription?: boolean,
    subscriptionTier?: number,
    isVerified: Boolean,
    comparePassword: (password: string) => Promise<boolean>
}