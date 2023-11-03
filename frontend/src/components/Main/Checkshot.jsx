import React, { useState, useEffect } from 'react';
import Vid from './load.mp4';
import defaultImage from './cam1.png';
import darkImage from './camDark.png';
import useTheme from '../../context/theme';
import { Link } from 'react-router-dom';

function Checkshot() {
  const [predictedAge, setPredictedAge] = useState('N/A');
  const [predictedGender, setPredictedGender] = useState('N/A');
  const [uploadedImage, setUploadedImage] = useState('');
  const [predictedImages, setPredictedImages] = useState([]);
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [showAllImages, setShowAllImages] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [imageVisible, setImageVisible] = useState(false); // State to control image visibility
  const [modalVisible, setModalVisible] = useState(false); // State to control the modal

  const { theme } = useTheme();
  const videoSource = theme === 'light' ? defaultImage : darkImage;

  const handlePredictButtonClick = async () => {
    // Clear previous results when Predict is clicked
    setPredictedAge('N/A');
    setPredictedGender('N/A');
    setPredictedImages([]);
    setImageIndex(0);
    setShowAllImages(false);

    const imageUpload = document.getElementById('image-upload');
    const fileInput = imageUpload.files[0];

    if (fileInput) {
      setUploadedImage(URL.createObjectURL(fileInput));
      const formData = new FormData();
      formData.append('file', fileInput);

      try {
        setLoaderVisible(true);

        // Make an actual API request to your backend
        const response = await fetch('https://sturgeon-light-especially.ngrok-free.app/predict', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          console.log('API Response:', data);

          setPredictedAge(data.confidence);
          setPredictedGender(data.predicted_shot);
          setPredictedImages([
            `data:image/png;base64,${data.result_image_1}`,
            `data:image/png;base64,${data.result_image_2}`,
            `data:image/png;base64,${data.result_image_3}`,
          ]);

          setImageIndex(0);
          setImageVisible(true); // Show the first image
          setLoaderVisible(false);
          setModalVisible(true); // Show the modal
        } else {
          console.error('Error:', response.statusText);
          setLoaderVisible(false);
          if (response.status === 500) {
            alert('An error occurred during prediction. Please upload a valid image.');
          }
        }
      } catch (error) {
        console.error('Error:', error);
        setLoaderVisible(false);
        alert('An error occurred during prediction. Please upload a valid image.');
      }
    } else {
      alert('Please select an image to predict.');
    }
  }

  useEffect(() => {
    let slideshowTimer;
    const incrementImageIndex = () => {
      if (imageIndex < predictedImages.length - 1) {
        setImageIndex(imageIndex + 1);
      } else if (imageIndex === predictedImages.length - 1) {
        setShowAllImages(true); // Show the result
      }
    };

    if (imageVisible) {
      slideshowTimer = setTimeout(incrementImageIndex, 3000);
    }

    return () => {
      clearTimeout(slideshowTimer);
    };
  }, [imageIndex, predictedImages, imageVisible]);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileUpload(file);
  };

  const handleFileUpload = async (file) => {
    setUploadedImage(URL.createObjectURL(file));
    setImageVisible(true); // Hide any previous images
  };

  const handleRefreshButtonClick = () => {
    window.location.reload();
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const getDescriptionAndLink = (predictedGender) => {
    let description = '';
    let link = '';
  
    if (predictedGender === 'Drive') {
      description = 'Drives are straight-batted shots, played by swinging the bat in a vertical arc through the line of the ball. ';
      link = '/Drive';
    } else if (predictedGender === 'Legglance-Flick') {
      description = 'When a ball is flicked towards the leg side with the straight bat and some wrist work. ';
      link = '/Legglance';
    } else if (predictedGender === 'Pullshot') {
      description = 'Stunning back foot shots played on the leg side on short-pitched deliveries. ';
      link = '/Pull';
    } else if (predictedGender === 'Sweep') {
      description = 'The sweep shots are cross-batted shots played on the front foot, usually by kneeling on one knee.';
      link = '/Sweep';
    } else {
      description = 'An unknown shot. ';
      link = 'Learn more about cricket shots';
    }
  
    return { description, link };
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-200 dark:bg-black">
      <main className="w-full max-w-screen-md p-2">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold dark:text-white">Cricket PoseNet: AI Shot Recognition</h1>
        </div>

        <section
          className={`bg-black dark:bg-[#1E1E1E] p-4 shadow-md rounded-md border-dashed border-2 border-gray-500 backdrop-filter backdrop-blur-lg bg-opacity-30 mx-auto mb-6 ${
            isDragging ? 'border-blue-500' : ''
          }`}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <h2 className="text-xl font-bold text-center dark:text-white">Upload an Image</h2>

          <section className="mt-4 text-center">
            <div className="flex justify-center items-center">
              {imageVisible ? (
                <img src={uploadedImage} alt="Uploaded Image" id="uploaded-image" className="mt-2 max-w-xs" style={{ width: '200px' }} />
              ) : (
                <img src={videoSource} alt="Default Image" id="default-image" className="mt-2 " style={{ width: '140px', height: '100px' }} />
              )}
            </div>
          </section>
          <div className="text-center">
            <label className="block text-gray-500 font-bold mb-2">Drag and Drop the image here or</label>
            <label className="block relative font-bold cursor-pointer rounded-lg p-1 px-2 py-1 hover:text-green-900 hover:ring-2 hover:ring-offset-2 hover:ring-green-800 transition-all ease-out duration-300">
              <input
                type="file"
                id="image-upload"
                accept="image/jpeg, image/png"
                className="hidden"
                onChange={(e) => handleFileUpload(e.target.files[0])}
              />
              <span className="block text-center text-sm dark:text-gray-200">Browse</span>
            </label>
          </div>

          <div className="text-center">
            <button
              id="predict-button"
              onClick={handlePredictButtonClick}
              className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover-bg-green-700 focus:outline-none focus:ring-2 focus-ring-green-300 mr-2"
            >
              Predict
            </button>

            <button
              onClick={handleRefreshButtonClick}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus-ring-blue-300 ml-2"
            >
              Refresh
            </button>
          </div>
        </section>

        <div id="loader" className={`text-center ${loaderVisible ? 'block' : 'hidden'}`}>
          {loaderVisible ? (
            <div className="fixed top-0 left-0 w-screen h-screen bg-black opacity-90 flex items-center justify-center">
              <div style={{ width: '30%', height: '30%', position: 'relative', backgroundColor: 'rgba(0, 0, 0, 0.95)' }}>
                <video autoPlay loop muted className="w-full h-full rounded-lg" style={{ objectFit: 'cover', width: '100%', height: '100%' }}>
                  <source src={Vid} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          ) : null}
        </div>

        {/* Modal */}
        {modalVisible && (
  <>
    <div className="fixed top-0 left-0 w-screen h-screen bg-black opacity-95 z-40"></div>
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50">
      <div className="text-white bg-transparent backdrop-filter backdrop-blur-lg bg-opacity-30 rounded-md p-1 shadow-md max-w-xl mx-auto">
        <div className="flex items-center justify-center space-x-3">
          <svg
            className="animate-spin h-5 w-5 text-indigo-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2.293-2.293a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L6 12.414l-2.293 2.293a1 1 0 01-1.414-1.414l4-4z"
            ></path>
          </svg>
          <h2 className="text-xl ">Processing..</h2>
        </div>
        <div className="flex justify-center">
          {predictedImages.map((image, index) => (
            <img
              key={index}
              style={{ maxWidth: '200px' }}
              className={`predicted-image max-w-xs mx-auto absolute p-4 duration-1000 ease-in-out border-dashed border-2 rounded-md border-indigo-500 shadow-lg shadow-cyan-500/50 ... ${
                index === imageIndex ? 'opacity-100' : 'opacity-0'
              }`}
              src={image}
              alt={`Predicted ${index}`}
              onLoad={() => {
                if (index === predictedImages.length - 1) {
                  setTimeout(() => {
                    handleCloseModal();
                  }, 9000); // Close the modal after 9 seconds (9000 milliseconds)
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  </>
)}


        <section className="mt-4 text-center relative">
          {showAllImages && (
            <div className="bg-gray-100 dark:bg-[#1E1E1E] border border-green-300 rounded-lg p-1 shadow-md mx-auto  mb-4">
               <div className="bg-green-100 border border-green-300 rounded-lg p-1 shadow-md mx-auto  mb-4 inline-block">
              <h2 className="text-xl font-bold text-center text-green-500 mb-4">Prediction Result</h2>
              <p className="text-md text-gray-700">
                Confidence: <span id="predicted-age" className="font-bold text-green-700 text-center">
                  {predictedAge}
                </span>
              </p>
              <p className="text-md text-gray-700">
                Predicted Shot: <span id="predicted-gender" className="font-bold text-green-700 text-center">
                  {predictedGender}
                </span>
              </p>
              </div>
              <div className="bg-white-100 border border-green-300 rounded-lg p-1 shadow-md mx-auto  mb-4 block">
              <p className="text-md text-gray-700 italic dark:text-white">
              {getDescriptionAndLink(predictedGender).description}
              </p>
              <Link to={getDescriptionAndLink(predictedGender).link}>
              Know more
                </Link>

                </div>


              <div className="flex flex-wrap justify-center">
                {predictedImages.map((image, index) => (
                  <div key={index} className="w-full md:w-1/3 lg:w-1/2 p-2">
                    <img className="predicted-image max-w-xs mx-auto mb-2" src={image} style={{ maxWidth: '200px' }} alt={`Predicted ${index}`} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Checkshot;
