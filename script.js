// Objeto plantilla
let selectedObject = []


fetch('preguntas.json')
    .then(response => response.json())
    .then((responseJson) => {

        let jsonObjects = responseJson
        let numberOfQuestions = jsonObjects.length - 1;

        // funcion que selecciona un numero al azar desde 0 hasta el numero de preguntas que tengamos
        getRandomNumber = () => {
            let randomNumber = Math.floor(Math.random() * numberOfQuestions)
            pushObject(randomNumber)
        }
        // Metemos en selectedObject el objeto de indice de randomNumber.
        pushObject = (patata) => {
            selectedObject.push(jsonObjects[patata])
        }
        


    })
    .catch(error => console.log(error))


// $.getJSON("./preguntas.json", function (json) {
//     console.log(json); // this will show the info it in firebug console
// });