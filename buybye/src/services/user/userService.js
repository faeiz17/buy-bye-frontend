import axios from "axios";

const BASE_URL = "https://buy-bye-backend.vercel.app/";

export const signUpServiceFunc = async (userData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}api/users/register`,
      userData
    );
    return response.data;
  } catch (error) {
    console.error("Error in sign up:", error);

    // Check if it's an Axios error with a response
    if (error.response) {
      const { status, data } = error.response;

      // Customize the error message based on status code or response data
      switch (status) {
        case 400:
          throw new Error(
            data.error || "Bad Request. Please check the provided data."
          );
        case 401:
          throw new Error("Unauthorized. Please check your credentials.");
        case 500:
          throw new Error("Internal Server Error. Please try again later.");
        default:
          throw new Error(data.error || "An unexpected error occurred.");
      }
    } else {
      // If the error does not have a response (network or other issues)
      throw new Error(
        "Network error or server is not responding. Please try again later."
      );
    }
  }
};

export const loginServiceFunc = async (userData) => {
  debugger;
  try {
    debugger;
    const response = await axios.post(`${BASE_URL}api/users/login`, userData);
    console.log(response.data);
    debugger;
    return response.data;
  } catch (error) {
    debugger;
    console.error("Error in login:", error);
    throw error;
  }
};
