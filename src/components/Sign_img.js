import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Webcam from 'react-webcam';
import { useRef } from 'react';
import { useState } from 'react';


const Sign_img = () => {

    const webRef = useRef(null);
    const [url, setUrl] = useState(null);

    const capturePhoto = React.useCallback(async () => {
        const imageSrc = webRef.current.getScreenshot()
        setUrl(imageSrc)
    }, [webRef])

    const onUserMedia = (e) => {
        console.log(e)
    }
    return (
        <>
            <div className='right-data mt-4 mb-5'>
                {/* <div className='sign_img mt-5' >
                    <img src="./sign.svg" style={{ maxWidth: 400, height: 400 }} alt="" />
                </div> */}
                <Card style={{ width: '23rem', height: '60rem' }}>
                    {/* <Card.Img variant="top" src="./user2.svg" /> */}
                    <Webcam
                        ref={webRef}
                        screenshotFormat="image/png"
                        onUserMedia={onUserMedia}
                    />
                    {/* <img  src="./new.avif" style={{ maxWidth: 300, height: 300, border:"rgb(20,20,20)", marginLeft:'2rem',marginTop:'1rem',marginRight:'2rem' }} alt="" /> */}
                    <Card.Body>
                        <Card.Title>Photo Authentication</Card.Title>
                        <Card.Text>
                            Please click your photo using the below button for Authentication purpose
                        </Card.Text>
                        <Button className='col-lg-12' variant="success" style={{ border: "rgb(67,185,127)", justifySelf: 'center', marginBottom: '1rem' }} onClick={capturePhoto}>Click Image</Button>
                        <Card.Text>
                            You Can view Your photo after clicking the image
                        </Card.Text>
                    </Card.Body>
                    <Card style={{ width: '22rem', height: '16.5rem', background: 'rgb(252, 240, 3)', margin: '0.5rem' }}>
                        {url && (
                            <Card.Img variant="top" src={url} alt="ScreenShot" />

                        )}
                    </Card>
                    <Card.Body>

                        <Card.Text>
                            If you want Clear the photo and take another photo please click the below Clear Image Button
                        </Card.Text>
                        <Button className='col-lg-12' variant="success" onClick={() => setUrl(null)}>Clear Image</Button>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}

export default Sign_img