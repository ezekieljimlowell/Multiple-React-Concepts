import { useEffect, useState } from "react";

const FlipCamera = ({ webcamRef }) => {
    const [backCameraActive, setBackCameraActive] = useState(true);

    const toggleCamera = () => setBackCameraActive(prev => !prev);

    useEffect(() => {
        const flipCamera = async () => {
            try {
                const constraints = {
                    video: {
                        facingMode: backCameraActive ? 'environment' : 'user',
                    },
                };

                const stream = await navigator.mediaDevices.getUserMedia(constraints);
                if (webcamRef.current) {
                    webcamRef.current.srcObject = stream;
                }
            }
            catch (error) {
                console.log(error);
            }
        };
        flipCamera();
    }, [backCameraActive, webcamRef])

    return (
        <>
            <button onClick={toggleCamera}>Flip camera</button>
        </>
    )
}

export default FlipCamera;