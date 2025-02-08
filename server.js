require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(express.json());
app.use(cors());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Conectado a MongoDB"))
.catch(err => console.error("Error conectando a MongoDB:", err));

// Definir esquema y modelo de datos
const VideoSchema = new mongoose.Schema({
  title: String,
  topic: String,
  views: Number
});
const Video = mongoose.model('Video', VideoSchema);

// Rutas API
app.get('/videos', async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo datos" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://127.0.0.1:5500/index.html`);
});
