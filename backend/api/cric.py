import cv2
import os
from ultralytics import YOLO
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
from tensorflow.keras.models import load_model
import numpy as np

# Load a model
keypoint_model = YOLO('./models/trained_model/yolov8n-pose.pt')  # load a pretrained model


# define function that extracts the keypoints for an image
def extract_keypoints(img):

  # make predictions
  outputs = keypoint_model.predict(img, conf= 0.75, imgsz=(288,288), verbose=False)
  keypoints = outputs[0].keypoints.xy.cpu().numpy()

  if(len(keypoints)>0):
    # fetch keypoints of a person with maximum confidence score
    kp = keypoints[0]
    # convert 2D array to 1D array
    kp = kp.flatten()
    # return keypoints
    return kp


# Replace '/path/to/your/output/directory' with the desired directory path
output_directory = './output_directory'
# Check if the directory already exists
if not os.path.exists(output_directory):
    os.makedirs(output_directory)


# Function to create images with box and keypoints detection
def result_images(img):

    # make predictions
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    # prediction
    outputs = keypoint_model(img, conf=0.75, imgsz=(288,288), verbose=False)

    # find the objects in image
    num_instances = len(outputs[0])

    #print(num_instances)
    if(num_instances == 0):

        # If no instances were detected, display the original image
        img_with_bboxes = img_with_keypoints=img_with_predictions= cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    else:
        # Draw boxes
        img_with_bboxes = outputs[0].plot(boxes=True, kpt_radius=0, kpt_line=False, conf=True,labels=True)
        img_with_bboxes =cv2.cvtColor(img_with_bboxes, cv2.COLOR_BGR2RGB)

        # Draw Keypoints
        img_with_keypoints = outputs[0].plot(boxes=True, line_width=2, kpt_radius=2,kpt_line=False, conf=True, labels=True)
        img_with_keypoints =cv2.cvtColor(img_with_keypoints, cv2.COLOR_BGR2RGB)

        # Draw Keypoints with boxes
        img_with_predictions = outputs[0].plot(boxes=True, line_width=2, kpt_radius=2,kpt_line=True, conf=True, labels=True)
        img_with_predictions =cv2.cvtColor(img_with_predictions, cv2.COLOR_BGR2RGB)



    # Save the images
    output_path_bboxes = os.path.join(output_directory, 'img_with_bboxes.jpg')
    output_path_keypoints = os.path.join(output_directory, 'img_with_keypoints.jpg')
    output_path_predictions = os.path.join(output_directory, 'img_with_predictions.jpg')

    cv2.imwrite(output_path_bboxes, img_with_bboxes)
    cv2.imwrite(output_path_keypoints, img_with_keypoints)
    cv2.imwrite(output_path_predictions, img_with_predictions)



# Define a list of colors for visualization
colors = [(245,117,16), (117,245,16), (16,117,245),(200,103,27),(117,245,16)]

# Function to visualize probabilities on the frame
def prob_viz(pred_probs, labels, frame, colors=colors):
    output_frame = frame.copy()
    for num, prob in enumerate(pred_probs[0]):
        cv2.rectangle(output_frame, (0,60+num*30), (int(prob*100), 90+num*30), colors[num], -1)
        cv2.putText(output_frame, labels[num], (0, 85+num*30), 
                    cv2.FONT_HERSHEY_COMPLEX_SMALL    , 0.8, (255,255,255), 1, cv2.LINE_AA)
        
    return output_frame


