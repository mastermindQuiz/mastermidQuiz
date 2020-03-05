// Objeto plantilla
let selectedObject = [];
let score = 0;

fetch('preguntas.json')
    .then(response => response.json())
    .then((responseJson) => {

        let jsonObjects = responseJson;
        let numberOfQuestions = jsonObjects.length - 1;

        // Empezamos
        start = () => {
            selectedObject = [];
            document.getElementById("question").innerHTML = "";
            document.getElementById("answer").innerHTML = "";
            getRandomNumber();
        }

        let randomNumber;
        // funcion que selecciona un numero al azar desde 0 hasta el numero de preguntas que tengamos
        getRandomNumber = () => {
            randomNumber = Math.floor(Math.random() * numberOfQuestions);
            pushObject(randomNumber);
        }
        // Metemos en selectedObject el objeto de indice de randomNumber.
        pushObject = (data) => {
            selectedObject.push(jsonObjects[data]);
            jsonObjects.splice(data, 1);
            selectedObject.respuestas = [selectedObject[0].correcta, ...selectedObject[0].incorrecta];
            showInfo();
        }
        // Pintamos la informacion en el html
        showInfo = () => {
            document.getElementById("question").innerHTML += "<p>" + selectedObject[0].pregunta + "</p>"
            selectedObject.respuestas.forEach((element, index) => {
                document.getElementById("answer").innerHTML += "<button id=" + index + " onclick='compareAnswer(this)'>" + element + "</button>"
            });
        }
        //Comparamos el contenido del boton seleccionado con la respuesta correcta
        compareAnswer = (e) => {
            let respuesta = e.innerHTML
            if (respuesta === selectedObject[0].correcta) {
                score += 10;
                document.getElementById("points").innerHTML = "<p>"+score +" pts"+"</p>"
                console.log(score)
                console.log("modal CORRECTO!");
            } else {
                if (score > 0) {
                    score += -2;
                     document.getElementById("points").innerHTML = "<p>" + score + " pts" + "</p>"
                } else {}
                console.log(score)
                e.style.display = "none";
            }
        }

    })
    .catch(error => console.log(error))