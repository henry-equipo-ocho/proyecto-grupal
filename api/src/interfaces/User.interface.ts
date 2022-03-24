import { Document } from 'mongoose';

export enum UserRoles {
    Client,
    Business,
    Helper,
    Admin
}

export default interface User extends Document {
    id: string,
    name: string,
    surname: string,
    email: string,
    country: string,
    password: string,
    role: UserRoles,
    favActivities: Array<Array<string>>,
    comparePassword: (password: string) => Promise<boolean>
}