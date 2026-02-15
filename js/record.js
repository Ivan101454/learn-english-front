const record = document.querySelector(".record");
const stop = document.querySelector(".stop");
const soundsClip = document.querySelector(".sound-clips");

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    console.log("getUserMedia supported.");
    navigator.mediaDevices
        .getUserMedia(
            {
                audio: true
            }
        )
        .then((stream) => {})
        .catch((err) => {
            console.error(`The fallowing error occurred: ${err}`)
        });
} else {
    console.log("getUserMedia not supported in your browser")
}

const mediaRecorder = new MediaRecorder(stream);

record.onclick = () => {
    mediaRecorder.start();
    console.log(mediaRecorder.state);
    console.log("recorder started");
    record.style.background = "red";
    record.style.color = "black";
}

let chunks = [];

mediaRecorder.ondataavailable = (e) => {
    chunks.push(e.data)
}

stop.onclick = () => {
    mediaRecorder.stop();
    console.log(mediaRecorder.state);
    console.log("recorded stopped");
    record.style.background = "";
    record.style.color = "";
}
