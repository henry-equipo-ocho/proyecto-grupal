export enum PaymentStatus {
    CREATED,
    COMPLETED
}

export interface FrontFacingPayment {
    name: string,
    email: string,
    tier: number,
    price: number,
    description: string,
    buyDate: Date,
    expireDate: Date
}
export default interface Payment {
    id: string,
    status: string,
    description: string,
    tier: number,
    price: number,
    createdAt?: Date,
    updatedAt?: Date
}