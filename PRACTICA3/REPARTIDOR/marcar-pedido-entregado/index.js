const express = require('express');
const morgan = require('morgan');

const app = express();
const port = 5003;

app.use(morgan('combined'));

app.post('/repartidor/marcar-entregado/:id/entregado', (req, res) => {
  const pedidoId = req.params.id;
  // Lógica para marcar el pedido como entregado
  console.log(`Marcando el pedido ${pedidoId} como entregado...`);
  // Respuesta al repartidor
  res.send(`Pedido ${pedidoId} marcado como entregado`);
});

app.listen(port, () => {
  console.log(`Microservicio de marcar como entregado escuchando en el puerto ${port}`);
});
