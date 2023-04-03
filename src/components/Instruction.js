import Webcam from "react-webcam";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
  
  let search = window.location.search;
  let params = new URLSearchParams(search);
  let linkId = params.get("linkId");

  const [data, setData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/assessmentAttempt/getAssessment?linkId=${linkId}`
      );
      setData(res.data);
    } catch (err) {
      console.log(err);
      //show error in ui or something
    } finally {
      setIsLoading(false);
    }
  };

  const handleStart = () => {
    navigate(`/Test`, { state: { linkId } });
    };

  if (isLoading) {
    return (
      <div
        className="spinner-container"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spinner animation="border" role="status" style={{ color: "#10ccf4" }}>
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <>
      <div className="container-fluid nav_bg">
        <h3 className="text-center" style={{ marginTop: "3rem" }}>
          {" "}
          Welcome to the assessment{" "}
        </h3>
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
                        <p class="card-text">
                          Please on the camera before starting the assessment.
                        </p>
                        <a
                          href="http://localhost:3004/Test"
                          class="btn btn-success"
                          onClick={handleStart}
                        >
                          Give Camera Access
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                {data ? (
                  <div className="col-md-8 col-12 mx-auto">
                    <h4>All the Best</h4>
                    
                   <b>{data.candidateEmail}. </b> <br />
                      <h4><b> Instructions:</b></h4>
              
                      <p>
                      1. All questions are compulsory.<br/>
                      2. Try to submit the paper before the end time.<br/>
                      3. You are allowed to submit only once, make sure you have correctly attempted all questions before submission.<br/>
                      4. Make sure you clicked on submit button to successfully complete the test.<br/>
                      5. Camera should be on during the assessment.<br/>
                      6. Form will be active for two hours only.
                    </p>
                  </div>
                ) : (
                  <p>Data Not Available</p>
                )}
              </div>
            </div>
          </div>
          <br />
          <div className="text-center">
            <Link to="/Test"></Link>
            <Button variant="success" onClick={handleStart}>
              Start
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