# Prediction Function
def prediction_on_video(model, path, window_size=3, step_size=3, interval=5, n_frames=18):

    # Map the predicted class to the corresponding shot category based on your label encoding
    labels = ['Bowled', 'Cover_Drive', 'Defence', 'Pull', 'Reverse_Sweep']
    records =[]
    confidence=[]
    records_pred_class = []
    records_pred = []
    pred_probs = [[0, 0, 0, 0, 0]]
    pred_shot = ""

    # Open a video capture object
    cap = cv2.VideoCapture(path)  # Replace with the path to your video file
    
    predicted_video_path = 'predicted_result.mp4'
    # Create a video writer object for saving the predicted result
    video = cv2.VideoWriter(predicted_video_path, cv2.VideoWriter_fourcc(*'avc1'), 20, (840, 480))

    start_time = 0
    end = 0

    while True:
        # Set the video capture to the start time
        cap.set(cv2.CAP_PROP_POS_FRAMES, int(start_time * cap.get(cv2.CAP_PROP_FPS)))

        frames = []
        frame_counter = 0

        while len(frames) < n_frames:
            success, frame = cap.read()

            if not success:
                end = 1
                break

            frame = cv2.resize(frame, (840, 480))
            out_frame = cv2.resize(frame, (840, 480))
            last_frame = cv2.resize(frame, (840, 480))

            if frame_counter % interval == 0:
                frame = cv2.resize(frame, (199, 199))
                frames.append(frame)

            frame_counter += 1

            out_frame = prob_viz(pred_probs, labels, out_frame)
            cv2.rectangle(out_frame, (0, 0), (840, 30), (245, 117, 16), -1)
            cv2.putText(out_frame, ' '.join(records_pred[-4:]), (3, 25),
                        cv2.FONT_HERSHEY_TRIPLEX, 0.8, (255, 255, 255), 1, cv2.LINE_AA)

            video.write(out_frame)

            # cv2.imshow('Cricket PoseNet : AI Shot Assistant', out_frame)
            # cv2.waitKey(2)

        # Pad or trim frames to have a consistent length of max_frames
        frames = frames + [np.zeros_like(frames[0])] * max(0, n_frames - len(frames))

        # Prediction
        pred_probs = model.predict(np.array([frames]), verbose=0)
        records.append(pred_probs[0])
        pred_class = np.argmax(pred_probs, axis=1)
        records_pred_class.append(pred_class[0])
        pred_shot = labels[pred_class[0]]
        records_pred.append(pred_shot)
        conf = float(np.max(pred_probs[0]))*100
        confidence.append(conf)

        if end:
            out_frame = prob_viz(pred_probs, labels, last_frame)
            cv2.rectangle(out_frame, (0, 0), (840, 30), (245, 117, 16), -1)
            cv2.putText(out_frame, ' '.join(records_pred[-4:]), (3, 25),
                        cv2.FONT_HERSHEY_TRIPLEX, 0.8, (255, 255, 255), 1, cv2.LINE_AA)

            # cv2.imshow('Cricket PoseNet : AI Shot Assistant', out_frame)
            # cv2.waitKey(2000)
            for i in range(10):
                video.write(out_frame)
            break

        # Update the time for the next window
        start_time += step_size

        # Break the loop if 'q' is pressed
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # Release the video capture object
    video.release()
    cap.release()
    cv2.destroyAllWindows()

    # print(records)
    # print(confidence)
    # print(records_pred_class)

    # Initialize an empty dictionary to store the counts
    # Initialize the dictionary with 0 for each key
    json = {
        'shots_played': 0,
        'shot_sequence': 0,
        'Bowled_count': 0,
        'Cover_Drive_count': 0,
        'Defence_count': 0,
        'Pull_count': 0,
        'Reverse_Sweep_count': 0,
        'Bowled_avg_prob': 0,
        'Cover_Drive_avg_prob': 0,
        'Defence_avg_prob': 0,
        'Pull_avg_prob': 0,
        'Reverse_Sweep_avg_prob': 0,
        'Bowled_shot_runs': 0,
        'Cover_Drive_shot_runs': 0,
        'Defence_shot_runs': 0,
        'Pull_shot_runs': 0,
        'Reverse_Sweep_shot_runs': 0,
        'better_shot': "",
        'weak_shot': ""
    }
    # shot_counts = {}
    json['shots_played'] = len(records_pred)
    json['shot_sequence'] = records_pred
    # Count the number of each shot
    for i,shot in enumerate(records_pred):
        if f'{shot}_count' in json:
            json[f'{shot}_count'] += 1
            json[f'{shot}_avg_prob']+= round(confidence[i], 2)
    for shot in labels:
        if json[f'{shot}_count'] !=0 :
            json[f'{shot}_avg_prob'] = round((json[f'{shot}_avg_prob']/json[f'{shot}_count']),2)

    

    count = json['Cover_Drive_count'] + json['Defence_count']//3 + json['Pull_count'] +json['Reverse_Sweep_count']
    json['Cover_Drive_shot_runs'] = round((json['Cover_Drive_count']/count)*100,2)
    json['Defence_shot_runs'] = round(((json['Defence_count']//3)/count)*100,2)
    json['Pull_shot_runs'] = round((json['Pull_count']/count)*100,2)
    json['Reverse_Sweep_shot_runs'] = round((json['Reverse_Sweep_count']/count)*100,2)

    json['better_shot'] = labels[np.argmax([0, json["Cover_Drive_avg_prob"], json["Defence_avg_prob"], json["Pull_avg_prob"], json["Reverse_Sweep_avg_prob"]])]
    json['weak_shot'] = labels[np.argmin([100-json["Bowled_avg_prob"], json["Cover_Drive_avg_prob"], json["Defence_avg_prob"], json["Pull_avg_prob"], json["Reverse_Sweep_avg_prob"]])]
    # tf.print(json)

    return json, predicted_video_path