export const setAuthToken = (data, token = "auth_token") => {
  localStorage.setItem(token, JSON.stringify(data));
};

export const getAuthToken = (token = "auth_token") => {
  return JSON.parse(localStorage.getItem(token)) || "";
};

export const removeAuthToken = () => {
  localStorage.removeItem("auth_token");
};
