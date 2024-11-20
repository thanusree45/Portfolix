const mongoose = require('mongoose');
mongoose.connect(process.env.mongo_url);

const connection = mongoose.connection;
connection.on('error', ()=>{
    console.log('Error connection to db');
});
connection.on('connected', ()=>{
    console.log("Mongo db conn sucess");
});

module.exports = connection;