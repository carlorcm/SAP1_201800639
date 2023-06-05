import React, { useEffect, useState } from 'react';
import axios from 'axios';


const CapitalesComponent = () => {

    const [codigo, setCodigo] = useState('US');
    const [capital, setCapital] = useState('');


    const callSoapApi = async () => {
        const soapRequest = `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                            <soap:Body>
                              <CapitalCity xmlns="http://www.oorsprong.org/websamples.countryinfo">
                              <sCountryISOCode>${codigo}</sCountryISOCode>
                              </CapitalCity>
                            </soap:Body>
                          </soap:Envelope>`;

        const soapAction = 'http://www.oorsprong.org/websamples.countryinfo/CapitalCity';

        try {
            const response = await axios.post('http://localhost:5000/api/soap', { soapRequest, soapAction });
            console.log(response.data);
            const data = response.data["soap:Envelope"]["soap:Body"][0]["m:CapitalCityResponse"][0]["m:CapitalCityResult"][0];
            setCapital(data);
        } catch (error) {
            console.error(error);
        }
    };


    const handleSubmit = async e => {
        e.preventDefault();

        try {
            callSoapApi();
        } catch (error) {
            console.error('Error al crear el usuario:', error);
        }
    };


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Codigo de pais:
                    <input type="text" className="form-control" value={codigo} onChange={e => setCodigo(e.target.value)} />
                </label>
                <br />
                <button type="submit"
                    className="btn btn-primary mt-4 mb-2"
                >Consultar</button>
            </form>
            <label>
                Capital del Pais:
                <input type="text" className="form-control" value={capital} disabled />
            </label>
        </div>
    );
};

export default CapitalesComponent;
