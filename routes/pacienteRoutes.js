const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const { validatePaciente } = require("../middlewares/validacion");
const { getPacientes, createPaciente, updatePaciente, deletePaciente, searchPacientes, getPacienteByID } = require("../controllers/pacienteController");

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    },
});

const upload = multer({ storage });

router.get("/", getPacientes);
router.post("/", upload.single("fotoPersonal"), validatePaciente, createPaciente);
router.put("/:id", upload.single("fotoPersonal"), validatePaciente, updatePaciente);
router.delete("/:id", deletePaciente);
router.get("/search", searchPacientes);
router.get("/:id", getPacienteByID);

module.exports = router;
