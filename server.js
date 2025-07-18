const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Carregar variáveis de ambiente
dotenv.config();

// Conectar ao banco
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://seudominio.com' 
    : 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/vehicles', require('./routes/vehicles'));
app.use('/api/drivers', require('./routes/drivers'));
app.use('/api/maintenance', require('./routes/maintenance'));

// Rota de teste
app.get('/api', (req, res) => {
  res.json({ message: 'Fleet Management API rodando!' });
});

// Middleware de erro
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Algo deu errado!' });
});

// Middleware para rotas não encontradas
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Rota não encontrada' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});