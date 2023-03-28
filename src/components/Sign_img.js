import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Webcam from 'react-webcam';
import { useRef } from 'react';


const Sign_img = () => {
    const webRef = useRef(null);
    const showImage=()=>{
        let img = webRef.current.getScreenshot();
    };
    
    return (
        <>
            <div className='right-data mt-4 mb-5'>
                {/* <div className='sign_img mt-5' >
                    <img src="./sign.svg" style={{ maxWidth: 400, height: 400 }} alt="" />
                </div> */}
                <Card style={{ width: '23rem', height: '28rem',background:'rgb(252, 240, 3)' }}>
                    {/* <Card.Img variant="top" src="./user2.svg" /> */}
                    <Webcam ref={webRef}></Webcam>
                    {/* <img  src="./new.avif" style={{ maxWidth: 300, height: 300, border:"rgb(20,20,20)", marginLeft:'2rem',marginTop:'1rem',marginRight:'2rem' }} alt="" /> */}
                    <Card.Body>
                        <Card.Title>Photo Authentication</Card.Title>
                        <Card.Text>
                            Please click your photo using the below button for Authentication purpose
                        </Card.Text>
                        <Button className='col-lg-12' variant="success" style={{ border:"rgb(67,185,127)",justifySelf:'center'}} onClick={()=>{
                            showImage()
                        }}>Click Image</Button>
                    </Card.Body>
                </Card>
            </div>

        </>
    )
}

export default Sign_img