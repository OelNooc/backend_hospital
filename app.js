const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const pacienteRoutes = require("./routes/pacienteRoutes");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/pacientes", pacienteRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
