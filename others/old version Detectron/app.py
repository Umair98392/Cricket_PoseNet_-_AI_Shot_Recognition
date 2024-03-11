from fastapi import FastAPI, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from api.cric import extract_keypoints, result_images
import joblib
import torch
import numpy as np
import cv2
import os
import base64


app = FastAPI()

# Configure CORS settings
origins = [


    "http://127.0.0.1:8085",
    "https://cric-ai.netlify.app",
    "http://192.168.1.26:5173",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
    "http://localhost:5174",
    "http://localhost:5173",
    "https://cricshotai.netlify.app"
    # Adjust this to match your frontend's URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Define the directory where the predicted images are stored
output_directory = './output_directory'        # Replace with the actual directory path

# Load the pre-trained model and scaler to transform keypoints
model = torch.load('models/trained_model/model.pth')
loaded_scaler = joblib.load('models/trained_model/scaler.pkl')

# Define the desired resolution
desired_resolution = (240, 240)

# Home page route
@app.get("/")
async def home():
    return "Welcome  to Crickshot PoseNet : AI Shot Recognition"


# Prediction route
@app.post("/predict")
async def predict(file: UploadFile):
    # Read and process the uploaded image using OpenCV
    content = await file.read()
    nparr = np.frombuffer(content, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # Resize the image to the desired resolution
    img = cv2.resize(img, desired_resolution)
    # call function to extract keypoint
    kpp = extract_keypoints(img)

    # Call function to create images with box and keypoints detection
    result_images(img)

    # call scaler
    kpp = loaded_scaler.transform(kpp.reshape(1, -1))
    kpp = np.array(kpp)

    # convert into tensor to accept by pytorch model
    x_t = torch.Tensor(kpp)

    # get prediction
    pred = model(x_t)
    predicted = np.argmax(pred.cpu().data.numpy(), axis=1)
    shot_types = ['Drive', 'Legglance-Flick', 'Pullshot', 'Sweep']
    predicted_shot = shot_types[predicted[0]]
    confidence = float(np.max(pred.cpu().data.numpy()))*100

    # Check if the output directory exists
    if not os.path.exists(output_directory):
        raise HTTPException(status_code=500, detail="Directory not found.")

    # Get a list of files in the directory
    image_files = os.listdir(output_directory)
    # Get the full paths to each image
    image_paths = [os.path.join(output_directory, file) for file in image_files]

    # Get the current working directory , current_directory = os.getcwd()

    # Encode the images as Base64
    result_image = []
    for path in image_paths:
        with open(path, "rb") as image_file:
            image_data = base64.b64encode(image_file.read()).decode("utf-8")
            result_image.append(image_data)

    # Create JSON response with individual paths
    response_json = {
        "predicted_shot": predicted_shot,
        "confidence": f'{confidence:.2f}%',
        "result_image_1": result_image[0],
        "result_image_2": result_image[1],
        "result_image_3": result_image[2],
    }

    return response_json


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)
