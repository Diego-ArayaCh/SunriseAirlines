//mongodb+srv://user:123456@cruddb.hfs55.mongodb.net/db_sunrise_airlines?retryWrites=true&w=majority
const mongoose = require('mongoose');
const chalk = require("chalk");

const conectarDB = async () => {

    try {
        
        await mongoose.connect('mongodb+srv://cliente:User123456@sunriseairlines.jwyyj.mongodb.net/SunriseAirlines?authSource=admin&replicaSet=atlas-7h28dd-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true', {

            useNewUrlParser: true,
            useUnifiedTopology: true,


        });
        console.log(`${chalk.green("✓")} DB connected`);

    } catch (error) {
        console.error(error);
        process.exit(1); //stop execution
    }

};

module.exports = conectarDB;