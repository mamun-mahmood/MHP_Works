import axios from "axios";

export const DataFetcher = () => {};
export const getUserData = async (userLoggedIn: any, setUserData: any) => {
  const BaseURL = "https://soapboxapi.megahoot.net";
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
