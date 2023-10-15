import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import qrcode from 'qrcode';
import "./QRCodeReader.css";
import FlashLight from './SubComponents/Flashlight';
import FlipCamera from './SubComponents/FlipCamera';

const QRCodeReader = () => {
    const webcamRef = useRef(null);
    const [qrData, setQrData] = useState('');

    const handleScan = async () => {
        const imageData = webcamRef.current.getScreenshot();
        try {
            const qrCodeData = await qrcode.scan(imageData);
            if (qrCodeData) {
                setQrData(qrCodeData);
            }
        } catch (error) {
            console.error('Error scanning QR code:', error);
        }
    };

    return (
        <div className="webcam-container">
            <div className='videoContainer'>
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/png"
                    className="webcam-preview"
                />
                <div className='viewfinder'></div>
            </div>
            <FlashLight />
            <FlipCamera webcamRef={webcamRef} />
            <button className="webcam-button" onClick={handleScan}>Scan QR Code</button>
            {qrData && <p>Scanned QR code data: {qrData}</p>}
        </div>
    );
};

export default QRCodeReader;
