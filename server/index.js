const app = require('./app')
const http = require('http')
const { connect } = require('mongoose')
const { PORT, MONGO_URI } = process.env
const port = process.env.PORT || PORT

const server = http.createServer(app)

const connection = async() => {
    try {
        await connect(MONGO_URI)
        console.log('DB connection successful');

        server.listen(PORT, () => console.log(`Listening for requests on port ${port}`) )

    } catch (error) {
        console.log(error.message)
    }
}

connection()