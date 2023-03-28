import React from 'react'
import { Button } from 'react-bootstrap'
import { Card } from 'react-bootstrap';
import { Link } from "react-router-dom";




const Firsthome = () => {
    return (

        <div className="container mt-5">
            <section className='d-flex justify-content-between'>
                <div className='left-data mt-1 p-3' style={{ width: "100%" }}>
                    <Card style={{ padding: '2rem' }}>

                        <Card.Body>
                            <h2 className='mb-4 text-center'>ONLINE ASSESSMENT DETAILS</h2>
                            <Card.Text>
                                The assessment includes a wide range of questions, including general aptitude questions.
                                These general aptitude questions are designed to assess a person's overall cognitive abilities,
                                including their reasoning and criticalthinking skills.These questions may cover topics
                                such as mathematics, logical reasoning Abstract reasoning etc.
                            </Card.Text>


                            <Card.Subtitle className="mb-2 " style={{ fontSize: '1.2em', color: 'red' }}>*Requirements*</Card.Subtitle>
                            <Card.Text style={{ background: "rgb(197, 230, 220)", borderRadius: 8, padding: '1rem' }}>
                                <ul>
                                    <li>
                                        The candidate must be a BE/B.Tech/BSC/BCA graduate.
                                    </li>
                                    <li>
                                        0-1 Years of experience.
                                    </li>
                                    <li>
                                        Candidate must be between 20-25 years of age.
                                    </li>

                                </ul>

                            </Card.Text>
                            <Card.Text>
                                Application deadline:&nbsp;<strong><date style={{ color: 'red' }}>22/04/2023</date></strong>
                            </Card.Text>
                            <p>Interested students click on <strong>Register!</strong></p>
                            <Link to="/Home">
                            </Link>
                            <Button variant="success" href='/Home'>Register</Button>
                        </Card.Body>
                    </Card>
                </div>
            </section>
        </div>

    
    )
}

export default Firsthome