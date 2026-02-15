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
        .then((stream => {}))
        .catch((err) => {
            console.error(`The fallowing error occurred: ${err}`)
        });
} else {
    console.log("getUserMedia not supported in your browser")
}
