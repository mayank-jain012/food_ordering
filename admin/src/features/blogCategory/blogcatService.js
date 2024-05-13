// import axios from "axios";
// import { base_url } from "../../utils/baseUrl";
// import { config } from "../../utils/axiosConfig";
// const getBlogCategories = async () => {
//   const response = await axios.get(`${base_url}blogCategory/`);
//   return response.data;
// };
// const createBlogCategory =async(bcat)=> {
//   const response = await axios.post(`${base_url}blogCategory/`, bcat,config);
//   console.log(config)
//   return response.data;
// }
// const updateBlogCategory = async (blogCat) => {
//   const response = await axios.put(
//     `${base_url}blogCategory/${blogCat.id}`,
//     { title: blogCat.blogCatData.title },
//     config
//   );
//   return response.data;
// };
// const getBlogCategory = async (id) => {
//   const response = await axios.get(`${base_url}blogCategory/${id}`, config);
//   return response.data;
// };
// const deleteBlogCategory = async (id) => {
//   const response = await axios.delete(`${base_url}blogCategory/${id}`, config);
//   return response.data;
// };
// const bCategoryService = {
//   getBlogCategories,
//   createBlogCategory,
//   deleteBlogCategory,
//   getBlogCategory,
//   updateBlogCategory,
// };
// export default bCategoryService;

import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosConfig";

const handleError = (error) => {
  // Implement error handling logic (e.g., console.error, display user-friendly message)
  throw new Error(error)
};

const getBlogCategories = async () => {
  try {
    const response = await axios.get(`${base_url}blogCategory/`, config);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const createBlogCategory = async (bcat) => {
  try {
    const response = await axios.post(`${base_url}blogCategory/`, bcat);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const updateBlogCategory = async (blogCat) => {
  try {
    const response = await axios.put(
      `${base_url}blogCategory/${blogCat.id}`,
      blogCat, // Send the entire modified blogCat object
      config
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const getBlogCategory = async (id) => {
  try {
    const response = await axios.get(`${base_url}blogCategory/${id}`, config);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const deleteBlogCategory = async (id) => {
  try {
    const response = await axios.delete(`${base_url}blogCategory/${id}`, config);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const bCategoryService = {
  getBlogCategories,
  createBlogCategory,
  deleteBlogCategory,
  getBlogCategory,
  updateBlogCategory,
};

export default bCategoryService;


