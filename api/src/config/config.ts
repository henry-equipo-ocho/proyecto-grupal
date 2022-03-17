export default {
    DB: {
        URI: process.env.MONGODB_URI || 'mongodb://localhost/proyectogrupal',
        USER: process.env.MONGOBD_USER || '',
        PASSWORD: process.env.MONGODB_PASSWORD || ''
    }
}