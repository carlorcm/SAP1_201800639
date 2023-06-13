const express = require('express');
const morgan = require('morgan');

const app = express();
const port = 3002;

app.use(morgan('combined'));

app.get('/cliente/verificar-estado-pedido/:id', (req, res) => {
  const pedidoId = req.params.id;
  const { cliente, restaurante } = req.query;
  // Lógica para verificar el estado del pedido al restaurante
  console.log(`Verificando estado del pedido ${pedidoId} al restaurante...`);
  console.log('Cliente:', cliente);
  console.log('Restaurante:', restaurante);
  // Respuesta al cliente
  res.send(`Estado del pedido ${pedidoId} verificado`);
});

app.listen(port, () => {
  console.log(`Microservicio de verificación de estado del pedido al restaurante escuchando en el puerto ${port}`);
});
