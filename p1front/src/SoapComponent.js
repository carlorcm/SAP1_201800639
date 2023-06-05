import React, { useEffect, useState } from 'react';
import axios from 'axios';


const SoapComponent = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [currentItems, setCurrentItems] = useState([]);
  const [jsonData, setjsonData] = useState([]);


  const callSoapApi = async () => {
    const soapRequest = `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                            <soap:Body>
                              <ListOfCountryNamesByName xmlns="http://www.oorsprong.org/websamples.countryinfo">
                              </ListOfCountryNamesByName>
                            </soap:Body>
                          </soap:Envelope>`;

    const soapAction = 'http://www.oorsprong.org/websamples.countryinfo/ListOfCountryNamesByName';

    try {
      const response = await axios.post('http://localhost:5000/api/soap', { soapRequest, soapAction });
      const data = response.data["soap:Envelope"]["soap:Body"][0]["m:ListOfCountryNamesByNameResponse"][0]["m:ListOfCountryNamesByNameResult"][0]["m:tCountryCodeAndName"];
      const jsonArray = Object.values(data).map(item => {
        return {
          'code_country': item['m:sISOCode'][0],
          'name_country': item['m:sName'][0],
        };
      });

      setjsonData(jsonArray);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    callSoapApi();
  }, []);


  useEffect(() => {
    setCurrentItems(jsonData.slice(0, itemsPerPage));
  }, [jsonData, itemsPerPage]);

  const paginate = pageNumber => {
    setCurrentPage(pageNumber);
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setCurrentItems(jsonData.slice(startIndex, endIndex));
  };



  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Country Code</th>
            <th>Country Name</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(item => (
            <tr key={item.code_country}>
              <td>{item.code_country}</td>
              <td>{item.name_country}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button
          type="button"
          className="btn btn-primary"
          disabled={currentPage === 1}
          onClick={() => paginate(currentPage - 1)}
        >
          Previous
        </button>
        <button
          type="button"
          className="btn btn-light"
          disabled={currentItems.length < itemsPerPage}
          onClick={() => paginate(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SoapComponent;
