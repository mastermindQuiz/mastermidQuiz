
let question = [];
let answer = [];
let correctAnswer =[];
let numberOfQuestions

fetch ('preguntas.json')
.then (response => response.json())
.then((responseJson) => {
    
   
        responseJson.map((elemento)=>{
            question.push(elemento.pregunta);
            answer.push(elemento.incorrecta);
            correctAnswer.push(elemento.correcta);
            
        })
        

            
            numberOfQuestions = question.length - 1;

            let randomNumber = Math.floor(Math.random()* numberOfQuestions)
            console.log(randomNumber)

 








        
    
    })
.catch(error => console.log(error))

// $.getJSON("./preguntas.json", function (json) {
//     console.log(json); // this will show the info it in firebug console
// });




