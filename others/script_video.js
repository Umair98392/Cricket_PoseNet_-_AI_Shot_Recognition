document.addEventListener("DOMContentLoaded", function () {
    const videoUpload = document.getElementById("video-upload");
    const predictButton = document.getElementById("predict-button");
    const predictedAge = document.getElementById("predicted-age");
    const predictedGender = document.getElementById("predicted-gender");
    const uploadedVideo = document.getElementById("uploaded-video");
    const resultVideo = document.getElementById("result-video");
    const loader = document.querySelector("#loader");

    // Event listener for the predict button
    predictButton.addEventListener("click", async function () {
        const fileInput = videoUpload.files[0];

        if (fileInput) {
            // Video to show on webpage
            uploadedVideo.src = URL.createObjectURL(fileInput);

            // Create a FormData object to send the video file
            const formData = new FormData();
            formData.append("file", fileInput);

            try {
                // Show loader
                loader.style.display = "block";

                // Send a POST request to your FastAPI backend
                // "https://sturgeon-light-especially.ngrok-free.app/predict_video"
                //https://cricket-posenet-ai-shot-recognition.onrender.com/predict_video
                
                
                const response = await fetch("https://noble-gently-barnacle.ngrok-free.app/predict_video", { method: "POST", body: formData });

                if (response.ok) {
                    // Parse the JSON response
                    const data = await response.json();

                    // Update the prediction result in the HTML
                    console.log(data);
                    predictedAge.textContent = data.confidence;
                    predictedGender.textContent = data.predicted_shot;

                    // Update result video
                    resultVideo.src = `data:video/mp4;base64,${data.predicted_video}`;
                } else {
                    console.error("Error:", response.statusText);
                }
            } catch (error) {
                console.error("Error:", error);
            }

            // Hide loader after response
            loader.style.display = "none";
        } else {
            alert("Please select a video to predict.");
        }
    });
});
