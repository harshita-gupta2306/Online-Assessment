import {makeGetRequest, makePostRequest} from './Axios';

export const getUser = async (linkId) => {
  return makeGetRequest(`/api/assessmentAttempt/getAssessment?linkId=${linkId}`);
};

export const getQuestions = (
  category,
  assessmentAttemptId,
  level
) => {
  return makeGetRequest(
    `/assessmentAttempts/questions?category=${category}&assessmentAttemptId=${assessmentAttemptId}&level=3`
  );
};

export const registerStudents = async (formData)=>{
  const response = await makePostRequest(formData);
}

