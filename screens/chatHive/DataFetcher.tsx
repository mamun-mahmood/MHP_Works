import axios from "axios";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
const BaseURL = "https://soapboxapi.megahoot.net";
export const DataFetcher = () => {};
export const getUser = async (setUserLoggedIn: any) => {
  console.log("getUser API");

  const findUser = await SecureStore.getItemAsync("userAuthToken");
  if (findUser) {
    setUserLoggedIn(JSON.parse(findUser));
  }
};
export const getUserFullName = async (setUserFullName: any) => {
  console.log("getUserFullName API");

  const findUser = await SecureStore.getItemAsync("userFullName");
  if (findUser) {
    setUserFullName(findUser);
  }
}; 
export const getUserData = async (userLoggedIn: any, setUserData: any) => {
  console.log("getUserData API");

  await axios
    .get(`${BaseURL}/user/${userLoggedIn.username}`)
    .then((response) => {
      setUserData(response.data[0]);
      SecureStore.setItemAsync("userFullName", response.data[0].name);
    })
    .catch((err) => {
      console.log(err, "getUserData");
      return err;
    });
};
export const getChatData = (username: any, setChatData: any) => {
  console.log(username, "getChartData API");

  axios
    .post(`${BaseURL}/upload/getChatDataPrivateinbox`, {
      to: username,
    })
    .then((res) => {
      setChatData(res.data);
    })
    .catch((err) => {
      console.log(err, "getChatData");
    });
};

export const getChatDataPrivate = (a: any, b: any, setChatDataPrivate: any) => {
  console.log("getChatDataPrivate API");
  setChatDataPrivate([]);
  axios
    .post(`${BaseURL}/upload/getChatDataPrivate`, {
      to: a,
      from: b,
    })
    .then((res) => {
      res.data.forEach((i: any) => {
        let chatname = i.chat.name,
          message = i.chat.message,
          position = i.chat.position,
          imgSrc = `${BaseURL}/profile-pictures/${i.chat.profilePic}`,
          isEmoji = i.chat.isEmoji,
          isVideo = i.chat.isVideo,
          isImage = i.chat.isImage,
          timestamp = i.chat.timestamp,
          isSticker = i.chat.isSticker;
          
        setChatDataPrivate((e: any) => [
          ...e,
          {
            chatname,
            message,
            position,
            imgSrc,
            isEmoji,
            isVideo,
            isImage,
            timestamp,
            isSticker,
          },
        ]);
      });
      
    })
    .catch((err) => {
      console.log(err, "getChatDataPrivate");
    });
};
