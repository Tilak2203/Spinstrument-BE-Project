// defining websocket client 
const socket = new WebSocket('ws://192.168.1.10:81'); // Replace with your ESP32 IP address

// checking for connections
socket.onopen = function(event) {
    console.log('WebSocket connection opened.');
};

const sensordata1 = document.querySelector("sensorData1");
const playButton1 = document.getElementById('playButton1');

playButton1.addEventListener("click",function(){
    C3_piano.play();
});


// Octave 1 notes of Sitar
var C3_sitar = new Howl({
    src: ['./sitar_notes/C3.mp3'],
});
var D3_sitar = new Howl({
    src: ['./sitar_notes/D3.mp3']   
});
var E3_sitar = new Howl({
    src: ['./sitar_notes/E3.mp3']
});
var F3_sitar = new Howl({
    src: ['./sitar_notes/F3.mp3']
});
var G3_sitar = new Howl({
    src: ['./sitar_notes/G3.mp3']
});
var A3_sitar = new Howl({
    src: ['./sitar_notes/A3.mp3']
});
var B3_sitar = new Howl({
    src: ['./sitar_notes/B3.mp3']
});
var C4_sitar = new Howl({
    src: ['./sitar_notes/C4.mp3']
});

// Octave 2 notes of Sitar
var C4_sitar = new Howl({
    src: ['./sitar_notes/C4.mp3'],
});
var D4_sitar = new Howl({
    src: ['./sitar_notes/D4.mp3']
});
var E4_sitar = new Howl({
    src: ['./sitar_notes/E4.mp3']
});
var F4_sitar = new Howl({
    src: ['./sitar_notes/F4.mp3']
});
var G4_sitar = new Howl({
    src: ['./sitar_notes/G4.mp3']
});
var A4_sitar = new Howl({
    src: ['./sitar_notes/A4.mp3']
});
var B4_sitar = new Howl({
    src: ['./sitar_notes/B4.mp3']
});
var C5_sitar = new Howl({
    src: ['./sitar_notes/C5.mp3']
});

// Octave 3 notes of Sitar

var C5_sitar = new Howl({
    src: ['./sitar_notes/C5.mp3'],
});
var D5_sitar = new Howl({
    src: ['./sitar_notes/D5.mp3']
});
var E5_sitar = new Howl({
    src: ['./sitar_notes/E5.mp3']
});
var F5_sitar = new Howl({
    src: ['./sitar_notes/F5.mp3']
});
var G5_sitar = new Howl({
    src: ['./sitar_notes/G5.mp3']
});
var A5_sitar = new Howl({
    src: ['./sitar_notes/A5.mp3']
});
var B5_sitar = new Howl({
    src: ['./sitar_notes/B5.mp3']
});
var C6_sitar = new Howl({
    src: ['./sitar_notes/C6.mp3']
});


// Octave 1 for piano
var C3_piano = new Howl({
    src: ['./piano_notes/C3.mp3']
});
var D3_piano = new Howl({
    src: ['./piano_notes/D3.mp3']
});
var E3_piano = new Howl({
    src: ['./piano_notes/E3.mp3']
});
var F3_piano = new Howl({
    src: ['./piano_notes/F3.mp3']
});
var G3_piano = new Howl({
    src: ['./piano_notes/G3.mp3']
});
var A3_piano = new Howl({
    src: ['./piano_notes/A3.mp3']
});
var B3_piano = new Howl({
    src: ['./piano_notes/B3.mp3']
});
var C4_piano = new Howl({
    src: ['./piano_notes/C4.mp3']
});

// OCTAVE 2 FOR PIANO
var C4_piano = new Howl({
    src: ['./piano_notes/C4.mp3']
});
var D4_piano = new Howl({
    src: ['./piano_notes/D4.mp3']
});
var E4_piano = new Howl({
    src: ['./piano_notes/E4.mp3']
});
var F4_piano = new Howl({
    src: ['./piano_notes/F4.mp3']
});
var G4_piano = new Howl({
    src: ['./piano_notes/G4.mp3']
});
var A4_piano = new Howl({
    src: ['./piano_notes/A4.mp3']
});
var B4_piano = new Howl({
    src: ['./piano_notes/B4.mp3']
});
var C5_piano = new Howl({
    src: ['./piano_notes/C5.mp3']
});

// OCTAVE 3 FOR PIANO
var C5_piano = new Howl({
    src: ['./piano_notes/C5.mp3']
});
var D5_piano = new Howl({
    src: ['./piano_notes/D5.mp3']
});
var E5_piano = new Howl({
    src: ['./piano_notes/E5.mp3']
});
var F5_piano = new Howl({
    src: ['./piano_notes/F5.mp3']
});
var G5_piano = new Howl({
    src: ['./piano_notes/G5.mp3']
});
var A5_piano = new Howl({
    src: ['./piano_notes/A5.mp3']
});
var B5_piano = new Howl({
    src: ['./piano_notes/B5.mp3']
});
var C6_piano = new Howl({
    src: ['./piano_notes/C6.mp3']
});

