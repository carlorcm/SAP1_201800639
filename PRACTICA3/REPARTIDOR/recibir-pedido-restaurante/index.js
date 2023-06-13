const express = require('express');
const morgan = require('morgan');

const app = express();
const port = 5001;

app.use(express.json());
app.use(morgan('combined'));

app.post('/repartidor/recibir-pedido', (req, res) => {
  const pedido = req.body;
  // Lógica para recibir el pedido del restaurante
  console.log('Recibiendo pedido del restaurante...');
  console.log('Pedido:', pedido);
  // Respuesta al restaurante
  res.send('Pedido recibido');
});

app.listen(port, () => {
  console.log(`Microservicio de recepción de pedido del restaurante escuchando en el puerto ${port}`);
});
