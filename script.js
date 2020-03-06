// Objeto plantilla
let selectedObject = [];
let score = 0;
let questionNumber = 1;

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
            document.getElementById("button-next").style.display = "inline-block";
            getRandomNumber();
            document.getElementById("total-questions").innerHTML = "Pregunta" + questionNumber + "/10";
            if (questionNumber <= 10) {
                questionNumber = questionNumber + 1;
            } else {
                document.getElementById("puntuacionTotal").innerHTML = "Tienes una puntuacion de " + score;
                showModal()
            }
        }

        // funcion que selecciona un numero al azar desde 0 hasta el numero de preguntas que tengamos
        let randomNumber;
        getRandomNumber = () => {
            randomNumber = Math.floor(Math.random() * (jsonObjects.length - 1));
            pushObject(randomNumber);
        }
        shuffle=(array)=>{
            let currentIndex = array.length, temporaryValue, randomIndex;
            while(0 !== currentIndex){
                randomIndex = Math.floor(Math.random()*currentIndex);
                currentIndex -= 1;
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }
            return array;
        }

        // Metemos en selectedObject el objeto de indice de randomNumber.
        pushObject = (data) => {
            selectedObject.push(jsonObjects[data]);
            selectedObject.respuestas = [selectedObject[0].correcta, ...selectedObject[0].incorrecta];
            shuffle(selectedObject.respuestas)
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
                confetti.start()
                setTimeout(()=>{
                confetti.stop()
                },2000)
                score += 10;
                document.getElementById("points").innerHTML = '<p><span id ="score">' + score + "</span> pts</p>"
                start();

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
            animateButton()
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