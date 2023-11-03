import requests
import json

ENDPOINT = "https://sturgeon-light-especially.ngrok-free.app"

# Define the path to your image file
IMAGE_FILE_PATH = "../data/raw_data/drive.png"


#check get request(Note: 'test' is write before each function so that it can test)
def test_can_call_endpoint():
    response = requests.get(ENDPOINT)
    assert response.status_code == 200



# testing post request api
def test_can_predict():
    # Load the image file
    with open(IMAGE_FILE_PATH, "rb") as image_file:
        files = {"file": ("drive.png", image_file)}

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
