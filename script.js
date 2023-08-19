//------------------------------------Array_Preguntas-------------------------------------------------
let preguntas = 
[
    '1. ¿Cual es la capital de Argentina?',
    '2. ¿Nombre Completo de Messi?',
    '3. ¿Cual es la capital de Brasil?',
    '4. ¿En que continente esta ubicado Andorra?',
    '5. ¿Que dia de la semana sigue al Lunes?'
]

//------------------------------------Array_Preguntas-------------------------------------------------

//------------------------------------Array_Respuestas-------------------------------------------------
let respuestas = 
[
    'Buenos Aires',
    'Lionel Andres Messi',
    'Brasilia',
    'Europa',
    'Martes'
]

//------------------------------------Array_Respuestas-------------------------------------------------

//------------------------------------GET_ID-------------------------------------------------
const formulario = document.getElementById("cuestionario");
const btnIniciar = document.getElementById("btnIniciar");
const btnEnviar = document.getElementById("btnEnviar");
const contador = document.getElementById("timer");
const notification = document.getElementById("notification");

var preg1 = document.getElementById("q1"),
    preg2 = document.getElementById("q2"),
    preg3 = document.getElementById("q3"),
    preg4 = document.getElementById("q4"),
    preg5 = document.getElementById("q5");


//------------------------------------GET_ID-------------------------------------------------

//------------------------------------REMPLAZAR_DIV-------------------------------------------------

preg1.textContent = preguntas[0];
preg2.textContent = preguntas[1];
preg3.textContent = preguntas[2];
preg4.textContent = preguntas[3];
preg5.textContent = preguntas[4];


//------------------------------------REMPLAZAR_DIV-------------------------------------------------

//------------------------------------FUNCION_CONTADOR-------------------------------------------------

let timerInterval;
let userResponses = [];

function IniciarContador() 
{
    let timeLeft = 30;
    contador.textContent = timeLeft;

    timerInterval = setInterval(() => 
    {
        timeLeft--;
        contador.textContent = timeLeft;

        if (timeLeft <= 0) 
        {
            clearInterval(timerInterval);
            alert("Tiempo terminado");
            formulario.querySelectorAll("input[type='text']").forEach(input => {
                input.disabled = true;
            });
            btnEnviar.disabled = true;
        }
    }, 1000);
}

//------------------------------------FUNCION_CONTADOR----------------------------------------

//------------------------------------FUNCION_RESETEAR_FORM-----------------------------------

function resetForm() 
{
    clearInterval(timerInterval);
    contador.textContent = "30";
    formulario.reset();
    formulario.querySelectorAll("input[type='text']").forEach(input => {
        input.disabled = false;
    });
    btnEnviar.disabled = true;
    notification.style.display = "none";
    
}
//------------------------------------FUNCION_RESETEAR_FORM-----------------------------------

//------------------------------------BOTON_ENVIAR--------------------------------------------

formulario.addEventListener("submit", function (event) 
{
    event.preventDefault();

    // Validar si todos los campos tienen al menos 5 caracteres
    const inputs = formulario.querySelectorAll("input[type='text']");
    let allValid = true;
    let correctAnswers = 0;
    inputs.forEach((input, index) => {
        if (input.value.trim().length < 5) {
            allValid = false;
            input.style.border = "2px solid red";
        } else {
            input.style.border = "1px solid #ccc";
            // Comprobar si la respuesta del usuario es correcta
            if (input.value.trim() === respuestas[index]) {
                input.style.border = "2px solid green"; // Cambiar el borde a verde
                correctAnswers++;
            } else {
                input.style.border = "2px solid red"; // Cambiar el borde a rojo
            }
        }
    }); 

    if (!allValid) 
    {
        alert("Por favor, responde todas las preguntas con al menos 5 caracteres.");
        return;
    }

    // Agregar respuestas a la lista de respuestas del usuario
    userResponses = [];
    inputs.forEach(input => 
    {
        userResponses.push(input.value);
    });

    clearInterval(timerInterval);
    contador.textContent = "¡Enviado!";

    formulario.querySelectorAll("input[type='text']").forEach(input => 
    {
        input.disabled = true;
    });
    btnEnviar.disabled = true;

    // Mostrar notificación con respuestas enviadas
    notification.innerHTML = "<strong>Respuestas enviadas:</strong><br>" + userResponses.join("<br>");
    notification.style.display = "block";

    if (correctAnswers === respuestas.length) {
        notification.style.color = "white";
        notification.style.backgroundColor = "green"; 
        window.alert("Formulario enviado correctamente\n" + userResponses.join("\n"));
    } else {
        notification.style.backgroundColor = "red";
        window.alert("Formulario enviado con algunas respuestas incorrectas\n" + userResponses.join("\n"));
    }

}); 

//------------------------------------BOTON_ENVIAR--------------------------------------------


//------------------------------------BOTON_INICIAR--------------------------------------------
btnIniciar.addEventListener("click", function () 
{
    resetForm();
    IniciarContador();
    btnEnviar.disabled = false;
    input.style.border = "1px solid #ccc";
});
//------------------------------------BOTON_INICIAR--------------------------------------------
