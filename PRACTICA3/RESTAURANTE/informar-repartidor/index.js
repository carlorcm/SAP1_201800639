const express = require('express');
const morgan = require('morgan');

const app = express();
const port = 4003;

app.use(morgan('combined'));

app.post('/restaurante/avisar-repartidor/:id/listo', (req, res) => {
  const pedidoId = req.params.id;
  // Lógica para avisar al repartidor que el pedido está listo
  console.log(`Avisando al repartidor que el pedido ${pedidoId} está listo...`);
  // Respuesta al cliente
  res.send(`Pedido ${pedidoId} marcado como listo para el repartidor`);
});

app.listen(port, () => {
  console.log(`Microservicio de aviso al repartidor que el pedido está listo escuchando en el puerto ${port}`);
});
