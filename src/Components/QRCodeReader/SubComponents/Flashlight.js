import { useState } from "react";

const FlashLight = () => {
    const [flashLightOn, setFlashLight] = useState(false);

    const toggleFlashlight = () => {
        const stream = window.navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });

        if (flashLightOn) {
            stream.then(mediaStream => {
                const videoTrack = mediaStream.getTracks();
                videoTrack.forEach(video => video.stop())
            })
        }

        setFlashLight(!flashLightOn);
    }

    return (
        <>
            <button onClick={toggleFlashlight}>{flashLightOn ? 'Turn-off' : 'Turn-on'}</button>
        </>
    )
}

export default FlashLight;