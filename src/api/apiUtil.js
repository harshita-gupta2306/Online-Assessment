import axios from "axios";

const apiHost = `http://65.0.130.13/`
const faceRecognitionHost = `http://34.93.207.95/`

export async function registerStudents(formData) {
  const registered = await axios.post(
    `${apiHost}public/api/assessmentAttempt`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return registered;
}

export async function verifyImage(formData) {
  const resp = await axios.post(
    `${faceRecognitionHost}verify_image`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return resp;
}

export async function submitAnswers(markedAnswers, linkId) {
  const resp = await axios
    .post(
      `${apiHost}public/api/assessmentAttempt/submit?linkId=${linkId}`,
      markedAnswers
    )
    .then((x) => x)
    .catch((e) => {
      console.log(e);
    });
}

export async function getQuestions(linkId) {
  const resp = await axios.get(
    `${apiHost}public/api/assessmentAttempt/questions?linkId=${linkId}`
  );
  return resp;
}

export async function getUserDetail(linkId) {
  const resp = await axios.get(
    `${apiHost}public/api/assessmentAttempt/getAssessment?linkId=${linkId}`
  );
  return resp;
}

export async function monitorImage(formData) {
  const resp = await axios.post(
    `${faceRecognitionHost}process_image`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return resp;
}

export async function getAssessments() {
  const resp = await axios.get(
    `${apiHost}public/api/getAssessment`
  );
  return resp;
}

export async function getReport(linkId) {
  const resp = await axios.get(
    `${apiHost}public/api/report?linkId=${linkId}`
  );
  return resp;
}
