export default interface Activity {
    id?: string,
    name: string,
    description: string,
    picture: string,
    city: string,
    country: string,
    price_currency: string,
    price_amount: string,
    booking: string,
    watchedTimes: number,
    bookedTimes: number,
    created: boolean,
    ownerId: string
}
