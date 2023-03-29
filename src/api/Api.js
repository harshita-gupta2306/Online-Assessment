import {makeGetRequest, makePostRequest} from './Axios';

export const getUser = (linkId) => {
  return makeGetRequest(`/assessmentAttempts/${linkId}`);
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

