export enum PaymentStatus {
    CREATED,
    COMPLETED
}
export default interface Payment {
    id: string,
    status: string,
    description: string,
    tier: number,
    createdAt?: number,
    updatedAt?: number
}