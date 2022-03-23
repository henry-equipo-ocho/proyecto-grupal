export default interface ServerResponse {
    status: string,
    message: string,
    data?: any,
    errors?: object
}