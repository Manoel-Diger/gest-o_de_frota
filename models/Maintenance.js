const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema({
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true
  },
  type: {
    type: String,
    enum: ['Preventiva', 'Corretiva'],
    required: true
  },
  service: {
    type: String,
    required: [true, 'Serviço é obrigatório']
  },
  description: {
    type: String,
    required: [true, 'Descrição é obrigatória']
  },
  date: {
    type: Date,
    required: [true, 'Data é obrigatória']
  },
  cost: {
    type: Number,
    required: [true, 'Custo é obrigatório']
  },
  status: {
    type: String,
    enum: ['Agendado', 'Em andamento', 'Concluído'],
    default: 'Agendado'
  },
  technician: {
    type: String,
    required: [true, 'Técnico é obrigatório']
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Maintenance', maintenanceSchema);