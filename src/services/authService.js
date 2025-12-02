import api from "../helpers/axiosClient";

export const loginService = async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

// export const registerService = async (data) => {
//   const res = await api.post("/auth/register", data);
//   return res.data;
// };  

