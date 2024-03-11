from fastapi import FastAPI, UploadFile, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from api.cric import extract_keypoints, result_images, prediction_on_video
import joblib
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
from tensorflow.keras.models import load_model
import numpy as np
import cv2
import base64
import warnings
warnings.filterwarnings("ignore")
    


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
model = load_model('./models/trained_model/i_model.keras')
loaded_scaler = joblib.load('./models/trained_model/i_scaler.pkl')
v_model = load_model('./models/trained_model/v_model.keras')

# Define the desired resolution
desired_resolution = (288, 288)

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

    img = cv2.resize(img, desired_resolution,interpolation=cv2.INTER_LINEAR)
    
    # call function to extract keypoint
    kpp = extract_keypoints(img)

    if len(kpp) ==0:
        return              #Error for valid image
    

    # Call function to create images with box and keypoints detection
    result_images(img)

    # call scaler
    kpp = loaded_scaler.transform(kpp.reshape(1, -1))
    kpp = np.array(kpp)


    # get prediction
    pred = model(kpp)
    predicted = np.argmax(pred, axis=1)
    shot_types = ['Cut-Shot', 'Drive', 'Legglance-Flick', 'Pullshot', 'Sweep']
    predicted_shot = shot_types[predicted[0]]
    confidence = float(np.max(pred))*100

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



@app.post("/predict_video")
async def predict_video(file: UploadFile):
    # Read and process the uploaded video using OpenCV
    content = await file.read()
    # Save the video file temporarily or process it in memory depending on your requirements
    # Example: Save the file to disk
    with open("temp_video.mp4", "wb") as video_file:
        video_file.write(content)
    
    # Perform video analysis and prediction
    result_json,predicted_video_path = prediction_on_video(model=v_model,path="temp_video.mp4")
    
    # /video_path = "test1.mp4"
    # Read the predicted video content as bytes
    with open(predicted_video_path, "rb") as video_file:
        video_content = video_file.read()

    # Encode the video content as base64
    video_base64 = base64.b64encode(video_content).decode("utf-8")

    # Clean up the temporary video file
    os.remove("temp_video.mp4")

    # Include the base64-encoded video in the JSON response
    result_json["predicted_video"] = video_base64

    return result_json

# video_path = 'predicted_result.mp4'
# @app.get("/video")
# async def get_video():
#     return StreamingResponse(open(video_path, "rb"), media_type="video/mp4")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)




