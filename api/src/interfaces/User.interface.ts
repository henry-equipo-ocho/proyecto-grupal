import { Document } from 'mongoose';

export enum UserRoles {
    Client,
    Business,
    Helper,
    Admin
}

export default interface User extends Document {
    name: string,
    surname: string,
    email: string,
    country: string,
    password: string,
    role: UserRoles,
    comparePassword: (password: string) => Promise<boolean>
}