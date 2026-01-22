export const hasToken = () => Boolean(localStorage.getItem("token"));

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refresh");
};
