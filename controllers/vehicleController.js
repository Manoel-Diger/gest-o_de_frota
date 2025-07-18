const Vehicle = require('../models/Vehicle');
const Driver = require('../models/Driver');

// @desc    Obter todos os veículos
// @route   GET /api/vehicles
// @access  Private
const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ company: req.user.id })
      .populate('driver', 'name phone')
      .sort({ createdAt: -1 });
    
    res.json({ vehicles });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};

// @desc    Obter veículo por ID
// @route   GET /api/vehicles/:id
// @access  Private
const getVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id)
      .populate('driver', 'name phone email');
    
    if (!vehicle) {
      return res.status(404).json({ message: 'Veículo não encontrado' });
    }

    res.json({ vehicle });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};

// @desc    Criar novo veículo
// @route   POST /api/vehicles
// @access  Private
const createVehicle = async (req, res) => {
  try {
    const vehicleData = {
      ...req.body,
      company: req.user.id
    };

    const vehicle = await Vehicle.create(vehicleData);
    
    res.status(201).json({ 
      message: 'Veículo criado com sucesso',
      vehicle 
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};

// @desc    Atualizar veículo
// @route   PUT /api/vehicles/:id
// @access  Private
const updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!vehicle) {
      return res.status(404).json({ message: 'Veículo não encontrado' });
    }

    res.json({ 
      message: 'Veículo atualizado com sucesso',
      vehicle 
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};

// @desc    Deletar veículo
// @route   DELETE /api/vehicles/:id
// @access  Private
const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);

    if (!vehicle) {
      return res.status(404).json({ message: 'Veículo não encontrado' });
    }

    res.json({ message: 'Veículo deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};

module.exports = {
  getVehicles,
  getVehicle,
  createVehicle,
  updateVehicle,
  deleteVehicle
};