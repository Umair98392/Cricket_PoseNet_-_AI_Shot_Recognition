import os
import cv2
import base64
import numpy as np
from ultralytics import YOLO


output_directory = './output_directory'
os.makedirs(output_directory, exist_ok=True)
    
    
shot_labels = ['Cut-Shot', 'Drive', 'Legglance-Flick', 'Pullshot', 'Sweep']

# Load a pretrained model
keypoint_model = YOLO('./models/trained_model/yolov8n-pose.pt')


def prediction_on_image(img, i_model , loaded_scaler, shot_labels = shot_labels):
    
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    
    # prediction
    outputs = keypoint_model(img, conf=0.75, imgsz=(288,288), verbose=False)

    # find the objects in image
    num_instances = len(outputs[0])

    if(num_instances == 0):

        # If no instances were detected, display the original image
        img_with_bboxes = img_with_keypoints=img_with_predictions= cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        keypoints = None
        predicted_shot = None
        confidence = None

    else:
        # Extract keypoints
        keypoints = outputs[0].keypoints.xy.cpu().numpy()
        
        # keypoints of a person with max confidence and flatten them
        keypoints = keypoints[0].flatten()
        
        # call scaler
        keypoints = loaded_scaler.transform(keypoints.reshape(1, -1))
        keypoints = np.array(keypoints)
        
        # get prediction
        pred = i_model(keypoints)
        predicted_shot = shot_labels[np.argmax(pred, axis=1)[0]]
        confidence = float(np.max(pred))*100
        
        
        # Draw boxes
        img_with_bboxes = outputs[0].plot(boxes=True, kpt_radius=0, kpt_line=False, conf=True,labels=True)
        img_with_bboxes =cv2.cvtColor(img_with_bboxes, cv2.COLOR_BGR2RGB)

        # Draw Keypoints
        img_with_keypoints = outputs[0].plot(boxes=True, line_width=2, kpt_radius=3,kpt_line=False, conf=True, labels=True)
        img_with_keypoints =cv2.cvtColor(img_with_keypoints, cv2.COLOR_BGR2RGB)

        # Draw Keypoints with boxes
        img_with_predictions = outputs[0].plot(boxes=True, line_width=2, kpt_radius=3,kpt_line=True, conf=True, labels=True)
        img_with_predictions =cv2.cvtColor(img_with_predictions, cv2.COLOR_BGR2RGB)



    # Save the images
    output_path_bboxes = os.path.join(output_directory, 'img_with_bboxes.jpg')
    output_path_keypoints = os.path.join(output_directory, 'img_with_keypoints.jpg')
    output_path_predictions = os.path.join(output_directory, 'img_with_predictions.jpg')

    cv2.imwrite(output_path_bboxes, img_with_bboxes)
    cv2.imwrite(output_path_keypoints, img_with_keypoints)
    cv2.imwrite(output_path_predictions, img_with_predictions)
    
    # Encode the images as Base64 using list comprehension
    res_img_1 = base64.b64encode(open(f'{output_directory}/img_with_bboxes.jpg', "rb").read()).decode("utf-8")
    res_img_2 = base64.b64encode(open(f'{output_directory}/img_with_keypoints.jpg', "rb").read()).decode("utf-8")
    res_img_3 = base64.b64encode(open(f'{output_directory}/img_with_predictions.jpg', "rb").read()).decode("utf-8")
    
    return predicted_shot, confidence, res_img_1, res_img_2, res_img_3
