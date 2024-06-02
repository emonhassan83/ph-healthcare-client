import { authKey } from "@/contants/authkey";
import { decodedToken } from "@/utils/jwt";
import { instance as axiosInstance } from "@/helpers/axios/axiosInstance";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from "@/utils/local-storage";

//* set token in local storage
export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
  //   console.log(accessToken);
  return setToLocalStorage(authKey, accessToken);
};

//* decode token and get user info
export const getUserInfo = () => {
  const authToken = getFromLocalStorage(authKey);

  if (authToken) {
    const decodedData: any = decodedToken(authToken);
    // console.log(decodedData);

    return {
      ...decodedData,
      role: decodedData?.role?.toLowerCase(),
    };
  }
};

//* check if user is logged in
export const isLoggedIn = () => {
  const authToken = getFromLocalStorage(authKey);
  if (authToken) {
    return !!authToken;
  }
};

//* remove token from local storage
export const removeUser = () => {
  return removeFromLocalStorage(authKey);
};

//* generate new assess token
export const getNewAccessToken = async () => {
  return await axiosInstance({
    url: "http://localhost:5000/api/v1/auth/refresh-token",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
};
