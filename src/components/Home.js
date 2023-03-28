import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import  Button  from 'react-bootstrap/Button'
import Sign_img from './Sign_img'
import Card from 'react-bootstrap/Card';



const Home = () => {
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

                    <Sign_img></Sign_img>
                    
                    
                </section>

            </div>
        </>

    )
}

export default Home