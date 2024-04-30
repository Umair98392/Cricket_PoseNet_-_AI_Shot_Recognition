import requests
import json

ENDPOINT = "https://sturgeon-light-especially.ngrok-free.app"

# Define the path to your image file
IMAGE_FILE_PATH = "test_image.jpeg"
VIDEO_FILE_PATH = "test_video.mp4"


#check get request(Note: 'test' is write before each function so that it can test)
def test_can_call_endpoint():
    response = requests.get(ENDPOINT)
    assert response.status_code == 200



# testing post request image api
def test_can_predict_image():
    # Load the image file
    with open(IMAGE_FILE_PATH, "rb") as image_file:
        files = {"file": ("test_image.jpeg", image_file)}

        # Send a POST request to the endpoint with the image as data
        response = requests.post(f"{ENDPOINT}/predict", files=files)

        # Check the response status code
        assert response.status_code == 200

        # Check the response content is in JSON format
        try:
            json_data = response.json()
        except json.JSONDecodeError:
            json_data = None

        assert json_data is not None, "Response is not in JSON format"

# testing post request video api
def test_can_predict_video():
    # Load the image file
    with open(VIDEO_FILE_PATH, "rb") as video_file:
        files = {"file": ("test_video.mp4", video_file)}

        # Send a POST request to the endpoint with the video as data
        response = requests.post(f"{ENDPOINT}/predict_video", files=files)

        # Check the response status code
        assert response.status_code == 200

        # Check the response content is in JSON format
        try:
            json_data = response.json()
        except json.JSONDecodeError:
            json_data = None

        assert json_data is not None, "Response is not in JSON format"