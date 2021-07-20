import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import socket, { startSocket } from './socket';
import { notificationCustom } from './notifications';
import { AppState } from 'react-native';
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

  notificationCustom()
// const createDb=()=>{
//   db.transaction(tx => {
//     tx.executeSql(
//       'CREATE TABLE IF NOT EXISTS chatData (id INTEGER PRIMARY KEY AUTOINCREMENT, veroKey TEXT,chats TEXT)'
//     )
//   })
// }


AppState.addEventListener('change',()=>{
  startSocket()

})



useEffect(() => {
// createDb()
startSocket()


},[])
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
