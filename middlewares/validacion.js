const { body } = require("express-validator");

const validatePaciente = [
    body("rut").notEmpty().withMessage("El RUT es obligatorio."),
    body("nombre").notEmpty().withMessage("El nombre es obligatorio."),
    body("edad").isInt({ min: 0 }).withMessage("La edad debe ser un número positivo."),
    body("sexo").notEmpty().withMessage("El sexo es obligatorio."),
    body("enfermedad").notEmpty().withMessage("La enfermedad es obligatoria."),
];

module.exports = { validatePaciente };
