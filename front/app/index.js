import express from "express";

//Fix Para __dirname
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));


//Servicios
import {getIncompleteSublevel, checkQuestionStatus,saveAnswers, checkIfCompletedAnySublevel,checkIfPreviousQuestionCompleted } from './controllers/controllers.js';


//server    
const app = express();
app.set("port",4000);
app.listen(app.get("port"));
console.log("Servidor en el puerto ", app.get("port"));


//configuraciones
app.use(express.static(__dirname + "/public"));
app.use(express.json());
//Rutas 

//servicios
app.post('/checkQuestionStatus', checkQuestionStatus);
app.post('/saveAnswers', saveAnswers);
app.get('/getIncompleteSublevel/:questionId', getIncompleteSublevel);
app.get('/checkIfCompletedAnySublevel/:questionId', checkIfCompletedAnySublevel);
app.get('/checkIfPreviousQuestionCompleted/:questionId', checkIfPreviousQuestionCompleted);



//JS
app.get("/",(req,res)=> res.sendFile(__dirname + "/pages/user/user.html"));
app.get("/IntroJuego.js",(req,res)=> res.sendFile(__dirname + "/pages/IntroJuego/IntroJuego.js"));
app.get("/respuestaUsuario.js",(req,res)=> res.sendFile(__dirname + "/pages/Nivel1/question01/respuestaUsuario.js"));
app.get("/JuegoDD.js",(req,res)=> res.sendFile(__dirname + "/pages/Nivel2/question01/JuegoDD.js"));
    
//IMG
app.get("/brain.png",(req,res)=> res.sendFile(__dirname + "/images/brain.png"));
app.get("/background_gesell_chambar.png",(req,res)=> res.sendFile(__dirname + "/images/background_gesell_chambar.png"));
app.get("/Titulo.png",(req,res)=> res.sendFile(__dirname + "/images/Titulo.png"));

//HTML
app.get("/IntroJuego.html",(req,res)=> res.sendFile(__dirname + "/pages/IntroJuego/IntroJuego.html"));
app.get("/introLevel01.html",(req,res)=> res.sendFile(__dirname + "/pages/Nivel1/introduction/introLevel01.html"));
app.get("/question01.html",(req,res)=> res.sendFile(__dirname + "/pages/Nivel1/question01/question01.html"));
app.get("/question02.html",(req,res)=> res.sendFile(__dirname + "/pages/Nivel1/question02/question02.html"));
app.get("/introLevel02.html",(req,res)=> res.sendFile(__dirname + "/pages/Nivel2/introduction/introLevel02.html"));
app.get("/question03.html",(req,res)=> res.sendFile(__dirname + "/pages/Nivel2/question01/question01.html"));
app.get("/question04.html",(req,res)=> res.sendFile(__dirname + "/pages/Nivel2/question02/question02.html"));

//CSS
app.get("/IntoJuego.css",(req,res)=> res.sendFile(__dirname + "/pages/IntroJuego/IntoJuego.css"));
app.get("/introLevel01.css",(req,res)=> res.sendFile(__dirname + "/pages/Nivel1/introduction/introLevel01.css"));
app.get("/question02.css",(req,res)=> res.sendFile(__dirname + "/pages/Nivel1/question02/question02.css"));
app.get("/introLevel02.css",(req,res)=> res.sendFile(__dirname + "/pages/Nivel2/introduction/introLevel02.css"));
app.get("/question02L2.css",(req,res)=> res.sendFile(__dirname + "/pages/Nivel2/question02/question02.css"));