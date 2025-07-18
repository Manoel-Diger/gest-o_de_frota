const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  plate: {
    type: String,
    required: [true, 'Placa é obrigatória'],
    unique: true,
    uppercase: true
  },
  model: {
    type: String,
    required: [true, 'Modelo é obrigatório']
  },
  year: {
    type: Number,
    required: [true, 'Ano é obrigatório']
  },
  brand: {
    type: String,
    required: [true, 'Marca é obrigatória']
  },
  status: {
    type: String,
    enum: ['Ativo', 'Manutenção', 'Inativo'],
    default: 'Ativo'
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver'
  },
  location: {
    type: String,
    default: 'Não informado'
  },
  fuel: {
    type: Number,
    min: 0,
    max: 100,
    default: 100
  },
  mileage: {
    type: Number,
    default: 0
  },
  nextMaintenance: {
    type: Date,
    required: [true, 'Data da próxima manutenção é obrigatória']
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  image: {
    type: String,
    default: 'https://via.placeholder.com/300x200'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Vehicle', vehicleSchema);