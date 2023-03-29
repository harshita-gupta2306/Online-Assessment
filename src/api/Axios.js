import axios from 'axios';

const baseURL = "http://localhost:8080";
console.log(baseURL)

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    // Authorization: `Bearer ${token}`,
  },
});

export const makeGetRequest = (url) => {
  return axiosInstance.get(url);
};

export const makePostRequest = async (formData)=>{
  const response = await axiosInstance.post("/api/assessmentAttempt", formData,{
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  console.log(response)
}