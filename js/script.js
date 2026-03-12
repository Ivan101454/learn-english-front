const record = document.querySelector(".audio-recording__button");
const save = document.querySelector(".audio-info__save-button");
const cancel = document.querySelector(".audio-info__cancel-button");
const audioBlock = document.querySelector(".audio-recording__exercise-item");
const audio = document.querySelector(".audio-control__item");


if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {

    navigator.mediaDevices
        .getUserMedia(
            {
                audio: true,
            },
        )
        .then((stream) => {
            const mediaRecorder = new MediaRecorder(stream);
            const TIME_LIMIT = 3 * 60 * 1000;

            record.onclick = () => {
                record.style.display = "none";
                audioBlock.style.display = "block";
                mediaRecorder.start();

                setTimeout(() => {
                    if (mediaRecorder.state === "recording") {
                        mediaRecorder.stop();
                    }
                }, TIME_LIMIT);
            }

            cancel.onclick = () => {
                record.style.display = "block";
                audioBlock.style.display = "none";
            }

            let chunks = [];

            mediaRecorder.ondataavailable = (e) => {
                chunks.push(e.data);
            }

            save.onclick = () => {
                mediaRecorder.stop();
            }

            mediaRecorder.onstop = (e) => {
                const blob = new Blob(chunks, { type: "audio/webm; codecs: opus"});
                chunks = [];
                sentBlobToServer(blob);
                loadAudioFromServer("recording");
            }

        })
        .catch((err) => {
            console.log(`The following error occur: ${err}`)
        });
} else {
    console.log("getUserMedia not supported on your browser!")
}

function sentBlobToServer(blob) {
    const formData = new FormData();
    formData.append("audioFile", blob, "recording.webm")

    fetch("http://localhost:8080/catalogue-api/audio/upload", {
        method: "POST",
        body: formData,
    })
        .then(response => response.json())
        .then(data => console.log("Success:", data))
        .catch(error => console.error("Error is happened: " + error));
}

function loadAudioFromServer(audioName) {
    fetch(`http://localhost:8080/catalogue-api/audio/${audioName}.webm`)
        .then(response => {
            if (!response.ok) throw new Error("Audio file not found");
            return response.blob()
        })
        .then(blob => {
            audio.src = URL.createObjectURL(blob);
        })
        .catch(error => console.error("Load error: " + error));
}

