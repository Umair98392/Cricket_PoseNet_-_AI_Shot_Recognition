
import os
import cv2
import joblib
import warnings
import numpy as np

from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
# from api.i_pred import prediction_on_image
from api.v_pred import prediction_on_video

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
warnings.filterwarnings("ignore")
from keras.models import load_model


app = FastAPI()

# Configure CORS settings
origins = [


    "http://0.0.0.0:8085",
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


# Load the pre-trained model and scaler to transform keypoints
# i_model = load_model('./models/trained_model/i_model.keras')
# loaded_scaler = joblib.load('./models/trained_model/i_scaler.pkl')
v_model = load_model('./models/trained_model/v_model.keras')

# # Define the desired resolution
# desired_resolution = (288, 288)

# # Home page route
# @app.get("/")
# async def home():
#     return "Welcome  to Crickshot PoseNet : AI Shot Recognition"


# # Prediction route (For Image)
# @app.post("/predict")
# async def predict(file: UploadFile):
#     # Read and process the uploaded image using OpenCV
#     content = await file.read()
#     nparr = np.frombuffer(content, np.uint8)
#     img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

#     img = cv2.resize(img, desired_resolution,interpolation=cv2.INTER_LINEAR)
    
#     # call prediction function
#     predicted_shot, confidence, res_img_1, res_img_2, res_img_3 = prediction_on_image(img, i_model , loaded_scaler)

#     if predicted_shot == None:
#         return              #Error for invalid image


#     # Create JSON response with individual paths
#     response_json = {
#         "predicted_shot": predicted_shot,
#         "confidence": f'{confidence:.2f}%',
#         "result_image_1": res_img_1,
#         "result_image_2": res_img_2,
#         "result_image_3": res_img_3,
#     }

#     return response_json


# Prediction route (For Video)
@app.post("/predict_video")
async def predict_video(file: UploadFile):
    # Read and process the uploaded video using OpenCV
    content = await file.read()

    #Save the file to disk
    with open("temp_video.mp4", "wb") as video_file:
        video_file.write(content)
    
    # Perform video analysis and prediction
    result_json = prediction_on_video(v_model, "temp_video.mp4")
    
    # Clean up the temporary video file
    os.remove("temp_video.mp4")
    
    return result_json


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
