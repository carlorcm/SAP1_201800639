const express = require('express');
const morgan = require('morgan');

const app = express();
const port = 4001;

app.use(express.json());
app.use(morgan('combined'));

app.post('/restaurante/recibir-pedido', (req, res) => {
  const pedido = req.body;
  // Lógica para recibir el pedido del cliente
  console.log('Recibiendo pedido del cliente...');
  console.log('Pedido:', pedido);
  // Respuesta al cliente
  res.send('Pedido recibido');
});

app.listen(port, () => {
  console.log(`Microservicio de recepción de pedido del cliente escuchando en el puerto ${port}`);
});
