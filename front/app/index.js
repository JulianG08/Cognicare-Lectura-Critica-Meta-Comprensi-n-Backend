import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// Importar funciones del controller.js
import { saveAnswers, evaluateAnswer } from './controllers/controllers.js';

// Fix para __dirname
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configurar el servidor Express
const app = express();
app.set("port", 4000);
app.listen(app.get("port"), () => {
    console.log("Servidor en el puerto", app.get("port"));
});

// Configuración de middlewares
app.use(express.static(__dirname + "/public"));
app.use(express.json());  // Para manejar cuerpos JSON en las solicitudes

// Rutas del servidor
app.post('/saveAnswers', saveAnswers);  // Ruta para guardar respuestas
app.post('/evaluateAnswer', evaluateAnswer);  // Ruta para evaluar respuestas

// Rutas de archivos estáticos
app.get("/", (req, res) => res.sendFile(__dirname + "/pages/user/user.html"));
app.get("/IntroJuego.js", (req, res) => res.sendFile(__dirname + "/pages/IntroJuego/IntroJuego.js"));
app.get("/respuestaUsuario.js", (req, res) => res.sendFile(__dirname + "/pages/Nivel1/question01/respuestaUsuario.js"));
app.get("/JuegoDD.js", (req, res) => res.sendFile(__dirname + "/pages/Nivel2/question01/JuegoDD.js"));

// Rutas de imágenes
app.get("/brain.png", (req, res) => res.sendFile(__dirname + "/images/brain.png"));
app.get("/background_gesell_chambar.png", (req, res) => res.sendFile(__dirname + "/images/background_gesell_chambar.png"));
app.get("/Titulo.png", (req, res) => res.sendFile(__dirname + "/images/Titulo.png"));

//HTML
app.get("/IntroJuego.html",(req,res)=> res.sendFile(__dirname + "/pages/IntroJuego/IntroJuego.html"));
app.get("/Nivel1/introduction/introLevel01.html",(req,res)=> res.sendFile(__dirname + "/pages/Nivel1/introduction/introLevel01.html"));
app.get("/question01.html",(req,res)=> res.sendFile(__dirname + "/pages/Nivel1/question01/question01.html"));
app.get("/question02.html",(req,res)=> res.sendFile(__dirname + "/pages/Nivel1/question02/question02.html"));
app.get("/Nivel2/introduction/introLevel02.html",(req,res)=> res.sendFile(__dirname + "/pages/Nivel2/introduction/introLevel02.html"));
app.get("/question03.html",(req,res)=> res.sendFile(__dirname + "/pages/Nivel2/question01/question01.html"));
app.get("/question04.html",(req,res)=> res.sendFile(__dirname + "/pages/Nivel2/question02/question02.html"));

// Rutas de CSS
app.get("/IntoJuego.css", (req, res) => res.sendFile(__dirname + "/pages/IntroJuego/IntoJuego.css"));
app.get("/introLevel01.css", (req, res) => res.sendFile(__dirname + "/pages/Nivel1/introduction/introLevel01.css"));
app.get("/question02.css", (req, res) => res.sendFile(__dirname + "/pages/Nivel1/question02/question02.css"));
app.get("/introLevel02.css", (req, res) => res.sendFile(__dirname + "/pages/Nivel2/introduction/introLevel02.css"));
app.get("/question02L2.css", (req, res) => res.sendFile(__dirname + "/pages/Nivel2/question02/question02.css"));