import axios from "axios";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
const BaseURL = "https://soapboxapi.megahoot.net";
export const DataFetcher = () => {};
export const getUser = async (setUserLoggedIn: any) => {
  const findUser = await SecureStore.getItemAsync("userAuthToken");
  if (findUser) {
    setUserLoggedIn(JSON.parse(findUser));
  }
};
export const getUserData = async (userLoggedIn: any, setUserData: any) => {
  await axios
    .get(`${BaseURL}/user/${userLoggedIn.username}`)
    .then((response) => {
      setUserData(response.data[0]);
      console.log("Profile Fetched");
    })
    .catch((err) => {
      console.log(err, "Profile Fetch error");
      return err;
    });
};
export const getChatData = (username: any, setChatData: any) => {
  console.log(username, "getChartData");

  axios
    .post(`${BaseURL}/upload/getChatDataPrivateinbox`, {
      to: "Mamun",
    })
    .then((res) => {
      setChatData(res.data);
      console.log(res.data, "dsfkjhsa");
    });
};
