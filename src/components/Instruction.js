import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Webcam from "react-webcam";

const Home = () => {
    return (
        <>

            <div className="container-fluid nav_bg">
                <h3 className="text-center" style={{marginTop: "3rem"}}> All the best </h3>
                <br />
                <div className="container-fluid mb-5">
                    <div className="row">
                        <div className="col-10 mx-auto">
                            <div className="row">
                                <div className="col-md-4 col-10 mx-auto">
                                    <div className="text-center">
                                        <div class="card" style={{ width: "16rem" }}>


                                            <div class="card-img-top" alt="demo" />
                                            <Webcam></Webcam>
                                            <div class="card-body">
                                                <h5 class="card-title">Camera Access</h5>
                                                <p class="card-text">Please on the camera before starting the assessment.</p>
                                                <a href="http://localhost:3004/Test" class="btn btn-success">Give Camera Access</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4 col-10 mx-auto">
                                    <h4> Details:</h4>
                                    <p>
                                        1. All questions are compulsory.<br />
                                        2. Try to submit the paper before the end time.<br />
                                        3. You are allowed to submit only once, make sure that you have correctly attempted all the questions before submission.<br />
                                        4. Make sure you clicked on submit button to successfully complete the test.<br />
                                        5. Camera should be on during the assessment.<br />
                                        6. Form will be active for two hours only.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="text-center">
                        <Link to="/Test">
                        </Link>
                        <Button variant="success" href='/Test'>Start</Button>
                    </div>
                </div>
            </div>

        </>

    );
}
export default Home;
