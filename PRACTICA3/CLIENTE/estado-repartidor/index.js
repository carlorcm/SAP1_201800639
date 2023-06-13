const express = require('express');
const morgan = require('morgan');

const app = express();
const port = 3003;

app.use(morgan('combined'));

app.get('/cliente/verificar-estado-repartidor/:id', (req, res) => {
  const pedidoId = req.params.id;
  const { cliente, repartidor } = req.query;
  // Lógica para verificar el estado del pedido al repartidor
  console.log(`Verificando estado del pedido ${pedidoId} al repartidor...`);
  console.log('Cliente:', cliente);
  console.log('Repartidor:', repartidor);
  // Respuesta al cliente
  res.send(`Estado del pedido ${pedidoId} verificado`);
});

app.listen(port, () => {
  console.log(`Microservicio de verificación de estado del pedido al repartidor escuchando en el puerto ${port}`);
});
