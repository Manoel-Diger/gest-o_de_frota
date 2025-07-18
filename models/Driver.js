const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nome é obrigatório'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email é obrigatório'],
    unique: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: [true, 'Telefone é obrigatório']
  },
  license: {
    type: String,
    required: [true, 'CNH é obrigatória'],
    unique: true
  },
  experience: {
    type: String,
    required: [true, 'Experiência é obrigatória']
  },
  status: {
    type: String,
    enum: ['Ativo', 'Inativo', 'Manutenção'],
    default: 'Ativo'
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 5
  },
  trips: {
    type: Number,
    default: 0
  },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle'
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  avatar: {
    type: String,
    default: 'https://via.placeholder.com/150'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Driver', driverSchema);