// const getTokenFromLocalStorage = localStorage.getItem("user")
 // // ? JSON.parse(localStorage.getItem("user"))
//   : null;

// export const config = {
//   headers: {
//     Authorization: `Bearer ${
//       getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
//     }`,
//     Accept: "application/json",
//   },
// };
function getTokenFromLocalStorage() {
  try {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      console.log("token found");
      return JSON.parse(userStr);
    }
  } catch (error) {
    console.error("Error parsing token from local storage:", error);
  }
  return null;
}

export const config = {
  headers: {
    Authorization: `Bearer ${getTokenFromLocalStorage()?.token ?? ""}`, // Use optional chaining and nullish coalescing for safer access
    Accept: "application/json",
  },
};
