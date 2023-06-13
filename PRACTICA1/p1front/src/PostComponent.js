import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'https://reqres.in/api/users'; // URL para crear un nuevo usuario

const PostComponent = () => {
  const [name, setName] = useState('');
  const [job, setJob] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await axios.post(API_URL, {
        name,
        job
      });

      setResponse(response.data);
    } catch (error) {
      console.error('Error al crear el usuario:', error);
    }
  };

  return (
    <div>
      <h3>Crear Usuario</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Trabajo:
          <input type="text" className="form-control" value={job} onChange={e => setJob(e.target.value)} />
        </label>
        <br />
        <button type="submit"
        className="btn btn-primary mt-4"
        >Crear</button>
      </form>

      {response && (
        <div>
          <h2>Respuesta:</h2>
          <p>Nombre: {response.name}</p>
          <p>Trabajo: {response.job}</p>
          <p>Id: {response.id}</p>
          <p>Fecha de creación: {response.createdAt}</p>
        </div>
      )}
    </div>
  );
};

export default PostComponent;
