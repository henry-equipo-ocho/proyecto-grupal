export enum UserRoles {
    Client,
    Business,
    Helper,
    Admin
}

export default interface User {
    name: string,
    surname: string,
    email: string,
    country: string,
    password: string,
    role: UserRoles
}