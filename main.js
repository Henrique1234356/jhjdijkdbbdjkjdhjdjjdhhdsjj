//https://teachablemachine.withgoogle.com/models/adrW-qt8A/
previsão1 = "";
previsão2 = "";
Webcam.set({
    width:350,
    height:300,
    imageFormat: 'png',
    pngQuality: 90
    
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function tirarFoto(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id ="imagemCapturada" src="' + data_uri + '"/>';
    })
}

console.log("Versão do ML5: ",ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/adrW-qt8A/model.json',modelLoaded);

function modelLoaded(){
    console.log("modelo carregado");
}

function speak(){
    var synth = window.speechSynthesis;
speakData1 = "cepo de madeira a primeira previsão é " +previsao1;

speakData2 = "cepo de madeira a segundo previsão é " +previsao2;
var utterThis = new SpeechSynthesisUtterance(speakData1 + speakData2);
synth.speak(utterThis);

}

    function check(){
        img = document.getElementById('imagemCapturada');
        classifier.classify(img, gotResult);

    }

    function gotResult(error, results){
if(error){
    console.error(error);
}
else{
    console.log(results);
    document.getElementById("resultName").innerHTML = results[0].label;
    document.getElementById("resultName2").innerHTML = results[1].label;
    previsao1 = results[0].label;
    previsao2 = results[1].label;
    speak();
    if (results[0].label == "feliz"){
        document.getElementById("updateEmoji").innerHTML = "&#128515;"
    }
    if (results[0].label == "triste"){
        document.getElementById("updateEmoji").innerHTML = "&#128549;"

    } if (results[0].label == "raiva"){
        document.getElementById("updateEmoji").innerHTML = "&#128545;"
    }
    if (results[1].label == "feliz"){
        document.getElementById("updateEmoji2").innerHTML = "&#128515;"
    }
    if (results[1].label == "triste"){
        document.getElementById("updateEmoji2").innerHTML = "&#128549;"

    } if (results[1].label == "raiva"){
        document.getElementById("updateEmoji2").innerHTML = "&#128545;"
    }
}
    }