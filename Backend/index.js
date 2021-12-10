const express = require('express');
var bodyParser = require('body-parser');
const conectarDB = require('./database');
const app = express();
app.use(bodyParser.json({limit:'50mb'}));
const chalk = require("chalk");
const cors = require("cors");

//connect to DB 

conectarDB();

app.use(express.json());
app.use(cors());

app.use('/api/aeropuerto', require('./routes/aeropuerto'));
app.use('/api/avion', require('./routes/avion'));
app.use('/api/ruta', require('./routes/ruta'));
app.use('/api/usuario', require('./routes/usuario'));
app.use('/api/vuelo', require('./routes/vuelo'));
app.use('/api/reserva', require('./routes/reserva'));
app.use('/api/bccr', require('./routes/bccr'));

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(
        `${chalk.green("✓")} App is running at ${chalk.bgGreen(
            `http://localhost:${port}`
        )}`
    );
    console.log("  Press CTRL-C to stop\n");
});