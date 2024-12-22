const Paciente = require("../models/paciente");

const getPacientes = async (req, res) => {
    try {
        const pacientes = await Paciente.find();
        res.json(pacientes);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener pacientes." });
    }
};

const createPaciente = async (req, res) => {
    try {
        const { rut, nombre, edad, sexo, enfermedad } = req.body;
        const fotoPersonal = req.file ? req.file.filename : null;
        const nuevoPaciente = new Paciente({ rut, nombre, edad, sexo, enfermedad, fotoPersonal });
        await nuevoPaciente.save();
        res.status(201).json(nuevoPaciente);
    } catch (error) {
        res.status(500).json({ message: "Error al crear paciente." });
    }
};

const updatePaciente = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        if (req.file) updates.fotoPersonal = req.file.filename;
        const pacienteActualizado = await Paciente.findByIdAndUpdate(id, updates, { new: true });
        res.json(pacienteActualizado);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar paciente." });
    }
};

const deletePaciente = async (req, res) => {
    try {
        const { id } = req.params;
        await Paciente.findByIdAndUpdate(id, { revisado: true });
        res.json({ message: "Paciente inhabilitado correctamente." });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar paciente." });
    }
};

const searchPacientes = async (req, res) => {
    try {
        const { sexo, fechaIngreso, enfermedad } = req.query;
        const query = {};
        if (sexo) query.sexo = sexo;
        if (fechaIngreso) query.fechaIngreso = { $gte: new Date(fechaIngreso) };
        if (enfermedad) query.enfermedad = enfermedad;
        const pacientes = await Paciente.find(query);
        res.json(pacientes);
    } catch (error) {
        res.status(500).json({ message: "Error en la búsqueda de pacientes." });
    }
};

module.exports = { getPacientes, createPaciente, updatePaciente, deletePaciente, searchPacientes };
