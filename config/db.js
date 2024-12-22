const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/prueba1DB", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB conectado correctamente.");
    } catch (error) {
        console.error("Error conectando a MongoDB", error);
        process.exit(1);
    }
};

module.exports = connectDB;
