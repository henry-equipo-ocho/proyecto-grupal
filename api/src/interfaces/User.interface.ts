import { Document } from 'mongoose';

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
    comparePassword: (password: string) => Promise<boolean>,

    
    isVerified: Boolean
}