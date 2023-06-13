import './App.css';
import TableComponent from './TableComponent';
import PostComponent from './PostComponent';
import SoapComponent from './SoapComponent';
import CapitalesComponent from './CapitalesComponent';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <div className="row">
          <h1>REST ENDPONINTS</h1>
          <div className="col-6">

            <h1>Peticion GET</h1>
            <TableComponent  />
          </div>
          <div className="col-6">
          <h1>Peticion POST</h1>
            <PostComponent  />
          </div>
        </div>
        <div className="row mt-2 mb-4">
          <h1>SOAP ENDPONINTS</h1>
          <div className="col-6">
            <h1>Listado de Paises</h1>
            <SoapComponent  />
          </div>
          <div className="col-6">
          <h1>Consulta de Capital</h1>
            <CapitalesComponent/>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
