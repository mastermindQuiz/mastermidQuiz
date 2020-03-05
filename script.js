
fetch ('preguntas.json')

.then (response => response.json())
.then(responseJson => console.log(responseJson))
.catch(error => console.log(error))

// $.getJSON("./preguntas.json", function (json) {
//     console.log(json); // this will show the info it in firebug console
// });

