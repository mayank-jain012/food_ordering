
const moongose = require('mongoose');
const url = process.env.mongo_db;
const dbConnect = () => {
    try {
        const con = moongose.connect(url, { writeConcern: { w: 'majority' } }, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("database Connected");
    } catch (error) {
        console.error(error);
    }
}

module.exports = dbConnect;