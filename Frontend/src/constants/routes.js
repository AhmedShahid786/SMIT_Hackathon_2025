const dev = "http://192.168.5.230:4000";
// const prod = "https://smit-hackathon-2025.onrender.com";

const baseUrl = dev;

export const routes = {
  register: baseUrl + "/users/register",
  login: baseUrl + "/users/login",
  userInfo: baseUrl + "/users/cookie",
  addBeneficiary: baseUrl + "/beneficiaries/add",
};
