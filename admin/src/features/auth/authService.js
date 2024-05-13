import axios from "axios";
//  import { config } from "../../utils/axiosConfig";
import { base_url } from "../../utils/baseUrl";
const getTokenFromLocalStrorage=localStorage.getItem("user")
?JSON.parse(localStorage.getItem("user"))
:null;
const config={
  headers:{
    Authorization:`Bearer${getTokenFromLocalStrorage.token}`,
    Accept:'application/JSON'
  }
}
const login = async (user) => {
  const response = await axios.post(`${base_url}user/admin-login`, user,config);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
const getOrders = async () => {
  const response = await axios.get(`${base_url}user/getallorders`, config);
  return response.data;
};
const getOrder = async (id) => {
  const response = await axios.post(
    `${base_url}user/get-orders/${id}`,
    "",
    config
  );

  return response.data;
};

const authService = {
  login,
  getOrders,
  getOrder,
};

export default authService;