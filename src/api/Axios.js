import axios from 'axios';

const baseURL = "http://65.0.130.13:8080";

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    // Authorization: `Bearer ${token}`,
  },
});

export const makeGetRequest = async (url) => {
  return await axiosInstance.get(url);
};

export const makePostRequest = async (formData)=>{
  const response = await axiosInstance.post("/api/assessmentAttempt", formData,{
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response
}