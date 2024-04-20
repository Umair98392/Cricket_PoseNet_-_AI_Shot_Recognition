import os 
import cv2
import base64
import subprocess  
import numpy as np

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

output_directory = './output_directory'
os.makedirs(output_directory, exist_ok=True)

# Lables for prediction
labels = ['bowled', 'cover_drive', 'defence', 'pull', 'reverse_sweep']


# Prediction Function
def prediction_on_video(v_model, path, step_size=3, interval=5, n_frames=18, labels = labels):

    records, confidence, records_pred_class, records_pred = [], [], [], []
    pred_probs = [[0, 0, 0, 0, 0]]
    pred_shot = ""

    # Open a video capture object
    cap = cv2.VideoCapture(path)
    
    # Create a video writer object for saving the predicted result
    video = cv2.VideoWriter(f'{output_directory}/predicted_video_1.mp4', cv2.VideoWriter_fourcc(*"mp4v"), 20, (840, 480))

    start_time , end = 0, 0
    while True:
        
        # Set the video capture to the start time
        cap.set(cv2.CAP_PROP_POS_FRAMES, int(start_time * cap.get(cv2.CAP_PROP_FPS)))

        frames, frame_counter = [], 0

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

        # Pad or trim frames to have a consistent length of max_frames
        frames = frames + [np.zeros_like(frames[0])] * max(0, n_frames - len(frames))

        # Prediction code
        pred_probs = v_model.predict(np.array([frames]), verbose=0)
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

            for i in range(10):
                video.write(out_frame)
            break

        # Update the time for the next window
        start_time += step_size

    # Release the video capture object
    video.release()
    cap.release()
    
    # convert video into form suitable for web browser
    predicted_video_path = f'{output_directory}/predicted_video_2.mp4'
    convert_mjpeg_to_avc1(f'{output_directory}/predicted_video_1.mp4', predicted_video_path)

    #new line
    os.remove(f'{output_directory}/predicted_video_1.mp4')

    # Initialize the dictionary with 0 for each key
    json = { 'shots_played': 0, 'shot_sequence': 0, 'bowled_count': 0, 'cover_drive_count': 0, 'defence_count': 0, 'pull_count': 0,
            'reverse_sweep_count': 0, 'bowled_avg_prob': 0, 'cover_drive_avg_prob': 0, 'defence_avg_prob': 0, 'pull_avg_prob': 0,
            'reverse_sweep_avg_prob': 0, 'bowled_shot_runs': 0, 'cover_drive_shot_runs': 0, 'defence_shot_runs': 0, 'pull_shot_runs': 0,
            'reverse_sweep_shot_runs': 0, 'better_shot': "", 'weak_shot': "" }
    
     
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
            

    count = json['cover_drive_count'] + json['defence_count']//3 + json['pull_count'] +json['reverse_sweep_count']
    json['cover_drive_shot_runs'] = round((json['cover_drive_count']/count)*100,2)
    json['defence_shot_runs'] = round(((json['defence_count']//3)/count)*100,2)
    json['pull_shot_runs'] = round((json['pull_count']/count)*100,2)
    json['reverse_sweep_shot_runs'] = round((json['reverse_sweep_count']/count)*100,2)

    json['better_shot'] = labels[np.argmax([0, json["cover_drive_avg_prob"], json["defence_avg_prob"], json["pull_avg_prob"], json["reverse_sweep_avg_prob"]])]
    json['weak_shot'] = labels[np.argmin([100-json["bowled_avg_prob"], json["cover_drive_avg_prob"], json["defence_avg_prob"], json["pull_avg_prob"], json["reverse_sweep_avg_prob"]])]
    
    
    
    # Read the predicted video content as bytes
    with open(predicted_video_path, "rb") as video_file:
        video_content = video_file.read()

    # Encode the video content as base64
    json["predicted_video"] = base64.b64encode(video_content).decode("utf-8")

    os.remove(predicted_video_path)

    return json


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


def convert_mjpeg_to_avc1(input_file, output_file):
    # command = f'ffmpeg -y -i {input_file} -c:v libx264 -preset slow -crf 22 -c:a aac -b:a 128k -strict -2 {output_file} > /dev/null 2>&1'
    command = f'ffmpeg -y -i {input_file} -c:v libx264 -preset medium -crf 22 -c:a aac -b:a 128k -strict -2 {output_file}'
    subprocess.run(command, shell=True)