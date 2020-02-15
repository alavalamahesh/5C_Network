`use strict`;

const express = require(`express`);
const app = express();
const bodyParser = require(`body-parser`);

const { appConfig } = require(`./config/configuration.js`);
const { CreateDbRecord, findOneById } = require(`./routes/DbRecordOperator`);

// start server
app.listen(appConfig.port, () => {
    console.log(`Server listening at port: ${appConfig.port}, for env: ${appConfig.env}.`);
});

// configure app to use bodyparser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Posting data into mongoDB
app.get(`/github`, CreateDbRecord);

//Get record from mongoDB
app.get(`/github/:id`, findOneById);


// in case of other routes, OR unknown routes, revert with an error
app.use((req, res) => {
    res.status(400).send({
        error: `This route is not served OR method type is incorrect for the route.`
    });
});