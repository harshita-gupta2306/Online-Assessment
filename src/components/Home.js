import React from 'react'
import Form from 'react-bootstrap/Form'
import  Button  from 'react-bootstrap/Button'
import { useRef } from 'react';
import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Webcam from 'react-webcam';


const Home = () => {
    const webRef = useRef(null);
    const [url, setUrl] = useState(null);

    const capturePhoto = React.useCallback(async () => {
        const imageSrc = webRef.current.getScreenshot()
        setUrl(imageSrc)
    }, [webRef])

    const onUserMedia = (e) => {
        console.log(e)
    }
    const [inpval,setInpval] =useState({
        name:"",
        lastName:"",
        email:"",
        dob:"",
        collegeName:"",
        password:""
    })
    console.log(inpval);
    const [data,setData] = useState([])

    const getData = (e)=>{
        // console.log(e.target.value);
        const{value,name}=e.target;
        // console.log(value,name);

        setInpval(()=>{
            return{
                ...inpval,
                [name]:value

            }
        })
    }
    const addData =(e)=>{
        e.preventDefault();
        const {name,lastName,email,dob,collegeName,password}=inpval;

        if(name === ""){
            alert("First name is required")
        }
        else if(email===""){
            alert("email field is required")
        }else if(!email.includes("@")){
            alert("Enter valid email address")
        } else if( dob===""){
            alert("Date of birth is required")
        }
        else if(password.length < 8){
            alert("password length should be greater than 8")
        }
        else{
            console.log("Data Added successfully");
            localStorage.setItem("CandidateData",JSON.stringify([...data,inpval]));
        }
        
    }
    return (
        <>
            <div className="container mt-5">
                <section className='d-flex justify-content-between'>
                    <div className='left-data mt-1 p-3' style={{width:"100%"}}>
                    <Card style={{ width: '40rem', height: '50rem',padding:'2rem'}}>
                        <h3 className='text-center col-lg-10'>Register</h3>
                        <Form>
                            <Form.Group className=" mb-3 col-lg-10" controlId="formBasicEmail">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" name='name' onChange={getData} placeholder="Enter First Name" />
                                
                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-10" controlId="formBasicEmail">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" name='lastName' onChange={getData} placeholder="Enter Last Name" />
                                
                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-10" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" name='email' onChange={getData} placeholder="Enter email" />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-10" controlId="formBasicEmail">
                                <Form.Label>Date Of Birth</Form.Label>
                                <Form.Control type="date" name='dob' onChange={getData} placeholder="Enter date of birth" />
                                
                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-10" controlId="formBasicEmail">
                                <Form.Label>College/University</Form.Label>
                                <Form.Control type="text" name='collegeName' onChange={getData} placeholder="Enter college or university" />
                                
                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-10" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name='password' onChange={getData} placeholder="Password" />
                            </Form.Group>
                            <Form.Group className="mb-3 p-3 col-lg-10" style={{ background:"rgb(197, 230, 220)",borderRadius:8}} controlId="formBasicCheckbox">
                                <Form.Check className="text-muted" type="checkbox" label="By registering for this opportunity you agree to share the data mentioned in this form." />
                                
                            </Form.Group>
                            <Button className='mb-5 col-lg-10' onClick={addData} style={{border:"rgb(67,185,127)"}} variant="success" type="submit">
                                Submit
                            </Button>
                        </Form>
                        </Card>
                    </div>

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
                    <Card style={{ width: '22rem', height: '16.5rem', background: 'rgb(141, 143, 148)', margin: '0.5rem' }}>
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
                </section>

            </div>
        </>

    )
}

export default Home