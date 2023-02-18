const mongoose = require('mongoose');

module.exports = {
    connect : (DB_HOST) => {
        mongoose.set('strictQuery', false);
        mongoose.connect(DB_HOST);
        console.log('db connected');
        mongoose.connection.on('error', err => {
            console.error(err);
            console.log('mongoDB connection error. make sure mongo is running');
            process.exit();
        })
    }
}