import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:5000",
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    console.log("i fired");
    if (localStorage.getItem("accessToken")) {
      config.headers.Authorization = `Bearer ${localStorage.getItem(
        "accessToken"
      )}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (typeof window !== "undefined" && error.code === 401) {
      localStorage.removeItem("accessToken");
      window.location.href = "http://localhost:3000/login";
    }
    return Promise.reject(error);
  }
);
