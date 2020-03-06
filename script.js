// Objeto plantilla
let selectedObject = [];
let score = 0;
let questionNumber = 0;

fetch('preguntas.json')
    .then(response => response.json())
    .then((responseJson) => {

        let jsonObjects = responseJson;

        // Empezamos. Cuando se hagan 10 preguntas se acaba el juego
        start = () => {
            selectedObject = [];
            document.getElementById("question").innerHTML = "";
            document.getElementById("answer").innerHTML = "";
            document.getElementById("startButton").style.display = "none";
            getRandomNumber();
            if (questionNumber < 10) {
                questionNumber = questionNumber + 1;
            } else {
                console.log("El juego ha terminado...MODAL")
                showModal()
            }
        }

        // funcion que selecciona un numero al azar desde 0 hasta el numero de preguntas que tengamos
        let randomNumber;
        getRandomNumber = () => {
            randomNumber = Math.floor(Math.random() * (jsonObjects.length - 1));
            pushObject(randomNumber);
        }

        // Metemos en selectedObject el objeto de indice de randomNumber.
        pushObject = (data) => {
            selectedObject.push(jsonObjects[data]);
            selectedObject.respuestas = [selectedObject[0].correcta, ...selectedObject[0].incorrecta];
            jsonObjects.splice(data, 1);
            showInfo();
        }

        // Pintamos la informacion en el html
        showInfo = () => {
            document.getElementById("question").innerHTML += "<p>" + selectedObject[0].pregunta + "</p>"
            console.log(selectedObject[0].pregunta)
            selectedObject.respuestas.forEach((element, index) => {
                document.getElementById("answer").innerHTML += "<button id=" + index + " onclick='compareAnswer(this)'>" + element + "</button>"
            });
        }
        //Comparamos el contenido del boton seleccionado con la respuesta correcta e incorrecta. Sumamos/restamos puntos
        compareAnswer = (e) => {
            let respuesta = e.innerHTML
            if (respuesta === selectedObject[0].correcta) {
                score += 10;
                document.getElementById("points").innerHTML = '<p><span id ="score">' + score + "</span> pts</p>"
                start();

                console.log("modal CORRECTO!");
            } else {
                if (score > 0) {
                    score += -2;
                    document.getElementById("points").innerHTML = "<p>" + score + " pts" + "</p>"
                } else {}
                e.style.display = "none";
            }
        }

        showModal = () => {
            document.getElementById("modalBoton").click();
        }

        showModalSkipQuestion = () => {
            document.getElementById("skipQuestionButton").click();
        }

        payPoints = () => {
            start();
            if (score > 0) {
                score += -2;
            }
            document.getElementById("points").innerHTML = "<p>" + score + " pts" + "</p>"
        }

    })
    .catch(error => console.log(error))