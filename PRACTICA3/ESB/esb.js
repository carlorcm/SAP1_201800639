const express = require('express');
const morgan = require('morgan');
const axios = require('axios');

const app = express();
const port = 3000;

// Middleware para mostrar los logs de las solicitudes
app.use(morgan('combined'));

// Middleware personalizado para intermediar las comunicaciones
app.use((req, res, next) => {
  // Lógica de intermediación
  console.log(`Intermediando la comunicación - URL: ${req.url}`);

  // Enrutamiento de las solicitudes a los microservicios correspondientes
  if (req.url.startsWith('/cliente')) {
    // Rutas para los microservicios del cliente
    if (req.url.startsWith('/cliente/solicitar-pedido')) {
      // Lógica para solicitar el pedido al restaurante
      const pedido = req.body;
      const urlRestaurante = 'http://localhost:3001/cliente/solicitar-pedido'; // URL del microservicio del restaurante

      // Envío de la solicitud al microservicio del restaurante
      axios.post(urlRestaurante, pedido)
        .then(response => {
          console.log('Respuesta de la aplicacion:', response.data);
          const pedido = req.body;
          const urlRestaurante = 'http://localhost:4001/restaurante/recibir-pedido';
          axios.post(urlRestaurante, pedido)
            .then(response => {
              console.log('Respuesta del restaurante:', response.data);
              const pedido = req.body;
              const urlRestaurante = 'http://localhost:5001/repartidor/recibir-pedido';
              axios.post(urlRestaurante, pedido)
                .then(response => {
                  console.log('Respuesta del repartidor:', response.data);
                  // Respuesta al cliente
                  res.send('Pedido solicitado al restaurante');
                })
                .catch(error => {
                  console.error('Error al enviar la solicitud al restaurante:', error);
                  // Respuesta de error al cliente
                  res.status(500).send('Error al solicitar el pedido al restaurante');
                });
            })
            .catch(error => {
              console.error('Error al enviar la solicitud al restaurante:', error);
              // Respuesta de error al cliente
              res.status(500).send('Error al solicitar el pedido al restaurante');
            });
        })
        .catch(error => {
          console.error('Error al enviar la solicitud al restaurante:', error);
          // Respuesta de error al cliente
          res.status(500).send('Error al solicitar el pedido al restaurante');
        });
    } else if (req.url.startsWith('/cliente/verificar-estado-pedido')) {
      // Lógica para verificar el estado del pedido al repartidor
      const pedidoId = req.query.pedidoId;
      const urlRepartidor = `http://localhost:3002/cliente/verificar-estado-pedido/${pedidoId}`; // URL del microservicio del repartidor

      // Envío de la solicitud al microservicio del repartidor
      axios.get(urlRepartidor)
        .then(response => {
          console.log('Respuesta de la aplicacion:', response.data);
          // Respuesta al cliente
          const pedidoId = req.query.pedidoId;
          const urlRepartidor = `http://localhost:4002/restaurante/informar-estado-pedido/${pedidoId}`; // URL del microservicio del repartidor

          // Envío de la solicitud al microservicio del repartidor
          axios.get(urlRepartidor)
            .then(response => {
              console.log('Respuesta del restaurante:', response.data);
              // Respuesta al cliente
              res.send('Estado del pedido recibido');
            })
            .catch(error => {
              console.error('Error al enviar la solicitud al repartidor:', error);
              // Respuesta de error al cliente
              res.status(500).send('Error al verificar el estado del pedido con el repartidor');
            });
        })
        .catch(error => {
          console.error('Error al enviar la solicitud al repartidor:', error);
          // Respuesta de error al cliente
          res.status(500).send('Error al verificar el estado del pedido con el repartidor');
        });
    } else if (req.url.startsWith('/cliente/verificar-estado-repartidor')) {
      // Lógica para verificar el estado del pedido al repartidor
      const pedidoId = req.query.pedidoId;
      const urlRepartidor = `http://localhost:3003/cliente/verificar-estado-repartidor/${pedidoId}`; // URL del microservicio del repartidor

      // Envío de la solicitud al microservicio del repartidor
      axios.get(urlRepartidor)
        .then(response => {
          console.log('Respuesta de la aplicacion:', response.data);
          // Respuesta al cliente
          const pedidoId = req.query.pedidoId;
          const urlRepartidor = `http://localhost:5002/repartidor/informar-estado-pedido/${pedidoId}`; // URL del microservicio del repartidor

          // Envío de la solicitud al microservicio del repartidor
          axios.get(urlRepartidor)
            .then(response => {
              console.log('Respuesta del repartidor:', response.data);
              // Respuesta al cliente
              res.send('Estado del pedido verificado con el repartidor');
            })
            .catch(error => {
              console.error('Error al enviar la solicitud al repartidor:', error);
              // Respuesta de error al cliente
              res.status(500).send('Error al verificar el estado del pedido con el repartidor');
            });
        })
        .catch(error => {
          console.error('Error al enviar la solicitud al repartidor:', error);
          // Respuesta de error al cliente
          res.status(500).send('Error al verificar el estado del pedido con el repartidor');
        });
    } else {
      // Ruta no encontrada para el cliente
      res.status(404).send('Ruta no encontrada');
    }
  } else if (req.url.startsWith('/repartidor')) {
    // Rutas para los microservicios del repartidor
    if (req.url.startsWith('/repartidor/marcar-entregado')) {
      // Lógica para marcar el pedido como entregado
      const pedidoId = req.params.pedidoId;
      const urlRepartidor = `http://localhost:5003/repartidor/marcar-entregado/${pedidoId}/entregado`; // URL del microservicio del repartidor

      // Envío de la solicitud al microservicio del repartidor
      axios.post(urlRepartidor)
        .then(response => {
          console.log('Respuesta del repartidor:', response.data);
          // Respuesta al cliente
          res.send('Pedido marcado como entregado');
        })
        .catch(error => {
          console.error('Error al enviar la solicitud al repartidor:', error);
          // Respuesta de error al cliente
          res.status(500).send('Error al marcar el pedido como entregado');
        });
    } else {
      // Ruta no encontrada para el repartidor
      res.status(404).send('Ruta no encontrada');
    }
  } else {
    // Ruta no encontrada, devolver un error
    res.status(404).send('Ruta no encontrada');
  }
});

// Iniciar el servidor del ESB
app.listen(port, () => {
  console.log(`ESB escuchando en el puerto ${port}`);
});