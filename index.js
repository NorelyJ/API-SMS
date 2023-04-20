const express = require("express")
const bodyParser = require('body-parser');
var HTTP_PORT = 8009;
const app = express();
var sms = require('./sms.js');


app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get("/api/v1/health", async (req, res, next) => {
    res.json({
        "message": "Ok",
        "server": "UP"
    })
});

app.post("/api/v1/sms", async (req, res, next) => {
    const body = req.body;
    var {
        celular,
        nombre
    } = body;
    let smsResponse = await sms(celular);
    if (smsResponse == null || smsResponse == undefined || smsResponse.status == 'error') {
        res.status(500).json(smsResponse)
    } else {
        res.status(200).json(smsResponse)
    }
});

app.listen(HTTP_PORT, () => {
    console.log(`Server running on port ${HTTP_PORT}`)
});

module.exports = app;