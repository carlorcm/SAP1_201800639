const express = require('express');
const morgan = require('morgan');

const app = express();
const port = 3001;

app.use(express.json());
app.use(morgan('combined'));

app.post('/cliente/solicitar-pedido', (req, res) => {
  const { cliente, restaurante, items } = req.body;
  // Lógica para solicitar el pedido al restaurante
  console.log('Solicitando pedido al restaurante...');
  console.log('Cliente:', cliente);
  console.log('Restaurante:', restaurante);
  console.log('Items:', items);
  // Respuesta al cliente
  res.send('Pedido solicitado al restaurante');
});

app.listen(port, () => {
  console.log(`Microservicio de solicitud de pedido al restaurante escuchando en el puerto ${port}`);
});
