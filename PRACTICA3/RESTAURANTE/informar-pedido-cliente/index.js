const express = require('express');
const morgan = require('morgan');

const app = express();
const port = 4002;

app.use(morgan('combined'));

app.get('/restaurante/informar-estado-pedido/:id', (req, res) => {
  const pedidoId = req.params.id;
  const { estado } = req.query;
  // Lógica para informar el estado del pedido al cliente
  console.log(`Informando estado del pedido ${pedidoId} al cliente...`);
  console.log('Estado:', estado);
  // Respuesta al cliente
  res.send(`Estado del pedido ${pedidoId} informado al cliente`);
});

app.listen(port, () => {
  console.log(`Microservicio de informe de estado del pedido al cliente escuchando en el puerto ${port}`);
});
