import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import socket, { startSocket } from "./socket";
import { notificationCustom } from "./notifications";
import { AppState, LogBox, TouchableOpacity } from "react-native";
import * as Updates from "expo-updates";
import { View, Text } from "./components/Themed";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { getUserData } from "./screens/chatHive/DataFetcher";
// const db = SQLite.openDatabase('db.testDb') // returns Database object

// function myTask() {
//   try {
//     // fetch data here...
//     const backendData = "Simulated fetch " + Math.random();
//     console.log("myTask() ", backendData);
//    startSocket()
//     return backendData
//       ? BackgroundFetch.Result.NewData
//       : BackgroundFetch.Result.NoData;
//   } catch (err) {
//     return BackgroundFetch.Result.Failed;
//   }
// }
// async function initBackgroundFetch(taskName,
//                                    taskFn,
//                                    interval = 60 * 15) {
//   try {
//     if (!TaskManager.isTaskDefined(taskName)) {
//       TaskManager.defineTask(taskName, taskFn);
//     }
//     const options = {
//       minimumInterval: interval // in seconds
//     };
//   await BackgroundFetch.registerTaskAsync(taskName, options);
//   } catch (err) {
//     console.log("registerTaskAsync() failed:", err);
//   }
// }
// initBackgroundFetch('myTaskName', myTask, 5);

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [updateAvailable, setUpdateAvailable] = useState(false);
  // const navigation = useNavigation();
  const [userLoggedIn, setUserLoggedIn] = React.useState(null);

  const checkUser = async (key: string) => {
    const findUser = await SecureStore.getItemAsync(key);
    setUserLoggedIn(JSON.parse(findUser));
  };

  React.useEffect(() => {
    checkUser("userAuthToken");
  }, []);
  // const createDb=()=>{
  //   db.transaction(tx => {
  //     tx.executeSql(
  //       'CREATE TABLE IF NOT EXISTS chatData (id INTEGER PRIMARY KEY AUTOINCREMENT, veroKey TEXT,chats TEXT)'
  //     )
  //   })
  // }

  AppState.addEventListener("change", () => {
    startSocket();
  });

  // useEffect(() => {
  //   Updates.checkForUpdateAsync()
  //     .then((res) => {
  //       res.isAvailable ? setUpdateAvailable(true) : null;
  //     })
  //     .catch((err) => console.log(err));

  // }, []);

  useEffect(() => {
    // createDb()
    startSocket();
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} userLoggedIn={userLoggedIn} />
        {updateAvailable ? (
          <View
            style={{
              minHeight: "10%",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
            }}
          >
            <Text>Latest Update Available</Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-evenly" }}
            >
              <TouchableOpacity
                onPress={() => {
                  Updates.fetchUpdateAsync().then((res) => {
                    res.isNew ? Updates.reloadAsync() : null;
                  });
                }}
              >
                <Text
                  style={{
                    backgroundColor: "#2C88F7",
                    color: "white",
                    margin: 10,
                    padding: 5,
                    borderRadius: 5,
                  }}
                >
                  Update
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setUpdateAvailable(!updateAvailable)}
              >
                <Text
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    margin: 10,
                    padding: 5,
                    borderRadius: 5,
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
