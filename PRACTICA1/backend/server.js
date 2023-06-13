const express = require('express');
const axios = require('axios');
const { parseString } = require('xml2js');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.post('/api/soap', async (req, res) => {
    const soapRequest = req.body.soapRequest;
    const headers = {
        'Content-Type': 'text/xml;charset=UTF-8',
        'SOAPAction': req.body.soapAction,
    };

    try {
        const response = await axios.post('http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso', soapRequest, { headers });

        let parsedResponse;
        parseString(response.data, (err, result) => {
            parsedResponse = result;
        });

        res.json(parsedResponse);
    } catch (error) {
        res.status(500).json({ error: 'Error al llamar a la API SOAP' });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
