import cv2
import sys
import os
import numpy as np
import subprocess
import distutils.core
from detectron2 import model_zoo
from detectron2.engine import DefaultPredictor
from detectron2.config import get_cfg
from detectron2.utils.visualizer import Visualizer
from detectron2.data import MetadataCatalog
import warnings
warnings.filterwarnings("ignore")


# # Clone the Detectron2 repository, Run setup.py to obtain the install_requires, Add Detectron2 to the system path.
# subprocess.run(["git", "clone", "https://github.com/facebookresearch/detectron2.git"])
# dist = distutils.core.run_setup("./detectron2/setup.py")
# subprocess.run(["pip", "-m", "pip", "install"] + dist.install_requires)
# sys.path.insert(0, os.path.abspath("./detectron2"))



# define configure instance of detectron2
cfg = get_cfg()

# select cpu
cfg.MODEL.DEVICE = 'cpu'

# get a model specified by relative path under Detectron2’s official configs/ directory.
cfg.merge_from_file(model_zoo.get_config_file("COCO-Keypoints/keypoint_rcnn_R_101_FPN_3x.yaml"))

# pretrained model
cfg.MODEL.WEIGHTS = model_zoo.get_checkpoint_url("COCO-Keypoints/keypoint_rcnn_R_101_FPN_3x.yaml")

# set threshold for this model
cfg.MODEL.ROI_HEADS.SCORE_THRESH_TEST = 0.8

# create predictor
predictor = DefaultPredictor(cfg)


# define function that extracts the keypoints for an image
def extract_keypoints(img):

    # make predictions
    outputs = predictor(img)
    # fetch keypoints
    keypoints = outputs['instances'].pred_keypoints
    # convert to numpy array
    kp = keypoints.cpu().numpy()
    # if keypoints detected
    if (len(keypoints) > 0):
        # fetch keypoints of a person with maximum confidence score
        kp = kp[0]
        kp = np.delete(kp, 2, 1)
        # convert 2D array to 1D array
        kp = kp.flatten()
        return kp


# Replace '/path/to/your/output/directory' with the desired directory path
output_directory = './output_directory'
# Check if the directory already exists
if not os.path.exists(output_directory):
    os.makedirs(output_directory)


# Function to create images with box and keypoints detection
def result_images(img):

    outputs = predictor(img)

    # find the objects in image
    num_instances = len(outputs['instances'])
    
    #print(num_instances)
    if(num_instances == 0):
        # If no instances were detected, display the original image
        img_with_bboxes = img_with_keypoints= img.copy()
        
    else:

        # Extract bounding boxes from the output
        pred_boxes = outputs["instances"].pred_boxes.to("cpu").tensor.numpy()

        # Draw bounding boxes
        img_with_bboxes = img.copy()
        for box in pred_boxes:
            x1, y1, x2, y2 = map(int, box)
            cv2.rectangle(img_with_bboxes, (x1, y1), (x2, y2), (0, 255, 0), 2)

        # Draw keypoints on the image
        pred_keypoints = outputs["instances"].pred_keypoints.cpu().numpy()

        # Define colors for each keypoint
        colors = [(255, 0, 0),  # Keypoint 1 (red)
                    (0, 255, 0),  # Keypoint 2 (green)
                    (0, 0, 255),  # Keypoint 3 (blue)
                    (255, 255, 0),  # Keypoint 4 (yellow)
                    (0, 255, 255),  # Keypoint 5 (cyan)
                    (255, 0, 255),  # Keypoint 6 (magenta)
                    (128, 0, 0),  # Keypoint 7 (maroon)
                    (0, 128, 0),  # Keypoint 8 (green)
                    (0, 0, 128),  # Keypoint 9 (navy)
                    (128, 128, 0),  # Keypoint 10 (olive)
                    (0, 128, 128),  # Keypoint 11 (teal)
                    (128, 0, 128),  # Keypoint 12 (purple)
                    (128, 128, 128),  # Keypoint 13 (gray)
                    (192, 192, 192),  # Keypoint 14 (silver)
                    (255, 165, 0),  # Keypoint 15 (orange)
                    (0, 255, 128),  # Keypoint 16 (turquoise)
                    (128, 0, 255),  # Keypoint 17 (violet)
                ]

        # Draw all keypoints with different colors
        img_with_keypoints = img_with_bboxes.copy()
        for idx, keypoint in enumerate(pred_keypoints[0]):
            x, y, conf = keypoint
            if conf > 0.0:  # Draw keypoints with confidence > 0
                color = colors[idx]
                cv2.circle(img_with_keypoints, (int(x), int(y)), 3, color, -1)

        # use `Visualizer` to draw the predictions on the image(final Prediction).
        v = Visualizer(img[:, :, ::-1],
                        MetadataCatalog.get(cfg.DATASETS.TRAIN[0]), scale=1)
        v = v.draw_instance_predictions(outputs["instances"].to("cpu"))

        # Save the images
        output_path_bboxes = os.path.join(output_directory, 'img_with_bboxes.jpg')
        output_path_keypoints = os.path.join(output_directory, 'img_with_keypoints.jpg')
        output_path_predictions = os.path.join(output_directory, 'img_with_predictions.jpg')

        cv2.imwrite(output_path_bboxes, img_with_bboxes)
        cv2.imwrite(output_path_keypoints, img_with_keypoints)
        cv2.imwrite(output_path_predictions, v.get_image()[:, :, ::-1])