socket.onmessage = function(event) {

    const data = JSON.parse(event.data);
    console.log(data);
    

    let touchValue1 = data.touch1;
    let touchValue2 = data.touch2;
    let touchValue3 = data.touch3;
    let touchValue4 = data.touch4;
    let touchValue5 = data.touch5;
    let touchValue6 = data.touch6;
    let touchValue7 = data.touch7;
    let touchValue8 = data.touch8;

    console.log("touchvalue1: ", touchValue1);
    console.log("touchvalue2: ", touchValue2);
    console.log("touchvalue3: ", touchValue3);
    console.log("touchvalue4: ", touchValue4);
    console.log("touchvalue5: ", touchValue5);
    console.log("touchvalue6: ", touchValue6);
    console.log("touchvalue7: ", touchValue7);
    console.log("touchvalue8: ", touchValue8);

    let Distance1 = data.Distance1;
    console.log("Distance 1: ",Distance1);
    let Distance2 = data.Distance2;
    console.log("Distance 2: ",Distance2);

    let roll = data.roll;
    console.log("roll: ",roll);

    document.getElementById('sensorData1').textContent = `Sensor Data 1: ${touchValue1}`;
    document.getElementById('sensorData2').textContent = `Sensor Data 2: ${touchValue2}`;
    document.getElementById('sensorData3').textContent = `Sensor Data 3: ${touchValue3}`;
    document.getElementById('sensorData4').textContent = `Sensor Data 4: ${touchValue4}`;
    document.getElementById('sensorData5').textContent = `Sensor Data 5: ${touchValue5}`;
    document.getElementById('sensorData6').textContent = `Sensor Data 6: ${touchValue6}`;
    document.getElementById('sensorData7').textContent = `Sensor Data 7: ${touchValue7}`;
    document.getElementById('sensorData8').textContent = `Sensor Data 8: ${touchValue8}`;


    document.getElementById('Distance1').textContent = `Distance 1: ${Distance1} cm`;
    document.getElementById('Distance2').textContent = `Distance 2: ${Distance2} cm`;
    document.getElementById('roll').textContent = `Roll: ${roll} deg`;

    if (roll > -20 && roll < 20){
        if (Distance1 < 25){
            if (touchValue1 == 1){
                C3_sitar.play();
            }
            else if (touchValue2 == 1){
                D3_sitar.play();
            }
            else if (touchValue3 == 1){
                E3_sitar.play();
            }
            else if (touchValue4 == 1){
                F3_sitar.play();
            }
            else if (touchValue5 == 1){
                G3_sitar.play();
            }
            else if (touchValue6 == 1){
                A3_sitar.play();
            }
            else if (touchValue7 == 1){
                B3_sitar.play();
            }
            else if (touchValue8 == 1){
                C4_sitar.play();
            }
        }

        else if(Distance1 < 40){
            if (touchValue1 == true){
                C4_sitar.play();
            }
            else if (touchValue2 == 1){
                D4_sitar.play();
            }
            else if (touchValue3 == 1){
                E4_sitar.play();
            }
            else if (touchValue4 == 1){
                F4_sitar.play();
            }
            else if (touchValue5 == 1){
                G4_sitar.play();
            }
            else if (touchValue6 == 1){
                A4_sitar.play();
            }
            else if (touchValue7 == 1){
                B4_sitar.play();
            }
            else if (touchValue8 == 1){
                C5_sitar.play();
            }
        }

        else if (Distance1 < 60){
            if (touchValue1 == true){
                C5_sitar.play();
            }
            else if (touchValue2 == 1){
                D5_sitar.play();
            }
            else if (touchValue3 == 1){
                E5_sitar.play();
            }
            else if (touchValue4 == 1){
                F5_sitar.play();
            }
            else if (touchValue5 == 1){
                G5_sitar.play();
            }
            else if (touchValue6 == 1){
                A5_sitar.play();
            }
            else if (touchValue7 == 1){
                B5_sitar.play();
            }
            else if (touchValue8 == 1){
                C6_sitar.play();
            }
        }
    }
    else if ( roll > 80 && roll <= 100 ){

        if (Distance2 < 25){

            if (touchValue1 == 1){
                C3_piano.play();
            }
            else if (touchValue2 == 1){
                D3_piano.play();
            }
            else if (touchValue3 == 1){
                E3_piano.play();
            }
            else if (touchValue4 == 1){
                F3_piano.play();
            }
            else if (touchValue5 == 1){
                G3_piano.play();
            }
            else if (touchValue6 == 1){
                A3_piano.play();
            }
            else if (touchValue7 == 1){
                B3_piano.play();
            }
            else if (touchValue8 == 1){
                C4_piano.play();
            }
        }
        else if(Distance2 < 40){
            if (touchValue1 == true){
                C4_piano.play();
            }
            else if (touchValue2 == 1){
                D4_piano.play();
            }
            else if (touchValue3 == 1){
                E4_piano.play();
            }
            else if (touchValue4 == 1){
                F4_piano.play();
            }
            else if (touchValue5 == 1){
                G4_piano.play();
            }
            else if (touchValue6 == 1){
                A4_piano.play();
            }
            else if (touchValue7 == 1){
                B4_piano.play();
            }
            else if (touchValue8 == 1){
                C5_piano.play();
            }
        }
        else if (Distance2 < 60){
            if (touchValue1 == true){
                C5_piano.play();
            }
            else if (touchValue2 == 1){
                D5_piano.play();
            }
            else if (touchValue3 == 1){
                E5_piano.play();
            }
            else if (touchValue4 == 1){
                F5_piano.play();
            }
            else if (touchValue5 == 1){
                G5_piano.play();
            }
            else if (touchValue6 == 1){
                A5_piano.play();
            }
            else if (touchValue7 == 1){
                B5_piano.play();
            }
            else if (touchValue8 == 1){
                C6_piano.play();
            }
        }
    }
}
