document.addEventListener("DOMContentLoaded", function () {
    const imageUpload = document.getElementById("image-upload");
    const predictButton = document.getElementById("predict-button");
    const predictedAge = document.getElementById("predicted-age");
    const predictedGender = document.getElementById("predicted-gender");
    const uploadedImage = document.getElementById("uploaded-image");
    const predictedImages = document.querySelectorAll(".predicted-image");
    const loader = document.querySelector("#loader");

    // Event listener for the predict button
    predictButton.addEventListener("click", async function () {
        
        const fileInput = imageUpload.files[0];

        if (fileInput) {
            
            //image to show on webpage
            uploadedImage.src = URL.createObjectURL(fileInput);
            
            // Create a FormData object to send the image file
            const formData = new FormData();
            formData.append("file", fileInput);

            

            try {
                // Show loader
                loader.style.display = "block";

                // Send a POST request to your FastAPI backend
                const response = await fetch("https://sturgeon-light-especially.ngrok-free.app/predict", { method: "POST",body: formData});

                if (response.ok) {
                    // Parse the JSON response
                    const data = await response.json();
                    
                    // Update the prediction result in the HTML
                    predictedAge.textContent =  data.confidence
                    predictedGender.textContent = data.gender;

                    // Update predicted images
                    for (let i = 0; i < predictedImages.length; i++) {
                        predictedImages[i].src = `data:image/png;base64,${data[`image_base64_${i + 1}`]}`;
                    }
                
                } else {
                    console.error("Error:", response.statusText);
                }
            } catch (error) {
                console.error("Error:", error);
            }


        // Hide loader after response
        loader.style.display = "none";

        } else 
            alert("Please select an image to predict.");
    });
});
